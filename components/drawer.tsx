import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { Button } from "@heroui/button";

interface DrawerComponentProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function DrawerComponent({
  isOpen,
  setIsOpen,
}: DrawerComponentProps) {
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
              <DrawerBody></DrawerBody>
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
