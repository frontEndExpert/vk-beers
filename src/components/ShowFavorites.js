import React ,{useState, useEffect} from 'react';
import GetBeers from './GetBeers'
import { updateShowFav, updateSearch } from '../store/reducers/beers'
import { connect, useDispatch, useSelector } from 'react-redux';




const FavoritesBeers = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateShowFav(true))
    },[])

    return <GetBeers />
}
export default FavoritesBeers