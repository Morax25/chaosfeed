"use client"
import { useState } from 'react'
import { AppDrawer } from '../components/Drawer'
import Posts from '../components/Posts'

const page = () => {
  const [open, setOpen] = useState(true)

  return (
    <div className='py-2 relative sm:px-4 flex flex-col gap-5 h-full w-full'>
      <AppDrawer children={<Posts/>} open={open} onClose={()=>{setOpen(false)}} title='My app'/>
      <Posts/>
      <Posts/>
      <Posts/>
      <Posts/>
      <Posts/>
      <Posts/>
    </div>
  )
}

export default page
