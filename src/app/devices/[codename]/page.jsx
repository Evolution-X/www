import { getDeviceData, getAllCodenames } from '../../../lib/dataService'
import DeviceClientPage from './_client/DeviceClientPage'
import DeviceNotFoundClientPage from './_client/DeviceNotFoundClientPage'
import { SITE } from '../../../constants'

export async function generateMetadata({ params }) {
  const { codename } = params
  const deviceData = await getDeviceData(codename)
  const deviceUrl = `${SITE}/devices/${codename}`

  if (!deviceData || !deviceData.branchesData?.length) {
    const notFoundTitle = 'Device Not Found - Evolution X'
    const notFoundDescription = 'The requested device was not found.'

    return {
      title: notFoundTitle,
      description: notFoundDescription,
      openGraph: {
        title: notFoundTitle,
        description: notFoundDescription,
        url: deviceUrl,
        siteName: 'Evolution X',
        type: 'website'
      },
      twitter: {
        card: 'summary_large_image',
        site: '@evolutionxrom',
        creator: '@evolutionxrom',
        title: notFoundTitle,
        description: notFoundDescription
      }
    }
  }

  const defaultBranchData = deviceData.branchesData[0]
  const otaData = defaultBranchData?.ota?.[0]
  const deviceName = otaData?.device || 'Unknown'
  const oemName = otaData?.oem || 'Unknown'

  const title = `Get Evolution X for ${oemName} ${deviceName} (${codename})`
  const description = `Download the latest build for ${codename} and #KeepEvolving!`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: deviceUrl,
      siteName: 'Evolution X',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      site: '@evolutionxrom',
      creator: '@evolutionxrom',
      title,
      description
    }
  }
}

export default async function DevicePage({ params }) {
  const { codename } = params
  const deviceData = await getDeviceData(codename)

  if (!deviceData || !deviceData.branchesData?.length) {
    const allCodenames = await getAllCodenames()
    return (
      <DeviceNotFoundClientPage
        codename={codename}
        allCodenames={allCodenames}
      />
    )
  }

  const defaultBranchData = deviceData.branchesData[0]
  const otaData = defaultBranchData?.ota?.[0]
  const deviceName = otaData?.device || 'Unknown'
  const oemName = otaData?.oem || 'Unknown'
  const imageUrl = `${SITE}/devices/${codename}/opengraph-image`
  const pageUrl = `${SITE}/devices/${codename}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Evolution X',
    operatingSystem: 'Android',
    applicationCategory: 'OperatingSystem',
    softwareVersion: otaData?.version || 'Latest',
    description: `Evolution X is a custom Android operating system for ${oemName} ${deviceName} (${codename}).`,
    image: imageUrl,
    url: pageUrl,
    softwareRequirements: `${oemName} ${deviceName} (model: ${codename})`,
    publisher: {
      '@type': 'Organization',
      name: 'Evolution X',
      url: SITE
    }
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
      <DeviceClientPage codename={codename} deviceData={deviceData} />
    </>
  )
}

export async function generateStaticParams() {
  const devices = await getAllCodenames()
  return devices.map((codename) => ({ codename }))
}
