const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, '192.168.215.117', () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
