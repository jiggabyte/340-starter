const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");


const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data.length > 0 ? data[0].classification_name: "";
    res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
    })
}


/* ***************************
 *  Build inventory by item view
 * ************************** */
invCont.buildInventoryItemById = async function (req, res, next) {
    const inv_id = req.params.invId
    const data = await invModel.getInventoryItemById(inv_id)
    const grid = await utilities.buildInventoryItemGrid(data)
    let nav = await utilities.getNav()
    res.render("./inventory/item", {
        title: data[0].inv_make + ' ' + data[0].inv_model + " vehicle",
        nav,
        grid,
    })
}

/* ***************************
 *  Build inventory management view
 * ************************** */
invCont.buildManagementView = async function (req, res, next) {
    let nav = await utilities.getNav();
    res.render("./inventory/management", {
        title: "Inventory Management",
        nav
    });
};

/* ***************************
 *  Build add classification view
 * ************************** */
invCont.buildAddClassificationView = async function (req, res, next) {
    let nav = await utilities.getNav();
    res.render("./inventory/add-classification", {
        title: "Add Classification",
        nav
    });
};

/* ***************************
 *  Add classification
 * ************************** */
invCont.addClassification = async function (req, res, next) {
    const { classification_name } = req.body;

    // Server-side validation
    const pattern = /^[a-zA-Z0-9]+$/;
    if (!classification_name || !pattern.test(classification_name)) {
        req.flash("message", "Invalid classification name. Please use alphanumeric characters only.");
        return res.redirect("/inv/add-classification");
    }

    try {
        const result = await invModel.addClassification(classification_name);
        if (result) {
            // Rebuild the navigation bar
            req.flash("message", "Classification added successfully.");
            res.redirect("/inv"); // Redirect to management view
        } else {
            req.flash("error", "Failed to add classification.");
            res.redirect("/inv/add-classification");
        }
    } catch (error) {
        console.error("Error adding classification:", error);
        req.flash("error", "An error occurred. Please try again.");
        res.redirect("/inv/add-classification");
    }
};

/* ***************************
 *  Build add inventory view
 * ************************** */
invCont.buildAddInventoryView = async function (req, res, next) {
    let nav = await utilities.getNav();
    let classificationList = await utilities.buildClassificationList();
    res.render("./inventory/add-inventory", {
        title: "Add Inventory",
        nav,
        classificationList,
        inv_make: "", // Default empty value
        inv_model: "",
        inv_year: "",
        inv_price: "",
        inv_miles: "",
        inv_color: "",
        inv_description: "",
    });
};

/* ***************************
 *  Add inventory
 * ************************** */
invCont.addInventory = async function (req, res, next) {
    const { classification_id, inv_make, inv_model, inv_year, inv_price, inv_miles, inv_color, inv_description } = req.body;

    // Server-side validation
    if (!classification_id || !inv_make || !inv_model || !inv_year || !inv_price || !inv_miles || !inv_color || !inv_description) {
        req.flash("error", "All fields are required.");
        return res.redirect("/inv/add-inventory");
    }

    try {
        const result = await invModel.addInventory({ classification_id, inv_make, inv_model, inv_year, inv_price, inv_miles, inv_color, inv_description });
        if (result) {
            req.flash("message", "Inventory item added successfully.");
            res.redirect("/inv"); // Redirect to management view
        } else {
            req.flash("error", "Failed to add inventory item.");
            res.redirect("/inv/add-inventory");
        }
    } catch (error) {
        console.error("Error adding inventory item:", error);
        req.flash("error", "An error occurred. Please try again.");
        res.redirect("/inv/add-inventory");
    }
};

/* ***************************
*  Throw error method
* ************************** */
invCont.throwError = async function (req, res, next) {
    try {
        // invModel.getError();
    } catch (e) {
        // throw new Error(e);
    }

    res.render("./inventory/error", { title: "Error", message: "Server Error!" });
}


module.exports = invCont
