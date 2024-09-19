import evoXLogo from "../../assets/evoXLogo.svg"
import ghicon from "../../assets/ghicon.svg"
import donateicon from "../../assets/donateicon.svg"
import xdaicon from "../../assets/xdaicon.svg"
import tgicon from "../../assets/tgicon.svg"

function index() {
  return (
    <div className="flex flex-col items-center gap-5 bg-[#121B40] rounded-t-xl p-6 md:h-36 md:flex-row md:gap-11 md:p-10">
      <div className="z-40 rounded-xl bg-black/50 px-8 py-4 md:flex-grow">
        <div className="flex flex-col justify-between gap-3 md:flex-row">
          <div className="inline-flex items-center gap-10">
            <img src={evoXLogo} alt="evoXLogo" />
            <div className="flex-col">
              <p className="font-[Prod-bold] text-3xl md:text-5xl">
                <span className="text-[#afbdf3]">Evolution</span>X
              </p>
              <p className="text-xl font-normal">
                <span className="text-[#afbdf3]">Android</span> custom rom
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-5">
            <img src={tgicon} alt="tg" />
            <img src={ghicon} alt="ghicon" />
            <img src={xdaicon} alt="xda" />
            <img src={donateicon} alt="donateicon" />
          </div>
        </div>
      </div>
      <div className="z-40 inline-flex flex-col justify-center gap-1 text-center font-[Prod-light] text-xs text-[#afbdf3] underline-offset-4 md:items-end md:text-lg">
        <p>
          Website designed by{" "}
          <span className="font-[Prod-bold] underline">Kshitij</span>
        </p>
        <p>
          Website developed by{" "}
          <span className="font-[Prod-bold] underline">
            Zirgom Haidar & Rex07
          </span>
        </p>
      </div>
    </div>
  )
}

export default index
