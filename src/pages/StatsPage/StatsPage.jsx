import { motion } from 'framer-motion'
import React from 'react'
import { toWords } from 'number-to-words'
import evoloading from '../../assets/gifs/evoloading.gif'
import evolution from '../../assets/icons/evolution.svg'
import useStats from './hooks/useStats'

const variants = {
  hidden: { opacity: 0, y: 75, transition: { delay: 0.2 } },
  visible: { opacity: 1, y: 0, transition: { delay: 0.2 } }
}

const StatsPage = () => {
  const { dailyStatsData, weeklyStatsData, monthlyStatsData, loading, error } =
    useStats()

  const formatDate = (dateString, withTime = false, showDay = true) => {
    const date = new Date(dateString)
    const options = {
      year: 'numeric',
      month: 'long',
      ...(showDay && { day: 'numeric', weekday: 'long' }),
      ...(withTime && {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
      })
    }
    return date.toLocaleString('en-US', options)
  }

  const getMostDownloads = (downloads) => {
    if (!downloads?.length) return null
    return downloads.reduce((max, current) =>
      current[1] > max[1] ? current : max
    )
  }

  const getMostDownloadsYear = (monthlyStatsData) => {
    if (!monthlyStatsData?.length) return null

    return getMostDownloads(
      Object.entries(
        monthlyStatsData.reduce((acc, [month, downloads]) => {
          const year = month.split('-')[0]
          acc[year] = (acc[year] || 0) + downloads
          return acc
        }, {})
      ).map(([year, totalDownloads]) => [year, totalDownloads])
    )
  }

  const mostDownloadsDay = getMostDownloads(dailyStatsData?.downloads)
  const mostDownloadsWeek = getMostDownloads(weeklyStatsData?.downloads)
  const mostDownloadsMonth = getMostDownloads(monthlyStatsData?.downloads)
  const mostDownloadsYear = getMostDownloadsYear(monthlyStatsData?.downloads)

  if (loading) {
    return <img className='mx-auto' src={evoloading} alt='Loading...' />
  }

  if (error) {
    return <p className='text-center'>{error}</p>
  }

  return (
    <motion.div
      variants={variants}
      initial='hidden'
      animate='visible'
      className='mx-4 flex flex-col items-center justify-center gap-10 md:gap-20 lg:mx-16 xl:mx-auto xl:w-[64rem]'
    >
      <div className='inline-flex flex-col items-baseline gap-2 text-center font-[Prod-bold] text-4xl sm:flex-row sm:text-5xl lg:gap-4 lg:text-6xl'>
        <img className='h-7 sm:h-10 lg:h-12' src={evolution} alt='Logo' />
        <span className='evoxhighlight'>Stats</span>
      </div>
      {!loading &&
        !error &&
        dailyStatsData &&
        weeklyStatsData &&
        monthlyStatsData && (
          <div className='space-y-12 text-center text-white'>
            <motion.div
              variants={variants}
              initial='hidden'
              animate='visible'
              className='middleshadow flex-1 rounded-xl border-2 border-[#0060ff] bg-[#0f172a] p-6'
            >
              <p className='evoxhighlight text-2xl font-semibold'>
                Total Downloads
              </p>
              <p className='mt-2 text-lg'>
                In total, Evolution X has been downloaded{' '}
                <span className='evoxhighlight text-3xl font-bold'>
                  {dailyStatsData.total.toLocaleString()}
                </span>{' '}
                times!
              </p>
              <p className='mt-2 text-lg'>
                That's{' '}
                <span className='evoxhighlight mt-2 text-lg'>
                  {toWords(dailyStatsData.total)}
                </span>{' '}
                times!
              </p>
            </motion.div>
            <motion.div
              variants={variants}
              initial='hidden'
              animate='visible'
              className='middleshadow flex-1 rounded-xl border-2 border-[#0060ff] bg-[#0f172a] p-6'
            >
              <p className='evoxhighlight text-2xl font-semibold'>
                Most Downloads in a Day
              </p>
              <p className='mt-2 text-lg'>
                On{' '}
                <span className='evoxhighlight'>
                  {formatDate(mostDownloadsDay[0], false)}
                </span>
                , we hit{' '}
                <span className='evoxhighlight text-3xl font-bold'>
                  {mostDownloadsDay[1].toLocaleString()}
                </span>{' '}
                downloads!
              </p>
            </motion.div>
            <motion.div
              variants={variants}
              initial='hidden'
              animate='visible'
              className='middleshadow flex-1 rounded-xl border-2 border-[#0060ff] bg-[#0f172a] p-6'
            >
              <p className='evoxhighlight text-2xl font-semibold'>
                Most Downloads in a Week
              </p>
              <p className='mt-2 text-lg'>
                Starting on{' '}
                <span className='evoxhighlight'>
                  {formatDate(mostDownloadsWeek[0], false)}
                </span>
                , we saw{' '}
                <span className='evoxhighlight text-3xl font-bold'>
                  {mostDownloadsWeek[1].toLocaleString()}
                </span>{' '}
                downloads over 7 days!
              </p>
            </motion.div>
            <motion.div
              variants={variants}
              initial='hidden'
              animate='visible'
              className='middleshadow flex-1 rounded-xl border-2 border-[#0060ff] bg-[#0f172a] p-6'
            >
              <p className='evoxhighlight text-2xl font-semibold'>
                Most Downloads in a Month
              </p>
              <p className='mt-2 text-lg'>
                In{' '}
                <span className='evoxhighlight'>
                  {formatDate(mostDownloadsMonth[0], false, false)}
                </span>
                , we had{' '}
                <span className='evoxhighlight text-3xl font-bold'>
                  {mostDownloadsMonth[1].toLocaleString()}
                </span>{' '}
                downloads!
              </p>
            </motion.div>
            <motion.div
              variants={variants}
              initial='hidden'
              animate='visible'
              className='middleshadow flex-1 rounded-xl border-2 border-[#0060ff] bg-[#0f172a] p-6'
            >
              <p className='evoxhighlight text-2xl font-semibold'>
                Most Downloads in a Year
              </p>
              <p className='mt-2 text-lg'>
                In <span className='evoxhighlight'>{mostDownloadsYear[0]}</span>
                , we had{' '}
                <span className='evoxhighlight text-3xl font-bold'>
                  {mostDownloadsYear[1].toLocaleString()}
                </span>{' '}
                downloads!
              </p>
            </motion.div>
            <motion.div
              variants={variants}
              initial='hidden'
              animate='visible'
              className='middleshadow flex-1 rounded-xl border-2 border-[#0060ff] bg-[#0f172a] p-6'
            >
              <p className='evoxhighlight text-2xl font-semibold'>
                Top Country
              </p>
              <p className='mt-2 text-lg'>
                The country with the most downloads is{' '}
                <span className='evoxhighlight'>
                  {dailyStatsData.summaries.geo.top}
                </span>
                , accounting for{' '}
                <span className='evoxhighlight text-3xl font-bold'>
                  {dailyStatsData.summaries.geo.percent}%
                </span>{' '}
                of total downloads!
              </p>
            </motion.div>
            <motion.div
              variants={variants}
              initial='hidden'
              animate='visible'
              className='middleshadow flex-1 rounded-xl border-2 border-[#0060ff] bg-[#0f172a] p-6'
            >
              <p className='evoxhighlight text-2xl font-semibold'>
                Top Operating System
              </p>
              <p className='mt-2 text-lg'>
                The most used operating system for downloads is{' '}
                <span className='evoxhighlight'>
                  {dailyStatsData.summaries.os.top}
                </span>
                , accounting for{' '}
                <span className='evoxhighlight text-3xl font-bold'>
                  {dailyStatsData.summaries.os.percent}%
                </span>{' '}
                of total downloads!
              </p>
            </motion.div>
            <motion.div
              variants={variants}
              initial='hidden'
              animate='visible'
              className='middleshadow rounded-xl border-2 border-[#0060ff] bg-[#0f172a] p-6'
            >
              <p className='evoxhighlight text-2xl font-semibold'>Per Day</p>
              <div className='mt-4 max-h-40 overflow-y-scroll'>
                <ul className='space-y-2'>
                  {[...dailyStatsData.downloads]
                    .sort((a, b) => new Date(b[0]) - new Date(a[0]))
                    .map(([date, count], index) => (
                      <li key={index} className='text-lg'>
                        <div className='flex items-center justify-between'>
                          <span className='evoxhighlight font-semibold'>
                            {formatDate(date)}:
                          </span>
                          <span className='ml-4'>{count.toLocaleString()}</span>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </motion.div>
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              initial='hidden'
              animate='visible'
              className='middleshadow mt-8 rounded-xl border-2 border-[#0060ff] bg-[#0f172a] p-6'
            >
              <p className='evoxhighlight text-2xl font-semibold'>Per Week</p>
              <div className='mt-4 max-h-40 overflow-y-scroll'>
                <ul className='space-y-2'>
                  {[...weeklyStatsData.downloads]
                    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
                    .slice(0, -1)
                    .map(([startDate, count], index) => {
                      const start = new Date(startDate)
                      const end = new Date(start)
                      end.setDate(start.getDate() + 6)
                      const formattedStart = formatDate(
                        start.toISOString(),
                        false,
                        true
                      )
                      const formattedEnd = formatDate(
                        end.toISOString(),
                        false,
                        true
                      )
                      return (
                        <li key={index} className='text-lg'>
                          <div className='flex items-center justify-between'>
                            <span className='evoxhighlight font-semibold'>
                              {`${formattedStart} - ${formattedEnd}`}:
                            </span>
                            <span className='ml-4'>
                              {count.toLocaleString()}
                            </span>
                          </div>
                        </li>
                      )
                    })
                    .reverse()}
                </ul>
              </div>
            </motion.div>
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              initial='hidden'
              animate='visible'
              className='middleshadow mt-8 rounded-xl border-2 border-[#0060ff] bg-[#0f172a] p-6'
            >
              <p className='evoxhighlight text-2xl font-semibold'>Per Month</p>
              <div className='mt-4 max-h-40 overflow-y-scroll'>
                <ul className='space-y-2'>
                  {[...monthlyStatsData.downloads]
                    .sort((a, b) => new Date(b[0]) - new Date(a[0]))
                    .map(([date, count], index) => (
                      <li key={index} className='text-lg'>
                        <div className='flex items-center justify-between'>
                          <span className='evoxhighlight font-semibold'>
                            {formatDate(date, false, false)}:
                          </span>
                          <span className='ml-4'>{count.toLocaleString()}</span>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </motion.div>
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              initial='hidden'
              animate='visible'
              className='middleshadow mt-8 rounded-xl border-2 border-[#0060ff] bg-[#0f172a] p-6'
            >
              <p className='evoxhighlight text-2xl font-semibold'>Per Year</p>
              <div className='mt-4 max-h-40 overflow-y-scroll'>
                <ul className='space-y-2'>
                  {Object.entries(
                    monthlyStatsData.downloads.reduce((acc, [month, count]) => {
                      const year = month.split('-')[0]
                      if (!acc[year]) acc[year] = 0
                      acc[year] += count
                      return acc
                    }, {})
                  )
                    .sort((a, b) => b[0] - a[0])
                    .map(([year, count], index) => (
                      <li key={index} className='text-lg'>
                        <div className='flex items-center justify-between'>
                          <span className='evoxhighlight font-semibold'>
                            {year}:
                          </span>
                          <span className='ml-4'>{count.toLocaleString()}</span>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </motion.div>
            <motion.div
              variants={variants}
              initial='hidden'
              animate='visible'
              className='middleshadow flex-1 rounded-xl border-2 border-[#0060ff] bg-[#0f172a] p-6'
            >
              <p className='evoxhighlight text-2xl font-semibold'>Countries</p>
              <div className='mt-4 max-h-40 overflow-y-scroll'>
                <ul className='space-y-2'>
                  {dailyStatsData.countries.map(
                    ([country, downloads], index) => (
                      <li key={index} className='flex justify-between'>
                        <span className='evoxhighlight text-lg font-semibold'>
                          {country}:
                        </span>
                        <span className='mt-1 text-lg'>
                          {downloads.toLocaleString()}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </motion.div>
            <motion.div
              variants={variants}
              initial='hidden'
              animate='visible'
              className='middleshadow flex-1 rounded-xl border-2 border-[#0060ff] bg-[#0f172a] p-6'
            >
              <p className='evoxhighlight text-2xl font-semibold'>
                Operating Systems
              </p>
              <div className='mt-4 max-h-40 overflow-y-scroll'>
                <ul className='space-y-2'>
                  {dailyStatsData.oses.map(([os, downloads], index) => (
                    <li key={index} className='flex justify-between'>
                      <span className='evoxhighlight text-lg font-semibold'>
                        {os}:
                      </span>
                      <span className='mt-1 text-lg'>
                        {downloads.toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            <motion.div
              variants={variants}
              initial='hidden'
              animate='visible'
              className='middleshadow mt-8 rounded-xl border-2 border-[#0060ff] bg-[#0f172a] p-6'
            >
              <p className='evoxhighlight text-2xl font-semibold'>
                Operating Systems by Country
              </p>
              <div className='mt-4 max-h-40 overflow-y-scroll'>
                <ul className='space-y-2'>
                  {Object.entries(dailyStatsData.oses_by_country)
                    .sort(([a], [b]) =>
                      a.localeCompare(b, undefined, { sensitivity: 'base' })
                    )
                    .map(([country, oses], index) => (
                      <li key={index} className='text-lg'>
                        <div className='flex justify-center'>
                          <span className='evoxhighlight font-semibold'>
                            {country}
                          </span>
                        </div>
                        <div className='mt-2 space-y-2'>
                          {Object.entries(oses)
                            .sort(([a], [b]) =>
                              a.localeCompare(b, undefined, {
                                sensitivity: 'base'
                              })
                            )
                            .map(([os, count], idx) => (
                              <div
                                key={idx}
                                className='flex items-center justify-between'
                              >
                                <span className='evoxhighlight w-1/2 text-left font-semibold'>
                                  {os}:
                                </span>
                                <span className='ml-4 w-1/2 text-right'>
                                  {count.toLocaleString()}
                                </span>
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
              initial='hidden'
              animate='visible'
              className='mt-8 text-center text-sm text-gray-400'
            >
              <p>
                Download statistics are provided by{' '}
                <a
                  href='https://sourceforge.net/projects/evolution-x/'
                  className='evoxhighlight'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  SourceForge
                </a>
                , and were updated on{' '}
                <span className='evoxhighlight'>
                  {formatDate(dailyStatsData.stats_updated, true)}
                </span>
                , with a start date of{' '}
                <span className='evoxhighlight'>
                  {formatDate(dailyStatsData.start_date, true)}
                </span>{' '}
                and an end date of{' '}
                <span className='evoxhighlight'>
                  {formatDate(dailyStatsData.end_date, true)}
                </span>
                .
                <br />
                <span className='italic text-gray-500'>
                  (All statistics are in UTC)
                </span>
              </p>
            </motion.div>
          </div>
        )}
    </motion.div>
  )
}

export default StatsPage
