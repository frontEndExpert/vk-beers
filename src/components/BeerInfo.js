import React,{useState, useEffect} from 'react';
import { connect } from 'react-redux';


const BeersInfo = (props) => {

    const [beersObj, setBeersObj] = useState(null)
    
    useEffect(() => {
        setBeersObj(props.currentBeer ? props.currentBeer[0] : null);
    },[props.currentBeer])
    
        return (beersObj && <div className="beerInfo">
            <div className="col col1" key={beersObj.id}>
                <p>ID: {beersObj.id}</p>
                <p>Name: {beersObj.name.includes(":") ? beersObj.tagline : beersObj.name   }</p>
                <p>tagline: {beersObj.tagline}</p>
                <p>description: {beersObj.description}</p>
                <p>{beersObj.name}</p>
                <p>brewers_tips:{beersObj.brewers_tips}</p>
                <p>contributed_by:{beersObj.contributed_by}</p>
                <p>volume:{beersObj.volume.value} {beersObj.volume.unit}</p>
                <p>boil_volume:{beersObj.boil_volume.value} {beersObj.boil_volume.unit}</p>
                <p>food_pairing:</p>
                <ol>{
                beersObj.food_pairing.map(food => <li key={beersObj.id + food}>{food} </li> )
                }</ol>
                <p>target_og:{beersObj.target_og}</p>
            </div>
            <div className="col col2">
                <img src={beersObj.image_url} width="90px" alt={beersObj.name} />
            </div>

</div>)
}

export default connect(state => state)(BeersInfo); 