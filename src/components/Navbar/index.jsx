import React, { useRef } from "react"
import { Link, NavLink } from "react-router-dom"
import evoXLogo from "../../assets/evoXLogo.svg"
import menu from "../../assets/menu.svg"
import menuClose from "../../assets/menuClose.svg"

export default function Navbar() {
  const navRef = useRef(null)

  const openMenu = () => {
    navRef.current.style.top = "0px"
    console.log("menu open")
  }

  const closeMenu = () => {
    navRef.current.style.top = "-2500px"
    console.log("menu close")
  }

  return (
    <div className="z-50 mx-8 overflow-y-hidden my-3 md:my-7 py-4 mb-0 flex items-center justify-between uppercase md:mx-0">
      <NavLink to={"/"}>
        <img className="size-11 md:size-14" src={evoXLogo} alt="evoXLogo" />
      </NavLink>
      <div>
        <img
          src={menu}
          alt="menu"
          className="block size-7 md:size-8 md:hidden"
          onClick={openMenu}
        />
      </div>
      <ul
        className="fixed left-0 right-0 top-[-1000px] z-50 flex h-full flex-col items-center justify-center gap-8 rounded-2xl bg-transparent text-2xl text-[#A9A9A9] backdrop-blur-xl duration-300 ease-in-out md:static md:flex-row md:gap-14 md:bg-transparent md:pl-0 md:pt-0 md:text-[1rem] md:backdrop-blur-0"
        ref={navRef}
      >
        <img
          src={menuClose}
          alt="menu"
          className="absolute right-10 top-10 block size-8 md:hidden"
          onClick={closeMenu}
        />
        <li>
          <NavLink to={"/"} onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={"downloads"} onClick={closeMenu}>
            Download
          </NavLink>
        </li>
        <li>
          <NavLink to={"/blog"} onClick={closeMenu}>
            blog
          </NavLink>
        </li>
        <li>
          <Link to={"https://wiki.evolution-x.org/"} target="_blank">
            wiki
          </Link>
        </li>
      </ul>
    </div>
  )
}
