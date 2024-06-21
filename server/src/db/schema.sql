BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS "CorrectCaption" (
	"id" INTEGER NOT NULL,
	"idCaption" INTEGER NOT NULL,
	"idMeme" INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("idMeme") REFERENCES "Meme"("id"),
	FOREIGN KEY("idCaption") REFERENCES "Caption"("id")
);

CREATE TABLE IF NOT EXISTS "Caption" (
	"id" INTEGER NOT NULL,
	"caption" TEXT NOT NULL UNIQUE,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "Round" (
	"id" INTEGER NOT NULL,
	"idGame" INTEGER NOT NULL,
	"idMeme" INTEGER,
	"idCaption" INTEGER,
	"score" INTEGER NOT NULL DEFAULT 0,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("idMeme") REFERENCES "Meme"("id") ON DELETE
	SET
		NULL,
		FOREIGN KEY("idCaption") REFERENCES "Caption"("id") ON DELETE
	SET
		NULL,
		FOREIGN KEY("idGame") REFERENCES "Game"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Meme" (
	"id" INTEGER NOT NULL,
	"tag" TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "Game" (
	"id" INTEGER NOT NULL,
	"idUser" INTEGER NOT NULL,
	"date" TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("idUser") REFERENCES "User"("id") ON DELETE CASCADE
);

-- Business rule: id=0 is not valid, (I want to avoid the check at every insert)
CREATE TABLE IF NOT EXISTS "User" (
	"id" INTEGER NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"name" TEXT NOT NULL,
	"surname" TEXT NOT NULL,
	"hash" TEXT NOT NULL,
	"salt" TEXT NOT NULL,
	"totalScore" INTEGER DEFAULT 0,
	PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TRIGGER AfterInsert
AFTER
INSERT
	ON Round BEGIN
UPDATE
	User
SET
	totalScore = totalScore + NEW.score
WHERE
	User.id = (
		SELECT
			idUser
		FROM
			Game
		WHERE
			id = NEW.idGame
	);

END;

CREATE TRIGGER BeforeDelete BEFORE DELETE ON Game BEGIN
UPDATE
	User
SET
	totalScore = totalScore - (
		SELECT
			SUM(score)
		FROM
			Round
		WHERE
			idGame = OLD.id
	)
WHERE
	User.id = OLD.idUser;

END;

COMMIT;