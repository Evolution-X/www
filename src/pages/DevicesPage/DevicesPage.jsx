import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import useDevices from './hooks/useDevices'
import DeviceCard from './components/DeviceCard'
import evoloading from '../../assets/gifs/evoloading.gif'
import evolution from '../../assets/icons/evolution.svg'

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
}

const DevicesPage = () => {
  const { deviceMap, loading, error } = useDevices()
  const [search, setSearch] = useState('')
  const [oemFilter, setOemFilter] = useState(null)
  const [maintainedFilter, setMaintainedFilter] = useState(null)
  const [visibleOems, setVisibleOems] = useState([])

  const handleMaintainedFilter = useCallback((status) => {
    setMaintainedFilter((prev) => (prev === status ? null : status))
    setOemFilter(null)
  }, [])

  const handleOemFilter = useCallback(
    (oem) => setOemFilter((prev) => (prev === oem ? null : oem)),
    []
  )

  const filtered = useMemo(
    () =>
      deviceMap
        ?.filter(
          (d) =>
            maintainedFilter === null || d.isMaintained === maintainedFilter
        )
        .filter((d) => oemFilter === null || d.oem === oemFilter)
        .filter((d) => {
          const q = search.toLowerCase()
          return (
            d.device?.toLowerCase()?.includes(q) ||
            d.codename?.toLowerCase()?.includes(q) ||
            `${d.oem?.toLowerCase()} ${d.device?.toLowerCase()}`?.includes(q)
          )
        }) ?? [],
    [deviceMap, maintainedFilter, oemFilter, search]
  )

  const allOems = useMemo(
    () =>
      Array.from(new Set(deviceMap.map((device) => device.oem))).sort((a, b) =>
        a?.localeCompare(b)
      ),
    [deviceMap]
  )

  useEffect(() => {
    if (maintainedFilter === null) {
      setVisibleOems(allOems)
    } else {
      const filteredOems = new Set()
      deviceMap.forEach((device) => {
        if (device.isMaintained === maintainedFilter && device.oem) {
          filteredOems.add(device.oem)
        }
      })
      setVisibleOems(
        Array.from(filteredOems).sort((a, b) => a?.localeCompare(b))
      )
    }
  }, [maintainedFilter, deviceMap, allOems])

  const handleSearchChange = useCallback((e) => {
    const query = e.target.value
    setSearch(query)
  }, [])

  const deviceCount = useMemo(() => filtered.length, [filtered])

  if (loading) {
    return <img className='mx-auto' src={evoloading} alt='Loading...' />
  }

  if (error) {
    return <p className='text-center'>{error.message}</p>
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center gap-20 xl:gap-24'>
        <motion.div
          variants={variants}
          initial='hidden'
          animate='visible'
          transition={{ delay: 0.1 }}
          className='mx-4 inline-flex min-w-[20rem] flex-col items-center justify-center gap-8 sm:mx-6 sm:min-w-[32rem] lg:w-[60rem] lg:gap-12 xl:w-[64rem]'
        >
          <div className='inline-flex flex-col items-baseline gap-2 text-center font-[Prod-bold] text-4xl sm:flex-row sm:text-5xl lg:gap-4 lg:text-6xl'>
            <img className='h-7 sm:h-10 lg:h-12' src={evolution} alt='' />
            <span className='evoxhighlight'>Devices</span>
          </div>
          <div className='mx-auto w-full max-w-[40rem] space-y-4'>
            <input
              type='text'
              value={search}
              onChange={handleSearchChange}
              className='flex w-full rounded-full bg-gradient-to-r from-indigo-100 to-[#0060ff] px-10 py-4 text-black text-black/75 placeholder:text-black/75 focus:outline-none'
              placeholder={`Search ${deviceCount} devices`}
            />
            <div className='flex justify-center gap-3'>
              <button
                onClick={() => handleMaintainedFilter(true)}
                className={`buttonSelect ${
                  maintainedFilter === true ? 'bg-[#0060ff]' : ''
                }`}
              >
                Active Devices
              </button>
              <button
                onClick={() => handleMaintainedFilter(false)}
                className={`buttonSelect ${
                  maintainedFilter === false ? 'bg-[#0060ff]' : ''
                }`}
              >
                Inactive Devices
              </button>
            </div>
            <div className='inline-flex flex-wrap items-center justify-center gap-3'>
              {visibleOems?.map((brand, i) => (
                <button
                  key={i}
                  onClick={() => handleOemFilter(brand)}
                  className={`buttonSelect ${
                    oemFilter === brand ? 'bg-[#0060ff]' : ''
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={variants}
          initial='hidden'
          animate='visible'
          transition={{ delay: 0.2 }}
          className='mx-4 grid gap-5 md:gap-10 min-[880px]:grid-cols-2 lg:gap-14 min-[1320px]:grid-cols-3'
          key={`${maintainedFilter}-${oemFilter}-${search}`}
        >
          {filtered?.map((device, i) => (
            <DeviceCard key={i} device={device} />
          ))}
        </motion.div>
      </div>
    </>
  )
}

export default DevicesPage
