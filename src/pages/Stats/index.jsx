import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import evoloading from "../../assets/evoloading.gif"
import evolution from "../../assets/evolution.svg"
import { toWords } from 'number-to-words'

const variants = {
  hidden: { opacity: 0, y: 75, transition: { delay: 0.2 } },
  visible: { opacity: 1, y: 0, transition: { delay: 0.2 } },
}

const Stats = () => {
  const [dailyStatsData, setDailyStatsData] = useState(null)
  const [weeklyStatsData, setWeeklyStatsData] = useState(null)
  const [monthlyStatsData, setMonthlyStatsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async (period, setData) => {
      const endDate = new Date().toISOString().split("T")[0]
      const url = `https://sourceforge.net/projects/evolution-x/files/stats/json?start_date=2019-03-19&end_date=${endDate}&period=${period}`

      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`Failed to fetch ${period} stats`)
        const data = await response.json()
        setData(data)
      } catch (err) {
        console.error(`${period} stats fetch error:`, err)
        setError(err.message)
      }
    }

    const fetchData = async () => {
      setLoading(true)
      try {
        await Promise.all([
          fetchStats('daily', setDailyStatsData),
          fetchStats('weekly', setWeeklyStatsData),
          fetchStats('monthly', setMonthlyStatsData),
        ])
      } catch (err) {
        console.error("Error in fetching data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const formatDate = (dateString, withTime = false, showDay = true) => {
    const date = new Date(dateString)
    const options = {
      year: "numeric",
      month: "long",
      ...(showDay && { day: "numeric", weekday: "long" }),
      ...(withTime && {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      }),
    }
    return date.toLocaleString("en-US", options)
  }

  if (loading) {
    return <img className="mx-auto" src={evoloading} alt="Loading..." />
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  const getMostDownloads = (downloads) => {
    if (!downloads?.length) return null
    return downloads.reduce((max, current) => current[1] > max[1] ? current : max)
  }

  const mostDownloadsDay = getMostDownloads(dailyStatsData?.downloads)
  const mostDownloadsWeek = getMostDownloads(weeklyStatsData?.downloads)
  const mostDownloadsMonth = getMostDownloads(monthlyStatsData?.downloads)

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className="mx-4 flex flex-col items-center justify-center gap-10 md:gap-20 lg:mx-16 xl:mx-auto xl:w-[64rem]"
    >
      <div className="inline-flex flex-col items-baseline gap-2 text-center font-[Prod-bold] text-4xl sm:flex-row sm:text-5xl lg:gap-4 lg:text-6xl">
        <img className="h-7 sm:h-10 lg:h-12" src={evolution} alt="Logo" />
        <span className="evoxhighlight">Stats</span>
      </div>
      {!loading && !error && dailyStatsData && (
        <div className="text-white text-center space-y-12">
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            className="middleshadow bg-black p-6 rounded-xl flex-1 border-2 border-[#0060ff]"
          >
            <p className="text-2xl font-semibold evoxhighlight">Total Downloads</p>
            <p className="text-lg mt-2">
              In total, Evolution X has been downloaded{" "}
              <span className="text-3xl font-bold evoxhighlight">
                {dailyStatsData.total.toLocaleString()}
              </span>{" "}
              times!
            </p>
            <p className="text-lg mt-2">
              That's{" "}
              <span className="text-lg mt-2 evoxhighlight">
                {toWords(dailyStatsData.total)}
              </span>{" "}
              times!
            </p>
          </motion.div>
          {mostDownloadsDay && (
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              className="middleshadow bg-black p-6 rounded-xl flex-1 border-2 border-[#0060ff]"
            >
              <p className="text-2xl font-semibold evoxhighlight">Most Downloads in a Day</p>
              <p className="text-lg mt-2">
                On{" "}
                <span className="evoxhighlight">
                  {formatDate(mostDownloadsDay[0], false)}
                </span>
                , we hit{" "}
                <span className="text-3xl font-bold evoxhighlight">
                  {mostDownloadsDay[1].toLocaleString()}
                </span>{" "}
                downloads!
              </p>
            </motion.div>
          )}
          {mostDownloadsWeek && (
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              className="middleshadow bg-black p-6 rounded-xl flex-1 border-2 border-[#0060ff]"
            >
              <p className="text-2xl font-semibold evoxhighlight">Most Downloads in a Week</p>
              <p className="text-lg mt-2">
                Starting on{" "}
                <span className="evoxhighlight">
                  {formatDate(mostDownloadsWeek[0], false)}
                </span>
                , we saw{" "}
                <span className="text-3xl font-bold evoxhighlight">
                  {mostDownloadsWeek[1].toLocaleString()}
                </span>{" "}
                downloads over 7 days!
              </p>
            </motion.div>
          )}
          {mostDownloadsMonth && (
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              className="middleshadow bg-black p-6 rounded-xl flex-1 border-2 border-[#0060ff]"
            >
              <p className="text-2xl font-semibold evoxhighlight">Most Downloads in a Month</p>
              <p className="text-lg mt-2">
                In {" "}
                <span className="evoxhighlight">
                  {formatDate(mostDownloadsMonth[0], false, false)}
                </span>, we had {" "}
                <span className="text-3xl font-bold evoxhighlight">
                  {mostDownloadsMonth[1].toLocaleString()}
                </span>{" "}
                downloads!
              </p>
            </motion.div>
          )}
          {dailyStatsData.summaries?.geo?.top && (
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              className="middleshadow bg-black p-6 rounded-xl flex-1 border-2 border-[#0060ff]"
            >
              <p className="text-2xl font-semibold evoxhighlight">Top Country</p>
              <p className="text-lg mt-2">
                The country with the most downloads is{" "}
                <span className="evoxhighlight">
                  {dailyStatsData.summaries.geo.top}
                </span>
                , accounting for{" "}
                <span className="text-3xl font-bold evoxhighlight">
                  {dailyStatsData.summaries.geo.percent}%
                </span>{" "}
                of total downloads!
              </p>
            </motion.div>
          )}
          {dailyStatsData.summaries?.os?.top && (
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              className="middleshadow bg-black p-6 rounded-xl flex-1 border-2 border-[#0060ff]"
            >
              <p className="text-2xl font-semibold evoxhighlight">Top Operating System</p>
              <p className="text-lg mt-2">
                The most used operating system for downloads is{" "}
                <span className="evoxhighlight">
                  {dailyStatsData.summaries.os.top}
                </span>
                , accounting for{" "}
                <span className="text-3xl font-bold evoxhighlight">
                  {dailyStatsData.summaries.os.percent}%
                </span>{" "}
                of total downloads!
              </p>
            </motion.div>
          )}
          {dailyStatsData.downloads?.length > 0 && (
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              className="middleshadow bg-black p-6 rounded-xl border-2 border-[#0060ff]"
            >
              <p className="text-2xl font-semibold evoxhighlight">Downloads per Day</p>
              <div className="mt-4 max-h-40 overflow-y-scroll">
                <ul className="space-y-2">
                  {[...dailyStatsData.downloads]
                    .sort((a, b) => new Date(b[0]) - new Date(a[0]))
                    .map(([date, count], index) => (
                      <li key={index} className="text-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold evoxhighlight">{formatDate(date)}:</span>
                          <span className="ml-4">{count.toLocaleString()}</span>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </motion.div>
          )}
          {weeklyStatsData?.downloads?.length > 0 && (
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              initial="hidden"
              animate="visible"
              className="middleshadow bg-black p-6 rounded-xl border-2 border-[#0060ff] mt-8"
            >
              <p className="text-2xl font-semibold evoxhighlight">Downloads per Week</p>
              <div className="mt-4 max-h-40 overflow-y-scroll">
                <ul className="space-y-2">
                  {[...weeklyStatsData.downloads]
                    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
                    .slice(0, -1)
                    .map(([startDate, count], index) => {
                      const start = new Date(startDate);
                      const end = new Date(start);
                      end.setDate(start.getDate() + 6);
                      const formattedStart = formatDate(start.toISOString(), false, true);
                      const formattedEnd = formatDate(end.toISOString(), false, true);
                      return (
                        <li key={index} className="text-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold evoxhighlight">{`${formattedStart} - ${formattedEnd}`}:</span>
                            <span className="ml-4">{count.toLocaleString()}</span>
                          </div>
                        </li>
                      );
                    })
                    .reverse()}
                </ul>
              </div>
            </motion.div>
          )}
          {monthlyStatsData?.downloads?.length > 0 && (
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              initial="hidden"
              animate="visible"
              className="middleshadow bg-black p-6 rounded-xl border-2 border-[#0060ff] mt-8"
            >
              <p className="text-2xl font-semibold evoxhighlight">Downloads per Month</p>
              <div className="mt-4 max-h-40 overflow-y-scroll">
                <ul className="space-y-2">
                  {[...monthlyStatsData.downloads]
                    .sort((a, b) => new Date(b[0]) - new Date(a[0]))
                    .map(([date, count], index) => (
                      <li key={index} className="text-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold evoxhighlight">{formatDate(date, false, false)}:</span>
                          <span className="ml-4">{count.toLocaleString()}</span>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </motion.div>
          )}
          {dailyStatsData?.countries?.length > 0 && (
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              className="middleshadow bg-black p-6 rounded-xl flex-1 border-2 border-[#0060ff]"
            >
              <p className="text-2xl font-semibold evoxhighlight">Countries</p>
              <div className="mt-4 max-h-40 overflow-y-scroll">
                <ul className="space-y-2">
                  {dailyStatsData.countries.map(([country, downloads], index) => (
                    <li key={index} className="flex justify-between">
                      <span className="text-lg font-semibold evoxhighlight">{country}:</span>
                      <span className="text-lg mt-1">{downloads.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
          {dailyStatsData?.oses?.length > 0 && (
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              className="middleshadow bg-black p-6 rounded-xl flex-1 border-2 border-[#0060ff]"
            >
              <p className="text-2xl font-semibold evoxhighlight">Operating Systems</p>
              <div className="mt-4 max-h-40 overflow-y-scroll">
                <ul className="space-y-2">
                  {dailyStatsData.oses.map(([os, downloads], index) => (
                    <li key={index} className="flex justify-between">
                      <span className="text-lg font-semibold evoxhighlight">{os}:</span>
                      <span className="text-lg mt-1">{downloads.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            className="middleshadow bg-black p-6 rounded-xl border-2 border-[#0060ff] mt-8"
          >
            <p className="text-2xl font-semibold evoxhighlight">Operating Systems by Country</p>
            <div className="mt-4 max-h-40 overflow-y-scroll">
              <ul className="space-y-2">
                {Object.entries(dailyStatsData.oses_by_country)
                  .sort(([a], [b]) =>
                    a.localeCompare(b, undefined, { sensitivity: "base" })
                  )
                  .map(([country, oses], index) => (
                    <li key={index} className="text-lg">
                      <div className="flex justify-center">
                        <span className="font-semibold evoxhighlight">{country}</span>
                      </div>
                      <div className="space-y-2 mt-2">
                        {Object.entries(oses)
                          .sort(([a], [b]) =>
                            a.localeCompare(b, undefined, { sensitivity: "base" })
                          )
                          .map(([os, count], idx) => (
                            <div key={idx} className="flex justify-between items-center">
                              <span className="font-semibold text-left w-1/2 evoxhighlight">{os}:</span>
                              <span className="ml-4 w-1/2 text-right">{count.toLocaleString()}</span>
                            </div>
                          ))}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </motion.div>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            className="middleshadow bg-black p-6 rounded-xl border-2 border-[#0060ff] mt-8"
          >
            <p className="text-2xl font-semibold evoxhighlight">Stats Information</p>
            <div className="mt-4 space-y-2">
              <p className="text-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold evoxhighlight">Updated:</span>
                  <span className="ml-4">{formatDate(dailyStatsData.stats_updated, true)}</span>
                </div>
              </p>
              <p className="text-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold evoxhighlight">Start:</span>
                  <span className="ml-4">{formatDate(dailyStatsData.start_date, true)}</span>
                </div>
              </p>
              <p className="text-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold evoxhighlight">End:</span>
                  <span className="ml-4">{formatDate(dailyStatsData.end_date, true)}</span>
                </div>
              </p>
            </div>
          </motion.div>
          <div className="mt-8 text-sm text-gray-400 text-center">
            <p>
              Download statistics are provided by{" "}
              <a
                href="https://sourceforge.net/projects/evolution-x/"
                className="evoxhighlight"
                target="_blank"
                rel="noopener noreferrer"
              >
                SourceForge
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default Stats
