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
    <div className="py-5 text-white md:px-5 overflow-y-hidden border-t-slate-600 border border-l-0 border-r-0 border-b-0 md:w-4/5 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2">

      <div className="my-5 w-full ">
       <img className="md:w-2/6 w-3/5 mx-auto md:mx-0" src={evolution} alt="" />
       <div className="w-full text-center md:text-left mx-auto md:mx-10">
       <p className="mt-2 text-blue-200 text-lg">#KeepEvolving</p>
        </div> 
      </div>
      <div className="flex space-x-2 justify-evenly md:justify-end">
        <div className="flex h-12 my-5 gap-4 md:my-auto justify-evenly">
        <a className="mx-auto my-auto" href={'https://discord.com/invite/evolution-x'}><img className="bg-white p-3 rounded-full scale-110 my-auto mx-auto" src={discordicon} alt="" /></a>
        <a href="/"><img src={xdaicon} alt="" /></a>
        <a href="https://github.com/Evolution-X" target="_blank"><img src={ghicon} alt="" /></a>
        <a href="/"><img src={donateicon} alt="" /></a> 
        </div>
      </div>
      </div>
      <div className="grid grid-cols-2 gap-10 px-2 my-5 font-[Prod-light]">
        <div>
          Designed by <span className="underline font-[Prod-bold] text-sm md:text-md"> Kshitij </span>
        </div>
        <div className="text-end">
          Developed by <a href={'https://github.com/ZirgomHaidar'} target='_blank'><span className="underline font-[Prod-bold] text-sm md:text-md">Zirgom Haidar</span></a><span > & </span><a href={'https://github.com/Prathamk07/'} target='_blank'><span className="underline font-[Prod-bold] text-sm md:text-md">Prathamk07</span></a>
        </div>
      </div>
    </div>
  )
}

export default index
