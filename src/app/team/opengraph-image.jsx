import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { SITE } from '../../constants'
import { permanentRedirect } from 'next/navigation'

export const contentType = 'image/png'

export default async function Image() {
  if (process.env.NODE_ENV === 'production') {
    permanentRedirect(`${SITE}/team.png`)
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
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: '#040214',
          color: 'white',
          padding: '40px',
          boxSizing: 'border-box',
          textAlign: 'center'
        }}
      >
        <img
          width='495'
          height='85'
          src={`${SITE}/evolution.svg`}
          style={{ marginBottom: '40px', marginTop: '10px' }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
            width: '100%',
            maxWidth: '900px'
          }}
        >
          <div
            style={{
              flexGrow: 1,
              borderTop: '2px solid #0060ff',
              display: 'block'
            }}
          />
          <h2
            style={{
              margin: '0 20px',
              whiteSpace: 'nowrap',
              background: '#0f172a',
              padding: '0 15px',
              fontSize: '48px',
              color: '#0060ff',
              fontFamily: 'Prod-bold'
            }}
          >
            Founders
          </h2>
          <div
            style={{
              flexGrow: 1,
              borderTop: '2px solid #0060ff',
              display: 'block'
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: '60px',
            width: '100%',
            maxWidth: '1000px'
          }}
        >
          <div
            key={'anierinbliss'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flexShrink: 0,
              width: '200px'
            }}
          >
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '9999px',
                border: '3px solid #0060ff',
                width: '150px',
                height: '150px',
                boxShadow: 'none',
                marginBottom: '15px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <img
                src={`https://avatars.githubusercontent.com/anierinbliss`}
                alt={'Anierin Bliss'}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <h3
              style={{
                margin: '0',
                fontSize: '28px',
                fontWeight: 'bold',
                color: 'white',
                fontFamily: 'Prod-bold',
                lineHeight: '1.2'
              }}
            >
              {'Anierin Bliss'}
            </h3>
            <p
              style={{
                margin: '8px 0 0',
                fontSize: '20px',
                color: '#7eaaff',
                fontFamily: 'Prod-Normal',
                lineHeight: '1.2'
              }}
            >
              {'Co-Founder / Co-Developer'}
            </p>
          </div>

          <div
            key={'joeyhuab'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flexShrink: 0,
              width: '250px'
            }}
          >
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '9999px',
                border: '4px solid #0060ff',
                width: '180px',
                height: '180px',
                boxShadow: '0 0 20px #4da6ff',
                marginBottom: '15px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <img
                src={`https://avatars.githubusercontent.com/joeyhuab`}
                alt={'Joey Huab'}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <h3
              style={{
                margin: '0',
                fontSize: '36px',
                fontWeight: 'bold',
                color: '#4da6ff',
                fontFamily: 'Prod-bold',
                lineHeight: '1.2'
              }}
            >
              {'Joey Huab'}
            </h3>
            <p
              style={{
                margin: '8px 0 0',
                fontSize: '24px',
                color: '#4da6ff',
                fontFamily: 'Prod-Normal',
                lineHeight: '1.2'
              }}
            >
              {'Founder / Lead Developer'}
            </p>
          </div>

          <div
            key={'RealAkito'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flexShrink: 0,
              width: '200px'
            }}
          >
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '9999px',
                border: '3px solid #0060ff',
                width: '150px',
                height: '150px',
                boxShadow: 'none',
                marginBottom: '15px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <img
                src={`https://avatars.githubusercontent.com/RealAkito`}
                alt={'Akito Mizukito'}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <h3
              style={{
                margin: '0',
                fontSize: '28px',
                fontWeight: 'bold',
                color: 'white',
                fontFamily: 'Prod-bold',
                lineHeight: '1.2'
              }}
            >
              {'Akito Mizukito'}
            </h3>
            <p
              style={{
                margin: '8px 0 0',
                fontSize: '20px',
                color: '#7eaaff',
                fontFamily: 'Prod-Normal',
                lineHeight: '1.2'
              }}
            >
              {'Co-Founder / Project Manager'}
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
