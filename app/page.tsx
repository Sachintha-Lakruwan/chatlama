"use client";

import { Textarea } from "@heroui/input";
import { useState } from "react";

export default function Home() {
  const [newChat, setNewChat] = useState<boolean>(true);
  const [message, setNewMessage] = useState<string>("");
  return (
    <section className="flex flex-col items-center gap-4 py-8 md:py-12 mx-auto max-w-[850px]">
      <div>{/* CHAT */}</div>

      <div
        className={`fixed mx-auto w-full max-w-[750px] ${
          newChat ? "bottom-2/5" : "bottom-12"
        }`}
      >
        <h1 className="text-4xl font-bold text-center mb-8">
          Ready when you are.
        </h1>
        <div className=" bg-zinc-100 p-6 py-5 rounded-4xl">
          <Textarea
            minRows={1}
            maxRows={5}
            value={message}
            className=""
            placeholder="Type karanna..."
            variant="underlined"
          />
          <div className=" w-full pt-4 flex justify-between">
            <div className=" flex gap-4">
              <div>+</div>
              <div>Tools</div>
            </div>
            <div className=" flex gap-4">
              <div>Mic</div>
              <div>Voice</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
