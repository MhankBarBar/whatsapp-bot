const fs = require('fs-extra')

exports.ban = async function (message) {
    numBan = message.body.substring(message.body.indexOf('@') + 1)
    fs.appendFileSync('./lib/ban.txt', `${message.from} ${numBan}@c.us\n`)
    console.log(numBan)
}

exports.unban = async function (message) {
    numUnBan = message.body.substring(message.body.indexOf('@') + 1)
    fs.readFile('./lib/ban.txt', { encoding: 'utf-8'}, function (err, data) {
        if (err) throw err

        let dataArray = data.split('\n')
        const key = `${message.from} ${numUnBan}@c.us`
        let lastI = -1

        for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i].includes(key)) {
                lastI = i
                break
            }
        }
        dataArray.splice(lastI, 1)
        const dataUpdate = dataArray.join('\n')
        fs.writeFile('./lib/ban.txt', dataUpdate, function(err) {
            if (err) throw err
        })
    })
}