/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `followers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `following` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "followers_userId_key" ON "followers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "following_userId_key" ON "following"("userId");
