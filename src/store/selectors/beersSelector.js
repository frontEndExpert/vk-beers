

const BeersArrSelector = (state) => {
    return state?.beers?.BeersArr || null
  }
export default BeersArrSelector


export const searchedArrSelector = (state) => {
    return state?.beers?.searchedArr || null
  }  

export const favoritesArrSelector = (state) => {
    return state?.beers?.favoritesArr || null
  }  

export const favoriteBeersSelector = (state) => {
    return state?.beers?.favoritesSet || null
  }
