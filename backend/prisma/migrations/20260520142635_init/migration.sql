-- CreateTable
CREATE TABLE "CategoryEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Pembicara" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "biodata" TEXT NOT NULL,
    "photoUrl" TEXT,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "pembicaraId" INTEGER NOT NULL,
    "maxParticipants" INTEGER NOT NULL,
    CONSTRAINT "Event_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryEvent" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Event_pembicaraId_fkey" FOREIGN KEY ("pembicaraId") REFERENCES "Pembicara" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
