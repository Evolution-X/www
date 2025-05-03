import { useState, useEffect } from 'react'
import * as Constants from '../../../constants'

const useDevice = (codename) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deviceData, setDeviceData] = useState(null)

  useEffect(() => {
    const getDeviceData = async () => {
      setLoading(true)
      setError(null)
      setDeviceData(null)

      if (!codename) {
        setError(new Error('Codename not provided.'))
        setLoading(false)
        return
      }

      try {
        const [devicesResponse, versionsResponse] = await Promise.all([
          fetch(Constants.DEVICES),
          fetch(Constants.VERSIONS)
        ])

        if (!devicesResponse.ok)
          throw new Error(
            `HTTP error fetching devices! status: ${devicesResponse.status}`
          )
        const devices = await devicesResponse.json()

        if (!versionsResponse.ok)
          throw new Error(
            `HTTP error fetching versions! status: ${versionsResponse.status}`
          )
        const versions = await versionsResponse.json()

        const foundDevice = devices.find(
          (device) => device.codename === codename
        )
        if (!foundDevice) {
          setDeviceData(null)
          setLoading(false)
          return
        }

        const branchesData = await Promise.all(
          foundDevice.branches.map(async (branch) => {
            const otaResponse = await fetch(
              `${Constants.OTA}${branch}/builds/${codename}.json`
            )
            const ota = otaResponse.ok
              ? (await otaResponse.json())?.response
              : null
            if (!otaResponse.ok && otaResponse.status !== 404) {
              console.error(
                `HTTP error fetching OTA for ${codename} on ${branch}! status: ${otaResponse.status}`
              )
            } else if (otaResponse.status === 404) {
              console.warn(
                `OTA data not found for ${codename} on branch ${branch}`
              )
            }

            const versionEntry = versions.find(
              (entry) => entry.branch === branch
            )
            const version = versionEntry?.version || 'N/A'
            const gappsLink = versionEntry?.gapps_link || null
            const downloads = {}

            if (ota && ota.length > 0) {
              await Promise.all(
                ota.map(async (otaItem) => {
                  const endDate = new Date().toISOString().split('T')[0]
                  const downloadUrl = `https://sourceforge.net/projects/evolution-x/files/${codename}/${version}/${otaItem.filename}/stats/json?start_date=2019-03-19&end_date=${endDate}&period=monthly`
                  try {
                    const downloadResponse = await fetch(downloadUrl)
                    if (!downloadResponse.ok) {
                      console.error(
                        `HTTP error fetching download count for ${otaItem.filename}! status: ${downloadResponse.status}`
                      )
                      downloads[otaItem.filename] = 0
                    } else {
                      const downloadData = await downloadResponse.json()
                      downloads[otaItem.filename] =
                        downloadData?.summaries?.time?.downloads || 0
                    }
                  } catch (downloadErr) {
                    console.error(
                      `Error fetching download count for ${otaItem.filename}:`,
                      downloadErr
                    )
                    downloads[otaItem.filename] = 0
                  }
                })
              )
            }

            return { branch, version, ota, downloads, gappsLink }
          })
        )

        setDeviceData({
          deviceInfo: foundDevice,
          branchesData: branchesData.filter((data) => data.ota !== null)
        })
      } catch (err) {
        setError(err)
        console.error('Error fetching device data:', err)
      } finally {
        setLoading(false)
      }
    }

    getDeviceData()
  }, [codename])

  return { deviceData, loading, error }
}

export default useDevice
