import React ,{useState, useEffect} from 'react';
import GetBeers from './GetBeers'
import { updateShowFav, updateSearch } from '../store/reducers/beers'
import { connect, useDispatch, useSelector } from 'react-redux';

const ShowSearch = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(updateSearch(true))
        dispatch(updateShowFav(false))
    },[])


    return <GetBeers />
}
export default ShowSearch