import { getBlogData } from '../../lib/dataService'
import BlogClientPage from './_client/BlogClientPage'
import { SITE } from '../../constants'

export async function generateMetadata() {
  const title = 'Evolution X Blog'
  const description = 'Official Evolution X Blog!'
  const blogUrl = `${SITE}/blog`

  const isProduction = process.env.NODE_ENV === 'production'
  const ogImageUrl = `${SITE}/blog.png`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: blogUrl,
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

export default async function BlogPage() {
  const { blogsList } = await getBlogData()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Evolution X Blog',
    url: `${SITE}/blog`,
    description: 'Official Evolution X Blog!',
    blogPost: blogsList.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        '@type': 'Person',
        name: post.author,
        url: `https://github.com/${post.github}`
      },
      url: `${SITE}/blog/${post.blogId}`,
      description: '',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SITE}/blog/${post.blogId}`
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
      <BlogClientPage blogsList={blogsList} />
    </>
  )
}
