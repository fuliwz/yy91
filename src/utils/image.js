// src/utils/image.js
const CDN_DOMAIN=""
const API_DOMAIN=""
const FALLBACK="/fallback.jpg"
export function getImage(url){if(!url)return FALLBACK;url=String(url).trim();if(url.startsWith("https://"))return url;if(url.startsWith("http://"))return "https://"+url.replace("http://","");if(url.startsWith("http"))return url;if(url.startsWith("/"))return(CDN_DOMAIN||API_DOMAIN||window.location.origin)+url;return(CDN_DOMAIN||API_DOMAIN||window.location.origin+"/")+url}
export function onImgError(e){e.target.src=FALLBACK}
export function lazyPlaceholder(){return"data:image/svg+xml;base64,PHN2Zy8+"}
