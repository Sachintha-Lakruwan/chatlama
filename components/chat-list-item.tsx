import { BsThreeDots } from "react-icons/bs";
import { ChatListItem } from "@/lib/db-helpers";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { deleteChat } from "@/lib/db-helpers";

interface ChatListItemProps {
  chat: ChatListItem;
  onClick: (chatId: string) => void;
}

export default function ChatListItemComponent({
  chat,
  onClick,
}: ChatListItemProps) {
  return (
    <li
      className=" px-4 py-2 rounded-2xl cursor-pointer hover:bg-default-200 flex justify-between items-center"
      onClick={() => onClick(chat.chatId)}
    >
      <p className="overflow-hidden text-ellipsis whitespace-nowrap">
        {chat.firstMessage.content}
      </p>
      <Dropdown>
        <DropdownTrigger>
          <BsThreeDots />
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            key="copy"
            onClick={() => navigator.clipboard.writeText(chat.chatId)}
          >
            Copy Id
          </DropdownItem>
          {/* <DropdownItem key="download" onClick={() => {}}>
            Download Chat
          </DropdownItem> */}
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            onClick={() => deleteChat(chat.chatId)}
          >
            Delete Chat
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </li>
  );
}
