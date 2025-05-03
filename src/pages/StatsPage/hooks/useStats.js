import { useEffect, useState } from 'react'

const useStats = () => {
  const [dailyStatsData, setDailyStatsData] = useState(null)
  const [weeklyStatsData, setWeeklyStatsData] = useState(null)
  const [monthlyStatsData, setMonthlyStatsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async (period, setData) => {
      const endDate = new Date().toISOString().split('T')[0]
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
      setError(null)
      try {
        await Promise.all([
          fetchStats('daily', setDailyStatsData),
          fetchStats('weekly', setWeeklyStatsData),
          fetchStats('monthly', setMonthlyStatsData)
        ])
      } catch (err) {
        console.error('Error in fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { dailyStatsData, weeklyStatsData, monthlyStatsData, loading, error }
}

export default useStats
