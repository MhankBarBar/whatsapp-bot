const fetch = require('node-fetch')
const { getBase64 } = require("./fetcher");

const liriklagu = async (lagu) => {
    const response = await fetch('http://scrap.terhambar.com/lirik?word='+lagu)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status) return `Lirik Lagu ${lagu}\n\n${json.result.lirik}`
}

const cerpen = async () => {
    const response = await fetch('http://api.fdci.se/cerpen')
    if (!response.ok) throw new Error(`nexpected response ${response.status}`)
    const text = await response.text()
    if (text.status) return text
}

const quotemaker = async (quotes, author = 'EmditorBerkelas', type = 'random') => {
    var q = quotes.replace(/ /g, '%20').replace('\n','%5Cn')
    const response = await fetch(`https://terhambar.com/aw/qts/?kata=${q}&author=${author}&tipe=${type}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status) {
        if (json.result !== '') {
            const base64 = await getBase64(json.result)
            return base64
        }
    }
}
const wall = async(query) => {
    var q = query.replace(/ /g, '+')
    const response = await fetch(`https://wall.alphacoders.com/api2.0/get.php?auth=3e7756c85df54b78f934a284c11abe4e&method=search&term=${q}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
    const json = await response.json()
    console.log(json)
    if (json.success === true) {
        return json.wallpapers[0].url_image
    } else {
        return 'Wallpaper tidak ditemukan!'
    }
}

exports.liriklagu = liriklagu;
exports.quotemaker = quotemaker;
exports.cerpen = cerpen;
exports.wall = wall;