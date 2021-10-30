/**
 * @type {import('@/types').BlogConfig}
 */
const BLOG = {
  title: 'wizyoung',
  author: 'wizyoung',
  email: 'happyyanghehe@gmail.com',
  link: 'https://wizyoung.dogcraft.xyz',
  description: '',
  lang: 'en-US', // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES']
  appearance: 'dark', // ['light', 'dark', 'auto'],
  font: 'sans-serif', // ['sans-serif', 'serif']
  lightBackground: '#ffffff', // use hex value, don't forget '#' e.g #fffefc
  darkBackground: '#090719', // use hex value, don't forget '#'
  path: '', // leave this empty unless you want to deploy Nobelium in a folder
  profileSlug: 'profile',
  since: 2021, // If leave this empty, current year will be used.
  postsPerPage: 7,
  sortByDate: true,
  showAbout: true,
  showArchive: true,
  autoCollapsedNavBar: false, // The automatically collapsed navigation bar
  ogImageGenerateURL: 'https://zh-simple-og-image.vercel.app', // The link to generate OG image, don't end with a slash
  // https://simple-og-image.vercel.app
  // https://og-image-craigary.vercel.app
  // detail: https://github.com/yokinist/og-image/blob/main/api/_lib/types.ts#L2-L12
  socialLink: 'https://github.com/wizyoung',
  seo: {
    keywords: ['wizyoung', 'blog'],
    googleSiteVerification: 'Z2DD4cXMxpNvkYGQhL3XKfDvtyfV-1iDPm59Rhifb-Q' // Remove the value or replace it with your own google site verification code
  },
  notionPageId: process.env.NOTION_PAGE_ID, // DO NOT CHANGE THIS！！！
  notionAccessToken: process.env.NOTION_ACCESS_TOKEN, // Useful if you prefer not to make your database public
  analytics: {
    provider: 'ga', // Currently we support Google Analytics and Ackee, please fill with 'ga' or 'ackee', leave it empty to disable it.
    ackeeConfig: {
      tracker: '', // e.g 'https://ackee.craigary.net/tracker.js'
      dataAckeeServer: '', // e.g https://ackee.craigary.net , don't end with a slash
      domainId: '' // e.g '0e2257a8-54d4-4847-91a1-0311ea48cc7b'
    },
    gaConfig: {
      measurementId: 'G-Y5JCEXHW7J' // e.g: G-XXXXXXXXXX
    }
  },
  comment: {
    // support provider: gitalk, utterances, cusdis
    provider: 'utterances', // leave it empty if you don't need any comment plugin
    gitalkConfig: {
      repo: '', // The repository of store comments
      owner: '',
      clientID: '',
      clientSecret: '',
      admin: [],
      id: '', // Ensure uniqueness and length less than 50
      distractionFreeMode: false
    },
    utterancesConfig: {
      repo: 'wizyoung/utterances'
    },
    cusdisConfig: {
      appId: '', // data-app-id'
      host: '', // data-host, change this if you're using self-hosted version
      scriptSrc: '' // change this if you're using self-hosted version
    }
  },
  isProd: process.env.VERCEL_ENV === 'production' // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
}
// export default BLOG
module.exports = BLOG
