const request = require('request')
const fs = require('fs-extra')
const uploadToGiphy = (filename) => {
    var postData = {
        api_key: '9LofYhiVHaU6y1Sf5RZ8M6asa6F5mHAS',
        file: {
            value: fs.createReadStream(filename),
            options: {
                filename: filename,
                contentType: 'image/gif'
            }
        }
    }
    var opt = {
        url: 'https://upload.giphy.com/v1/gifs?api_key=' + postData.api_key,
        formData: postData,
        json: true
    }
    const p = new Promise((resolve, reject) => {
        request.post(opt, function (e, resp, body) {
            if(e || resp.statusCode !== 200) return console.log('Upload giphy failed!')
            resolve('https://media.giphy.com/media/' + body.data.id + '/giphy.gif')
        })
    })
    return p
}
const opts = () => {
    return {
        duration: 5,
        rate: 8,
        width: 300,
        height: 300,
    }
}
exports.opts = opts
exports.uploadToGiphy = uploadToGiphy