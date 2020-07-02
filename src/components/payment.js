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
    utf8_to_str(a) {
        for(var i=0, s=''; i<a.length; i++) {
            var h = a[i].toString(16)
            if(h.length < 2) h = '0' + h
            s += '%' + h
        }
        return decodeURIComponent(s)
    }  
    bin2string(array){
        var result = "";
        for(var i = 0; i < array.length; ++i){
            result+= (String.fromCharCode(array[i]));
        }
        return result;
    }
    handleSubmit(){
    
        //let form = this.state.form // this.state.form stores pg_params from response from /v1/createOrder/
        //hardcoded data
        let form = {
            "appId": "19124f13c8d8ddc0ae925549f42191",
            "orderId": "f40cc84f-79fc-4483-8683-504b",
            "orderAmount": "80.0",
            "orderCurrency": "INR",
            "orderNote": "Phuchki",
            "customerName": "piyush mathur",
            "customerPhone": "08279859792",
            "customerEmail": "piosdshm@bjdk.cikl",
            "returnUrl": "https://google.com",
            "notifyUrl": "https://google.com",
            "signature": 'V7GUowP/i3MPsDHTsNMn00xp65gLZHJNKNHeG5SrqU='
        }
        
        let sign= this.bin2string(form.signature)
        console.log('new sign', sign)
        form['signature']=sign
        
        // for(var i=0;i<form.length-2;i++){
        //     if(form[i]=='b' && form[i+1]=='\'' && !(form[i+2]==' ' || form[i+2]==',' ||form[i+2]=='}') ){form=form.substr(0,i) + form.substr(i+1);break;}
        // }
    
        console.log(form)
        //form = JSON.parse(form);
        console.log('posting to cashfreee : ',form)
        fetch('https://cors-anywhere.herokuapp.com/https://test.cashfree.com/billpay/checkout/post/submit', {
            //mode:'no-cors',
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            body: JSON.stringify(form)
          })        
          .then((response) => response.json //response to be posted to /v1/processPayment/)
          .then((json)=>console.log(json) )
          .catch(error => console.log(error))
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