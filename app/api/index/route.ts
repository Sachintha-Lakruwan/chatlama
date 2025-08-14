import { NextResponse } from "next/server";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import fs from "fs/promises";

export async function POST() {
  const filePath = "path/to/your/file.txt";
  const fileContent = await fs.readFile(filePath, "utf-8");

  const embeddings = new OllamaEmbeddings({
    model: "nomic-embed-text",
    baseUrl: "http://localhost:11434",
  });

  const vectorStore = await MemoryVectorStore.fromTexts(
    [fileContent],
    [{ id: 1 }], // metadata
    embeddings
  );

  return NextResponse.json({ message: "Index created successfully" });
}
