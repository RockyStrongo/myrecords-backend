-- CreateTable
CREATE TABLE "test" (
    "hello" VARCHAR(50) NOT NULL
);

-- CreateTable
CREATE TABLE "othertest" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(50) NOT NULL,

    CONSTRAINT "othertest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "test_hello_key" ON "test"("hello");

-- CreateIndex
CREATE UNIQUE INDEX "othertest_description_key" ON "othertest"("description");
