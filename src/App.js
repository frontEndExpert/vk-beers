import React,{useState, useEffect, useRef, useCallback} from 'react';
import './App.scss';
import ShowBeers from './components/GetBeers';
import ShowSearch from './components/ShowSearch';
import Modal from './components/Modal';
import BearInfo from './components/BeerInfo'
import ShowFavorites from './components/ShowFavorites'
import fav1 from './images/fav1.png'
import fav2 from './images/fav2.png'
import { fetchBeers, fetchFavoritesBeers, updateShowFav, updateShowModal, 
  fetchBeersByFood, updateSearch, updateSearchTitle } from './store/reducers/beers';
import { connect, useDispatch, useSelector} from 'react-redux'
import {  Routes,  Route,  NavLink, useNavigate} from "react-router-dom";


function App() {
    
  const [searchTitle, setSearchTitle] = useState(null)
  const search = useSelector( state => state.search)
    const showFav = useSelector( state => state.showFav)
    const showModal = useSelector( state => state.showModal)
    const currentPage = useSelector( state => state.currentPage)
    const currentBeer = useSelector( state => state.currentBeer)
    const favoritesArr = useSelector( state => state.favoritesArr)
    const searchedArr = useSelector( state => state.searchedArr)
    const beersArr = useSelector( state => state.beersArr)
    const favoritesSet = useSelector( state => state.favoritesSet)
    const dispatch = useDispatch();
    

useEffect(() => {
  dispatch(fetchBeers(1))
},[])

useEffect(() => {
  dispatch(fetchBeers(currentPage))
},[currentPage])



useEffect(() => {
  if(showFav ){
    var ids = favoritesSet && favoritesSet.map(id => id + "|").join("")
    dispatch(fetchFavoritesBeers(ids))

  }
},[showFav,favoritesSet])


useEffect(() => {
  if(search){
    dispatch(fetchBeersByFood(searchTitle))
  }
},[search, searchTitle])



const closedModal = () => {
  dispatch(updateShowModal(false ))
}

const handleSearchChange = (event) => {
  event.preventDefault()
  var title = event.target.value
  setSearchTitle(title);
  dispatch(updateSearch(false))

}

const navigate = useNavigate();

const handleSubmit = (event) => {
  event.preventDefault()
  var title = event.target.value
  console.log(title)
  dispatch(updateSearchTitle(title));
  dispatch(updateSearch(true));
  
  navigate('/searchBeer', {replace: true});
}

const handleSearchEnter = (event) => {
  event.preventDefault()
  var title = event.target.value
  dispatch(updateSearchTitle(title));
  dispatch(updateSearch(true))
}

const showFavorites = () => {
  dispatch(updateShowFav(!showFav))
}

const browseBeers = () => {
  dispatch(updateShowFav(false))
  dispatch(updateSearch(false))
}

  return (
    <div className="beersList">
      <Modal className="modalContainer"  show={showModal} modalClosed={closedModal}>
        <button
              className="btn btn-close"
              onClick={closedModal}
            >X</button>
        <BearInfo  currentBeer={currentBeer}/>
      </Modal >
      <div className="layout" >
          <nav>
            <ul id="navbar" className="nav">
               <li>
                  <NavLink to="/" onClick={browseBeers} 
                    className={({ isActive }) => (isActive ? 'btn browseBeers active' : 'btn browseBeers')}
                    >Browse Beers
                  </NavLink>
               </li>
               <li className="btn search" >
                
                    <input className="searchinput" autoFocus
                        type="search"  
                        id="search" 
                        placeholder="Enter Your Search Term" 
                        onChange={handleSearchChange}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearchEnter(e)}
                        value={searchTitle || ""}
                    />
                    <button onClick={handleSubmit}> Search</button>
               </li>
               <li>
                  <NavLink to="/favoriteBeers" onClick={showFavorites} 
                  className={({ isActive }) => (isActive ? 'btn fav show-favorites active' : 'btn fav show-favorites')}
                  >Favorite Beers <img src={showFav ? fav2 : fav1} 
                    alt="select Favorites" /></NavLink>
               </li>
            </ul>
          </nav>
          <Routes>
              <Route path="/" element={<ShowBeers />} />
              <Route path="/searchBeer" element={<ShowSearch />} />
              <Route path="/favoriteBeers" element={<ShowFavorites />} />
          </Routes>
      </div>
    </div>
  );
}

export default connect(state => state)(App);
