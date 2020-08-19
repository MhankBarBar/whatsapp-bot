const axios = require('axios').default;

module.exports.instaImage = (igUrl) => {
  try {
    const response = axios.get(igUrl);
    const { data } = response;
    let imageUrl = data.substring(data.lastIndexOf('"display_url":"') + 15, data.lastIndexOf('","display_resources":'));
    imageUrl = imageUrl.replace(/\\u0026/g, '&');
    let imageBuffer = axios.get(imageUrl, { responseType: 'arraybuffer' });
    imageBuffer = Buffer.from(imageBuffer.data);
    const imageBase64 = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
    return imageBase64;
  } catch (error) {
    return error;
  }
};
