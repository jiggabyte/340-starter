const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
    let data = await invModel.getClassifications();
    let list = "<ul>";
    list += '<li><a href="/" title="Home page">Home</a></li>';
    data.rows.forEach((row) => {
        list += "<li>";
        list +=
            '<a href="/inv/type/' +
            row.classification_id +
            '" title="See our inventory of ' +
            row.classification_name +
            ' vehicles">' +
            row.classification_name +
            "</a>";
        list += "</li>";
    });
    list += "</ul>";
    return list;
};

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function (data) {
    let grid = '';
    if (data.length > 0) {
        grid = '<ul id="inv-display" class="inv-display">'
        data.forEach(vehicle => {
            grid += '<li>'
            grid += '<a href="../../inv/detail/' + vehicle.inv_id
                + '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model
                + 'details"><img src="' + vehicle.inv_thumbnail
                + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model
                + ' on CSE Motors" /></a>'
            grid += '<div class="namePrice">'
            grid += '<hr />'
            grid += '<h2>'
            grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View '
                + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">'
                + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
            grid += '</h2>'
            grid += '<span>$'
                + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
            grid += '</div>'
            grid += '</li>'
        })
        grid += '</ul>'
    } else {
        grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
}



/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildInventoryItemGrid = async function (vehicle_data) {
    let grid = '';
    let vehicle = vehicle_data[0];
    if (!!vehicle) {
        grid = '<div class="inv-container">';
        grid += '<ul id="inv-display" class="inv-item-display">';
        grid += '<li class="inv-item">';
        grid += '<img class="inv-image" src="' + vehicle.inv_thumbnail
            + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model
            + ' on CSE Motors" />';
        grid += '<div class="inv-details">';
        grid += '<h2>' + vehicle.inv_make + ' ' + vehicle.inv_model + '</h2>';
        grid += '<hr />';
        grid += '<span class="inv-price">Price: $'
            + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>';
        grid += '<p class="inv-text">Year: ' + vehicle.inv_year + '</p>';
        grid += '<p class="inv-text">Mileage: ' + new Intl.NumberFormat('en-US').format(vehicle.inv_miles) + '</p>';
        grid += '<p class="inv-text">Color: ' + vehicle.inv_color + '</p>';
        grid += '<p class="inv-text">Description: ' + vehicle.inv_description + '</p>';
        grid += '</div>';
        grid += '</li>';
        grid += '</ul>';
        grid += '</div>';
    } else {
        grid = '<p class="notice">Sorry, no vehicle data could be found.</p>';
    }
    return grid;
};



/* **************************************
* Build the classification list HTML
* ************************************ */
Util.buildClassificationList = async function (classification_id = null) {
    let data = await invModel.getClassifications();
    let classificationList =
        '<select name="classification_id" id="classificationList" required>';
    classificationList += "<option value=''>Choose a Classification</option>";
    data.rows.forEach((row) => {
        classificationList += '<option value="' + row.classification_id + '"';
        if (classification_id != null && row.classification_id == classification_id) {
            classificationList += " selected ";
        }
        classificationList += ">" + row.classification_name + "</option>";
    });
    classificationList += "</select>";
    return classificationList;
};



/* ****************************************
* Middleware For Handling Errors
* Wrap other function in this for 
* General Error Handling
**************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util