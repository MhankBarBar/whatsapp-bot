const app = require('express')();

app.get('/', (req, res) => res.send('Template made by: RaphielHS'));

module.exports = () => {
  app.listen(8080);
}
