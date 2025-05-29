'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import evoXLogoSvg from '../../assets/icons/evoXLogo.svg'
import menuSvg from '../../assets/icons/menu.svg'
import menuCloseSvg from '../../assets/icons/menuClose.svg'
import arrowOutwardSvg from '../../assets/icons/arrowOutward.svg'

export default function Navbar() {
  const navRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

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

  const isActiveLink = (currentPath, linkHref) => {
    if (linkHref === '/') {
      return currentPath === '/'
    }
    return currentPath.startsWith(linkHref)
  }

  return (
    <div className='z-50 mx-8 my-3 mb-0 flex items-center justify-between py-4 uppercase lg:mx-8 lg:my-7'>
      <Link href='/' onClick={closeMenu}>
        <img
          className='size-11 md:size-12 lg:size-14'
          src={evoXLogoSvg.src}
          alt='Evolution X Logo'
          width={56}
          height={56}
        />
      </Link>
      <div>
        <img
          src={menuSvg.src}
          alt='menu'
          className='block size-7 cursor-pointer sm:block md:hidden lg:size-8'
          onClick={openMenu}
          width={28}
          height={28}
        />
      </div>
      <ul
        className={`fixed left-0 right-0 z-50 flex h-full flex-col items-center justify-center gap-8 rounded-2xl bg-transparent text-2xl text-[#A9A9A9] duration-300 ease-in-out md:static md:flex-row md:bg-transparent md:pl-0 md:pt-0 md:text-[1rem] md:backdrop-blur-0 lg:gap-14 ${isMenuOpen ? 'top-0 backdrop-blur-xl' : 'top-[-2500px]'}`}
        ref={navRef}
      >
        <img
          src={menuCloseSvg.src}
          alt='Close menu'
          className='absolute right-10 top-10 block size-8 cursor-pointer md:hidden'
          onClick={closeMenu}
          width={32}
          height={32}
        />

        {[
          { href: '/', label: 'Home' },
          { href: '/devices', label: 'Devices' },
          { href: '/team', label: 'Team' },
          { href: '/blog', label: 'Blog' }
        ].map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              onClick={closeMenu}
              className={`relative transition-colors duration-300 ${
                isActiveLink(pathname, href)
                  ? 'font-bold text-[#0060ff]'
                  : 'text-white'
              } hover:text-[#0060ff]`}
            >
              {label}
            </Link>
          </li>
        ))}

        <li>
          <Link
            href='https://crowdin.com/project/evolution_x'
            target='_blank'
            className='inline-flex items-center gap-2 text-white transition-colors duration-300 hover:text-[#0060ff]'
            rel='noopener noreferrer'
            onClick={closeMenu}
          >
            Translations{' '}
            <img
              src={arrowOutwardSvg.src}
              alt='External link icon'
              width={20}
              height={20}
            />
          </Link>
        </li>
        <li>
          <Link
            href='https://wiki.evolution-x.org/'
            target='_blank'
            className='inline-flex items-center gap-2 text-white transition-colors duration-300 hover:text-[#0060ff]'
            rel='noopener noreferrer'
            onClick={closeMenu}
          >
            Wiki{' '}
            <img
              src={arrowOutwardSvg.src}
              alt='External link icon'
              width={20}
              height={20}
            />
          </Link>
        </li>
      </ul>
    </div>
  )
}
