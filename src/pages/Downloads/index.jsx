import React, { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import evoxbanner from "../../assets/evoxbanner.png"
import { img } from "framer-motion/client"
import evoloading from "../../assets/evoloading.gif"
import { delay } from "framer-motion"

const Downloads = () => {
  const [devices, setDevices] = useState([])
  const [loading, setLoading] = useState(true)
  const [deviceList, setDeviceList] = useState([])
  const [oem, setOem] = useState("")
  const [searchQuery, setSearchQuery] = useState("") // State for search query

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
    return new Promise( res => setTimeout(res, delay) );
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
          await timeout(0);
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
   {loading &&
    <img className="mx-auto my-auto w-4/5 md:w-2/5" src={evoloading} alt="loading ..." />
   }
   {!loading &&
    <div className="flex flex-col items-center justify-center gap-20 md:gap-40">
      
      <div className="inline-flex w-[20rem] flex-col items-center justify-center gap-8 md:w-[64rem] md:gap-12">
        <p className="text-center font-[Prod-bold] text-4xl md:text-6xl">
          <span className="text-[#afbdf3]">Download</span> Evolution X
        </p>
        <div className="space-y-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border-2 border-current bg-slate-800 bg-gradient-to-r from-indigo-100 to-[#667dd0] px-10 py-4 text-black text-black/75 placeholder:text-black/75 focus:border-blue-600 focus:outline-none"
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
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-20">
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
                <div className="flex min-h-full min-w-[21rem] flex-col justify-between rounded-2xl border border-slate-800 bg-black pb-7 duration-100 ease-in md:hover:scale-105 md:hover:shadow-xl">
                  <img className="size-56 object-contain py-2 mx-auto my-2" src={`https://github.com/Evolution-X/official_devices/blob/udc/images/devices/${device.codename}.png?raw=true`} alt="" />
                  <div className="flex flex-col gap-6 px-7">
                    <div>
                      <p className="flex justify-between items-end text-sm md:text-md text-[#999999]">
                        Device{" "}
                        <span className="ml-8 inline-flex h-5 items-center justify-center rounded-3xl bg-[#232323] p-4">
                          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-md md:text-xl text-transparent">
                            {device.codename}
                          </span>
                        </span>
                      </p>
                      <p className="font-[Prod-Medium] text-xl md:text-2xl mt-0 text-white">
                        {device.data?.device}
                      </p>
                    </div>
                    <div className="inline-flex flex-col items-start justify-start">
                      <p className="text-[#999999] text-sm md:text-md">Maintainer</p>
                      <p className="font-[Prod-Medium] text-lg md:textxl text-white">
                        {device.data?.maintainer}
                      </p>
                    </div>
                    <Link
                      to={`/downloads/${device.codename}`}
                      className="inline-flex h-16 items-center justify-center rounded-full bg-[#5b60e3] text-xl text-white 
"
                    >
                      Get Evolution X
                    </Link>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
   }
    </>
  )
}

export default Downloads
