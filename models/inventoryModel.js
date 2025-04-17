const pool = require("../database/");

/* *****************************
 * Fetch random cars
 * ***************************** */
async function getRandomCars(limit = 5) {
    const sql = "SELECT * FROM inventory ORDER BY RANDOM() LIMIT $1";
    const result = await pool.query(sql, [limit]);
    return result.rows;
}

module.exports = { getRandomCars };