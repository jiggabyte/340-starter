const pool = require("../database/");

/* *****************************
 * Return account data using email address
 * ***************************** */
async function getAccountByEmail(account_email) {
  try {
    const result = await pool.query(
      `SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password 
       FROM account 
       WHERE account_email = $1`,
      [account_email]
    );
    return result.rows[0];
  } catch (error) {
    console.error("getAccountByEmail error:", error);
    return null;
  }
}

module.exports = { getAccountByEmail };