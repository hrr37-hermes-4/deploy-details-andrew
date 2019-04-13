const mysql = require('mysql');
const Promise = require('bluebird');
// console.log('\n============ WHAT IS MY DATABASE NAME ============\n', process.env);

const user = process.env.RDS_USERNAME || 'root';
const password = process.env.RDS_PASSWORD || '';
const port = process.env.RDS_PORT || 3306;
const database = process.env.RDS_DB_NAME || 'books';
const host = process.env.RDS_HOSTNAME || '127.0.0.1';

const connection = mysql.createConnection({
  user,
  password,
  port,
  database,
  host,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

// best not to always seed database on server start!
db.connectAsync()
  .then(() => console.log(`connected to mysql with id ${db.threadId} \n\n`))
  .error((err) => { console.log('error connecting to db', err); });

module.exports = db;


const getDetails = (id) => {
  const queryString = 'SELECT * FROM details WHERE id = ?';
  const params = [id];
  console.log('\n============ getDetails VARIABLES ============\n', queryString, params);

  return db.queryAsync(queryString, params);
};

const getTableData = (table, id) => {
  const queryString = 'SELECT * FROM ?? WHERE bookId = ?';
  const params = [table, id];
  return db.queryAsync(queryString, params);
};


module.exports.getTableData = getTableData;
module.exports.getDetails = getDetails;
