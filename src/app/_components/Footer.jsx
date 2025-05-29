'use client'

import React from 'react'

import evolutionSvg from '../../assets/icons/evolution.svg'
import discordIconSvg from '../../assets/icons/discordicon.svg'
import ghIconSvg from '../../assets/icons/ghicon.svg'
import xLogoSvg from '../../assets/icons/xlogo.svg'
import donateIconSvg from '../../assets/icons/donateicon.svg'

function Footer() {
  return (
    <div className='m-6 flex flex-col gap-1 border-t border-white/50 px-4 pt-6 tracking-wide text-white'>
      <div className='flex flex-col items-center sm:flex-row sm:justify-between lg:flex-row'>
        <div className='inline-flex flex-col'>
          <img className='h-10' src={evolutionSvg.src} alt='Evolution X Logo' />
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
              <img
                src={discordIconSvg.src}
                alt='Discord'
                width={48}
                height={48}
              />
            </a>

            <a
              href='https://github.com/Evolution-X'
              target='_blank'
              rel='noreferrer'
            >
              <img src={ghIconSvg.src} alt='GitHub' width={48} height={48} />
            </a>
            <a
              href={'https://x.com/EvolutionXROM'}
              target='_blank'
              rel='noreferrer'
            >
              <img
                className='rounded-full bg-white p-2'
                src={xLogoSvg.src}
                alt='X Logo'
                width={48}
                height={48}
              />
            </a>
            <a
              href='https://www.gofundme.com/f/evolutionx-developers'
              target='_blank'
              rel='noreferrer'
            >
              <img
                src={donateIconSvg.src}
                alt='Donate'
                width={48}
                height={48}
              />
            </a>
          </div>
        </div>
      </div>
      <div className='font-prod-light inline-flex flex-col items-center justify-between gap-1 sm:flex-row'>
        <div>
          Designed by{' '}
          <a href={'https://t.me/Stock_Sucks'} target='_blank' rel='noreferrer'>
            <span className='font-prod-bold text-sm underline'>Kshitij</span>
          </a>
          <span> & </span>
          <a
            href={'https://github.com/AnierinBliss'}
            target='_blank'
            rel='noreferrer'
          >
            <span className='font-prod-bold text-sm underline'>
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
            <span className='font-prod-bold underline'>Anierin Bliss</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
