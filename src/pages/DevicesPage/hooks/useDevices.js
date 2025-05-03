import { useState, useEffect, useCallback } from 'react'
import * as Constants from '../../../constants'

const useDevices = () => {
  const [loading, setLoading] = useState(true)
  const [deviceMap, setDeviceMap] = useState([])
  const [error, setError] = useState(null)

  const fetchOTAData = useCallback(async (codename, branch) => {
    const res = await fetch(`${Constants.OTA}${branch}/builds/${codename}.json`)
    if (!res.ok) {
      if (res.status === 404) return []
      throw new Error(`HTTP ${res.status} for ${codename}`)
    }
    const json = await res.json()
    return json.response || []
  }, [])

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const [devicesRes, versionsRes] = await Promise.all([
          fetch(Constants.DEVICES),
          fetch(Constants.VERSIONS)
        ])

        if (!devicesRes.ok || !versionsRes.ok) {
          throw new Error('Failed to fetch devices or versions')
        }

        const devices = await devicesRes.json()
        const versions = await versionsRes.json()
        const latestVersion = versions[0]?.branch || null

        const results = await Promise.all(
          devices.map(async ({ codename, branches }) => {
            const ota = await fetchOTAData(codename, branches[0])

            const isMaintained = ota.some(
              (build) => build.currently_maintained === true
            )
            const latestBuild = ota.reduce(
              (max, b) => (b.timestamp > max ? b.timestamp : max),
              0
            )
            const deviceName = ota.find((b) => b.device)?.device || 'N/A'
            const oem = ota.find((b) => b.oem)?.oem || 'N/A'

            return {
              codename,
              device: deviceName,
              oem,
              supportsLatest: branches.includes(latestVersion),
              isMaintained,
              latestBuild,
              imageUrl: `${Constants.DEVICES_IMAGE}${codename}.webp`
            }
          })
        )

        results.sort((a, b) => b.latestBuild - a.latestBuild)
        setDeviceMap(results)
        setError(null)
        setLoading(false)
      } catch (e) {
        setDeviceMap([])
        setError(e)
        setLoading(false)
      }
    }

    fetchDevices()
  }, [fetchOTAData])

  return { deviceMap, loading, error }
}

export default useDevices
