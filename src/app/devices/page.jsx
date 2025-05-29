import DevicesClientPage from './_client/DevicesClientPage'
import { SITE } from '../../constants'
import { getDevicesData } from '../../lib/dataService'

export async function generateMetadata() {
  const title = 'Evolution X Devices'
  const description = 'Officially supported devices on Evolution X.'
  const devicesUrl = `${SITE}/devices`

  const isProduction = process.env.NODE_ENV === 'production'
  const ogImageUrl = `${SITE}/devices.png`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: devicesUrl,
      siteName: 'Evolution X',
      type: 'website',
      ...(isProduction && {
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630
          }
        ]
      })
    },
    twitter: {
      card: 'summary_large_image',
      site: '@evolutionxrom',
      creator: '@evolutionxrom',
      title,
      description,
      ...(isProduction && {
        image: ogImageUrl
      })
    }
  }
}

export default async function DevicesPage() {
  const { deviceMap } = await getDevicesData()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Supported Evolution X Devices',
    description: 'List of officially supported devices running Evolution X.',
    itemListElement: deviceMap.map((device, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: `Evolution X for ${device.oem} ${device.device} (${device.codename})`,
        operatingSystem: 'Android',
        applicationCategory: 'OperatingSystem',
        softwareVersion: 'Latest',
        url: `${SITE}/devices/${device.codename}`,
        image: device.imageUrl,
        softwareRequirements: `${device.oem} ${device.device} (model: ${device.codename})`,
        publisher: {
          '@type': 'Organization',
          name: 'Evolution X',
          url: SITE
        }
      }
    }))
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
      <DevicesClientPage initialDeviceMap={deviceMap} />
    </>
  )
}
