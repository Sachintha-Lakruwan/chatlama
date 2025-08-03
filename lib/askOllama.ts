// lib/ollamaClient.ts
import { Ollama } from "@langchain/community/llms/ollama";

const ollamaModel = new Ollama({
  baseUrl: "http://localhost:11434", // Ollama local server URL
  model: "llama3.2:latest", // Your Ollama model name
});

export async function askOllama(prompt: string): Promise<string> {
  try {
    const response = await ollamaModel.invoke(prompt);
    return response;
  } catch (error) {
    console.error("Error calling Ollama:", error);
    throw new Error("Ollama call failed");
  }
}
