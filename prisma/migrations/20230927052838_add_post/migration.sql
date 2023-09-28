-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "upVotes" INTEGER NOT NULL,
    "downVotes" INTEGER NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorCity" TEXT NOT NULL,
    "authorCountry" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
