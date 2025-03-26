// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build inventory by item view
router.get("/detail/:invId", utilities.handleErrors(invController.buildInventoryItemById));

// Route to throw server error
router.get("/error/", utilities.handleErrors(invController.throwError));

module.exports = router;