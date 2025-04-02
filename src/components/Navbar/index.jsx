import React, { useRef } from "react"
import { Link, NavLink } from "react-router-dom"
import evoXLogo from "../../assets/evoXLogo.svg"
import menu from "../../assets/menu.svg"
import menuClose from "../../assets/menuClose.svg"
import { ArrowOutwardIcon } from "../ui/icons.tsx"

export default function Navbar() {
  const navRef = useRef(null)

  const openMenu = () => {
    navRef.current.style.top = "0px"
    document.body.style.overflow = "hidden"
    document.body.style.height = "100%"
  }

  const closeMenu = () => {
    navRef.current.style.top = "-2500px"
    document.body.style.overflow = ""
    document.body.style.height = ""
  }

  return (
    <div className="z-50 mx-8 my-3 mb-0 flex items-center justify-between py-4 uppercase lg:mx-8 lg:my-7">
      <NavLink to={"/"}>
        <img
          className="size-11 md:size-12 lg:size-14"
          src={evoXLogo}
          alt="Evolution X Logo"
        />
      </NavLink>
      <div>
        <img
          src={menu}
          alt="menu"
          className="block size-7 sm:block md:hidden lg:size-8"
          onClick={openMenu}
        />
      </div>
      <ul
        className="fixed left-0 right-0 top-[-1000px] z-50 flex h-full flex-col items-center justify-center gap-8 rounded-2xl bg-transparent text-2xl text-[#A9A9A9] backdrop-blur-xl duration-300 ease-in-out md:static md:flex-row md:bg-transparent md:pl-0 md:pt-0 md:text-[1rem] md:backdrop-blur-0 lg:gap-14"
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
          <NavLink to={"/team"} onClick={closeMenu}>
            team
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
          <NavLink to={"/merch"} onClick={closeMenu}>
            merch
          </NavLink>
        </li>
        <li>   
          <Link
            to={"https://crowdin.com/project/evolution_x"}
            target="_blank"
            className="inline-flex items-center gap-2"
          >
            translations <ArrowOutwardIcon width={20} height={20} />
          </Link>
        </li>
        <li>
          <Link
            to={"https://wiki.evolution-x.org/"}
            target="_blank"
            className="inline-flex items-center gap-2"
          >
            wiki <ArrowOutwardIcon width={20} height={20} />
          </Link>
        </li>
      </ul>
    </div>
  )
}
