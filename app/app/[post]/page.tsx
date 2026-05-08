import React from 'react'

const page = ({params}:{params:{post:string}}) => {
  return (
    <div>Post id is{params.post}</div>
  )
}

export default page
