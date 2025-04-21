const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn} = require("../middleware.js");
const {isOwner,validateListing} = require("../middleware.js");
const multer  = require('multer')
const {storage} = require("../cloud_config.js")
const upload = multer({ storage })


//controller

const listingController = require ("../controllers/listings.js");



//Get & Post route for listing
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, upload.single('listing[image]'), validateListing ,wrapAsync(listingController.createListing));

//new route
router.get("/new",isLoggedIn, listingController.renderNewForm);
  

//Show , Update & Delete route for listing
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn ,isOwner ,  upload.single('listing[image]'),validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner , wrapAsync(listingController.destroy));

 


//edit route
router.get("/:id/edit", isLoggedIn, isOwner ,wrapAsync(listingController.editListing));
  
  

module.exports = router;