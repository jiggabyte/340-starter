const inventoryModel = require("../models/inventoryModel");
const utilities = require("../utilities/");

/* *****************************
 * Display random cars
 * ***************************** */
async function displayRandomCars(req, res, next) {
    try {
        const nav = await utilities.getNav();
        const randomCars = await inventoryModel.getRandomCars(5);
        console.log(randomCars);
        if (!randomCars) {
            throw new Error("Failed to fetch random cars.");
        }
        res.render("inventory/randomCars", {
            title: "Random Cars",
            nav,
            randomCars,
        });
    } catch (error) {
        console.error("Error fetching random cars:", error);
        next(error);
    }
}

module.exports = { displayRandomCars };