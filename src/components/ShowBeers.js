import React ,{useState, useEffect} from 'react';
import GetBeers from './GetBeers'
import { updateShowFav } from '../store/reducers/beers'
import { connect, useDispatch, useSelector } from 'react-redux';


const ShowBeers = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateSearch(false))
        dispatch(updateShowFav(false))
    },[])

    return <GetBeers />
}
export default ShowBeers