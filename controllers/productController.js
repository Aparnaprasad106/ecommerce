// import product collection or model
const products = require('../models/productSchema')

// get all products
exports.getallproducts = async (req,res)=>{
    // logic
   try{
     // get all products from products collection in mongodb
     allProducts = await products.find()
     res.status(200).json(allProducts)
   }
   catch(error){
    res.status(401).json(error)
   }
}
// view product api
exports.viewproduct = async(req,res)=>{
  // get product id from  request
  const id = req.params.id
  // logic
  try{
    // check product present in mongodb
    const product=await products.findOne({id})
    if(product){
      // send to client
      res.status(200).json(product)
    }
    else{
      res.status(404).json("product not found")
    }
  }
  catch(error){
    res.status(401).json(error)
  }
}