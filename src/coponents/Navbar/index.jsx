import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex justify-between  px-10 py-5'>
        <h4>
            EvolutionX
        </h4>
        <ul className='flex space-x-16'>
            <Link to={'/'}>
            <li>
                Home
            </li>
            </Link>
            <Link to={'downloads'}>
            <li>
                Downloads
            </li>
            </Link>
            <Link to={'/blog'}>
            <li>
                Blog
            </li>
            </Link>
            <Link to={'/wiki'}>
            <li>
                Wiki
            </li>
            </Link>
        </ul>
    </div>
  )
}

export default Navbar