console.log(process.env.RDS_USERNAME, process.env.RDS_PASSWORD, process.env.RDS_PORT, process.env.RDS_DB_NAME, process.env.RDS_HOSTNAME);

var mysql = require('mysql');

console.log('running tests \n\n\n\n\n')

var connection = mysql.createConnection({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  database: process.env.RDS_DB_NAME,
});



connection.connect(function (err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});

connection.end();
