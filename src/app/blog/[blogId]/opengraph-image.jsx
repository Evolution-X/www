import { ImageResponse } from 'next/og'
import { SITE } from '../../../constants'
import { getBlogData } from '../../../lib/dataService'

export const contentType = 'image/png'

export default async function Image({ params }) {
  const { blogId } = params

  const { data: blogPost } = await getBlogData(blogId)

  const outerPadding = 40
  const calculatedContentBoxWidth = 1200 - outerPadding * 2

  const [prodBoldFontData, prodNormalFontData, prodLightFontData] =
    await Promise.all([
      fetch(new URL('/fonts/ProductSans-Bold.woff', SITE)).then((res) =>
        res.arrayBuffer()
      ),
      fetch(new URL('/fonts/ProductSans-Regular.woff', SITE)).then((res) =>
        res.arrayBuffer()
      ),
      fetch(new URL('/fonts/ProductSans-Light.woff', SITE)).then((res) =>
        res.arrayBuffer()
      )
    ])

  let displayTitle = 'Blog Not Found'
  let displayAuthor = 'The Evolution X Team'
  let displayDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })


  let displayContent =
    'The requested blog post was not found. Please check the URL or browse our other posts.'
  let borderColor = 'red'
  let titleColor = 'rgb(255, 0, 0)'

  if (blogPost) {
    displayTitle = blogPost.title
    displayAuthor = blogPost.author
    displayDate = new Date(blogPost.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    displayContent = blogPost.content
    borderColor = '#0060ff'
    titleColor = 'rgb(0, 96, 255)'
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
          padding: `${outerPadding}px`,
          boxSizing: 'border-box'
        }}
      >
        <img
          width='495'
          height='85'
          src={`${SITE}/evolution.svg`}
          style={{
            marginBottom: '40px',
            marginTop: '10px'
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            borderRadius: '24px',
            border: `2px solid ${borderColor}`,
            background: '#0f172a',
            padding: '40px',
            width: `${calculatedContentBoxWidth}px`,
            height: 'auto',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            boxSizing: 'border-box'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              fontSize: 24,
              color: 'white',
              fontFamily: 'Prod-Normal',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <p style={{ margin: 0 }}>{displayDate}&nbsp; •&nbsp;&nbsp;</p>
            <p style={{ margin: 0, fontFamily: 'Prod-Light' }}>
              Author: {displayAuthor}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '100%'
            }}
          >
            <p
              style={{
                margin: '0',
                fontSize: 56,
                fontWeight: 'bold',
                lineHeight: 1.1,
                color: titleColor,
                whiteSpace: 'pre-wrap',
                fontFamily: 'Prod-bold',
                wordBreak: 'break-word',
                maxWidth: '100%'
              }}
            >
              {displayTitle}
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '100%'
            }}
          >
            <p
              style={{
                margin: '0',
                fontSize: 28,
                color: 'white',
                lineHeight: 1.4,
                fontFamily: 'Prod-Normal',
                paddingLeft: '8px',
                paddingRight: '8px',
                wordBreak: 'break-word',
                maxWidth: '100%'
              }}
            >
              {displayContent}
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
        },
        {
          name: 'Prod-Light',
          data: prodLightFontData,
          style: 'normal',
          weight: 300
        }
      ]
    }
  )
}
