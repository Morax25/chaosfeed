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

import { useDrawer } from "@/store/drawerStore"
import CreatePost from "./CreatePost"

export const AppDrawer = () => {
  const open = useDrawer((s) => s.open)
  const title = useDrawer((s) => s.title)
  const description = useDrawer((s) => s.description)
  const type = useDrawer((s) => s.type)
  const props = useDrawer((s) => s.props)
  const closeDrawer = useDrawer((s) => s.closeDrawer)

  return (
    <Drawer
      open={open}
      onOpenChange={(v) => !v && closeDrawer()}
    >
      <DrawerContent className="w-full h-full bg-gray-900 border-none flex flex-col">
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
              className="group h-9 w-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <X
                size={18}
                className="text-white group-hover:rotate-90 transition-all duration-200"
              />
            </Button>
          </DrawerClose>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {type === "createPost" && (
            <CreatePost {...props} />
          )}

          {type === "comments" && (
            <CreatePost {...props} />
          )}
        </div>

        <DrawerFooter />
      </DrawerContent>
    </Drawer>
  )
}
