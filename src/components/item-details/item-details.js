import React,{Component} from 'react'

import './item-details.css'

import SwapiService from '../../services/swapi-service'
import Spinner from '../spinner'

const Record = ({item,field,label}) => {
    return(
        <li className='list-group-item'>
            <span className='term'>{label}</span>
            <span>{item[field]}</span>
        </li>
    );
};

export {
    Record
};

export default class ItemDetails extends Component {

    swapiService = new SwapiService();

    state = {
        item : null,
        image: null,
        loading:true
    }

    componentDidMount(){
        this.updateItem()
    }

    updateItem(){
        const {itemId, getData, getImgUrl} = this.props;

        this.setState({
            loading:true
        })
        
        if(!itemId){
            return;
        }
        getData(itemId).then((item) =>{
            this.setState({
                item,
                image:getImgUrl(item),
                loading:false
            })
        })
    }

    componentDidUpdate(prevProps){
        if(this.props.itemId !== prevProps.itemId){
            this.updateItem()
        }
    }

    render(){

        const {loading,item, image} = this.state,
              hasData = !loading,
              spinner = loading ? <Spinner/> : null,
              content = hasData ? <PersonView item={item} image={image} 
                                                list={
                                                    React.Children.map(this.props.children, (child) => {
                                                        return React.cloneElement(child, {item});
                                                    })
                                                    }

                                                /> : null

        if(!this.state.item){
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

const PersonView = ({item,image,list}) =>{

    const  {id,name,gender,birthYear,eyeColor} = item
    return(
        <React.Fragment>
                <img className='person-img' alt="name"
                    src={image}
                />
                <div className='card-body'>
                    <h4>{name}</h4>
                    <ul className='list-group list-group-flush'>
                        {list}
                    </ul>
                </div>
        </React.Fragment>
    )
}