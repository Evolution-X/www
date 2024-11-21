import { motion } from "framer-motion"
import joey from "../../assets/joey.png"
import anierin from "../../assets/anierin.png"
import Aidan from "../../assets/Aidan.png"
import akito from "../../assets/akito.png"
import hyde from "../../assets/Hyde.png"
import onelots from "../../assets/Onelots.png"

const Team = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10 flex flex-col items-center gap-2 px-4 text-center lg:-mt-14 lg:gap-7"
      >
        <p className="max-w-[50rem] font-[Prod-bold] text-4xl xl:text-5xl">
          We are the people who initialized this project
        </p>
      </motion.div>
      {/* our primes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mx-auto flex w-fit flex-col items-center justify-center border-4 border-[#afbdf3] p-10"
      >
        <div className="z-10 mx-0 -mt-14 flex flex-col items-center justify-between text-xs lg:-mx-56 xl:-mx-64">
          <div className="mb-12 w-fit bg-[#040214] px-3 text-2xl">
            Our Primes
          </div>
          <Card list={PrimeList} shadowOn={true} />
        </div>
      </motion.div>
      <span
        className="fadeEffect absolute left-0 top-[550px] z-0 -ml-14 [background:linear-gradient(270deg,_#373c68,_rgba(153,_153,_153,_0))] md:top-[400px] lg:top-[150px] xl:top-[250px] 2xl:top-[300px]"
        style={{
          writingMode: "vertical-lr",
        }}
      >
        Founders
      </span>
      {/* Evolution X team */}
      <div className="mx-auto mb-12 flex w-fit flex-col items-center justify-center border-4 border-[#afbdf3] px-10 pb-20 pt-10 xl:p-10">
        <div className="z-10 -my-14 flex flex-col items-center justify-between text-xs">
          <div className="mb-12 w-fit bg-[#040214] px-3 text-2xl">
            Project Members
          </div>
          <Card list={TeamMembers} shadowOn={false} />
          <div className="mt-12 hidden w-fit bg-[#040214] px-3 text-2xl xl:block">
            These are the people who brought us here today
          </div>
        </div>
        <span
          className="fadeEffect absolute right-0 z-0 my-auto -mr-14 h-full rotate-180 [background:linear-gradient(270deg,_#373c68,_rgba(153,_153,_153,_0))]"
          style={{
            writingMode: "vertical-lr",
          }}
        >
          Our Team
        </span>
      </div>
      {/* about evox */}
      <div className="z-10 mx-10 flex flex-col items-center justify-center gap-10 sm:mx-24 xl:flex-row">
        <div className="space-y-10 md:text-center xl:text-left">
          <div className="text-nowrap !bg-clip-text text-4xl text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(92deg,_#2fc1ee,_#dbe6ea)] lg:text-5xl">
            About the Evolution X
          </div>
          <div className="text-xl lg:text-2xl">
            Evolution X is a custom Android ROM project dedicated to providing a
            unique and customizable user experience. Founded in March 2019 by
            Jose Antonio Huab (Joey Huab), Evolution X has grown into a thriving
            community of developers and enthusiasts.
          </div>
        </div>
        <img
          className="mx-10 h-56 rounded-[2.5rem] object-cover lg:h-72"
          alt=""
          src="https://raw.githubusercontent.com/Evolution-X/manifest/udc/Banner.png"
        />
      </div>
    </>
  )
}

export default Team

function Card({ list, shadowOn }) {
  return (
    <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-3">
      {list.map((item, index) => (
        <div
          className={`relative flex h-80 w-64 flex-col justify-end rounded-3xl text-left duration-300 ${shadowOn ? "shadow-[0px_0px_38.5px_14px_#ffffff25] hover:shadow-[0px_0px_38.5px_14px_#ffffff50]" : "shadow-[0px_0px_38.5px_14px_#FF8AF320] hover:shadow-[0px_0px_38.5px_14px_#FF8AF350]"}`}
          key={index}
        >
          <img
            className="absolute h-80 w-64 rounded-3xl object-cover"
            alt="bruh"
            src={item.imgsrc}
          />
          <div className="z-20 rounded-b-3xl bg-black/25 px-4 py-4">
            <p className="font-[Prod-bold] text-base">{item.name}</p>
            <div className="text-xs">
              <p className="">{item.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const PrimeList = [
  {
    name: "Anierin Bliss",
    role: "Co Founder / Co Developer",
    imgsrc: anierin,
  },
  {
    name: "Jose Antonio Huab (Joey)",
    role: "Founder / Lead Developer",
    imgsrc: joey,
  },
  {
    name: "Akito Mizukito",
    role: "Co-Founder / Project Manager",
    imgsrc: akito,
  },
]

const TeamMembers = [
  {
    name: "Aidan Warner",
    imgsrc: Aidan,
  },
  {
    name: "Hyde",
    imgsrc: hyde,
  },
  {
    name: "Onelots",
    imgsrc: onelots,
  },
]
