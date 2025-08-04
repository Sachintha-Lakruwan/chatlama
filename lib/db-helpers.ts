import { db, ChatMessage, aMessage } from "./db";
import { memory, chain } from "./askOllama";

export async function getChatHistory(
  chatId: string,
  setChatHistory: (chatHistory: aMessage[]) => void
) {
  const messages = await db.messages.where("chatId").equals(chatId).toArray();
  const chatHistory = messages.map((message) => message.message[0]);
  await memory.clear();

  // Update memory with chat history
  for (const msg of chatHistory) {
    if (msg.type === "user") {
      memory.chatHistory.addUserMessage(msg.content);
    } else {
      memory.chatHistory.addAIChatMessage(msg.content);
    }
  }

  setChatHistory(chatHistory);
}

export async function addMessageToChat(chatId: string, message: aMessage) {
  await db.messages.add({
    chatId,
    message: [message],
    timestamp: Date.now(),
  } as ChatMessage);
}
