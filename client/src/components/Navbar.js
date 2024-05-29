import React from 'react'

const Navbar = ({account}) => {
  return (
    <nav className='flex justify-between items-center border-b-[1px] border-black py-3 mb-7'>
        <h2 className='text-2xl font-semibold'>Car Rental DApp</h2>
        {account && <h2 className='font-semibold'>Account: {account}</h2>}
    </nav>
  )
}

export default Navbar