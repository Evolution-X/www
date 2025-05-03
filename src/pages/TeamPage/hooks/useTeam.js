import { useState, useEffect } from 'react'
import * as Constants from '../../../constants'

const useTeam = () => {
  const [teamData, setTeamData] = useState(null)
  const [maintainersData, setMaintainersData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const [teamResponse, maintainersResponse] = await Promise.all([
          fetch(Constants.TEAM),
          fetch(Constants.MAINTAINERS)
        ])

        if (!teamResponse.ok) throw new Error('Failed to fetch team data')
        if (!maintainersResponse.ok)
          throw new Error('Failed to fetch maintainers data')

        const team = await teamResponse.json()
        const maintainers = await maintainersResponse.json()

        setTeamData(team)
        setMaintainersData(maintainers)
      } catch (err) {
        console.error('Fetch error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return {
    teamData,
    maintainersData,
    loading,
    error
  }
}

export default useTeam
