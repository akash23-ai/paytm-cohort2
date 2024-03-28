import React from 'react'
import Navbar from './ui/Navbar'

function Setting() {
    // should use redux or recoil
  return (
    <div className='h-full w-[95%] text-lg font-bold'>
        <Navbar user={{user: {firstName: "John"}}} />

    </div>
  )
}

export default Setting