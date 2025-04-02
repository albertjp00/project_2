import { createContext, useEffect, useMemo, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";


export const StoreContext = createContext(null)


const StoreContextProvider = (props)=>{



    const [cartItems,setCartItems] = useState({})
    
    const [foodList,setFoodList] = useState([])

    const [token,setToken] = useState(localStorage.getItem('token') || "")

    const [category,setCategory] = useState("All")

    const [coupons,setCoupon] = useState({})

    

    const loadCartData =  async ()=>{
        try {
            
            
            const response = await axios.get(`http://localhost:2000/user/cart?t=${token}`)
            // console.log(response.data.cartData[0]);


        if(response.data.success){
            const cartData = response.data.cartData  
            
            
            const formattedCartItems = cartData.reduce((acc,item)=>{
                acc[item.productId] = item.quantity
                return acc
            },{})
            

              

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
                t : token
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
            quantity:newQuantity,
            t : token
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

    

     

    const totalAmount = useMemo(() => {
        let total = 0;
        // console.log("total amount");
        

        if (!foodList.length) return 0;

        for (const itemId in cartItems) {
            const quantity = cartItems[itemId];
            if (quantity > 0) {
                const itemInfo = foodList.find((product) => product._id === itemId);
                if (itemInfo) {
                    total += itemInfo.price * quantity;
                }
            }
        }
        return total;
    }, [cartItems, foodList]);

    
    const getCoupons = async ()=>{
        try {
            const response = await axios.get('http://localhost:2000/user/getCoupon')
        if(response.data.coupon){
            setCoupon(response.data.coupon)
        }
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        async function loadData(){
            await fetchFoodList()
            await loadCartData()
            // await getCoupons()
        }

        loadData()
        
    },[])

   

    useEffect(() => {

        const storedToken = localStorage.getItem("token")
        if(storedToken){
            setToken(storedToken)
        }
        
    }, [cartItems, foodList, totalAmount]);



    const contextValue = {
        foodList,
        cartItems,
        setFoodList,
        fetchFoodList,
        setCartItems,
        addToCart,
        removeFromCart,
        token,
        setToken,
        totalAmount,
        category,
        setCategory,
        coupons,
        setCoupon
    }

    return (
        
        <StoreContext.Provider value = {contextValue}>
            {props.children}
        </StoreContext.Provider>

    )
}

export default StoreContextProvider