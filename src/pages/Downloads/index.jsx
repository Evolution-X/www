import React, { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import evoloading from "../../assets/evoloading.gif"
import iphone from "../../assets/iphone.gif"
import evolution from "../../assets/evolution.svg"
import star from "../../assets/star.svg"
import { motion } from "framer-motion"

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}

const Downloads = () => {
  const [devices, setDevices] = useState([])
  const [deviceList, setDeviceList] = useState([])
  const [loading, setLoading] = useState(true)
  const [oem, setOem] = useState(null)
  const [searchQuery, setSearchQuery] = useState("") // Search query state
  const [apple, setApple] = useState(false)

  // Toggle OEM filter
  const oemToggle = (deviceOem) => {
    setOem((prevOem) => (prevOem === deviceOem ? null : deviceOem))
  }

  const brands = Array.from(
    new Set(deviceList.map((device) => device.data?.oem)),
  )

  // Fetch devices list
  const fetchDevices = async () => {
    const url =
      "https://raw.githubusercontent.com/Evolution-X/www_gitres/udc/devices/devices.json"

    try {
      const response = await fetch(url)
      return await response.json()
    } catch (error) {
      console.error("Error fetching devices:", error)
      return [] // Return an empty array on error
    }
  }

  // Fetch device data from a given base path
  const fetchDeviceData = async (basePath) => {
    try {
      const data = await Promise.all(
        devices.map(async (device) => {
          const deviceUrl = `${basePath}/${device}.json`
          try {
            const response = await fetch(deviceUrl)
            const deviceData = await response.json()
            return { codename: device, data: deviceData.response[0] }
          } catch (error) {
            console.error(`Error fetching data for device ${device}:`, error)
            return { codename: device, data: null } // Handle individual device errors
          }
        }),
      )
      return data
    } catch (error) {
      console.error("Error fetching device data:", error)
      return []
    }
  }

  // Load devices list on component mount
  useEffect(() => {
    const loadDevices = async () => {
      const devicesData = await fetchDevices()
      setDevices(devicesData)
    }
    loadDevices()
  }, [])

  // Fetch device data when devices list is loaded
  useEffect(() => {
    const loadDeviceData = async () => {
      if (devices.length > 0) {
        const basePath1 =
          "https://raw.githubusercontent.com/Evolution-X/OTA/udc/builds"
        const basePath2 =
          "https://raw.githubusercontent.com/Evolution-X/OTA/vic/builds"

        const [data1, data2] = await Promise.all([
          fetchDeviceData(basePath1),
          fetchDeviceData(basePath2),
        ])

        const combinedList = [...data1, ...data2]
          .filter((item) => item.data) // Ensure only items with 'data' are processed
          .reduce((acc, curr) => {
            const existingItemIndex = acc.findIndex(
              (x) => x.codename === curr.codename,
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

        console.log(combinedList)
        setDeviceList(combinedList)
        setLoading(false)
      }
    }
    loadDeviceData()
  }, [devices])

  return (
    <>
      {loading && (
        <img className="mx-auto" src={evoloading} alt="loading ..." />
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
              <span className="text-[#afbdf3]">Download</span>
              <img className="h-7 sm:h-10 lg:h-12" src={evolution} alt="" />
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  e.target.value === "iphone"
                    ? setApple(true)
                    : setSearchQuery(e.target.value)
                }}
                className="flex w-full rounded-full border-2 border-current bg-slate-800 bg-gradient-to-r from-indigo-100 to-[#667dd0] px-10 py-4 text-black text-black/75 placeholder:text-black/75 focus:border-blue-600 focus:outline-none"
                placeholder="Search"
              />
              <div className="inline-flex flex-wrap items-center justify-center gap-3">
                {brands.map((brand, index) => (
                  <button
                    onClick={() => oemToggle(brand)}
                    className={`brandSelect ${oem === brand ? "bg-[#7e76dd]" : ""}`}
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
                    ).includes(searchQuery.toLowerCase()),
                )
                .map((device, index) => (
                  <motion.div
                    variants={variants}
                    initial={{ opacity: 0, scale: 0.75 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    key={index}
                  >
                    <div className="relative flex min-h-full w-[23rem] flex-col justify-between rounded-2xl border border-slate-800 bg-black pb-7 duration-100 ease-in lg:hover:scale-105">
                      <img
                        className="mx-auto my-4 flex size-56 object-contain"
                        src={`https://github.com/Evolution-X/www_gitres/blob/udc/devices/images/${device.codename}.png?raw=true`}
                        alt=""
                      />
                      {device.data?.version === "10.0" && (
                        <motion.img
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
                          src={star}
                          alt=""
                          className="absolute right-[-20px] top-[-30px] size-20 sm:right-[-30px]"
                        />
                      )}
                      <div className="flex flex-col gap-6 px-7">
                        <div>
                          <p className="lg:text-md flex items-end justify-between text-sm text-[#999999]">
                            Device{" "}
                            <span className="ml-8 inline-flex h-5 items-center justify-center rounded-3xl bg-[#232323] p-4">
                              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent lg:text-lg">
                                {device.codename}
                              </span>
                            </span>
                          </p>
                          <p className="mt-0 font-[Prod-Medium] text-xl text-white lg:text-2xl">
                            {device.data?.device}
                          </p>
                        </div>
                        <div className="inline-flex flex-col items-start justify-start">
                          <p className="lg:text-md text-sm text-[#999999]">
                            Maintainer
                          </p>
                          <p className="font-[Prod-Medium] text-lg text-white lg:text-2xl">
                            {device.data?.maintainer}
                          </p>
                        </div>
                        <Link
                          to={`/downloads/${device.codename}`}
                          className="inline-flex h-16 items-center justify-center rounded-full bg-[#5b60e3] text-xl text-white"
                        >
                          Get Evolution X
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
          </motion.div>
        </div>
      )}
    </>
  )
}

export default Downloads
