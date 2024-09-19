import React, { useEffect , useState } from "react"
import { Link } from "react-router-dom"
import a14logo from "../../assets/android14.png"
import { BackgroundGradientAnimation } from "../../components/ui/background-gradient-animation.tsx"
import { Meteors } from "../../components/ui/meteors.tsx"
import evoloading from "../../assets/evoloading.gif"

const HomePage = () => {

  const [loading, setLoading]=useState(true)

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }

  const loadingAnimation=async ()=>{
    await timeout(1000);
    setLoading(false)
  }
  useEffect(()=>{
    loadingAnimation()
  },[])

  return (
    <>
    {loading &&
    <>
     <BackgroundGradientAnimation></BackgroundGradientAnimation>

          <img  className="mx-auto z-50 my-auto w-4/5 md:w-2/5" src={evoloading} alt="loading ..." />
    </>
    }
    {!loading &&
      <>
 <BackgroundGradientAnimation></BackgroundGradientAnimation>
      <div className="TOP z-10 flex flex-col items-center justify-center space-y-6 font-[Prod-bold] md:space-y-11">
        <div className="inline-flex flex-col items-center text-4xl leading-tight md:text-6xl">
          <p>
            <span className="evoxhighlight">Evolve</span> your
          </p>
          <p>Android</p>
        </div>
        <div className="inline-flex flex-col items-center text-center font-[Prod-light] text-[1rem] leading-tight md:text-2xl">
          <p>Pixel UI, Android 14, Customization and more.</p>
          <p>
            Get evolved with Evolution. We are{" "}
            <span className="evoxhighlight font-[Prod-bold] text-xl md:text-3xl">
              Evolution X!
            </span>
          </p>
        </div>
        <div className="inline-flex flex-col gap-2 text-center md:flex-row md:gap-6">
          <Link to="/downloads" className="homebutton justify-center">
            Download ROM
          </Link>
          <Link
            className="rounded-full border-2 bg-transparent px-7 py-3 text-white"
            to="https://wiki.evolution-x.org/"
            target="_blank"
          >
            Learn More
          </Link>
        </div>
      </div>
      <div className="MIDDLE z-40 inline-flex flex-col rounded-3xl px-8 pb-16 md:px-16 md:py-16">
        <div className="inline-flex flex-col gap-16">
          <div className="middleshadow flex flex-col gap-10 rounded-3xl bg-black px-10 py-10 md:flex-row md:gap-20 md:px-16 md:py-16">
            <div className="space-y-5 md:space-y-10">
              <p className="font-[Prod-bold] text-2xl md:text-5xl">
                <span className="evoxhighlight">About</span> EvolutionX
              </p>
              <p className="text-lg md:text-2xl">
                Evolution X is a flashable Custom ROM to bring a true Pixel feel
                to your Android Device at first glance, with many additional
                configurations at your disposal. We aim to provide frequent
                builds with monthly security patches from the latest aosp
                sources.
              </p>
              <div className="space-y-3">
                <p className="text-center font-[Prod-light] text-gray-400 md:text-start md:text-2xl">
                  Get Android 14 for your device now
                </p>
                <button className="w-full rounded-full bg-[#f86734] px-7 py-3 text-xl text-white md:w-fit">
                  <Link to={"downloads"}>Download</Link>
                </button>
              </div>
            </div>
            <div className="inline-flex flex-col items-center gap-6 md:gap-12">
              <p className="z-50 italic md:text-xl">#KeepEvolving</p>
              <div className="relative flex justify-center md:w-60">
                <img src={a14logo} alt="A14" className="z-50 size-[12rem]" />
                <Meteors number={25} className="hidden md:block" />
              </div>
            </div>
          </div>
          <div className="inline-flex flex-col gap-12 md:flex-row">
            <div className="middleshadow items-start justify-start rounded-3xl bg-black px-8 py-10 md:px-12 md:py-14 md:w-1/2">
              <div className="flex flex-col items-start justify-start gap-5 md:gap-10">
                <div className="font-[Prod-bold] text-3xl md:text-3xl">
                  Get frequent updates
                </div>
                <div className="md:text-2xl text-xl">
                  We provide the most frequent updates amongst all custom ROMs.
                  The updates aim for the most stable state and ensure to be on
                  the latest security patches.
                </div>
              </div>
            </div>
            <div className="middleshadow items-start justify-start gap-2.5 rounded-3xl bg-black px-8 py-10 md:px-12 md:py-14 md:w-1/2">
              <div className="flex flex-col items-start justify-start gap-5 md:gap-10">
                <div className="font-[Prod-bold] text-2xl md:text-3xl">
                  Gives you a Google Pixel feel
                </div>
                <div className="md:text-2xl text-lg">
                  Evolution X gives you the perfect Pixel experience, using AOSP
                  sources. The ROM also comes with additional customizations and
                  features.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center rounded-3xl">
        ss
      </div>
      </>
    }
     
    </>
  )
}

export default HomePage
