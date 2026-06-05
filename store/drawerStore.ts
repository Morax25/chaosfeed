import { create } from "zustand"

type DrawerState = {
  open: boolean
  title: string
  description?: string
  type: "createPost" | "comments" | "statics" | "notification" | "postExpired" | null
  props: Record<string, any>

  openDrawer: (data: {
    type: "createPost" | "comments" | "statics" | "notification" | "postExpired"
    title: string
    description?: string
    props?: Record<string, any>
  }) => void

  closeDrawer: () => void
}

export const useDrawer = create<DrawerState>((set) => ({
  open: false,
  title: "",
  description: "",
  type: null,
  props: {},

  openDrawer: ({ type, title, description, props }) =>
    set({
      open: true,
      type,
      title,
      description,
      props: props || {},
    }),

  closeDrawer: () =>
    set({
      open: false,
      title: "",
      description: "",
      type: null,
      props: {},
    }),
}))
