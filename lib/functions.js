const fetch = require('node-fetch')
const { getBase64 } = require("./fetcher");
const request = require('request')

const artinama = async function(nama) {
    const response = await fetch('https://scrap.terhambar.com/nama?n='+nama)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status) return `Arti Nama *${nama}*\n\n${json.result.arti}`
}

const quotes = async () => {
    const response = await fetch('https://api.terhambar.com/qts/')
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status) return `${json.quotes}`
}

const weton = async (tgl, bln, thn) => {
    const response = await fetch(`http://scrap.terhambar.com/weton?tgl=${tgl}&bln=${bln}&thn=${thn}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status) return json.result
}

const corona = async () => {
    const response = await fetch('https://api.terhambar.com/negara/Indonesia')
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    return `*${json.negara}*\n\nPositif: ${json.positif}\nSembuh: ${json.sembuh}\nMeninggal: ${json.meninggal}\nDirawat: ${json.dirawat}`
}

const alay = async (txt) => {
    const response = await fetch('https://api.terhambar.com/bpk?kata='+txt)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status) return json.text
}

const namaninjaku = async (nama) => {
    const response = await fetch('https://api.terhambar.com/ninja?nama='+nama)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status) return json.result.ninja
}

const liriklagu = async (lagu) => {
    const response = await fetch('http://scrap.terhambar.com/lirik?word='+lagu)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status) return`Lirik Lagu ${lagu}\n\n${json.result.lirik}`
}

const yt = async (url) => {
    const response = await fetch('http://scrap.terhambar.com/yt?link='+url);
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status) return `${json.linkVideo}`
}

const ytmp3 = async (url) => {
    const response = await fetch('http://scrap.terhambar.com/yt?link='+url);
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status) return json.linkAudioOnly
}


const quotemaker = async (quotes, author = 'EmditorBerkelas', type = 'random') => {
    var q = quotes.replace('-','%20')
    var qq = q.replace('-','%20').replace('-','%20').replace('-','%20').replace('-','%20').replace('-','%20').replace('-','%20').replace('-','%20').replace('-','%20').replace('-','%20')
    const response = await fetch(`https://terhambar.com/aw/qts/?kata=${qq}&author=${author}&tipe=${type}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status) {
        if (json.result !== '') {
            const base64 = await getBase64(json.result)
            return base64
        }
    }
}
const gd = async (url) => {
    const response = await fetch('https://ostch.herokuapp.com/api/v1/gdrive?url='+url, {json: true});
    if (!response.statusCode == 200) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status) return `*Link Download*\n\n${json.result.url}\n\n*Link pendek*\n ${json.result.link}`
}

const jodoh = async (nama1, nama2) => {
    const response = await fetch(`http://scrap.terhambar.com/jodoh?n1=${nama1}&n2=${nama2}`)
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status)
    return `*${json.result.nama_anda}* & *${json.result.nama_pasangan}*\n\n*Positif* : ${json.result.sisi.positif}\n*Negatif* : ${json.result.sisi.negatif}`
}

const hilih = async (kata) => {
    const response = await fetch('https://ostch.herokuapp.com/api/v1/hilih?kata='+kata);
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status) return `${json.result}`
}

const weather = async (kota) => {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${kota}&appid=insert your openweathermap api here`);
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
    const json = await response.json()
    if (json.status) return `*Wilayah* : ${json.name}\n*Temperatur* : ${json.result.main.temp}*\n`
}

exports.artinama = artinama;
exports.quotes = quotes;
exports.weton = weton;
exports.corona = corona;
exports.alay = alay;
exports.namaninjaku = namaninjaku;
exports.liriklagu = liriklagu;
exports.quotemaker = quotemaker;
exports.yt = yt;
exports.ytmp3 = ytmp3;
exports.gd = gd;
exports.jodoh = jodoh;
exports.hilih = hilih;
exports.weather = weather;
