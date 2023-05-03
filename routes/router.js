//To define routes for client request,create routes folder and router.js file

// import expess
const express = require('express')
// import product controller
const productController = require('../controllers/productController')
// import wishlist controller
const wishlistController = require('../controllers/wishlistController')
// import cart controller
const cartController = require('../controllers/cartController')

// using express create object fot Router class inorder to setup path
const router = new express.Router()

// resolve client request in various server routes

// api
// get-all products
router.get('/products/all-products',productController.getallproducts)

// view-products/id
router.get('/products/view-product/:id',productController.viewproduct)

// add to wishlist
router.post('/wishlist/add-product',wishlistController.addtowishlist)

// get wishlist items
router.get('/wishlist/get-items',wishlistController.getwishlistItems)

// remove wishlist item
router.delete('/wishlist/remove-item/:id',wishlistController.removefromwishlist)

// add to cart
router.post('/cart/add-product',cartController.addtocart)

// get cart item
router.get('/cart/all-products',cartController.getCart)

// remove cart item
router.delete('/cart/remove-item/:id',cartController.removefromcart)

// empty cart
router.delete('/cart/remove-all-items',cartController.emptycart)

// increment quantity
router.get('/cart/increment-item/:id',cartController.incrementCount)

// decrement quantity
router.get('/cart/decrement-item/:id',cartController.decrementquantity)



// exports router
module.exports = router
    