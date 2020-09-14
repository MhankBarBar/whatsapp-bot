const request = require('request')

module.exports = uploadToGiphy = (postData) => {
    var opt = {
        url: 'https://upload.giphy.com/v1/gifs?api_key=' + postData.api_key,
        formData: postData,
        json: true
    }
    const p = new Promise((resolve, reject) => {
        request.post(opt, function (e, resp, body) {
            if(e || resp.statusCode !== 200) console.log('Upload giphy failed!')
            resolve('https://media.giphy.com/media/' + body.data.id + '/giphy.gif')
        })
    })
    return p
}