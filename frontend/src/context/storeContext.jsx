import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";


export const StoreContext = createContext(null)


const StoreContextProvider = (props)=>{



    const [cartItems,setCartItems] = useState({})
    
    const [foodList,setFoodList] = useState([])

    const loadCartData =  async ()=>{
        try {
            console.log("carttt");
            
            const response = await axios.get('http://localhost:2000/user/cart')
            // console.log(response.data.cartData[0]);


        if(response.data.success){
            const cartData = response.data.cartData  
            
            
            const formattedCartItems = cartData.reduce((acc,item)=>{
                acc[item.productId] = item.quantity
                return acc
            },{})
            //   console.log("formated",formattedCartItems);

              

              setCartItems(formattedCartItems)  
        }else{
            toast.error("Error loading cart")
        }
        } catch (error) {
            console.log(error);
               
        }
    }

    
    const addToCart = async (itemId) => {
        try {
           
            const newQuantity = cartItems[itemId] ? cartItems[itemId] + 1 : 1;
            
    
         
            const response = await axios.post('http://localhost:2000/user/cartAdd', {
                itemId: itemId,
                quantity: newQuantity,
            });
    
            
            if (response.data.success) {
                setCartItems((prev) => ({
                    ...prev,
                    [itemId]: newQuantity,
                }));
               
            } else {
                toast.error("Failed to add item to cart. Please try again.");
            }
        } catch (error) {
            console.error("Error adding item to cart:", error);
            toast.error("An error occurred while adding the item to the cart.");
        }
    };
    

    const removeFromCart = async (itemId) =>{
        try {
            let newQuantity =  cartItems[itemId] - 1 
            // console.log("newQuantity",newQuantity);
            

        const response = await axios.post('http://localhost:2000/user/cartRemove',{
            itemId:itemId,
            quantity:newQuantity
        })
        
        
        if(response.data.success){
            setCartItems((prev)=>({
                ...prev,
                [itemId] : newQuantity
            }))
        }else{
            console.log(error);
            toast.error("An error occured")
            
        }
        } catch (error) {
            console.log(error);
            
        }
    }

    const fetchFoodList = async () =>{
        try {
            const response = await axios.get('http://localhost:2000/user/getProducts')
            // console.log(response.data.products);
            setFoodList(response.data.products)
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        async function loadData(){
            await fetchFoodList()
            await loadCartData()
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