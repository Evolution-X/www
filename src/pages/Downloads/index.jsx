import React, { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import evoloading from "../../assets/evoloading.gif"
import iphone from "../../assets/iphone.gif"
import evolution from "../../assets/evolution.svg"

const Downloads = () => {
  const [devices, setDevices] = useState([])
  const [loading, setLoading] = useState(true)
  const [deviceList, setDeviceList] = useState([])
  const [oem, setOem] = useState("")
  const [searchQuery, setSearchQuery] = useState("") // State for search query
  const [apple, setApple] = useState(false)

  const oemToggle = async (deviceOem) => {
    // const doem = await deviceOem
    if (oem === deviceOem) {
      setOem(null)
      console.log(oem)
    } else {
      setOem(deviceOem)
      console.log(oem)
    }
  }

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay))
  }

  // Fetch the list of devices
  const fetchDevices = async () => {
    const url =
      "https://raw.githubusercontent.com/Evolution-X/official_devices/udc/devices.json"

    try {
      const response = await fetch(url)
      const devicedata = await response.json()
      return devicedata
    } catch (error) {
      console.error("Error fetching devices:", error)
      return [] // Return an empty array on error
    } finally {
    }
  }

  // Fetch individual device data
  const fetchDeviceData = async () => {
    // Wait for all device data to be fetched
    const data = await Promise.all(
      devices.map(async (device) => {
        const durl = `https://raw.githubusercontent.com/Evolution-X/OTA/udc/builds/${device}.json`
        try {
          const fetchedDevice = await fetch(durl)
          const fetchedDeviceData = await fetchedDevice.json()
          console.log(fetchedDeviceData.response[0])
          await timeout(0)
          return { codename: device, data: fetchedDeviceData.response[0] }
        } catch (error) {
          console.error(`Error fetching data for device ${device}:`, error)
          return { codename: device, data: null } // Handle errors for individual devices
        }
      }),
    )

    return data // Return the resolved data
  }

  // Load devices on component mount
  useEffect(() => {
    const loadDevices = async () => {
      const data = await fetchDevices()
      setDevices(data) // Set state after fetching the device list
      console.log("Fetched devices:", data) // Log the fetched data
    }

    loadDevices() // Call the async function inside useEffect
  }, [])

  // Fetch and set device data when the `devices` state updates
  useEffect(() => {
    const loadDeviceData = async () => {
      if (devices.length > 0) {
        const data = await fetchDeviceData()
        console.log("Fetched device data:", data) // Log fetched device data
        setDeviceList(data) // Set state with fetched device data
      }
    }

    loadDeviceData() // Call the async function when devices state changes
    // console.log(deviceList)
  }, [devices]) // Trigger when `devices` state changes

  useEffect(() => {
    console.log(deviceList)
    if (deviceList.length > 0) {
      setLoading(false)
    }
  }, [deviceList])

  return (
    <>
      {loading && (
        <img className="mx-auto" src={evoloading} alt="loading ..." />
      )}

      {!loading && (
        <div className="flex flex-col items-center justify-center gap-20 xl:gap-24">
          <div className="mx-4 inline-flex min-w-[20rem] flex-col items-center justify-center gap-8 sm:mx-6 sm:min-w-[32rem] lg:w-[60rem] lg:gap-12 xl:w-[64rem]">
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
              <div className="inline-flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => oemToggle("Google")}
                  className={`brandSelect ${oem === "Google" ? "bg-[#7e76dd]" : ""}`}
                >
                  Google
                </button>
                <button
                  onClick={() => oemToggle("Xiaomi")}
                  className={`brandSelect ${oem === "Xiaomi" ? "bg-[#7e76dd]" : ""}`}
                >
                  Xiaomi
                </button>
                <button
                  onClick={() => oemToggle("Samsung")}
                  className={`brandSelect ${oem === "Samsung" ? "bg-[#7e76dd]" : ""}`}
                >
                  Samsung
                </button>
                <button
                  onClick={() => oemToggle("Oneplus")}
                  className={`brandSelect ${oem === "Oneplus" ? "bg-[#7e76dd]" : ""}`}
                >
                  Oneplus
                </button>
                <button
                  onClick={() => oemToggle("Motorola")}
                  className={`brandSelect ${oem === "Motorola" ? "bg-[#7e76dd]" : ""}`}
                >
                  Motorola
                </button>
                <button
                  onClick={() => oemToggle("Nothing")}
                  className={`brandSelect ${oem === "Nothing" ? "bg-[#7e76dd]" : ""}`}
                >
                  Nothing
                </button>
                <button
                  onClick={() => oemToggle("Lenovo")}
                  className={`brandSelect ${oem === "Lenovo" ? "bg-[#7e76dd]" : ""}`}
                >
                  Lenovo
                </button>
              </div>
            </div>
          </div>
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
          <div className="mx-4 grid gap-5 md:grid-cols-2 md:gap-10 lg:gap-14 xl:grid-cols-3">
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
                  <div key={index}>
                    <div className="flex min-h-full min-w-[20rem] max-w-[24rem] flex-col justify-between rounded-2xl border border-slate-800 bg-black pb-7 duration-100 ease-in lg:hover:scale-105 lg:hover:shadow-xl">
                      <img
                        className="mx-auto my-2 size-56 object-contain py-2"
                        src={`https://github.com/Evolution-X/official_devices/blob/udc/images/devices/${device.codename}.png?raw=true`}
                        alt=""
                      />
                      <div className="flex flex-col gap-6 px-7">
                        <div>
                          <p className="lg:text-md flex items-end justify-between text-sm text-[#999999]">
                            Device{" "}
                            <span className="ml-8 inline-flex h-5 items-center justify-center rounded-3xl bg-[#232323] p-4">
                              <span className="text-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent lg:text-xl">
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
                          <p className="lg:textxl font-[Prod-Medium] text-lg text-white">
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
                  </div>
                ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Downloads
