import linksConfig from '@/config/links.config'

export function getFriendLinks() {
  const hostname = window.location.hostname.replace(/^www\./, '')
  const matchKey = Object.keys(linksConfig).find(key => {
    if (key === '*') return false
    return hostname === key || hostname.endsWith('.' + key)
  })
  return linksConfig[matchKey] || linksConfig['*'] || []
}
