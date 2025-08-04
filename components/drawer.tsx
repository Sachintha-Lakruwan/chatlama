"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { Divider } from "@heroui/divider";
// import { Button } from "@heroui/button";
import { getChatList, ChatListItem } from "@/lib/db-helpers";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChatListItemComponent from "./chat-list-item";
import { BsThreeDots } from "react-icons/bs";

interface DrawerComponentProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleChatClick: (chatId: string) => void;
}

export default function DrawerComponent({
  isOpen,
  setIsOpen,
  handleChatClick,
}: DrawerComponentProps) {
  const [chatList, setChatList] = useState<ChatListItem[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchChatList = async () => {
      const list = await getChatList();
      setChatList(list);
      console.log(list);
    };
    fetchChatList();
  }, []);

  return (
    <>
      <Drawer
        isOpen={isOpen}
        backdrop="transparent"
        placement="left"
        radius="none"
        size="xs"
        onOpenChange={setIsOpen}
        hideCloseButton={true}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                LamaChat
              </DrawerHeader>
              <Divider />

              <DrawerBody>
                <p className="text-sm font-bold text-default-500">Chats</p>
                <ul className="flex flex-col gap-2">
                  {chatList.map((chat) => (
                    <ChatListItemComponent
                      key={chat.chatId}
                      chat={chat}
                      onClick={handleChatClick}
                    />
                  ))}
                </ul>
              </DrawerBody>
              {/* <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </DrawerFooter> */}
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
