import React, { useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import evoXLogo from '../assets/icons/evoXLogo.svg'
import menu from '../assets/icons/menu.svg'
import menuClose from '../assets/icons/menuClose.svg'
import { ArrowOutwardIcon } from '../assets/icons/icons.tsx'

export default function Navbar() {
  const navRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const openMenu = () => {
    setIsMenuOpen(true)
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100%'
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    document.body.style.overflow = ''
    document.body.style.height = ''
  }

  return (
    <div className='z-50 mx-8 my-3 mb-0 flex items-center justify-between py-4 uppercase lg:mx-8 lg:my-7'>
      <NavLink to={'/'}>
        <img
          className='size-11 md:size-12 lg:size-14'
          src={evoXLogo}
          alt='Evolution X Logo'
        />
      </NavLink>
      <div>
        <img
          src={menu}
          alt='menu'
          className='block size-7 cursor-pointer sm:block md:hidden lg:size-8'
          onClick={openMenu}
        />
      </div>
      <ul
        className={`fixed left-0 right-0 z-50 flex h-full flex-col items-center justify-center gap-8 rounded-2xl bg-transparent text-2xl text-[#A9A9A9] duration-300 ease-in-out md:static md:flex-row md:bg-transparent md:pl-0 md:pt-0 md:text-[1rem] md:backdrop-blur-0 lg:gap-14 ${isMenuOpen ? 'top-0 backdrop-blur-xl' : 'top-[-2500px]'}`}
        ref={navRef}
      >
        <img
          src={menuClose}
          alt='Close menu'
          className='absolute right-10 top-10 block size-8 cursor-pointer md:hidden'
          onClick={closeMenu}
        />

        {[
          { path: '/', label: 'Home' },
          { path: '/devices', label: 'Devices' },
          { path: '/team', label: 'Team' },
          { path: '/blog', label: 'Blog' },
          { path: '/merch', label: 'Merch' },
          { path: '/stats', label: 'Stats' }
        ].map(({ path, label }) => (
          <li key={path}>
            <NavLink
              to={path}
              onClick={closeMenu}
              className={({ isActive }) =>
                `relative transition-colors duration-300 ${
                  isActive ? 'font-bold text-[#0060ff]' : 'text-[#A9A9A9]'
                } hover:text-[#0060ff]`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}

        <li>
          <Link
            to={'https://crowdin.com/project/evolution_x'}
            target='_blank'
            className='inline-flex items-center gap-2'
          >
            Translations <ArrowOutwardIcon width={20} height={20} />
          </Link>
        </li>
        <li>
          <Link
            to={'https://wiki.evolution-x.org/'}
            target='_blank'
            className='inline-flex items-center gap-2'
          >
            Wiki <ArrowOutwardIcon width={20} height={20} />
          </Link>
        </li>
      </ul>
    </div>
  )
}
