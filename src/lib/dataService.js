import { cache } from 'react'
import * as Constants from '../constants'

const handleFetchError = (res, url, context) => {
  const is404 = res.status === 404
  const message = is404
    ? `404 Not Found: ${context} - ${url}`
    : `Fetch failed for ${context}: ${res.status} - ${url}`
  const log = is404 ? console.warn : console.error
  log(message)
  return null
}

const fetchResource = async (url, responseType = 'json', context = 'data') => {
  try {
    const res = await fetch(url, {
      next: { revalidate: Constants.REVALIDATE_TIME }
    })
    if (!res.ok) return handleFetchError(res, url, context)
    return responseType === 'text' ? await res.text() : await res.json()
  } catch (err) {
    console.error(`Error fetching ${context} from ${url}:`, err)
    return null
  }
}

const fetchArray = async (url, context) => {
  const data = await fetchResource(url, 'json', context)
  return Array.isArray(data) ? data : []
}

const fetchObject = async (url, context) => {
  const data = await fetchResource(url, 'json', context)
  return data && typeof data === 'object' && !Array.isArray(data) ? data : {}
}

const cachedJsonArray = (url, context) => cache(() => fetchArray(url, context))

const cachedJsonObject = (url, context) =>
  cache(() => fetchObject(url, context))

export const fetchTeam = cachedJsonArray(Constants.TEAM, 'team')
export const fetchMaintainers = cachedJsonObject(
  Constants.MAINTAINERS,
  'maintainers'
)
export const fetchAllDevices = cachedJsonArray(Constants.DEVICES, 'devices')
export const fetchAllVersions = cachedJsonArray(Constants.VERSIONS, 'versions')

export const fetchLatestAndroidVersion = cache(async () => {
  const versions = await fetchAllVersions()
  return versions[0]?.version || null
})

export const fetchChangelog = cache((codename, branch) => {
  const url = `${Constants.OTA}${branch}/changelogs/${codename}.txt`
  return fetchResource(url, 'text', `changelog for ${codename}/${branch}`)
})

export const getAllCodenames = cache(async () => {
  const devices = await fetchAllDevices()
  return devices.map((d) => d.codename).filter(Boolean)
})

export const fetchOtaData = cache(async (codename, branch) => {
  const url = `${Constants.OTA}${branch}/builds/${codename}.json`
  const data = await fetchResource(
    url,
    'json',
    `OTA data for ${codename} on ${branch}`
  )
  return Array.isArray(data?.response) ? data.response : []
})

export const getDevicesData = cache(async () => {
  try {
    const [devices, versions] = await Promise.all([
      fetchAllDevices(),
      fetchAllVersions()
    ])
    const latestBranch = versions[0]?.branch

    const deviceMap = (
      await Promise.all(
        devices.map(async ({ codename, branches }) => {
          const branch = branches?.[0]
          if (!branch) return null

          const ota = await fetchOtaData(codename, branch)
          if (!ota.length) return null

          const latestBuild = Math.max(...ota.map((b) => b.timestamp || 0))
          const info = ota.find((b) => b.device || b.oem) || {}
          const isMaintained = ota.some((b) => b.currently_maintained)

          return {
            codename,
            device: info.device || 'N/A',
            oem: info.oem || 'N/A',
            latestBuild,
            isMaintained,
            supportsLatest: branches.includes(latestBranch),
            imageUrl: `${Constants.DEVICES_IMAGE}${codename}.webp`
          }
        })
      )
    )
      .filter(Boolean)
      .sort((a, b) => b.latestBuild - a.latestBuild)

    return { deviceMap }
  } catch (e) {
    console.error('getDevicesData failed:', e)
    return { deviceMap: [] }
  }
})

export const getDeviceData = cache(async (codename) => {
  const [devices, versions] = await Promise.all([
    fetchAllDevices(),
    fetchAllVersions()
  ])
  const device = devices.find((d) => d.codename === codename)
  if (!device) return null

  const branchesData = (
    await Promise.all(
      device.branches.map(async (branch) => {
        const ota = await fetchOtaData(codename, branch)
        if (!ota.length) return null

        const changelog = await fetchChangelog(codename, branch)
        const version = versions.find((v) => v.branch === branch)

        return {
          branch,
          version: version?.version || 'N/A',
          gappsLink: version?.gapps_link || null,
          ota,
          changelog
        }
      })
    )
  ).filter(Boolean)

  return { ...device, branchesData }
})

export const getBlogData = cache(async (blogId = null) => {
  try {
    if (blogId) {
      const data = await fetchResource(
        `${Constants.BLOG_POSTS}${blogId}.json`,
        'json',
        `blog post ${blogId}`
      )
      return { data, blogsList: [], error: null }
    }

    const ids = await fetchArray(Constants.BLOGS, 'blog IDs')
    const blogs = (
      await Promise.all(
        ids.map(async (id) => {
          const blog = await fetchResource(
            `${Constants.BLOG_POSTS}${id}.json`,
            'json',
            `blog ${id}`
          )
          return blog ? { ...blog, blogId: id } : null
        })
      )
    )
      .filter(Boolean)
      .sort((a, b) => new Date(b.date) - new Date(a.date))

    return { data: null, blogsList: blogs, error: null }
  } catch (e) {
    console.error('getBlogData failed:', e)
    return { data: null, blogsList: [], error: { message: e.message } }
  }
})

export const fetchScreenshots = cache(async () => {
  const data = await fetchArray(Constants.SCREENSHOTS, 'screenshots')
  const urls = data.map(
    (screenshot) => `${Constants.SCREENSHOTS_IMAGES}${screenshot}.webp`
  )
  return urls
})
