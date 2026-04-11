import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useIsMobile } from "@/hooks/use-mobile";

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
import { Button } from "./button";

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

type ConfirmationDialogProps = {
  title: string;
  description: string;
  confirmVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  isDone: boolean;
  isPending?: boolean;
  triggerButton: React.ReactElement;
};

export function ConfirmationDialog({
  title,
  description,
  confirmVariant = "default",
  onSubmit,
  isDone,
  isPending = false,
  triggerButton,
}: ConfirmationDialogProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{triggerButton}</div>
      <ResponsiveDialog
        title={title}
        description={description}
        isDone={isDone}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <form onSubmit={onSubmit} className="grid gap-4 mb-4 md:mb-0">
          <div className="flex flex-col gap-2 md:flex-row md:*:flex-1">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsOpen(false)}
              disabled={isPending}
            >
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              variant={confirmVariant}
              disabled={isPending}
            >
              {t('common.confirm')}
            </Button>
          </div>
        </form>
      </ResponsiveDialog>
    </>
  )
}