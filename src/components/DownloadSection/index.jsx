import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import avatar from "../../assets/avatar.png"
import donateicon from "../../assets/donateicon.svg"
import tgicon from "../../assets/tgicon.svg"
import xdaicon from "../../assets/xdaicon.svg"
import evoloading from "../../assets/evoloading.gif"

const DownloadSection = () => {
  const { codename } = useParams()
  const [loading, setLoading] = useState(true)
    const [data, setData] = useState()
  const [vanilla, setVanilla] = useState()

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay))
  }

  const fetchDevice = async () => {
    const url = `https://raw.githubusercontent.com/Evolution-X/OTA/udc/builds/${codename}.json`
    try {
      const response = await fetch(url)
      const fetchedDeviceData = await response.json()
      console.log(fetchedDeviceData.response[0])
      await timeout(0)
      return fetchedDeviceData.response[0]
    } catch (error) {
      console.error(`Error fetching data for device ${codename}:`, error)
      return null // Return null in case of an error
    }
  }
  const fetchVanillaDevice = async () => {
    const url = `https://raw.githubusercontent.com/Evolution-X/OTA/udc-vanilla/builds/${codename}.json`
    try {
      const response = await fetch(url)
      const fetchedDeviceData = await response.json()
      console.log(fetchedDeviceData.response[0])
      return fetchedDeviceData.response[0]
    } catch (error) {
      return null
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const device = await fetchDevice()
      const vanilla = await fetchVanillaDevice()
      setData(device)
      setVanilla(vanilla)
      setLoading(false)
    }
    fetchData()
  }, [codename]) // Add codename as a dependency to refetch when it changes

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
              <div className="inline-flex flex-col rounded-2xl border-4 border-dashed border-[#f05d5d] px-8 py-6 lg:py-10">
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
              </div>
              <div className="flex flex-col gap-10 rounded-2xl bg-[#060505] p-6 ring ring-gray-400/5 ring-offset-2 ring-offset-gray-400/5 md:flex-row lg:gap-16 lg:p-11">
                <div className="mt-6 flex flex-col gap-4">
                  <img
                    className="max-h-72 min-h-64 object-contain"
                    src={`https://github.com/Evolution-X/official_devices/blob/udc/images/devices/${codename}.png?raw=true`}
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
                <div className="flex grow flex-col rounded-2xl bg-[#151414] px-6 py-7 lg:px-10">
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
                        <div className="text-lg text-[#999999]">Build Type</div>
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
                    <div className="inline-flex flex-col items-center justify-between gap-6 rounded-2xl bg-[#212121] px-8 py-5 lg:flex-row">
                      <div className="flex items-center gap-4 lg:gap-9">
                        <div className="flex size-20 items-center justify-center">
                          <img
                            className="rounded-full"
                            src={`https://avatars.githubusercontent.com/${data.github}`}
                            alt="avatar"
                          />
                        </div>
                        <div className="font-[Prod-Medium] text-2xl text-white lg:text-3xl">
                          {data.maintainer}
                        </div>
                      </div>
                      <div className="flex gap-10">
                        <div className="flex items-center justify-center gap-4">
                          <Link to={data.telegram} target="_blank">
                            <img src={tgicon} alt="tg" />
                          </Link>
                          <Link to={data.paypal} target="_blank">
                            <img src={donateicon} alt="donateicon" />
                          </Link>
                          <Link to={data.forum} target="_blank">
                            <img src={xdaicon} alt="xda" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col pl-2 text-lg lg:text-xl">
                      <p className="text-white">Note:</p>
                      <p className="text-[#d9d9d9]">
                        Me noob.
                        <br />
                        If you searched evolutionX then you probably don&apos;t
                        need notes.
                        <br />
                        Someone said fuck around and find out.
                        <br />
                        point N
                        <br />
                        point N
                      </p>
                    </div>
                    <div className="flex w-full flex-col gap-4 text-xl lg:flex-row lg:gap-9 lg:text-2xl">
                      <Link
                        to={data.download}
                        target="_blank"
                        className="inline-flex h-16 grow items-center justify-center rounded-full bg-[#5b60e3] text-white lg:w-1/2"
                      >
                        <p>Download GAPPS</p>
                      </Link>
                      {vanilla && !loading && (
                        <Link
                          to={vanilla.download}
                          target="_blank"
                          className="inline-flex h-16 items-center justify-center rounded-full bg-[#5b60e3] text-white lg:w-1/2"
                        >
                          <p>Download VANILLA</p>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default DownloadSection
