import { useState, useEffect, useCallback } from 'react'
import * as Constants from '../../../constants'

const useChangelog = (codename, branch) => {
  const [changelog, setChangelog] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchChangelog = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    const url = `${Constants.OTA}/refs/heads/${branch}/changelogs/${codename}.txt`
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.text()
      setChangelog(data)
    } catch (err) {
      console.error('Error fetching changelog for device ' + codename, err)
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }, [codename, branch])

  useEffect(() => {
    fetchChangelog()
  }, [fetchChangelog])

  return { changelog, isLoading, error }
}

export default useChangelog
