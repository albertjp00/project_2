import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";


export const StoreContext = createContext(null)


const StoreContextProvider = (props)=>{



    const [cartItems,setCartItems] = useState({})
    
    const [foodList,setFoodList] = useState([])

    const addToCart = async (itemId) =>{


        const response = await axios.post('http://localhost:2000/user/cartAdd',{
            itemId : itemId,
            quantity : cartItems[itemId] ? cartItems[itemId] + 1 : 1,
        })

        if(response.success){
            if(!cartItems[itemId]){
                setCartItems((prev)=>({...prev,[itemId]:1}))
            }else{
                setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
            }
        }
    }

    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const fetchFoodList = async () =>{
        try {
            const response = await axios.get('http://localhost:2000/user/getProducts')
            setFoodList(response.data.products)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        async function loadData(){
            await fetchFoodList()
        }

        loadData()
        
    },[])

    const contextValue = {
        foodList,
        cartItems,
        setFoodList,
        setCartItems,
        addToCart,
        removeFromCart,
    }

    return (
        
        <StoreContext.Provider value = {contextValue}>
            {props.children}
        </StoreContext.Provider>

    )
}

export default StoreContextProvider