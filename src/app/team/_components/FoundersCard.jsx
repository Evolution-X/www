import Link from 'next/link'

const founders = [
  {
    name: 'Anierin Bliss',
    role: 'Co-Founder / Co-Developer',
    github: 'anierinbliss'
  },
  {
    name: 'Joey Huab',
    role: 'Founder / Lead Developer',
    github: 'joeyhuab'
  },
  {
    name: 'Akito Mizukito',
    role: 'Co-Founder / Project Manager',
    github: 'RealAkito'
  }
]

const FoundersCard = () => {
  return (
    <div className='grid grid-cols-3 justify-items-center gap-12'>
      {founders.map((founder, index) => {
        const isJoey = index === 1
        return (
          <Link
            key={founder.github}
            href={`https://github.com/${founder.github}`}
            target='_blank'
            rel='noopener noreferrer'
            className={`flex flex-col items-center transition-transform duration-300 hover:scale-105 ${
              isJoey ? 'z-10' : ''
            }`}
          >
            <div
              className={`relative overflow-hidden rounded-full ring-2 transition-shadow duration-300 ${
                isJoey
                  ? 'h-28 w-28 shadow-[0_0_20px_#4da6ff] ring-[#0060ff] sm:h-32 sm:w-32 md:h-36 md:w-36'
                  : 'sm:h-26 sm:w-26 h-24 w-24 ring-[#0060ff] md:h-28 md:w-28'
              }`}
            >
              <img
                src={`https://avatars.githubusercontent.com/${founder.github}`}
                alt={founder.name}
                className='absolute inset-0 h-full w-full object-cover'
              />
            </div>

            <h3
              className={`mt-3 text-center font-semibold ${
                isJoey
                  ? 'text-base text-[#4da6ff] sm:text-lg md:text-2xl'
                  : 'text-sm text-white sm:text-base md:text-xl'
              }`}
            >
              {founder.name}
            </h3>
            <p
              className={`mt-1 text-center ${
                isJoey
                  ? 'text-xs text-[#4da6ff] sm:text-sm md:text-lg'
                  : 'text-xs text-[#7eaaff] sm:text-sm md:text-base'
              }`}
            >
              {founder.role}
            </p>
          </Link>
        )
      })}
    </div>
  )
}

export default FoundersCard
