-- CreateTable
CREATE TABLE "requests" (
    "id" SERIAL NOT NULL,
    "followersUserId" INTEGER NOT NULL,
    "followingUserId" INTEGER NOT NULL,
    "confirm" BOOLEAN NOT NULL,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("id")
);
