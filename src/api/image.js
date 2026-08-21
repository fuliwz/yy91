import request from './request'

export const getImageCategories = () => request.get('/image/category')
export const getImages = (params = {}) => request.get('/image', { params })
export const getImageDetail = (id) => request.get(`/image/${id}`)
