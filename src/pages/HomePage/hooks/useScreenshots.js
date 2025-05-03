import { useState, useEffect } from 'react'
import * as Constants from '../../../constants'

const useScreenshots = () => {
  const [screenshotUrls, setScreenshotUrls] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchScreenshotUrls = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(Constants.SCREENSHOTS)
        if (!response.ok) {
          throw new Error(
            `Failed to fetch screenshots data from ${Constants.SCREENSHOTS}`
          )
        }
        const data = await response.json()
        const urls = data.map(
          (screenshot) => `${Constants.SCREENSHOTS_IMAGES}${screenshot}.webp`
        )
        setScreenshotUrls(urls)
      } catch (err) {
        console.error('Error fetching screenshots:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchScreenshotUrls()
  }, [])

  return { screenshotUrls, loading, error }
}

export default useScreenshots
