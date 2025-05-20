import ghicon from '../assets/icons/ghicon.svg'
import donateicon from '../assets/icons/donateicon.svg'
import discordicon from '../assets/icons/discordicon.svg'
import evolution from '../assets/icons/evolution.svg'
import xlogo from '../assets/icons/xlogo.svg'

function index() {
  return (
    <div className='m-6 flex flex-col gap-1 border-t border-white/50 px-4 pt-6 tracking-wide text-white'>
      <div className='flex flex-col items-center sm:flex-row sm:justify-between lg:flex-row'>
        <div className='inline-flex flex-col'>
          <img className='h-10' src={evolution} alt='' />
          <p className='evoxhighlight mt-2 text-center text-lg sm:text-start'>
            #KeepEvolving
          </p>
        </div>
        <div className='flex justify-center space-x-2 lg:justify-end'>
          <div className='my-5 flex h-12 justify-evenly gap-4'>
            <a
              href={'https://discord.com/invite/evolution-x-670512508871639041'}
              target='_blank'
              rel='noreferrer'
            >
              <img src={discordicon} alt='' />
            </a>

            <a
              href='https://github.com/Evolution-X'
              target='_blank'
              rel='noreferrer'
            >
              <img src={ghicon} alt='' />
            </a>
            <a
              href={'https://x.com/EvolutionXROM'}
              target='_blank'
              rel='noreferrer'
            >
              <img className='rounded-full bg-white p-2' src={xlogo} alt='' />
            </a>
            <a
              href='https://www.gofundme.com/f/evolutionx-developers'
              target='_blank'
              rel='noreferrer'
            >
              <img src={donateicon} alt='' />
            </a>
          </div>
        </div>
      </div>
      <div className='inline-flex flex-col items-center justify-between gap-1 font-[Prod-light] sm:flex-row'>
        <div>
          Designed by{' '}
          <a href={'https://t.me/Stock_Sucks'} target='_blank' rel='noreferrer'>
            <span className='font-[Prod-bold] text-sm underline'>Kshitij</span>
          </a>
          <span> & </span>
          <a
            href={'https://github.com/AnierinBliss'}
            target='_blank'
            rel='noreferrer'
          >
            <span className='font-[Prod-bold] text-sm underline'>
              Anierin Bliss
            </span>
          </a>
        </div>
        <div className=''>
          Developed by{' '}
          <a
            href={'https://github.com/AnierinBliss'}
            target='_blank'
            rel='noreferrer'
          >
            <span className='font-[Prod-bold] underline'>Anierin Bliss</span>
          </a>
          <span> , </span>
          <a
            href={'https://github.com/Prathamk07'}
            target='_blank'
            rel='noreferrer'
          >
            <span className='font-[Prod-bold] underline'>Prathamk07</span>
          </a>
          <span> & </span>
          <a
            href={'https://github.com/ZirgomHaidar'}
            target='_blank'
            rel='noreferrer'
          >
            <span className='font-[Prod-bold] underline'>Zirgom Haidar</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default index
