"use server";

/**
 * Moduł zawierający akcje serwerowe związane z obsługą tweetów
 * Implementuje funkcjonalności CRUD dla tweetów oraz interakcje użytkowników
 */

import {
	CreateTweetActionProps,
	GetTweetsActionProps,
	ToggleLikeActionProps,
	ToggleBookmarkActionProps,
	GetTweetsBySearchActionProps,
	DetailTweet,
} from "@/interfaces/tweet.interface";
import prisma from "@/lib/prismadb";
import {
	CreateTweetActionType,
	DeleteBookmarksAction,
	DeleteTweetActionType,
	GetTotalBookmarksActionType,
	GetTotalTweetsActionType,
	GetTweetActionType,
	GetTweetsActionType,
	ToggleBookmarkActionType,
	ToggleLikeActionType,
	WhereFilter,
} from "@/types/tweet.type";
import { revalidatePath } from "next/cache";

/**
 * Tworzy nowy tweet
 * @param param Parametry tworzenia tweeta (userId, imageUrl, text, parentId, path)
 * @returns Utworzony tweet lub undefined w przypadku błędu
 */
export const createTweetAction = async ({
	userId,
	imageUrl,
	text,
	parentId,
	path,
}: CreateTweetActionProps): Promise<CreateTweetActionType> => {
	try {
		return await prisma.thread.create({
			data: {
				userId,
				imageUrl,
				text,
				parentId,
			},
		});
	} catch (error) {
		console.log("[ERROR_CREATE_TWEET_ACTION]", error);
	} finally {
		revalidatePath(path);
	}
};

/**
 * Pobiera pojedynczy tweet wraz z powiązanymi danymi
 * @param id ID tweeta
 * @returns Szczegółowe informacje o tweecie lub undefined
 */
export async function getTweetAction(id: string): Promise<GetTweetActionType> {
	try {
		if (!id) throw new Error("id required");

		const existingTweet = await prisma.thread.findFirst({
			where: { id },
		});

		if (!existingTweet) return;

		return await prisma.thread.findFirst({
			where: { id },
			include: {
				user: {
					select: {
						id: true,
						imageUrl: true,
						name: true,
						username: true,
						followers: true,
						followings: true,
					},
				},
				bookmarks: true,
				likes: true,
				_count: {
					select: {
						replies: true,
						likes: true,
						bookmarks: true,
					},
				},
			},
		});
	} catch (error) {
		console.log("[ERROR_GET_TWEET_ACTION]", error);
	}
}

/**
 * Pobiera listę tweetów z różnymi filtrami
 * Obsługuje:
 * - Tweety z followowanych użytkowników
 * - Zakładki
 * - Tweety profilowe
 * - Odpowiedzi
 * - Polubione tweety
 */
export async function getTweetsAction({
	size = 20,
	page = 0,
	userId,
	isFollowing = false,
	isBookmarks = false,
	isProfile = false,
	isReplies = false,
	isLikes = false,
	parentId = "",
}: GetTweetsActionProps): Promise<GetTweetsActionType> {
	try {
		if (!userId) throw new Error("userId required");

		const skip = size * page;

		const whereFilter = {
			parentId: isReplies ? { not: null } : parentId ? parentId : null,
			userId: isReplies ? userId : undefined,
			user: {
				followers: isFollowing ? { some: { followingId: userId } } : undefined,
			},
		} as WhereFilter;

		if (isBookmarks) {
			whereFilter.bookmarks = {
				some: {
					userId,
				},
			};
		}

		if (isProfile && !isLikes) {
			whereFilter.userId = userId;
		}

		if (isLikes) {
			whereFilter.likes = {
				some: {
					userId,
				},
			};
			delete whereFilter.userId;

			// Oznaczamy powiadomienia o polubieniach jako przeczytane
			if (isProfile) {
				await prisma.notification.updateMany({
					where: {
						userId,
						activityType: "Like",
						isRead: false
					},
					data: {
						isRead: true
					}
				});
			}
		}

		if (isReplies) {
			// First, get all replies by the user
			const userReplies = await prisma.thread.findMany({
				where: {
					userId,
					parentId: {
						not: null
					}
				},
				include: {
					user: {
						select: {
							id: true,
							imageUrl: true,
							name: true,
							username: true,
							followers: true,
							followings: true,
						},
					},
					parent: {
						include: {
							user: {
								select: {
									id: true,
									imageUrl: true,
									name: true,
									username: true,
									followers: true,
									followings: true,
								},
							},
							likes: true,
							bookmarks: true,
							_count: {
								select: {
									replies: true,
									likes: true,
									bookmarks: true,
								},
							},
						},
					},
					likes: true,
					bookmarks: true,
					_count: {
						select: {
							replies: true,
							likes: true,
							bookmarks: true,
						},
					},
				},
				orderBy: {
					createdAt: "desc",
				},
				skip,
				take: size,
			});

			// Get IDs of parent tweets
			const parentIds = userReplies
				.map(reply => reply.parentId)
				.filter((id): id is string => id !== null);

			// Fetch parent tweets
			const parentTweets = parentIds.length > 0 ? await prisma.thread.findMany({
				where: {
					id: {
						in: parentIds
					}
				},
				include: {
					user: {
						select: {
							id: true,
							imageUrl: true,
							name: true,
							username: true,
							followers: true,
							followings: true,
						},
					},
					likes: true,
					bookmarks: true,
					_count: {
						select: {
							replies: true,
							likes: true,
							bookmarks: true,
						},
					},
				},
			}) : [];

			const totalCount = await prisma.thread.count({
				where: {
					userId,
					parentId: {
						not: null
					}
				}
			});

			// Combine and process tweets
			const combinedTweets = [...userReplies, ...parentTweets].map(tweet => ({
				...tweet,
				_count: {
					replies: tweet._count?.replies || 0,
					likes: tweet._count?.likes || 0,
					bookmarks: tweet._count?.bookmarks || 0,
				},
			}));

			return {
				data: combinedTweets as unknown as DetailTweet[],
				hasNext: Boolean(totalCount - skip - userReplies.length),
			};
		}

		const [data, totalCount] = await Promise.all([
			prisma.thread.findMany({
				where: whereFilter,
				include: {
					user: {
						select: {
							id: true,
							imageUrl: true,
							name: true,
							username: true,
							followers: true,
							followings: true,
						},
					},
					parent: {
						include: {
							user: {
								select: {
									id: true,
									imageUrl: true,
									name: true,
									username: true,
									followers: true,
									followings: true,
								},
							},
							likes: true,
							bookmarks: true,
							_count: {
								select: {
									replies: true,
									likes: true,
									bookmarks: true,
								},
							},
						},
					},
					likes: true,
					bookmarks: true,
					_count: {
						select: {
							replies: true,
							likes: true,
							bookmarks: true,
						},
					},
				},
				orderBy: {
					createdAt: "desc",
				},
				skip,
				take: size,
			}),
			prisma.thread.count({
				where: whereFilter,
			}),
		]);

		const processedData = data.map(tweet => ({
			...tweet,
			_count: {
				replies: tweet._count?.replies || 0,
				likes: tweet._count?.likes || 0,
				bookmarks: tweet._count?.bookmarks || 0,
			},
		}));

		return {
			data: processedData as unknown as DetailTweet[],
			hasNext: Boolean(totalCount - skip - data.length),
		};
	} catch (error) {
		console.log("[GET_TWEETS_ACTION]", error);
	}
}

/**
 * Pobiera całkowitą liczbę tweetów dla danego filtru
 * Używane do paginacji i statystyk
 */
export async function getTotalTweetsAction({
	userId,
	isFollowing = false,
	isBookmarks = false,
	isProfile = false,
	isReplies = false,
	isLikes = false,
	parentId = "",
}: GetTweetsActionProps): Promise<GetTotalTweetsActionType> {
	try {
		if (!userId) throw new Error("userId required");

		const whereFilter = {
			parentId: isReplies ? { not: null } : parentId ? parentId : null,
			user: {
				followers: isFollowing ? { some: { followingId: userId } } : undefined,
			},
		} as WhereFilter;

		if (isBookmarks) {
			whereFilter.bookmarks = {
				some: {
					userId,
				},
			};
		}

		if (isProfile) {
			whereFilter.userId = userId;
		}

		if (isLikes) {
			whereFilter.likes = {
				some: {
					userId,
				},
			};
		}

		return await prisma.thread.count({
			where: whereFilter,
		});
	} catch (error) {
		console.info("[ERROR_GET_TOTAL_TWEETS_ACTION]", error);
	}
}

/**
 * Wyszukuje tweety na podstawie zapytania
 * Obsługuje filtry: najnowsze, najstarsze, najpopularniejsze
 */
export async function getTweetsBySearchAction({
	size = 30,
	page = 0,
	searchQuery = "",
	filter = "najnowsze"
}: GetTweetsBySearchActionProps): Promise<GetTweetsActionType> {
	try {
		if (!searchQuery) return;

		const skip = size * page;
		const searchQueryLower = searchQuery.toLowerCase();

		// Dla filtra "people" szukamy bezpośrednio użytkowników
		if (filter === "people") {
			const users = await prisma.user.findMany({
				where: {
					OR: [
						{
							username: {
								contains: searchQueryLower
							}
						},
						{
							name: {
								contains: searchQueryLower
							}
						}
					]
				},
				select: {
					id: true,
					imageUrl: true,
					name: true,
					username: true,
					followers: true,
					followings: true,
					threads: {
						take: 1,
						orderBy: {
							createdAt: 'desc'
						},
						include: {
							likes: true,
							bookmarks: true,
							_count: {
								select: {
									replies: true,
									likes: true,
									bookmarks: true,
								},
							},
						},
					},
				},
				skip,
				take: size,
			});

			const totalUsers = await prisma.user.count({
				where: {
					OR: [
						{
							username: {
								contains: searchQueryLower
							}
						},
						{
							name: {
								contains: searchQueryLower
							}
						}
					]
				}
			});

			// Przekształcamy wyniki do oczekiwanego formatu
			const data = users.map(user => ({
				id: user.threads[0]?.id || user.id,
				text: '',
				imageUrl: null,
				createdAt: new Date(),
				userId: user.id,
				parentId: null,
				user: {
					id: user.id,
					imageUrl: user.imageUrl,
					name: user.name,
					username: user.username,
					followers: user.followers,
					followings: user.followings,
				},
				likes: user.threads[0]?.likes || [],
				bookmarks: user.threads[0]?.bookmarks || [],
				_count: user.threads[0]?._count || {
					replies: 0,
					likes: 0,
					bookmarks: 0,
				}
			})) as DetailTweet[];

			return {
				data,
				hasNext: Boolean(totalUsers - skip - users.length),
			};
		}

		// Dla pozostałych filtrów (najnowsze, media) szukamy w tweetach
		let whereCondition: any = {
			OR: [
				{
					text: {
						contains: searchQueryLower
					}
				},
				{
					user: {
						OR: [
							{
								username: {
									contains: searchQueryLower
								}
							},
							{
								name: {
									contains: searchQueryLower
								}
							}
						]
					}
				}
			]
		};

		// Dla filtra "media" dodajemy warunek na imageUrl
		if (filter === "media") {
			whereCondition = {
				...whereCondition,
				imageUrl: {
					not: null
				}
			};
		}

		const data = await prisma.thread.findMany({
			where: whereCondition,
			include: {
				user: {
					select: {
						id: true,
						imageUrl: true,
						name: true,
						username: true,
						followers: true,
						followings: true,
					},
				},
				parent: {
					include: {
						user: {
							select: {
								id: true,
								imageUrl: true,
								name: true,
								username: true,
							},
						},
						likes: true,
						bookmarks: true,
						_count: {
							select: {
								replies: true,
								likes: true,
								bookmarks: true,
							},
						},
					},
				},
				likes: true,
				bookmarks: true,
				_count: {
					select: {
						replies: true,
						likes: true,
						bookmarks: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
			skip,
			take: size,
		}) as DetailTweet[];

		const remainingData = await prisma.thread.count({
			where: whereCondition
		});

		return {
			data,
			hasNext: Boolean(remainingData - skip - data.length),
		};
	} catch (error) {
		console.log("[ERROR_GET_TWEETS_BY_SEARCH_ACTION]", error);
	}
}

/**
 * Usuwa tweet i wszystkie powiązane dane
 * Aktualizuje ścieżkę po usunięciu
 */
export async function deleteTweetAction(
	id: string,
	path: string,
): Promise<DeleteTweetActionType> {
	try {
		if (!id) throw new Error("id required");

		return await prisma.thread.delete({
			where: { id },
		});
	} catch (error) {
		console.log("[ERROR_DELETE_TWEET_ACTION]", error);
	} finally {
		revalidatePath(path);
	}
}

/**
 * Przełącza polubienie tweeta
 * Tworzy lub usuwa relację polubienia
 */
export async function toggleLikeAction({
	userId = "",
	threadId = "",
	path,
}: ToggleLikeActionProps): Promise<ToggleLikeActionType> {
	try {
		const existingLike = await prisma.like.findFirst({
			where: {
				userId,
				threadId,
			},
		});

		if (existingLike)
			return await prisma.like.delete({
				where: { id: existingLike.id },
			});

		return await prisma.like.create({
			data: {
				userId,
				threadId,
			},
		});
	} catch (error) {
		console.log("[ERROR_TOGGLE_LIKE_ACTION]", error);
	} finally {
		revalidatePath(path);
	}
}

/**
 * Przełącza zakładkę dla tweeta
 * Dodaje lub usuwa tweet z zakładek użytkownika
 */
export async function toggleBookmarkAction({
	userId = "",
	threadId = "",
	path,
}: ToggleBookmarkActionProps): Promise<ToggleBookmarkActionType> {
	try {
		const existingBookmark = await prisma.bookmark.findFirst({
			where: {
				userId,
				threadId,
			},
		});

		if (existingBookmark)
			return await prisma.bookmark.delete({
				where: { id: existingBookmark.id },
			});

		return await prisma.bookmark.create({
			data: {
				userId,
				threadId,
			},
		});
	} catch (error) {
		console.log("[ERROR_TOGGLE_BOOKMARK_ACTION]", error);
	} finally {
		revalidatePath(path || "/home");
	}
}

/**
 * Pobiera całkowitą liczbę zakładek użytkownika
 */
export async function getTotalBookmarksAction(
	userId: string,
): Promise<GetTotalBookmarksActionType> {
	try {
		if (!userId) throw new Error("userId required");

		return await prisma.thread.count({
			where: {
				bookmarks: {
					some: {
						userId,
					},
				},
			},
		});
	} catch (error) {
		console.log("[ERROR_GET_BOOKMARKS_ACTION]", error);
	}
}

/**
 * Usuwa wszystkie zakładki użytkownika
 */
export async function deleteBookmarksAction(
	userId: string,
	path: string,
): Promise<DeleteBookmarksAction> {
	try {
		if (!userId) throw new Error("userId required");

		return await prisma.bookmark.deleteMany({
			where: {
				userId,
			},
		});
	} catch (error) {
		console.log("[ERROR_DELETE_BOOKMARKS_ACTION]", error);
	} finally {
		revalidatePath(path);
	}
}
