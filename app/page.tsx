"use client";

import { Textarea } from "@heroui/input";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaMicrophone } from "react-icons/fa";
import { RiVoiceAiFill } from "react-icons/ri";
import { TbTools } from "react-icons/tb";
import { FaArrowCircleUp } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import UserMessage from "@/components/user-message";
import AIMessage from "@/components/ai-message";
import { askOllama, clearMemory } from "@/lib/askOllama";
import { getRandomWelcomePhrase } from "@/utils/welcomePhrase";
import { addMessageToChat, getChatHistory } from "@/lib/db-helpers";
import { Tooltip } from "@heroui/tooltip";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";

interface aMessage {
  type: "user" | "ai";
  content: string;
}

export default function Home() {
  const searchParams = useSearchParams();
  const [chatId, setChatId] = useState<string>("");
  const [newChat, setNewChat] = useState<boolean>(true); // New chat flag
  const [message, setMessage] = useState<string>(""); // User input
  const [generating, setGenerating] = useState<boolean>(false); // Generating flag
  const [chatHistory, setChatHistory] = useState<aMessage[]>([]); // Chat history
  const [welcomePhrase, setWelcomePhrase] = useState<string>(
    getRandomWelcomePhrase()
  );

  // Check for chatId parameter and update state if it exists
  useEffect(() => {
    const loadChatHistory = async () => {
      const chatIdParam = searchParams.get("chatId");
      if (chatIdParam) {
        setChatId(chatIdParam);
        setNewChat(false);
        await getChatHistory(chatIdParam, setChatHistory);
      } else {
        setChatId(crypto.randomUUID());
        setNewChat(true);
      }
    };

    loadChatHistory();
  }, [searchParams]);

  async function handleSubmit() {
    if (!message.trim()) return;

    if (newChat) {
      setNewChat(false);
    }

    // Add user message to chat history
    const userMessage: aMessage = { type: "user", content: message };
    setChatHistory((prev) => [...prev, userMessage]);
    await addMessageToChat(chatId, { type: "user", content: message });

    setGenerating(true);
    const response = await askOllama({ prompt: message, setMessage });
    await addMessageToChat(chatId, { type: "ai", content: response });
    setGenerating(false);

    // Add AI response to chat history
    const aiMessage: aMessage = { type: "ai", content: response };
    setChatHistory((prev) => [...prev, aiMessage]);
  }

  // Function to start a new chat
  async function startNewChat() {
    await clearMemory(); // Clear the buffer memory
    setChatHistory([]); // Clear chat history
    setChatId(crypto.randomUUID()); // Generate a new chatId
    setNewChat(true); // Reset to new chat state
    setMessage(""); // Clear input
    setWelcomePhrase(getRandomWelcomePhrase());
  }

  function handleUploadPDF() {
    console.log("Uploading PDF");
  }

  return (
    <section className="flex flex-col items-center gap-4 mx-auto max-w-[850px]">
      <div className=" w-full flex flex-col gap-8 max-w-[750px] pb-[30dvh]">
        {!newChat && (
          <div className="flex flex-col gap-4">
            {chatHistory.map((msg, index) => (
              <div key={index}>
                {msg.type === "user" ? (
                  <UserMessage content={msg.content} />
                ) : (
                  <AIMessage content={msg.content} />
                )}
              </div>
            ))}
            {generating && (
              <span className="relative flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-foreground"></span>
              </span>
            )}
          </div>
        )}
      </div>

      <div
        className={`fixed mx-4 w-11/12 max-w-[750px] transition-all duration-300 ease-in-out ${
          newChat ? "bottom-2/5" : "bottom-12"
        } before:content-[''] before:absolute before:inset-0 before:bg-background before:rounded-4xl before:pb-[50vh]`}
      >
        <h1
          className={`text-4xl relative z-10 font-bold text-center mb-8 ${!newChat ? "hidden" : "block"}`}
        >
          {welcomePhrase}
        </h1>
        <div className=" bg-default-200 p-6 py-5 rounded-4xl drop-shadow-xl">
          <Textarea
            minRows={1}
            maxRows={5}
            value={message}
            onValueChange={setMessage}
            placeholder="Ask anything..."
            variant="underlined"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Prevents newline
                handleSubmit(); // Your submit function
              }
            }}
          />
          <div className=" w-full pt-4 flex justify-between">
            <div className=" flex gap-6 items-center">
              <div className=" text-2xl cursor-pointer">
                <Dropdown>
                  <DropdownTrigger>
                    <CiCirclePlus />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Static Actions">
                    <DropdownItem onClick={handleUploadPDF} key="pdf">
                      Attach PDF
                    </DropdownItem>
                    <DropdownItem key="image">Attach Image</DropdownItem>
                    <DropdownItem key="voice">Attach Voice</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className=" flex items-center gap-2 cursor-not-allowed">
                <TbTools className=" text-xl" />
                <div className=" text-md">Tools</div>
              </div>
            </div>
            <div className=" flex gap-6 items-center">
              <div className=" text-xl">
                <FaMicrophone />
              </div>
              <div className=" text-2xl">
                {message == "" ? <RiVoiceAiFill /> : <FaArrowCircleUp />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
