-- CreateIndex
CREATE INDEX `Thread_createdAt_idx` ON `Thread`(`createdAt`);

-- RenameIndex
ALTER TABLE `thread` RENAME INDEX `Thread_parentId_fkey` TO `Thread_parentId_idx`;

-- RenameIndex
ALTER TABLE `thread` RENAME INDEX `Thread_userId_fkey` TO `Thread_userId_idx`;
