import React,{Component} from 'react';
import './app.css'

import Header from '../header';
import RandomPlanet from '../random-planet'

import PeoplePage from '../people-page'
import ItemList from '../item-list'
import ItemDetails, { Record } from '../item-details'
import swapiService from '../../services/swapi-service'
import Row from '../row'

export default class App extends Component{

    swapiService = new swapiService();

    state = {
        showRandomPlanet : true,
        selectedPerson:3
    }

    toggleRandomPlanet = () =>{
        this.setState(prevState => ({
            showRandomPlanet:!prevState.showRandomPlanet
        }))
        console.log(this.state)
    }
    
    onPersonSelected = (id) =>{
        this.setState({
            selectedPerson:id
        })

    }

    render(){
        
        const   { showRandomPlanet : show} = this.state,
                planet = show ? <RandomPlanet/> : null,
                {getPerson,getStarShip,getStarShipImage,getPersonImage} = this.swapiService,
                people = <ItemDetails itemId={11}
                            getData = {getPerson}
                            getImgUrl={getPersonImage}
                        >
                            <Record field='gender' label='Gender'/>
                            <Record field='eyeColor' label='Eye Color'/>
                        </ItemDetails>
                ,
                starship = <ItemDetails itemId={5}
                            getData = {getStarShip}
                            getImgUrl={getStarShipImage}
                            >
                            <Record field='model' label='Model'/>
                            <Record field='length' label='Length'/>
                            <Record field='crew' label='Crew'/>
                </ItemDetails>;

        return(
            <div className="m-5">
                <Header/>
                {/* {planet}
                <button className="btn btn-warning mb-4" onClick={this.toggleRandomPlanet}>Toggle Random Planet</button>
                <PeoplePage/> */}
                <Row
                    left={people}
                    right={starship}
                />
            </div>
        )
    }
}
