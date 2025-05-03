import { useState, useEffect } from 'react'
import * as Constants from '../../../constants'

const useCodenames = () => {
  const [codenames, setCodenames] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCodenames = async () => {
      try {
        const response = await fetch(Constants.DEVICES)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        if (Array.isArray(data)) {
          const extractedCodenames = data
            .map((device) => device?.codename)
            .filter(Boolean)
          setCodenames(extractedCodenames)
        } else {
          throw new Error('Expected an array of device objects.')
        }
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchCodenames()
  }, [])

  return { codenames, loading, error }
}

export default useCodenames
