import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

export default class Payment extends Component{
    constructor(props){
        super(props);
        this.state={
            txnid:'',
            form:'',
            response:'',
            showform:false
        };
        this.formRef= React.createRef()
    }
    componentDidMount(){
          let data=this.props.cart
          const post_data={
            items: data.items,
            total_price: data.total_price,
            customer_name: data.customer_name,
            contact: data.contact,
            email: data.emailid,
            address: {
                pincode: data.address.pincode,
                add1: data.address.add1,
                add2: data.address.add2
            } 
        }
          console.log('post data: ',post_data)
            let requestOptions = {
              //mode:'no-cors',
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(post_data)
            };
            fetch('http://phuchki.in/v1/createOrder/', requestOptions)
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    this.setState({
                        response:response,
                        form: response.data.pg_params,
                    })
                    if(response.status){
                        this.setState({showform:true}) 
                    } 
                }).then(()=>this.handleSubmit())
                .catch(error=>{
                    console.log('error: ',error)
                });
    }
    //function used to post data to the payment gateway    
    handleSubmit(){
        let form = this.state.form // this.state.form stores pg_params from response from /v1/createOrder/
        console.log('posting to cashfree : ',form)
        fetch('https://test.cashfree.com/billpay/checkout/post/submit', {
            mode:'no-cors',
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            body: JSON.stringify(form)
          })        
          .then((response) => response.json())
          .then(json => console.log(json))
          .catch(error => console.log(error));
    }
    
    render(){
        if(this.state.showform){
           // console.log(this.state.form)
            return(
               <h1>Success</h1>
            )
        } else {
            return(<h1>failed</h1>)
        }
    }
}