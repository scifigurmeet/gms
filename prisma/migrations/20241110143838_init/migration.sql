-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('admin', 'gym_admin', 'member');

-- CreateEnum
CREATE TYPE "gender" AS ENUM ('male', 'female', 'other');

-- CreateEnum
CREATE TYPE "user_status" AS ENUM ('active', 'inactive', 'suspended');

-- CreateEnum
CREATE TYPE "gym_status" AS ENUM ('active', 'inactive', 'suspended');

-- CreateEnum
CREATE TYPE "membership_status" AS ENUM ('active', 'expired', 'cancelled', 'suspended');

-- CreateEnum
CREATE TYPE "payment_status" AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- CreateEnum
CREATE TYPE "duration_type" AS ENUM ('days', 'months', 'years');

-- CreateEnum
CREATE TYPE "payment_type" AS ENUM ('regular', 'discounted');

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL DEFAULT auth.uid(),
    "username" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "avatar_url" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postal_code" TEXT,
    "country" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "gender" "gender",
    "emergency_contact" JSONB,
    "status" "user_status" NOT NULL DEFAULT 'active',
    "role" "user_role" NOT NULL DEFAULT 'member',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gyms" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "website_url" TEXT,
    "contact_person" TEXT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "location" JSONB NOT NULL,
    "status" "gym_status" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gyms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gym_admins" (
    "id" SERIAL NOT NULL,
    "profile_id" UUID NOT NULL,
    "gym_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gym_admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membership_plans" (
    "id" SERIAL NOT NULL,
    "gym_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "duration_type" "duration_type" NOT NULL,
    "duration_value" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "membership_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_prices" (
    "id" SERIAL NOT NULL,
    "plan_id" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "valid_from" TIMESTAMP(3) NOT NULL,
    "valid_until" TIMESTAMP(3) NOT NULL,
    "comments" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plan_prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memberships" (
    "id" SERIAL NOT NULL,
    "profile_id" UUID NOT NULL,
    "gym_id" INTEGER NOT NULL,
    "plan_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" "membership_status" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "memberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "profile_id" UUID NOT NULL,
    "membership_id" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL,
    "payment_type" "payment_type" NOT NULL,
    "payment_method" TEXT NOT NULL,
    "status" "payment_status" NOT NULL DEFAULT 'pending',
    "comments" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diet_plans" (
    "id" SERIAL NOT NULL,
    "profile_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "plan_data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "diet_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_plans" (
    "id" SERIAL NOT NULL,
    "profile_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "plan_data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workout_plans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_username_key" ON "profiles"("username");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "profiles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "gyms_email_key" ON "gyms"("email");

-- CreateIndex
CREATE UNIQUE INDEX "gym_admins_profile_id_key" ON "gym_admins"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "gym_admins_gym_id_key" ON "gym_admins"("gym_id");

-- CreateIndex
CREATE INDEX "gym_admins_profile_id_idx" ON "gym_admins"("profile_id");

-- CreateIndex
CREATE INDEX "gym_admins_gym_id_idx" ON "gym_admins"("gym_id");

-- CreateIndex
CREATE INDEX "membership_plans_gym_id_idx" ON "membership_plans"("gym_id");

-- CreateIndex
CREATE INDEX "plan_prices_plan_id_idx" ON "plan_prices"("plan_id");

-- CreateIndex
CREATE INDEX "memberships_profile_id_idx" ON "memberships"("profile_id");

-- CreateIndex
CREATE INDEX "memberships_gym_id_idx" ON "memberships"("gym_id");

-- CreateIndex
CREATE INDEX "memberships_plan_id_idx" ON "memberships"("plan_id");

-- CreateIndex
CREATE INDEX "payments_profile_id_idx" ON "payments"("profile_id");

-- CreateIndex
CREATE INDEX "payments_membership_id_idx" ON "payments"("membership_id");

-- CreateIndex
CREATE INDEX "diet_plans_profile_id_idx" ON "diet_plans"("profile_id");

-- CreateIndex
CREATE INDEX "workout_plans_profile_id_idx" ON "workout_plans"("profile_id");

-- AddForeignKey
ALTER TABLE "gym_admins" ADD CONSTRAINT "gym_admins_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gym_admins" ADD CONSTRAINT "gym_admins_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "membership_plans" ADD CONSTRAINT "membership_plans_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_prices" ADD CONSTRAINT "plan_prices_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "membership_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "membership_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_membership_id_fkey" FOREIGN KEY ("membership_id") REFERENCES "memberships"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diet_plans" ADD CONSTRAINT "diet_plans_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_plans" ADD CONSTRAINT "workout_plans_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
