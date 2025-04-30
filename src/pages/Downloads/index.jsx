import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import evoloading from "../../assets/evoloading.gif"
import iphone from "../../assets/iphone.gif"
import evolution from "../../assets/evolution.svg"
import { motion } from "framer-motion"

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
}

const Downloads = () => {
  const [devices, setDevices] = useState([])
  const [deviceList, setDeviceList] = useState([])
  const [loading, setLoading] = useState(true)
  const [latestSupportMap, setLatestSupportMap] = useState({})
  const [latestVersionSVG, setLatestVersionSVG] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [oem, setOem] = useState(null)
  const [currentlyMaintained, setCurrentlyMaintained] = useState(null)
  const [apple, setApple] = useState(false)

  const toggleCurrentlyMaintained = (value) => {
    setCurrentlyMaintained((prev) => (prev === value ? null : value))
    setOem(null)
  }

  const oemToggle = (deviceOem) => {
    setOem((prev) => (prev === deviceOem ? null : deviceOem))
  }

  const filteredDeviceList =
    currentlyMaintained === null
      ? deviceList
      : deviceList.filter(
          (d) => d.data?.currently_maintained === currentlyMaintained
        )

  const brands = Array.from(
    new Set(filteredDeviceList.map((d) => d.data?.oem))
  ).sort((a, b) => a.localeCompare(b))

  const fetchJson = async (url) => {
    try {
      const res = await fetch(url)
      return await res.json()
    } catch (err) {
      console.error(`Error fetching from ${url}:`, err)
      return null
    }
  }

  const fetchDevices = () =>
    fetchJson(
      "https://raw.githubusercontent.com/Evolution-X/www_gitres/refs/heads/main/devices/devices.json"
    ) || []

  const fetchLatestVersionSVG = async () => {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/Evolution-X/www_gitres/refs/heads/main/version/latestversion.svg"
      )
      const svg = await res.text()
      setLatestVersionSVG(svg)
    } catch (err) {
      console.error("Error fetching latest version SVG:", err)
    }
  }

  const supportsLatestVersion = async (branches) => {
    const data = await fetchJson(
      "https://raw.githubusercontent.com/Evolution-X/www_gitres/refs/heads/main/version/versions.json"
    )
    const latest = data?.[0]?.branches?.[0]
    return latest ? branches.includes(latest) : false
  }

  const fetchDeviceData = async (deviceObjs) => {
    const allDeviceData = await Promise.all(
      deviceObjs.map(async ({ device, branches }) => {
        const filtered = branches.filter((b) => !b.includes("-vanilla"))

        const branchData = await Promise.all(
          filtered.map(async (branch) => {
            const url = `https://raw.githubusercontent.com/Evolution-X/OTA/refs/heads/${branch}/builds/${device}.json`
            const data = await fetchJson(url)
            return data?.response?.[0]
              ? { codename: device, branch, data: data.response[0] }
              : null
          })
        )

        return branchData.filter(Boolean)
      })
    )

    return allDeviceData.flat()
  }

  useEffect(() => {
    const init = async () => {
      const devicesData = await fetchDevices()
      setDevices(devicesData)
      fetchLatestVersionSVG()
    }

    init()
  }, [])

  useEffect(() => {
    const load = async () => {
      if (!devices.length) return

      const data = await fetchDeviceData(devices)
      const latestPerDevice = data
        .reduce((acc, curr) => {
          const i = acc.findIndex((x) => x.codename === curr.codename)
          if (i !== -1) {
            if (curr.data.timestamp > acc[i].data.timestamp) acc[i] = curr
          } else {
            acc.push(curr)
          }
          return acc
        }, [])
        .sort((a, b) => b.data.timestamp - a.data.timestamp)

      const supportMap = {}
      for (const { device, branches } of devices) {
        supportMap[device] = await supportsLatestVersion(branches)
      }

      setLatestSupportMap(supportMap)
      setDeviceList(latestPerDevice)
      setLoading(false)
    }

    load()
  }, [devices])

  return (
    <>
      {loading && <img className="mx-auto" src={evoloading} alt="Loading..." />}

      {!loading && (
        <div className="flex flex-col items-center justify-center gap-20 xl:gap-24">
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="mx-4 inline-flex min-w-[20rem] flex-col items-center justify-center gap-8 sm:mx-6 sm:min-w-[32rem] lg:w-[60rem] lg:gap-12 xl:w-[64rem]"
          >
            <div className="inline-flex flex-col items-baseline gap-2 text-center font-[Prod-bold] text-4xl sm:flex-row sm:text-5xl lg:gap-4 lg:text-6xl">
              <span className="evoxhighlight">Download</span>
              <img className="h-7 sm:h-10 lg:h-12" src={evolution} alt="" />
            </div>
            <div className="space-y-4 w-full max-w-[40rem] mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  const query = e.target.value
                  setSearchQuery(query)
                  if (query.toLowerCase() === "iphone") {
                    setApple(true)
                  } else {
                    setApple(false)
                  }
                }}
                className="flex w-full rounded-full border-2 border-current bg-slate-800 bg-gradient-to-r from-indigo-100 to-[#0060ff] px-10 py-4 text-black text-black/75 placeholder:text-black/75 focus:border-blue-600 focus:outline-none"
                placeholder="Search"
              />
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => toggleCurrentlyMaintained(true)}
                  className={`buttonSelect ${currentlyMaintained === true ? "bg-[#0060ff]" : ""}`}
                >
                  Active Devices
                </button>
                <button
                  onClick={() => toggleCurrentlyMaintained(false)}
                  className={`buttonSelect ${currentlyMaintained === false ? "bg-[#0060ff]" : ""}`}
                >
                  Inactive Devices
                </button>
              </div>
              <div className="inline-flex flex-wrap items-center justify-center gap-3">
                {brands.map((brand, index) => (
                  <button
                    onClick={() => oemToggle(brand)}
                    className={`buttonSelect ${oem === brand ? "bg-[#0060ff]" : ""}`}
                    key={index}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {!loading && apple && (
            <div className="text-center">
              <h2 className="text-2xl">
                LMAO! You bought iPhone just to switch to Android!!
              </h2>{" "}
              <br />
              <h1 className="text-5xl font-bold">NOOB!!</h1>
              <img src={iphone} alt="iphone"></img>
            </div>
          )}

          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="mx-4 grid gap-5 md:gap-10 min-[880px]:grid-cols-2 lg:gap-14 min-[1320px]:grid-cols-3"
            key={`${currentlyMaintained}-${oem}-${searchQuery}`}
          >
            {deviceList &&
              !loading &&
              deviceList
                .filter((device) => (oem && device.data.oem) === oem)
                .filter(
                  (device) =>
                    device.data?.device
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    device.codename
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    (
                      device.data?.oem.toLowerCase() +
                      " " +
                      device.data?.device.toLowerCase()
                    ).includes(searchQuery.toLowerCase()) ||
                    device.data?.maintainer
                      ?.toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    device.data?.github
                      ?.toLowerCase()
                      .includes(searchQuery.toLowerCase())
                )
                .filter((device) => {
                  if (currentlyMaintained === null) return true
                  return (
                    device.data?.currently_maintained === currentlyMaintained
                  )
                })
                .map((device, index) => {
                  const isLatestSupported = latestSupportMap[device.codename]

                  return (
                    <motion.div
                      variants={variants}
                      initial={{ opacity: 0, scale: 0.75 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      key={index}
                    >
                      <div className="relative flex min-h-full w-[23rem] flex-col justify-between rounded-2xl border-2 border-[#0060ff] bg-black pb-7 duration-100 ease-in shadow-[0px_0px_38.5px_14px_#0060ff20] hover:scale-105 hover:shadow-[0px_0px_38.5px_14px_#0060ff50]">
                        <img
                          className="mx-auto my-4 flex size-56 object-contain"
                          src={`https://raw.githubusercontent.com/Evolution-X/www_gitres/refs/heads/main/devices/images/${device.codename}.webp`}
                          alt=""
                        />
                        {isLatestSupported && latestVersionSVG && (
                          <motion.div
                            initial={{ scale: 0.8, rotate: -5 }}
                            animate={{ scale: 0.9, rotate: 5 }}
                            transition={{
                              repeat: Infinity,
                              repeatType: "mirror",
                              duration: 0.7,
                              type: "spring",
                              damping: 5,
                              stiffness: 30
                            }}
                            viewport={{ once: true }}
                            dangerouslySetInnerHTML={{
                              __html: latestVersionSVG
                            }}
                            className="absolute right-[-20px] top-[-30px] size-20 sm:right-[-30px]"
                          />
                        )}
                        <div className="flex flex-col gap-6 px-7">
                          <div>
                            <p className="lg:text-md flex items-end justify-between text-sm evoxhighlight">
                              Device{" "}
                              <span className="ml-8 inline-flex h-5 items-center justify-center rounded-3xl bg-[#232323] p-4">
                                <span className="bg-gradient-to-r from-[#0060ff] via-[#9b4dca] to-[#ff007f] bg-clip-text text-transparent lg:text-lg">
                                  {device.codename}
                                </span>
                              </span>
                            </p>
                            <p className="mt-0 font-[Prod-Medium] text-xl text-white lg:text-2xl">
                              {device.data?.oem} {device.data?.device}
                            </p>
                          </div>
                          <div className="inline-flex flex-col items-start justify-start">
                            <p className="lg:text-md text-sm evoxhighlight">
                              Maintainer
                            </p>
                            <p className="font-[Prod-Medium] text-lg text-white lg:text-2xl">
                              {device.data?.maintainer}
                            </p>
                          </div>
                          <Link
                            to={`/downloads/${device.codename}`}
                            className="inline-flex h-16 items-center justify-center rounded-full bg-[#0060ff] text-xl text-white hover:bg-[#004bb5] transition-all duration-300"
                          >
                            <span className="mr-1">Get</span>
                            <img
                              src={evolution}
                              alt="Evolution X"
                              className="h-4 w-auto"
                            />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
          </motion.div>
        </div>
      )}
    </>
  )
}

export default Downloads
