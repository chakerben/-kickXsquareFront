const axios = require("axios")

const API = "https://xwcj-gm1t-djcw.m2.xano.io/api:2JHnrLvS"
const getImage360 = async id => {
  try {
    const result = await axios.get(`${API}/sneaker_360?sneaker_ref_id=${id}`)
    return result.data
  } catch (e) {
    console.error(e)
    return {}
  }
}
const getBrand = async () => {
  try {
    const result = await axios.get(`${API}/brand`)
    return result.data
  } catch (e) {
    console.error(e)
    return {}
  }
}
const getMostPopularSneakers = async () => {
  try {
    const result = await axios.get(
      `${API}/sneaker_ref?rating=3&recently_viewed=false`
    )
    return result.data
  } catch (e) {
    console.error(e)
    return {}
  }
}
const getSneakersByBrand = async id => {
  try {
    const result = await axios.get(`${API}/sneaker_ref?brand_id=${id}`)
    return result.data
  } catch (e) {
    console.error(e)
    return {}
  }
}
const getRecentlyViewed = async () => {
  try {
    const result = await axios.get(`${API}/recently_viewed`)
    return result.data
  } catch (e) {
    console.error(e)
    return {}
  }
}
const getItem = async ref => {
  try {
    const result = await axios.get(`${API}/sneaker_ref/${ref}`)
    return result.data
  } catch (e) {
    console.error(e)
    return {}
  }
}
const getListSneakers = async () => {
  try {
    const result = await axios.get(`${API}/sneaker_ref`)
    return result.data
  } catch (e) {
    console.error(e)
    return {}
  }
}
const getListSize = async () => {
  try {
    const result = await axios.get(`${API}/size`)
    return result.data
  } catch (e) {
    console.error(e)
    return {}
  }
}
const getSize = async (id ) => {
  try {
    const result = await axios.get(`${API}/size/${id}`)
    return result.data
  } catch (e) {
    console.error(e)
    return {}
  }
}
module.exports = {
  getImage360,
  getBrand,
  getMostPopularSneakers,
  getItem,
  getRecentlyViewed,
  getSize,
  getSneakersByBrand,
  getListSneakers,
  getImage360,
  getListSize
}
