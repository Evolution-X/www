import { useState, useEffect } from 'react'
import * as Constants from '../../../constants'

const useVersion = () => {
  const [latestAndroidVersion, setLatestAndroidVersion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLatestAndroidVersion = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(Constants.VERSIONS)
        if (!res.ok) {
          throw new Error(
            `Failed to fetch versions data from ${Constants.VERSIONS}`
          )
        }
        const data = await res.json()
        setLatestAndroidVersion(data?.[0]?.version || null)
      } catch (err) {
        console.error('Error fetching versions data:', err)
        setError(err.message)
        setLatestAndroidVersion(null)
      } finally {
        setLoading(false)
      }
    }

    fetchLatestAndroidVersion()
  }, [])

  return { latestAndroidVersion, loading, error }
}

export default useVersion
