'use client'

import React, { useState, useCallback } from 'react'
import UnmaintainedWarning from './UnmaintainedWarning'

import arrowOutwardSvg from '../../../../assets/icons/arrowOutward.svg'

const Download = ({ maintained, download, filename, version, codename }) => {
  const [showUnmaintainedWarning, setShowUnmaintainedWarning] = useState(false)
  const [warningBuildInfo, setWarningBuildInfo] = useState(null)

  const handleCloseUnmaintainedWarning = useCallback(() => {
    setShowUnmaintainedWarning(false)
    setWarningBuildInfo(null)
  }, [])

  const handleAcknowledged = () => {
    if (warningBuildInfo?.downloadUrl) {
      window.open(warningBuildInfo.downloadUrl, '_blank')
    }
    handleCloseUnmaintainedWarning()
  }

  const handleDownloadClick = () => {
    if (!maintained) {
      const buildIdentifier = `${codename}-${version}-${filename}`
      const acknowledged = localStorage.getItem('acknowledgedUnmaintained')
      const acknowledgedBuilds = acknowledged ? JSON.parse(acknowledged) : {}

      if (!acknowledgedBuilds[buildIdentifier]) {
        setWarningBuildInfo({
          codename,
          version,
          build: filename,
          downloadUrl: download
        })
        setShowUnmaintainedWarning(true)
        return
      }
    }

    window.open(download, '_blank')
  }

  return (
    <>
      <button
        className='inline-flex h-16 items-center justify-center gap-2 rounded-full bg-[#0060ff] text-2xl text-white hover:bg-[#004bb5]'
        onClick={handleDownloadClick}
      >
        <p>Download ROM</p>
        <img
          src={arrowOutwardSvg.src}
          alt='External link icon'
          className='size-4 lg:size-6'
          width={24}
          height={24}
        />
      </button>

      {showUnmaintainedWarning && warningBuildInfo && (
        <UnmaintainedWarning
          onClose={handleCloseUnmaintainedWarning}
          onAcknowledge={handleAcknowledged}
          buildInfo={warningBuildInfo}
        />
      )}
    </>
  )
}

export default Download
