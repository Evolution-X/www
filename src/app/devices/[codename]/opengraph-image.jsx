import { ImageResponse } from 'next/og'
import { SITE, DEVICES_OG_IMAGE } from '../../../constants'
import { getDeviceData } from '../../../lib/dataService'

export const contentType = 'image/png'

export default async function Image({ params }) {
  const { codename } = params

  const deviceData = await getDeviceData(codename)

  const [prodBoldFontData, prodNormalFontData] = await Promise.all([
    fetch(new URL('/fonts/ProductSans-Bold.woff', SITE)).then((res) =>
      res.arrayBuffer()
    ),
    fetch(new URL('/fonts/ProductSans-Regular.woff', SITE)).then((res) =>
      res.arrayBuffer()
    )
  ])

  let displayTitle = 'Device Not Found'
  let displaySubtitle = '(Invalid or missing codename)'
  let imageSource = ''
  let borderColor = 'rgba(255, 0, 0, 0.8)'
  let shadowColor = 'rgba(255, 0, 0, 0.05)'
  let subtitleColor = 'rgb(255, 0, 0)'
  let imageContent

  if (deviceData && deviceData.branchesData?.length) {
    const otaData = deviceData.branchesData[0]?.ota?.[0]
    const displayOem = otaData.oem
    const displayDevice = otaData.device

    displayTitle = `${displayOem} ${displayDevice}`
    displaySubtitle = `(${codename})`
    imageSource = `${DEVICES_OG_IMAGE}${codename}.png`
    borderColor = 'rgba(0, 96, 255, 0.8)'
    shadowColor = 'rgba(0, 96, 255, 0.05)'
    subtitleColor = 'rgb(0, 96, 255)'

    imageContent = (
      <img
        width='400'
        height='400'
        src={imageSource}
        style={{
          borderRadius: 30,
          objectFit: 'contain',
          backgroundColor: '#0f172a',
          border: `3px solid ${borderColor}`,
          padding: '20px',
          boxShadow: `0px 4px 20px 20px ${shadowColor}`
        }}
      />
    )
  } else {
    imageContent = (
      <div
        style={{
          fontSize: 200,
          color: borderColor,
          fontWeight: 'bold',
          fontFamily: 'Prod-bold',
          lineHeight: 1
        }}
      >
        X
      </div>
    )
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          color: 'white',
          background: '#040214',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '40px'
        }}
      >
        <img
          width='495'
          height='85'
          src={`${SITE}/evolution.svg`}
          style={{ marginBottom: '20px' }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginRight: '60px',
              width: '400px',
              height: '400px',
              borderRadius: 30,
              backgroundColor: '#0f172a',
              border: `3px solid ${borderColor}`,
              padding: '20px',
              boxShadow: `0px 4px 20px 20px ${shadowColor}`
            }}
          >
            {imageContent}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              flexGrow: 1,
              maxWidth: '600px',
              paddingLeft: '20px'
            }}
          >
            <p
              style={{
                fontSize: 60,
                fontWeight: 'bold',
                lineHeight: 1.1,
                margin: '0',
                color: 'white',
                whiteSpace: 'pre-wrap',
                fontFamily: 'Prod-bold',
                marginTop: '-10px',
                marginBottom: '5px'
              }}
            >
              {displayTitle}
            </p>
            <p
              style={{
                fontSize: 30,
                color: subtitleColor,
                lineHeight: 1.1,
                margin: '0',
                whiteSpace: 'pre-wrap',
                fontFamily: 'Prod-Normal'
              }}
            >
              {displaySubtitle}
            </p>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Prod-bold',
          data: prodBoldFontData,
          style: 'normal',
          weight: 700
        },
        {
          name: 'Prod-Normal',
          data: prodNormalFontData,
          style: 'normal',
          weight: 400
        }
      ]
    }
  )
}
