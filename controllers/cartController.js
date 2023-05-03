// import cart collection
const cartitems = require('../models/cartSchema')

// add to cart
exports.addtocart = async(req,res)=>{
    //get product details from req
    const {id,title,image,price,quantity} = req.body
    // logic
    try{
        // check product is in cart collection
        const product = await cartitems.findOne({id})
        if(product){
            // product is in cart
            // increment product quantity
            product.quantity+=1
            // update grant total
            product.grantTotal =product.price *product.quantity
            // to save changes in mongodb
            product.save()
            // send respone to client
            res.status(200).json("items added to your cart.....")
        }
        else{
            // products not in cart
            // add products to cart
            const newProduct=new cartitems({
                id,title,price,image,quantity,grantTotal:price
            })
            // save new items to new product 
            await newProduct.save()
            // send response to client
            res.status(200).json("item added to your cart...")
        }

    } 
    catch(error){
        res.status(401).json(error)
    }
}
// get cart
exports.getCart =  async (req,res)=>{
    try{
        // get all item from cart collection
        const allItems = await cartitems.find()
        res.status(200).json(allItems)

    }
    catch(error){
        res.status(401).json(error)
    }
}
// remove item
exports.removefromcart= async (req,res)=>{
    // get id from request
    const {id} = req.params
    // remove id from wishlist collection
    try{
        const removeItem = await cartitems.deleteOne({id})
        if(removeItem)
        {
            // get all wishlist item after removing the particular item
            const allItems = await cartitems.find()
            res.status(200).json(allItems)
        }
        else
        {
            res.status(404).json("item not found in cart")
  
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}

// empty cart
exports.emptycart = async (req,res)=>{
    try{
        await cartitems.deleteMany({})
        res.status(200).json("YOUR CART IS EMPTY NOW!!!!")
    }
    catch(error){
        res.status(401).json(error)
    }
}

// to increment quantity
exports.incrementCount = async (req,res)=>{
const {id} = req.params
try{
    // check product is in cart
    product= await cartitems.findOne({id})
    if(product){
        // update quantity
        product.quantity+=1
        // update grantTotal
        product.grantTotal=product.price*product.quantity
        // to save changes to mongodb
        await product.save()
         // get all cart item after updating the particular item count
         const allItems = await cartitems.find()
         res.status(200).json(allItems)
    }
    else{
        res.status("product not found in your cart")
    }

}
catch(error){
    res.status(401).json(error)
}
}

// to increment quantity
exports.decrementquantity = async (req,res)=>{
    const {id} = req.params
    try{
        // check product is in cart
        product= await cartitems.findOne({id})
        if(product){
            // update quantity
            product.quantity-=1
            // check quantity is 0
            if(product.quantity==0){
                // remove product from cart collection
                await cartitems.deleteOne({id})
                 // get all cart item after updating the particular item count
             const allItems = await cartitems.find()
             res.status(200).json(allItems)
            }
            else{
                 // update grantTotal
            product.grantTotal=product.price*product.quantity
            // to save changes to mongodb
            await product.save()
             // get all cart item after updating the particular item count
             const allItems = await cartitems.find()
             res.status(200).json(allItems)
            }
            
        }
        else{
            res.status("product not found in your cart")
        }
    
    }
    catch(error){
        res.status(401).json(error)
    }
    }