// import wishlist model
const wishlists = require('../models/wishlistSchema')


// add to wishlist
exports.addtowishlist = async (req,res)=>{
    // get product details from request
    // using destructuring
    const{id,title,price,image}=req.body
    // logic
    try{
        // check id id present in wishlist
        const item = await wishlists.findOne({id})
        if(item){
            res.status(402).json("item already exist in your wishlist")
        }
        else{
            // add item in wishlist collection
            const newProduct = wishlists({id,title,price,image})
            // to store in db
            await newProduct.save()
            res.status(200).json("Item added to your wishlist")
        }
    }
    catch(err){
        res.status(401).json(err)
    }
}

// get wishlist
exports.getwishlistItems = async (req,res)=>{ 
    // logic
   try{
     // get all product from wishlist collection in mongodb
     const allproducts = await wishlists.find()
     res.status(200).json(allproducts)
   }
   catch(error){
    res.status(401).json(error)
   }

}

// remove item
exports.removefromwishlist= async (req,res)=>{
    // get id from request
    const {id} = req.params
    // remove id from wishlist collection
    try{
        const removeItem = await wishlists.deleteOne({id})
        if(removeItem)
        {
            // get all wishlist item after removing the particular item
            const allItems = await wishlists.find()
            res.status(200).json(allItems)
        }
        else
        {
            res.status(404).json("item not found in wishlist")
  
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}