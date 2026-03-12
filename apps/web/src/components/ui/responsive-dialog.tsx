import { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

type ResponsiveDialogProps = {
  title: string;
  description: string;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  triggerButton?: React.ReactElement;
  isDone: boolean;
  children: React.ReactNode;
};

/**
 * ResponsiveDialog component that displays a dialog or drawer based on the screen size.
 *
 * It can be controlled either through props or local state depending on the
 * presence of a trigger button.
 **/
export default function ResponsiveDialog({
  title,
  description,
  isOpen,
  setIsOpen,
  isDone,
  triggerButton,
  children,
}: ResponsiveDialogProps) {
  const isDesktop = !useIsMobile();

  const [localIsOpen, setLocalIsOpen] = useState(false);

  const currentIsOpen = triggerButton ? localIsOpen : isOpen;
  const setCurrentIsOpen = triggerButton ? setLocalIsOpen : setIsOpen;

  useEffect(() => {
    if (isDone) {
      setCurrentIsOpen!(false);
    }
  }, [isDone]);

  if (isDesktop) {
    return (
      <Dialog open={currentIsOpen} onOpenChange={setCurrentIsOpen}>
        {triggerButton && (
          <DialogTrigger asChild>{triggerButton}</DialogTrigger>
        )}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={currentIsOpen} onOpenChange={setCurrentIsOpen}>
      {triggerButton && <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>}
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}
