import { getBlogData, getAllCodenames } from '../lib/dataService'
import { SITE } from '../constants'

export default async function sitemap() {
  const now = new Date()

  const staticRoutes = [
    { path: '/', dynamic: null },
    { path: '/devices', dynamic: 'devices' },
    { path: '/blog', dynamic: 'blog' },
    { path: '/team', dynamic: null }
  ]

  let deviceRoutes = []
  let blogRoutes = []

  try {
    const devices = await getAllCodenames()
    deviceRoutes = devices.map((codename) => ({
      url: `${SITE}/devices/${codename}`,
      lastModified: now
    }))
  } catch (error) {
    console.error('Error fetching devices for sitemap:', error)
  }

  try {
    const { blogsList = [] } = (await getBlogData()) || {}
    blogRoutes = blogsList.map((post) => ({
      url: `${SITE}/blog/${post.blogId}`,
      lastModified: post.updated_at ? new Date(post.updated_at) : now
    }))
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
  }

  const dynamicRoutes = {
    devices: deviceRoutes,
    blog: blogRoutes
  }

  const finalRoutes = []

  for (const { path, dynamic } of staticRoutes) {
    finalRoutes.push({
      url: `${SITE}${path}`,
      lastModified: now
    })

    if (dynamic && dynamicRoutes[dynamic]) {
      finalRoutes.push(...dynamicRoutes[dynamic])
    }
  }

  return finalRoutes
}
