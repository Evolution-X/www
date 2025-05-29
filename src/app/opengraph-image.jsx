import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { SITE } from '../constants'
import { permanentRedirect } from 'next/navigation'

export const contentType = 'image/png'

export default async function Image() {
  if (process.env.NODE_ENV === 'production') {
    permanentRedirect(`${SITE}/home.png`)
  }

  const [prodBoldFontData, prodLightFontData] = await Promise.all([
    readFile(join(process.cwd(), 'src/assets/fonts/ProductSans-Bold.woff')),
    readFile(join(process.cwd(), 'src/assets/fonts/ProductSans-Light.woff'))
  ])

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          boxSizing: 'border-box',
          color: 'white',
          position: 'relative',
          backgroundColor: '#040214',
          backgroundImage: `
            radial-gradient(circle at 30% 35%, rgba(18, 113, 255, 0.4) 0%, rgba(18, 113, 255, 0) 35%),
            radial-gradient(circle at 60% 40%, rgba(221, 74, 255, 0.3) 0%, rgba(221, 74, 255, 0) 35%),
            radial-gradient(circle at 70% 25%, rgba(0, 96, 255, 0.3) 0%, rgba(0, 96, 255, 0) 35%),
            radial-gradient(circle at 45% 55%, rgba(200, 50, 50, 0.25) 0%, rgba(200, 50, 50, 0) 35%),
            radial-gradient(circle at 20% 20%, rgba(180, 180, 50, 0.25) 0%, rgba(180, 180, 50, 0) 35%)
          `,
          backgroundBlendMode: 'hard-light'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: 90,
            lineHeight: 1.2,
            fontFamily: 'Prod-bold',
            textAlign: 'center',
            zIndex: 1
          }}
        >
          <div style={{ display: 'flex' }}>
            <span style={{ color: 'rgb(0, 96, 255)' }}>Evolve</span>&nbsp;your
          </div>
          <div>Android device</div>
        </div>

        <div
          style={{
            marginTop: 30,
            fontSize: 40,
            lineHeight: 1.4,
            fontFamily: 'Prod-light',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 1
          }}
        >
          <div>Pixel UI, Customization & more.</div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '10px',
              gap: '6px'
            }}
          >
            <span>We are</span>
            <img
              src={`${SITE}/evolution.svg`}
              alt='Evolution X Logo'
              style={{
                display: 'block',
                height: '60px'
              }}
            />
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
          name: 'Prod-light',
          data: prodLightFontData,
          style: 'normal',
          weight: 300
        }
      ]
    }
  )
}
