-- CreateTable
CREATE TABLE "Lojas" (
    "id_loja" TEXT NOT NULL,
    "id_categoria" TEXT,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "documento" TEXT NOT NULL,
    "comunicacao" JSONB NOT NULL,
    "logo" BYTEA,
    "descricao" TEXT,

    CONSTRAINT "Lojas_pkey" PRIMARY KEY ("id_loja")
);

-- CreateTable
CREATE TABLE "Categorias" (
    "id_categoria" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Categorias_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "Produtos" (
    "id_produto" TEXT NOT NULL,
    "id_loja" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "imagem" BYTEA,
    "valor" TEXT NOT NULL,

    CONSTRAINT "Produtos_pkey" PRIMARY KEY ("id_produto")
);

-- CreateTable
CREATE TABLE "Posicao_lojas" (
    "id_posicao" TEXT NOT NULL,
    "id_loja" TEXT NOT NULL,
    "ponto_localizacao" DOUBLE PRECISION[],

    CONSTRAINT "Posicao_lojas_pkey" PRIMARY KEY ("id_posicao")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id_tag" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id_tag")
);

-- CreateTable
CREATE TABLE "Lojas_tags" (
    "id_loja" TEXT NOT NULL,
    "id_tag" TEXT NOT NULL,

    CONSTRAINT "Lojas_tags_pkey" PRIMARY KEY ("id_loja","id_tag")
);

-- CreateIndex
CREATE UNIQUE INDEX "Posicao_lojas_id_loja_key" ON "Posicao_lojas"("id_loja");

-- AddForeignKey
ALTER TABLE "Lojas" ADD CONSTRAINT "Lojas_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categorias"("id_categoria") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produtos" ADD CONSTRAINT "Produtos_id_loja_fkey" FOREIGN KEY ("id_loja") REFERENCES "Lojas"("id_loja") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posicao_lojas" ADD CONSTRAINT "Posicao_lojas_id_loja_fkey" FOREIGN KEY ("id_loja") REFERENCES "Lojas"("id_loja") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lojas_tags" ADD CONSTRAINT "Lojas_tags_id_loja_fkey" FOREIGN KEY ("id_loja") REFERENCES "Lojas"("id_loja") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lojas_tags" ADD CONSTRAINT "Lojas_tags_id_tag_fkey" FOREIGN KEY ("id_tag") REFERENCES "Tags"("id_tag") ON DELETE RESTRICT ON UPDATE CASCADE;
