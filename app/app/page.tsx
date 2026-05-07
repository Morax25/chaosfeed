"use client"
import { useState } from 'react'
import { AppDrawer } from '../components/Drawer'
import Posts from '../components/Posts'

const page = () => {
  return (
    <div className='py-2 relative sm:px-4 flex flex-col gap-5 h-full w-full'>
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
