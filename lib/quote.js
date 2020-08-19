const fs = require('fs');

module.exports = () => {
  const data = fs.readFileSync('./lib/quote.json');
  const jsonData = JSON.parse(data);
  const randIndex = Math.floor(Math.random() * jsonData.length);
  const randKey = jsonData[randIndex];
  return `${randKey.quote} - ${randKey.by}`;
};
