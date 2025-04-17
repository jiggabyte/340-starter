const pool = require("../database/");

/* *****************************
 * Return account data using email address
 * ***************************** */
async function getAccountByEmail(email) {
  const sql = "SELECT * FROM account WHERE account_email = $1";
  const result = await pool.query(sql, [email]);
  return result.rows[0];
}

async function getAccountById(account_id) {
  const sql = "SELECT * FROM account WHERE account_id = $1";
  const result = await pool.query(sql, [account_id]);
  return result.rows[0];
}

async function updateAccount(account_id, firstname, lastname, email) {
  const sql = "UPDATE account SET account_firstname = $1, account_lastname = $2, account_email = $3 WHERE account_id = $4";
  const result = await pool.query(sql, [firstname, lastname, email, account_id]);
  return result.rowCount;
}

async function updatePassword(account_id, password) {
  const sql = "UPDATE account SET account_password = $1 WHERE account_id = $2";
  const result = await pool.query(sql, [password, account_id]);
  return result.rowCount;
}

async function createAccount(accountData) {
  const { account_firstname, account_lastname, account_email, account_password } = accountData;
  const sql = `
    INSERT INTO account (account_firstname, account_lastname, account_email, account_password)
    VALUES ($1, $2, $3, $4)
    RETURNING account_id
  `;
  const result = await pool.query(sql, [
    account_firstname,
    account_lastname,
    account_email,
    account_password,
  ]);
  return result.rowCount > 0;
}

module.exports = { getAccountByEmail, getAccountById, updateAccount, updatePassword, createAccount };