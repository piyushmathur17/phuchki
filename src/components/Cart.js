import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/empty-cart.png'
import Payment from './payment'
import '../index.css';

export default class Cart extends Component{
    constructor(props){
        super(props);
        this.state={
            cartItems: this.props.data.cartItems,
            total: this.props.data.total,
            available_pincodes:this.props.data.pincodes,
            showPayment: false,
            customer_name: '',
            contact: '',
            pincode:'',
            add1:'',
            add2:'',
            emailid:'',
            cartData:{}
        }
        console.log(this)
    }
    
    handleChange=(event)=>{
        console.log(event.target.id," : ",event.target.value)
        this.setState({
            [event.target.id]: event.target.value,
          });
      }
      ValidateEmail(mail) 
        {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        {
            return (true)
        }
            return (true)
        }
      verify_data(data){
        if(!data.items.length){alert('your cart is empty!');return false}
        //check name
        if(data.customer_name.length<=2){alert('please enter a valid name!');return false}
        //check_phone number
        let isnum = /^\d+$/.test(data.contact);
        if(!isnum || data.contact.length<10  || data.contact.length>12){alert('please enter a valid phone number!');return false}
        //check email
        if(!this.ValidateEmail(data.emailid)){alert('please enter a valid email.id');return false}
        //check address
        if(data.address.add1.length<=2 && data.address.add2.length<=2){alert('please enter a valid address!');return false}
        //check pincode
        if(data.address.pincode.length!=6){alert('please enter a valid pincode!', data.address.pincode);return false}
        return true
      }
      handleSubmit =()=>{
          console.log(this.state.cartItems)
          if(this.state.cartItems==undefined)alert('cart is empty!')
          else{
              console.log('yo')
            let items=(
                this.state.cartItems.map( (item)=>{
                    var cartItem={
                        item_id:item.id,
                        qty:item.quantity
                    }
                    return cartItem
                })
            )
            //console.log(items);
            const data={
                items: items,
                total_price: this.props.data.total,
                customer_name: this.state.customer_name,
                contact: this.state.contact,
                emailid: this.state.emailid,
                address: {
                    pincode: this.state.pincode,
                    add1: this.state.add1,
                    add2: this.state.add2
                } 
            }
            //console.log(data)
            //let adh=this.verify_data(data)
            if(this.verify_data(data)){
                console.log(data)
                this.setState({
                    cartData:data,
                    showPayment:true
                })    
            }
        }
    }
    //to remove the item completely
    handleRemove = (id)=>{
        let itemToRemove= this.state.cartItems.find(item=> item.id === id)
        let new_items = this.state.cartItems.filter(item=> item.id !== id)
        
        //calculating the total
        let newTotal = this.state.total - (itemToRemove.price * itemToRemove.quantity )
        this.props.handleUpdate(new_items,newTotal)
        //console.log(itemToRemove)
        
        
    }
    handlePay=()=>{
        let toggle= !this.state.showForm;
        this.setState({
            showForm: toggle
        })        
    }
    //to add the quantity
    handleAddQuantity = (id)=>{
        let addedItem = this.state.cartItems.find(item=> item.id === id)
        addedItem.quantity += 1 
        let newTotal = this.state.total + addedItem.price
        this.props.handleUpdate(this.state.cartItems,newTotal);
    }
    //to subtract from the quantity
    handleSubtractQuantity = (id)=>{
        let addedItem = this.state.cartItems.find(item=> item.id === id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = this.state.cartItems.filter(item=>item.id !== id)
            let newTotal = this.state.total - addedItem.price
            this.props.handleUpdate(new_items,newTotal)
        }
        else {
            addedItem.quantity -= 1
            let newTotal = this.state.total - addedItem.price
            this.props.handleUpdate(this.state.cartItems,newTotal)
        }
    }
    render(){
        //show cart items or payment options
        if(!this.state.showPayment){
            let cartReceipt = 
                (  
                    this.state.cartItems.map(item=>{
                
                        return(
                            <div className='table'>
                                <div style={{width:'160px'}}>{item.item_name}</div>
                                <div style={{width:'70px'}}>{item.quantity}</div>
                                <div style={{width:'70px'}}> {item.price}</div>
                            </div>
                        )
                    })
                    
                )
            const Receipt=()=>{
                return this.state.cartItems.length?(
                    <div className="card #b2ebf2 cyan lighten-4" style={{width:'350px',margin:'20px'}}>
                                    <div className="card-content " style={{width:'350px'}}>
                                        <span className="card-title ">Receipt</span>
                                        <div>
                                            <div className='table'>
                                                <div style={{width:'160px'}}><b>Items</b></div>
                                                <div style={{width:'70px'}}><b>Quantity</b></div>
                                                <div style={{width:'70px'}}><b> Price</b></div>
                                            </div>
                                            <div className='divider'></div>
                                            {cartReceipt}
                                            <div className='divider'></div>
                                            <div className='table'>
                                                <div style={{width:'160px'}}><b>Total:</b></div>
                                                <div style={{width:'70px'}}></div>
                                                <div style={{width:'70px'}}><b>{this.state.total}</b></div>
                                            </div>
                                        </div>
                                    </div>    
                    </div>
                ):null
            }
            //options for available pincodes
            let Pincodes= this.state.available_pincodes.length? (
                                this.state.available_pincodes.map(pin=>{
                                   return( <option  value={pin}>{pin}</option> )
                                }) ):null
            

            
            //SHOW CART ITEMS 
            //<div className="collection" style={{display:'flex',flexDirection:'column',justifySelf:'flex-start'}}>
            let cartItems = this.state.cartItems.length ?
                (  
                    this.state.cartItems.map(item=>{
                
                        return(
                            
                            
                            <div className="collection-item avatar #fff9c4 yellow lighten-4" key={item.id} style={{display:'flex',flexDirection:'column',width:'100%',maxWidth:'600px',height:'75px',margin:'5px',alignItems:'center',}}>
                                        
                                        <div className="item-desc" style={{display:'flex',justifySelf:'center',width:'95%'}}>
                                            
                                            <div style={{float:'left',width:'55%',height:'100%',justifySelf:'flex-start'}}>
                                                <h6>{item.item_name}</h6>
                                                <p><b>Price: ₹{item.price}</b></p>
                                            </div>
                                            <div className="add-remove" style={{display:'flex',justifySelf:'flex-end',width:'40%',height: '100%', alignItems:'center'}}>
                                                
                                                <Link to="/cart"><i className="material-icons" style={{float:'right'}} onClick={()=>{this.handleAddQuantity(item.id)}}>arrow_drop_up</i></Link>
                                                <b style={{float:'right',padding: '2px'}}>    {item.quantity}</b>
                                                <Link to="/cart"><i className="material-icons" style={{float:'right'}} onClick={()=>{this.handleSubtractQuantity(item.id)}}>arrow_drop_down</i></Link>
                                                <button   onClick={()=>{this.handleRemove(item.id)}}>Remove</button>
                                                
                                            </div>
                                            
                                        </div>  
                                </div>
                            
                            
                            
                        )
                    })
                    
                ):
                (
                    <div className='center_image'  style={{width:'100%',maxWidth:'700px'}}>
                        <p> </p>
                        <img src={img}  style={{width:'100%'}} />         
                    </div>
                )
            // parent view .. i would seperate the form into a function but it is causing rerendering problems
            return(
                <div className="cart " style={{marginTop:'5em',marginBottom:'5em'}}>
                    <h3 className='center-align'>Shopping Cart</h3>
                    <div className='divider'></div>
                    <div className="container "  style={{with:'90%',display:'flex',flexDirection:'column',alignItems:'center',flexWrap: 'wrap'}}>
                        <div style={{float:'center',display:'flex',flexDirection:'column',width:'100%',maxWidth:'600px'}}>
                            {cartItems}
                        </div>    
                        <Receipt/>  
                        </div>
                            <div className='divider'></div>
                            <h3 style={{textAlign:'center'}}>Details</h3>
                            
                            <div className="row" style={{width:'100%',maxWidth:'900px',textAlign:'center'}}>
            
                            <form className="col s12" onSubmit={this.handleSubmit} style={{alignContent:'center',width:'96%'}}>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <input  id="customer_name" value={this.state.customer_name} onChange={this.handleChange} type="text" className="validate"/>
                                        <label for="customer_name">Name</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input  id="contact" value={this.state.contact} onChange={this.handleChange} type="text" className="validate"/>
                                        <label for="contact">Mobile No.</label>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input id="emailid" type="text" value={this.state.emailid} onChange={this.handleChange} className="validate"/>
                                        <label for="emailid">Email Id</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <input id="add1" type="text" value={this.state.add1} onChange={this.handleChange} className="validate"/>
                                        <label for="add1">Address Line 1</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input  id="add2" type="text" value={this.state.add2} onChange={this.handleChange} className="validate"/>
                                        <label for="add2">Address Line 2</label>
                                    </div>
                                    <div className="input-field col s12">
                                        
                                        <select id= 'pincode'className="browser-default grey-text" onChange={this.handleChange}>
                                            <option className='grey-text' value="" disabled selected >Choose pincode</option>
                                            {Pincodes}
                                        </select>
                                        
                                        
                                    </div>
                                </div>
                                
                            </form>
                            <button className="waves-effect  waves-light btn #26c6da cyan lighten-1 remove " onClick={this.handleSubmit}>Confirm Order</button>
                        </div>
                    
                    
                </div>
            )
        }
        else{
            return(<Payment cart={this.state.cartData}/>)
        }
    }
        
}