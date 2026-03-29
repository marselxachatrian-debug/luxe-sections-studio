-- CreateTable
CREATE TABLE "ShopSetupState" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "appEmbedConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "heroBlockConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "trustBlockConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "featuresBlockConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShopSetupState_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShopSetupState_shop_key" ON "ShopSetupState"("shop");
