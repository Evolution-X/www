import { ImageResponse } from 'next/og'

export const contentType = 'image/png'

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: '#0060ff',
            zIndex: 0
          }}
        ></div>

        <svg
          width='70%'
          height='70%'
          viewBox='0 0 39 54'
          xmlns='http://www.w3.org/2000/svg'
          style={{
            objectFit: 'contain',
            zIndex: 1,
            filter: 'brightness(0) invert(1)'
          }}
        >
          <path
            d='M37.0867 2H4.60425L13.0256 10.3138H35.4826L37.0867 2Z'
            fill='white'
          />
          <path
            d='M34.2794 20.2111H5.4061L3 28.9208L28.6651 50.695L31.0712 40.7976L17.4366 28.9208H36.6855L34.2794 20.2111Z'
            fill='white'
          />
        </svg>
      </div>
    ),
    {
      width: 180,
      height: 180
    }
  )
}
