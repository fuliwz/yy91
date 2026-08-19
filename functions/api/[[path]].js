export async function onRequest(context) {
  const url = new URL(context.request.url);

  const target =
    'https://api.souavzyw.net/' +
    url.pathname.replace('/api/', '') +
    url.search;

  const cacheKey = new Request(target, context.request);
  const cache = caches.default;

  // 🔥 1. 先查 Cloudflare Edge 缓存
  let response = await cache.match(cacheKey);
  if (response) {
    return response;
  }

  // 🔥 2. 请求源站
  const resp = await fetch(target, {
    headers: {
      'User-Agent': 'Mozilla/5.0'
    }
  });

  const text = await resp.text();

  // 🔥 3. 构建缓存响应
  response = new Response(text, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',

      // ⭐ 关键：让 CF 缓存
      'Cache-Control': 'public, max-age=600'
    }
  });

  // 🔥 4. 写入 Edge Cache
  context.waitUntil(cache.put(cacheKey, response.clone()));

  return response;
}
