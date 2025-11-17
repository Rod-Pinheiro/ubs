-- CreateTable
CREATE TABLE "classifications" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dor" JSONB NOT NULL,
    "exames" JSONB NOT NULL,
    "respiratorio" JSONB NOT NULL,
    "estomago" JSONB NOT NULL,
    "prenatal" JSONB NOT NULL,
    "crianca" JSONB NOT NULL,
    "pontuacaoFinal" INTEGER NOT NULL,
    "categoria" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "acao" TEXT NOT NULL,
    "detalhes" JSONB NOT NULL,

    CONSTRAINT "classifications_pkey" PRIMARY KEY ("id")
);
