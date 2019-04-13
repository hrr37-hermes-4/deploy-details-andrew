const app = require('./app');

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}\n\n`);
});

console.log('\n\n==============what port am i using==========', process.env.PORT);
