import { db, ChatMessage, aMessage } from "./db";

export async function getChatHistory(chatId: string) {
  const messages = await db.messages.where("chatId").equals(chatId).toArray();
  return messages;
}

export async function addMessageToChat(chatId: string, message: aMessage) {
  await db.messages.add({
    chatId,
    message: [message],
    timestamp: Date.now(),
  } as ChatMessage);
}
