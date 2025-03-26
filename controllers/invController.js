const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
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
    console.log(data);
    let nav = await utilities.getNav()
    res.render("./inventory/item", {
        title: data[0].inv_make + ' ' + data[0].inv_model + " vehicle",
        nav,
        grid,
    })
}

/* ***************************
*  Throw error method
* ************************** */
invCont.throwError = async function (req, res, next) {
    try {
      // invModel.getError();
    } catch(e){
      // throw new Error(e);
    }
   
    res.render("./inventory/error", {title: "Error", message: "Server Error!"});
}


module.exports = invCont
