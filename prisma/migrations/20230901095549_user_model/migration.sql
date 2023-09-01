-- CreateEnum
CREATE TYPE "EnumRole" AS ENUM ('USER', 'ADMIN', 'CUSTOMER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT,
ADD COLUMN     "contactNo" TEXT,
ADD COLUMN     "profile" TEXT,
ADD COLUMN     "role" "EnumRole" NOT NULL DEFAULT 'USER';
