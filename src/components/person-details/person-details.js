import React,{Component} from 'react'

import './person-details.css'

import SwapiService from '../../services/swapi-service'
import Spinner from '../spinner'

export default class PersonDetails extends Component {

    swapiService = new SwapiService();

    state = {
        person : null,
        loading:true
    }

    componentDidMount(){
        this.updatePerson()
    }

    updatePerson(){
        const {personId} = this.props;

        this.setState({
            loading:true
        })
        
        if(!personId){
            return;
        }
        this.swapiService.getPerson(personId).then((person) =>{
            this.setState({
                person,
                loading:false
            })
        })
    }

    componentDidUpdate(prevProps){
        if(this.props.personId !== prevProps.personId){
            this.updatePerson()
        }
    }

    render(){

        const {loading,person} = this.state,
              hasData = !loading,
              spinner = loading ? <Spinner/> : null,
              content = hasData ? <PersonView person={person}/> : null

        if(!this.state.person){
            return <span>Select a person from the list</span>
        }

        

        return(
            <div className='person-details card'>
            {spinner}
            {content}
            </div>
        )
    } 
}

const PersonView = ({person}) =>{
    const {id,name,gender,birthYear,eyeColor} = person
    return(
        <React.Fragment>
                <img className='person-img' alt="name"
                    src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                />
                <div className='card-body'>
                    <h4>{name}</h4>
                    <ul className='list-group list-group-flush'>
                        <li className='list-group-item'>
                            <span className='term'>Gender</span>
                            <span>{gender}</span>
                        </li>
                        <li className='list-group-item'>
                            <span className='term'>Birth year</span>
                            <span>{birthYear}</span>
                        </li>
                        <li className='list-group-item'>
                            <span className='term'>Eye Color</span>
                            <span>{eyeColor}</span>
                        </li>
                    </ul>
                </div>
        </React.Fragment>
    )
}