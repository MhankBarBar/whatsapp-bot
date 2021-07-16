const axios = require('axios')
const { resolve, reject } = require('promise')

const resep = async (menu) => new Promise((resolve, reject) => {
    axios.get('https://masak-apa.tomorisakura.vercel.app/api/search/?q=' + menu)
    .then(async (res) => {
        const { results } = await res.data
        const random = Math.floor(Math.random() * 16)
        axios.get('https://masak-apa.tomorisakura.vercel.app/api/recipe/' + results[random].key)
        .then(async (result) => {
            const { results } = await result.data
            const bahannya = await `${results.ingredient}`
            const bahan = bahannya.replace(/,/g,'\n')
            const tutornya = await `${results.step}`
            const tutornih = tutornya.replace(/,/g,'\n')
            const tutor = tutornih.replace(/.,/g,'\n')
            const hasil = `*Judul:* ${results.title}\n*Penulis:* ${results.author.user}\n*Rilis:* ${results.author.datePublished}\n*Level:* ${results.dificulty}\n*Waktu:* ${results.times}\n*Porsi:* ${results.servings}\n\n*Bahan-bahan:*\n${bahan}\n\n*Step-by-step:*\n${tutor}`
            resolve(hasil)
        })
    })
    .catch((err) => {
        console.log(err)
        reject(err)
    })
})

module.exports = {
    resep
}
