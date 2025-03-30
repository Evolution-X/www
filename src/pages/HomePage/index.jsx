import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BackgroundGradientAnimation } from "../../components/ui/background-gradient-animation.tsx"
import { Meteors } from "../../components/ui/meteors.tsx"
import evoloading from "../../assets/evoloading.gif"
import evolution from "../../assets/evolution.svg"
import { motion } from "framer-motion"
import { ArrowOutwardIcon } from "../../components/ui/icons.tsx"
import ScreenshotCarousel from "../../components/ScreenshotCarousel"

const variants = {
  hidden: { opacity: 0, y: 75 },
  visible: { opacity: 1, y: 0 },
}

const HomePage = () => {
  const [loading, setLoading] = useState(true)
  const [androidVersion, setAndroidVersion] = useState(null)

  const fetchData = async () => {
    const androidVersionUrl =
      "https://raw.githubusercontent.com/Evolution-X/www_gitres/refs/heads/main/version/latestversion.json"

    try {
      const versionResponse = await fetch(androidVersionUrl)
      const versionData = await versionResponse.json()
      const version = Object.keys(versionData)[0]
      setAndroidVersion(version)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching version data:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      {loading && (
        <>
          <BackgroundGradientAnimation />
          <img className="z-50 m-auto" src={evoloading} alt="Loading ..." />
        </>
      )}
      {!loading && (
        <>
          <BackgroundGradientAnimation />
          <motion.div
            className="TOP z-10 flex flex-col items-center justify-center space-y-6 font-[Prod-bold]"
            variants={variants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
          >
            <div className="inline-flex flex-col items-center text-4xl leading-tight sm:text-5xl lg:text-6xl">
              <p>
                <span className="evoxhighlight">Evolve</span> your
              </p>
              <p>Android device</p>
            </div>
            <div className="inline-flex flex-col items-center text-center font-[Prod-light] text-lg leading-tight sm:text-xl lg:text-2xl">
              <p>Pixel UI, Customization & more.</p>
              <p>
                We are{" "}
                <span>
                  <img className="h-7" src={evolution} alt="" />
                </span>
              </p>
            </div>
            <div className="inline-flex flex-col items-center gap-2 pt-3 text-center sm:flex-row sm:gap-3 lg:flex-row lg:gap-6">
              <Link to="/downloads">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  initial={{ scale: 1 }}
                  className="homebutton min-w-[11rem] rounded-full bg-[#0060ff] border-none px-7 py-3"
                >
                  <div className="">Download ROM</div>
                </motion.div>
              </Link>
              <Link to="https://wiki.evolution-x.org/" target="_blank">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  initial={{ scale: 1 }}
                  className="min-w-[11rem] rounded-full border-2 border-[#0060ff] bg-transparent px-7 py-3 text-white"
                >
                  <div className="inline-flex items-center gap-2">
                    Learn More <ArrowOutwardIcon />
                  </div>
                </motion.div>
              </Link>
            </div>
          </motion.div>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="MIDDLE z-40 inline-flex flex-col rounded-3xl px-8 pb-16 lg:px-16 lg:py-16"
          >
            <div className="inline-flex flex-col gap-9">
              <div className="middleshadow flex flex-col gap-10 rounded-3xl bg-black px-10 py-10 sm:flex-row lg:min-h-[28rem] lg:flex-row lg:gap-20 lg:px-16 lg:py-16">
                <div className="space-y-5 sm:w-3/4 lg:space-y-10">
                  <p className="font-[Prod-bold] text-3xl lg:text-5xl">
                    <span className="evoxhighlight">About</span> Evolution X
                  </p>
                  <p className="text-xl lg:text-2xl">
                    Evolution X aims to provide users with a Pixel-like feel at
                    first glance, with additional features at their disposal.
                  </p>
                  <div>
                    <p className="font-[Prod-normal] text-gray-400 lg:text-start lg:text-2xl">
                      Get Android {androidVersion} for your device now
                    </p>
                    <Link to={"downloads"}>
                      <motion.div
                        whileTap={{ scale: 0.95 }}
                        initial={{ scale: 1 }}
                        className="mt-2.5 w-full rounded-full bg-[#34A853] px-7 py-3 text-center text-xl text-white lg:w-fit"
                      >
                        Download
                      </motion.div>
                    </Link>
                  </div>
                </div>
                <div className="inline-flex flex-col items-center gap-6 lg:gap-12">
                  <p className="z-40 text-lg italic lg:text-xl evoxhighlight">
                    #KeepEvolving
                  </p>
                  <div className="relative flex justify-center lg:w-60">
                    <img
                      src={`https://github.com/Evolution-X/www_gitres/blob/main/version/androidversion.png?raw=true`}
                      alt=""
                      className="z-40 size-[12rem] sm:size-[10rem] lg:size-[12rem]"
                    />
                    <Meteors number={25} className="hidden lg:block" />
                  </div>
                </div>
              </div>
              <div className="inline-flex flex-col gap-9 sm:flex-row md:gap-12 lg:flex-row">
                <div className="middleshadow items-start justify-start rounded-3xl bg-black px-8 py-10 sm:w-1/2 lg:px-12 lg:py-14">
                  <div className="flex flex-col items-start justify-start gap-5 lg:gap-10">
                    <div className="font-[Prod-bold] text-3xl capitalize lg:text-3xl">
                      Frequent updates & latest security patches
                    </div>
                    <div className="text-xl lg:text-2xl">
                      We provide frequent updates amongst most custom ROMs.
                      These updates aim to be in a stable state and are
                      guaranteed to be on the latest security patches.
                    </div>
                  </div>
                </div>
                <div className="middleshadow items-start justify-start rounded-3xl bg-black px-8 py-10 sm:w-1/2 lg:px-12 lg:py-14">
                  <div className="flex flex-col items-start justify-start gap-5 lg:gap-10">
                    <div className="font-[Prod-bold] text-3xl capitalize lg:text-3xl">
                      Pixel look & feel
                    </div>
                    <div className="text-xl lg:text-2xl">
                      Evolution X provides you with the perfect Pixel
                      experience, imitating Google Pixel devices, with
                      additional customizations.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <div className="screenshot-carousel-container">
            <ScreenshotCarousel />
          </div>
        </>
      )}
    </>
  )
}

export default HomePage
