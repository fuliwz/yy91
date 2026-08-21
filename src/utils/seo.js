const SITE_NAME = 'YY91'

export function setSEO({ title = '', description = '' } = {}) {
  document.title = title ? `${title} - ${SITE_NAME}` : SITE_NAME

  let meta = document.querySelector('meta[name="description"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.name = 'description'
    document.head.appendChild(meta)
  }

  meta.content = description
}

export function setCanonical(url = window.location.href) {
  let link = document.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = url
}
