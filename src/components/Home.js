import React, { Component } from 'react';
import Image from './Image';
export default class Home extends Component{
    constructor(props){
        super(props);
        
        this.state={
            cartItems: this.props.data.cartItems,
            items: this.props.data.items,
            total: this.props.data.total,

        }
    }
    handleClick = (id)=>{
        let addedItem = this.state.items.find(item=> item.id === id)
          //check if the action id exists in the cartItems
         let existed_item= this.state.cartItems.find(item=> id === item.id)
         if(existed_item)
         {
            //console.log(addedItem);
            addedItem.quantity += 1 
            this.props.handleUpdate(this.state.cartItems,this.state.total+ addedItem.price);
        }
         else{
            addedItem.quantity = 1;
            let newTotal = this.state.total + addedItem.price 
            this.props.handleUpdate([...this.state.cartItems, addedItem],newTotal);
        }
        //console.log(this.state); 
    }
 

    
    render(){
    let itemList = this.props.data.isLoading? null: 
        this.props.data.items.map(item=>{
            // const Add_remove=this.state.cartItems.find(_item=>_item.id===item.id)?
            // (<span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={()=>{this.handleClick(item.id)}}><i className="material-icons">remove</i></span>):
            // (<span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={()=>{this.handleClick(item.id)}}><i className="material-icons">add</i></span>) 
            
            return(
                <div className="card" key={item.id} style={{width:'300px',margin:'15px'}}>
                        <div className="card-image">
                        <Image src={imageplaceholder(item.image)} width={'300px'} height={'200px'} mode='fill' /> 
                        <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={()=>{this.handleClick(item.id)}}><i className="material-icons">add</i></span>
                        </div>

                        <div className="card-content">
                            <div className="card-title">{item.item_name}</div>
                            <p>{item.desc}</p>
                            <p>{item.flavour}</p>
                            <p><b>Price: ₹{item.price}</b></p>
                        </div>
                 </div>

            )
        })
    

        return(
            
            <div className="container" style={{marginTop:'15%'}}>
                <div className='center'>
                    <h1 className="center" >About Us</h1>
                    <p className="center">{aboutme}</p>
                </div>
                <div className="divider"></div>
                <h3 className="center">Our Menu</h3>
                <div className="box" style={{display:'flex',justifyContent:'center'}}>
                    {itemList}
                </div>
                <div className="divider"></div>
                <div className="center" style={{alignSelf:'center'}}>
                    <h1 className='center'>Contact Us</h1>
                    <p className="center">{aboutme}</p>
                </div>
            </div>
        )
    }

}

const aboutme="I love getting rewarded for my hard work"

function imageplaceholder(image){
    return image==null?'https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg':image;
}

