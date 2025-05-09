import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import evoloading from "../../assets/evoloading.gif"
import donateicon from "../../assets/donateicon.svg"
import xdaicon from "../../assets/xdaicon.svg"
import closeIcon from "../../assets/menuClose.svg"
import Changelogs from "../Changelogs"
import FlashingInstructions from "../FlashingInstructions"
import { motion } from "framer-motion"
import { ArrowOutwardIcon } from "../ui/icons.tsx"

const variants = {
  hidden: { opacity: 0, y: 75 },
  visible: { opacity: 1, y: 0 }
}

const DownloadSection = () => {
  const { codename } = useParams()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [downloads, setDownloads] = useState(null)
  const [showInstructions, setShowInstructions] = useState(false)
  const [showChangelogs, setShowChangelogs] = useState(false)
  const [androidVersions, setAndroidVersions] = useState([])
  const [supportedBranches, setSupportedBranches] = useState([])
  const [currentBranch, setCurrentBranch] = useState("")

  const toggleChangelog = () => setShowChangelogs((prev) => !prev)
  const toggleInstructions = () => setShowInstructions((prev) => !prev)

  useEffect(() => {
    const fetchVersionsAndDevices = async () => {
      try {
        setLoading(true)

        const versionsResponse = await fetch(
          "https://raw.githubusercontent.com/Evolution-X/www_gitres/refs/heads/main/version/versions.json"
        )
        const versionsData = await versionsResponse.json()
        setAndroidVersions(versionsData)

        const devicesResponse = await fetch(
          "https://raw.githubusercontent.com/Evolution-X/www_gitres/refs/heads/main/devices/devices.json"
        )
        const devicesData = await devicesResponse.json()

        const deviceEntry = devicesData.find(
          (device) => device.device === codename
        )
        const branches = deviceEntry ? deviceEntry.branches : []
        setSupportedBranches(branches)

        if (branches.length > 0) {
          const highestVersionBranch = versionsData
            .sort(
              (a, b) =>
                parseInt(b.version.split("-")[0], 10) -
                parseInt(a.version.split("-")[0], 10)
            )
            .flatMap((versionObj) =>
              versionObj.branches.filter((branch) => branches.includes(branch))
            )[0]

          if (highestVersionBranch) {
            setCurrentBranch(highestVersionBranch)
          }
        }

        setLoading(false)
      } catch (error) {
        console.error("Error fetching versions or devices:", error)
        setLoading(false)
      }
    }

    fetchVersionsAndDevices()
  }, [codename])

  useEffect(() => {
    const fetchData = async () => {
      if (!currentBranch || !codename || androidVersions.length === 0) return

      setLoading(true)
      setData(null)
      setDownloads(null)

      try {
        const url = `https://raw.githubusercontent.com/Evolution-X/OTA/refs/heads/${currentBranch}/builds/${codename}.json`

        const response = await fetch(url)
        if (!response.ok) throw new Error("Device data fetch failed")
        const json = await response.json()
        const deviceData = json.response[0]
        setData(deviceData)

        const endDate = new Date().toISOString().split("T")[0]
        const versionMatch = androidVersions.find((v) =>
          v.branches.includes(currentBranch)
        )
        const androidVersion = versionMatch?.version

        if (deviceData.filename) {
          const versionPath = deviceData.filename.includes("Vanilla")
            ? `${androidVersion}_vanilla`
            : androidVersion
          const statsUrl = `https://sourceforge.net/projects/evolution-x/files/${codename}/${versionPath}/${deviceData.filename}/stats/json?start_date=2019-03-19&end_date=2025-04-30&period=monthly`

          const statsResponse = await fetch(statsUrl)
          if (statsResponse.ok) {
            const statsData = await statsResponse.json()
            setDownloads(statsData?.summaries?.time?.downloads || 0)
          }
        }
      } catch (err) {
        console.error("Error fetching device data or stats:", err)
      }

      setLoading(false)
    }

    fetchData()
  }, [currentBranch, codename, androidVersions])

  return (
    <>
      {loading && (
        <img
          className="mx-auto my-auto w-4/5 lg:w-2/5"
          src={evoloading}
          alt="Loading ..."
        />
      )}
      {!loading && (
        <div className="mx-4 flex flex-col gap-6 sm:-mt-8 lg:-mb-20 lg:-mt-16">
          {data ? (
            <>
              <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-flex flex-col rounded-2xl border-4 border-dashed border-[#ff5e00] px-8 py-6 lg:py-10"
              >
                <div className="flex flex-col gap-2 lg:gap-4">
                  <p className="font-[Prod-bold] text-2xl lg:text-3xl text-[#ff5e00]">
                    Before you download and install!
                  </p>
                  <p className="font-[Prod-light] text-lg lg:text-2xl">
                    We are not responsible for bricked devices, dead SD cards,
                    thermonuclear war, or the current economic crisis. Please do
                    some research if you have any concerns about features
                    included in this ROM before flashing it! YOU are choosing to
                    make these modifications, and if you point your finger at us
                    for messing up your device, we will{" "}
                    <a
                      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="evoxhighlight font-[Prod-bold]"
                    >
                      laugh
                    </a>{" "}
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
                className="inline-flex flex-wrap items-center justify-start gap-3"
              >
                {androidVersions
                  .sort((versionA, versionB) => {
                    const numA = parseInt(versionA.version.split("-")[0], 10)
                    const numB = parseInt(versionB.version.split("-")[0], 10)
                    return numA - numB
                  })
                  .map((versionObj) =>
                    versionObj.branches.map((branch) => {
                      const isVanilla = branch.includes("vanilla")
                      const versionLabel = `${versionObj.version} ${isVanilla ? "VANILLA" : ""}`

                      return (
                        supportedBranches.includes(branch) && (
                          <button
                            key={branch}
                            className={`buttonSelect ${currentBranch === branch ? "bg-[#0060ff]" : ""}`}
                            onClick={() => setCurrentBranch(branch)}
                          >
                            {versionLabel}
                          </button>
                        )
                      )
                    })
                  )}
              </motion.div>
              <motion.div
                variants={variants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-col gap-10 rounded-2xl bg-[#060505] p-6 md:flex-row lg:gap-16 lg:p-11 border-2 border-[#0060ff]"
              >
                <div className="mt-6 flex flex-col gap-4">
                  <img
                    className="max-h-72 min-h-64 object-contain"
                    src={`https://raw.githubusercontent.com/Evolution-X/www_gitres/refs/heads/main/devices/images/${codename}.webp`}
                    alt="Device"
                  />
                  <div className="flex flex-wrap justify-center gap-4 sm:flex-row md:flex-col lg:justify-normal lg:pl-2">
                    <span>
                      <p className="text-lg evoxhighlight">Device</p>
                      <p className="w-auto text-2xl md:w-[15rem]">
                        {data.oem} {data.device}
                      </p>
                    </span>
                    <span>
                      <p className="text-lg evoxhighlight">Codename</p>
                      <p className="text-2xl">{codename}</p>
                    </span>
                    <span>
                      <p className="text-lg evoxhighlight">Version</p>
                      <p className="text-2xl">{data.version}</p>
                    </span>
                  </div>
                </div>
                <div className="flex grow flex-col rounded-2xl bg-[#151414] px-6 py-7 border-2 border-[#0060ff] middleshadow">
                  <div className="flex grow flex-col gap-4 lg:justify-between lg:gap-0">
                    <div className="flex flex-wrap gap-4 pl-2 lg:flex-row lg:gap-0">
                      <div className="grow">
                        <div className="text-lg evoxhighlight">Date</div>
                        <div className="text-2xl text-white">
                          {new Date(data.timestamp * 1000).toDateString()}
                        </div>
                      </div>
                      <div className="grow">
                        <div className="text-lg evoxhighlight">Type</div>
                        <div className="text-2xl text-white">
                          {data.buildtype}
                        </div>
                      </div>
                      <div className="grow">
                        <div className="text-lg evoxhighlight">Size</div>
                        <div className="text-2xl text-white">
                          {(data.size / 1024 / 1024 / 1024).toFixed(2)} GB
                        </div>
                      </div>
                      <div className="grow">
                        <div className="text-lg evoxhighlight">
                          Download Count
                        </div>
                        <div className="text-2xl text-white">
                          {downloads !== null ? downloads : "N/A"}
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex flex-col items-center justify-between gap-4 rounded-2xl bg-[#212121] px-8 py-5 lg:flex-row border-2 border-[#0060ff]">
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
                            onClick={() => toggleInstructions()}
                            className="h-16 w-full rounded-full border-4 border-[#0060ff] bg-transparent px-4"
                          >
                            Flashing Instructions
                          </button>
                          {showInstructions && (
                            <div
                              onClick={(e) => {
                                if (e.target === e.currentTarget) {
                                  setShowInstructions(false)
                                }
                              }}
                              className="fixed inset-0 z-50 flex flex-col py-[6rem] backdrop-blur-sm md:py-[6rem] lg:py-[6rem] xl:px-[4rem] 2xl:px-[15rem]"
                            >
                              <span
                                onClick={() => setShowInstructions(false)}
                                className="absolute p-2 bg-[#0060ff] rounded-full border-4 border-[#0060ff] right-6 top-6 z-50 cursor-pointer"
                              >
                                <img src={closeIcon} alt="close" />
                              </span>
                              <div className="relative mx-[2rem] grow overflow-y-scroll rounded-3xl bg-stone-800 px-10 outline-dashed outline-2 outline-[#0060ff] lg:pt-[1rem]">
                                <FlashingInstructions
                                  codename={codename}
                                  branch={currentBranch}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        <div>
                          <button
                            onClick={() => toggleChangelog()}
                            className="h-16 w-full rounded-full border-4 border-[#0060ff] bg-transparent px-4"
                          >
                            Changelog
                          </button>
                          {showChangelogs && (
                            <div
                              onClick={(e) => {
                                if (e.target === e.currentTarget) {
                                  setShowChangelogs(false)
                                }
                              }}
                              className="fixed inset-0 z-50 flex flex-col py-[6rem] backdrop-blur-sm md:py-[6rem] lg:py-[6rem] xl:px-[4rem] 2xl:px-[15rem]"
                            >
                              <span
                                onClick={() => setShowChangelogs(false)}
                                className="absolute p-2 bg-[#0060ff] rounded-full border-4 border-[#0060ff] right-6 top-6 z-50 cursor-pointer"
                              >
                                <img src={closeIcon} alt="close" />
                              </span>
                              <div className="relative mx-[2rem] grow overflow-y-scroll rounded-3xl bg-stone-800 px-10 outline-dashed outline-2 outline-[#0060ff] lg:pt-[1rem]">
                                <Changelogs
                                  codename={codename}
                                  branch={currentBranch}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-4">
                        <Link
                          to={data.download}
                          target="_blank"
                          className="inline-flex h-16 grow items-center justify-center gap-4 rounded-full bg-[#0060ff] text-white lg:w-1/2"
                        >
                          <p>Download</p> <ArrowOutwardIcon />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              {data.currently_maintained === false && (
                <motion.div
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                  className="inline-flex flex-col rounded-2xl border-4 border-dashed border-red-600 px-8 py-6 lg:py-10"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-[Prod-bold] text-2xl lg:text-3xl text-red-700">
                        This version is no longer maintained!
                      </p>
                      <p className="font-[Prod-light] text-lg lg:text-2xl">
                        You may not receive future updates or bug fixes while on
                        this version of the ROM. We recommend using a version
                        that is currently{" "}
                        <span className="evoxhighlight font-[Prod-bold]">
                          maintained
                        </span>{" "}
                        for continued support.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          ) : (
            <div className="flex rounded-2xl bg-[#060505] p-6 ring ring-gray-400/5 ring-offset-2 ring-offset-gray-400/5 lg:gap-16 lg:p-11">
              No data available for this device.
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default DownloadSection
