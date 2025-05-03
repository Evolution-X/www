import React, { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import closeIcon from '../../../assets/icons/menuClose.svg'
import UnmaintainedWarning from './UnmaintainedWarning'

const initialVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 }
}

const CodeBlock = ({ children }) => (
  <div className='my-2'>
    <code className='inline-block rounded bg-[#040214] px-3 py-1 font-mono text-sm text-white'>
      {children}
    </code>
  </div>
)

const FlashingInstructions = (props) => {
  const {
    codename,
    androidVersion,
    filename,
    oem,
    initialInstallationImages,
    gappsLink,
    maintained,
    version
  } = props
  const [showInstructions, setShowInstructions] = useState(false)
  const [showUnmaintainedWarning, setShowUnmaintainedWarning] = useState(false)
  const [warningBuildInfo, setWarningBuildInfo] = useState(null)

  const handleCloseUnmaintainedWarning = useCallback(() => {
    setShowUnmaintainedWarning(false)
    setWarningBuildInfo(null)
  }, [])

  const handleAcknowledged = () => {
    setShowInstructions(true)
    handleCloseUnmaintainedWarning()
  }

  const toggleInstructions = useCallback(() => {
    if (!maintained) {
      const buildIdentifier = `${codename}-${version}-${filename}`
      const acknowledged = localStorage.getItem('acknowledgedUnmaintained')
      const acknowledgedBuilds = acknowledged ? JSON.parse(acknowledged) : {}

      if (!acknowledgedBuilds[buildIdentifier]) {
        setWarningBuildInfo({
          codename,
          version,
          build: filename
        })
        setShowUnmaintainedWarning(true)
        return
      }
    }
    setShowInstructions((prev) => !prev)
  }, [codename, filename, maintained, version])

  useEffect(() => {
    if (showInstructions) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showInstructions])

  const renderInstructions = () => {
    if (
      !initialInstallationImages ||
      initialInstallationImages.length === 0 ||
      !filename ||
      !oem
    ) {
      return (
        <p className='text-white'>No installation information available.</p>
      )
    }

    const downloadBaseURL = `https://sourceforge.net/projects/evolution-x/files/${codename}/${androidVersion}/${filename}/download`
    const flashCommandPrefix =
      oem.toLowerCase() === 'samsung' ? 'heimdall flash' : 'fastboot flash'

    const filesToDownload = [
      ...initialInstallationImages.map((img) => ({
        name: `${img}.img`,
        url: `https://sourceforge.net/projects/evolution-x/files/${codename}/${androidVersion}/${img}/${img}.img/download`
      })),
      { name: filename, url: downloadBaseURL },
      ...(gappsLink
        ? [
            {
              name: (
                <>
                  <strong className='text-gray-400'>(Optional)</strong>{' '}
                  {gappsLink.substring(gappsLink.lastIndexOf('/') + 1)}
                </>
              ),
              url: gappsLink
            }
          ]
        : [])
    ]

    return (
      <div className='space-y-4 text-white xl:text-base'>
        <ol className='list-decimal space-y-4 pl-5'>
          <li>
            Your device's bootloader needs to be unlocked. You can research how
            to do this for your specific device model online.
          </li>

          <li>
            Download the following files for{' '}
            <strong className='evoxhighlight'>{codename}</strong>:
            <ul className='mt-2 list-disc space-y-1 pl-5'>
              {filesToDownload.map((file, i) => (
                <li key={i}>
                  <a
                    href={file.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='evoxhighlight hover:underline'
                  >
                    {typeof file.name === 'string' ? file.name : file.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>

          <li>
            {oem.toLowerCase() === 'samsung'
              ? 'Boot into download mode.'
              : 'Boot into bootloader.'}
          </li>

          <li>
            Flash the images required to boot Evolution X recovery:
            <div className='mt-2 space-y-2'>
              {initialInstallationImages.map((img, i) => {
                const cmd =
                  oem.toLowerCase() === 'samsung'
                    ? `${flashCommandPrefix} --${img.toUpperCase()} ${img}.img`
                    : img !== 'super_empty'
                      ? `${flashCommandPrefix} ${img} ${img}.img`
                      : `fastboot wipe-super super_empty.img`
                return <CodeBlock key={i}>{cmd}</CodeBlock>
              })}
            </div>
          </li>

          <li>Reboot to recovery.</li>

          <li>
            While in recovery, navigate to <strong>Factory Reset</strong> →{' '}
            <strong>Format Data/Factory Reset</strong> and confirm to format the
            device.
          </li>

          <li>
            Go back to the main menu and navigate to{' '}
            <strong>Apply Update</strong> → <strong>Apply from ADB</strong>.
          </li>

          <li>
            Sideload Evolution X:
            <CodeBlock>adb sideload {filename}</CodeBlock>
          </li>

          <li>
            <strong className='text-gray-400'>(Optional)</strong> Fully reboot
            to recovery and navigate to <strong>Apply Update</strong> →{' '}
            <strong>Apply from ADB</strong> to sideload any addons:
            {!gappsLink ? (
              <CodeBlock>adb sideload addon_filename.zip</CodeBlock>
            ) : (
              gappsLink && (
                <CodeBlock>
                  adb sideload{' '}
                  {gappsLink.substring(gappsLink.lastIndexOf('/') + 1)}
                </CodeBlock>
              )
            )}
          </li>

          <li>
            Reboot to system and{' '}
            <strong className='evoxhighlight'>#KeepEvolving</strong>.
          </li>
        </ol>
      </div>
    )
  }

  return (
    <>
      <button
        onClick={toggleInstructions}
        className='h-16 w-full rounded-full bg-[#0060ff] px-4 text-2xl text-white hover:bg-[#004bb5]'
      >
        How to install
      </button>

      {showUnmaintainedWarning && warningBuildInfo && (
        <UnmaintainedWarning
          onClose={handleCloseUnmaintainedWarning}
          onAcknowledge={handleAcknowledged}
          buildInfo={warningBuildInfo}
        />
      )}

      <AnimatePresence>
        {showInstructions && !showUnmaintainedWarning && (
          <motion.div
            className='fixed inset-0 z-50 flex flex-col bg-black/50 py-[6rem] md:py-[6rem] lg:py-[6rem] xl:px-[4rem] 2xl:px-[15rem]'
            style={{ pointerEvents: 'auto' }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowInstructions(false)
              }
            }}
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={initialVariants}
            transition={{ duration: 0.3 }}
          >
            <div className='relative mx-[2rem] min-h-0 grow rounded-3xl border-4 border-dashed border-[#0060ff] bg-[#0f172a]'>
              <span
                onClick={toggleInstructions}
                className='absolute right-[-1rem] top-[-1rem] z-50 cursor-pointer rounded-full border-4 border-[#0060ff] bg-[#0060ff] p-2'
              >
                <img src={closeIcon} alt='close' />
              </span>
              <div className='h-full overflow-y-scroll px-10 pt-5 lg:pt-[1rem]'>
                <div className='pb-10'>{renderInstructions()}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default FlashingInstructions
