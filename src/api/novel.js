import request from './request'

export const getNovelCategories = () => request.get('/novel/category')
export const getNovels = (params = {}) => request.get('/novel', { params })
export const getNovelContent = (id) => request.get(`/novel/read/${id}`)

// 小说阅读页使用的章节接口
export const getNovelChapter = (id) => request.get(`/novel/read/${id}`)
