//import { applyMiddleware } from 'redux'
import { configureStore } from "@reduxjs/toolkit";
import beersReducer from './reducers/beers'

const initialState = {
    beersArr: {
          "id": 0,
          "name": "",
          "tagline": "",
          "first_brewed": "",
          "description": "",
          "image_url": "",
          "abv": 0,
          "ibu": 0,
          "target_fg": 0,
          "target_og": 0,
          "ebc": 0,
          "srm": 0,
          "ph": 0,
          "attenuation_level": 0,
          "volume": {
              "value": 0,
              "unit": "litres"
          },
          "boil_volume": {
              "value": 0,
              "unit": "litres"
          },
          "method": {
              "mash_temp": [
                  {
                      "temp": {
                          "value": 0,
                          "unit": "celsius"
                      },
                      "duration": 0
                  }
              ],
              "fermentation": {
                  "temp": {
                      "value": 0,
                      "unit": "celsius"
                  }
              },
              "twist": null
          },
          "ingredients": {
              "malt": [
                  {
                      "name": "",
                      "amount": {
                          "value": 0,
                          "unit": "kilograms"
                      }
                  }
              ],
              "hops": [
                  {
                      "name": "",
                      "amount": {
                          "value": 0,
                          "unit": "grams"
                          },
                      "add": "",
                      "attribute": ""
                  }
              ],
              "yeast": ""
          },
          "food_pairing": [""],
          "brewers_tips": "",
          "contributed_by": "",
          "favorite": false
      },
    searchedArr: {},
    favoritesArr: {},
    beers_loading: false,
    loading: false,
    favoritesSet: null,
    showFav: false,
    currentPage: 1,
    showModal: false,
    currentBeer: {},
    search: false,
    searchTitle: ""
  };

  const store = configureStore({
    reducer: beersReducer,
    middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware({serializableCheck: false}),
    initialState,
  });
  
  export default store;

