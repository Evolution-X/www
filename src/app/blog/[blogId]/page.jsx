import { getBlogData } from '../../../lib/dataService'
import BlogDetailClientPage from './_client/BlogDetailClientPage'
import BlogNotFoundClientPage from './_client/BlogNotFoundClientPage'
import { SITE } from '../../../constants'

export async function generateMetadata({ params }) {
  const { blogId } = params
  const { data: blogPost } = await getBlogData(blogId)

  const blogUrl = `${SITE}/blog/${blogId}`

  if (!blogPost) {
    const notFoundTitle = 'Blog Post Not Found - Evolution X Blog'
    const notFoundDescription =
      'The requested blog post was not found. Please check the URL or browse our other posts.'

    return {
      title: notFoundTitle,
      description: notFoundDescription,
      openGraph: {
        title: notFoundTitle,
        description: notFoundDescription,
        url: blogUrl,
        siteName: 'Evolution X Blog',
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

  const title = blogPost.title
  const description = blogPost.content
    ? blogPost.content.substring(0, 155) + '...'
    : `Read the latest update from Evolution X Blog: ${title}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: blogUrl,
      siteName: 'Evolution X Blog',
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

export default async function SingleBlogPage({ params }) {
  const { blogId } = params

  const { data: blogPost, error } = await getBlogData(blogId)

  if (error) {
    console.error(`Error fetching blog post ${blogId}:`, error)
    return (
      <div className='flex min-h-screen items-center justify-center bg-[#0f172a] text-white'>
        <p className='text-center text-xl text-red-500'>
          Error loading blog post: {error.message}
        </p>
      </div>
    )
  }

  if (!blogPost) {
    const { blogsList: allBlogIdsData } = await getBlogData()
    const allBlogIds = allBlogIdsData
      ? allBlogIdsData.map((blog) => blog.blogId)
      : []

    return <BlogNotFoundClientPage blogId={blogId} allBlogIds={allBlogIds} />
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blogPost.title,
    datePublished: blogPost.date,
    dateModified: blogPost.date,
    author: {
      '@type': 'Person',
      name: blogPost.author,
      url: `https://github.com/${blogPost.github}`
    },
    url: `${SITE}/blog/${blogId}`,
    description: '',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE}/blog/${blogId}`
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
      <BlogDetailClientPage blogPost={blogPost} />
    </>
  )
}

export async function generateStaticParams() {
  const { blogsList } = await getBlogData()

  return blogsList.map((blog) => ({
    blogId: blog.blogId.toString()
  }))
}
