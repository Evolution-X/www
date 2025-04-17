import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import evoloading from "../../assets/evoloading.gif"
import iphone from "../../assets/iphone.gif"
import evolution from "../../assets/evolution.svg"
import { motion } from "framer-motion"

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}

const Downloads = () => {
  const [devices, setDevices] = useState({})
  const [deviceList, setDeviceList] = useState([])
  const [loading, setLoading] = useState(true)
  const [oem, setOem] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [apple, setApple] = useState(false)
  const [latestVersionMapping, setLatestVersionMapping] = useState({})
  const [latestVersionSVG, setLatestVersionSVG] = useState(null)

  // Toggle OEM filter
  const oemToggle = (deviceOem) => {
    setOem((prevOem) => (prevOem === deviceOem ? null : deviceOem))
  }

  const brands = Array.from(
    new Set(deviceList.map((device) => device.data?.oem))
  ).sort((a, b) => a.localeCompare(b))

  // Fetch devices list
  const fetchDevices = async () => {
    const url =
      "https://raw.githubusercontent.com/Evolution-X/www_gitres/main/devices/devices.json"
    try {
      const response = await fetch(url)
      const devicesData = await response.json()
      return devicesData
    } catch (error) {
      console.error("Error fetching devices:", error)
      return {}
    }
  }

  // Fetch device data
  const fetchDeviceData = async (devices) => {
    try {
      const data = await Promise.all(
        Object.entries(devices).map(async ([device, branches]) => {
          // Filter out vanilla branches
          const filteredBranches = branches.filter(
            (branch) => !branch.includes("-vanilla")
          )

          const deviceDataList = await Promise.all(
            filteredBranches.map(async (branch) => {
              const deviceUrl = `https://raw.githubusercontent.com/Evolution-X/OTA/${branch}/builds/${device}.json`
              try {
                const response = await fetch(deviceUrl)
                const deviceData = await response.json()
                return { codename: device, branch, data: deviceData.response[0] }
              } catch (error) {
                console.error(
                  `Error fetching data for device ${device} on branch ${branch}:`,
                  error
                )
                return { codename: device, branch, data: null }
              }
            })
          )

          return deviceDataList.filter((item) => item.data)
        })
      )
      return data.flat()
    } catch (error) {
      console.error("Error fetching device data:", error)
      return []
    }
  }

  // Fetch latest version mapping
  const fetchLatestVersion = async () => {
    const url =
      "https://raw.githubusercontent.com/Evolution-X/www_gitres/main/version/latestversion.json"
    try {
      const response = await fetch(url)
      const versionData = await response.json()
      setLatestVersionMapping(versionData)
    } catch (error) {
      console.error("Error fetching latest version mapping:", error)
    }
  }

  // Check if a device supports the latest version
  const supportsLatestVersion = (branches) => {
    const latestVersions = Object.values(latestVersionMapping).flat()
    return branches.some((branch) =>
      latestVersions.some((version) => branch.includes(version))
    )
  }

  // Fetch latest version SVG
  const fetchLatestVersionSVG = async () => {
    const latestVersionUrl =
      "https://raw.githubusercontent.com/Evolution-X/www_gitres/refs/heads/main/version/latestversion.svg"
    try {
      const response = await fetch(latestVersionUrl)
      const latestVersionData = await response.text()
      setLatestVersionSVG(latestVersionData)
    } catch (error) {
      console.error("Error fetching latest version SVG:", error)
    }
  }

  // Load devices list on component mount
  useEffect(() => {
    const loadDevices = async () => {
      const devicesData = await fetchDevices()
      setDevices(devicesData)
      fetchLatestVersion()
      fetchLatestVersionSVG()
    }
    loadDevices()
  }, [])

  useEffect(() => {
    const loadDeviceData = async () => {
      if (Object.keys(devices).length > 0 && Object.keys(latestVersionMapping).length > 0) {
        const data = await fetchDeviceData(devices)
        const combinedList = data
          .filter((item) => item.data) // Ensure only items with 'data' are processed
          .reduce((acc, curr) => {
            const existingItemIndex = acc.findIndex(
              (x) => x.codename === curr.codename
            )

            if (existingItemIndex !== -1) {
              // If codename exists, compare timestamps
              if (curr.data.timestamp > acc[existingItemIndex].data.timestamp) {
                acc[existingItemIndex] = curr // Replace with the one having greater timestamp
              }
            } else {
              acc.push(curr) // Add new unique item
            }

            return acc
          }, [])
          .sort((a, b) => b.data.timestamp - a.data.timestamp)

        setDeviceList(combinedList)
        setLoading(false)
      }
    }
    loadDeviceData()
  }, [devices, latestVersionMapping])

  return (
    <>
      {loading && (
        <img className="mx-auto" src={evoloading} alt="Loading..." />
      )}

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
            <div className="space-y-4">
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
            key={`${oem}-${searchQuery}`}
          >
            {deviceList &&
              !loading &&
              deviceList
                .filter((device) => (oem && device.data.oem) === oem)
                .filter(
                  (device) =>
                    device.data?.device
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) || // Match device name
                    device.codename
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) || // Match codename
                    (
                      device.data?.oem.toLowerCase() +
                      " " +
                      device.data?.device.toLowerCase()
                    ).includes(searchQuery.toLowerCase()) || // Match OEM and device name
                    (device.data?.maintainer?.toLowerCase().includes(searchQuery.toLowerCase())) || // Match maintainer
                    (device.data?.github?.toLowerCase().includes(searchQuery.toLowerCase())) // Match GitHub
                )
                .map((device, index) => {
                  // Check if device supports the latest version
                  const isSupported = supportsLatestVersion(devices[device.codename])

                  return (
                    <motion.div
                      variants={variants}
                      initial={{ opacity: 0, scale: 0.75 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      key={index}
                    >
                      <div className="relative flex min-h-full w-[23rem] flex-col justify-between rounded-2xl border border-[#0060ff] bg-black pb-7 duration-100 ease-in shadow-[0px_0px_38.5px_14px_#0060ff20] hover:scale-105 hover:shadow-[0px_0px_38.5px_14px_#0060ff50]">
                        <img
                          className="mx-auto my-4 flex size-56 object-contain"
                          src={`https://raw.githubusercontent.com/Evolution-X/www_gitres/refs/heads/main/devices/images/${device.codename}.webp`}
                          alt=""
                        />
                        {isSupported && latestVersionSVG && (
                          <motion.div
                            initial={{ scale: 0.8, rotate: -5 }}
                            animate={{ scale: 0.9, rotate: 5 }}
                            transition={{
                              repeat: Infinity,
                              repeatType: "mirror",
                              duration: 0.7,
                              type: "spring",
                              damping: 5,
                              stiffness: 30,
                            }}
                            viewport={{ once: true }}
                            dangerouslySetInnerHTML={{
                              __html: latestVersionSVG,
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
                            Get Evolution X
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
