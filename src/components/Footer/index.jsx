import evoXLogo from "../../assets/evoXLogo.svg"
import ghicon from "../../assets/ghicon.svg"
import donateicon from "../../assets/donateicon.svg"
import xdaicon from "../../assets/xdaicon.svg"
import tgicon from "../../assets/tgicon.svg"
import discordicon from "../../assets/discordicon.svg"
import { Link } from "react-router-dom"
import { div } from "framer-motion/client"
import evolution from "../../assets/evolution.svg"

function index() {
  return (
    // <div className="flex flex-col items-center gap-5 bg-[#121B40] rounded-t-xl p-6 lg:h-36 lg:flex-row lg:gap-11 lg:p-10">
    //   <div className="z-40 rounded-xl bg-black/50 px-8 py-4 lg:flex-grow">
    //     <div className="flex flex-col justify-between gap-3 lg:flex-row">
    //       <div className="inline-flex items-center gap-10">
    //         <img src={evoXLogo} alt="evoXLogo" />
    //         <div className="flex-col">
    //           <p className="font-[Prod-bold] text-3xl lg:text-5xl">
    //             <span className="text-[#afbdf3]">Evolution</span>X
    //           </p>
    //           <p className="text-xl font-normal">
    //             <span className="text-[#afbdf3]">Android</span> custom rom
    //           </p>
    //         </div>
    //       </div>
    //       <div className="inline-flex items-center gap-5">
    //         <img className="bg-white p-2 rounded-full size-12" src={discordicon} alt="discord" />
    //         <img src={ghicon} alt="github" />
    //         <img src={xdaicon} alt="xda" />
    //         <img src={donateicon} alt="donate" />
    //       </div>
    //     </div>
    //   </div>
    //   <div className="z-40 inline-flex flex-col justify-center gap-1 text-center font-[Prod-light] text-xs text-[#afbdf3] underline-offset-4 lg:items-end lg:text-lg">
    //     <p>
    //       Designed by{" "}
    //       <span className="font-[Prod-bold] underline">Kshitij</span>
    //     </p>
    //     <p>
    //       Developed by{" "}
    //       <span className="font-[Prod-bold]">
    //        <Link className='underline' to={'https://github.com/ZirgomHaidar'} target="_blank">Zirgom Haidar</Link> & <Link className='underline' to={'https://github.com/Prathamk07'} target="_blank">Prathamk07</Link>
    //       </span>
    //     </p>
    //   </div>
    // </div>
    <div className="m-6 flex flex-col gap-1 border-t border-white/50 px-4 pt-6 tracking-wide text-white">
      <div className="flex flex-col items-center sm:flex-row sm:justify-between lg:flex-row">
        <div className="inline-flex flex-col">
          <img className="h-10" src={evolution} alt="" />
          <p className="mt-2 text-center text-lg text-blue-200 sm:text-start">
            #KeepEvolving
          </p>
        </div>
        <div className="flex justify-center space-x-2 lg:justify-end">
          <div className="my-5 flex h-12 justify-evenly gap-4">
            <a href={"https://discord.com/invite/evolution-x"}>
              <img src={discordicon} alt="" />
            </a>
            <a href="/">
              <img src={xdaicon} alt="" />
            </a>
            <a href="https://github.com/Evolution-X" target="_blank">
              <img src={ghicon} alt="" />
            </a>
            <a href="/">
              <img src={donateicon} alt="" />
            </a>
          </div>
        </div>
      </div>
      <div className="inline-flex flex-col items-center justify-between gap-1 font-[Prod-light] sm:flex-row">
        <div>
          Designed by{" "}
          <span className="font-[Prod-bold] text-sm underline"> Kshitij </span>
        </div>
        <div className="">
          Developed by{" "}
          <a href={"https://github.com/ZirgomHaidar"} target="_blank">
            <span className="font-[Prod-bold] underline">Zirgom Haidar</span>
          </a>
          <span> & </span>
          <a href={"https://github.com/Prathamk07/"} target="_blank">
            <span className="font-[Prod-bold] underline">Prathamk07</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default index
