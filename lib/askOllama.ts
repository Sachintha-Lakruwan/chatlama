// lib/ollamaClient.ts
import { Ollama } from "@langchain/community/llms/ollama";
import { SetStateAction, Dispatch } from "react";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

const ollamaModel = new Ollama({
  baseUrl: "http://localhost:11434", // Ollama local server URL
  model: "llama3.2:latest", // Your Ollama model name
});

// Create a buffer memory instance
const memory = new BufferMemory();

// Create a conversation chain with memory
const chain = new ConversationChain({
  llm: ollamaModel,
  memory: memory,
});

interface AskOllamaProps {
  prompt: string;
  setMessage: Dispatch<SetStateAction<string>>;
}

export async function askOllama({
  prompt,
  setMessage,
}: AskOllamaProps): Promise<string> {
  try {
    const curMessage = prompt;
    setMessage("");

    // Use the conversation chain which automatically handles memory
    const response = await chain.call({ input: curMessage });

    return response.response;
  } catch (error) {
    console.error("Error calling Ollama:", error);
    throw new Error("Ollama call failed");
  }
}

// Function to clear memory (for new chat)
export async function clearMemory(): Promise<void> {
  await memory.clear();
}

// Export memory and chain for external access if needed
export { memory, chain };
