import React,{Component} from 'react';
import './app.css'

import Header from '../header';
import RandomPlanet from '../random-planet'
import ItemList from '../item-list'
import PersonDetails from '../person-details'

export default class App extends Component{

    state = {
        showRandomPlanet : true,
        selectedPerson: null
    }

    toggleRandomPlanet = () =>{
        this.setState(prevState => ({
            showRandomPlanet:!prevState.showRandomPlanet
        }))
        console.log(this.state)
    }

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson:id
        })
    }

    render(){
        
        const   { showRandomPlanet : show} = this.state,
                planet = show ? <RandomPlanet/> : null;

        return(
            <div>
                <Header/>
                {planet}
                <button className="btn btn-warning mb-4" onClick={this.toggleRandomPlanet}>Toggle Random Planet</button>
                <div className='row mb2'>
                    <div className='col-md-6'>
                        <ItemList onItemSelected = {this.onPersonSelected}/>
                    </div>
                    <div className='col-md-6'>
                        <PersonDetails personId = {this.state.selectedPerson}/>
                    </div>
                </div>
            </div>
        )
    }
}
