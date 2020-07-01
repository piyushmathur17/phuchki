import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Cart from './components/Cart'
import Payment from './components/payment'
class App extends Component {
  
  constructor(props){
    super(props);
    this.state={
      items:[],
      isLoading:true,
      cartItems:[],
      total: 0,
      pincodes:[]
    }
    this.handleUpdate=this.handleUpdate.bind(this)
  }
  componentDidMount(){
    fetch('http://phuchki.in/v1/getItemDetails/')
    .then(response => response.json())
    .then(json => {
      //console.log(json.data)
      this.setState({
      items: json.data,
      isLoading: false
    })
    
    
  })
  fetch('http://phuchki.in/v1/getAvailablePincodes/')
    .then(response => response.json())
    .then(json => {
      //console.log(json)
      this.setState({
      pincodes: json.data
    })
    
    
  }).catch(error=>console.log(error))
  
}
  handleUpdate=(newCartItems,newTotal)=>{
    //console.log(newCartItems);
    //console.log(newTotal);
    this.setState({
     cartItems: newCartItems,
     total: newTotal
    });
    //console.log(this.cartItems);
    //console.log(this.total);
  }
  render() {
    //console.log('rendering app');
    //console.log(this.state);
    
    //const store = createStore(cartReducer);
    return (
       <BrowserRouter  >
            <div className="App">
              <Navbar/>
                <Switch>
                    <Route exact path="/" component={()=><Home handleUpdate={this.handleUpdate} data={this.state}/>}/>
                    <Route path="/cart" component={()=><Cart handleUpdate={this.handleUpdate} data={this.state}/>}/>
                    
                  </Switch>
             </div>
       </BrowserRouter>
      
      
    );
  }

  
}


export default App;
