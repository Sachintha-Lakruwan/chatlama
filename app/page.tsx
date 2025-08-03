"use client";

import { Textarea } from "@heroui/input";
import { useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { RiVoiceAiFill } from "react-icons/ri";
import { TbTools } from "react-icons/tb";
import { FaArrowCircleUp } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";

export default function Home() {
  function handleSubmit() {
    if (newChat) {
      setNewChat(false);
    }
  }
  const [newChat, setNewChat] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  return (
    <section className="flex flex-col items-center gap-4 py-8 md:py-12 mx-auto max-w-[850px]">
      <div>{/* CHAT */}</div>

      <div
        className={`fixed mx-auto w-full max-w-[750px] transition-all duration-300 ease-in-out ${
          newChat ? "bottom-2/5" : "bottom-12"
        }`}
      >
        <h1
          className={`text-4xl font-bold text-center mb-8 ${!newChat ? "hidden" : "block"}`}
        >
          Ready when you are.
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
              <div className=" text-2xl">
                <CiCirclePlus />
              </div>
              <div className=" flex items-center gap-2">
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
