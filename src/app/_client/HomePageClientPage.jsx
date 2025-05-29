'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BackgroundGradientAnimation } from './BackgroundGradientAnimation'
import { Meteors } from './Meteors'
import ScreenshotCarousel from '../_components/ScreenshotCarousel'
import { LATEST_VERSION } from '../../constants'

import arrowOutwardSvg from '../../assets/icons/arrowOutward.svg'
import evolutionSvg from '../../assets/icons/evolution.svg'

const variants = {
  hidden: { opacity: 0, y: 75 },
  visible: { opacity: 1, y: 0 }
}

const HomePageClientPage = ({ initialLatestAndroidVersion, screenshotUrls }) => {
  return (
    <>
      <BackgroundGradientAnimation />
      <motion.div
        className='TOP font-productsans z-10 flex flex-col items-center justify-center space-y-6 font-bold'
        variants={variants}
        initial='hidden'
        animate='visible'
        viewport={{ once: true }}
      >
        <div className='inline-flex flex-col items-center text-4xl leading-tight sm:text-5xl lg:text-6xl'>
          <p>
            <span className='evoxhighlight'>Evolve</span> your
          </p>
          <p>Android device</p>
        </div>
        <div className='font-productsans inline-flex flex-col items-center text-center text-lg font-light leading-tight sm:text-xl lg:text-2xl'>
          <p>Pixel UI, Customization & more.</p>
          <p>
            We are{' '}
            <span>
              <img
                className='h-7'
                src={evolutionSvg.src}
                alt='Evolution X Logo'
              />
            </span>
          </p>
        </div>
        <div className='inline-flex flex-col items-center gap-2 pt-3 text-center sm:flex-row sm:gap-3 lg:flex-row lg:gap-6'>
          <Link href='/devices'>
            <motion.div
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 1 }}
              className='homebutton'
            >
              Browse Devices
            </motion.div>
          </Link>
          <Link
            href='https://wiki.evolution-x.org/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <motion.div
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 1 }}
              className='homebutton'
            >
              <div className='inline-flex items-center gap-2'>
                Learn More{' '}
                <img
                  src={arrowOutwardSvg.src}
                  alt='External link icon'
                  width={20}
                  height={20}
                />
              </div>
            </motion.div>
          </Link>
        </div>
      </motion.div>
      <motion.div
        variants={variants}
        initial='hidden'
        animate='visible'
        transition={{ delay: 0.1 }}
        viewport={{ once: true }}
        className='MIDDLE z-40 inline-flex flex-col rounded-3xl px-8 pb-16 lg:px-16 lg:py-16'
      >
        <div className='inline-flex flex-col gap-9'>
          <div className='middleshadow flex flex-col gap-10 rounded-3xl border-2 border-[#0060ff] bg-[#0f172a] px-10 py-10 sm:flex-row lg:min-h-[28rem] lg:flex-row lg:gap-20 lg:px-16 lg:py-16'>
            <div className='space-y-5 sm:w-3/4 lg:space-y-10'>
              <p className='font-productsans text-3xl font-bold lg:text-5xl'>
                <span className='evoxhighlight'>About</span> Evolution X
              </p>
              <p className='text-xl lg:text-2xl'>
                Evolution X is a custom Android ROM that aims to replicate the
                Google Pixel experience, with added customization. Based on the{' '}
                <a
                  href='https://github.com/LineageOS'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-[#00b3a4] hover:underline'
                >
                  LineageOS Project
                </a>
                .
              </p>
              <div>
                <p className='text-gray-400 lg:text-start lg:text-2xl'>
                  Get Android {initialLatestAndroidVersion} for your device now
                </p>
                <Link href={'/devices'}>
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    initial={{ scale: 1 }}
                    className='mt-2.5 w-full rounded-full bg-[#34A853] px-7 py-3 text-center text-xl text-white hover:bg-[#2b8e47] lg:w-fit'
                  >
                    Download
                  </motion.div>
                </Link>
              </div>
            </div>
            <div className='inline-flex flex-col items-center gap-6 lg:gap-12'>
              <p className='evoxhighlight z-40 text-lg italic lg:text-xl'>
                #KeepEvolving
              </p>
              <div className='relative flex justify-center lg:w-60'>
                <img
                  src={LATEST_VERSION}
                  alt='Latest Version'
                  className='z-40 size-[12rem] sm:size-[10rem] lg:size-[12rem]'
                />
                <Meteors number={25} />
              </div>
            </div>
          </div>
          <div className='inline-flex flex-col gap-9 sm:flex-row md:gap-12 lg:flex-row'>
            <div className='middleshadow items-start justify-start rounded-3xl border-2 border-[#0060ff] bg-[#0f172a] px-8 py-10 sm:w-1/2 lg:px-12 lg:py-14'>
              <div className='flex flex-col items-start justify-start gap-5 lg:gap-10'>
                <div className='font-productsans text-3xl font-bold capitalize lg:text-3xl'>
                  Frequent updates & latest security patches
                </div>
                <div className='text-xl lg:text-2xl'>
                  We provide frequent updates amongst most custom ROMs. These
                  updates aim to be in a stable state and are guaranteed to be
                  on the latest security patches.
                </div>
              </div>
            </div>
            <div className='middleshadow items-start justify-start rounded-3xl border-2 border-[#0060ff] bg-[#0f172a] px-8 py-10 sm:w-1/2 lg:px-12 lg:py-14'>
              <div className='flex flex-col items-start justify-start gap-5 lg:gap-10'>
                <div className='font-productsans text-3xl font-bold capitalize lg:text-3xl'>
                  Pixel look & feel
                </div>
                <div className='text-xl lg:text-2xl'>
                  Evolution X provides you with the perfect Pixel experience,
                  imitating Google Pixel devices, with additional
                  customizations.
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <div className='screenshot-carousel-container'>
        <ScreenshotCarousel screenshotUrls={screenshotUrls} />
      </div>
    </>
  )
}

export default HomePageClientPage
