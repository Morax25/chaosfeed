"use client"

import * as React from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
 DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
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
      <DrawerContent className="w-full h-full bg-zinc-900 border-none flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <DrawerHeader className="p-0 space-y-0.5">
            <DrawerTitle className="text-white text-lg font-semibold leading-none">
              {title}
            </DrawerTitle>

            {description && (
              <DrawerDescription className="text-xs text-zinc-400">
                {description}
              </DrawerDescription>
            )}
          </DrawerHeader>

          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="group transition transition-all duration-200 h-9 w-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <X
                size={18}
                className="text-white transition transition-all duration-200 group-hover:rotate-90"
              />
            </Button>
          </DrawerClose>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {children}
        </div>

        {footer && (
          <DrawerFooter className="px-4 pt-4 border-t border-white/10">
            {footer}
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}
