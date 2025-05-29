import Link from 'next/link'

const TeamCard = ({ member }) => {
  return (
    <Link
      href={`https://github.com/${member.github}`}
      target='_blank'
      rel='noopener noreferrer'
      className='flex flex-col items-center transition-transform duration-300 hover:scale-105'
    >
      <div className='sm:h-26 sm:w-26 relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-[#0060ff] md:h-28 md:w-28'>
        <img
          src={`https://avatars.githubusercontent.com/${member.github}`}
          alt={member.name}
          className='absolute inset-0 h-full w-full object-cover'
        />
      </div>

      <h3 className='mt-3 text-center text-sm font-semibold text-white sm:text-base md:text-lg'>
        {member.name}
      </h3>
      <p className='mt-1 text-center text-xs text-[#7eaaff] sm:text-sm md:text-base'>
        {member.role}
      </p>
    </Link>
  )
}

export default TeamCard
