'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { DEVICES_IMAGE } from '../../../../constants'

import Download from '../_components/Download'
import ThermonuclearWarning from '../_components/ThermonuclearWarning'
import BuildTypeInfo from '../_components/BuildTypeInfo'
import FlashingInstructions from '../_components/FlashingInstructions'
import Changelog from '../_components/Changelog'

import arrowOutwardSvg from '../../../../assets/icons/arrowOutward.svg'
import evolutionSvg from '../../../../assets/icons/evolution.svg'
import donateIconSvg from '../../../../assets/icons/donateicon.svg'
import xdaIconSvg from '../../../../assets/icons/xdaicon.svg'

const initialVariants = {
  hidden: { opacity: 0, y: 75 },
  visible: { opacity: 1, y: 0 }
}

const switchVariants = {
  hidden: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 22,
      duration: 0.5
    }
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2
    }
  }
}

const DeviceClientPage = ({ codename, deviceData: initialDeviceData }) => {
  const [currentBranch, setCurrentBranch] = useState(null)
  const [showBuildTypeInfo, setShowBuildTypeInfo] = useState(false)

  useEffect(() => {
    if (initialDeviceData?.branchesData?.length && !currentBranch) {
      setCurrentBranch(initialDeviceData.branchesData[0].branch)
    }
  }, [initialDeviceData, currentBranch])

  useEffect(() => {
    if (currentBranch?.toLowerCase().includes('vanilla')) {
      setShowBuildTypeInfo(true)
    } else {
      setShowBuildTypeInfo(false)
    }
  }, [currentBranch])

  const handleCloseBuildTypeInfo = (action) => {
    if (action === 'gotIt') {
      setShowBuildTypeInfo(false)
    }
  }

  const currentBranchData = initialDeviceData
    ? initialDeviceData.branchesData.find(
        (branchData) => branchData.branch === currentBranch
      )
    : null

  const currentOtas = currentBranchData?.ota || []
  const ota = currentOtas[0]

  const isVanilla = currentBranch?.toLowerCase().includes('vanilla')
  const gappsLink = currentBranchData?.gappsLink

  const changelogContent = currentBranchData?.changelog || null
  const changelogError = !changelogContent
    ? { message: 'No changelog available for this branch.' }
    : null

  return (
    <>
      <AnimatePresence>
        <ThermonuclearWarning />
        {showBuildTypeInfo && (
          <BuildTypeInfo
            onClose={handleCloseBuildTypeInfo}
            shouldShow={showBuildTypeInfo}
          />
        )}
      </AnimatePresence>

      <motion.div
        variants={initialVariants}
        initial='hidden'
        animate='visible'
        className='mx-4 flex flex-col items-center justify-center gap-10 md:gap-20 lg:mx-16 xl:mx-auto xl:w-[80rem]'
      >
        <div className='font-productsans inline-flex flex-col items-baseline gap-2 text-center text-4xl font-bold sm:flex-row sm:text-5xl lg:gap-4 lg:text-6xl'>
          <img
            className='h-7 sm:h-10 lg:h-12'
            src={evolutionSvg.src}
            alt='Evolution X Logo'
          />
          <span className='evoxhighlight'>{codename}</span>
        </div>

        <div className='flex w-full flex-col gap-4 sm:-mt-8 lg:-mb-20 lg:-mt-16'>
          <div className='inline-flex flex-wrap items-center justify-start gap-2 lg:gap-3'>
            {initialDeviceData.branchesData.map((branchData) => {
              const versionLabel = branchData.version.replace(/_/g, ' ')
              return (
                <button
                  key={branchData.branch}
                  className={`buttonSelect ${
                    currentBranch === branchData.branch ? 'bg-[#0060ff]' : ''
                  }`}
                  onClick={() => setCurrentBranch(branchData.branch)}
                >
                  {versionLabel}
                </button>
              )
            })}
          </div>

          {ota ? (
            <div className='relative flex flex-col items-center justify-center gap-6 rounded-2xl border-2 border-[#0060ff] bg-[#0f172a] p-4 pr-6 pt-12 md:flex-row md:gap-6 lg:gap-16 lg:p-11 lg:pr-14 lg:pt-16'>
              <div className='mt-4 flex flex-col gap-4 md:w-1/4 lg:w-1/4 lg:flex-shrink-0'>
                <img
                  className='max-h-56 min-h-48 w-full object-contain'
                  src={`${DEVICES_IMAGE}${codename}.webp`}
                  alt=''
                />
                <div className='gap-4 text-center'>
                  <span>
                    <p className='text-2xl'>
                      {ota.oem} {ota.device}
                    </p>
                    <p className='evoxhighlight text-lg'>({codename})</p>
                  </span>
                </div>
              </div>

              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentBranch}
                  className='middleshadow flex grow flex-col gap-4 rounded-2xl border-2 border-[#0060ff] bg-[#040214] px-4 py-5 md:w-2/3 lg:w-2/3 lg:justify-between lg:gap-0'
                  variants={switchVariants}
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                  transition={{ duration: 0.2, delay: 0.1 }}
                  style={{ minHeight: '450px' }}
                >
                  <div className='flex grow flex-col gap-4 lg:justify-between lg:gap-0'>
                    <div className='grid grid-cols-2 gap-2 pb-4 pl-2 lg:grid-cols-3 lg:gap-6'>
                      <div className='grow'>
                        <div className='evoxhighlight text-base'>
                          Android Version
                        </div>
                        <div className='text-2xl text-white'>
                          {currentBranchData?.version?.replace('_vanilla', '')}
                        </div>
                      </div>
                      <div className='grow'>
                        <div className='evoxhighlight text-base'>
                          Evolution X Version
                        </div>
                        <div className='text-2xl text-white'>{ota.version}</div>
                      </div>
                      <div className='grow'>
                        <div className='evoxhighlight text-base'>Date</div>
                        <div className='text-2xl text-white'>
                          {new Date(ota.timestamp * 1000).toDateString()}
                        </div>
                      </div>
                      <div className='grow'>
                        <div className='evoxhighlight text-base'>Type</div>
                        <div className='text-2xl text-white'>
                          {ota.buildtype}
                        </div>
                      </div>
                      <div className='grow'>
                        <div className='evoxhighlight text-base'>Size</div>
                        <div className='text-2xl text-white'>
                          {(ota.size / 1024 / 1024 / 1024).toFixed(2)} GB
                        </div>
                      </div>
                      <div className='grow'>
                        <div className='evoxhighlight text-base'>
                          Currently maintained
                        </div>
                        <div className='text-2xl text-white'>
                          {ota.currently_maintained ? 'Yes' : 'No'}
                        </div>
                      </div>
                    </div>

                    <div className='mb-4 flex items-center justify-between gap-4 rounded-2xl border-2 border-[#0060ff] bg-[#0f172a] px-4 py-3 lg:gap-9'>
                      <div className='flex items-center justify-start gap-2'>
                        <div className='flex size-12 shrink-0 items-center justify-center lg:size-16'>
                          <img
                            className='rounded-full'
                            src={`https://avatars.githubusercontent.com/${ota.github}`}
                            alt='Maintainer avatar'
                            width={40}
                            height={40}
                          />
                        </div>
                        <div className='lg:max-w-90 font-productsans max-w-48 text-wrap text-lg font-medium text-white lg:text-xl xl:max-w-fit'>
                          {ota.maintainer}
                        </div>
                      </div>
                      <div className='flex gap-2'>
                        {ota.paypal && (
                          <Link href={ota.paypal} target='_blank'>
                            <img
                              src={donateIconSvg.src}
                              alt='Donate icon'
                              className='size-8 lg:size-10'
                              width={40}
                              height={40}
                            />
                          </Link>
                        )}
                        {ota.forum && (
                          <Link href={ota.forum} target='_blank'>
                            <img
                              src={xdaIconSvg.src}
                              alt='XDA icon'
                              className='size-8 lg:size-10'
                              width={40}
                              height={40}
                            />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                      <FlashingInstructions
                        codename={codename}
                        version={ota.version}
                        maintained={ota.currently_maintained}
                        androidVersion={currentBranchData?.version}
                        filename={ota.filename}
                        oem={ota.oem}
                        initialInstallationImages={
                          ota.initial_installation_images
                        }
                        gappsLink={gappsLink}
                      />
                      <Changelog
                        initialChangelog={changelogContent}
                        changelogError={changelogError}
                      />
                    </div>
                    <div
                      className={`mt-3 grid gap-3 ${isVanilla && gappsLink ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}
                    >
                      <Download
                        codename={codename}
                        maintained={ota.currently_maintained}
                        download={ota.download}
                        filename={ota.filename}
                        version={ota.version}
                      />
                      {isVanilla && gappsLink && (
                        <button
                          onClick={() => window.open(gappsLink, '_blank')}
                          className='inline-flex h-16 items-center justify-center gap-2 rounded-full bg-[#0060ff] text-2xl text-white hover:bg-[#004bb5]'
                        >
                          <p>Download GApps</p>
                          <img
                            src={arrowOutwardSvg.src}
                            alt='External link icon'
                            className='size-4 lg:size-6'
                            width={24}
                            height={24}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            currentBranch && (
              <p className='my-8 text-center text-xl text-gray-500'>
                No builds found for the {currentBranch} branch.
              </p>
            )
          )}
        </div>
      </motion.div>
    </>
  )
}

export default DeviceClientPage
