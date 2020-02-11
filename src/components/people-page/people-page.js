import React, {Component} from "react"

import './people-page.css'

import ItemList from '../item-list'
import ItemDetails from '../item-details'
import swapiService from '../../services/swapi-service'
import Row from "../row"
import ErrorBoundry from '../error-boundry'


export default class PeoplePage extends Component {

    swapiService = new swapiService();

    state = {
        selectedPerson:3,
    }



    onPersonSelected = (id) => {
        this.setState({
            selectedPerson:id
        })
    }

    render(){
        const itemList = (
            <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}
        renderItem = {(i) => (`${i.name}`)}
        />) ,        
            personDetails = (
                <ItemDetails itemId = {this.state.selectedPerson}/>
            );
        return (
            <ErrorBoundry>
            <Row left={itemList} right={personDetails}/>
            </ErrorBoundry>
        )
    }
}

