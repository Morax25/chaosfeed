"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer"

interface AppDrawerProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children?: React.ReactNode
  footer?: React.ReactNode
}

export const AppDrawer = ({
  open,
  onClose,
  title = "Drawer Title",
  description,
  children,
  footer,
}: AppDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DrawerContent className="w-full h-full bg-gray-700 fle flex-col">
        <div className="flex justify-between items-center mb-2">
          <DrawerHeader>
            <DrawerTitle className="text-white">{title}</DrawerTitle>
            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon">
              <X size={40} color="white" className="bg-red-800 rounded-full cursor-pointer" />
            </Button>
          </DrawerClose>
        </div>

        <div className="flex-1 overflow-y-auto px-4">{children}</div>

        {footer && (
          <DrawerFooter className="px-4 pt-4">
            {footer}
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}
