import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { SITE } from '../../constants'
import { permanentRedirect } from 'next/navigation'

export const contentType = 'image/png'

export default async function Image() {
  if (process.env.NODE_ENV === 'production') {
    permanentRedirect(`${SITE}/blog.png`)
  }

  const [prodBoldFontData, prodNormalFontData] = await Promise.all([
    readFile(join(process.cwd(), 'src/assets/fonts/ProductSans-Bold.woff')),
    readFile(join(process.cwd(), 'src/assets/fonts/ProductSans-Regular.woff'))
  ])

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
          justifyContent: 'center',
          padding: '40px',
          boxSizing: 'border-box',
          textAlign: 'center',
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
        <img
          width='495'
          height='85'
          src={`${SITE}/evolution.svg`}
          style={{
            marginBottom: '30px'
          }}
        />

        <p
          style={{
            fontSize: 70,
            fontWeight: 'bold',
            lineHeight: 1.1,
            margin: '0',
            color: 'rgb(0, 96, 255)',
            fontFamily: 'Prod-bold',
            whiteSpace: 'nowrap'
          }}
        >
          Blog
        </p>
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
