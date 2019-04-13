const mysql = require('mysql');
const Promise = require('bluebird');
console.log('\n============ WHAT IS MY DATABASE NAME ============\n', process.env.RDS_NAME);

const connection = mysql.createConnection({
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  host: process.env.RDS_HOSTNAME,
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
