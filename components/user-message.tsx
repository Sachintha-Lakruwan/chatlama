import React from "react";

export default function UserMessage({ content }: { content: string }) {
  return (
    <div className=" w-fit max-w-4/5 p-4 bg-default-200 rounded-3xl ml-auto">
      <p>{content}</p>
    </div>
  );
}
