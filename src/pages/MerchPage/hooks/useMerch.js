import { useState, useEffect } from 'react'
import * as Constants from '../../../constants'

const useMerch = () => {
  const [merchData, setMerchData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMerch = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(Constants.MERCH)
        if (!response.ok) {
          throw new Error(`Failed to fetch merch data from ${Constants.MERCH}`)
        }
        const merchItems = await response.json().then((items) =>
          items.map((item) => ({
            ...item,
            imageUrl: `${Constants.MERCH_IMAGES}${item.image}.webp`
          }))
        )
        setMerchData(merchItems)
      } catch (err) {
        console.error('Error loading merch:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMerch()
  }, [])

  return { merchData, loading, error }
}

export default useMerch
