import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import donateicon from "../../assets/donateicon.svg"
import xdaicon from "../../assets/xdaicon.svg"
import evoloading from "../../assets/evoloading.gif"
import Changelogs from "../Changelogs"
import FlashingInstructions from "../FlashingInstructions"
import { motion } from "framer-motion"

const variants = {
  hidden: { opacity: 0, y: 75 },
  visible: { opacity: 1, y: 0 },
}

const DownloadSection = () => {
  const { codename } = useParams()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState()
  const [vanilla, setVanilla] = useState()
  const [showInstructions, setShowInstructions] = useState(false)
  const [showChangelogs, setShowChangelogs] = useState(false)
  const [androidVersion, setandroidVersion] = useState("Android14") // State for toggling base paths
  const [versionLoading, setVersionLoading] = useState(true)
  const [a15available, setA15available] = useState(false)

  const basePaths = {
    Android14: "https://raw.githubusercontent.com/Evolution-X/OTA/udc/builds",
    Android15: "https://raw.githubusercontent.com/Evolution-X/OTA/vic/builds",
  }

  const toggleChangelog = () => setShowChangelogs((prev) => !prev)
  const toggleInstructions = () => setShowInstructions((prev) => !prev)

  // Fetch device data from the current base path
  const fetchDevice = async () => {
    const url = `${basePaths[androidVersion]}/${codename}.json`
    const a15 = await fetch(
      `https://raw.githubusercontent.com/Evolution-X/OTA/vic/builds/${codename}.json`,
    )
    a15.ok ? setA15available(true) : setA15available(false)
    try {
      const response = await fetch(url)
      const fetchedDeviceData = await response.json()
      return fetchedDeviceData.response[0]
    } catch (error) {
      console.error(
        `Error fetching data for device ${codename} from ${androidVersion}:`,
        error,
      )
      return null // Return null in case of an error
    }
  }

  const fetchVanillaDevice = async () => {
    let url = null
    if (androidVersion === "Android14") {
      url = `https://raw.githubusercontent.com/Evolution-X/OTA/udc-vanilla/builds/${codename}.json`
    } else {
      url = `https://raw.githubusercontent.com/Evolution-X/OTA/vic-vanilla/builds/${codename}.json`
    }
    try {
      const response = await fetch(url)
      const fetchedDeviceData = await response.json()
      return fetchedDeviceData.response[0]
    } catch (error) {
      console.error(
        `Error fetching vanilla data for device ${codename}:`,
        error,
      )
      return null
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const device = await fetchDevice()
      const vanilla = await fetchVanillaDevice()
      setData(device)
      setVanilla(vanilla)
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
    fetchData()
  }, [codename])

  useEffect(() => {
    a15available
      ? setandroidVersion("Android15")
      : setandroidVersion("Android14")
  }, [a15available])

  useEffect(() => {
    const fetchData = async () => {
      setVersionLoading(true)
      const device = await fetchDevice()
      const vanilla = await fetchVanillaDevice()
      setData(device)
      setVanilla(vanilla)
      setTimeout(() => {
        setVersionLoading(false)
      }, 500)
    }
    fetchData()
  }, [androidVersion])

  return (
    <>
      {loading && (
        <img
          className="mx-auto my-auto w-4/5 lg:w-2/5"
          src={evoloading}
          alt="loading ..."
        />
      )}
      {!loading && (
        <div className="mx-4 flex flex-col gap-6 sm:-mt-8 lg:-mb-20 lg:-mt-16">
          {data && !loading && (
            <>
              <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-flex flex-col rounded-2xl border-4 border-dashed border-[#f05d5d] px-8 py-6 lg:py-10"
              >
                <div className="flex flex-col gap-2 lg:gap-4">
                  <p className="font-[Prod-bold] text-2xl lg:text-3xl">
                    Before you download and install!
                  </p>
                  <p className="font-[Prod-light] text-lg lg:text-2xl">
                    We are not responsible for bricked devices, dead SD cards,
                    thermonuclear war, or the current economic crisis. Please do
                    some research if you have any concerns about features
                    included in this ROM before flashing it! YOU are choosing to
                    make these modificiations, and if you point your finger at
                    us for messing up your device, we will{" "}
                    <span className="evoxhighlight font-[Prod-bold]">
                      laugh
                    </span>{" "}
                    at you.
                  </p>
                </div>
              </motion.div>
              <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="space-x-4 *:rounded-full *:px-4 *:py-2 *:text-xl *:text-white"
              >
                <button
                  className={`${androidVersion === "Android14" ? "bg-[#595FDD]" : "bg-[#303030]"}`}
                  onClick={() => setandroidVersion("Android14")}
                >
                  Android 14
                </button>
                {a15available && (
                  <button
                    className={`${androidVersion === "Android15" ? "bg-[#595FDD]" : "bg-[#303030]"}`}
                    onClick={() => setandroidVersion("Android15")}
                  >
                    Android 15
                  </button>
                )}
              </motion.div>
              {versionLoading && (
                <div className="m-auto flex h-[800px] items-center justify-center md:h-[628px]">
                  <img className="" src={evoloading} alt="loading ..." />
                </div>
              )}
              {!versionLoading && data ? (
                <motion.div
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                  className="flex flex-col gap-10 rounded-2xl bg-[#060505] p-6 ring ring-gray-400/5 ring-offset-2 ring-offset-gray-400/5 md:flex-row lg:gap-16 lg:p-11"
                >
                  <div className="mt-6 flex flex-col gap-4">
                    <img
                      className="max-h-72 min-h-64 object-contain"
                      src={`https://github.com/Evolution-X/www_gitres/blob/udc/devices/images/${codename}.png?raw=true`}
                      alt="Device"
                    />
                    <div className="flex flex-wrap justify-center gap-4 sm:flex-row md:flex-col lg:justify-normal lg:pl-2">
                      <span>
                        <p className="text-lg text-[#999999]">Device</p>
                        <p className="w-auto text-2xl md:w-[15rem]">
                          {data.device}
                        </p>
                      </span>
                      <span>
                        <p className="text-lg text-[#999999]">Codename</p>
                        <p className="text-2xl">{codename}</p>
                      </span>
                      <span>
                        <p className="text-lg text-[#999999]">Version</p>
                        <p className="text-2xl">{data.version}</p>
                      </span>
                    </div>
                  </div>
                  <div className="flex grow flex-col rounded-2xl bg-[#151414] px-6 py-7">
                    <div className="flex grow flex-col gap-4 lg:justify-between lg:gap-0">
                      <div className="flex flex-wrap gap-4 pl-2 lg:flex-row lg:gap-0">
                        <div className="grow">
                          <div className="text-lg text-[#999999]">
                            Latest release
                          </div>
                          <div className="text-2xl text-white">
                            {new Date(data.timestamp * 1000)
                              .toString()
                              .slice(0, 24)}
                          </div>
                        </div>
                        <div className="grow">
                          <div className="text-lg text-[#999999]">
                            Build Type
                          </div>
                          <div className="text-2xl text-white">
                            {data.buildtype}
                          </div>
                        </div>
                        <div className="grow">
                          <div className="text-lg text-[#999999]">Rom Size</div>
                          <div className="text-2xl text-white">
                            {(data.size / 1024 / 1024 / 1024).toFixed(2)} GB
                          </div>
                        </div>
                      </div>
                      <div className="inline-flex flex-col items-center justify-between gap-4 rounded-2xl bg-[#212121] px-8 py-5 lg:flex-row">
                        <div className="flex items-center justify-center gap-4 lg:gap-9">
                          <div className="flex size-20 shrink-0 items-center justify-center lg:size-40">
                            <img
                              className="rounded-full"
                              src={`https://avatars.githubusercontent.com/${data.github}`}
                              alt="avatar"
                            />
                          </div>
                          <div className="lg:max-w-90 text-wrap font-[Prod-Medium] text-2xl text-white sm:max-w-56 lg:text-3xl xl:max-w-fit">
                            {data.maintainer}
                          </div>
                        </div>
                        <div className="flex gap-10">
                          <div className="flex grow items-center justify-center gap-4 lg:flex-col xl:flex-row">
                            <Link to={data.paypal} target="_blank">
                              <img
                                src={donateicon}
                                alt="donateicon"
                                className="size-12 lg:size-14"
                              />
                            </Link>
                            <Link to={data.forum} target="_blank">
                              <img
                                src={xdaicon}
                                alt="xda"
                                className="size-12 lg:size-14"
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 text-xl lg:text-2xl">
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                          <div>
                            <button
                              onClick={(e) => {
                                toggleInstructions()
                              }}
                              className="h-16 w-full rounded-full bg-green-500 px-4"
                            >
                              Flashing Instructions
                            </button>
                            {showInstructions && (
                              <>
                                <div className="fixed inset-0 z-50 flex flex-col py-[6rem] backdrop-blur-sm backdrop-sepia md:py-[6rem] lg:py-[6rem] xl:px-[4rem] 2xl:px-[15rem]">
                                  <span
                                    onClick={() => setShowInstructions(false)}
                                    className="absolute right-6 top-6 z-50 cursor-pointer"
                                  >
                                    ❌
                                  </span>
                                  <div className="relative mx-[2rem] grow overflow-y-scroll rounded-3xl bg-stone-800 px-10 outline-dashed outline-2 outline-green-600 lg:pt-[1rem]">
                                    <FlashingInstructions codename={codename} />
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                          <div>
                            <button
                              onClick={() => toggleChangelog()}
                              className="h-16 w-full rounded-full bg-pink-800 px-4"
                            >
                              Changelogs
                            </button>
                            {showChangelogs && (
                              <>
                                <div className="fixed inset-0 z-50 flex flex-col py-[6rem] backdrop-blur-sm backdrop-sepia md:py-[6rem] lg:py-[6rem] xl:px-[4rem] 2xl:px-[15rem]">
                                  <span
                                    onClick={() => setShowChangelogs(false)}
                                    className="absolute right-6 top-6 z-50 cursor-pointer"
                                  >
                                    ❌
                                  </span>
                                  <div className="relative mx-[2rem] grow overflow-y-scroll rounded-3xl bg-stone-800 px-10 outline-dashed outline-2 outline-pink-800 lg:pt-[1rem]">
                                    <Changelogs codename={codename} />
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-4">
                          <Link
                            to={data.download}
                            target="_blank"
                            className="inline-flex h-16 grow items-center justify-center rounded-full bg-[#5b60e3] text-white lg:w-1/2"
                          >
                            <p>Download GAPPS build</p>
                          </Link>
                          {vanilla && !loading && (
                            <Link
                              to={vanilla.download}
                              target="_blank"
                              className="inline-flex h-16 items-center justify-center rounded-full bg-[#5b60e3] text-white lg:w-1/2"
                            >
                              <p>Download VANILLA build</p>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="flex rounded-2xl bg-[#060505] p-6 ring ring-gray-400/5 ring-offset-2 ring-offset-gray-400/5 lg:gap-16 lg:p-11">
                  Android 15 is not available for this device
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  )
}

export default DownloadSection
