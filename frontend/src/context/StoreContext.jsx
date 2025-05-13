import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext=createContext(null);

const StoreContextProvider=(props)=>{
    const url="https://food-delivery-backend-p1oz.onrender.com";

    const [token,setToken]=useState("");
    const [cartItems,setCartItems]=useState({});
    const [food_list,setFoodList]=useState([]);

    const addToCart=async (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }

        //update cartItems to database cartData //api call
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart=async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        //update cartItems to database cartData //api call
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    /* To find total price of cart items*/
    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo=food_list.find((product)=>product._id===item);
                totalAmount+=itemInfo.price*cartItems[item];
            }
        }
        return totalAmount;
    }

    //get food list from DB
    const fetchFoodList=async()=>{
        //api call to get food items
        const response=await axios.get(url+"/api/food/list");
        setFoodList(response.data.data)
    }

    //to get cart data from DB, data wont be lost on page refresh
    const loadCartData=async (token)=>{
        const response= await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData);
    }

    //if localStorage has token, setToken its value, so that on reload
    //user will not get logged out 
    useEffect(()=>{
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])

    const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
