import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";


export const fetchBeers = createAsyncThunk(
    'beers/fetchBeers',
    async (currentPage, thunkAPI) => {
        try {
            var beerUrl = 'https://api.punkapi.com/v2/beers?page=' + currentPage + '&per_page=12'
            const response  = await  fetch(beerUrl, {muteHttpExceptions: true})
            .then( data => data.json()
            )
            return response
        } catch( err) {
            if(!err.response){
                throw err;
            }
            return isRejectedWithValue(err.response.data);
        }
    })

    export const fetchBeersByFood = createAsyncThunk(
        'beers/searchByFood',
        async (food, thunkAPI) => {
            try {
                var beerUrl = encodeURI('https://api.punkapi.com/v2/beers?food=' + food)
                const response  = await  fetch(beerUrl, {muteHttpExceptions: true})
                    .then( data => data.json())
                return response
            } catch( err) {
                if(!err.response){
                    throw err;
                }
                return isRejectedWithValue(err.response.data);
            }
        })

    export const fetchFavoritesBeers = createAsyncThunk(
        'beers/fetchFavorites',
        async (ids, thunkAPI) => {
            try {
                var beerUrl = 'https://api.punkapi.com/v2/beers?ids=' + ids;
                const response  = await  fetch(beerUrl, {muteHttpExceptions: true})
                .then( data => data.json()
                    )
            return response
            } catch( err) {
                if(!err.response){
                    throw err;
                }
                return isRejectedWithValue(err.response.data);
            }
        })

        
           

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

  const beersSlice = createSlice({
        name: "beers",
        initialState,
        reducers: {
            updateShowFav: ( state, action ) => {
                 state.showFav = action.payload ;
            },
            updateFavoritesSet: ( state, action ) => {
                    state.favoritesSet = action.payload ;
            },
            updateBeerFavorite: ( state, action ) => {
                var id = action.payload;
                //update the beers array: state.beersArr
                var beersTemp = state.searchedArr 
                beersTemp.length && beersTemp.forEach((beer)=>{
                    if(beer.id === id){ beer.favorite = !beer.favorite;}
                })
                state.searchedArr = beersTemp;

                beersTemp = state.beersArr 
                beersTemp.length && beersTemp.forEach((beer)=>{
                    if(beer.id === id){ beer.favorite = !beer.favorite;}
                })
                state.beersArr = beersTemp;
            },
            updateCurrentPage: ( state, action) => {
                state.currentPage = action.payload ;
            },
            updateShowModal: ( state, action ) => {
                state.showModal = action.payload ;
            },
            updateCurrentBeer: ( state, action ) => {
                state.currentBeer = action.payload ;
            },
            updateSearch: ( state, action ) => {
                state.search = action.payload;
            },
            updateSearchTitle: ( state, action ) => {
                state.searchTitle = action.payload;
            }


        },
        extraReducers: {
            [fetchBeers.pending]: (state) => {
                state.beers_loading = true;
            },
            [fetchBeers.fulfilled]: (state, action) => {
                const tempArr = action.payload;
                if(state.favoritesSet && state.favoritesSet.length > 0){
                    tempArr.forEach(beer=> {
                        if(state.favoritesSet.includes(beer.id)){
                            beer.favorite=true;
                        }
                    })
                 }
                state.beersArr = [...tempArr];
                state.beers_loading = false;
            },
            [fetchFavoritesBeers.fulfilled]: (state, action) => {
                const tempArr = action.payload;
                if(state.favoritesSet && state.favoritesSet.length > 0){
                    tempArr.forEach(beer=> {
                        if(state.favoritesSet.includes(beer.id)){
                            beer.favorite=true;
                        }
                    })
                 }
                state.favoritesArr = [...tempArr];
                state.loading = false;
            },
            [fetchBeersByFood.fulfilled]: (state, action) => {
                const tempArr = action.payload;

                if(tempArr && tempArr.length > 0){
                    if(state.favoritesSet && state.favoritesSet.length > 0){
                        tempArr.forEach(beer=> {
                            if(state.favoritesSet.includes(beer.id)){
                                beer.favorite=true;
                            }
                        })
                     }
                    state.searchedArr = [...tempArr];
                }
                state.loading = false;
            }
        },
  });


export const { updateSearchTitle, updateSearch, updateShowFav, updateFavoritesSet, updateBeerFavorite, updateCurrentPage, updateCurrentBeer, updateShowModal } =  beersSlice.actions;

export default beersSlice.reducer;
