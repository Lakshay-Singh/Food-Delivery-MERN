import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext);
  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
  });

  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}));
  }

  const placeOrder=async (event)=>{
    event.preventDefault();
    let orderItems=[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo=item;
        itemInfo["quantity"]=cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    
    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+40,
    }
    
    //api call
    let response=await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if(response.data.success){
      const {session_url}=response.data;
      //send user to session url
      window.location.replace(session_url);
    }
    else{
      alert("Error");
    }
  }

  const navigate=useNavigate();
  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        
        <div className='multi-fields'>
          <input onChange={onChangeHandler} name='firstName' value={data.firstName} type="text" placeholder='First Name' required/>
          <input onChange={onChangeHandler} name='lastName' value={data.lastName} type="text" placeholder='Last Name' required/>
        </div>
        
        <input onChange={onChangeHandler} name='email' value={data.email} type="email" placeholder='Email Address' required/>
        <input onChange={onChangeHandler} name='street' value={data.street} type="text" placeholder='Street' required/>
        
        <div className='multi-fields'>
          <input onChange={onChangeHandler} name='city' value={data.city} type="text" placeholder='City' required/>
          <input onChange={onChangeHandler} name='state' value={data.state} type="text" placeholder='State' required/>
        </div>
        
        <div className='multi-fields'>
          <input onChange={onChangeHandler} name='zipcode' value={data.zipcode} type="text" placeholder='Zip Code' required/>
          <input onChange={onChangeHandler} name='country' value={data.country} type="text" placeholder='Country' required/>
        </div>
        
        <input onChange={onChangeHandler} name='phone' value={data.phone} type="text" placeholder='Phone' required/>
      </div>

      <div className='place-order-right'>
      <div className='cart-total'>
            <h2>Cart Total</h2>
            <div>
                <div className='cart-total-details'>
                    <p>Subtotal</p>
                    <p>Rs. {getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className='cart-total-details'>
                    <p>Delivery Fee</p>
                    <p>Rs. {40}</p>
                </div>
                <hr />
                <div className='cart-total-details'>
                    <p>Total</p>
                    <b>Rs. {getTotalCartAmount()+40}</b>
                </div>
            </div>
            <button type='submit'>Pay</button>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder;
