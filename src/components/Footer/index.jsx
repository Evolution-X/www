import evoXLogo from "../../assets/evoXLogo.svg"
import ghicon from "../../assets/ghicon.svg"
import donateicon from "../../assets/donateicon.svg"
import xdaicon from "../../assets/xdaicon.svg"
import tgicon from "../../assets/tgicon.svg"
import discordicon from "../../assets/discord.svg"
import { Link } from "react-router-dom"
import { div } from "framer-motion/client"
import evolution from "../../assets/evolution.svg"

function index() {
  return (
    // <div className="flex flex-col items-center gap-5 bg-[#121B40] rounded-t-xl p-6 md:h-36 md:flex-row md:gap-11 md:p-10">
    //   <div className="z-40 rounded-xl bg-black/50 px-8 py-4 md:flex-grow">
    //     <div className="flex flex-col justify-between gap-3 md:flex-row">
    //       <div className="inline-flex items-center gap-10">
    //         <img src={evoXLogo} alt="evoXLogo" />
    //         <div className="flex-col">
    //           <p className="font-[Prod-bold] text-3xl md:text-5xl">
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
    //   <div className="z-40 inline-flex flex-col justify-center gap-1 text-center font-[Prod-light] text-xs text-[#afbdf3] underline-offset-4 md:items-end md:text-lg">
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
    <div className="py-5 text-white px-5 border-t-slate-600 border border-l-0 border-r-0 border-b-0 w-4/5 mx-auto">
      <div className="grid grid-cols-2">

      <div className="my-5 w-screen">
       <img className="w-2/5 md:w-1/6 " src={evolution} alt="" />
       <div className="w-1/6 text-center">
       <p className="mt-2 text-blue-200 text-lg">#KeepEvolving</p>
        </div> 
      </div>
      <div className="flex space-x-2 justify-end">
        <div className="flex space-x-2 h-12 my-auto">
        <img className="bg-white p-3 rounded-full" src={discordicon} alt="" />
        <img src={xdaicon} alt="" />
        <img src={ghicon} alt="" />
        <img src={donateicon} alt="" /> 
        </div>
      </div>
      </div>
      <div className="flex justify-between font-[Prod-light]">
        <div>
          Designed by <span className="underline font-[Prod-bold]"> Kshitij </span>
        </div>
        <div>
          Developed by <span className="underline font-[Prod-bold]">Zirgom Haidar & Prathamk07</span>
        </div>
      </div>
    </div>
  )
}

export default index
