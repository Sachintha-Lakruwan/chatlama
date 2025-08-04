// lib/db.ts
import Dexie, { Table } from "dexie";

// Define your data type
export interface aMessage {
  type: "user" | "ai";
  content: string;
}

export interface ChatMessage {
  id?: number;
  chatId: string;
  message: aMessage[];
  timestamp: number;
}

// Extend Dexie
class MyAppDatabase extends Dexie {
  messages!: Table<ChatMessage, number>;

  constructor() {
    super("lamachat");
    this.version(1).stores({
      messages: "++id, chatId, timestamp", // indexes
    });
  }
}

export const db = new MyAppDatabase();
