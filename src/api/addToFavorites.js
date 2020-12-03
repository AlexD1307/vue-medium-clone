import axios from '@/api/axios'

const getUrl = slug => `/articles/${slug}/favorite`

const addToFavorites = slug =>
  axios.post(getUrl(slug)).then(response => response.data.article)

const removeFormFavorites = slug =>
  axios.post(getUrl(slug)).then(response => response.data.article)

export default {addToFavorites, removeFormFavorites}
