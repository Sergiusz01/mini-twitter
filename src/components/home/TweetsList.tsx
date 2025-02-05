"use client";

import { getTweetsAction } from "@/actions/tweet.action";
import { DetailTweet } from "@/interfaces/tweet.interface";
import { useEffect, useState, useCallback } from "react";
import Tweets from "@/components/cards/tweets/Tweets";
import PaginationButtons from "@/components/sharing/PaginationButtons";
import NotFound from "@/components/sharing/NotFound";

interface Props {
  initialTweets: { data: DetailTweet[]; hasNext: boolean };
  userId: string;
  page: number;
}

const TweetsList = ({ initialTweets, userId, page }: Props) => {
  const [tweets, setTweets] = useState(initialTweets);

  const checkAndAddNewTweets = useCallback(async () => {
    if (page !== 1) return;

    try {
      const newTweetsData = await getTweetsAction({ 
        userId, 
        isFollowing: false, 
        page: 1 
      });

      if (!newTweetsData?.data.length) return;

      setTweets(prevTweets => {
        // Pobierz aktualne ID tweetów
        const currentIds = new Set(prevTweets.data.map(t => t.id));
        
        // Znajdź nowe tweety
        const newTweets = newTweetsData.data.filter(tweet => !currentIds.has(tweet.id));
        
        if (newTweets.length === 0) return prevTweets;

        // Dodaj nowe tweety na początek listy
        return {
          ...prevTweets,
          data: [...newTweets, ...prevTweets.data]
        };
      });
    } catch (error) {
      console.error("Błąd podczas sprawdzania nowych tweetów:", error);
    }
  }, [page, userId]);

  // Sprawdzaj nowe tweety co 15 sekund
  useEffect(() => {
    if (page !== 1) return;

    // Pierwsze sprawdzenie po 5 sekundach
    const initialCheck = setTimeout(checkAndAddNewTweets, 5000);
    
    // Następnie sprawdzaj co 15 sekund
    const interval = setInterval(checkAndAddNewTweets, 15000);

    return () => {
      clearTimeout(initialCheck);
      clearInterval(interval);
    };
  }, [checkAndAddNewTweets, page]);

  // Aktualizuj tweety gdy zmienią się początkowe dane
  useEffect(() => {
    setTweets(initialTweets);
  }, [initialTweets]);

  return (
    <>
      {tweets?.data.length ? (
        <>
          {tweets.data.map((tweet) => (
            <Tweets key={tweet.id} tweet={tweet} userId={userId} />
          ))}

          <PaginationButtons
            currentPage={page}
            currentPath="/home"
            hasNext={tweets.hasNext}
          />
        </>
      ) : (
        <NotFound
          title="Witaj w X"
          description="To jest najlepszy moment, aby dołączyć do konwersacji. Zacznij obserwować innych, aby zobaczyć ich tweety tutaj."
        />
      )}
    </>
  );
};

export default TweetsList; 