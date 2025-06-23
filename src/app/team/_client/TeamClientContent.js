'use client'

import { motion } from 'framer-motion'

import MaintainerCard from '../_components/MaintainerCard'
import FoundersCard from '../_components/FoundersCard'
import TeamCard from '../_components/TeamCard'

import evolutionSvg from '../../../assets/icons/evolution.svg'

const variants = {
  hidden: { opacity: 0, y: 75, transition: { delay: 0.2 } },
  visible: { opacity: 1, y: 0, transition: { delay: 0.2 } }
}

export default function TeamClientContent({ teamData, maintainersData }) {
  const teamMembers = teamData
  const { active_maintainers, inactive_maintainers } = maintainersData

  return (
    <motion.div
      variants={variants}
      initial='hidden'
      animate='visible'
      className='mx-4 flex flex-col items-center justify-center gap-10 md:gap-20 lg:mx-16 xl:mx-auto xl:w-[76rem]'
    >
      <div className='inline-flex flex-col items-baseline gap-2 text-center text-4xl font-bold sm:flex-row sm:text-5xl lg:gap-4 lg:text-6xl'>
        <span className='evoxhighlight'>Team</span>
        <img
          className='h-7 sm:h-10 lg:h-12'
          src={evolutionSvg.src}
          alt='Evolution X Logo'
        />
      </div>

      <div className='mb-12 w-full max-w-5xl rounded-lg border-4 border-[#0060ff] p-6 shadow-[0_4px_15px_rgba(0,96,255,0.4)]'>
        <div className='mb-6 flex items-center'>
          <hr className='flex-grow border-t-2 border-[#0060ff]' />
          <h2 className='mx-4 whitespace-nowrap bg-[#0f172a] px-3 text-center text-3xl font-bold text-[#0060ff] md:text-4xl'>
            Founders
          </h2>
          <hr className='flex-grow border-t-2 border-[#0060ff]' />
        </div>
        <FoundersCard />
      </div>

      <div className='mb-12 w-full max-w-5xl rounded-lg border-4 border-[#0060ff] p-6 shadow-[0_4px_15px_rgba(0,96,255,0.4)]'>
        <div className='mb-6 flex items-center'>
          <hr className='flex-grow border-t-2 border-[#0060ff]' />
          <h2 className='mx-4 whitespace-nowrap bg-[#0f172a] px-3 text-center text-3xl font-bold text-[#0060ff] md:text-4xl'>
            Team Members
          </h2>
          <hr className='flex-grow border-t-2 border-[#0060ff]' />
        </div>
        <div className='grid grid-cols-3 gap-8'>
          {teamMembers.map((member) => (
            <div key={member.github}>
              <TeamCard member={member} />
            </div>
          ))}
        </div>
      </div>

      {active_maintainers && active_maintainers.length > 0 && (
        <div className='mb-12 w-full max-w-5xl rounded-lg border-4 border-[#0060ff] p-6 shadow-[0_4px_15px_rgba(0,96,255,0.4)]'>
          <div className='mb-6 flex items-center'>
            <hr className='flex-grow border-t-2 border-[#0060ff]' />
            <h2 className='mx-4 whitespace-nowrap bg-[#0f172a] px-3 text-center text-3xl font-bold text-[#0060ff] md:text-4xl'>
              Current Maintainers
            </h2>
            <hr className='flex-grow border-t-2 border-[#0060ff]' />
          </div>
          <div className='grid w-full grid-cols-1 gap-6'>
            {active_maintainers.map((maintainer) => (
              <MaintainerCard
                key={maintainer.github}
                maintainer={maintainer}
                isActive={false}
              />
            ))}
          </div>
        </div>
      )}

      {inactive_maintainers && inactive_maintainers.length > 0 && (
        <div className='mb-12 w-full max-w-5xl rounded-lg border-4 border-[#0060ff] p-6 shadow-[0_4px_15px_rgba(0,96,255,0.4)]'>
          <div className='mb-6 flex items-center'>
            <hr className='flex-grow border-t-2 border-[#0060ff]' />
            <h2 className='mx-4 whitespace-nowrap bg-[#0f172a] px-3 text-center text-3xl font-bold text-[#0060ff] md:text-4xl'>
              Former Maintainers
            </h2>
            <hr className='flex-grow border-t-2 border-[#0060ff]' />
          </div>
          <div className='grid w-full grid-cols-1 gap-6'>
            {inactive_maintainers.map((maintainer) => (
              <MaintainerCard
                key={maintainer.github}
                maintainer={maintainer}
                isActive={true}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
