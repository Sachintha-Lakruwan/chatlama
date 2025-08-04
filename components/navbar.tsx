"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Kbd } from "@heroui/kbd";
import { Input } from "@heroui/input";
import NextLink from "next/link";

import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon } from "@/components/icons";
import DrawerComponent from "./drawer";
import { useState } from "react";
import { FaHistory } from "react-icons/fa";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  function historyButton() {
    if (isOpen) {
      return setIsOpen(false);
    }
    return setIsOpen(true);
  }

  function handleChatClick(chatId: string) {
    setIsOpen(false);
    router.push(`/?chatId=${chatId}`);
  }

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          {/* <NextLink className="flex justify-start items-center gap-1" href="/"> */}
          {/* <OllamaIcon /> */}
          <p className="font-bold text-xl text-inherit ">LamaChat</p>
          {/* </NextLink> */}
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden sm:flex gap-2">
          <FaHistory
            className="text-default-400 text-xl cursor-pointer"
            onClick={historyButton}
          />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <FaHistory
          className="text-default-400 text-xl cursor-pointer"
          onClick={historyButton}
        />
        <NavbarMenuToggle />
      </NavbarContent>

      <DrawerComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleChatClick={handleChatClick}
      />

      <NavbarMenu>{searchInput}</NavbarMenu>
    </HeroUINavbar>
  );
};
