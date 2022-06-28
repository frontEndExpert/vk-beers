import React,{useState, useEffect} from 'react';
import styles from './GetBears.module.scss'
import rightArrow from '../images/arrow-right.jpg'
import leftArrow from '../images/arrow-left.jpg'
import fav1 from '../images/fav1.png'
import fav2 from '../images/fav2.png'
import { connect, useDispatch, useSelector } from 'react-redux';
import {updateCurrentPage,updateFavoritesSet, updateBeerFavorite, updateCurrentBeer, updateShowModal} from "../store/reducers/beers"

const BeersMenu = (props) => {

const currentPage = useSelector(state => state.currentPage)
const showFav = useSelector( state => state.showFav)
const favoritesArr = useSelector( state => state.favoritesArr)
const searchedArr = useSelector( state => state.searchedArr)
const search = useSelector( state => state.search)
const beersArr = useSelector( state => state.beersArr)
var currentBeersArr = showFav ? favoritesArr : search ? searchedArr : beersArr
const favoritesSet = useSelector( state => state.favoritesSet)
const dispatch = useDispatch()




useEffect(() => {
    currentBeersArr = showFav ? favoritesArr : search ? searchedArr : beersArr
},[showFav, search])

useEffect(() => {
    dispatch(updateFavoritesSet(favoritesSet))
},[favoritesSet])

const openCard = (id) => {
    const beersTemp = currentBeersArr.filter(beer => beer.id === id)
    dispatch(updateCurrentBeer(beersTemp))
    dispatch(updateShowModal(true))
  }

const previous = () => {
    if( currentPage > 1){
        dispatch(updateCurrentPage(currentPage-1))
    }
  }
  
const next20 = () => {
    if(currentPage<100){
        dispatch(updateCurrentPage(currentPage+1))
    }
}

const setFav = (id) => {
        var favArr = null;
    if(favoritesSet && favoritesSet.includes(id)){
        favArr = favoritesSet.filter(item => item !== id);
    }else{
        favArr = favoritesSet ? [...favoritesSet] : [];  
        favArr.push(id);
    }
    dispatch(updateBeerFavorite(id));
    dispatch(updateFavoritesSet(favArr));
}

const removeAll = () => {
    if (window.confirm("Are you sure you want to empty your favorites beers list? !") == true) {
        favoritesSet.forEach(id => {
            dispatch(updateBeerFavorite(id));
            dispatch(updateFavoritesSet([]));
        })

    }
}

    
    return (<div className="cards-container" >
        { showFav && currentBeersArr && currentBeersArr.length > 0 && <button onClick={removeAll} className={styles.remove} >Remove All!</button>  }
        <div className={styles.beerscards}>
        { !(showFav || search) && <button className={styles.white} onClick={previous} >
          <img src={leftArrow} width='20px' height='20px' alt="previous"  /></button>}

        {(currentBeersArr && currentBeersArr.length > 0) ? currentBeersArr.map( beer => 
        <div 
            className={styles.beerCard} 
            key={beer.id} 
        >
        <p className={styles.header}>{ beer.name.includes(":") ? beer.tagline : beer.name }</p>
        
        <img src={ beer.favorite ? fav2 : fav1} width="25px" height="25px" 
                className={styles.favorite} 
                onClick={()=>setFav(beer.id)}
                alt={beer.name} 
            />
        
        <img src={beer.image_url} width="50px" 
            alt={beer.name} 
            className={styles.beer}
            onClick={()=> openCard(beer.id)}
            />
            
        </div>) 
        :  showFav ? <p>"No Favorites Beers. Please go back and select some." </p>
        : search ? <p>"No beers pair to this food search Please change your food search criteria"</p>
        : <p>Error! Please try again</p>
    }

        { (!showFav && !search) && <button className={styles.white} onClick={next20} >
          <img  src={rightArrow} width='20px' height='20px' alt="Next"  /></button>}
    </div>
    </div>)
}

export default connect(state => state )(BeersMenu); 