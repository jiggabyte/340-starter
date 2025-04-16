// Needed Resources 
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const authMiddleware = require("../middleware/authMiddleware")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build inventory by item view
router.get("/detail/:invId", utilities.handleErrors(invController.buildInventoryItemById));

// Route to throw server error
router.get("/error/", utilities.handleErrors(invController.throwError));

// Protect inventory management routes
router.get("/", authMiddleware.checkAdminOrEmployee, utilities.handleErrors(invController.buildManagementView));
router.get("/add-classification", authMiddleware.checkAdminOrEmployee, utilities.handleErrors(invController.buildAddClassificationView));
router.post("/add-classification", authMiddleware.checkAdminOrEmployee, utilities.handleErrors(invController.addClassification));
router.get("/add-inventory", authMiddleware.checkAdminOrEmployee, utilities.handleErrors(invController.buildAddInventoryView));
router.post("/add-inventory", authMiddleware.checkAdminOrEmployee, utilities.handleErrors(invController.addInventory));

// Route to get inventory by classification as JSON
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON));

module.exports = router;