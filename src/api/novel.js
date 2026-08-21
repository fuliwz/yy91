import request from './request'

export const getNovelCategories = () => request.get('/novel/category')
export const getNovels = (params = {}) => request.get('/novel', { params })
export const getNovelContent = (id) => request.get(`/novel/read/${id}`)
