import { SITE } from '../constants'

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/'
      }
    ],
    sitemap: `${SITE}/sitemap.xml`
  }
}
