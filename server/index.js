const app = require('./app');


app.listen(process.env.PORT, () => {
  console.log(`listening on port ${PORT}\n\n`);
});

console.log(process.env.PORT);
