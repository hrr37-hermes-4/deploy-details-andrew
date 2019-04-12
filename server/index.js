const app = require('./app');

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}\n\n`);
});

console.log(PORT);
