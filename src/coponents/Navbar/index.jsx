import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex justify-between  px-10 py-5'>
        <Link to={'/'}>
        <h4>
            EvolutionX
        </h4>
        </Link>
        <ul className='flex space-x-5 md:space-x-16'>
            <Link className='hidden md:block' to={'/'}>
            <li className=''>
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
            <Link to={'https://wiki.evolution-x.org/'} target='_blank'>
            <li>
                Wiki
            </li>
            </Link>
        </ul>
    </div>
  )
}

export default Navbar