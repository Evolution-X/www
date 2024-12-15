import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import evoloading from "../../assets/evoloading.gif"
import evolution from "../../assets/evolution.svg"

const variants = {
  hidden: { opacity: 0, y: 75, transition: { delay: 0.2 } },
  visible: { opacity: 1, y: 0, transition: { delay: 0.2 } },
}

const Team = () => {
  const [teamData, setTeamData] = useState(null)
  const [maintainersData, setMaintainersData] = useState(null)

  // Fetch the team.json data
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/Evolution-X/www_gitres/main/team/team.json"
        )
        const data = await response.json()
        setTeamData(data)
      } catch (error) {
        console.error("Error fetching team data:", error)
      }
    }

    fetchTeamData()
  }, [])

  // Fetch the maintainers.json data
  useEffect(() => {
    const fetchMaintainersData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/Evolution-X/www_gitres/main/team/maintainers.json"
        )
        const data = await response.json()
        setMaintainersData(data)
      } catch (error) {
        console.error("Error fetching maintainers data:", error)
      }
    }

    fetchMaintainersData()
  }, [])

  if (!teamData || !maintainersData) {
    return (
      <img className="mx-auto" src={evoloading} alt="Loading..." />
    )
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className="mx-4 flex flex-col items-center justify-center gap-10 md:gap-20 lg:mx-16 xl:mx-auto xl:w-[64rem]"
    >
      <div className="inline-flex flex-col items-baseline gap-2 text-center font-[Prod-bold] text-4xl sm:flex-row sm:text-5xl lg:gap-4 lg:text-6xl">
        <span className="evoxhighlight">Team</span>
        <img className="h-7 sm:h-10 lg:h-12" src={evolution} alt="Logo" />
      </div>
      
      {/* Founders Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mx-auto flex w-fit flex-col items-center justify-center border-4 border-[#afbdf3] p-10"
      >
        <div className="mx-0 -mt-14 flex flex-col items-center justify-between text-xs lg:-mx-56 xl:-mx-64">
          <div className="mb-12 w-fit bg-[#040214] px-3 text-2xl">Founders</div>
          <Card list={teamData.founders} shadowOn={true} />
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className="mx-auto mb-12 flex w-fit flex-col items-center justify-center border-4 border-[#afbdf3] px-10 pb-20 pt-10 xl:p-10"
      >
        <div className="-my-14 flex flex-col items-center justify-between text-xs">
          <div className="mb-12 w-fit bg-[#040214] px-3 text-2xl">Project Members</div>
          <Card list={teamData.teamMembers} shadowOn={false} />
          <div className="mt-12 hidden w-fit bg-[#040214] px-3 text-2xl xl:block">
            These are some of the people who have helped bring us here today
          </div>
        </div>
      </motion.div>

      {/* Maintainers Section */}
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className="mx-auto mb-12 flex w-fit flex-col items-center justify-center border-4 border-[#afbdf3] px-10 pb-20 pt-10 xl:p-10"
      >
        <div className="-my-14 flex flex-col items-center justify-between text-xs">
          <div className="mb-12 w-fit bg-[#040214] px-3 text-2xl">Maintainers</div>
          <Card list={maintainersData.maintainers} shadowOn={false} isMaintainer={true} />
          <div className="mt-12 hidden w-fit bg-[#040214] px-3 text-2xl xl:block">
            These are the amazing individuals maintaining Evolution X
          </div>
        </div>
      </motion.div>

      {/* About Evolution X */}
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className="z-10 mx-10 flex flex-col items-center justify-center gap-10 sm:mx-24 xl:flex-row"
      >
        <div className="space-y-10 md:text-center xl:text-left">
          <div className="text-nowrap !bg-clip-text text-4xl text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(92deg,_#2fc1ee,_#dbe6ea)] lg:text-5xl">
            About Evolution X
          </div>
          <div className="text-xl lg:text-2xl">
            Evolution X is a custom Android ROM project that mimics the user
            experience of Google Pixel devices while enhancing it with extensive
            customization options. Launched in March 2019 by a team of three
            developers, led by Jose Antonio Huab "Joey", Evolution X has since
            evolved into one of the most sought-after custom ROMs.
          </div>
        </div>
        <img
          className="mx-10 h-56 rounded-[2.5rem] object-cover lg:h-72"
          alt="Evolution X Banner"
          src={`https://raw.githubusercontent.com/Evolution-X/www_gitres/main/team/banner.png`}
        />
      </motion.div>
    </motion.div>
  )
}

export default Team

function Card({ list, shadowOn, isMaintainer = false }) {
  return (
    <div className="z-10 grid gap-16 md:grid-cols-2 lg:grid-cols-3">
      {list.map((item, index) => {
        const avatarUrl = isMaintainer
          ? `https://avatars.githubusercontent.com/${item.github}`
          : `https://avatars.githubusercontent.com/${item.github}`

        const name = isMaintainer ? item.name : item.name || item.github

        const githubUrl = isMaintainer
          ? `https://github.com/${item.github}`
          : `https://github.com/${item.github}`

        const devicesList = isMaintainer && item.devices ? (
          <div className="text-xs mt-2 text-gray-300">
            {item.devices.map((device, deviceIndex) => (
              <div key={deviceIndex}>{device}</div>
            ))}
          </div>
        ) : null

        return (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className={`relative flex h-80 w-64 flex-col justify-end rounded-3xl text-left duration-300 ${
              shadowOn
                ? "shadow-[0px_0px_38.5px_14px_#ffffff25] hover:shadow-[0px_0px_38.5px_14px_#ffffff50]"
                : "shadow-[0px_0px_38.5px_14px_#FF8AF320] hover:shadow-[0px_0px_38.5px_14px_#FF8AF350]"
            }`}
          >
            <img
              className="absolute h-80 w-64 rounded-3xl object-cover"
              alt={name}
              src={avatarUrl}
            />
            <div className="z-20 rounded-b-3xl bg-black/25 px-4 py-4">
              <p className="font-[Prod-bold] text-base">{name}</p>
              {!isMaintainer && item.role && <div className="text-xs"><p>{item.role}</p></div>}
              {devicesList}
            </div>
          </a>
        )
      })}
    </div>
  )
}
