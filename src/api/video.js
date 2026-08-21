import request from './request'

export const getVideos = (params = {}) => request.get('/video', { params })
export const getVideoDetail = (id) => request.get(`/video/${id}`)
export const searchVideo = (keyword) => request.get('/search', { params: { keyword } })
export const getPlayUrl = (id) => request.get(`/play/${id}`)
