/*
 * "Wahai orang-orang yang beriman, mengapakah kamu mengatakan sesuatu yang tidak kamu kerjakan?
 * Amat besar kebencian di sisi Allah bahwa kamu mengatakan apa-apa yang tidak kamu kerjakan."
 * (QS ash-Shaff: 2-3).
 */
const {
    decryptMedia
} = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const axios = require('axios')
const moment = require('moment-timezone')
const get = require('got')
const os = require('os')
const fetch = require('node-fetch')
const color = require('./lib/color')
const { spawn, exec } = require('child_process')
const nhentai = require('nhentai-js')
const { API } = require('nhentai-api')
const { liriklagu, quotemaker, randomNimek, fb, sleep, jadwalTv, ss } = require('./lib/functions')
const { help, snk, info, donate, readme, listChannel } = require('./lib/help')
const { stdout } = require('process')
const nsfw_ = JSON.parse(fs.readFileSync('./lib/NSFW.json'))
const welkom = JSON.parse(fs.readFileSync('./lib/welcome.json'))
const { RemoveBgResult, removeBackgroundFromImageBase64, removeBackgroundFromImageFile } = require('remove.bg')

/**
 * Get time duration
 * @param {Date} timestamp 
 * @param {Date} now 
 */
const processTime = (timestamp, now) => {
    return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}

moment.tz.setDefault('Asia/Jakarta').locale('id')

const { type, id, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        const { name, formattedTitle } = chat
        let { pushname, verifiedName } = sender
        pushname = pushname || verifiedName
        const commands = caption || body || ''
        const command = commands.toLowerCase().split(' ')[0] || ''
        const args =  commands.split(' ')

        const msgs = (message) => {
            if (command.startsWith('!')) {
                if (message.length >= 10) {
                    return `${message.substr(0, 15)}`
                } else {
                    return `${message}`
                }
            }
        }

        const mess = {
            wait: '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar',
            error: {
                St: '[❗] Kirim gambar dengan caption *!sticker* atau tag gambar yang sudah dikirim',
                Qm: '[❗] Terjadi kesalahan, mungkin themenya tidak tersedia!',
                Yt3: '[❗] Terjadi kesalahan, tidak dapat meng konversi ke mp3!',
                Yt4: '[❗] Terjadi kesalahan, mungkin error di sebabkan oleh sistem.',
                Ig: '[❗] Terjadi kesalahan, mungkin karena akunnya private',
                Ki: '[❗] Bot tidak bisa mengeluarkan admin group!',
                Ad: '[❗] Tidak dapat menambahkan target, mungkin karena di private',
                Iv: '[❗] Link yang anda kirim tidak valid!'
            }
        }
        const apiKey = 'irwangans'
        const RasiApi = 'rasitech'
        const Tchannel = '@RasiTechBotLogs'
        const BotApi = '1490602279:AAFJxEVNiSXDns5m8qFAhtPxz-B3hOLIx3E'
        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        const botNumber = await client.getHostNumber()
        const blockNumber = await client.getBlockedIds()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        const ownerNumber = ["628882611841@c.us", "6285725736656@c.us"] // replace with your whatsapp number
        const isOwner = ownerNumber.includes(sender.id)
        const isBlocked = blockNumber.includes(sender.id)
        const isNsfw = isGroupMsg ? nsfw_.includes(chat.id) : false
        const isPr = pr_.includes(sender.id)
        const isDf = df_.includes(sender.id)
        const isFn = isGroupMsg ? fn_.includes(chat.id) : false
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)
        if (!isGroupMsg && command.startsWith('!')) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname))
        if (isGroupMsg && command.startsWith('!')) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(msgs(command)), 'from', color(pushname), 'in', color(formattedTitle))
        //if (!isGroupMsg && !command.startsWith('!')) console.log('\x1b[1;33m~\x1b[1;37m>', '[\x1b[1;31mMSG\x1b[1;37m]', time, color(body), 'from', color(pushname))
        //if (isGroupMsg && !command.startsWith('!')) console.log('\x1b[1;33m~\x1b[1;37m>', '[\x1b[1;31mMSG\x1b[1;37m]', time, color(body), 'from', color(pushname), 'in', color(formattedTitle))
        if (isBlocked) return
        //if (!isOwner) return
        switch (command) {
            case '!uptext':
                arg = body.trim().split('|')
                if (arg.length >= 4) {
                    const tnomer = arg[1]
                    const tbatas = arg[2]
                    const tbbawah = arg[3]
                    const nomerb = [`${tnomer}@c.us`]
                    const patasb = [`${tbatas}`]
                    const bwahb = [`${tbbawah}`]
                    fs.writeFileSync('./lib/nomer.json', JSON.stringify(nomerb));
                    fs.writeFileSync('./lib/pesanatas.json', JSON.stringify(patasb));
                    fs.writeFileSync('./lib/pbawah.json', JSON.stringify(bwahb));
                    client.reply(from, `Berhasil Menambahkan Text`, message.id)
                }
                let lnomerb = JSON.parse(fs.readFileSync('./lib/nomer.json'))
                let ltatas = JSON.parse(fs.readFileSync('./lib/pesanatas.json'))
                let ltbawah = JSON.parse(fs.readFileSync('./lib/pbawah.json'))
                if (message.body == `${ltatas}`) {
                    client.reply(lnomerb, `${ltbawah}`, message.id)
                    client.reply(from, `Berhasil Mengirim Fake Reply`, message.id)
                    console.log("Berhasil Mengirim Fake Reply")
                }
                break
            case '!sticker':
            case '!stiker':
                if (isMedia && type === 'image') {
                    const mediaData = await decryptMedia(message, uaOverride)
                    const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                    await client.sendImageAsSticker(from, imageBase64)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                    await client.sendImageAsSticker(from, imageBase64)
                } else if (args.length === 2) {
                    const url = args[1]
                    if (url.match(isUrl)) {
                        await client.sendStickerfromUrl(from, url, {
                                method: 'get'
                            })
                            .catch(err => console.log('Caught exception: ', err))
                    } else {
                        client.reply(from, mess.error.Iv, id)
                    }
                } else {
                    client.reply(from, mess.error.St, id)
                }
                break
            case '!stickergif':
            case '!stikergif':
            case '!sgif':
                if (isMedia) {
                    if (mimetype === 'video/mp4' && message.duration < 10 || mimetype === 'image/gif' && message.duration < 10) {
                        const mediaData = await decryptMedia(message, uaOverride)
                        client.reply(from, '[WAIT] Sedang di proses⏳ silahkan tunggu ± 1 min!', id)
                        const filename = `./media/aswu.${mimetype.split('/')[1]}`
                        await fs.writeFileSync(filename, mediaData)
                        await exec(`gify ${filename} ./media/output.gif --fps=30 --scale=240:240`, async function(error, stdout, stderr) {
                            const gif = await fs.readFileSync('./media/output.gif', {
                                encoding: "base64"
                            })
                            await client.sendImageAsSticker(from, `data:image/gif;base64,${gif.toString('base64')}`)
                        })
                    } else(
                        client.reply(from, '[❗] Kirim video dengan caption *!stickerGif* max 10 sec!', id)
                    )
                }
                break
            case '!stickernobg':
            case '!stikernobg':
                if (isMedia) {
                    try {
                        var mediaData = await decryptMedia(message, uaOverride)
                        var imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                        var base64img = imageBase64
                        var outFile = './media/img/noBg.png'
                        // untuk api key kalian bisa dapatkan pada website remove.bg
                        var result = await removeBackgroundFromImageBase64({
                            base64img,
                            apiKey: 'API-KEY',
                            size: 'auto',
                            type: 'auto',
                            outFile
                        })
                        await fs.writeFile(outFile, result.base64img)
                        await client.sendImageAsSticker(from, `data:${mimetype};base64,${result.base64img}`)
                    } catch (err) {
                        console.log(err)
                    }
                }
                break
            case '!donasi':
            case '!donate':
                client.sendLinkWithAutoPreview(from, 'https://saweria.co/donate/irwanxyans', donate)
                break
            case '!tts':
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!tts [id, en, jp, ar] [teks]*, contoh *!tts id halo semua*')
                const ttsId = require('node-gtts')('id')
                const ttsEn = require('node-gtts')('en')
                const ttsJp = require('node-gtts')('ja')
                const ttsAr = require('node-gtts')('ar')
                const dataText = body.slice(8)
                if (dataText === '') return client.reply(from, 'Baka?', id)
                if (dataText.length > 500) return client.reply(from, 'Teks terlalu panjang!', id)
                var dataBhs = body.slice(5, 7)
                if (dataBhs == 'id') {
                    ttsId.save('./media/tts/resId.mp3', dataText, function() {
                        client.sendPtt(from, './media/tts/resId.mp3', id)
                    })
                } else if (dataBhs == 'en') {
                    ttsEn.save('./media/tts/resEn.mp3', dataText, function() {
                        client.sendPtt(from, './media/tts/resEn.mp3', id)
                    })
                } else if (dataBhs == 'jp') {
                    ttsJp.save('./media/tts/resJp.mp3', dataText, function() {
                        client.sendPtt(from, './media/tts/resJp.mp3', id)
                    })
                } else if (dataBhs == 'ar') {
                    ttsAr.save('./media/tts/resAr.mp3', dataText, function() {
                        client.sendPtt(from, './media/tts/resAr.mp3', id)
                    })
                } else {
                    client.reply(from, 'Masukkan data bahasa : [id] untuk indonesia, [en] untuk inggris, [jp] untuk jepang, dan [ar] untuk arab', id)
                }
                break
            case '!nulis':
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!nulis [teks]*', id)
                const nulis = encodeURIComponent(body.slice(7))
                client.reply(from, mess.wait, id)
                let urlnulis = `https://irwanx-api.herokuapp.com/api/nulis?text=${nulis}&apiKey=${apiKey}`
                await fetch(urlnulis, {
                        method: "GET"
                    })
                    .then(res => res.json())
                    .then(async (json) => {
                        await client.sendFileFromUrl(from, json.result, 'Nulis.jpg', 'Nih anjim', id)
                    }).catch(e => client.reply(from, "Error: " + e));
                break
            case '!ytmp3':
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!ytmp3 [linkYt]*, untuk contoh silahkan kirim perintah *!readme*')
                let isLinks = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
                if (!isLinks) return client.reply(from, mess.error.Iv, id)
                try {
                    client.reply(from, mess.wait, id)
                    const resp = await get.get(`https://irwanx-api.herokuapp.com/api/yutub/audio?url=${args[1]}&apiKey=${apiKey}`).json()
                    if (resp.error) {
                        client.reply(from, resp.error, id)
                    } else {
                        const {
                            title,
                            thumb,
                            filesize,
                            result
                        } = await resp
                        if (Number(filesize.split(' MB')[0]) >= 30.00) return client.reply(from, 'Maaf durasi video sudah melebihi batas maksimal!', id)
                        client.sendFileFromUrl(from, thumb, 'thumb.jpg', `➸ *Title* : ${title}\n➸ *Filesize* : ${filesize}\n\nSilahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit.`, id)
                        await client.sendFileFromUrl(from, result, `${title}.mp3`, '', id).catch(() => client.reply(from, mess.error.Yt3, id))
                        //await client.sendAudio(from, result, id)
                    }
                } catch (err) {
                    client.sendText(ownerNumber[0], 'Error ytmp3 : ' + err)
                    client.reply(from, mess.error.Yt3, id)
                }
                break
            case '!ytmp4':
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!ytmp4 [linkYt]*, untuk contoh silahkan kirim perintah *!readme*')
                let isLin = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
                if (!isLin) return client.reply(from, mess.error.Iv, id)
                try {
                    client.reply(from, mess.wait, id)
                    const ytv = await get.get(`https://irwanx-api.herokuapp.com/api/yutub/video?url=${args[1]}&apiKey=${apiKey}`).json()
                    if (ytv.error) {
                        client.reply(from, ytv.error, id)
                    } else {
                        if (Number(ytv.filesize.split(' MB')[0]) > 40.00) return client.reply(from, 'Maaf durasi video sudah melebihi batas maksimal!', id)
                        client.sendFileFromUrl(from, ytv.thumb, 'thumb.jpg', `➸ *Title* : ${ytv.title}\n➸ *Filesize* : ${ytv.filesize}\n\nSilahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit.`, id)
                        await client.sendFileFromUrl(from, ytv.result, `${ytv.title}.mp4`, '', id).catch(() => client.reply(from, mess.error.Yt4, id))
                    }
                } catch (er) {
                    client.sendText(ownerNumber[0], 'Error ytmp4 : ' + er)
                    client.reply(from, mess.error.Yt4, id)
                }
                break
            case '!wiki':
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!wiki [query]*\nContoh : *!wiki asu*', id)
                const query_ = body.slice(6)
                const wiki = await get.get(`https://irwanx-api.herokuapp.com/api/wikipedia?search=${query_}&lang=id&apiKey=${apiKey}`).json()
                if (wiki.error) {
                    client.reply(from, wiki.error, id)
                } else {
                    client.reply(from, `➸ *Query* : ${query_}\n\n➸ *Result* : ${wiki.result}`, id)
                }
                break
            case '!cuaca':
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!cuaca [tempat]*\nContoh : *!cuaca tangerang', id)
                const tempat = body.slice(7)
                const weather = await get.get(`https://irwanx-api.herokuapp.com/api/infocuaca?provinsi=${tempat}&apiKey=${apiKey}`).json()
                if (weather.error) {
                    client.reply(from, weather.error, id)
                } else {
                    client.reply(from, `➸ Tempat : ${weather.result.tempat}\n\n➸ Angin : ${weather.result.angin}\n➸ Cuaca : ${weather.result.cuaca}\n➸ Deskripsi : ${weather.result.desk}\n➸ Kelembapan : ${weather.result.kelembapan}\n➸ Suhu : ${weather.result.suhu}\n➸ Udara : ${weather.result.udara}`, id)
                }
                break
            case '!fb':
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!fb [linkFb]* untuk contoh silahkan kirim perintah *!readme*', id)
                if (!args[1].includes('facebook.com')) return client.reply(from, mess.error.Iv, id)
                client.reply(from, mess.wait, id)
                const epbe = await get.get(`https://mhankbarbars.moe/api/epbe?url=${args[1]}&apiKey=${apiKey}`).json()
                if (epbe.error) return client.reply(from, epbe.error, id)
                client.sendFileFromUrl(from, epbe.result, 'epbe.mp4', epbe.title, id)
                break
            case '!creator':
                client.sendContact(from, '628882611841@c.us')
                break
            case '!ig':
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!ig [linkIg]* untuk contoh silahkan kirim perintah *!readme*')
                if (!args[1].match(isUrl) && !args[1].includes('instagram.com')) return client.reply(from, mess.error.Iv, id)
                try {
                    client.reply(from, mess.wait, id)
                    const resp = await get.get(`https://mhankbarbar.moe/api/ig?url=${args[1]}&apiKey=${apiKey}`).json()
                    if (resp.result.includes('.mp4')) {
                        var ext = '.mp4'
                    } else {
                        var ext = '.jpg'
                    }
                    await client.sendFileFromUrl(from, resp.result, `igeh${ext}`, '', id)
                } catch {
                    client.reply(from, mess.error.Ig, id)
                }
                break
            case '!nsfw':
                if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
                if (args.length === 1) return client.reply(from, 'Pilih enable atau disable!', id)
                if (args[1].toLowerCase() === 'enable') {
                    nsfw_.push(chat.id)
                    fs.writeFileSync('./lib/NSFW.json', JSON.stringify(nsfw_))
                    client.reply(from, 'NSWF Command berhasil di aktifkan di group ini! kirim perintah *!nsfwMenu* untuk mengetahui menu', id)
                } else if (args[1].toLowerCase() === 'disable') {
                    nsfw_.splice(chat.id, 1)
                    fs.writeFileSync('./lib/NSFW.json', JSON.stringify(nsfw_))
                    client.reply(from, 'NSFW Command berhasil di nonaktifkan di group ini!', id)
                } else {
                    client.reply(from, 'Pilih enable atau disable udin!', id)
                }
                break
            case '!welcome':
                if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
                if (args.length === 1) return client.reply(from, 'Pilih enable atau disable!', id)
                if (args[1].toLowerCase() === 'enable') {
                    welkom.push(chat.id)
                    fs.writeFileSync('./lib/welcome.json', JSON.stringify(welkom))
                    client.reply(from, 'Fitur welcome berhasil di aktifkan di group ini!', id)
                } else if (args[1].toLowerCase() === 'disable') {
                    welkom.splice(chat.id, 1)
                    fs.writeFileSync('./lib/welcome.json', JSON.stringify(welkom))
                    client.reply(from, 'Fitur welcome berhasil di nonaktifkan di group ini!', id)
                } else {
                    client.reply(from, 'Pilih enable atau disable udin!', id)
                }
                break
            case '!delete':

                if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
                if (!isGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
                if (!quotedMsg) return client.reply(from, 'Salah!!, kirim perintah *!delete [tagpesanbot]*', id)
                if (!quotedMsgObj.fromMe) return client.reply(from, 'Salah!!, Bot tidak bisa mengahpus chat user lain!', id)
                client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
                break
            case '!ttp':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!ttp [Teks]*', id)
                const ttp = await get.get(`https://st4rz.herokuapp.com/api/ttp?kata=${body.slice(5)}`).json()
                await client.sendImage(from, ttp.result, id)
                break
            case '!texts':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!texts [Teks]*', id)
                const texts = await get.get(`https://st4rz.herokuapp.com/api/ttp?kata=${body.slice(7)}`).json()
                await client.sendImageAsSticker(from, texts.result, {
                    method: 'get'
                })
                break
            case '!ts':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                const textToImage = require('text-to-image');
                textToImage.generate(body.slice(4), {
                    debug: true,
                    maxWidth: 450,
                    fontSize: 50,
                    fontFamily: 'Arial',
                    lineHeight: 450,
                    margin: 5,
                    textAlign: 'center',
                    bgColor: "transparent",
                    textColor: "white"
                }).then(function(dataUri) {
                    client.sendImage(from, dataUri)
                });
                break
            case '!ts2':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                client.sendFileFromUrl(from, `https://api.arugaz.my.id/api/flamingtext/water?text=${body.slice(5)}`)
                get.get(`https://api.telegram.org/bot${BotApi}/sendMessage?chat_id=${Tchannel}&text=Dari : ${from}%0A${err}`).json()
                break
            case '!blackpink':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!blackpink [Teks]*', id)
                await client.sendFileFromUrl(from, `https://api.arugaz.my.id/api/textpro/blackpink?text=${body.slice(11)}`, `blackp.jpg`)
                break
            case '!3d':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!3d [Teks]*', id)
                await client.sendFileFromUrl(from, `https://api.arugaz.my.id/api/flamingtext/text3d?text=${body.slice(4)}`, `3d.jpg`)
                break
            case '!text':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!text [Teks]*', id)
                await client.sendFileFromUrl(from, `https://rt-files.000webhostapp.com/text.php?text=${body.slice(6)}`, `text.jpg`)
                await client.sendStickerfromUrl(from, `https://rt-files.000webhostapp.com/text.php?text=${body.slice(6)}`)
                break
            case '!glow':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!glow [Teks]*', id)
                const glow = await get.get(`http://zeksapi.herokuapp.com/api/tlight?text=${body.slice(6)}&apikey=apivinz`).json()
                await client.sendFileFromUrl(from, glow.result, `glow.jpg`)
                break
            case '!textimg':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!textimg [Teks]*', id)
                const ti = await get.get(`http://mhankbarbars.herokuapp.com/api/text2image?text=${body.slice(9)}`).json()
                client.sendFileFromUrl(from, ti.result, `ti.jpeg`, `nih`, id)
                break
            case '!koin':

                const listcoin = ["http://rt-files.000webhostapp.com/file/500-Rupiah-Jasmine-removebg-preview.png", "http://rt-files.000webhostapp.com/file/500-Rupiah-Jasmine-back-removebg-preview.png", "http://rt-files.000webhostapp.com/file/500-Rupiah-Jasmine-removebg-preview.png", "http://rt-files.000webhostapp.com/file/500-Rupiah-Jasmine-back-removebg-preview.png"]
                let coin = listcoin[Math.floor(Math.random() * listcoin.length)]
                await client.sendStickerfromUrl(from, coin, {
                    method: 'get'
                })
                break
            case '!gbk':

                const listgbk = ["https://data5.sticker.fan/stickers_storage/2020/03/24/file_1936553_128x128.png", "https://data5.sticker.fan/stickers_storage/2020/03/24/file_1936554_128x128.png", "https://data5.sticker.fan/stickers_storage/2020/03/13/file_1936552_128x128.png"]
                let gbk = listgbk[Math.floor(Math.random() * listgbk.length)]
                if (args.length === 1) return await client.sendStickerfromUrl(from, gbk, {
                    method: 'get'
                })
                if (args[1] === 'g') {
                    await client.sendStickerfromUrl(from, `https://data5.sticker.fan/stickers_storage/2020/03/24/file_1936554_128x128.png`, {
                        method: 'get'
                    })
                } else if (args[1] === 'b') {
                    await client.sendStickerfromUrl(from, `https://data5.sticker.fan/stickers_storage/2020/03/13/file_1936552_128x128.png`, {
                        method: 'get'
                    })
                } else if (args[1] === 'k') {
                    await client.sendStickerfromUrl(from, `https://data5.sticker.fan/stickers_storage/2020/03/24/file_1936553_128x128.png`, {
                        method: 'get'
                    })
                } else {
                    await client.sendStickerfromUrl(from, gbk, {
                        method: 'get'
                    })
                }
                break
                break
            case '!color2img':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!color2img [HexColor]*', id)
                const color2img = await get.get(`https://singlecolorimage.com/get/${args[1]}/250x250`).json()
                client.sendFileFromUrl(from, color2img, 'color2img.jpg', `:)`, id)
                break
            case '!kusuka':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!kusuka [@tagmember]*', id)
                const kusuka = await get.get(`https://ferboesrichardson.files.wordpress.com/2015/07/wpid-fb_img_1436512053401-picsay.jpg`).json()
                client.sendFileFromUrl(from, kusuka, 'kusuka.jpg', `Ciee Ciee Suka Sama ${args[1]}`, id)
                break
            case '!peluk':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!peluk [@tagmember]*', id)
                client.sendGiphy(from, `https://media.giphy.com/media/nrU97UnmhQt6bpd0Ii/giphy.gif`, `Memeluk ${args[1]}`)
                break
            case '!cium':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!cium [@tagmember]*', id)
                client.sendGiphy(from, `https://media.giphy.com/media/f82EqBTeCEgcU/giphy.gif`, `Mencium ${args[1]}`)
                break
            case '!tampar':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!tampar [@tagmember]*', id)
                client.sendGiphy(from, `https://media.giphy.com/media/uqSU9IEYEKAbS/giphy.gif`, `Menampar 👋 ${args[1]}`)
                break
            case '!pepe':

                const pepe = await client.getProfilePicFromServer(from)
                client.sendImage(from, pepe, id)
                break
            case '!pp':

                if (mentionedJidList[0].length === 1) return client.reply(from, 'Kirim perintah *!pp [@tagmember]*', id)
                const pp = await client.getProfilePicFromServer(mentionedJidList[0])
                client.sendImage(from, pp, id)
                break
            case '!reportspam':

                if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!reportspam [nomor]*', id)
                client.reportSpam(args[1])
                client.reply(from, `Berhasil melaporkan ${args[1]} kepada pihak WhatsApp!`, id)
                break
            case '!gantilink':

                if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                client.revokeGroupInviteLink(from)
                client.reply(from, `Berhasil merubah link group!`, id)
                break
            case '!keroyok':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!keroyok [@tagmember]*', id)
                client.sendGiphy(from, `https://media.giphy.com/media/9GIDPFF1CeOjq7hlfP/giphy.gif`, `Yuk Keroyok ${args[1]}\nTag ${args[1]} = Keroyok`)
                break
            case '!ruqiyah':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!ruqiyah [@tagmember]*', id)
                client.sendGiphy(from, `https://media.giphy.com/media/l46CsaquyQudrz3Lq/giphy.gif`, `Sedang meruqiyah ${args[1]}`)
                break
            case '!loveu':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!love [@tagmember]*', id)
                client.sendGiphy(from, `https://media.giphy.com/media/HPI9m7McNPGN2/giphy.gif`, `${args[1]} Mendapat Love ❤️`)
                client.reply(from, `❤️`, id)
                break
            case '!kabur':

                client.reply(from, `Yuk Kabur 🏃‍♀️`, id)
                break
            case '!doa':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!doa [@tagmember] [Pesan doa]*', id)
                client.sendGiphy(from, `https://media.giphy.com/media/3ohzdWvAMBhrtBEC2Y/giphy.gif`, `Mari Kita Doakan ${args[1]} Supaya ${args[1]}`)
                break
            case '!kutuk':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!kutuk [@tagmember] [emoji/kutukan]*', id)
                client.reply(from, `Mengutuk ${args[1]} Menjadi ${args[2]}`, id)
                break
            case '!bogem':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!bogem [@tagmember]*', id)
                client.sendGiphy(from, `https://media.giphy.com/media/arbHBoiUWUgmc/giphy.gif`, `Membogem ${args[1]}`)
                break
            case '!kopi':

                if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
                if (!isPr) return client.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!kopi [text]*', id)
                const ngopi2 = await get.get(`https://coffee.alexflipnote.dev/random.json`).json()
                client.sendFileFromUrl(from, ngopi2.file, 'kopi.jpg', `${body.slice(6)}`, id)
                break
            case '!profile':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                const profile = await get.get(`https://randomuser.me/api/?format=json`).json()
                await client.sendStickerfromUrl(from, profile.large, {
                    method: 'get'
                })
                client.reply(from, `*Gender :* ${profile.gender}\n\n*Name :* ${profile.name}\n\n*Location :* ${profile.street}\n\n*Email :* ${profile.email}\n\n*login :* ${profile.login}\n\n*Dob :* ${profile.dob}\n\n*Registered :* ${profile.registered}\n\n*Phone :* ${profile.phone}\n\n*Cell :* ${profile.cell}\n\n*ID :* ${profile.id}\n\n*Nat :* ${profile.nat}`, id)
                break
            case '!nmap':

                const nmap = await get.get(`https://rasi-tech-api.000webhostapp.com/nmap.php?apikey=${RasiApi}&q=${args[1]}`).json()
                client.reply(from, nmap.result, id)
                break
            case '!fml':

                const dml = await get.get(`https://api.i-tech.id/tools/fml?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG`).json()
                client.reply(from, dml.result, id)
                break
            case '!cekno':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!cekno [628xxx]*', id)
                const cekno = await get.get(`http://apilayer.net/api/validate?access_key=ec3bb1b2ae4d3561b29ea84ea24fdd60&number=${args[1]}&country_code=&format=1`).json()
                client.reply(from, `Valid : ${cekno.valid}\nNomor : ${cekno.number}\nLocal Format : ${cekno.local_format}\nInternational Format : ${cekno.international_format}\nCountry Prefix : ${cekno.country_prefix}\nCountry Code : ${cekno.country_code}\n Coutry Name : ${cekno.country_name}\nLocation : ${cekno.location}\nCarrier : ${cekno.carrier}\nLine Type : ${cekno.line_type}`, id)
                break
            case '!wa':

                const wa = await get.get(`https://rt-files.000webhostapp.com/wa.php?jum=${args[1]}&apikey=${RasiApi}`).json()
                client.reply(from, wa.result, id)
                break
            case '!readmore':

                arg = body.trim().split('|')
                if (arg.length >= 3) {
                    client.reply(from, mess.wait, id)
                    const k1t = encodeURIComponent(arg[1])
                    const k2t = encodeURIComponent(arg[2])
                    client.reply(from, `${k1t.replace(/%20/g,'')}
                ‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
                ${k2t.replace(/%20/g,' ')}`, id)
                } else {
                    client.reply(from, 'Masukan Seperti ini !readmore |teks1|teks2|\n\n*!readmore |Habis ini klik baca selengkapnya|Setelah klik Baca Selengkapnya|*\n\nGaris | yang berada di tengah itu sebagai tombol baca selengkapnya.', id)
                }
                break
            case '!cek':

                const cek = client.checkNumberStatus(`${args[1]}@c.us`)
                if (cek == 'false') return client.reply(from, '*Nomor tidak terdaftar di WhatsApp*', id)
                client.reply(from, '*Nomor telah terdaftar di WhatsApp*', id)
                break
            case '!emoji':

                var emoji = fs.readFileSync(`./lib/emoji.txt`, 'utf8')
                client.reply(from, emoji, id)
                break
            case '!email':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                const listemail = ["wtrxzj@1secmail.net", "6ay0ok448d@esiix.com", "swrhq16kp@wwjmp.com", "3788svoks42f@1secmail.net", "zbes2th5@1secmail.org", "bugi4f@1secmail.net", "fe2jt07p@1secmail.org", "reb9l79xxix8@1secmail.net", "rkzmdgl@esiix.com", "36w5df0lq5r@1secmail.org", "9cdu2qodi@wwjmp.com", "ic1f2vvwc@1secmail.com", "paqp4k45@wwjmp.com", "j3i74uc@1secmail.net", "4ht0q9gsub@1secmail.net", "ir8lfdx3@1secmail.net", "7to3iwy9@wwjmp.com", "4nwkzygtpm@1secmail.net", "00izo6@1secmail.net", "xnkufdg@esiix.com", "x3pc7oow99of@1secmail.com", "am2szxv8a@esiix.com", "cvorai@1secmail.com", "o7rva6ws8k7q@1secmail.org", "dajirl6wkj@wwjmp.com", "jfso501z71u@1secmail.com", "49c21s@1secmail.com", "ly4gnhz@wwjmp.com", "12z1h6dh6p@1secmail.org", "yy06fjm@wwjmp.com", "5eg0ws4ceza@1secmail.net", "9ceazm@1secmail.net", "pb8tm4cca5a@1secmail.org", "qtg2m7@1secmail.net", "gnsxxigd7j3@1secmail.org", "i3shrg@1secmail.net", "4u5jodxtg9u@1secmail.net", "0h2ibt6@esiix.com", "givexobd@wwjmp.com", "umhnhs@1secmail.org", "6ixifo4wve8@1secmail.com", "tb46xeood@1secmail.net", "drdkzw74e@1secmail.org", "acc9p7haoei@1secmail.com", "j1em049jc@wwjmp.com", "1l87wzk7c@esiix.com", "5y39zws@1secmail.net", "y5byk45@1secmail.org", "26mqn4@1secmail.org", "qqqm6qk8ki4e@esiix.com", "ech5pel5@1secmail.net", "znp9r3lj9x@1secmail.com", "zree4wczth@1secmail.com", "93bn5fuxlw@wwjmp.com", "q7om4i3@1secmail.org", "aysr6zbseh2q@1secmail.com", "opx8t0aqz1@wwjmp.com", "appq6yb@1secmail.net", "kq9ymss@1secmail.com", "c6bi2f3y@wwjmp.com", "k1e3gl@esiix.com", "nhu6bh0x@1secmail.org", "octxk2@wwjmp.com", "9jtmja@esiix.com", "ld54995o@1secmail.org", "viiurnrv@esiix.com", "po204pdxbt@esiix.com", "g0uw2hqj@1secmail.net", "9pre7i2o7h1@1secmail.com", "mv27sjq6h310@1secmail.org", "3ykokpghch65@1secmail.org", "o18cbj81ix@1secmail.org", "i4owa7@1secmail.net", "pm11xgcl@1secmail.org", "h4lhm0k@wwjmp.com", "fepcx9@1secmail.com", "cvy4n4hm@esiix.com", "fcose60@esiix.com", "j2qvr8z@1secmail.org", "y9w1a3skgqh@wwjmp.com", "cw70pynqs@1secmail.net", "29i9q3pi@1secmail.net", "r7kcwjq@1secmail.net", "tl4q7pnwt@1secmail.net", "dtjyzu9@wwjmp.com", "dzx5gq@wwjmp.com", "i82c8a@wwjmp.com", "0a5mi60@1secmail.com", "1xrbgu5pmp32@1secmail.net", "qdxvaojsdp@1secmail.com", "cbg61gx@esiix.com", "5tuzsp3zu5z@esiix.com", "gqfu6pe3@1secmail.com", "onl5sy@esiix.com", "dr9h8fg@wwjmp.com", "uw8kljo@1secmail.com", "pgkcka6@1secmail.net", "9lixusyr@1secmail.org", "86hxracr5f@wwjmp.com", "xl8nbh@esiix.com", "4q92iixq@1secmail.com", "ntyhzm@esiix.com", "r00ok37u9g@1secmail.net", "lhhkpe57pv2@1secmail.com", "a43pshmz7r@1secmail.org", "tcul3mquz2ww@wwjmp.com", "aagif0@esiix.com", "mqcykgk0nhr@1secmail.com", "yawcwm42a@1secmail.org", "3l8h96f971nd@wwjmp.com", "7eh6bsk37hp@1secmail.org", "aacxh0j41w@1secmail.com", "oznsn8tm337@1secmail.com", "d68dhuk1xgx@1secmail.com", "67vivwq@1secmail.net", "p35y7m0atk0a@1secmail.com", "1xsc1mb@1secmail.com", "owqj3c44@1secmail.org", "ywe16mi1w3l@esiix.com", "o01xe9ne53@esiix.com", "bbbh46advv8g@esiix.com", "re5aqs5adb0v@1secmail.com", "kpqn4ihyny@1secmail.net", "7bsteddwb@wwjmp.com", "7esetjob@1secmail.com", "hs8w9p1oc5c@esiix.com", "qk3ff3h2n@1secmail.com", "zvjqv6vn@wwjmp.com", "182f2lym@1secmail.org", "0sohxxr@1secmail.org", "usbzpnyra@esiix.com", "d1wf7di@1secmail.org", "gjcl7ft6pb7o@1secmail.net", "np9jbr@1secmail.com", "mlgy08u9@1secmail.org", "spp0dod@esiix.com", "8ce75uqw@wwjmp.com", "f6bp12t1@esiix.com", "pibc3smmcp@esiix.com", "n9birzd@1secmail.com", "95shm0hqq@esiix.com", "i1x7p36m4dp5@1secmail.net", "rm5lmq8ek@1secmail.net", "3dgzkxozd@wwjmp.com", "ogc5t9o7qq@wwjmp.com", "dnq6cghb3cb@1secmail.net", "ln26m0zsmxj@esiix.com", "rk3upf8z@esiix.com", "95nd71@1secmail.org", "twv92v4e@wwjmp.com", "5npm45ig@wwjmp.com", "z6dzzdoq@1secmail.com", "ms2bj2ihny0c@esiix.com", "gz5idpwv1@wwjmp.com", "k29wy0m@1secmail.org", "byk944qcmm5@1secmail.com", "3o4f99k@1secmail.org", "zd72kh2atk@esiix.com", "mw6vrc0n9d@1secmail.org", "jltjv4aq8ys0@1secmail.com", "juqxad@1secmail.net", "nnd80ovbs5y@1secmail.org", "rly5f049pyb@1secmail.org", "yazu63b5@1secmail.com", "43r81p7cwv@esiix.com", "6i4ifc1yrg@1secmail.com", "8mnfi666x2@1secmail.net", "k70igcl8v@wwjmp.com", "p0wvcj@1secmail.org", "zim7ssn@1secmail.net", "9fu3py6j8a8u@wwjmp.com", "faqnp4oxai8t@1secmail.net", "nxnbe5@1secmail.org", "s4a4c9tt@1secmail.com", "vjdl20atlgjm@wwjmp.com", "ccs17sr@1secmail.net", "2oppm9r85ii@1secmail.net", "o4xil3b@wwjmp.com", "uykncg3u4rr6@1secmail.net", "avnps7@esiix.com", "pmem6v7@esiix.com", "hn7dtr0l@esiix.com", "zjxhj8jb4hd@esiix.com", "8evzlu8ukr8w@1secmail.com", "waec2pesrln@esiix.com", "eaq1c3yaop@1secmail.org", "jqp2o6@1secmail.com", "rmmy7w3gn0pz@1secmail.com", "rjw5ki1@1secmail.net", "q8i8az3kv6v3@wwjmp.com", "u84j2oa9ia@esiix.com", "pku8ly50@esiix.com", "06pri8nf@1secmail.com", "dqii7dsh@esiix.com", "4wa2z8o44@esiix.com", "rrvttimy@1secmail.com", "n8o0i1d9@wwjmp.com", "2azrcd@1secmail.com", "ft3taviy6ac@1secmail.com", "9m7677vh7e7@1secmail.net", "cq1rhwv@1secmail.net", "41knqfb@esiix.com", "8tdzgw5@1secmail.org", "90yyv4nfzfn@esiix.com", "td363x@wwjmp.com", "olxndt@wwjmp.com", "n9uabnyfq@wwjmp.com", "wugwt9e4@1secmail.net", "iie4iciufb@esiix.com", "1pybbvz@1secmail.org", "34pv1z2p@esiix.com", "3rww1j@1secmail.org", "fhgp3ae8xq9t@1secmail.org", "rw5ech4td@esiix.com", "5akxj3t3@1secmail.net", "ba7200h0nu20@wwjmp.com", "7fwldf0gc9y@wwjmp.com", "dmmk6yj8ka72@esiix.com", "keo0kqtsq@1secmail.org", "3h08ovxy9@wwjmp.com", "i12kf482gyk@1secmail.org", "qfl2s6b0aq@1secmail.org", "ri78jmrxxuh@1secmail.org", "e9vm51kvq@1secmail.net", "wszyen0x2k@1secmail.com", "x58ws78@1secmail.org", "t3cq1iru0g4j@1secmail.org", "nmfhu25ick1@1secmail.org", "ds41xuri@esiix.com", "b5g417@1secmail.org", "r09e9t@wwjmp.com", "q3shf790t9n@1secmail.org", "jkvux4vdmvkm@1secmail.org", "kh54l79svn3@wwjmp.com", "vue0582@wwjmp.com", "l5ctisywyug2@esiix.com", "nmlu8zoyemrf@esiix.com", "0omz3ajunjg4@wwjmp.com", "r07ev8ho1tkc@wwjmp.com", "ibnbobdw@1secmail.net", "y69i6fks2@esiix.com", "up5n0vih18lz@1secmail.org", "a1vosjqtbkt@1secmail.org", "nrozsi7@wwjmp.com", "dxzdxnnw@wwjmp.com", "6d4xcc@wwjmp.com", "zcp7pu@1secmail.org", "et1g970w4c1@1secmail.org", "p653pkeivh@1secmail.com", "yjk4zag@1secmail.com", "2xi3f86jne@1secmail.net", "2dd5nk@1secmail.net", "le917k@esiix.com", "3eu8soqbo@1secmail.org", "1du508dm3@esiix.com", "wo97hsrb@1secmail.org", "4ht44ginn@wwjmp.com", "f3aerl9p3@1secmail.com", "kt18ul@1secmail.org", "g0h5yozn7gj@1secmail.org", "0wqy6v89@1secmail.net", "o7l8s9@wwjmp.com", "ik25l8137003@esiix.com", "i0l9fr8f0@1secmail.com", "077ola6xhl7@esiix.com", "nzgsdc1wi@1secmail.org", "tft0xzq27m@1secmail.com", "cc42cn9um@esiix.com", "3vn5fwxplik@1secmail.net", "awyu9ujv@1secmail.net", "kcokw8@wwjmp.com", "8r4soj@1secmail.com", "ynav1cdp4@1secmail.org", "ghkfamyr5p5e@1secmail.com", "zni5r7pvsvsh@esiix.com", "kmog11q4x10@1secmail.org", "gzivoevmwtdy@1secmail.net", "6ii91fc2j@1secmail.net", "9x79ubhz@1secmail.org", "1rq3xavg935@1secmail.net", "843xcnms571c@esiix.com", "fhipqwib@1secmail.net", "sn5qv9sf1tti@wwjmp.com", "jr9r31l@1secmail.net", "sg8d0lv91k@1secmail.org", "h88gsi7@1secmail.net", "7u48n2cksac@1secmail.net", "qr82lqo28@1secmail.com", "ntghkvzpys0o@1secmail.com", "vy1g007rc4ga@esiix.com", "29v49ebrxpk@esiix.com", "oaccnfsxb61@1secmail.com", "iu97cq4dl@wwjmp.com", "slm04j9i@1secmail.net", "m9xm8dg@1secmail.org", "7eimqonojz3y@1secmail.com", "dq5w4z7c8@esiix.com", "7kh9fs7sx@1secmail.org", "0qo5pd@1secmail.net", "a4i4xt7f@1secmail.net", "drbi1jdora@1secmail.net", "fxvbo5o@1secmail.com", "aq59ujxnpm0@esiix.com", "u4zbe88r2y@wwjmp.com", "3navhyb@1secmail.org", "0thm55gy18fr@esiix.com", "jlviswce@1secmail.org", "dlae5c@esiix.com", "fyfqv0@wwjmp.com", "29uxtpze@esiix.com", "m8xu43@1secmail.com", "qgsuch6z@wwjmp.com", "ic16cz0pd@esiix.com", "gj2p9cqj0j@wwjmp.com", "qwcis2q7p1@1secmail.com", "93o1zdib@1secmail.org", "3h2dwhkjn6p@1secmail.net", "gurhex0d8s99@esiix.com", "tvs8tlvx2drj@wwjmp.com", "bqkrpq5prh@1secmail.net", "iybtpqh@wwjmp.com", "5dx46514@1secmail.net", "ndn9bhosm@1secmail.net", "80r9nqyphyfj@wwjmp.com", "sk81z92pncv@1secmail.org", "yf7miojjqir@wwjmp.com", "raims5@esiix.com", "1eix77kwte@1secmail.org", "50ogkyj49x@1secmail.net", "34624x5af1b1@wwjmp.com", "dbjc1cpnxi5@1secmail.org", "1e6st0zuw62@1secmail.com", "7w6jkz@esiix.com", "z9axoz4@wwjmp.com", "4rktsj@1secmail.org", "1ue8tcd@esiix.com", "qag4fcbe50@wwjmp.com", "z5lu0l0m1t@esiix.com", "3vhbwaeg@1secmail.com", "y67906np@1secmail.com", "w67zui63@1secmail.org", "rb7qml6o7x@1secmail.com", "azz6yiumn@1secmail.org", "4r6w0aph@1secmail.net", "tn5n08u5r87@1secmail.org", "fay4h2g@wwjmp.com", "xh9alk7u@1secmail.net", "tyqt810m60@wwjmp.com", "k02xiyfre40a@esiix.com", "tupgwcef@wwjmp.com", "t2hamb7z@1secmail.com", "k7rijmj7v@esiix.com", "odh49hlk@wwjmp.com", "4psptqw2to9@wwjmp.com", "d23ook@wwjmp.com", "wor3ik3vh1@1secmail.org", "hfg0d6ttro@wwjmp.com", "j73kj3@esiix.com", "gfqrqr8pb7@1secmail.com", "vgvgxzg@1secmail.net", "2h1q40ygrj@1secmail.com", "thq01enrd7@1secmail.com", "mu80udm7vfbl@esiix.com", "d0kmzl@wwjmp.com", "fq4f7dasg5a@esiix.com", "eci52ye@wwjmp.com", "5gzermlj7o5@esiix.com", "8onwag5d@esiix.com", "6t291h@wwjmp.com", "ggdlos@1secmail.org", "ikr548dn@1secmail.net", "41umo5f@1secmail.net", "43rpju6@esiix.com", "g9nz10w@1secmail.net", "0bn93e8m3@1secmail.com", "p66q3ywzwpz@wwjmp.com", "3xyagkpebofj@esiix.com", "hdhbhhksbu@1secmail.org", "ceb5mrmz@1secmail.net", "wpfotwu@1secmail.com", "jae62hdr@1secmail.com", "dmjkprqv8rr@wwjmp.com", "fqf93vcb2ml@wwjmp.com", "kumrszeuj@1secmail.org", "awxki891y5k9@esiix.com", "s6cv4qzs@1secmail.net", "79wrsw9nnd@wwjmp.com", "70uhrc@wwjmp.com", "odxdazzv@1secmail.com", "8yncfb667@wwjmp.com", "i8j6zq@1secmail.org", "if6csox5c@1secmail.net", "og2b9mkigop@1secmail.org", "113mzw6wb3@1secmail.net", "39343sr7kcr@1secmail.net", "s8hc0w@1secmail.net", "5vatlxsim1y@1secmail.net", "2ubtvi8kp@1secmail.org", "u9xcqrfe436c@1secmail.net", "4e1xx5iu8@1secmail.org", "3fowmgew@1secmail.org", "h2qqloy9@esiix.com", "qho4csw@esiix.com", "20qdwvkw2@1secmail.com", "r84s9e@wwjmp.com", "aqmex8w@1secmail.net", "mdww2u6@1secmail.com", "ig3i3lbts@wwjmp.com", "g25lgje9@1secmail.net", "ozfiws@esiix.com", "w4eyrbc2o8@esiix.com", "akdx01t7t@1secmail.com", "3usaz3e@esiix.com", "miswyk0b0z@wwjmp.com", "53weojwsmf@1secmail.com", "e457zzbxyk@esiix.com", "4qmabbuu13@esiix.com", "kbydvejt@wwjmp.com", "scbczlys8yov@wwjmp.com", "grfxiz@1secmail.net", "gjp5jlkpm@esiix.com", "b6qsxag5fz@1secmail.org", "7hh7dj@1secmail.com", "gkp39fde@1secmail.org", "bzknx9066bh@1secmail.org", "hbgnec2rbn1@1secmail.com", "76zwlv@1secmail.com", "mqxoly6x9bpl@esiix.com", "jr5wxd9@wwjmp.com", "qidh8p@1secmail.com", "c25of7bnwcpp@1secmail.net", "vwz6cqpghe@esiix.com", "aqxt5fpp52@1secmail.com", "7vj6rbxt@1secmail.com", "om56hxr@1secmail.net", "puocqlz@wwjmp.com", "af2yp42r4wg7@1secmail.com", "hfvn12@1secmail.net", "5azo3k@1secmail.net", "70bfvvnb2mc5@esiix.com", "lk2k21cn4bj@esiix.com", "zr70r34aug@esiix.com", "rv2qf57@1secmail.net", "6t6xbp9iqg@esiix.com", "q3tjwtm@esiix.com", "k7evgcyzg@esiix.com", "ob7s3etb@1secmail.org", "hvofwz6o0@1secmail.com", "b93f9n1n@1secmail.org", "mj5998foxyz2@1secmail.org", "2lyioqqo0y2z@1secmail.com", "ukorae22apo@1secmail.com", "kyjvyede67i@1secmail.net", "k4foj6w8@esiix.com", "su52kf@1secmail.net", "lo317wzj@1secmail.org", "6fekwcd1h@esiix.com", "dd3gwyxpoe@esiix.com", "os5dudu@1secmail.org", "44eosn18@1secmail.com", "j4e3tibvoq@esiix.com", "u66vfc@1secmail.net", "eyihdakev@esiix.com", "935wsh2zov75@1secmail.net", "mwitav3@esiix.com", "8uvr05j6@esiix.com", "ep6qn5u@esiix.com", "4qfq63@wwjmp.com", "kmpmc6on2b5i@1secmail.org", "027el4@wwjmp.com", "vve006b4po6@1secmail.com", "lhx4eqnqft2@esiix.com", "0k6hvr@esiix.com", "76d3f5@1secmail.org", "bu4dye2g@1secmail.net", "4jautlvqy6a@1secmail.com", "1ats85affp@1secmail.com", "9w94ysu6q@1secmail.org", "d06a66a@1secmail.com", "8w9n8kickaqn@1secmail.org", "8v21skwtp6v@1secmail.org", "moji4hv4mtjv@esiix.com", "kmikpmh@wwjmp.com", "89db5yz2qi@1secmail.com", "cjbsrixj9ec@wwjmp.com", "0bk24vc4d9re@esiix.com", "lzwojigorx@wwjmp.com", "mf8m8ti7z@esiix.com", "w3dhycdrkc@1secmail.net", "yv1hkcgcf@esiix.com", "zq8dlwxprxz@wwjmp.com", "igv57o@1secmail.org", "a6uziycw@wwjmp.com", "p36k68zv625z@wwjmp.com", "8b894em@1secmail.org", "gd2lpj8e@1secmail.net", "d2mx0gipktt@1secmail.com", "7dy6200bxeqp@1secmail.net", "kexct1itskys@1secmail.org", "u2t73v0@1secmail.org"]
                let email = listemail[Math.floor(Math.random() * listemail.length)]
                client.reply(from, `Email : ${email}\nCek isi : https://www.1secmail.com/\nGenerate by : Devaaa Bot`, id)
                break
            case '!isiemail':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                arg = body.trim().split('@')
                if (arg.length >= 1) {
                    client.reply(from, mess.wait, id)
                    const email = encodeURIComponent(arg[1])
                    const domain = encodeURIComponent(arg[2])
                    const isiemail = await get.get(`https://www.1secmail.com/api/v1/?action=getMessages&login=${email}&domain=${domain}`).json()
                    client.reply(from, `ID Message : ${isiemail.id}\nFrom : ${isiemail.from}\nSubject : ${isiemail.subject}\nDate : ${isiemail.date}`, id)
                } else {
                    client.reply(from, 'Masukan Seperti ini !isiemail test@gmail.com\n\n*!isiemail irwan@gmail.com* email di dapatkan dari !email', id)
                }
                break
            case '!check':

                if (!isPr) return client.reply(from, 'Anda bukan akun premium, silahkan chat owner jika ingin menjadikan premium.\n\nCara membayar cukup berdonasi minimal 10K ke admin maka anda akan menjadi premium.', id)
                client.reply(from, `Anda sudah menjadi akun premium.`, id)
                break
            case '!faced':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!faced [link gambar]\n\nSilahkan Upload ke http://rt-files.000webhostapp.com/ atau ke situs lain, intinya gambarmu harus jadi link.*', id)
                if (!args[1].match(isUrl)) return client.reply(from, `Link yang anda masukan salah!\n\nSilahkan Upload ke http://rt-files.000webhostapp.com/ atau ke situs lain, intinya gambarmu harus jadi link.`, id)
                const faced = await get.get(`https://api.i-tech.id/special/detect?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&link=${args[1]}`).json()
                client.sendFileFromUrl(from, faced.pictures, 'faced.jpg', `Umur : ${faced.age}\nKelamin : ${faced.gender}\nSenyum : ${faced.smile}\nKaca Mata : ${faced.glasses}\nKemarahan : ${faced.anger}\nJelek : ${faced.contempt}\nJiji : ${faced.disgust}\nTakut : ${faced.fear}\nBahagia : ${faced.happiness}\nNetral : ${faced.neutral}\nSedih : ${faced.sadness}\nKejutan\Kaget : ${faced.surprise}`, id)
                break
            case '!yesno':

                const yesno = await get.get(`https://yesno.wtf/api`).json()
                client.sendStickerfromUrl(from, yesno.image, 'yesno.gif', yesno.answer, id)
                break
            case '!avatar':

                client.sendFileFromUrl(from, `https://avatars.dicebear.com/4.5/api/${args[1]}/${args[2]}.svg`, 'acatar.png', `Gender : ${args[1]}\nNama : ${args[2]}`, id)
                break
            case '!nasihat':

                const nasihat = await get.get(`https://api.adviceslip.com/advice`).json()
                client.reply(from, nasihat.advice, id)
                break
            case '!ram':

                client.reply(from, `RAM usage: *${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB* / *${Math.round(os.totalmem / 1024 / 1024)} MB*\nCPU: *${os.cpus()[0].model}*`, id)
                break
            case '!sadbot':

                client.reply(from, `Kalian datang kepadaku hanya disaat kalian sedang membutuhkan sesuatu namun tidak disaat aku kesepian.`, id)
                client.sendGiphy(from, `https://media.giphy.com/media/ROF8OQvDmxytW/giphy.gif`, `😢`)
                break
            case '!posttxt':

                client.postTextStatus(body.slice(9))
                client.reply(from, `Berhasil Mempeosting Text Ke Status`, id)
                break
            case '!infoner':

                const infoner = client.getMe()
                client.reply(from, infoner, id)
                break
            case '!ngopi':

                const ngopi = await get.get(`https://coffee.alexflipnote.dev/random.json`).json()
                client.sendFileFromUrl(from, ngopi.file, `ngopi.png`, `Udah pada ngopi blom? ngopi napa ngopi...`, id)
                break
            case '!gelasngopi':

                const ngopi1 = await get.get(`https://coffee.alexflipnote.dev/random.json`).json()
                client.sendFileFromUrl(from, ngopi1.file, `gelasngopi.png`, `Ngopi lur..`, id)
                break
            case '!promosi':

                client.reply(from, `Jika ingin mempromosikan sesuatu lewat robot kalian bisa berdonasi kepada owner robot, untuk nomor owner ketik *!creator*.`, id)
                break
            case '!map':

                const map1 = await get.get(`https://api.locationiq.com/v1/autocomplete.php?key=pk.160f6eac771ec5b7a526f11efdf1bc94&q=${body.slice(9)}`).json()
                client.reply(from, `place_id : ${map1.place_id}\nplace_id : ${map1.osm_id}\nosm_type : ${map1.osm_type}\nlat : ${map1.lat}\nlon : ${map1.lon}\nboundingbox : ${map1.boundingbox}\nclass : ${map1.class}\ntype : ${map1.type}\ndisplay_name : ${map1.display_name}\ndisplay_address : ${map1.display_address}\naddress : ${map1.address}`, id)
                break
            case '!chatapp':

                client.reply(from, `Jika ingin membuat aplikasi chatting seperti simi-simi namun versi kita sendiri, kamu dapat membuatnya dengan cara membayar 25K maka kamu akan di buatkan sebuah aplikasi chatting simi-simi namun versi kamu sendiri dan bisa kamu custom. Info lebih lanjut silahkan chat owner, dan jika tidak memiliki nomor owner kamu dapat menggunakan perintah *!creator* untuk memunculkan kontak owner.`, id)
                client.sendFile(from, './media/img/chatapp.jpeg', 'chatapp.jpeg', 'Ini tampilan aplikasinya...', id)
                break
            case '!panggil':

                client.reply(from, `Woy ${args[1]}`, id)
                break
            case '!kusuka':

                client.sendFileFromUrl(from, `https://i.pinimg.com/originals/85/94/e6/8594e6ea18b53f471f428492cc56b927.gif`, `kusuka.gif`, `Ciee suka sama ${args[1]}`, id)
                break
            case '!quran':

                client.sendFileFromUrl(from, `https://quran-images-api.herokuapp.com/show/page/${args[1]}`, `quran.png`, `Created BY irwanx-Api`, id)
                break
            case '!peluk':

                lient.sendFileFromUrl(from, `https://cdnx.kincir.com/production/media/2018/oktober/emilia-vs-rem-mana-waifu-paling-ideal-dalam-rezero/re-zero-rem-4.jpg`, `peluk.jpg`, `Memeluk ${args[1]}`, id)
                break
            case '!peluk':

                client.sendFileFromUrl(from, `https://cdnx.kincir.com/production/media/2018/oktober/emilia-vs-rem-mana-waifu-paling-ideal-dalam-rezero/re-zero-rem-4.jpg`, `peluk.jpg`, `Memeluk ${args[1]}`, id)
                break
            case '!suka':

                client.sendText(ownerNumber[0], `Suka dari ${args[1]} dengan ID ${from}`)
                client.reply(from, `Tanggapan anda terhadap robot telah terkirim`, id)
                break
            case '!pesan':

                if (isGroupMsg) return client.reply(from, `Perintah ini tidak bisa di group!`, id)
                client.sendText(ownerNumber[0], `${body.slice(7)} | *dari ${from.replace(/@c.us/g, '')}*`)
                client.sendText(ownerNumber[0], `[ Pesan Owner]\n\nPesanmu : ${body.slice(7)}\nBalsan : `)
                break
            case '!balas':

                if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner bot', id)
                arg = body.trim().split('|')
                if (arg.length >= 1) {
                    client.reply(from, mess.wait, id)
                    const balas = encodeURIComponent(arg[1])
                    const balass = encodeURIComponent(arg[2])
                    client.sendText(balas, balass)
                }
                break
            case '!gasuka':

                client.sendText(ownerNumber[0], `GaSuka dari ${args[1]} dengan ID ${from}`)
                client.reply(from, `Tanggapan anda terhadap robot telah terkirim`, id)
                break
            case '!dadu':

                const listdadu = ["1", "2", "3", "4", "5", "6", ]
                let dadu = listdadu[Math.floor(Math.random() * listdadu.length)]
                client.reply(from, dadu, id)
                break
            case '!ssticker':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                const ssticker = await get.get(`https://api.vhtear.com/wasticker?query=${body.slice(10)}&apikey=${RasiApi}`).json()
                const listtiker = [ssticker.data]
                console.log(listtiker)
                let tiker = listtiker[Math.floor(Math.random() * listtiker.length)]
                client.sendStickerfromUrl(from, tiker, {
                    method: 'get'
                })
                break
            case '!js':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                client.reply(from, js, id)
                break
            case '!tod':

                const listtod = ['Apa baju yang (menurutmu) paling jelek yang pernah kamu pakai, dan kapan kamu memakainya?', 'Apa hal paling buruk (gosip) yang pernah kamu bilang tentang temenmu?', 'Apa hal paling memalukan dari dirimu?', 'Apa hal paling memalukan dari temanmu?', 'Apa hal pertama yang kamu lihat saat kamu melihat orang lain (lawan jenis)?', 'Apa hal pertama yang terlintas di pikiranmu saat kamu melihat cermin?', 'Apa hal terbodoh yang pernah kamu lakukan?', 'Apa hal terbodoh yang pernah kamu lakukan?', 'Apa ketakutan terbesar kamu?', 'Apa mimpi terburuk yang pernah kamu alami?', 'Apa mimpi terkonyol yang sampai sekarang kamu kamu ingat?', 'Apa pekerjaan paling konyol yang pernah kamu bayangin kamu akan jadi?', 'Apa sifat terburukmu menurut kamu?', 'Apa sifat yang ingin kamu rubah dari dirimu?', 'Apa sifat yang ingin kamu rubah dari temanmu?', 'Apa yang akan kamu lakuin bila pacarmu bilang hidung atau jarimu jelek?', 'Apa yang kamu fikirkan sebelum kamu tidur ? ex: menghayal tentang jodoh,dll.', 'Apakah hal yang menurutmu paling menonjol dari dirimu?', 'Bagian tubuh temanmu mana yang paling kamu sukai dan ingin kamu punya?', 'Bagian tubuhmu mana yang paling kamu benci?', 'Dari semua kelas yang ada di sekolah, kelas mana yang paling ingin kamu masuki dan kelas mana yang paling ingin kamu hindari?', 'Deksripsikan teman terdekat mu!', 'Deskripsikan dirimu dalam satu kata!', 'Film dan lagu apa yang pernah membuat kamu menangis?', 'Hal apa yang kamu rahasiakan sampe sekarang dan gak ada satu orangpun yang tau?', 'Hal paling romantis apa yang seseorang (lawan jenis) pernah lakuin atau kasih ke kamu?', 'Hal-hal menjijikan apa yang pernah kamu alami ?', 'Jika kamu lahir kembali dan harus jadi salah satu dari temanmu, siapa yang akan kamu pilih untuk jadi dia?', 'Jika punya kekuatan super/ super power ingin melakukan apa', 'Jika sebentar lagi kiamat, apa yang kamu lakukan ?', 'Kalo kamu disuruh operasi plastik dengan contoh wajah dari teman sekelasmu, wajah siapa yang akan kamu tiru?', 'Kamu pernah mencuri sesuatu gak?', 'Apakah kamu takut mati? kenapa?', 'Kapan terakhir kali kamu menangis dan mengapa?', 'Apa kemampuan spesial kamu apa?', 'Kok bisa suka sama orang yang kamu sukai?', 'Menurutmu, apa sifat baik teman terdekatmu yang nggak dia sadari?', 'Orang seperti apa yang ingin kamu nikahi suatu saat nanti?', 'Pekerjaan paling ngenes apa yang menurutmu cocok untuk teman yang sedang duduk di sebelahmu? Dan kenapa?', 'Pengen tukeran hidup sehari dengan siapa? (teman terdekat yang kalian sama-sama tahu) dan mengapa', 'Pernahkah kamu diam-diam berharap hubungan seseorang dengan pacarnya putus? Siapa?', 'Pilih PACAR atau TEMAN ? why?', 'Quote apa yang paling kamu ingat dan kamu suka?', 'Rahasia apa yang belum pernah kamu katakan sampai sekarang kepada teman mu ?', 'Siapa panutan yang benar-benar menjadi panutanmu?', 'Siapa di antara temanmu yang kamu pikir matre?', 'Siapa di antara teman-temanmu yang menurutmu potongan rambutnya paling nggak banget?', 'Siapa diantara temen-temenmu yang paling NGGAK fotogenik dan kalo difoto lagi ketawa mukanya jelek banget?', 'Siapa mantan terindah mu? dan mengapa kalian putus ?!', 'Siapa nama artis yang pernah kamu bucinin diam-diam?', 'Siapa nama guru cowok yang pernah kamu sukai dulu?', 'Siapa nama mantan pacar teman mu yang pernah kamu sukai diam diam?', 'Siapa nama orang (lawan jenis) yang menurutmu akan asyik bila dijadikan pacar?', 'Siapa nama orang yang kamu benci, tapi kamu rasa orang itu suka sama kamu (nggak harus lawan jenis)?', 'Siapa nama orang yang pernah kamu kepoin diam-diam?', 'Siapa orang (lawan jenis) yang paling sering terlintas di pikiranmu?', 'Siapa orang yang paling menjengkelkan di antara teman teman mu ? alasannya!', 'Siapa sebenernya di antara teman-temanmu yang kamu pikir harus di make-over?', 'Siapa yang paling mendekati tipe pasangan idealmu di sini', 'Ajak orang yang tidak kamu kenal untuk selfie berdua dengan mu lalu upload ke snapgram', 'Ambil beberapa nomor dari kontakmu secara acak dan kirim sms "Aku hamil" sama mereka.', 'Ambil minuman apa saja yang ada didekat mu lalu campurkan dengan cabai dan minum!', 'Ambil nomor secara acak dari kontakmu, telepon dia, dan bilang "Aku mencintaimu"', 'Beli makanan paling murah di kantin (atau beli sebotol aqua) dan bilang sambil tersedu-sedu pada teman sekelasmu "Ini.adalah makanan yang paling mahal yang pernah kubeli"', 'Beli satu botol coca cola dan siram bunga dengan coca cola itu di depan orang banyak.', 'Berdiri deket kulkas, tutup mata, pilih makanan secara acak didalemnya, pas makanpun mata harus tetep ditutup.', 'Berdiri di tengah lapangan basket dan berteriak, "AKU MENCINTAIMU PANGERANKU/PUTRIKU"', 'Beri hormat pada seseorang di kelas, lalu bilang "Hamba siap melayani Anda, Yang Mulia."', 'Berjalan sambil bertepuk tangan dan menyanyi lagu "Selamat Ulang Tahun" dari kelas ke koridor.', 'Berlutut satu kaki dan bilang "Marry me?" sama orang pertama yang masuk ke ruangan.', 'Bikin hiasan kepala absurd dari tisu, apapun itu, terus suruh pose didepan kamera, terus upload', 'Bilang "KAMU CANTIK/GANTENG BANGET NGGAK BOHONG" sama cewek yang menurutmu paling cantik di kelas ini', 'Bilang pada seseorang di kelas, "Aku baru saja diberi tahu aku adalah kembaranmu dulu, kita dipisahkan, lalu aku menjalani operasi plastik. Dan ini adalah hal paling serius yang pernah aku katakan."', 'Buang buku catatan seseorang ke tempat sampah, di depan matanya, sambil bilang "Buku ini isinya tidak ada yang bisa memahami"', 'Cabut bulu kaki mu sendiri sebanyak 3 kali!', 'Chat kedua orangtuamu, katakan bahwa kamu kangen dengan mereka lengkap dengan emoticon sedih.', 'Coba searcing google mengenai hal-hal yang mengerikan atau menggelikan seperti trypophobia, dll.', 'Duduk relaks di tengah lapangan basket sambil berpura-pura itu adalah pantai untuk berjemur.', 'isi mulut penuh dengan air dan harus tahan hingga dua putaranJika tertawa dan tumpah atau terminum, maka harus ngisi ulang dan ditambah satu putaran lagi.', 'Salamanlah dengan orang pertama yang masuk ke ruangan ini dan bilang "Selamat datang di Who Wants To Be a Millionaire!"', '.Kirim sms pada orangtuamu "Hai, bro! Aku baru beli majalah Playboy edisi terbaru!"', 'Kirim sms pada orangtuamu, "Ma, Pa, aku sudah tahu bahwa aku adalah anak adopsi dari Panti Asuhan. Jangan menyembunyikan hal ini lagi."', 'Kirim sms pada tiga nomor acak di kontakmu dan tulis "Aku baru saja menjadi model majalah Playboy."', 'Makan satu sendok makan kecap manis dan kecap asin!', 'Makan sesuatu tapi gak pake tangan.', 'Marah-marahi ketemen kamu yang gak dateng padahal udah janjian mau main "truth or dare" bareng"', 'Pecahkan telur menggunakan kepala!', 'Makanlah makanan yang sudah dicampur-campur dan rasanya pasti aneh, namun pastikan bahwa makanan itu tidak berbahaya untuk kesehatan jangka panjang maupun jangka pendek.', 'Menari ala Girls Generation untuk cowok di depan kelas, atau menari ala Super Junior untuk cewek.', 'Mengerek tiang bendera tanpa ada benderanya.', 'Menggombali orang yang ditaksir, sahabat terdekat, lawan jenis yang tidak dikenal sama sekali dan  sejenisnya.', 'Meniru style rambut semua temen kamu.', 'Menyanyikan lagu HAI TAYO di depan banyak orang sambil menari', 'Menyanyikan lagu Baby Shark dengan keras di ruang kelas.', 'Minjem sesuatu ke tetangga', 'Minum sesuatu yang udah dibuat/disepakatin, tapi pastiin gak berbahaya, bisa kayak minum sirup yang digaremin terus ditambah kecap.', 'Ngomong ke gebetannya emoticon-Takut, ngobrol ngalurngidul apapun lah boleh ,via manapun juga bisa.', 'Nyanyi-nyanyi lagu favorit difilm disney diluar rumah sambil teriak-teriak.', 'Nyebutin 1 biru sampai 20 biru dengan cepat dan tidak boleh melakukan kesalahan. Jika salah maka harus diulang dari awal.', 'Pake celana kebalik sampe besok paginya.', 'Pergi ke lapangan yang luas, lalu berlari sekencang kencangnya sambil mengatakan “aku gila aku gila”', 'Petik  bunga lalu tancapkan bunga itu ke orang yang tidak kamu kenal (harus lawan jenis ya)', 'Pura pura kerasukan ex: kerasukan macan dll', 'Suruh bersiul pas mulutnya lagi penuh dijejelin makanan.', 'Suruh jadi pelayan buat ngelayanin kamu sama temen-temen kamu buat makan siang.', 'Suruh pake kaos kaki buat dijadiin sarung tangan.', 'Suruh pake topi paling aneh/helm paling absurd selama  putaraann kedepan.', 'Telpon mama kamu dan bilang “ma, aku mau nikah secepatnya”', 'Telpon mantan kamu dan bialng “aku rindu kamu”', 'Tuker baju sama orang terdekat sampe ronde berikutnya.', 'Update status di BBM, Line, WA, atau apapun itu dengan kata kata yang semuanya berawalan "S"', 'Upload video nyanyi ke youtube yang lagi nyanyiin lagu-lagu populer', 'Warnain kuku kaki dan tangan tapi dengan warna berbeda-beda buat seminggu.']
                let tod = listtod[Math.floor(Math.random() * listtod.length)]
                client.reply(from, tod, id)
                break
            case '!dare':

                const listdare = ['Biarkan grup memilih lagu dan menyelaraskan bibir dengan lagu sambil menampilkan pertunjukan untuk semua pemain.', 'Cium pemain pilihan Anda.', 'Berdandanlah sebagai lawan jenis dan izinkan gambar diambil dari Anda.', 'Biarkan seseorang dalam grup memberi Anda gaya rambut baru.', 'Biarkan mata Anda terhubung dan mengenali sesama pemain dengan bau.', 'Minta alis Anda dipetik oleh pemain lain.', 'Lepaskan semua kaus kaki dan masukkan ke dalam celana / dan / atau bra Anda.', 'Buka diri Anda seperti orang brengsek dan berakhir dengan orang pilihan Anda.', 'Berperilaku seperti pelacur atau penipu dan mencoba membuat seseorang membeli Anda.', 'Tata rias dengan makanan dari dapur.', 'Beri makan orang pilihan Anda dengan krim semprot.', 'Meyakinkan seseorang untuk membeli Anda sebagai budak - dengan menawarkan layanan yang harus Anda patuhi!', 'Bocoran benda pilihan Anda.', 'Cat gadis impian Anda / pria impian setepat mungkin dengan aslinya.', 'Jadikan aku deklarasi cinta (jahat / lucu / romantis).', 'Buat seseorang pilihan Anda dari putaran proposal pernikahan.', 'Tukarkan dengan pakaian Anda (lebih disukai wanita dengan pria dan sebaliknya).', 'Wanita: buka bra Anda dan bawa ke saya.', 'Lelaki: lepaskan celana pendekmu dan berikan itu padaku.', 'Berbisik orang pilihan Anda hal-hal buruk di telinga Anda dan cobalah untuk melakukannya.', 'Jual saya alat kelamin Anda seperti produk dari supermarket / toko elektronik / kios sayur / dealer.', 'Tempatkan diri Anda di pangkuan orang pilihan Anda - atau letakkan dia di pangkuan Anda dan mainkan orgasme.', 'Pilih teman satu tim untuk memberi Anda ciuman.', 'Mencium orang dengan jenis kelamin yang sama dengan Anda.', 'Ambil orang pilihan Anda di celananya.', 'Berusahalah untukku sebaik mungkin.', 'Gunakan bibir dan gigi Anda untuk membuka celana sesama pemain pilihan Anda.', 'Ceritakan kisah buruk dan gunakan kata-kata kotor sebanyak mungkin.', 'Tunjukkan dengan rekan setimnya eksodus favorit Anda dan komentari semuanya.', 'Kenalkan blowjob sempurna dengan pisang atau mentimun taman.', 'Ambil salah satu dari rekan setim Anda seduktif dan seotot mungkin dari T-shirt dan cium dia dari pusar ke ikat pinggang.', 'Buat foto erotis rekan setim pilihan Anda.', 'Cobalah untuk merayu seseorang pilihan Anda dan pergi sejauh yang Anda inginkan …', 'Kencing dari balkon.', 'Atur striptis.', 'Berikan ciuman kepada rekan tim di bagian bawah.', 'Berikan ciuman ke lawan di sebelah kanan Anda.', 'Ambil pisang atau mentimun dan simulasikan BlowJob yang sempurna.', 'Minumlah minuman Anda berikutnya pada Kel.', 'Bel dalam pakaian dalam di tetangga Anda dan minta maaf untuk kebisingan.', 'Merindukan sesama pemain dengan cupang.', 'Melakukan percakapan erotis dengan sesama pemain pilihan Anda.', 'Tunjukkan putaran perutmu yang telanjang.', 'Berpegangan tangan dengan orang pilihan Anda selama 5 menit.', 'Biarkan diri Anda ditata oleh gaya rambut rekan setim.', 'Pijat kaki pemain pilihan Anda.', 'Buat tarian perut selama 1 menit.', 'Buat orang di sebelah kiri Anda proposal pernikahan romantis.', 'Berikan ciuman di pipi semua wanita yang hadir.', 'Tukarkan pakaian dengan pemain lain yang berseberangan.', 'Berikan pijatan kepala tim selama 2 menit.', 'Simulasikan monyet untuk 1 putaran.', 'Setiap kali Anda ditanya sesuatu, buat wajah terlebih dahulu.', 'Makan saja tanpa menggunakan tangan.', 'Mainkan Gollum dari Lord of the Rings untuk 1 putaran.', 'Beri makan setiap pemain dengan camilan.', 'Pose 1 menit seperti binaragawan.', 'Tentukan dalam waktu 1 menit rambut siapa yang terbaik.', 'Menari lagu tersebut, apa yang sedang diputar.', 'mencium pipi / mulut orang yang berbeda seksual.', 'Tunjukkan perutmu.', 'Pegang tangan selama 5 menit.', 'Tukar kaus itu dengan orang di kanan / kiri Anda.', 'jilat lantai.', 'Beri makan orang di sebelah kanan Anda dengan sesuatu yang enak.', 'Minum segelas besar kokas di Kel.', 'Lakukan 5 push-up.', 'Biarkan diri Anda ditata oleh rekan setimnya dengan gaya rambut yang mencolok.', 'Beri tahu orang itu betapa hebatnya dia.', 'Sebutkan satu hal tentang Anda yang telah menerima pujian.', 'Hubungi teman dan katakan Anda hamil.', 'Jelaskan guru terburuk Anda saat ini.', 'Makanlah sesuatu dan berpura-puralah itu yang paling enak yang pernah kamu makan.', 'Membuat seringai terlucu yang dapat Anda pikirkan.', 'Membuat suara kentut.', 'Cari tahu siapa yang memiliki bau rambut terbaik.', 'Cium orang jenis kelamin lain yang lebih dulu ke kanan Anda.', 'Tunjukkan otot lengan Anda.', 'Lemparkan orang itu tatapan menggoda ke sebelah kiri Anda.', 'Berikan ciuman di pipi pada orang yang duduk 2 tempat di sebelah kanan.', 'Berperilaku seperti ayam selama dua menit.', 'Ikuti guru pilihan Anda.', 'Pemain di sebelah kanan Anda dapat mencampur minuman dari semua jenis bahan dan Anda harus meminumnya.', 'Lepaskan bajumu. Wanita juga bra.', 'Lakukan pada pasangan Anda dengan tangannya.', 'Jilat puting pasangan Anda.', 'Tutup mata pasangan Anda dan manja dia.', 'Stripe untuk pasangan Anda. Jika Anda sudah telanjang, kenakan pakaian lagi dan lepaskan.', 'Pemain di sebelah kanan Anda membuka semua tombol dan ritsleting.', 'Buka top Anda - wanita juga mengambil bra.', 'Meludahi puting Anda dan memijatnya dengan itu.', 'Meniru ekshibisionis.', 'Habiskan putaran permainan selanjutnya dengan telanjang.', 'Minumlah minuman Anda berikutnya pada Kel.', 'Mainkan orgasme.', 'Lakukan striptis.', 'Pilih teman satu tim yang harus meraih celana Anda.', 'Ambil pisang atau mentimun dan simulasikan BlowJob yang sempurna.', 'Berikan ciuman kepada pemain di seberang jalan.', 'Buka pakaian Anda dan jelaskan manfaat alat kelamin Anda kepada pemain lain.', 'Pijat payudara Anda sendiri dengan cara erotis.', 'Ceritakan kisah kotor.', 'Panggil orang asing dan menawarkan seks telepon.', 'Jelaskan alat kelamin Anda sebagai produk.', 'Pinkel dari balkon.', 'Semprotkan krim di dada Anda dan biarkan menjilat rekan setim', 'Kirim selfie dengan ciuman ke mantan Anda.', 'Panggil Burger King dan tanyakan di mana McDonald’s berikutnya.', 'Biarkan diri Anda dibuat oleh orang di sebelah kanan. Dia akan ditutup matanya!', 'Pergi ke lemari es. Buka paket yang tersisa dan biarkan setengah dimakan.', 'Letakkan lengan Anda di toilet selama sepuluh detik.', 'Lukis mono-alis dan kemudian posting selfie di Insta.', 'Panggil ibumu dan katakan kau punya bayi.', 'Sentuh lidah lawan jenis dengan lidah Anda selama sepuluh detik.', 'Tulis di grup WhatsApp pertama yang Anda temukan: “Saya bosan dengan Anda!”', 'Jelaskan dalam kisah Instagram mengapa semua pengikut Anda mengganggu Anda.', 'Minum satu suntikan minyak zaitun.', 'Lakukan dialog dengan item dan berpura-puralah bahwa Anda sedang berdebat.', 'Kejutkan lawan Anda dengan lap dance.', 'Berikan ciuman di pantatmu ke sebelah kiri.', 'Tampilkan putaran obrolan WhatsApp terakhir Anda.', '']
                let dare = listdare[Math.floor(Math.random() * listdare.length)]
                client.reply(from, dare, id)
                break
            case '!truth':

                const listtruth = ['Pernahkah Anda membiarkan orang lain mendapat masalah karena sesuatu yang Anda lakukan?', 'Apa hal paling memalukan yang pernah Anda lakukan?', 'Apa alasan paling konyol bahwa Anda pernah putus dengan seseorang?', 'Apa kebiasaan paling buruk yang Anda miliki?', 'Menurut Anda apa fitur terbaik Anda? Dan apa yang terburuk?', 'Apa hal paling berani yang pernah kamu lakukan?', 'Siapa di ronde yang ingin kamu enchant pada babi?', 'Kapan terakhir kali Anda mengompol?', 'Apa yang paling kamu impikan dari tidur?', 'Jika Anda akan menghasilkan uang secara ilegal, bagaimana Anda membuatnya?', 'Apa yang kekanak-kanakan yang masih Anda lakukan?', 'Jika Anda buta, siapa yang akan menjadi anjing pemandu Anda?', 'Apa yang paling mengesankan Anda?', 'Jika Anda diizinkan untuk menggunakan hanya 3 kata untuk sisa malam mulai sekarang - yang mana itu?', 'Jika Anda seorang diktator, hukum mana yang akan Anda undang terlebih dahulu?', 'Jika Anda hidup selama era Nazi, siapa Anda?', 'Apa pengalaman paling memalukan di waktu sekolah / waktu belajar / pendidikan / tahun lalu?', 'Apa kesalahan terbesar dalam hidup Anda?', 'Apa yang tidak akan pernah Anda lakukan - bahkan jika Anda tahu Anda hanya memiliki 12 jam lagi untuk hidup?', 'Pelanggaran apa yang telah Anda lakukan?', 'Ceritakan padaku rahasia dari masa kecilmu.', 'Apa wakil (rahasia) terbesar Anda?', 'Apa yang ingin Anda lakukan dengan saya … (atau orang xy), jika Anda kemudian dapat menghapus ingatannya (dia, …)?', 'Apa hal terburuk yang pernah Anda lakukan kepada siapa pun?', 'Siapa yang paling kamu sukai?', 'Pernahkah Anda jatuh cinta dengan salah satu yang hadir?', 'Jika Anda seorang vampir, siapa di antara kita yang akan Anda gigit sekarang?', 'Apa hal terburuk yang pernah Anda alami?', 'Apa keranjang terburukmu?', 'Apakah Anda pernah buang air besar di depan umum?', 'Apa fantasi tergelapmu?', 'Apa hal terbaik yang pernah Anda alami dengan orang lain?', 'Apa turn-off terbesar bagi Anda?', 'Apa yang paling Anda sukai dari tubuh Anda dan apa yang paling jelek?', 'Siapa dari ronde kami yang ingin kamu lihat telanjang?', 'Siapa di babak ini yang bisa membuatmu jatuh cinta?', 'Pernahkah Anda memiliki mimpi erotis di mana seseorang dari babak ini terjadi?', 'Jika Anda akan menato diri Anda di area genital - apa yang akan ada di sana?', 'Apa yang lebih penting dalam suatu hubungan - seks atau cinta?', 'Apakah Anda pikir seks itu keren, bagus, oke, kadang-kadang menyenangkan - atau tidak begitu penting bagi Anda?', 'Apa yang membuat Anda benar-benar bercinta?', 'Berapa kali seminggu / bulan berhubungan seks - dan seberapa sering Anda ingin berhubungan seks?', 'Berapa banyak pasangan seks yang telah Anda tiduri?', 'Bagian tubuh manakah yang paling membuat Anda?', 'Bagaimana, di mana dan dengan siapa Anda pertama kali?', 'Seberapa pentingkah foreplay yang diperluas untuk Anda?', 'Apa yang harus dilakukan pria / wanita untuk menggoda Anda?', 'Pernahkah Anda bertiga? Dan bagaimana Anda menyukainya?', 'Pernahkah Anda berhubungan seks dengan teman baik?', 'Apakah Anda pernah berhubungan seks dengan salah satu kelompok ini - kecuali pasangan Anda?', 'Apa yang terjadi pada kencanmu yang canggung?', 'Apa momen paling memalukan dalam seks yang pernah Anda alami?', 'Kamu benar-benar jatuh cinta, tapi kemudian dia pergi. Apa yang harus terjadi untuk membuat Anda lari berteriak?', 'Apa yang pertama-tama Anda cari dari seorang wanita - payudara, pantat atau wajah?', 'Apa yang Anda cari dalam diri seorang pria terlebih dahulu dan apa yang harus dia miliki sehingga Anda berpikir: awwwww, cool!', 'Pernahkah Anda memuaskan diri sendiri saat memikirkan salah satu babak ini?', 'Apa posisi favorit Anda saat berhubungan seks?', 'Apa yang merupakan tabu mutlak saat berhubungan seks?', 'Apa hal terpanas yang pernah Anda lakukan?', 'Pernahkah Anda berhubungan seks cybersex atau telepon - dan dengan siapa?', 'Apa keinginan rahasia Anda yang paling buruk?', 'Apa yang lebih baik - dicukur atau tidak dicukur?', 'Menurutmu, siapa di babak ini yang melakukan seks terbaik?', 'Siapa yang akan Anda beri uang untuk tidur dengan Anda?', 'Apa pengalaman seks Anda yang paling gila?', 'Apakah Anda pernah melakukan hubungan seks yang berbahaya - dan bagaimana tepatnya itu?', 'Apakah Anda pernah berhubungan seks dengan orang asing? misalnya dari Tinder?', 'Jika Anda menelepon - apa spesialisasi Anda?', 'Apa yang paling Anda pikirkan ketika Anda memuaskan diri sendiri?', 'Pernahkah Anda berhubungan seks dengan sesama jenis?', 'Anda berhubungan seks dengan saya. Apa yang akan Anda katakan kepada saya setelah itu?', 'Apa cara terbaik untuk membaringkan Anda?', 'Dengan siapa Anda akan tidur - apakah Anda sudah menikah atau cinta abadi?', 'Dengan siapa Anda melakukan seks terbaik dalam hidup Anda?', 'Apakah Anda pernah membayar untuk seks?', 'Siapa yang kamu punya mimpi panas terakhir tentang?', 'Pernahkah Anda terkejut saat berhubungan seks - dan oleh siapa?', 'Apa posisi favoritmu?', 'Di mana zona sensitif seksual Anda?', 'Apakah Anda mengeluh pada klimaks?', 'Dengan siapa kamu ingin berhubungan seks?', 'Kapan terakhir kali Anda berhubungan seks?', 'Di mana Anda memiliki tindikan intim?', 'Berapa banyak pria / wanita yang sudah Anda cium?', 'Apa keranjang terburukmu?', 'Dengan siapa kamu memiliki kencan terpanas?', 'Posisi apa yang menjadi favorit Anda?', 'Kapan pertama kali kamu?', 'Apakah kamu masih perawan?', 'Di toilet: Melipat atau menggulung tisu toilet?', 'Di mana Anda bercukur di mana-mana?', 'Apakah Anda pernah berhubungan intim dengan 2 orang sekaligus?', 'Apakah Anda pernah mendengar rintihan kakak / kakak Anda?', 'Pernahkah Anda terjebak dalam masturbasi?', 'Di tempat mana Anda berhubungan seks?', 'Pernahkah kamu menipu seseorang?', 'Hewan apa yang paling cocok untukmu dan mengapa?', 'Apa kencan terburukmu?', 'Siapa yang ingin kamu cium sekarang?', 'Apa rahasia kamu, fantasi gelap?', 'Apakah Anda lebih suka tato pantat Anda atau menusuk lidah Anda?', 'Apakah kamu selalu setia?', 'Apakah Anda memiliki naksir remaja?', 'Di orang mana kamu jatuh cinta?', 'Selebritas mana yang ingin kamu kencani?', 'Apa waasa saat paling memalukan dalam hidup Anda?', 'Mulut mana yang paling Anda sukai dari grup di sini?', 'Pemain mana yang memiliki tangan paling indah?', 'Di mana ciuman pertamamu?', 'Siapa di ronde yang paling ingin Anda cium?', 'Siapa di meja mungkin yang paling geli?', 'Apa kesalahan terbesar dalam hidup Anda?', 'Apakah sesuatu yang memalukan terjadi pada Anda berkencan?', 'Apakah Anda pernah melakukan kontak dengan narkoba?', 'Orang mana yang ingin kamu cium sekarang?', 'Kapan terakhir kali Anda mabuk?', 'Pernahkah kamu selingkuh saat ujian sekolah?', 'Pernahkah kamu mencuri sesuatu di masa lalu?', 'Apakah kamu mendengkur di malam hari?', 'Yang manakah lagu favoritmu?', 'Dengan pemain mana Anda akan bertukar selama 1 minggu dan mengapa?', 'Anda pindah ke pulau yang sepi, siapa yang Anda bawa dari sini?', 'Apa yang paling kamu takuti?', 'Di mana Anda bercukur di mana-mana?', 'Apakah Anda memiliki nama panggilan?', 'Apakah Anda melihat ke dalam toilet sebelum mencuci?', 'Siapa yang memberimu sakit hati terburuk?', 'Berapa kali kamu mencium?', 'Apa hal paling memalukan yang pernah terjadi padamu?', 'Berapa banyak tipe / cewek yang sudah kamu cium?', 'Kamu jatuh cinta dengan siapa?', 'Bintang mana yang kamu sukai?', 'Apakah Anda memulai sesuatu dengan XY (masukkan nama)?', 'Pernahkah kamu mencuri sesuatu?', 'Orang terkenal mana yang ingin kamu habiskan bersama?', 'Di mana Anda ingin balok sekarang?', 'Kamu harus menikahi bintang, siapa?', 'Bagaimana / di mana / dengan siapa ciuman pertama Anda?', 'Apakah kamu masih perawan?', 'Apakah kamu bercukur? Jika ya, dimana?', 'Gaya rambut apa yang Anda miliki di area genital?', 'Apakah Anda ingin menjadi intim dengan seseorang dengan jenis kelamin Anda sendiri?', 'Apakah Anda suka foreplay yang lama? Jika demikian, bagaimana tampilannya?', 'Apa yang Anda pikirkan ketika Anda memuaskan diri sendiri?', 'Kapan pertama kali kamu?', 'Apakah kamu masih perawan?', 'Pernahkah kamu menipu seseorang?', 'Apa keranjang terburukmu?', 'Apakah Anda mengeluh saat orgasme?', 'Pernahkah Anda terjebak dalam masturbasi?', 'Apakah Anda pernah mengisi bra Anda?', 'Kapan terakhir kali Anda berhubungan seks?', 'Di tempat mana Anda sudah melakukan mastrubasi?', 'Apa yang Anda pikirkan ketika Anda memuaskan diri sendiri?', 'Apakah Anda memiliki pengalaman dengan kencing?', 'Apakah Anda pernah melakukan hubungan seks di luar ruangan?', 'Apa posisi favoritmu?', 'Apakah kamu selalu setia?', 'Gaya rambut kemaluan apa yang Anda miliki?', 'Apakah Anda pernah berhubungan intim dengan 2 orang sekaligus?', 'Apa rahasia kamu, fantasi gelap?', 'Apakah Anda membiarkan diri Anda dicipratkan ke wajah seorang pria?', 'Apakah Anda bermain permainan dokter ketika Anda masih muda?', 'Apakah Anda sudah memiliki pengalaman homoseksual?', 'Pernahkah Anda berhubungan seks di telepon?', 'Jika Anda harus melepaskan iklan kontak erotis, apakah itu?', 'Siapa yang kamu anggap paling cantik di babak ini? Urutkan semua orang dari lucu ke jelek.', 'Siapa di kelas Anda yang kemungkinan besar akan Anda cium?', 'Siapa dari babak ini yang TIDAK AKAN Anda undang di pesta berikutnya?', 'Apa kebohongan terakhir yang Anda katakan pada orang di sebelah kanan Anda?', 'Apa harapan terbesarmu yang tidak pernah kau katakan?', 'Pelanggaran apa yang telah Anda lakukan?', 'Apakah Anda kencing di kamar mandi?', 'Perilaku kekanakan apa yang Anda miliki hari ini?', 'Di mana Anda bercukur di mana-mana?', 'Pernahkah kamu menipu seseorang?', 'Apa ketakutan terbesarmu yang tidak diketahui siapa pun?', 'Dalam siapa kamu pernah jatuh cinta, yang tidak ada yang tahu apa-apa?', 'Apakah Anda pernah mengisi bra atau celana dalam Anda?', 'Apakah Anda lebih suka menjadi jelek dan populer atau cantik dan tidak populer?', 'Posisi mana yang paling kamu sukai?', '']
                let truth = listtruth[Math.floor(Math.random() * listtruth.length)]
                client.reply(from, truth, id)
                break
            case '!ruagent':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                const listruagent = ["Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2225.0 Safari/537.36", "Mozilla/5.0 (Windows NT 6.1; rv:21.0) Gecko/20130401 Firefox/21.0", "Mozilla/5.0 (Windows NT 6.2; Win64; x64;) Gecko/20100101 Firefox/20.0", "Mozilla/5.0 (Windows NT 6.2; rv:21.0) Gecko/20130326 Firefox/21.0", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0", "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.65 Safari/535.11", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_5_8) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.151 Safari/535.19", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.813.0 Safari/535.1", "Mozilla/5.0 (Windows NT 5.2; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.41 Safari/535.1", "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_6; zh-cn) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27", "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.2117.157 Safari/537.36", "Mozilla/5.0 (Windows NT 6.1; rv:12.0) Gecko/20120403211507 Firefox/14.0.1", "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_6; en-gb) AppleWebKit/528.10+ (KHTML, like Gecko) Version/4.0dp1 Safari/526.11.2", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/12.0.742.68 Safari/534.30", "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1464.0 Safari/537.36", "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1062.0 Safari/536.3", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36", "Mozilla/5.0 (Windows; U; Windows NT 6.1; cs-CZ) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/12.0.742.68 Safari/534.30", "Mozilla/5.0 (compatible; Windows; U; Windows NT 6.2; WOW64; en-US; rv:12.0) Gecko/20120403211507 Firefox/12.0", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.810.0 Safari/535.1", "Mozilla/5.0 (Windows; U; Windows NT 6.1; es-ES) AppleWebKit/533.18.1 (KHTML, like Gecko) Version/5.0 Safari/533.16", "Mozilla/5.0 (Windows NT 6.2; WOW64; rv:21.0) Gecko/20130514 Firefox/21.0", "Mozilla/5.0 (X11; Mageia; Linux x86_64; rv:10.0.9) Gecko/20100101 Firefox/10.0.9", "Googlebot/2.1 (+http://www.googlebot.com/bot.html)", "Mozilla/5.0 (Windows NT 6.2; rv:22.0) Gecko/20130405 Firefox/23.0", "Mozilla/5.0 (Windows NT 6.0; WOW64) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.699.0 Safari/534.24", "Mozilla/5.0 (X11; Linux i686; rv:21.0) Gecko/20100101 Firefox/21.0", "Mozilla/5.0 (Windows NT 6.0) yi; AppleWebKit/345667.12221 (KHTML, like Gecko) Chrome/23.0.1271.26 Safari/453667.1221", "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; nb-no) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148a Safari/6533.18.5", "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1467.0 Safari/537.36", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20130406 Firefox/23.0", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.65 Safari/535.11", "Mozilla/5.0 (Windows; U; Windows NT 6.1; WOW64; en-US; rv:2.0.4) Gecko/20120718 AskTbAVR-IDW/3.12.5.17700 Firefox/14.0.1", "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4", "Mozilla/5.0 (Windows 8) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/12.0.742.112 Safari/534.30", "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:16.0.1) Gecko/20121011 Firefox/21.0.1", "Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:9.0a2) Gecko/20111101 Firefox/9.0a2", "Mozilla/5.0 (Windows 8) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/12.0.742.112 Safari/534.30", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.67 Safari/537.36", "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_8; it-it) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16", "Mozilla/5.0 (Windows NT 6.1; rv:14.0) Gecko/20120405 Firefox/14.0a1", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1664.3 Safari/537.36", "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.860.0 Safari/535.2", "Mozilla/5.0 (X11; FreeBSD amd64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.65 Safari/535.11", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.124 Safari/537.36", "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:16.0.1) Gecko/20121011 Firefox/21.0.1", "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.107 Safari/535.1", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_0) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/12.0.742.100 Safari/534.30", "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/534.21 (KHTML, like Gecko) Chrome/11.0.678.0 Safari/534.21", "Mozilla/5.0 (Windows; U; Windows NT 6.1; de-DE) AppleWebKit/534.17 (KHTML, like Gecko) Chrome/10.0.649.0 Safari/534.17", "Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.1 (KHTML, like Gecko) Ubuntu/10.04 Chromium/14.0.808.0 Chrome/14.0.808.0 Safari/535.1", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.67 Safari/537.36", "Mozilla/5.0 (Windows NT 6.0) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.75 Safari/535.7", "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/534.20 (KHTML, like Gecko) Chrome/11.0.669.0 Safari/534.20", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:21.0) Gecko/20130331 Firefox/21.0", "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.90 Safari/537.36", "Mozilla/5.0 (Windows NT 4.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:31.0) Gecko/20130401 Firefox/31.0", "Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.66 Safari/535.11", "Mozilla/5.0 (Windows; U; Windows NT 6.0; ja-JP) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.814.0 Safari/535.1", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/22.0.1207.1 Safari/537.1", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_4) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.65 Safari/535.11", "Mozilla/5.0 (X11; Linux i686) AppleWebKit/534.30 (KHTML, like Gecko) Slackware/Chrome/12.0.742.100 Safari/534.30", "Mozilla/5.0 (Windows NT 6.2; rv:22.0) Gecko/20130405 Firefox/23.0", "Mozilla/5.0 (Windows NT 6.0; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19", "Mozilla/5.0 (Windows NT 5.1; rv:21.0) Gecko/20130401 Firefox/21.0", "Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.1 (KHTML, like Gecko) Ubuntu/11.04 Chromium/14.0.803.0 Chrome/14.0.803.0 Safari/535.1", "Mozilla/5.0 (Windows; U; Windows NT 6.1; sv-SE) AppleWebKit/533.19.4 (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4", "Mozilla/5.0 (X11; CrOS i686 12.0.742.91) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/12.0.742.93 Safari/534.30", "Mozilla/5.0 (Windows; U; Windows NT 6.1; tr-TR) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27", "Mozilla/5.0 (X11; Linux i686) AppleWebKit/534.30 (KHTML, like Gecko) Ubuntu/11.04 Chromium/12.0.742.112 Chrome/12.0.742.112 Safari/534.30", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.66 Safari/535.11", "Mozilla/5.0 (Windows; U; Windows NT 6.1; ja-JP) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16", "Mozilla/5.0 (Windows NT 6.4; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2225.0 Safari/537.36", "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0", "Mozilla/5.0 (Windows NT 6.2) AppleWebKit/537.13 (KHTML, like Gecko) Chrome/24.0.1290.1 Safari/537.13", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.811.0 Safari/535.1", "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/534.19 (KHTML, like Gecko) Chrome/11.0.661.0 Safari/534.19", "Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_5_8; zh-cn) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27", "Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_4_11; en) AppleWebKit/528.4+ (KHTML, like Gecko) Version/4.0dp1 Safari/526.11.2", "Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.2 (KHTML, like Gecko) Ubuntu/11.10 Chromium/15.0.874.120 Chrome/15.0.874.120 Safari/535.2", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:6.0a2) Gecko/20110613 Firefox/6.0a2", "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; ca-es) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16", "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27", "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.815.0 Safari/535.1", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36", "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_7; da-dk) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1"]
                let ruagent = listruagent[Math.floor(Math.random() * listruagent.length)]
                client.reply(from, ruagent, id)
                break
            case '!rfilm':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                const listrfilm = ["Last Mountain, The", "Friend of Mine, A (Ein Freund von mir)", "Flying Down to Rio", "All the Pretty Horses", "Kandahar (Safar e Ghandehar)", "Grande Ã©cole", "Macario", "The Sky Dragon", "Left Behind: The Movie", "Pope's Toilet, The (El bano del Papa)", "Gate of Hell (Jigokumon)", "Climates (Iklimler)", "Hostel: Part II", "Late Autumn (Man-choo)", "Six-String Samurai", "Alice", "Hunting Party, The", "Replacements, The", "Making Love", "I Was Monty's Double", "Temptation of a Monk (You Seng)", "Stand and Deliver", "Two Lives (Zwei Leben)", "Lonesome", "Love's Deadly Triangle: The Texas Cadet Murder", "Lad: A Dog", "Soldiers of Fortune", "Masquerade", "Waiting for Superman", "X-Files: I Want to Believe, The", "Fresh", "Possessed (Besat)", "One Nation Under God ", "Shanghai", "Messengers, The", "Blume in Love", "Veronica Guerin", "Permanent Record", "Maleficent", "Class", "Baron of Arizona, The", "Mighty Joe Young", "Supermensch: The Legend of Shep Gordon", "Chronicles of Narnia: The Voyage of the Dawn Treader, The", "Grand Theft Parsons", "My Big Fat Greek Wedding", "Jezebel", "Blast", "Margaret Thatcher: The Long Walk to Finchley", "Revenge of the Nerds II: Nerds in Paradise", "Let's Make Love", "The Tattooist", "Police Python 357", "Welcome Mr. Marshall (Bienvenido Mister Marshall)", "Stella", "Foosball (Metegol)", "RÃ©gion centrale, La", "Kangaroo Jack", "Great Texas Dynamite Chase, The", "Blue Crush", "Don't Make Waves", "Ernest & CÃ©lestine (Ernest et CÃ©lestine)", "Extremely Goofy Movie, An", "All the President's Men", "Puddle Cruiser", "Schindler's List", "Joyful Noise", "Star Trek: First Contact", "Prophet's Prey", "Winnetou: The Last Shot", "2016: Obama's America", "From the Journals of Jean Seberg", "Elementary Particles, The (Elementarteilchen)", "Silent Hill", "I Travel Alone", "Secretariat", "Waiter (Ober)", "Adventures of Zatoichi (ZatÃ´ichi sekisho yaburi) (ZatÃ´ichi 9)", "Sumo Do, Sumo Don't (Shiko funjatta)", "The Court-Martial of Jackie Robinson", "The Borderlands", "Toy Soldiers", "Last Supper, The", "Journey to the West: Conquering the Demons (Daai wa sai you chi Chui mo chun kei)", "Debt, The", "Importance of Tying Your Own Shoes, The (Hur mÃ¥nga lingon finns det i vÃ¤rlden?)", "Ghoulies III: Ghoulies Go to College", "Basketball Diaries, The", "Miraculum", "Rat Race, The (Garson Kanin's The Rat Race)", "Dimples", "Exit", "Summer Lovers", "Troll", "Not of This Earth", "About Schmidt", "Fierce Creatures", "Ride in the Whirlwind", "Last Witness, The", "Unexpected", "Corky Romano", "42 Up", "Hickey and Boggs", "Lost Horizon", "Greening of Whitney Brown, The", "State of Play", "Enemy", "Bliss (Mutluluk)", "No Country for Old Men", "If These Walls Could Talk 2", "Bad Asses (Bad Ass 2)", "Elusive Summer of '68, The (Varljivo leto '68)", "Moonlighting", "Pay It Forward", "Congress, The", "Robin Hood", "Meet the Spartans", "Alps (Alpeis)", "Flying Swords of Dragon Gate, The (Long men fei jia)", "Seven Years in Tibet", "Up", "RÃ¥narna", "Blackrock", "Twelve Tasks of Asterix, The (Les douze travaux d'AstÃ©rix)", "Arizona Dream", "Rhino Season (Fasle kargadan) ", "Your Vice is a Locked Room and Only I Have the Key", "Nocturna Artificialia", "Red Cliff (Chi bi)", "Walk of Shame", "Dead Space: Downfall", "Hannah Arendt", "Year My Voice Broke, The", "Blood Beast Terror, The", "Grand Hotel", "Crank", "Stray Dog (Nora inu)", "Picture This", "Cinematographer Style", "Videodrome", "Brain That Wouldn't Die, The", "Seven Ways from Sundown", "Dolly Sisters, The", "Hondo", "Zombieland", "Score: A Hockey Musical", "As it is in Heaven (SÃ¥ som i himmelen)", "Shaft in Africa", "Rain", "Wolves", "Cranford", "Namesake, The", "Codes of Gender, The", "Bohemian Life, The (La vie de bohÃ¨me)", "Vagabond (Sans toit ni loi)", "Hard Corps, The", "Querelle", "Hood of the Living Dead", "State of Siege (Ã‰tat de siÃ¨ge)", "Bullets Over Broadway", "Coronado", "Darkon", "Battle for Brooklyn", "Deepstar Six", "Dutchman", "Travels with My Aunt", "Amazonia", "Fierce People", "Leif", "Hatchet II", "Demon Lover Diary", "Willard", "Finding Fela!", "Youth in Revolt", "At Sword's Point", "Malice", "7 Days (Les 7 jours du talion)", "Find Love", "Double Dhamaal", "Horse Boy, The", "Aftermath: Population Zero", "Track of the Cat", "Crime and Punishment", "Fastest Gun Alive, The", "Snake of June, A (Rokugatsu no hebi)", "Sons of Perdition", "Dinner Guest, The (L'invitÃ©)", "Jane Eyre", "Just Like a Woman", "Street Smart", "Boy with Green Hair, The", "Romance in a Minor Key (Romanze in Moll)", "Donner Pass", "Long Day Closes, The", "The Divine Move", "American Crude", "After Dark, My Sweet", "Something Ventured", "Fraternity Demon", "Kurt Cobain: Montage of Heck", "Match Factory Girl, The (Tulitikkutehtaan tyttÃ¶)", "Racing Stripes", "Sorcerer's Apprentice, The", "Body, The", "Gentlemen", "Magus, The", "Billion Dollar Brain", "Cloudy with a Chance of Meatballs", "Flamingo Road", "Benji ", "Hell (L'enfer)", "Jalla! Jalla!", "End of Love, The", "Darkness Falls", "Priest", "Driving Lessons", "25 Watts", "Shrink", "The Beautiful Story", "Bad Sleep Well, The (Warui yatsu hodo yoku nemuru)", "Helicopter String Quartet", "Five Dedicated to Ozu", "Suicide Kings", "Gingerbread Man, The", "Brooklyn Bridge", "Code Unknown (Code inconnu: RÃ©cit incomplet de divers voyages)", "Love Steaks", "Remorques (Stormy Waters)", "Arn: The Kingdom at Road's End (Arn: Riket vid vÃ¤gens slut)", "French Twist (Gazon maudit)", "Secret Adventures of Gustave Klopp, The (Narco)", "Training Day", "Boat People (Tau ban no hoi)", "The Last Time I Saw Macao", "River, The (Joki)", "Unknown Soldier, The (Unbekannte Soldat, Der)", "Last Angry Man, The", "Deliver Us from Evil", "Charly", "Foxcatcher", "Jubilation Street", "Woman on the Beach (Haebyeonui yeoin)", "Beautiful Boy", "Place in the Sun, A (En plats i solen)", "Other Voices, Other Rooms", "Ten Tall Men", "Life of Oharu, The (Saikaku ichidai onna)", "Island of Lost Souls", "Young Poisoner's Handbook, The", "Tooth Fairy", "White Stripes Under Great White Northern Lights, The", "Magic of Ordinary Days, The", "It's A Wonderful World", "Lincz", "Lost for Life", "Undercover Man", "Late Autumn (Man-choo)", "Jitney Elopement, A", "Corridors of Time: The Visitors II, The (Couloirs du temps: Les visiteurs 2, Les)", "Torrente, el brazo tonto de la ley", "Perils of Pauline, The", "Rock the Boat", "Down to the Cellar (Do pivnice)", "Jack Goes Boating", "Letter to Elia, A", "Nothing Sacred", "Hornets' Nest", "Robot Monster", "Contracted", "Love Me Tender", "Carlito's Way", "Stooge, The", "Five Pennies, The", "In the Company of Men", "Warning for the Joensson Gang (Varning fÃ¶r JÃ¶nssonligan)", "Color Purple, The", "Amadeus", "Silent Wedding (Nunta Muta)", "Super Size Me", "Crow: City of Angels, The", "Pandora's Promise", "Night at the Opera, A", "Ringu 0: BÃ¢sudei", "Haunted House 2, A", "Birth of the Living Dead", "Unknown, The (a.k.a. Alonzo the Armless)", "Lunacy (SÃ­lenÃ­)", "Human Scale, The", "Calamari Union", "MÃ©tamorphose des cloportes, La", "Police Python 357", "Floating Skyscrapers", "Planet Terror", "Nutcracker, The", "Synchromy", "Smokey and the Bandit", "On the Run", "Me and Orson Welles", "Suddenly, Last Summer", "Rumble on the Docks", "Dot and the Whale", "Can Mr. Smith Get to Washington Anymore?", "Next Step, The", "The Eagle and the Hawk", "Twist", "Charlie Chan in Dangerous Money", "Izo", "Viagem a Portugal", "Filthy Gorgeous: The Bob Guccione Story", "Disgrace", "Ant Bully, The", "Night Train To Lisbon", "Cry in the Dark, A", "Making 'The New World'", "Silence of the Lambs, The", "Lake Tahoe", "Back to the Future Part III", "Lady and the Duke, The (Anglaise et le duc, L')", "Confessional, The (Confessionnal, Le)", "Nine Lives (Ni liv)", "Think Like a Man Too", "Ju-on: The Grudge 2", "Looking for Lenny ", "Four Bags Full", "Zatoichi Meets Yojimbo (ZatÃ´ichi to YÃ´jinbÃ´) (ZatÃ´ichi 20)", "Summer of '62 (Cartouches gauloises)", "Urban Ghost Story", "Waiting for Happiness (Heremakono)", "39 Steps, The", "Stop Making Sense", "Dragons Forever", "Summer in Berlin (Sommer vorm Balkon)", "Infection (Kansen)", "Detroit Rock City", "Medea", "Outside the Law (Hors-la-loi)", "Heimat - A Chronicle of Germany (Heimat - Eine deutsche Chronik)", "Spartacus", "Wise Blood", "Samaritan Girl (Samaria)", "Mount St. Elias", "Poppy Shakespeare", "Last Real Men, The (Die letzten MÃ¤nner)", "Made in U.S.A.", "Moral Tales, Filmic Issues", "Juvenile Court", "Net 2.0, The ", "Making a Killing: The Untold Story of Psychotropic Drugging", "Drama/Mex", "M*A*S*H (a.k.a. MASH)", "Luke and Lucy: The Texas Rangers (Suske en Wiske: De Texas rakkers)", "Metallica: Through the Never", "National Lampoon's Cattle Call (Cattle Call)", "Warriors of Virtue", "'Til There Was You", "Freeloaders", "i hate myself :)", "La cravate", "Fanatics (Kulman pojat)", "Incredibly True Adventure of Two Girls in Love, The", "Lupin the 3rd", "Golden Boy", "Trail of the Screaming Forehead", "24 Exposures", "Whistling in the Dark", "Rated X: A Journey Through Porn", "Circle of Iron", "This Is Where I Leave You", "Hand Gun", "Lego: The Adventures of Clutch Powers", "Blind Dating", "Juno", "Running With Scissors", "Central Park", "588 Rue Paradis (Mother)", "Soldier's Sweetheart A", "Cinema Verite", "Informer, The", "Please Don't Eat the Daisies", "Nokas", "September", "Road to Zanzibar", "Moving Out", "Stay Tuned", "Authors Anonymous", "Carefree", "MURDER and murder", "Heavy Petting", "Harry and Walter Go to New York", "Great Muppet Caper, The", "Charlie Chan's Murder Cruise", "Red Canyon", "Angel Eyes", "Going Straight", "99 Homes", "Foreign Letters", "Bad Lieutenant: Port of Call New Orleans", "Egyptian, The", "Monty Python and the Holy Grail", "Adrift (Choi Voi)", "Photos in the City of Sylvia (Unas fotos en la ciudad de Sylvia)", "Don't Torture a Duckling (Non si sevizia un paperino)", "Vlad Tepes (Vlad &#354;epe&#351;)", "Harvey", "Chasers, The (Jakten)", "Earth vs. the Flying Saucers", "Billy Elliot", "Gone with the Wind", "Three Resurrected Drunkards (Kaette kita yopparai)", "Name of the Rose, The (Name der Rose, Der)", "Fantastic Night, The (Nuit fantastique, La)", "Plumm Summer, A", "Strip Search", "King Is Dancing, The (Le roi danse)", "Happy New Year", "Princess and the Pony", "Collateral Damage", "Blow-Up (Blowup)"]
                let rfilm = listrfilm[Math.floor(Math.random() * listrfilm.length)]
                client.reply(from, rfilm, id)
                break
            case '!rmac':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                const listrmac = ["F3-AF-3B-73-6F-A0", "94-3C-F3-EA-32-4D", "10-D7-54-85-B7-0E", "A2-CA-A5-3A-B6-F1", "22-02-26-E1-25-AD", "EE-E9-6E-E2-B2-AB", "9C-EC-2B-CD-60-6C", "F3-4E-D0-4F-D2-D9", "8F-86-FF-F1-53-18", "5B-8A-FC-71-5E-AE", "37-52-BF-A9-92-3E", "2D-F3-FB-B4-5C-0C", "2E-86-A1-E1-CF-D7", "13-55-A9-4F-FE-57", "FF-65-E4-45-5F-7E", "83-F9-B0-8F-6B-CE", "00-50-05-83-0B-CA", "6C-E5-7F-DE-98-44", "7B-E0-F3-7A-21-29", "2E-35-FE-6E-D9-71", "37-FD-9A-27-49-DF", "70-76-09-4E-16-FC", "F3-52-B2-50-20-C8", "38-12-D0-7A-DC-10", "DC-D6-DB-BF-8E-EE", "FE-F9-3A-AD-70-DC", "FF-DB-D1-52-43-93", "E3-AD-5E-07-F6-C3", "9E-C9-D3-2F-05-50", "03-B4-4E-75-D2-F2", "7B-55-EB-BD-6B-B4", "E0-89-61-32-AB-A8", "8A-94-D6-C0-05-B7", "9B-37-C4-C5-0E-BC", "B6-80-79-0F-CE-AC", "96-6F-3C-65-3D-2F", "53-23-3E-44-2B-C8", "F6-FC-C3-B6-DD-D7", "12-09-BB-1F-F3-56", "A1-0E-D7-D4-55-42", "35-0F-D2-9C-C1-BA", "92-A4-11-0C-9E-F2", "CD-5A-43-04-88-C9", "CF-5A-47-9F-81-47", "F6-5B-07-57-DF-19", "C2-AC-32-9C-01-85", "A6-49-2C-12-21-25", "AB-5E-32-40-E2-F1", "49-F8-F3-1C-97-A0", "25-81-C0-68-8F-FE", "50-DB-85-B9-30-B8", "93-A9-0B-5B-11-60", "B2-6F-7F-98-C7-12", "67-0D-E7-C0-5B-73", "F3-A4-1D-D3-48-A3", "E6-EF-F3-08-9F-D3", "13-EC-5C-16-A5-3D", "96-6E-77-90-8F-19", "16-93-E7-74-3C-81", "C4-C6-BF-F3-78-DD", "85-AE-02-64-96-D6", "AF-95-B3-3E-AE-24", "5E-BF-00-5A-DD-BA", "8B-C2-8A-FA-37-EA", "48-20-CA-7B-6C-EC", "76-AD-D3-9F-91-BB", "81-44-D1-EE-CC-80", "A4-06-96-88-65-BA", "BE-8E-2F-8B-91-A1", "16-D7-C5-BD-D2-AB", "0B-6F-A7-89-97-6C", "DD-8E-BE-6C-C2-56", "6E-E6-92-82-32-7B", "29-ED-B1-8C-0C-D8", "30-F5-4A-8E-29-C2", "82-17-CB-59-AD-70", "57-99-50-E0-17-DF", "3F-47-4C-55-7F-68", "E6-C6-40-4A-D9-47", "57-59-91-B5-CB-57", "E6-CC-27-30-53-9D", "70-59-6B-0B-DC-96", "DD-16-A7-A0-55-1A", "8F-D3-E3-55-C6-27", "6F-EE-6C-D0-81-CD", "B5-4E-C8-72-D2-B2", "98-33-52-0B-4D-AC", "9F-F9-1A-E7-3D-77", "85-EB-A0-C5-0D-AF", "0A-EB-8E-94-90-43", "FC-87-4A-8F-7D-EF", "17-AD-8A-A8-B4-55", "EF-E4-95-09-84-68", "10-90-23-07-5F-1F", "AD-BF-5A-BB-91-1A", "1E-10-32-74-DA-C6", "D7-A7-DE-C9-74-3E", "67-2F-8B-81-23-9A", "E8-69-15-89-91-83", "45-38-AC-7E-0B-9C", "95-E1-A7-22-14-83", "8E-D8-4C-CA-6E-16", "BA-54-C5-18-87-35", "32-A7-BB-61-7C-09", "EA-81-FE-D9-4F-81", "3B-A2-0D-BA-0A-22", "10-36-71-FD-AF-FA", "04-7F-05-B3-C3-82", "FE-D8-18-29-3F-58", "8D-82-32-FE-EF-7F", "D8-49-81-5A-49-D7", "B2-66-CE-82-3B-98", "00-3A-46-C9-24-BA", "83-B9-AC-B8-1D-58", "8E-81-31-52-D9-1E", "14-07-BF-3E-ED-64", "43-67-A4-0F-A4-81", "97-6C-FB-4F-15-89", "1F-16-BC-F5-FA-23", "88-20-B9-A1-94-61", "B4-CF-56-4E-D6-9D", "99-E4-57-5A-21-8A", "84-1B-A6-18-6A-C4", "60-D7-A7-03-28-32", "01-42-2A-74-CC-A0", "A6-00-DF-F8-BF-B0", "5C-09-45-F1-87-AE", "E3-46-DC-2C-71-00", "9E-BD-B5-F7-5F-BE", "FF-B6-45-A4-FA-AF", "CC-D0-AD-46-9E-CE", "B4-D1-AB-2A-7E-CD", "46-70-72-5F-4B-26", "9B-F1-18-E0-26-22", "2C-9B-33-5B-BF-17", "11-02-C3-98-C9-F5", "61-83-A9-40-10-74", "32-68-59-42-F6-DA", "09-D7-9A-34-CA-84", "CC-72-DB-34-DE-4C", "7B-0B-C9-C5-73-6E", "41-D8-65-CF-5B-90", "BC-3D-2A-AA-3A-8C", "9C-6C-76-F0-F8-DD", "EB-52-ED-2D-08-41", "30-95-91-D1-D2-3E", "0A-D5-06-16-25-A0", "1F-6D-2F-C0-AD-33", "11-D3-C5-85-52-0B", "94-08-F5-27-18-B9", "91-D8-A9-B4-67-9F", "DF-D5-CB-C4-E6-AF", "3A-70-39-DD-7A-DA", "CF-6F-86-37-38-23", "F0-DE-DF-80-ED-0D", "F2-B9-A5-4A-F5-82", "A8-7D-9F-3C-A3-DF", "FE-18-37-40-70-15", "19-EE-E2-5A-A2-FB", "5E-F9-59-B7-00-8D", "92-FE-0B-D1-0C-83", "7C-C0-21-D2-03-9A", "1C-A5-00-56-61-7A", "C8-94-3A-C7-4C-32", "B0-0A-DB-52-8E-BF", "02-A7-A8-F9-75-94", "43-4F-E3-42-EF-67", "07-CD-B9-AA-CC-DA", "66-F8-92-A8-A4-6B", "24-CB-56-38-29-82", "69-ED-EB-D7-B9-FA", "B6-68-38-2E-F6-0F", "54-00-67-40-A4-37", "CF-CB-57-CC-7F-24", "EF-CB-A3-D3-D3-19", "24-2F-B5-51-C5-BC", "94-DA-64-D3-22-48", "A2-E3-34-BD-D3-7E", "45-91-44-22-F9-B5", "52-E8-88-D4-09-E9", "63-5B-9C-8E-64-BE", "D1-FD-7D-C4-BD-FD", "6F-9B-FB-EC-B1-92", "A4-B9-72-22-AA-2A", "E1-2E-85-E1-93-BA", "85-75-46-90-B0-F8", "3D-3B-97-C5-6B-1B", "AB-FC-24-8F-B9-B7", "65-64-55-55-65-6A", "9B-30-87-99-1F-BE", "3C-4D-77-3D-8C-AC", "0E-5C-85-82-1B-B6", "FA-68-1F-E6-7C-21", "B7-40-7A-E8-C7-1A", "E0-CA-69-F3-3D-30", "46-CC-91-22-94-1D", "19-A1-F1-06-D6-D0", "BC-77-3D-BC-03-B8", "31-43-B4-14-ED-4F", "CD-4E-A8-48-55-37", "97-CE-56-5A-D5-86", "4E-2A-96-BF-37-FC", "56-A6-45-CD-0E-8B", "E3-99-B0-8A-56-C0", "9B-D7-F7-0F-F8-17", "A9-FA-32-43-64-2F", "BF-24-AD-76-0F-A4", "EA-10-B4-CE-18-4F", "38-0B-D5-0D-8B-74", "82-BB-13-CF-E3-E2", "BC-7F-01-E9-EC-2F", "C2-87-82-C2-BC-2A", "FB-EA-1E-E9-5D-3D", "51-29-FB-9C-79-B0", "53-95-BD-DA-EA-3C", "B5-3E-14-8A-13-74", "1D-CE-1F-E0-AA-31", "4C-8B-A4-05-9F-0D", "53-38-66-98-E0-12", "59-95-C9-BF-9F-02", "8B-12-2C-FA-0E-9A", "88-B3-10-07-AA-1D", "D1-51-F1-D0-DB-42", "38-54-57-D7-F7-17", "63-48-BC-50-7F-7B", "CB-E4-C0-D0-96-0B", "BB-BA-ED-E8-7B-DF", "15-E8-45-A6-D5-07", "9E-78-82-D5-85-BF", "02-B3-22-57-07-DD", "FF-D3-A6-BA-02-E9", "B5-3B-A9-08-52-87", "AC-27-28-72-FE-AC", "A5-65-5F-42-2E-18", "26-6D-F0-90-CD-CF", "A3-D7-CC-80-95-BC", "17-D2-F3-64-B2-EB", "17-E0-97-08-60-72", "52-AA-54-F4-DF-14", "EC-E3-E2-C2-0A-EC", "EB-A4-56-94-95-30", "85-8A-46-63-C6-7B", "85-60-2C-6D-D8-A6", "E2-94-28-06-F8-0D", "3C-7A-59-AA-11-C4", "72-B4-17-28-07-40", "E0-1D-3A-37-80-B7", "68-4A-5C-48-AF-ED", "3F-CD-2B-6C-FB-10", "9D-ED-60-C6-7F-0E", "85-EB-A4-BA-E4-4E", "FB-23-29-4B-76-DE", "FA-D0-3F-16-E4-5E", "86-B9-58-61-07-60", "B4-C9-3C-FC-88-33", "41-06-02-CC-F4-D1", "C4-BF-78-A5-E4-E2", "04-EE-97-EE-1C-EC", "4A-68-36-60-54-60", "CF-9F-76-36-2F-19", "33-C9-89-A1-1F-51", "1A-63-4F-6D-47-C7", "B9-26-A8-FD-C3-1B", "29-FD-F1-3E-D4-82", "C9-3F-42-D1-DE-2D", "A8-BE-F4-53-92-74", "63-C0-79-F7-31-51", "85-5C-3D-14-43-40", "98-79-3B-57-13-7A", "AD-CA-17-B8-28-3C", "7F-0C-18-B3-A9-C7", "43-3C-A7-4D-D3-5A", "6C-BC-55-EB-0B-6A", "EA-46-43-A2-04-63", "BB-FD-33-4B-5D-FD", "08-CE-CC-56-D8-18", "99-E7-C8-8F-48-5C", "3D-92-0E-45-0C-08", "22-E3-21-B3-D4-1A", "CB-0D-00-A5-56-E5", "F5-3D-54-86-5F-38", "EA-17-00-12-BE-D7", "53-56-8F-54-6F-50", "8F-21-E5-89-FF-7B", "9B-19-87-16-EB-BE", "90-E4-96-B1-5C-42", "70-E6-6F-C9-79-5B", "F0-67-9F-A9-83-2E", "CD-27-27-63-6F-1C", "34-AA-8A-D7-C3-D1", "A6-56-75-D4-D5-48", "CB-4F-14-06-93-18", "4E-1E-C0-E2-33-92", "85-1A-68-92-6D-7C", "D2-4F-07-83-97-7F", "2D-89-A4-FD-7F-E4", "44-CF-59-92-FB-75", "7C-7E-66-12-4A-E8", "55-1C-B8-3F-DB-C2", "79-ED-DC-93-F3-91", "5D-07-21-0A-C4-D2", "01-EB-E8-0F-AA-DA", "9B-8A-64-56-57-14", "B7-84-3E-04-09-91", "A1-59-32-49-22-A0", "38-79-FE-FE-DB-CA", "4D-E6-94-5E-D2-1B", "87-CF-AA-38-98-30", "23-3A-01-2E-99-E6", "3C-44-B5-40-12-09", "86-34-45-40-24-54", "54-1B-F7-A3-52-A5", "2F-69-0A-EA-43-CF", "1E-ED-7F-CD-DB-59", "CF-2B-87-33-E3-D8", "B2-CC-77-D5-0B-CA", "4E-89-9C-BE-03-21", "C2-43-C2-39-EC-FF", "46-A5-F3-EC-CA-95", "ED-69-90-59-83-A4", "AD-AD-12-3D-00-BA", "EB-E7-99-DF-5D-22", "C6-A8-82-AE-F6-89", "F0-CD-4A-76-7B-07", "4F-F0-DA-0B-D6-63", "DA-FB-5F-F5-0A-05", "46-67-CA-08-2E-FB", "37-75-29-8D-0B-7F", "5E-B1-94-49-DC-D2", "99-CB-FE-53-FC-EF", "A9-8A-BD-E1-00-8E", "AE-FE-2E-0C-3C-9B", "60-17-15-B0-E1-7C", "C1-84-A6-58-EA-88", "73-18-4E-E7-0F-E9", "BA-1D-5F-60-17-6C", "48-31-5D-63-BE-54", "34-B5-3E-B1-39-69", "80-65-CF-11-59-C8", "D8-4D-1A-C7-CB-3D", "5E-E7-28-31-73-BE", "E5-3E-FD-BF-97-4E", "38-56-1C-6F-81-51", "8B-8F-3A-5C-5E-CB", "ED-45-89-C2-82-B9", "12-39-66-4D-CD-13", "B7-E6-B5-1F-EA-79", "53-3F-7A-01-7D-58", "4C-26-1D-E0-BA-1F", "A9-09-CC-2B-80-CF", "15-3B-F7-4B-1E-A2", "00-0F-AA-5E-FC-37", "CF-83-69-33-C9-B8", "23-6B-98-16-59-92", "B1-89-FA-D3-FE-EC", "5E-64-F7-8D-9D-70", "A8-E2-87-BB-4E-75", "82-59-32-38-D9-3E", "E7-E5-26-53-16-AB", "A0-42-46-85-4E-6B", "52-02-B7-70-8B-EC", "81-8F-EA-F6-9D-DB", "E2-AA-FD-B3-2B-87", "C3-E6-89-6D-BA-B5", "D6-23-17-DE-97-42", "BC-24-65-50-B5-DF", "4F-CD-ED-80-08-8F", "10-59-44-22-F0-FE", "6E-0F-9F-6D-AF-E5", "4E-42-29-24-C6-E6", "E7-BA-35-0F-1B-CB", "99-02-82-8B-71-21", "EB-D8-4D-0B-5D-C2", "D3-17-14-6D-86-9D", "C0-74-11-65-63-5D", "7B-B6-77-8C-39-F2", "66-C8-04-E7-A8-AE", "D7-4A-B7-5E-42-B2", "3F-19-6D-F2-BA-0A", "96-8C-71-0C-5B-36", "A9-39-C6-A7-1E-D2", "B8-F2-AF-6D-7C-E4", "BB-2A-04-C3-1E-9B", "40-B0-06-5D-D1-AE", "5E-89-88-84-72-7D", "A4-33-BE-9A-46-84", "9E-9C-4B-2A-49-0E", "E4-AA-FF-AE-D7-DB", "42-7A-D3-A1-AA-5E", "0D-21-A0-8F-01-F7", "17-A0-DF-5C-11-72", "52-A5-06-7F-39-04", "AB-1C-D5-F2-CB-85", "3C-20-FF-F0-2F-08", "91-BE-AE-71-7C-E9", "06-93-AB-AE-DF-9F", "5E-FB-85-90-89-EA", "F4-A9-10-23-27-AB", "87-65-AA-A7-22-61", "DC-A8-63-88-1F-78", "B8-B6-DC-69-90-C6", "E8-66-34-F7-55-C2", "32-12-56-F6-D5-BF", "F0-4E-1D-5D-5B-46", "85-1F-FE-E3-59-09", "91-4A-4E-CD-6F-59", "68-3B-EE-5B-9A-E3", "F7-A3-E1-39-FA-FB", "63-DB-FC-28-58-4D", "6B-7B-90-A8-41-43", "54-9B-12-81-15-D4", "50-DE-3B-48-F2-6A", "69-49-21-28-7D-50", "44-1C-69-3D-07-53", "CF-4A-B3-3C-B3-55", "6F-89-82-9B-47-0F", "E8-08-B3-AE-5F-7D", "BE-92-14-FF-0C-DF", "90-FD-A0-98-99-96", "63-C9-99-CF-3C-2C", "1F-97-12-A4-CC-55", "AB-AE-DF-81-F3-FB", "17-B4-6A-4F-61-31", "5B-A0-EA-9D-AE-32", "CF-28-EA-8C-C6-B7", "3B-91-92-A6-C1-29", "D0-09-FF-14-C5-AE", "EF-F7-76-9E-7E-88", "84-C5-64-13-87-89", "5E-29-B9-D0-AF-4D", "DC-48-CD-5F-04-92", "89-39-28-A1-2B-63", "7D-B8-91-0D-5F-07", "66-66-18-93-E2-82", "CB-20-0F-AC-C2-69", "52-B8-E9-E2-74-D0", "CC-56-80-A3-A9-92", "C6-87-E4-5E-02-46", "E2-B5-56-AE-16-4D", "98-E8-C5-36-02-3E", "DD-20-35-6D-72-97", "45-0D-7A-54-D8-A2", "B2-39-95-43-8F-F7", "CA-2F-79-A8-34-FB", "69-8B-63-E9-7B-B8", "28-2A-6F-75-92-49", "5D-EB-71-6C-86-27", "92-C9-32-AA-D9-99", "4F-99-1D-AC-4A-7E", "03-0F-86-44-EF-DC", "2E-25-89-F5-E0-5C", "16-97-74-AC-E4-19", "3A-A7-6F-26-D0-58", "FC-8F-F4-93-F3-81", "AE-65-D2-B5-CB-3E", "CE-B8-C1-B7-D9-6E", "E7-B8-50-95-A6-82", "3F-C8-44-35-7A-35", "9F-BD-4D-94-D0-C9", "C6-B3-1C-7B-A8-52", "7A-9D-F1-ED-15-B8", "0F-70-A6-B5-49-86", "E6-97-45-EF-A9-09", "9F-00-70-42-BC-C7", "51-DD-26-44-65-D4", "13-D6-DE-3A-DF-67", "B7-F7-61-E0-C3-0E", "BB-70-74-50-6C-A4", "0F-C0-FD-07-28-6C", "BF-CD-CC-DC-7F-6D", "EB-EE-93-F7-59-BB", "B9-DC-D8-1E-BD-95", "F7-88-E0-17-A5-12", "4D-17-A1-EC-9F-CC", "38-D6-DE-36-FF-5D", "FA-AC-21-D9-5E-03", "4A-0F-8E-31-AA-04", "45-39-F9-80-8F-95", "36-37-42-2A-50-FF", "EE-44-B0-25-F5-40", "23-F6-3C-9F-5B-A4", "56-C1-AB-1D-07-94", "C1-65-8D-B2-55-73", "37-E5-57-9C-14-F6", "10-E1-FF-AF-37-3A", "9D-5F-0D-8C-27-81", "0F-25-14-63-49-58", "DC-EC-DD-1B-84-69", "14-EF-15-C6-41-5F", "64-DD-17-56-0F-EC", "B8-BB-4B-C8-87-B8", "EE-86-1A-A7-2A-96", "80-19-37-6C-80-DD", "5A-19-7B-29-B2-3E", "CA-A7-35-28-3E-4D", "35-BD-C6-DA-AB-66", "76-5C-2E-33-AA-D2", "46-CC-91-22-94-1D", "19-A1-F1-06-D6-D0", "BC-77-3D-BC-03-B8", "31-43-B4-14-ED-4F", "CD-4E-A8-48-55-37", "97-CE-56-5A-D5-86", "4E-2A-96-BF-37-FC", "56-A6-45-CD-0E-8B", "E3-99-B0-8A-56-C0", "9B-D7-F7-0F-F8-17", "A9-FA-32-43-64-2F", "BF-24-AD-76-0F-A4", "EA-10-B4-CE-18-4F", "38-0B-D5-0D-8B-74", "82-BB-13-CF-E3-E2", "BC-7F-01-E9-EC-2F", "C2-87-82-C2-BC-2A", "FB-EA-1E-E9-5D-3D", "51-29-FB-9C-79-B0", "53-95-BD-DA-EA-3C", "B5-3E-14-8A-13-74", "1D-CE-1F-E0-AA-31", "4C-8B-A4-05-9F-0D", "53-38-66-98-E0-12", "59-95-C9-BF-9F-02", "8B-12-2C-FA-0E-9A", "88-B3-10-07-AA-1D", "D1-51-F1-D0-DB-42", "38-54-57-D7-F7-17", "63-48-BC-50-7F-7B", "CB-E4-C0-D0-96-0B", "BB-BA-ED-E8-7B-DF", "15-E8-45-A6-D5-07", "9E-78-82-D5-85-BF", "02-B3-22-57-07-DD", "FF-D3-A6-BA-02-E9", "B5-3B-A9-08-52-87", "AC-27-28-72-FE-AC", "A5-65-5F-42-2E-18", "26-6D-F0-90-CD-CF", "A3-D7-CC-80-95-BC", "17-D2-F3-64-B2-EB", "17-E0-97-08-60-72", "52-AA-54-F4-DF-14", "EC-E3-E2-C2-0A-EC", "EB-A4-56-94-95-30", "85-8A-46-63-C6-7B", "85-60-2C-6D-D8-A6", "E2-94-28-06-F8-0D", "3C-7A-59-AA-11-C4", "72-B4-17-28-07-40", "E0-1D-3A-37-80-B7", "68-4A-5C-48-AF-ED", "3F-CD-2B-6C-FB-10", "9D-ED-60-C6-7F-0E", "85-EB-A4-BA-E4-4E", "FB-23-29-4B-76-DE", "FA-D0-3F-16-E4-5E", "86-B9-58-61-07-60", "B4-C9-3C-FC-88-33", "41-06-02-CC-F4-D1", "C4-BF-78-A5-E4-E2", "04-EE-97-EE-1C-EC", "4A-68-36-60-54-60", "CF-9F-76-36-2F-19", "33-C9-89-A1-1F-51", "1A-63-4F-6D-47-C7", "B9-26-A8-FD-C3-1B", "29-FD-F1-3E-D4-82", "C9-3F-42-D1-DE-2D", "A8-BE-F4-53-92-74", "63-C0-79-F7-31-51", "85-5C-3D-14-43-40", "98-79-3B-57-13-7A", "AD-CA-17-B8-28-3C", "7F-0C-18-B3-A9-C7", "43-3C-A7-4D-D3-5A", "6C-BC-55-EB-0B-6A", "EA-46-43-A2-04-63", "BB-FD-33-4B-5D-FD", "08-CE-CC-56-D8-18", "99-E7-C8-8F-48-5C", "3D-92-0E-45-0C-08", "22-E3-21-B3-D4-1A", "CB-0D-00-A5-56-E5", "F5-3D-54-86-5F-38", "EA-17-00-12-BE-D7", "53-56-8F-54-6F-50", "8F-21-E5-89-FF-7B", "9B-19-87-16-EB-BE", "90-E4-96-B1-5C-42", "70-E6-6F-C9-79-5B", "F0-67-9F-A9-83-2E", "CD-27-27-63-6F-1C", "34-AA-8A-D7-C3-D1", "A6-56-75-D4-D5-48", "CB-4F-14-06-93-18", "4E-1E-C0-E2-33-92", "85-1A-68-92-6D-7C", "D2-4F-07-83-97-7F", "2D-89-A4-FD-7F-E4", "44-CF-59-92-FB-75", "7C-7E-66-12-4A-E8", "55-1C-B8-3F-DB-C2", "79-ED-DC-93-F3-91", "5D-07-21-0A-C4-D2", "01-EB-E8-0F-AA-DA", "9B-8A-64-56-57-14", "B7-84-3E-04-09-91", "A1-59-32-49-22-A0", "38-79-FE-FE-DB-CA", "4D-E6-94-5E-D2-1B", "87-CF-AA-38-98-30", "23-3A-01-2E-99-E6", "3C-44-B5-40-12-09", "86-34-45-40-24-54", "54-1B-F7-A3-52-A5", "2F-69-0A-EA-43-CF", "1E-ED-7F-CD-DB-59", "CF-2B-87-33-E3-D8", "B2-CC-77-D5-0B-CA", "4E-89-9C-BE-03-21", "C2-43-C2-39-EC-FF", "46-A5-F3-EC-CA-95", "ED-69-90-59-83-A4", "AD-AD-12-3D-00-BA", "EB-E7-99-DF-5D-22", "C6-A8-82-AE-F6-89", "F0-CD-4A-76-7B-07", "4F-F0-DA-0B-D6-63", "DA-FB-5F-F5-0A-05", "46-67-CA-08-2E-FB", "37-75-29-8D-0B-7F", "5E-B1-94-49-DC-D2", "99-CB-FE-53-FC-EF", "A9-8A-BD-E1-00-8E", "AE-FE-2E-0C-3C-9B", "60-17-15-B0-E1-7C", "C1-84-A6-58-EA-88", "73-18-4E-E7-0F-E9", "BA-1D-5F-60-17-6C", "48-31-5D-63-BE-54", "34-B5-3E-B1-39-69", "80-65-CF-11-59-C8", "D8-4D-1A-C7-CB-3D", "5E-E7-28-31-73-BE", "E5-3E-FD-BF-97-4E", "38-56-1C-6F-81-51", "8B-8F-3A-5C-5E-CB", "ED-45-89-C2-82-B9", "12-39-66-4D-CD-13", "B7-E6-B5-1F-EA-79", "53-3F-7A-01-7D-58", "4C-26-1D-E0-BA-1F", "A9-09-CC-2B-80-CF", "15-3B-F7-4B-1E-A2", "00-0F-AA-5E-FC-37", "CF-83-69-33-C9-B8", "23-6B-98-16-59-92", "B1-89-FA-D3-FE-EC", "5E-64-F7-8D-9D-70", "A8-E2-87-BB-4E-75", "82-59-32-38-D9-3E", "E7-E5-26-53-16-AB", "A0-42-46-85-4E-6B", "52-02-B7-70-8B-EC", "81-8F-EA-F6-9D-DB", "E2-AA-FD-B3-2B-87", "C3-E6-89-6D-BA-B5", "D6-23-17-DE-97-42", "BC-24-65-50-B5-DF", "4F-CD-ED-80-08-8F", "10-59-44-22-F0-FE", "6E-0F-9F-6D-AF-E5", "4E-42-29-24-C6-E6", "E7-BA-35-0F-1B-CB", "99-02-82-8B-71-21", "EB-D8-4D-0B-5D-C2", "D3-17-14-6D-86-9D", "C0-74-11-65-63-5D", "7B-B6-77-8C-39-F2", "66-C8-04-E7-A8-AE", "D7-4A-B7-5E-42-B2", "3F-19-6D-F2-BA-0A", "96-8C-71-0C-5B-36", "A9-39-C6-A7-1E-D2", "B8-F2-AF-6D-7C-E4", "BB-2A-04-C3-1E-9B", "40-B0-06-5D-D1-AE", "5E-89-88-84-72-7D", "A4-33-BE-9A-46-84", "9E-9C-4B-2A-49-0E", "E4-AA-FF-AE-D7-DB", "42-7A-D3-A1-AA-5E", "0D-21-A0-8F-01-F7", "17-A0-DF-5C-11-72", "52-A5-06-7F-39-04", "AB-1C-D5-F2-CB-85", "3C-20-FF-F0-2F-08", "91-BE-AE-71-7C-E9", "06-93-AB-AE-DF-9F", "5E-FB-85-90-89-EA", "F4-A9-10-23-27-AB", "87-65-AA-A7-22-61", "DC-A8-63-88-1F-78", "B8-B6-DC-69-90-C6", "E8-66-34-F7-55-C2", "32-12-56-F6-D5-BF", "F0-4E-1D-5D-5B-46", "85-1F-FE-E3-59-09", "91-4A-4E-CD-6F-59", "68-3B-EE-5B-9A-E3", "F7-A3-E1-39-FA-FB", "63-DB-FC-28-58-4D", "6B-7B-90-A8-41-43", "54-9B-12-81-15-D4", "50-DE-3B-48-F2-6A", "69-49-21-28-7D-50", "44-1C-69-3D-07-53", "CF-4A-B3-3C-B3-55", "6F-89-82-9B-47-0F", "E8-08-B3-AE-5F-7D", "BE-92-14-FF-0C-DF", "90-FD-A0-98-99-96", "63-C9-99-CF-3C-2C", "1F-97-12-A4-CC-55", "AB-AE-DF-81-F3-FB", "17-B4-6A-4F-61-31", "5B-A0-EA-9D-AE-32", "CF-28-EA-8C-C6-B7", "3B-91-92-A6-C1-29", "D0-09-FF-14-C5-AE", "EF-F7-76-9E-7E-88", "84-C5-64-13-87-89", "5E-29-B9-D0-AF-4D", "DC-48-CD-5F-04-92", "89-39-28-A1-2B-63", "7D-B8-91-0D-5F-07", "66-66-18-93-E2-82", "CB-20-0F-AC-C2-69", "52-B8-E9-E2-74-D0", "CC-56-80-A3-A9-92", "C6-87-E4-5E-02-46", "E2-B5-56-AE-16-4D", "98-E8-C5-36-02-3E", "DD-20-35-6D-72-97", "45-0D-7A-54-D8-A2", "B2-39-95-43-8F-F7", "CA-2F-79-A8-34-FB", "69-8B-63-E9-7B-B8", "28-2A-6F-75-92-49", "5D-EB-71-6C-86-27", "92-C9-32-AA-D9-99", "4F-99-1D-AC-4A-7E", "03-0F-86-44-EF-DC", "2E-25-89-F5-E0-5C", "16-97-74-AC-E4-19", "3A-A7-6F-26-D0-58", "FC-8F-F4-93-F3-81", "AE-65-D2-B5-CB-3E", "CE-B8-C1-B7-D9-6E", "E7-B8-50-95-A6-82", "3F-C8-44-35-7A-35", "9F-BD-4D-94-D0-C9", "C6-B3-1C-7B-A8-52", "7A-9D-F1-ED-15-B8", "0F-70-A6-B5-49-86", "E6-97-45-EF-A9-09", "9F-00-70-42-BC-C7", "51-DD-26-44-65-D4", "13-D6-DE-3A-DF-67", "B7-F7-61-E0-C3-0E", "BB-70-74-50-6C-A4", "0F-C0-FD-07-28-6C", "BF-CD-CC-DC-7F-6D", "EB-EE-93-F7-59-BB", "B9-DC-D8-1E-BD-95", "F7-88-E0-17-A5-12", "4D-17-A1-EC-9F-CC", "38-D6-DE-36-FF-5D", "FA-AC-21-D9-5E-03", "4A-0F-8E-31-AA-04", "45-39-F9-80-8F-95", "36-37-42-2A-50-FF", "EE-44-B0-25-F5-40", "23-F6-3C-9F-5B-A4", "56-C1-AB-1D-07-94", "C1-65-8D-B2-55-73", "37-E5-57-9C-14-F6", "10-E1-FF-AF-37-3A", "9D-5F-0D-8C-27-81", "0F-25-14-63-49-58", "DC-EC-DD-1B-84-69", "14-EF-15-C6-41-5F", "64-DD-17-56-0F-EC", "B8-BB-4B-C8-87-B8", "EE-86-1A-A7-2A-96", "80-19-37-6C-80-DD", "5A-19-7B-29-B2-3E", "CA-A7-35-28-3E-4D", "35-BD-C6-DA-AB-66", "76-5C-2E-33-AA-D2", "D5-20-C5-E5-01-39", "25-EC-14-58-DC-61", "71-7D-BB-31-15-20", "80-D4-D7-94-98-E5", "8F-1D-91-25-68-46", "B1-09-5C-05-36-FF", "6E-E7-D9-FD-9F-09", "54-AE-25-FB-D0-ED", "71-6B-2B-F4-F2-44", "13-62-1D-CE-CD-9B", "D6-46-9C-96-EF-C7", "10-BC-2C-BE-CD-25", "4D-6B-91-CA-F5-2C", "D0-B5-5F-83-D6-E3", "42-AB-BA-DE-9F-B1", "CC-CE-45-9A-62-3F", "86-B3-9E-C2-F9-44", "BA-F6-A6-C1-CB-98", "D7-64-14-D1-FE-65", "2D-1C-BE-CC-25-97", "52-54-E9-89-C9-BC", "21-C5-84-5D-E6-B8", "F2-35-BA-0E-10-66", "C1-BA-42-C7-93-C9", "FB-D0-6B-5F-B2-57", "8E-BE-37-B5-49-8B", "CB-54-05-65-F3-FC", "D8-3B-D8-F0-A3-73", "9B-24-BE-BD-3E-CC", "4E-8E-F4-7E-4B-A0", "70-0F-B7-03-B8-48", "A0-4D-DD-0E-8C-74", "41-46-D2-BE-D1-84", "94-BB-8E-18-14-37", "97-7C-0E-A6-4A-EC", "D4-94-5B-43-63-1C", "2A-18-6E-36-13-54", "48-EB-FB-D7-74-C4", "52-7F-C6-2C-07-E3", "AF-B2-50-D5-4A-DC", "D5-9C-19-90-4B-CA", "8F-11-4E-2C-C1-01", "64-52-66-0E-3D-85", "F9-2C-19-0C-09-8E", "ED-08-FD-B6-8E-96", "B1-F3-DE-3D-A5-BF", "F0-05-53-86-DF-0E", "D8-9C-6D-43-84-13", "F4-81-C2-0B-E9-55", "3C-55-F6-95-C3-32", "F7-AC-0F-D3-89-A1", "8E-E4-E3-EF-28-D2", "98-EA-1B-BF-C3-D7", "B6-7F-CF-51-D3-8E", "1B-97-59-03-BE-00", "91-0D-67-FA-1F-CF", "E9-3F-48-D4-78-D2", "4F-FA-78-40-40-72", "2E-36-7E-2B-13-4C", "CB-52-FF-3C-4C-0D", "C1-57-92-CC-37-BA", "85-66-AD-6D-C2-F7", "A5-A8-B2-D1-9C-78", "89-23-A0-62-CD-53", "63-23-B8-C4-D5-48", "58-59-7C-05-71-D6", "0B-45-F9-A8-6C-06", "A8-E0-74-3D-C8-71", "30-35-4A-29-A2-FF", "15-86-F1-43-EA-EC", "34-61-15-6C-67-A3", "23-05-33-1A-CD-15", "44-93-83-D9-61-A5", "2C-F5-F7-D0-D1-B9", "9B-52-90-29-AF-FC", "C1-6E-EC-32-B2-A8", "6C-38-F5-4F-65-27", "B7-DB-C6-60-F7-B2", "D2-93-46-A2-2A-95", "20-8C-BC-BE-8A-DE", "5F-51-EF-F0-39-3A", "6D-7F-36-D0-C9-A8", "64-77-E2-A5-38-76", "2D-64-1F-66-2D-B7", "25-AA-DB-D4-3D-37", "EC-F5-47-57-EE-05", "8F-AC-51-57-CD-6A", "62-6B-CD-64-16-56", "D6-19-24-AB-51-32", "C7-47-EB-AB-AD-B1", "90-12-37-88-67-C6", "50-94-5D-30-BB-AC", "B5-61-E8-D7-DE-70", "C7-A2-EC-90-A6-59", "13-9B-1D-BC-CC-83", "C1-8E-AC-E8-75-97", "F7-78-50-64-68-DC", "E5-5A-49-C8-A8-93", "49-0A-61-65-AE-AD", "73-5F-3C-36-D5-9B", "0B-9C-D2-D7-0B-92", "DE-09-95-FE-44-2A", "77-F6-A4-8A-FE-F6", "CD-D8-D4-B8-20-32", "D0-2D-49-87-F1-EC", "A3-A1-98-2D-88-C5", "D5-80-5C-EA-41-36", "28-2F-7A-E0-80-31", "6B-73-35-FF-7B-39", "8B-9F-15-18-A7-B6", "20-20-A1-68-9E-1D", "6D-DD-0E-57-66-46", "E6-B0-54-F7-35-1F", "1C-3E-CE-43-1D-97", "17-68-C9-F1-76-66", "ED-6F-91-87-BA-21", "41-96-A1-E3-D9-5F", "20-1D-8A-53-84-40", "DF-FA-BA-1B-32-5D", "84-5E-DE-26-EC-7A", "88-8A-18-32-51-D1", "12-1D-8E-DA-5A-0E", "29-21-53-35-A1-96", "01-0A-8C-16-0B-43", "D2-62-F4-E5-75-85", "43-50-94-23-E9-DA", "27-21-5A-11-7C-16", "E4-72-52-B0-3C-F0", "D0-01-E1-F1-16-9A", "14-EA-E8-7B-86-0A", "8D-EB-FC-A2-CC-91", "B9-6A-9B-BC-A7-A8", "BD-54-38-84-75-CD", "DA-C0-5E-66-59-1D", "B7-C0-4C-8B-E0-28", "0C-F8-99-53-1E-BC", "A4-89-E6-A9-42-02", "61-7F-EE-FC-0A-9F", "C9-C0-75-9A-72-E2", "14-2A-A2-0B-7A-59", "3C-52-65-CB-57-BC", "67-95-72-8F-69-2D", "54-5B-90-5A-80-86", "89-91-F1-31-FA-AF", "03-6D-27-2C-7E-17", "7A-1D-8A-2A-F8-75", "C9-1D-70-16-09-75", "E1-46-AF-4C-71-A0", "2D-0A-4C-E2-56-60", "E7-6A-5B-7A-B1-61", "6F-54-9C-4E-A0-82", "BE-71-C1-FA-3B-D7", "F8-8A-1C-A4-1F-08", "06-6C-5C-B1-0B-CF", "AE-1B-BB-E8-D9-24", "5C-03-54-AA-11-9B"]
                let rmac = listrmac[Math.floor(Math.random() * listrmac.length)]
                client.reply(from, rmac, id)
                break
            case '!spotify':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                const listspotify = ["kalnikr@o2.pl:Dj1raffy", "tim.kunstmann97@gmail.com:timkunstmann9700", "jr@5sm.de:Janriseby19", "Christianschwanse@gmx.de:Christian1", "max.heesen@web.de:Aq1sw2de3", "fer_1008@hotmail.com:F1008pb19 ", "vale.broe552@gmail.com:Allegria123 ", "shimin123@gmail.com:S9770398a ", "pulse_360@hotmail.co.uk:Borntodance1 ", "lilyrussell2003@yahoo.com:Coolgirl700", "cameroncarbone@yahoo.com:Familyof4", "jevondabomb13:Jevon101", "xandyboy92:Leeboy52", "muddiemc:3greatpups", "beejleffard@gmail.com:Bologna08", "jakobs@hotmail.ca:eyrir4292", "gregg435:blackyg13", "jessicaselim:Ukku9860", "rocha.elida@gmail.com:Casa0718 ", "rebecca12reid@hotmail.com:Email123! ", "daltn619@gmail.com:SEHS4ever!", "ntvi.tran@gmail.com:Sawtelle1 ", "rachaelcollins1@hotmail.com:Celtic01 ", "dowdallsuzanne@yahoo.ie:Sunflower1 ", "fer_1008@hotmail.com:F1008pb19 ", "vale.broe552@gmail.com:Allegria123 ", "shimin123@gmail.com:S9770398a", "polrola@netzhafen.de:hannover97", "max.heesen@web.de:Aq1sw2de3! ", "Christianschwanse@gmx.de:Christian1", "jr@5sm.de:Janriseby19", "kalnikr@o2.pl:Dj1raffy", "kristof.adorjan@gmail.com:Spike123", "lukelang95@gmail.com:Prince14", "rashbeno@hotmail.com:Porter4me2", "ironskull42@gmail.com:Narg4242", "magbelando@hotmail.com:Cr79kaka", "christoph.reisacher@gmx.at:Asd123er", "gutimajada@gmail.com castigador ", "sbbranco2527@gmail.com 2527sisi ", "antguief@gmail.com RaqueL0611", "julianeribeiroo@hotmail.com ribeiro 281", "augustomra@yahoo.com. br:gut351", "bernardielisaa01@gmail.com martellago1234", "Tleticiamlopes@hotmail.com le010394", "megdoug6@hotmail.com trewq96070627", "zontalaura11@gmail.com keramicos131", "mlfpaisagismo@gmail.com:malu1923", "roselopesconsultoria@gmail.com r11221pb", "lojaigc63@gmail.com lorenlazu53|", "martins@hotmail.com aaghpd330BR", ""]
                let spotify = listspotify[Math.floor(Math.random() * listspotify.length)]
                client.reply(from, spotify, id)
                break
            case '!netflix':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                const listnetflix = ["xiaoyu1039@21cn.com:13828617891", "trolly@t-online.de:Ritterkreuz39", "th3-g2m3@t-online.de:nelly4456", "zhangchujie@21cn.com:3232702", "rene-brameier@t-online.de:Rene2855345", "regina-messinger@t-online.de:sunshine12", "schneidermarcella@t-online.de:Marcella1", "u.irnich@t-online.de:johanna1", "walpetsls@t-online.de:amadeus070200", "yaoruoepjjwr@21cn.com:28969314", "robertniblock@tiscali.co.uk:rectory", "ssfloveyou@21cn.com:0o0oo08e5a", "tyihu@21cn.com:baplbapl", "zeroix@t-online.de:slwork357", "red_or_dead@freenet.de:harass", "zhouli258@21cn.com:25258258", "janette.gillenwater@gmail.com:Disney01", "dpitcher1088@yahoo.com:Flipout13", "rallenrii@gmail.com:Hxxcx264", "saxcole@gmail.com:Alcatraz5", "mljmyers@gmail.com:Jd1llonz", "lilmetalallyson@gmail.com:Metalsies1", "leslie_daugherty@yahoo.com:zaq1XSW@", "adam.v.todd@gmail.com:Teriyakipanda17", "fabiana.knipp@gmx.de:Star2001", "candacewalters13@gmail.com:candida1", "thillouxlaureen@gmail.com:melena666", "outersight@hotmail.com.au:Yourdead1", "rokito98@hotmail.it:capitano98", "Dayanagelin4@gmail.com:Da0615086505", "shubhamchandgude1995@gmail.com:9657055403 | Expiry_Date = 2021-04-26 | Plan = ALTBalaji Yearly (IN) | Days Left = 139 | ", "bkharshavardhan@gmail.com:Vardhan27 | Expiry_Date = 2021-05-07 | Plan = ALTBalaji Yearly (IN) | Days Left = 150 | ", "aseem.fieryskull@gmail.com:aseemm24 | Expiry_Date = 2020-12-12 | Plan = ALTBalaji Yearly (IN) | Days Left = 4 | ", "karthik.ramesh@gmail.com:Sddh0526 | Expiry_Date = 2021-03-30 | Plan = ALTBalaji Yearly (IN) | Days Left = 112 | ", "oneline.shopping@gmail.com:26605231 | Expiry_Date = 2021-01-08 | Plan = ALTBalaji Quarterly (IN) | Days Left = 31 |", "theowneege52@gmail.com:Hotdog52! | RenewDate = 2020-11-06", "mcdonnellfree@gmail.com:GEM020201 | RenewDate = 2020-09-24", "thecrow94@gmail.com:Janice23! | RenewDate = 2020-11-02", "warrenglen3@icloud.com:Pandaninja1 | RenewDate = 2020-10-23", "jennahochmuth@gmail.com:jenna1213", "kurt.porter@gmail.com:59SAnjose$%", "joe.jancauskas@gmail.com:jrjMe163b", "kenzo2.an@gmail.com:solo1234", "jerjack12@gmail.com:935yug*1", "kipleyth@gmail.com:encarta7", "kiabmok@gmail.com:stevie00", "kfastuff@gmail.com:Stockholm1!", "kazarianmaria@gmail.com:Redlipstick1", "kbaggettt@gmail.com:danny9554", "chelsie.hotard@gmail.com:nph122708", "jross449@aol.com:jman101368", "jonathantejada4153@gmail.com:Sasuke123", "petree2012@iCloud.com:Aggies125", "ross_grimes@yahoo.com:Godis1st", "stephamon1@outlook.com:Holland1", "cindy.hinckley@gmail.com:MollyMoo1", "willy.t500@gmail.com:12PLwt34", "haleydutton37@gmail.com:Hd07292002", "jeremylee309@gmail.com:KJYljy309", "protodrago90@gmail.com:Prototype90", "flowersjudy42@gmail.com:Flowers79", "maccaird@gmail.com:Sillygreen27", "zaxqsc1234@gmail.com:Zaxqsc12", "jj141907@gmail.com:Perdy141907", "pfitzy12@gmail.com:6112Fitzy", "raychelleb1287@gmail.com:Jsheun02", "anil_7008.in:dreamgirl", "anil_kumar_be.in:son770elk922", "anil_bhardwaj85.in:9990719511", "ajaymaurya85.in:salem5675", "akanksha_sri_kota.in:smarter", "amit.upadhyay1984.in:12ramkrishna", "amit_chaurasia_87.in:indorama", "anishathewinner@gmail.com:anisha2424", "apaul839@gmail.com:arindampaul839 ", "jaideep400@yahoo.co.uk:dynamics ", "mahanta@tatamotors.com:symmond14", "manjirikanhere@gmail.com:Rainbow@1 ", "nandu1984@gmail.com:damu@1234 ", "s.debasish79@gmail.com:redrose79", "dayamayii@pobox.com:a1dan247", "tenchikaku@gmail.com:buddha1984", "joel.l.abelson@gmail.com:ABELson1234", "reionndamone@yahoo.com:nnoier", "jamestoffee@hotmail.com:Provs163", ""]
                let netflix = listnetflix[Math.floor(Math.random() * listnetflix.length)]
                client.reply(from, netflix, id)
                break
            case '!akun':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                const listakun = ["xiaoyu1039@21cn.com:13828617891", "trolly@t-online.de:Ritterkreuz39", "th3-g2m3@t-online.de:nelly4456", "zhangchujie@21cn.com:3232702", "rene-brameier@t-online.de:Rene2855345", "regina-messinger@t-online.de:sunshine12", "schneidermarcella@t-online.de:Marcella1", "u.irnich@t-online.de:johanna1", "walpetsls@t-online.de:amadeus070200", "yaoruoepjjwr@21cn.com:28969314", "robertniblock@tiscali.co.uk:rectory", "ssfloveyou@21cn.com:0o0oo08e5a", "tyihu@21cn.com:baplbapl", "zeroix@t-online.de:slwork357", "red_or_dead@freenet.de:harass", "zhouli258@21cn.com:25258258", "janette.gillenwater@gmail.com:Disney01", "dpitcher1088@yahoo.com:Flipout13", "rallenrii@gmail.com:Hxxcx264", "saxcole@gmail.com:Alcatraz5", "mljmyers@gmail.com:Jd1llonz", "lilmetalallyson@gmail.com:Metalsies1", "leslie_daugherty@yahoo.com:zaq1XSW@", "adam.v.todd@gmail.com:Teriyakipanda17", "fabiana.knipp@gmx.de:Star2001", "candacewalters13@gmail.com:candida1", "thillouxlaureen@gmail.com:melena666", "outersight@hotmail.com.au:Yourdead1", "rokito98@hotmail.it:capitano98", "Dayanagelin4@gmail.com:Da0615086505", "shubhamchandgude1995@gmail.com:9657055403 | Expiry_Date = 2021-04-26 | Plan = ALTBalaji Yearly (IN) | Days Left = 139 | ", "bkharshavardhan@gmail.com:Vardhan27 | Expiry_Date = 2021-05-07 | Plan = ALTBalaji Yearly (IN) | Days Left = 150 | ", "aseem.fieryskull@gmail.com:aseemm24 | Expiry_Date = 2020-12-12 | Plan = ALTBalaji Yearly (IN) | Days Left = 4 | ", "karthik.ramesh@gmail.com:Sddh0526 | Expiry_Date = 2021-03-30 | Plan = ALTBalaji Yearly (IN) | Days Left = 112 | ", "oneline.shopping@gmail.com:26605231 | Expiry_Date = 2021-01-08 | Plan = ALTBalaji Quarterly (IN) | Days Left = 31 |", "theowneege52@gmail.com:Hotdog52! | RenewDate = 2020-11-06", "mcdonnellfree@gmail.com:GEM020201 | RenewDate = 2020-09-24", "thecrow94@gmail.com:Janice23! | RenewDate = 2020-11-02", "warrenglen3@icloud.com:Pandaninja1 | RenewDate = 2020-10-23", "jennahochmuth@gmail.com:jenna1213", "kurt.porter@gmail.com:59SAnjose$%", "joe.jancauskas@gmail.com:jrjMe163b", "kenzo2.an@gmail.com:solo1234", "jerjack12@gmail.com:935yug*1", "kipleyth@gmail.com:encarta7", "kiabmok@gmail.com:stevie00", "kfastuff@gmail.com:Stockholm1!", "kazarianmaria@gmail.com:Redlipstick1", "kbaggettt@gmail.com:danny9554", "chelsie.hotard@gmail.com:nph122708", "jross449@aol.com:jman101368", "jonathantejada4153@gmail.com:Sasuke123", "petree2012@iCloud.com:Aggies125", "ross_grimes@yahoo.com:Godis1st", "stephamon1@outlook.com:Holland1", "cindy.hinckley@gmail.com:MollyMoo1", "willy.t500@gmail.com:12PLwt34", "haleydutton37@gmail.com:Hd07292002", "jeremylee309@gmail.com:KJYljy309", "protodrago90@gmail.com:Prototype90", "flowersjudy42@gmail.com:Flowers79", "maccaird@gmail.com:Sillygreen27", "zaxqsc1234@gmail.com:Zaxqsc12", "jj141907@gmail.com:Perdy141907", "pfitzy12@gmail.com:6112Fitzy", "raychelleb1287@gmail.com:Jsheun02", "anil_7008.in:dreamgirl", "anil_kumar_be.in:son770elk922", "anil_bhardwaj85.in:9990719511", "ajaymaurya85.in:salem5675", "akanksha_sri_kota.in:smarter", "amit.upadhyay1984.in:12ramkrishna", "amit_chaurasia_87.in:indorama", "anishathewinner@gmail.com:anisha2424", "apaul839@gmail.com:arindampaul839 ", "jaideep400@yahoo.co.uk:dynamics ", "mahanta@tatamotors.com:symmond14", "manjirikanhere@gmail.com:Rainbow@1 ", "nandu1984@gmail.com:damu@1234 ", "s.debasish79@gmail.com:redrose79", "dayamayii@pobox.com:a1dan247", "tenchikaku@gmail.com:buddha1984", "joel.l.abelson@gmail.com:ABELson1234", "reionndamone@yahoo.com:nnoier", "jamestoffee@hotmail.com:Provs163", "jordan_crow_123@hotmail.com:000184891", "pizzarulz4@gmail.com:blackops", "tippy_55@hotmail.com:pop890", "steven98martin@yahoo.com:stopwatch", "brendanho88@hotmail.com:159874", "ryanbanks33@yahoo.com:1ani3ta", "kifayat28@yahoo.com:29938000", "felipeecheverri@aol.com:felipe", "armedbananaforce@yahoo.com:kitty5848890", "whitesoxrock@comcast.net:tread", "imj-schmidt@t-online.de:123456789", "devilboyr@mail.com:501167", "johnapeman@gmail.com:elephant", "mciltrot34@yahoo.com:mciltrot", "madusa@optonline.net:monster", "jcraven434@yahoo.com:darkruff", "the.big.d.man@hotmail.com:chicken737", "chrisjamesolson@gmail.com:chris999", "joseph1290@gmail.com:xgef97[]", "julius.98@hotmail.com:julius98", "imdeonerik@gmail.com:imbored", "u_o_me111@yahoo.co.uk:crikMD46", "juliansa96@yahoo.com:rainbow", "jrmorgan@pelagius.com:jrm312", "icedman0923@gmail.com:oldestbro23", "marko.antonio.igrc@gmail.com:NEDIRAJVENE", "bonnaroo085548@hotmail.com:steal682", "tj3932@yahoo.com:7712kk", "apybus@live.co.uk:orange", "matt.neicho@btinternet.com:homer17177", "chrisjamesolson@gmail.com:chris999:kootrasmellsbad", "me-cody@hotmail.com:swans56:bowerbird100", "tyler.iocco@yahoo.com:789456123147:knowing147", "davecase1@gmail.com:1234qwer:brief1", "jquilty@uk2.net:bentley:jquilty", "sebastianbruckner.q@gmail.com:15nov96:adicogames", "daniels.j5@sky.com:clone432", "sundrobin@gmail.com:001120robin", "janis1197@inbox.lv:vikings455", "imdeonerik@gmail.com:imbored", "see509@aol.com:lisabeth", "jordan_crow_123@hotmail.com:000184891", "killer.kirby@hotmail.com:empire331", "draco20@live.nl:3201baz", "steven98martin@yahoo.com:stopwatch", "sebastianbruckner.q@gmail.com:15nov96", "emilbh@yahoo.no:Passord010", "bradleyboo@hotmail.co.uk:charlie10", "julius.98@hotmail.com:julius98", "asarielgarcia@yahoo.com:margarita11", "kelvinklenke@yahoo.com:klenkekel", "trinitymae@live.com:unbathed", "spartan31590@bellsouth.net:period10", "guilleross@hotmail.com:477218", "sean_kehoe@hotmail.co.uk:liverpool666", "iankw@comcast.net:tampabay", "nafster11@gmail.com:fuzzfuzz", "ryanbanks33@yahoo.com:1ani3ta", "effetrold@hotmail.com:241248", "adam.mr.star@gmail.com:akatsuki", "davecase1@gmail.com:1234qwer", "the.big.d.man@hotmail.com:chicken737", "mciltrot34@yahoo.com:mciltrot", "jquilty@uk2.net:bentley", "bodonoghue94@gmail.com:020394", "armedbananaforce@yahoo.com:kitty5848890", "jrmorgan@pelagius.com:jrm312", "me-cody@hotmail.com:swans56", "colinjoseph2003@yahoo.com:jack32", "charleswaynec56@yahoo.com:obukey", "sunny@rediffmail.com:000000", "myonlinejob247@gmail.com:ADEMOLA81", "sabir.wasim@gmail.com:zahsal786", "satishadposting@gmail.com:sinked", "gisjobinfo@gmail.com:ab327629", "websurfing123@gmail.com:asimmemon", "susan_yor@hotmail.com:frufru98", "kashi0300@hotmail.com:syedalih", "gmcitypetlover88@yahoo.com:donkoko", "info@falak-furnitures.com:abs147", "yssr@hotmail.com:venom22", "phil_devils@hotmail.com:sammiebear", "christy2812@gmail.com:chandraa", "info@azsoft.474.jp:azahoor", "gareth@covercian.co.uk,w0lfgang", "rena.elizondo@nascentric.com,re092971", "abewashington@gmail.com,mazamaza", "y99@BlackPlanet.com,yaritza", "lstarr65@hotmail.com,wabbit", "frederic.dudilot@unicem.fr,240169", "scporfirio@hotmail.com,sp007865", "awaneeshpande@yahoo.com,sweta76", "aida.marcial@exitsouth.com,pebbles_1", "linkedin@depallens.com,phd768", "Danizao.cruz@gmail.com,Caxcas", "sarah@spark.net,linked55", "irenakun@yahoo.com,steinke", "LMWesttown@aol.com,Bailey", "asharma05@gsb.columbia.edu,4success", "scott@smcgregor.com,cit1st", "brett.hopcroft@linklaters.com,springbokkie", "Farokh.Balsara@in.ey.com,varun99", "Abigail_Caspar@cable.comcast.com,lewis123", "instanttim@me.com,techno", "odenir.proservice@ig.com.br,proalma", "tkircher@mentor4inc.com,walker", "zyu8@yahoo.com,meiqiu", "michele@radiatepr.com,sydney", "kevin.hartz@stanfordalumni.org,sleepy99", "esteban.erize@samsistemas.com.ar,campana3", "rterkowitz@ABSCapital.com,mikejeff", "tobygoldblatt@yahoo.co.uk,bananna", "eric.pers@gmail.com,Buddy18", "alexander.artope@gmail.com,julian85", "soegtrop@muenster.de,mallorca", "jamesbuckle@yahoo.com,sunshine", "stvnwcnrd@hotmail.com,cf3825et", "mounia.popovic@gmail.com,Benamar", "jim_argalas@presidiounion.com,gura755", "fabernjudd@comcast.net,itsasecret", "k.chinn@stanfordalumni.org,br1tn3y", "acritchett@one-economy.com,lovelove", "lbraziel@wcwdcorp.com,2320255a", "william@objecthouse.com,kenufa", "bflorian@gmail.com,hedges", "sharting@onfuego.com,success", "retz@yahoo.co.jp,retz5011", "markd@borkware.com,fnord23", "aclcarter@yahoo.co.uk,password", "d.h.elzinga@freeler.nl,siepmaus", "kimberly.oblak@gbmail.com,Spring41", "masont@gtlaw.com,gorham", "hugo_gayoso@hotmail.com,valeguada", "venema@vhu.de,poespoes", "lisa@fitfor2.com,5fitfor2", "dcalao@modernelectric.com,bigd5576", "Sheila.Kennedy@mortgagefamily.com,lucky21", "jaimerebecca@gmail.com,horatio", "binho@scriptbrasil.com,19071982", "lainie.coplan@cbeyond.net,pink82", "jodi.albanese@i-deal.com,Password22", "sarah.ambrose@hmhpub.com,whitney1", "bnselby@stanfordalumni.org,Orange061", "ppy1@cornell.edu,denguyen", "nmadhu@MIT.EDU,mymummy", "Itai.Frieberger@888holdings.com,01360136", "Nagharaj_BG@Dell.com,nagharajbg", "andrew@andrewrobertson.com,qwerty", "wdknights@hotmail.com,Inside01", "posnerlj@comcast.net,larisa", "richard@geeksoncall.com,preston", "francois.granger@gmail.com,edcrfv", "ashetty@dataglance.com,nishita97", "borism@iqmetrix.com,vlad2171", "stighammond@gmail.com,ufellow1", "jrusoff@mac.com,nagual", "JFarris@corillian.com,kylep826", "david@peerplus.com,8lunch", "jvnprakashrao@hotmail.com,yamini99", "trakwebster@traktor.com,poot2077", "y2b@your2ndbrain.com,tigers", "lionel.jean@gemplus.com,bonsamis", "josh@wulumulu.com,013572", "jokir@earthlink.net,sadie1", "davefl12@yahoo.com,beaver", "linkedin@matthewburgess.com,shogun", "wwynens@attbi.com,taoboy", "avachat@hotmail.com,abhay19", "Alejandro.Canavati@gecapital.com,pahola", "behlov@yahoo.com,upgrades", "subas11us@yahoo.com,subhash", "pchaynes1063@gmail.com,roadking", "tking@vmem.com,barney", "simone@evectors.it,nideknil", "Dan.Wilson@qwest.com,linked34", "yumihosaka@yahoo.com,chococookie", "linkedin@hacksciences.com,fandango", "jeff.snyder@wdc.com,annabear", "jwvogel@tosbv.nl,vogel550", "janet.wong@smgunited.com,selena", "mvanwijk@Verizon.net,20051915", "rerb@analysts.com,superb", "the.gibbards@virgin.net,butterfly", ""]
                let akun = listakun[Math.floor(Math.random() * listakun.length)]
                client.reply(from, akun, id)
                break
            case '!cc':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                const listcc = ["American Express,3491 656142 87713,6674,2853,$2062,8,2029,Henry Macias,Portia Road 4728,Marshall Islands", "American Express,3491 656152 59646,3839,5235,$17827,1,2027,Ingrid Duke,Morgans Walk 9311,Sudan", "American Express,3491 656104 06424,6277,9753,$19065,7,2025,Josie Kirkland,Fludyer Street 6468,Netherlands", "American Express,3491 656121 25634,7254,1937,$13730,9,2024,Steven Hancock,Bonneville Gardens 5769,Singapore", "American Express,3491 656109 36677,2371,1091,$574,2,2021,Corey Cortez,Hamilton Close 4249,Singapore", "American Express,3491 656143 99880,9638,5996,$15787,10,2028,Isaias Chambers,Short Place 5305,Switzerland", "American Express,3491 656169 53478,3130,5425,$13471,7,2029,Reina Lowe,Orton Street 4343,Brazil", "American Express,3491 656155 27828,2198,5913,$14763,2,2029,Terence Cruz,St. Giles Road 1364,Cuba", "American Express,3491 656163 04268,9824,7587,$8832,10,2023,Madeline Cruz,St. Edmunds Close 479,United Kingdom", "American Express,3491 656166 24681,6279,9346,$10157,1,2028,Kelley undefined,City Well Street 1959,Italy", "American Express,3491 656162 58605,9784,8187,$5508,12,2024,Ignacio Ramsey,Penley Court 9145,Suriname", "American Express,3491 656152 21307,2701,7448,$1712,5,2025,Scott Leonard,Weston Rise 4691,Italy", "American Express,3491 656174 41150,2016,4002,$14934,10,2023,Arron King,Weymouth Terrace 9779,Bermuda", "American Express,3491 656194 80446,3179,6080,$2265,3,2022,Nova Bruce,Harry Street 4892,Togo", "American Express,3491 656148 18731,3005,7486,$11623,9,2026,Thaddeus Robinson,Queensdale Walk 1008,Spain", "American Express,3491 656167 03279,4801,2918,$16787,3,2025,Gordon Vargas,Bellenden Road 5976,Puerto Rico", "American Express,3491 656104 56387,9921,5727,$10219,2,2025,Annalise Patton,Seaton Place 527,Jamaica", "American Express,3491 656147 88686,4451,7740,$1493,4,2028,Judith Craft,Spears Road 3082,Georgia", "American Express,3491 656192 91371,2635,3214,$19969,7,2025,Bradley Dominguez,Old Brompton Road 1786,Italy", "American Express,3491 656196 01413,9583,7434,$8747,4,2027,Curt Trujillo,Brewer Street 8205,Martinique", "American Express,3491 656182 17450,8114,6024,$7847,10,2029,Chuck Trevino,Babmaes Street 4186,Bahamas", "American Express,3491 656113 10690,4228,7316,$11564,4,2022,Brent Patel,Fulham Broadway 7007,Croatia", "American Express,3491 656137 32560,9648,3723,$421,11,2027,Corinne Ferrell,Newtown Street 1782,Zimbabwe", "American Express,3491 656169 75281,2181,2070,$13954,10,2022,Marty Ramsey,Baron Close 8055,Niger", "American Express,3491 656189 33593,8547,1947,$17173,7,2021,Jere Vincent,Queensdale Place 6273,Jamaica", "American Express,3491 656143 31255,9600,8957,$3351,2,2023,Tuan Cross,Mount Place 4754,Singapore", "American Express,3491 656192 76190,6261,9210,$1117,1,2026,Casey Shields,Digby Crescent 9384,Sweden", "American Express,3491 656188 48767,2533,9913,$19019,11,2025,Melanie Mason,Askew Buildings 2635,Netherlands", "American Express,3491 656134 93270,3737,4793,$7678,1,2025,Bill Pollard,Brodlove Court 6344,China", "American Express,3491 656185 96143,3635,5672,$13540,10,2024,Susan Stafford,Sprimont Place 3846,China", "American Express,3491 656171 55156,8760,2142,$13974,7,2023,Irving Roy,Parfett Street 2215,Philippines", "American Express,3491 656166 35133,1960,4521,$12063,11,2026,Miranda Black,Friend Street 8055,Nigeria", "American Express,3491 656187 00448,4630,5065,$12040,1,2025,Ron Forbes,Kilner Street 6751,Madagascar", "American Express,3491 656150 71017,1901,1480,$19832,5,2026,Kimberly Goodman,Malcolm Place 6608,Iraq", "American Express,3491 656129 76093,1784,1419,$2398,1,2028,Joelle Fox,St. Giles Passage 9183,China", "American Express,3491 656164 82296,6047,4675,$4333,6,2029,Cleo Mccoy,Birkenhead Street 2046,Ukraine", "American Express,3491 656114 31108,1618,1158,$9378,12,2027,Dexter Lane,St. Giles Road 4624,Nauru", "American Express,3491 656113 86393,6370,3591,$7296,4,2022,Ward Franklin,Head Street 3804,Netherlands", "American Express,3491 656184 63955,6637,7654,$1253,7,2028,Gerard Manning,Pomeroy Square 5731,Sweden", "American Express,3491 656151 12258,1181,7668,$15138,12,2022,Grace Ramsey,Gloucester Road 2314,Netherlands", "American Express,3491 656174 31912,7023,2348,$16531,8,2025,Dylan Scott,Barnabas Road 6231,Gibraltar", "American Express,3491 656173 53165,9537,6953,$5109,4,2025,Gail Finch,Bletchley Street 1449,Serbia", "American Express,3491 656162 43649,9792,1791,$15581,3,2029,Jonathan Rich,Chester Square Mews 8490,Argentina", "American Express,3491 656192 25452,3017,9877,$7397,11,2027,Naomi Underwood,Oranmore Mews 5746,United Kingdom", "American Express,3491 656139 53026,2478,8040,$16877,1,2022,Alisha Hubbard,Benhill Road 8490,New Zealand", "American Express,3491 656126 87047,6875,7339,$163,9,2023,Alfonzo Burt,Eton Garages 5775,Palau", "American Express,3491 656107 63881,2361,6240,$17670,12,2027,Edgardo Schroeder,Sunbury Street 6924,Singapore", "American Express,3491 656127 22935,1492,5817,$14512,11,2027,Billy Rodriguez,Trio Place 3884,Gibraltar", "American Express,3491 656159 62355,8052,9389,$11710,2,2024,Scott King,Timothy Road 6201,Jamaica", "American Express,3491 656164 03797,3786,1770,$16694,12,2024,Darron Chase,Copperfield Street 1795,Singapore", "American Express,3491 656173 07112,7960,4568,$15063,11,2024,Joyce Fernandez,Bourchier Street 6182,Lebanon", "American Express,3491 656140 95512,1861,7574,$4416,3,2023,Kallie Ellison,Ormsby Place 390,Christmas Island", "American Express,3491 656154 71415,1159,1174,$19262,9,2029,Thomas Hampton,Penfold Street 4731,Croatia", "American Express,3491 656190 20325,1312,6012,$9335,11,2026,Teodoro Pearson,St. Stephens Gardens 6600,Colombia", "American Express,3491 656177 13830,1577,3994,$15445,1,2021,Arthur Craft,Adderley Street 9524,Israel", "American Express,3491 656168 20842,2663,5670,$8467,12,2021,Wesley Delacruz,Whitehaven Street 444,Togo", "American Express,3491 656176 41171,4757,8334,$1635,12,2021,Noel Garcia,Saffron Hill 8244,United Kingdom", "American Express,3491 656174 20188,5196,1455,$108,7,2028,Damion Christensen,Joan Street 5752,Kyrgyzstan", "American Express,3491 656136 28768,8508,4257,$15514,9,2029,Jewel Cotton,Dacre Place 3833,Finland", "American Express,3491 656185 11001,9049,1672,$11941,11,2027,Stevie Shaffer,Sale Place 6971,Ukraine", "American Express,3491 656148 58414,3444,1790,$6009,2,2024,Ivory Contreras,Gatonby Street 1091,Sweden", "American Express,3491 656162 71889,5368,5414,$18725,4,2024,Tony Rowe,Sundermead Road 4594,Norway", "American Express,3491 656110 47367,3203,4930,$11570,3,2022,Dwight Wilkinson,Kingswood Drive 9914,Samoa", "American Express,3491 656160 01054,8233,2646,$10723,7,2029,Eliza Pierce,St. Jamess Approach 2413,Philippines", "American Express,3491 656179 78763,8186,4416,$16366,11,2026,Mia Whitehead,Green Dale 3182,Rwanda", "American Express,3491 656116 21195,4057,1015,$15867,2,2028,Donald Gregory,Hanover Place 8947,Peru", "American Express,3491 656174 69672,3125,1319,$12604,5,2027,Evangeline Sharpe,Chester Way 9096,Luxembourg", "American Express,3491 656144 41450,6458,2580,$12436,11,2029,Antonia Irwin,Rutherford Street 2122,Saint Lucia", "American Express,3491 656160 02292,2805,7901,$5957,10,2023,David Walton,St. Georges Market 1736,Niger", "American Express,3491 656167 08781,9504,1920,$1233,2,2023,Cali Henson,Rogate Road 5972,Slovenia", "American Express,3491 656118 98611,5831,2953,$17889,5,2023,Marc Kidd,Folgate Street 3922,Iceland", "American Express,3491 656163 27798,9165,6333,$14348,8,2022,Osvaldo Lindsey,Wessex Street 5676,Italy", "American Express,3491 656197 68907,9286,5512,$6473,1,2024,Hannah Valencia,Danube Street 2280,Greenland", "American Express,3491 656165 07001,9827,9124,$3031,9,2025,Jacqueline Olson,Calvin Street 9943,Malawi", "American Express,3491 656161 47642,4535,3170,$3680,3,2024,Roger Foreman,Padbury Court 6859,Turkey", "American Express,3491 656129 67704,9290,8839,$10732,1,2028,Warner Compton,Lyon Street 5180,Colombia", "American Express,3491 656155 78599,7349,5161,$15328,11,2027,Theo Thompson,Watergate 8735,Maldives", "American Express,3491 656198 04652,1461,5232,$104,4,2022,Sherwood Lester,Sandbrook Road 4446,Chad", "American Express,3491 656159 08713,5000,2679,$14448,5,2028,Gale Stephens,St. Philip Square 2295,Greenland", "American Express,3491 656165 38725,1303,8944,$4953,4,2024,Alaina Davidson,Macleod Street 2814,Netherlands", "American Express,3491 656169 93946,9793,7755,$17336,1,2027,Omar Bennett,Houndsditch 5463,Greenland", "American Express,3491 656101 95670,5021,5660,$8055,1,2029,Sidney Winters,Peace Street 9887,Malaysia", "American Express,3491 656116 35138,9322,2101,$1613,1,2027,Russ Reynolds,Whitehaven Street 4359,Saint Lucia", "American Express,3491 656123 28808,6801,1961,$12073,7,2024,Brooks Ortiz,Caedmon Road 3802,France", "American Express,3491 656113 62295,1928,3495,$18777,5,2029,Zachery Garrett,Wynter Street 7696,Azerbaijan", "American Express,3491 656154 17392,5078,9692,$16727,6,2021,Lina Santos,Aldred Street 1515,Colombia", "American Express,3491 656110 86944,9128,2657,$7266,1,2028,Phoenix Bright,Napier Grove 3133,Ukraine", "American Express,3491 656153 42483,3006,2742,$6101,10,2028,Marcellus Caldwell,Crestfield Street 8039,Gambia", "American Express,3491 656180 87036,4505,9002,$6475,11,2023,Hank Barber,Hope Street 9000,Malaysia", "American Express,3491 656164 45913,5840,9337,$2814,7,2025,Bud Tran,Greatorex Street 1173,Martinique", "American Express,3491 656171 44333,7342,5604,$14915,9,2025,Dee Coleman,Northeast Place 7553,Puerto Rico", "American Express,3491 656189 91666,2815,9688,$13718,6,2023,Jayla Hodges,Green Dale 7897,Costa Rica", "American Express,3491 656136 25731,8160,8672,$3113,12,2029,Ruth Santos,Sudrey Street 2405,Ethiopia", "American Express,3491 656163 69832,9167,4563,$7053,3,2029,Hyman Franks,Orton Street 3317,Zimbabwe", "American Express,3491 656153 78453,9068,1339,$12448,12,2027,Keira Wells,Searle Street 1312,Singapore", "American Express,3491 656138 48788,8640,7841,$1985,8,2029,Emory Daugherty,Mackennal Street 9793,Christmas Island"]
                let cc = listcc[Math.floor(Math.random() * listcc.length)]
                client.reply(from, cc, id)
                break
            case '!rip':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                const listrip = ["10.188.46.208", "136.24.207.56", "4.221.246.241", "202.49.117.227", "184.29.1.128", "33.16.238.64", "31.63.31.6", "62.76.141.164", "11.222.22.98", "160.241.22.238", "87.220.119.83", "172.29.66.250", "62.51.65.116", "131.235.120.60", "99.98.102.203", "165.244.87.79", "169.9.9.210", "164.37.215.43", "115.24.88.202", "208.172.220.19", "100.24.234.109", "7.167.147.135", "64.17.62.163", "182.126.233.163", "183.194.24.246", "112.211.210.95", "38.140.211.228", "199.199.212.179", "48.202.49.10", "124.178.25.77", "88.47.181.68", "177.220.130.173", "53.18.248.51", "166.169.44.144", "142.89.54.169", "254.124.81.105", "46.184.217.113", "33.237.166.70", "118.55.59.112", "26.19.177.98", "55.253.5.38", "116.30.59.79", "185.30.51.165", "16.2.153.107", "250.187.19.48", "148.160.100.122", "153.214.144.134", "182.70.225.87", "53.82.79.75", "111.229.158.46", "77.29.26.79", "189.75.25.55", "40.113.235.230", "211.254.199.101", "112.68.171.138", "118.92.46.47", "60.123.193.68", "8.187.169.176", "204.118.117.21", "37.114.54.81", "45.165.146.83", "201.199.186.110", "161.148.103.40", "231.206.7.74", "194.25.147.129", "4.180.189.237", "186.236.158.246", "248.131.14.62", "133.22.41.12", "115.55.243.87", "216.81.213.242", "78.108.133.113", "253.62.190.107", "71.251.210.128", "217.224.206.17", "49.185.105.25", "36.190.91.195", "35.225.76.242", "65.49.85.94", "115.54.160.237", "211.151.176.175", "252.220.60.178", "197.129.150.77", "250.133.197.112", "66.69.102.140", "194.163.66.151", "27.110.203.73", "126.180.10.134", "163.187.169.179", "124.164.159.66", "116.19.59.112", "101.28.98.59", "57.174.242.150", "104.167.14.128", "30.214.139.64", "244.189.208.31", "75.76.206.32", "74.231.13.7", "48.1.13.181", "186.240.38.178", "141.215.204.216", "113.65.122.68", "49.84.109.25", "165.193.63.247", "99.252.90.21", "0.184.21.68", "28.44.53.22", "171.211.17.146", "132.143.97.248", "190.205.221.44", "226.150.11.11", "233.69.88.251", "24.126.221.12", "224.17.146.234", "191.143.159.248", "120.151.21.124", "81.101.126.70", "8.20.6.144", "182.186.102.123", "67.166.29.77", "180.251.2.249", "162.21.130.91", "132.111.186.153", "115.30.80.212", "76.48.219.76", "138.145.138.54", "43.254.214.161", "20.142.21.95", "173.28.73.11", "95.194.23.79", "194.134.82.203", "17.111.154.147", "226.27.101.236", "64.9.82.206", "136.165.56.24", "104.249.249.159", "200.13.182.199", "88.121.169.52", "175.154.94.37", "5.177.204.243", "177.5.98.15", "177.91.169.215", "196.197.232.1", "128.8.29.251", "75.80.190.9", "251.2.143.193", "245.32.121.245", "222.53.253.5", "56.56.194.23", "116.181.253.113", "140.54.113.84", "187.151.13.188", "179.155.69.207", "200.2.12.184", "250.114.4.229", "228.17.190.122", "56.191.34.225", "159.21.35.138", "53.60.160.240", "69.126.250.222", "248.111.151.109", "71.102.234.43", "26.212.168.184", "23.30.162.67", "124.147.166.109", "246.64.51.139", "204.217.150.150", "50.174.0.31", "172.187.208.136", "79.221.75.29", "4.100.139.204", "7.41.160.125", "45.85.144.223", "95.25.84.150", "242.34.232.159", "60.13.57.21", "95.95.15.227", "231.79.66.51", "146.221.30.222", "142.102.113.109", "163.94.211.161", "79.134.129.101", "91.108.183.187", "33.186.239.167", "41.127.220.98", "144.36.99.245", "233.87.91.234", "222.79.124.151", "240.13.232.104", "255.247.21.75", "20.118.246.208", "101.23.18.248", "53.121.6.114", "82.30.100.169", "217.129.243.211", "84.95.40.249", "197.91.90.98", "60.78.4.132", "17.235.183.39", "178.176.45.178", "101.187.0.255", "191.223.173.162", "255.109.49.186", "236.68.172.84", "3.225.94.208", "19.110.157.130", "124.227.158.152", "133.27.55.149", "96.212.179.215", "212.112.199.0", "10.146.113.143", "81.77.189.53", "49.184.76.144", "8.226.216.232", "246.34.253.34", "201.135.199.108", "152.233.102.161", "126.133.188.220", "248.19.46.71", "134.230.92.218", "62.153.142.243", "5.42.21.30", "17.110.133.229", "17.99.12.64", "33.180.142.60", "154.238.221.176", "179.234.39.250", "252.49.34.226", "211.214.72.227", "144.157.71.202", "112.242.75.167", "92.147.152.177", "21.25.76.102", "134.222.69.76", "250.23.59.109", "65.20.15.44", "253.3.123.58", "155.93.25.12", "115.227.136.23", "26.161.124.58", "71.164.30.155", "26.80.205.77", "240.44.237.120", "156.140.168.3", "82.180.103.166", "227.125.37.79", "147.237.118.213", "40.226.245.211", "210.145.118.165", "221.172.0.228", "33.218.131.87", "171.236.43.166", "251.10.192.252", "101.200.156.82", "171.159.107.38", "177.49.217.151", "9.90.194.126", "166.59.184.167", "57.181.25.138", "223.178.121.51", "87.88.112.236", "184.244.238.224", "30.190.141.19", "243.150.80.24", "219.179.106.47", "21.245.106.222", "12.164.53.164", "40.252.41.170", "177.153.28.212", "254.56.19.3", "162.123.245.57", "60.23.184.131", "222.101.10.147", "5.172.12.192", "35.147.117.15", "136.196.86.181", "232.175.244.127", "131.114.69.255", "140.32.117.54", "169.199.27.22", "19.155.183.93", "161.194.64.38", "120.8.222.148", "184.92.60.183", "243.170.6.21", "125.122.110.245", "233.60.42.248", "230.203.139.137", "235.137.133.13", "107.158.227.245", "230.17.221.140", "44.50.17.217", "114.58.54.212", "143.85.132.245", "196.173.0.1", "238.126.108.179", "169.205.82.202", "214.92.47.174", "128.228.10.139", "54.130.147.125", "213.163.28.243", "227.221.97.37", "136.160.71.96", "99.79.164.136", "205.232.199.67", "67.10.112.3", "67.34.124.51", "128.116.239.145", "91.73.32.249", "35.245.128.33", "103.132.81.14", "215.38.32.35", "83.139.217.122", "197.140.182.238", "133.85.44.70", "162.228.151.123", "198.198.149.181", "228.86.69.56", "24.211.117.196", "236.135.61.49", "223.88.4.43", "174.255.43.133", "1.116.15.242", "116.16.38.228", "246.183.58.131", "214.116.161.67", "214.201.254.5", "211.197.144.135", "121.164.117.252", "165.73.152.54", "199.92.98.14", "234.14.84.120", "154.18.215.54", "121.255.104.157", "163.166.24.85", "156.204.222.173", "161.58.94.133", "115.36.109.173", "30.110.229.28", "218.43.126.78", "224.60.208.151", "247.200.114.203", "241.194.185.161", "62.104.241.128", "53.218.9.205", "14.249.175.132", "113.48.77.204", "240.213.20.212", "55.156.99.57", "154.142.254.120", "117.181.65.168", "116.249.88.101", "38.211.135.97", "149.188.159.187", "90.163.152.211", "106.238.135.232", "116.108.24.232", "64.207.81.70", "47.134.216.229", "124.234.57.162", "233.185.39.42", "138.119.15.197", "111.21.83.223", "207.36.98.142", "243.138.180.157", "245.48.181.119", "98.22.252.208", "44.22.250.32", "218.180.183.41", "139.191.108.218", "163.77.11.245", "116.87.37.143", "104.186.147.66", "47.17.131.155", "233.44.27.176", "69.184.97.134", "116.147.133.163", "38.88.185.98", "200.2.34.154", "53.116.217.118", "91.235.76.227", "254.36.220.105", "247.24.24.37", "190.249.174.106", "251.198.105.112", "166.117.218.127", "252.192.209.173", "109.232.178.43", "43.28.224.130", "138.131.53.214", "42.175.46.114", "31.163.226.247", "129.218.129.186", "236.125.105.233", "148.65.35.116", "199.75.249.4", "75.208.13.57", "239.235.195.207", "143.78.176.90", "86.82.93.158", "192.193.71.162", "94.203.211.183", "185.139.53.165", "238.150.114.203", "219.22.0.242", "37.43.175.38", "34.50.47.0", "227.12.79.52", "67.65.151.205", "223.214.128.250", "85.9.239.170", "77.126.94.140", "124.158.202.199", "173.87.209.12", "60.41.223.15", "223.92.89.94", "130.76.132.186", "168.79.215.202", "136.104.63.106", "43.161.164.140", "151.228.178.188", "8.43.66.36", "5.98.210.218", "230.60.36.65", "48.95.50.204", "148.196.36.135", "60.74.84.68", "64.109.246.203", "196.86.154.206", "195.168.216.236", "132.224.242.37", "121.46.241.179", "119.3.171.214", "144.249.5.115", "40.177.238.254", "160.237.207.202", "244.74.75.46", "111.180.194.14", "129.180.220.59", "193.173.73.43", "25.221.127.22", "250.9.30.32", "123.208.192.92", "20.111.2.198", "126.127.83.124", "108.116.10.125", "208.212.60.209", "158.93.124.185", "173.144.195.211", "85.72.24.240", "49.51.11.165", "38.168.153.235", "64.104.7.205", "232.100.236.121", "227.219.31.152", "209.158.169.76", "189.11.108.228", "44.250.83.109", "170.147.49.29", "192.21.88.15", "130.164.10.65", "193.233.126.102", "132.71.126.98", "36.81.250.2", "165.146.150.248", "13.3.252.185", "214.134.228.32", "108.182.53.149", "156.175.8.253", "240.226.38.190", "149.192.152.149", "158.231.94.110", "143.31.111.44", "176.199.241.100", "99.163.162.232", "105.37.28.141", "22.105.208.74", "203.219.14.154", "61.111.78.6", "208.32.132.189", "55.27.64.67", "114.47.240.102", "37.65.165.245", "75.77.43.25", "80.192.210.155", "167.61.233.126", "65.42.223.139", "187.244.112.127", "154.126.64.79", "248.43.141.226", "201.64.156.35", "50.7.128.103", "173.217.63.59", "210.218.198.67", "15.142.5.165", "223.173.58.15", "159.12.145.150", "91.91.78.212", "110.112.19.79", "250.227.121.18", "0.174.34.135", "198.72.94.242", "18.111.217.168", "35.255.182.220", "218.113.149.150", "238.152.232.231", "241.137.126.35", "172.247.26.152", "234.113.90.246", "131.80.172.90", "37.65.102.33", "15.131.28.52", "14.72.156.20", "232.65.177.53", "52.146.208.17", "67.95.182.60", "170.242.132.48", "125.205.253.181", "252.52.80.177", "250.12.79.186", "195.21.246.220", "224.167.196.225", "20.190.171.140", "76.158.133.235", "150.147.71.149", "180.225.178.226", "9.182.96.144", "55.248.119.176", "232.88.55.221", "112.72.164.201", "182.152.162.94", "176.228.168.130", "119.221.239.35", "3.149.175.200", "31.1.89.110", "1.203.181.95", "8.173.105.206", "40.1.199.183", "155.233.14.92", "122.110.122.154", "107.94.130.173", "203.99.167.34", "91.230.125.254", "180.1.116.198", "246.106.38.200", "191.47.62.20", "180.45.80.145", "26.167.234.247", "20.126.3.54", "199.90.43.81", "200.59.162.199", "2.96.233.67", "18.64.138.56", "117.244.105.177", "123.12.158.11", "93.130.6.215", "215.241.38.100", "203.168.52.27", "36.46.225.4", "166.161.65.92", "122.42.188.24", "152.30.100.39", "108.228.48.150", "178.191.234.30", "196.80.187.155", "93.157.155.67", "228.191.198.240", "253.96.104.141", "241.246.243.11", "86.250.211.204", "200.176.252.54", "206.28.47.76", "194.199.158.156", "75.240.31.123", "21.129.205.62", "213.101.62.248", "56.126.225.200", "238.238.240.97", "178.111.21.54", "194.113.178.156", "131.90.217.96", "239.29.178.125", "141.241.222.117", "246.10.171.85", "108.242.248.182", "121.210.31.162", "203.126.151.77", "96.174.49.186", "188.150.24.0", "104.70.17.41", "240.132.134.64", "177.237.208.171", "53.199.22.4", "247.143.112.113", "131.136.208.234", "183.137.216.208", "131.191.138.200", "140.100.198.106", "8.52.34.98", "215.194.157.221", "17.117.83.205", "151.87.90.125", "110.233.100.53", "238.108.247.202", "35.59.104.74", "235.195.198.53", "29.86.7.78", "120.18.141.250", "117.202.233.243", "240.160.65.128", "167.132.35.144", "148.92.234.196", "103.54.17.162", "240.92.112.180", "143.232.227.110", "246.21.34.167", "87.68.60.78", "186.133.150.4", "87.190.34.147", "17.146.170.191", "171.145.218.236", "241.81.46.138", "220.233.182.182", "192.192.51.143", "161.100.149.236", "211.134.216.47", "195.58.212.167", "158.196.254.159", "92.201.166.15", "51.123.107.252", "159.202.112.223", "95.242.112.173", "73.251.250.224", "29.131.129.29", "167.163.201.230", "36.89.219.93", "253.61.8.193", "24.175.221.99", "204.16.119.121", "174.30.193.100", "10.100.23.86", "121.138.64.95", "199.172.145.70", "25.0.113.218", "103.218.54.2", "237.147.143.22", "98.151.108.22", "202.65.115.14", "181.134.208.206", "113.245.7.93", "99.213.229.104", "253.0.44.204", "118.62.18.119", "64.169.106.33", "227.47.14.27", "48.84.77.138", "247.191.238.194", "241.195.214.13", "88.159.225.241", "89.127.216.59", "138.91.143.234", "52.119.126.208", "167.47.218.171", "108.195.6.196", "9.242.152.150", "100.208.6.141", "45.88.23.98", "205.3.244.228", "61.129.28.44", "134.235.120.162", "91.14.19.82", "244.134.14.111", "146.33.24.242", "134.170.40.221", "202.208.64.34", "29.82.23.90", "53.184.180.75", "231.104.212.61", "203.182.62.123", "137.116.16.25", "12.176.21.93", "237.93.119.136", "16.239.106.66", "196.18.170.61", "150.218.152.79", "180.99.230.217", "6.202.246.131", "60.19.66.205", "179.29.33.105", "218.146.120.136", "175.177.170.235", "104.0.231.31", "95.138.94.103", "96.28.192.105", "160.107.39.169", "54.166.239.19", "76.207.248.237", "27.247.202.120", "113.109.221.173", "177.1.190.168", "63.156.159.184", "140.101.113.20", "247.124.183.214", "223.104.151.70", "63.240.26.95", "238.203.5.203", "14.4.52.83", "124.155.108.188", "233.37.147.52", "242.248.130.4", "162.241.109.2", "117.30.166.233", "78.161.179.83", "156.11.107.142", "250.151.82.119", "79.229.103.28", "87.227.1.141", "32.219.10.234", "207.189.71.234", "26.58.241.239", "218.12.29.99", "40.181.13.254", "232.214.241.101", "45.231.250.7", "200.10.52.63", "136.82.16.140", "116.174.58.9", "254.72.24.20", "90.21.197.30", "2.242.194.96", "71.228.14.233", "201.156.201.234", "198.252.155.34", "90.225.16.33", "219.84.180.121", "61.48.217.227", "244.212.66.130", "160.208.132.78", "69.136.155.32", "21.178.155.239", "162.64.143.20", "185.144.52.120", "69.44.244.203", "147.223.124.246", "105.129.90.121", "220.250.9.80", "226.18.4.255", "214.108.174.6", "51.64.98.122", "16.235.17.121", "223.115.142.163", "64.192.113.89", "76.217.67.15", "69.202.128.128", "125.41.229.54", "85.120.166.150", "219.142.51.135", "18.115.207.224", "17.57.94.181", "157.212.70.117", "114.170.250.116", "234.43.55.18", "242.184.46.177", "16.86.181.102", "182.214.20.60", "147.234.91.101", "218.74.167.143", "172.68.129.222", "34.0.61.235", "82.254.224.23", "43.62.181.86", "168.30.51.154", "186.24.248.99", "253.61.46.1", "190.147.129.106", "212.57.144.96", "27.142.72.178", "244.169.225.8", "213.90.82.134", "138.243.67.187", "195.196.87.254", "69.22.76.130", "69.92.67.1", "152.67.141.187", "32.230.42.202", "193.14.75.109", "37.168.22.47", "135.222.196.233", "178.231.179.60", "167.252.208.171", "42.114.189.195", "74.171.227.3", "79.211.30.10", "38.87.250.95", "4.206.141.35", "151.180.24.213", "97.215.132.217", "220.208.244.30", "146.20.56.128", "141.44.200.241", "254.106.171.131", "166.220.227.191", "151.98.184.67", "176.158.226.153", "9.72.233.175", "116.234.212.8", "173.205.133.124", "136.25.237.113", "212.109.113.185", "92.242.92.163", "20.134.2.15", "36.136.224.169", "6.141.189.2", "77.175.178.23", "15.236.165.193", "233.78.96.189", "75.77.15.135", "140.60.248.157", "171.229.238.54", "165.223.9.90", "212.67.234.178", "145.58.223.61", "242.179.47.196", "104.171.26.244", "169.127.94.13", "51.212.246.234", "107.63.23.221", "24.118.61.228", "167.72.173.170", "200.168.251.39", "216.48.227.203", "106.20.134.49", "186.2.20.101", "40.232.220.151", "69.155.255.59", "222.160.88.139", "96.217.8.213", "62.227.49.55", "172.96.203.153", "111.111.134.86", "137.117.219.251", "224.64.5.205", "82.24.192.40", "251.63.187.123", "242.71.236.141", "39.185.191.125", "61.50.6.153", "126.252.101.2", "53.77.233.48", "249.144.132.101", "127.47.182.92", "52.137.108.218", "46.94.23.119", "137.58.21.227", "3.56.214.224", "67.14.228.103", "183.47.24.35", "15.253.78.158", "227.173.255.20", "147.230.181.223", "168.231.227.71", "249.5.215.58", "65.127.114.61", "64.50.16.144", "0.46.119.163", "209.112.72.146", "79.126.200.242", "72.115.163.90", "206.97.243.210", "82.71.210.45", "206.115.238.77", "167.51.22.188", "60.188.94.199", "73.177.33.186", "196.72.130.187", "77.152.134.232", "114.15.141.225", "71.102.246.149", "163.237.153.103", "43.104.0.194", "218.69.126.86", "118.24.104.92", "198.202.111.33", "167.40.220.190", "53.195.228.2", "219.235.202.62", "78.176.72.78", "149.203.84.136", "49.167.26.67", "180.14.163.174", "234.215.53.7", "154.71.88.121", "146.33.41.238", "165.248.240.172", "19.61.248.66", "200.59.38.36", "49.61.43.214", "88.175.173.169", "203.36.109.23", "160.12.130.85", "53.230.188.29", "215.127.7.122", "200.159.71.200", "229.16.182.6", "106.50.83.181", "109.247.35.36", "121.181.123.63", "27.52.141.154", "98.18.109.254", "61.214.239.184", "68.182.129.33", "95.161.53.150", "171.100.16.18", "102.106.93.59", "144.54.244.119", "16.185.109.173", "140.152.40.19", "45.30.119.199", "74.224.232.245", "180.228.103.199", "104.5.91.66", "105.238.165.196", "19.1.87.244", "143.55.53.58", "88.161.249.60", "107.149.249.194", "161.255.146.76", "196.12.109.107", "192.91.16.76", "156.99.248.47", "203.209.119.46", "185.219.133.157", "71.38.154.101", "42.44.198.165", "232.227.239.144", "16.146.28.193", "8.215.133.249", "10.19.17.250", "179.220.244.168", "187.9.105.47", "80.55.182.76", "218.3.41.244", "201.41.18.98", "111.180.113.68", "50.185.188.114", "215.233.234.224", "159.193.158.38", "52.128.41.181", "186.61.143.140", "86.254.39.39", "173.112.110.82", "14.198.45.174", "189.12.155.205", "134.154.186.234", "204.227.144.209", "255.134.60.100", "74.24.146.102", "31.164.230.12", "25.224.236.67", "16.198.229.68", "114.96.113.175", "42.213.146.178", "54.245.1.208", "134.177.76.240", "138.17.64.210", "178.56.242.35", "30.94.152.209", "209.7.238.236", "179.36.153.216", "89.30.35.123", "56.71.192.16", "239.25.164.98", "16.52.122.137", "69.180.77.210", "140.124.139.17", "152.181.221.109", "216.84.130.145", "203.129.44.64", "176.212.212.143", "151.176.200.195", "3.207.11.86", "222.65.50.1", "253.15.178.233", "245.225.233.250", "37.58.0.14", "20.109.160.127", "241.227.106.63", "250.12.65.88", "56.3.205.196", "52.182.34.242", "40.237.30.75", "233.45.92.247", "154.228.187.144", "194.132.144.84", "34.243.126.226", "72.100.165.227", "81.158.56.205", "117.53.117.0", "221.187.141.15", "223.114.230.236", ""]
                let rip = listrip[Math.floor(Math.random() * listrip.length)]
                client.reply(from, rip, id)
                break
            case '!rurl':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                const listrurl = ["https://house.gov/donec/vitae/nisi/nam/ultrices.xml?elit=sem&proin=duis&risus=aliquam&praesent=convallis&lectus=nunc&vestibulum=proin&quam=at&sapien=turpis&varius=a&ut=pede&blandit=posuere&non=nonummy&interdum=integer&in=non&ante=velit&vestibulum=donec&ante=diam&ipsum=neque&primis=vestibulum&in=eget&faucibus=vulputate&orci=ut&luctus=ultrices&et=vel&ultrices=augue&posuere=vestibulum&cubilia=ante&curae=ipsum&duis=primis&faucibus=in&accumsan=faucibus&odio=orci&curabitur=luctus&convallis=et&duis=ultrices&consequat=posuere&dui=cubilia&nec=curae&nisi=donec&volutpat=pharetra&eleifend=magna&donec=vestibulum&ut=aliquet&dolor=ultrices&morbi=erat&vel=tortor&lectus=sollicitudin&in=mi&quam=sit&fringilla=amet&rhoncus=lobortis&mauris=sapien&enim=sapien&leo=non&rhoncus=mi&sed=integer&vestibulum=ac&sit=neque&amet=duis&cursus=bibendum&id=morbi&turpis=non&integer=quam&aliquet=nec&massa=dui&id=luctus&lobortis=rutrum&convallis=nulla&tortor=tellus&risus=in&dapibus=sagittis&augue=dui&vel=vel&accumsan=nisl&tellus=duis&nisi=ac&eu=nibh&orci=fusce&mauris=lacus&lacinia=purus&sapien=aliquet&quis=at&libero=feugiat&nullam=non&sit=pretium&amet=quis&turpis=lectus", "http://aol.com/tristique/tortor/eu/pede.js?magna=molestie&ac=sed&consequat=justo&metus=pellentesque&sapien=viverra&ut=pede&nunc=ac&vestibulum=diam&ante=cras&ipsum=pellentesque&primis=volutpat&in=dui&faucibus=maecenas&orci=tristique&luctus=est&et=et", "http://smugmug.com/sit/amet.jpg?quis=sit&turpis=amet&eget=erat&elit=nulla&sodales=tempus&scelerisque=vivamus&mauris=in&sit=felis&amet=eu&eros=sapien&suspendisse=cursus&accumsan=vestibulum&tortor=proin&quis=eu&turpis=mi&sed=nulla&ante=ac&vivamus=enim&tortor=in&duis=tempor&mattis=turpis&egestas=nec&metus=euismod&aenean=scelerisque&fermentum=quam&donec=turpis&ut=adipiscing&mauris=lorem&eget=vitae&massa=mattis&tempor=nibh&convallis=ligula&nulla=nec&neque=sem&libero=duis&convallis=aliquam&eget=convallis&eleifend=nunc&luctus=proin&ultricies=at&eu=turpis&nibh=a&quisque=pede&id=posuere&justo=nonummy&sit=integer&amet=non&sapien=velit&dignissim=donec&vestibulum=diam&vestibulum=neque&ante=vestibulum&ipsum=eget&primis=vulputate&in=ut&faucibus=ultrices&orci=vel&luctus=augue&et=vestibulum&ultrices=ante&posuere=ipsum&cubilia=primis&curae=in&nulla=faucibus&dapibus=orci&dolor=luctus&vel=et&est=ultrices&donec=posuere&odio=cubilia&justo=curae&sollicitudin=donec&ut=pharetra&suscipit=magna&a=vestibulum&feugiat=aliquet&et=ultrices&eros=erat&vestibulum=tortor&ac=sollicitudin&est=mi&lacinia=sit&nisi=amet&venenatis=lobortis&tristique=sapien&fusce=sapien&congue=non&diam=mi&id=integer&ornare=ac&imperdiet=neque&sapien=duis&urna=bibendum&pretium=morbi&nisl=non", "http://unicef.org/condimentum/neque/sapien/placerat.html?volutpat=nulla&sapien=nisl&arcu=nunc&sed=nisl&augue=duis&aliquam=bibendum&erat=felis&volutpat=sed&in=interdum&congue=venenatis&etiam=turpis&justo=enim&etiam=blandit&pretium=mi&iaculis=in&justo=porttitor&in=pede&hac=justo&habitasse=eu&platea=massa&dictumst=donec&etiam=dapibus&faucibus=duis&cursus=at&urna=velit&ut=eu&tellus=est", "http://imgur.com/ipsum/ac/tellus.png?tortor=justo&id=in&nulla=blandit&ultrices=ultrices&aliquet=enim&maecenas=lorem&leo=ipsum&odio=dolor&condimentum=sit&id=amet&luctus=consectetuer&nec=adipiscing&molestie=elit&sed=proin&justo=interdum&pellentesque=mauris&viverra=non&pede=ligula&ac=pellentesque&diam=ultrices&cras=phasellus&pellentesque=id&volutpat=sapien&dui=in&maecenas=sapien&tristique=iaculis&est=congue&et=vivamus&tempus=metus&semper=arcu&est=adipiscing&quam=molestie&pharetra=hendrerit&magna=at&ac=vulputate&consequat=vitae&metus=nisl&sapien=aenean&ut=lectus&nunc=pellentesque&vestibulum=eget&ante=nunc&ipsum=donec&primis=quis&in=orci&faucibus=eget&orci=orci&luctus=vehicula&et=condimentum&ultrices=curabitur&posuere=in&cubilia=libero&curae=ut&mauris=massa&viverra=volutpat&diam=convallis&vitae=morbi&quam=odio&suspendisse=odio&potenti=elementum&nullam=eu&porttitor=interdum&lacus=eu&at=tincidunt&turpis=in&donec=leo&posuere=maecenas&metus=pulvinar&vitae=lobortis&ipsum=est&aliquam=phasellus&non=sit&mauris=amet&morbi=erat&non=nulla&lectus=tempus&aliquam=vivamus&sit=in&amet=felis&diam=eu&in=sapien&magna=cursus&bibendum=vestibulum&imperdiet=proin&nullam=eu&orci=mi&pede=nulla", "https://patch.com/viverra/eget/congue/eget/semper.jsp?eros=viverra&elementum=diam&pellentesque=vitae&quisque=quam&porta=suspendisse&volutpat=potenti&erat=nullam&quisque=porttitor&erat=lacus&eros=at&viverra=turpis&eget=donec&congue=posuere&eget=metus&semper=vitae&rutrum=ipsum&nulla=aliquam&nunc=non&purus=mauris&phasellus=morbi&in=non&felis=lectus&donec=aliquam&semper=sit&sapien=amet&a=diam&libero=in&nam=magna&dui=bibendum&proin=imperdiet&leo=nullam&odio=orci&porttitor=pede&id=venenatis&consequat=non&in=sodales&consequat=sed&ut=tincidunt&nulla=eu&sed=felis&accumsan=fusce&felis=posuere&ut=felis&at=sed&dolor=lacus&quis=morbi&odio=sem&consequat=mauris&varius=laoreet&integer=ut&ac=rhoncus&leo=aliquet&pellentesque=pulvinar&ultrices=sed&mattis=nisl&odio=nunc&donec=rhoncus&vitae=dui&nisi=vel&nam=sem&ultrices=sed&libero=sagittis&non=nam&mattis=congue&pulvinar=risus&nulla=semper&pede=porta&ullamcorper=volutpat&augue=quam&a=pede&suscipit=lobortis&nulla=ligula", "http://mayoclinic.com/a.js?cursus=mi&id=in&turpis=porttitor&integer=pede&aliquet=justo&massa=eu&id=massa&lobortis=donec&convallis=dapibus&tortor=duis&risus=at&dapibus=velit&augue=eu", "https://dyndns.org/consequat/metus.json?sem=in&mauris=felis&laoreet=eu&ut=sapien&rhoncus=cursus&aliquet=vestibulum&pulvinar=proin&sed=eu&nisl=mi&nunc=nulla&rhoncus=ac&dui=enim&vel=in", "https://epa.gov/amet/cursus/id/turpis/integer/aliquet/massa.xml?duis=cursus&aliquam=urna&convallis=ut&nunc=tellus&proin=nulla&at=ut&turpis=erat&a=id&pede=mauris&posuere=vulputate&nonummy=elementum&integer=nullam&non=varius&velit=nulla&donec=facilisi&diam=cras&neque=non&vestibulum=velit&eget=nec&vulputate=nisi&ut=vulputate&ultrices=nonummy&vel=maecenas&augue=tincidunt&vestibulum=lacus&ante=at&ipsum=velit&primis=vivamus&in=vel&faucibus=nulla&orci=eget&luctus=eros&et=elementum&ultrices=pellentesque&posuere=quisque&cubilia=porta&curae=volutpat&donec=erat&pharetra=quisque&magna=erat&vestibulum=eros&aliquet=viverra&ultrices=eget&erat=congue&tortor=eget&sollicitudin=semper&mi=rutrum&sit=nulla&amet=nunc&lobortis=purus&sapien=phasellus&sapien=in&non=felis&mi=donec&integer=semper&ac=sapien&neque=a&duis=libero&bibendum=nam&morbi=dui&non=proin&quam=leo&nec=odio&dui=porttitor&luctus=id", "http://biglobe.ne.jp/sed/magna/at/nunc/commodo/placerat/praesent.aspx?in=convallis&leo=duis&maecenas=consequat&pulvinar=dui&lobortis=nec&est=nisi&phasellus=volutpat&sit=eleifend&amet=donec&erat=ut&nulla=dolor&tempus=morbi&vivamus=vel&in=lectus&felis=in&eu=quam&sapien=fringilla&cursus=rhoncus&vestibulum=mauris&proin=enim&eu=leo&mi=rhoncus&nulla=sed&ac=vestibulum&enim=sit&in=amet&tempor=cursus&turpis=id&nec=turpis&euismod=integer&scelerisque=aliquet&quam=massa&turpis=id&adipiscing=lobortis&lorem=convallis&vitae=tortor&mattis=risus&nibh=dapibus&ligula=augue&nec=vel&sem=accumsan&duis=tellus&aliquam=nisi&convallis=eu&nunc=orci&proin=mauris&at=lacinia&turpis=sapien&a=quis&pede=libero&posuere=nullam&nonummy=sit&integer=amet&non=turpis&velit=elementum&donec=ligula&diam=vehicula&neque=consequat&vestibulum=morbi&eget=a&vulputate=ipsum&ut=integer&ultrices=a&vel=nibh", "https://huffingtonpost.com/vivamus/in/felis/eu/sapien/cursus/vestibulum.xml?et=aenean&ultrices=lectus&posuere=pellentesque&cubilia=eget&curae=nunc&duis=donec&faucibus=quis&accumsan=orci&odio=eget&curabitur=orci&convallis=vehicula&duis=condimentum&consequat=curabitur&dui=in&nec=libero&nisi=ut&volutpat=massa&eleifend=volutpat&donec=convallis&ut=morbi&dolor=odio&morbi=odio&vel=elementum&lectus=eu&in=interdum&quam=eu&fringilla=tincidunt&rhoncus=in&mauris=leo&enim=maecenas&leo=pulvinar&rhoncus=lobortis&sed=est&vestibulum=phasellus&sit=sit&amet=amet&cursus=erat&id=nulla&turpis=tempus&integer=vivamus&aliquet=in&massa=felis&id=eu&lobortis=sapien&convallis=cursus&tortor=vestibulum&risus=proin&dapibus=eu&augue=mi&vel=nulla&accumsan=ac&tellus=enim&nisi=in&eu=tempor&orci=turpis&mauris=nec&lacinia=euismod&sapien=scelerisque&quis=quam&libero=turpis&nullam=adipiscing&sit=lorem&amet=vitae&turpis=mattis&elementum=nibh&ligula=ligula&vehicula=nec&consequat=sem&morbi=duis&a=aliquam&ipsum=convallis&integer=nunc&a=proin&nibh=at&in=turpis&quis=a&justo=pede&maecenas=posuere&rhoncus=nonummy&aliquam=integer&lacus=non&morbi=velit&quis=donec&tortor=diam&id=neque&nulla=vestibulum&ultrices=eget&aliquet=vulputate&maecenas=ut&leo=ultrices", "http://illinois.edu/nisi.jsp?eros=pulvinar&vestibulum=sed&ac=nisl&est=nunc&lacinia=rhoncus&nisi=dui&venenatis=vel&tristique=sem&fusce=sed&congue=sagittis&diam=nam&id=congue&ornare=risus&imperdiet=semper&sapien=porta&urna=volutpat&pretium=quam&nisl=pede&ut=lobortis&volutpat=ligula&sapien=sit&arcu=amet&sed=eleifend&augue=pede&aliquam=libero&erat=quis&volutpat=orci&in=nullam&congue=molestie&etiam=nibh&justo=in&etiam=lectus&pretium=pellentesque&iaculis=at&justo=nulla&in=suspendisse&hac=potenti&habitasse=cras&platea=in&dictumst=purus&etiam=eu&faucibus=magna&cursus=vulputate&urna=luctus&ut=cum&tellus=sociis&nulla=natoque&ut=penatibus&erat=et&id=magnis", "http://nps.gov/nisi/at/nibh/in/hac/habitasse/platea.js?odio=varius&justo=nulla&sollicitudin=facilisi&ut=cras&suscipit=non&a=velit&feugiat=nec&et=nisi&eros=vulputate&vestibulum=nonummy&ac=maecenas&est=tincidunt&lacinia=lacus&nisi=at&venenatis=velit&tristique=vivamus&fusce=vel&congue=nulla&diam=eget&id=eros&ornare=elementum&imperdiet=pellentesque&sapien=quisque&urna=porta&pretium=volutpat&nisl=erat&ut=quisque", "https://princeton.edu/in/eleifend.png?duis=faucibus&at=orci&velit=luctus&eu=et&est=ultrices&congue=posuere&elementum=cubilia&in=curae&hac=donec&habitasse=pharetra&platea=magna&dictumst=vestibulum&morbi=aliquet", "https://ustream.tv/tortor/quis/turpis/sed/ante/vivamus/tortor.jpg?sem=felis&praesent=sed&id=interdum&massa=venenatis&id=turpis&nisl=enim&venenatis=blandit&lacinia=mi&aenean=in&sit=porttitor&amet=pede&justo=justo&morbi=eu&ut=massa&odio=donec&cras=dapibus&mi=duis&pede=at&malesuada=velit&in=eu&imperdiet=est&et=congue&commodo=elementum&vulputate=in&justo=hac&in=habitasse&blandit=platea&ultrices=dictumst&enim=morbi&lorem=vestibulum&ipsum=velit&dolor=id&sit=pretium&amet=iaculis&consectetuer=diam&adipiscing=erat&elit=fermentum&proin=justo&interdum=nec&mauris=condimentum&non=neque&ligula=sapien&pellentesque=placerat&ultrices=ante&phasellus=nulla&id=justo&sapien=aliquam&in=quis&sapien=turpis&iaculis=eget&congue=elit&vivamus=sodales&metus=scelerisque&arcu=mauris&adipiscing=sit&molestie=amet&hendrerit=eros&at=suspendisse", "http://godaddy.com/vitae/ipsum/aliquam/non/mauris/morbi.jpg?quam=neque&nec=libero&dui=convallis&luctus=eget&rutrum=eleifend&nulla=luctus&tellus=ultricies&in=eu&sagittis=nibh&dui=quisque&vel=id&nisl=justo&duis=sit&ac=amet&nibh=sapien&fusce=dignissim&lacus=vestibulum&purus=vestibulum", "http://sfgate.com/leo/rhoncus/sed/vestibulum.aspx?ante=congue&vivamus=eget&tortor=semper&duis=rutrum&mattis=nulla&egestas=nunc&metus=purus&aenean=phasellus&fermentum=in&donec=felis&ut=donec&mauris=semper&eget=sapien&massa=a&tempor=libero&convallis=nam&nulla=dui&neque=proin&libero=leo&convallis=odio", "https://nyu.edu/mauris/sit/amet/eros/suspendisse/accumsan.js?quis=consequat&augue=metus&luctus=sapien&tincidunt=ut&nulla=nunc&mollis=vestibulum&molestie=ante&lorem=ipsum&quisque=primis&ut=in&erat=faucibus&curabitur=orci&gravida=luctus&nisi=et&at=ultrices&nibh=posuere&in=cubilia&hac=curae&habitasse=mauris&platea=viverra&dictumst=diam&aliquam=vitae&augue=quam&quam=suspendisse&sollicitudin=potenti&vitae=nullam&consectetuer=porttitor&eget=lacus&rutrum=at&at=turpis&lorem=donec&integer=posuere&tincidunt=metus&ante=vitae&vel=ipsum", "https://devhub.com/elit/proin/interdum.json?integer=quam&tincidunt=sollicitudin&ante=vitae&vel=consectetuer&ipsum=eget&praesent=rutrum&blandit=at&lacinia=lorem&erat=integer&vestibulum=tincidunt&sed=ante&magna=vel&at=ipsum&nunc=praesent&commodo=blandit&placerat=lacinia&praesent=erat&blandit=vestibulum&nam=sed&nulla=magna&integer=at&pede=nunc&justo=commodo&lacinia=placerat&eget=praesent&tincidunt=blandit&eget=nam&tempus=nulla&vel=integer&pede=pede&morbi=justo&porttitor=lacinia&lorem=eget&id=tincidunt&ligula=eget&suspendisse=tempus&ornare=vel&consequat=pede&lectus=morbi&in=porttitor&est=lorem&risus=id&auctor=ligula&sed=suspendisse&tristique=ornare&in=consequat&tempus=lectus&sit=in&amet=est&sem=risus&fusce=auctor&consequat=sed&nulla=tristique&nisl=in&nunc=tempus&nisl=sit&duis=amet&bibendum=sem&felis=fusce&sed=consequat&interdum=nulla&venenatis=nisl&turpis=nunc&enim=nisl&blandit=duis&mi=bibendum&in=felis&porttitor=sed&pede=interdum&justo=venenatis&eu=turpis&massa=enim&donec=blandit&dapibus=mi&duis=in&at=porttitor&velit=pede&eu=justo&est=eu&congue=massa&elementum=donec&in=dapibus&hac=duis&habitasse=at&platea=velit&dictumst=eu&morbi=est&vestibulum=congue&velit=elementum&id=in&pretium=hac&iaculis=habitasse&diam=platea&erat=dictumst", "http://icio.us/leo/maecenas/pulvinar.png?sed=at&magna=nunc&at=commodo&nunc=placerat&commodo=praesent&placerat=blandit&praesent=nam&blandit=nulla&nam=integer&nulla=pede&integer=justo&pede=lacinia&justo=eget&lacinia=tincidunt&eget=eget&tincidunt=tempus&eget=vel&tempus=pede&vel=morbi&pede=porttitor&morbi=lorem&porttitor=id&lorem=ligula&id=suspendisse&ligula=ornare&suspendisse=consequat&ornare=lectus&consequat=in&lectus=est&in=risus&est=auctor&risus=sed&auctor=tristique&sed=in&tristique=tempus&in=sit&tempus=amet&sit=sem&amet=fusce&sem=consequat&fusce=nulla&consequat=nisl&nulla=nunc&nisl=nisl&nunc=duis&nisl=bibendum&duis=felis&bibendum=sed&felis=interdum&sed=venenatis&interdum=turpis&venenatis=enim&turpis=blandit&enim=mi&blandit=in&mi=porttitor&in=pede&porttitor=justo&pede=eu&justo=massa&eu=donec&massa=dapibus&donec=duis&dapibus=at&duis=velit&at=eu&velit=est&eu=congue&est=elementum&congue=in&elementum=hac&in=habitasse&hac=platea&habitasse=dictumst&platea=morbi&dictumst=vestibulum&morbi=velit&vestibulum=id&velit=pretium&id=iaculis&pretium=diam&iaculis=erat&diam=fermentum&erat=justo&fermentum=nec&justo=condimentum&nec=neque&condimentum=sapien&neque=placerat&sapien=ante&placerat=nulla&ante=justo&nulla=aliquam&justo=quis&aliquam=turpis&quis=eget&turpis=elit", "https://house.gov/donec/vitae/nisi/nam/ultrices.xml?elit=sem&proin=duis&risus=aliquam&praesent=convallis&lectus=nunc&vestibulum=proin&quam=at&sapien=turpis&varius=a&ut=pede&blandit=posuere&non=nonummy&interdum=integer&in=non&ante=velit&vestibulum=donec&ante=diam&ipsum=neque&primis=vestibulum&in=eget&faucibus=vulputate&orci=ut&luctus=ultrices&et=vel&ultrices=augue&posuere=vestibulum&cubilia=ante&curae=ipsum&duis=primis&faucibus=in&accumsan=faucibus&odio=orci&curabitur=luctus&convallis=et&duis=ultrices&consequat=posuere&dui=cubilia&nec=curae&nisi=donec&volutpat=pharetra&eleifend=magna&donec=vestibulum&ut=aliquet&dolor=ultrices&morbi=erat&vel=tortor&lectus=sollicitudin&in=mi&quam=sit&fringilla=amet&rhoncus=lobortis&mauris=sapien&enim=sapien&leo=non&rhoncus=mi&sed=integer&vestibulum=ac&sit=neque&amet=duis&cursus=bibendum&id=morbi&turpis=non&integer=quam&aliquet=nec&massa=dui&id=luctus&lobortis=rutrum&convallis=nulla&tortor=tellus&risus=in&dapibus=sagittis&augue=dui&vel=vel&accumsan=nisl&tellus=duis&nisi=ac&eu=nibh&orci=fusce&mauris=lacus&lacinia=purus&sapien=aliquet&quis=at&libero=feugiat&nullam=non&sit=pretium&amet=quis&turpis=lectus", "http://aol.com/tristique/tortor/eu/pede.js?magna=molestie&ac=sed&consequat=justo&metus=pellentesque&sapien=viverra&ut=pede&nunc=ac&vestibulum=diam&ante=cras&ipsum=pellentesque&primis=volutpat&in=dui&faucibus=maecenas&orci=tristique&luctus=est&et=et", "http://smugmug.com/sit/amet.jpg?quis=sit&turpis=amet&eget=erat&elit=nulla&sodales=tempus&scelerisque=vivamus&mauris=in&sit=felis&amet=eu&eros=sapien&suspendisse=cursus&accumsan=vestibulum&tortor=proin&quis=eu&turpis=mi&sed=nulla&ante=ac&vivamus=enim&tortor=in&duis=tempor&mattis=turpis&egestas=nec&metus=euismod&aenean=scelerisque&fermentum=quam&donec=turpis&ut=adipiscing&mauris=lorem&eget=vitae&massa=mattis&tempor=nibh&convallis=ligula&nulla=nec&neque=sem&libero=duis&convallis=aliquam&eget=convallis&eleifend=nunc&luctus=proin&ultricies=at&eu=turpis&nibh=a&quisque=pede&id=posuere&justo=nonummy&sit=integer&amet=non&sapien=velit&dignissim=donec&vestibulum=diam&vestibulum=neque&ante=vestibulum&ipsum=eget&primis=vulputate&in=ut&faucibus=ultrices&orci=vel&luctus=augue&et=vestibulum&ultrices=ante&posuere=ipsum&cubilia=primis&curae=in&nulla=faucibus&dapibus=orci&dolor=luctus&vel=et&est=ultrices&donec=posuere&odio=cubilia&justo=curae&sollicitudin=donec&ut=pharetra&suscipit=magna&a=vestibulum&feugiat=aliquet&et=ultrices&eros=erat&vestibulum=tortor&ac=sollicitudin&est=mi&lacinia=sit&nisi=amet&venenatis=lobortis&tristique=sapien&fusce=sapien&congue=non&diam=mi&id=integer&ornare=ac&imperdiet=neque&sapien=duis&urna=bibendum&pretium=morbi&nisl=non", "http://unicef.org/condimentum/neque/sapien/placerat.html?volutpat=nulla&sapien=nisl&arcu=nunc&sed=nisl&augue=duis&aliquam=bibendum&erat=felis&volutpat=sed&in=interdum&congue=venenatis&etiam=turpis&justo=enim&etiam=blandit&pretium=mi&iaculis=in&justo=porttitor&in=pede&hac=justo&habitasse=eu&platea=massa&dictumst=donec&etiam=dapibus&faucibus=duis&cursus=at&urna=velit&ut=eu&tellus=est", "http://imgur.com/ipsum/ac/tellus.png?tortor=justo&id=in&nulla=blandit&ultrices=ultrices&aliquet=enim&maecenas=lorem&leo=ipsum&odio=dolor&condimentum=sit&id=amet&luctus=consectetuer&nec=adipiscing&molestie=elit&sed=proin&justo=interdum&pellentesque=mauris&viverra=non&pede=ligula&ac=pellentesque&diam=ultrices&cras=phasellus&pellentesque=id&volutpat=sapien&dui=in&maecenas=sapien&tristique=iaculis&est=congue&et=vivamus&tempus=metus&semper=arcu&est=adipiscing&quam=molestie&pharetra=hendrerit&magna=at&ac=vulputate&consequat=vitae&metus=nisl&sapien=aenean&ut=lectus&nunc=pellentesque&vestibulum=eget&ante=nunc&ipsum=donec&primis=quis&in=orci&faucibus=eget&orci=orci&luctus=vehicula&et=condimentum&ultrices=curabitur&posuere=in&cubilia=libero&curae=ut&mauris=massa&viverra=volutpat&diam=convallis&vitae=morbi&quam=odio&suspendisse=odio&potenti=elementum&nullam=eu&porttitor=interdum&lacus=eu&at=tincidunt&turpis=in&donec=leo&posuere=maecenas&metus=pulvinar&vitae=lobortis&ipsum=est&aliquam=phasellus&non=sit&mauris=amet&morbi=erat&non=nulla&lectus=tempus&aliquam=vivamus&sit=in&amet=felis&diam=eu&in=sapien&magna=cursus&bibendum=vestibulum&imperdiet=proin&nullam=eu&orci=mi&pede=nulla", "https://patch.com/viverra/eget/congue/eget/semper.jsp?eros=viverra&elementum=diam&pellentesque=vitae&quisque=quam&porta=suspendisse&volutpat=potenti&erat=nullam&quisque=porttitor&erat=lacus&eros=at&viverra=turpis&eget=donec&congue=posuere&eget=metus&semper=vitae&rutrum=ipsum&nulla=aliquam&nunc=non&purus=mauris&phasellus=morbi&in=non&felis=lectus&donec=aliquam&semper=sit&sapien=amet&a=diam&libero=in&nam=magna&dui=bibendum&proin=imperdiet&leo=nullam&odio=orci&porttitor=pede&id=venenatis&consequat=non&in=sodales&consequat=sed&ut=tincidunt&nulla=eu&sed=felis&accumsan=fusce&felis=posuere&ut=felis&at=sed&dolor=lacus&quis=morbi&odio=sem&consequat=mauris&varius=laoreet&integer=ut&ac=rhoncus&leo=aliquet&pellentesque=pulvinar&ultrices=sed&mattis=nisl&odio=nunc&donec=rhoncus&vitae=dui&nisi=vel&nam=sem&ultrices=sed&libero=sagittis&non=nam&mattis=congue&pulvinar=risus&nulla=semper&pede=porta&ullamcorper=volutpat&augue=quam&a=pede&suscipit=lobortis&nulla=ligula", "http://mayoclinic.com/a.js?cursus=mi&id=in&turpis=porttitor&integer=pede&aliquet"]
                let rurl = listrurl[Math.floor(Math.random() * listrurl.length)]
                client.reply(from, rurl, id)
                break
            case '!quotesislam':

                const listquotesislam = ["Jangan berduka, apa pun yang hilang darimu akan kembali lagi dalam wujud lain. (Jalaludin Rumi)", "Balas dendam terbaik adalah menjadikan dirimu lebih baik. (Ali bin Abi Thalib)", "Dunia ini ibarat bayangan. Kalau kau berusaha menangkapnya, ia akan lari. Tapi kalau kau membelakanginya, ia tak punya pilihan selain mengikutimu. (Ibnu Qayyim Al Jauziyyah)", "Kita adalah makhluk yang suka menyalahkan dari luar, tidak menyadari bahwa masalah biasanya dari dalam. (Abu Hamid Al Ghazali)", "Berpikirlah positif, tidak peduli seberapa keras kehidupanmu. (Ali bin Abi Thalib)", "Maka sesungguhnya bersama kesulitan itu ada kemudahan. (QS Al Insyirah 5)", "Janganlah kamu berduka cita, sesungguhnya Allah selalu bersama kita. (QS At Taubah 40)", "Orang yang terkaya adalah orang yang menerima pembagian (taqdir) dari Allah dengan senang hati.(Ali bin Husein)", "Jangan menjelaskan tentang dirimu kepada siapa pun, karena yang menyukaimu tidak butuh itu. Dan yang membencimu tidak percaya itu. (Ali bin Abi Thalib)", "Orang yang kuat bukanlah dia yang tidak pernah menangis, tetapi orang yang terus istiqomah di tengah godaan.", "Untuk semua kepedihan yang kau alami, bersabar dan bertahanlah, karena Allah tahu di mana batas kemampuanmu.", "Allah menjadikanmu seorang muslimah karena Ia ingin melihatmu di surga, yang perlu kamu lakukan adalah kamu pantas untuk itu.", "Islam memperlakukan wanita dengan hormat dan bermartabat. Maka jangan mau menerima apapun yang lebih rendah dari itu.", "Bukanlah kesabaran jika masih mempunyai batas, dan bukanlah keikhlasan jika masih merasakan sakit.", "Saat kamu melihat ibumu, kamu sedang melihat cinta paling murni yang pernah kamu tahu.", "Cinta ibu adalah kedamaian. Kita tidak perlu berjuang untuk mendapatkannya, kita juga tidak perlu melayakkan diri untuk memperolehnya.", "Ya Allah, berikan surga-Mu untuknya, karena dia adalah surga dalam hidupku.", "Hormatilah wanita, karena mereka adalah ibunya umat manusia. – Ali bin Abi Thalib", "Tidak ada yang bisa menandingi dahsyatnya doa seorang ibu.", "Ibu adalah ciptaan terindah, karena di dunia yang egois ini, dia adalah satu-satunya yang selalu ingin melihatmu bahagia.", "Hidup tidak datang dengan sebuah manual, ia datang berkat seorang ibu.", "Jika Allah saja mencintaimu lebih dari sekedar cinta seorang ibu, maka seharusnya kamu tidak malu untuk menangis kepada-Nya seperti seorang bayi.", "Buat ibumu selalu tersenyum, karena dia telah menghabiskan siang dan malamnya mencegahmu untuk tidak menangis.", "Cintai ibumu, orang terindah di dunia ini. Pengkritik terbaik kita, namun juga pendukung kita yang terkuat.", "Cintai selalu ibumu karena kamu tidak akan pernah mendapatkan yang lain.", "Sejak kamu lahir, ibu selalu berusaha membuatmu bahagia tanpa mengharapkan imbalan apapun. Ya Allah, bukakanlah pintu surga untuknya dan bahagiakan dia.", "Ketika doa ibu menyertaimu, kamu siap berdiri menghadapi dunia.", "Cinta seorang ayah akan selalu tersembunyi di dalam hatinya dan senyumannya.", "Lelah mu hari ini lebih baik nak dari pada penyesalanmu di masa tuamu…berjuanglah selagi bisa.", "Terkadang, dalam bersedih, ayah lebih banyak diam karena memang tak pandai untuk menangis.", "Putraku tercinta, jadilah anak lelaki yang pantang menyerah, disiplin, sabar, dan tangguh.", "Anakku, walaupun aku tetap diam saat engkau memarahiku, aku akan tetap berusaha untuk", "Orang mukmin dalam masjid bagaikan ikan dalam air, sementara orang munafiq itu tak ubahnya burung dalam sangkar"]
                let quotesislam = listquotesislam[Math.floor(Math.random() * listquotesislam.length)]
                if (args.length === 1) return client.reply(from, quotesislam, id)
                if (args[1] > 10) return client.reply(from, 'Jumlah maksimal permintaan 10!', id)
                for (let i = 0; i < args[1]; i++) {
                    let quotesislam1 = listquotesislam[Math.floor(Math.random() * listquotesislam.length)]
                    client.reply(from, quotesislam1, id)
                }
                break
            case '!kerangajaib':

                const listkerang = ["tidak", "iya", "tidak", "tidak", "iya", "tidak", "tidak tidak tidak"]
                let kerang = listkerang[Math.floor(Math.random() * listkerang.length)]
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!kerangajaib [Pertanyaan]*', id)
                client.reply(from, `Pertanyaan : ${body.slice(13)}\nJawaban : ${kerang}`, id)
                break
            case '!rubik':

                const listrubik = ["F", "R", "U", "B", "L", "D", "F2", "R2", "U2", "B2", "L2", "D2", "F'", "R'", "U'", "B'", "L'", "D'"]
                let rubik = listrubik[Math.floor(Math.random() * listrubik.length)]
                let rubik1 = listrubik[Math.floor(Math.random() * listrubik.length)]
                let rubik2 = listrubik[Math.floor(Math.random() * listrubik.length)]
                let rubik3 = listrubik[Math.floor(Math.random() * listrubik.length)]
                let rubik4 = listrubik[Math.floor(Math.random() * listrubik.length)]
                let rubik5 = listrubik[Math.floor(Math.random() * listrubik.length)]
                let rubik6 = listrubik[Math.floor(Math.random() * listrubik.length)]
                let rubik7 = listrubik[Math.floor(Math.random() * listrubik.length)]
                let rubik8 = listrubik[Math.floor(Math.random() * listrubik.length)]
                let rubik9 = listrubik[Math.floor(Math.random() * listrubik.length)]
                let rubik0 = listrubik[Math.floor(Math.random() * listrubik.length)]
                let rubik11 = listrubik[Math.floor(Math.random() * listrubik.length)]
                let rubik12 = listrubik[Math.floor(Math.random() * listrubik.length)]
                let rubik13 = listrubik[Math.floor(Math.random() * listrubik.length)]
                let rubik14 = listrubik[Math.floor(Math.random() * listrubik.length)]
                let rubik15 = listrubik[Math.floor(Math.random() * listrubik.length)]
                let rubik16 = listrubik[Math.floor(Math.random() * listrubik.length)]
                let rubik17 = listrubik[Math.floor(Math.random() * listrubik.length)]
                client.reply(from, `${rubik} ${rubik1} ${rubik2} ${rubik3} ${rubik4} ${rubik5} ${rubik6} ${rubik7} ${rubik8} ${rubik9} ${rubik0} ${rubik11} ${rubik12} ${rubik13} ${rubik14} ${rubik15} ${rubik16} ${rubik17}`, id)
                break
            case '!linkwa':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!linkwa [628xxxxx]*', id)

                client.reply(from, `https://wa.me/${args[1]}`, id)
                break
            case '!shortlink':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!shortlink [url]*', id)
                const shortlink = await get.get(`https://api.i-tech.id/tools/shorturl?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&link=${args[1]}`).json()
                client.reply(from, shortlink.result, id)
            case '!artinama':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!artinama [nama]*', id)
                const artinama = await get.get(`https://api.i-tech.id/tools/arti?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&nama=${body.slice(10)}`).json()
                client.reply(from, `Arti dari nama *${body.slice(10)}* adalah :\n${artinama.arti}`, id)

                break
            case '!bapack':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!bapack [Text]*', id)
                const bapack = await get.get(`https://api.terhambar.com/bpk?kata=${body.slice(8)}`).json()
                client.reply(from, bapack.text, id)
                break
            case '!ascii':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!ascii [Text]*', id)
                const ascii = await get.get(`https://rasi-tech-api.000webhostapp.com/ascii.php?apikey=rasitech&kata=${body.slice(7)}`).json()
                client.reply(from, ascii.result, id)
                break
            case '!f100':

                const f100 = await get.get(`https://api.i-tech.id/tools/f100?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG`).json()
                client.reply(from, f100.soal, id)

                client.reply(from, f100.jawaban, id)

                break
            case '!search':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!search [Text]*', id)
                const search = await get.get(`https://api.i-tech.id/dl/googles?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&query=${body.slice(8)}`).json()
                client.reply(from, search.result, id)
                break
            case '!pln':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!pln [no]*', id)
                const pln = await get.get(`https://api.i-tech.id/tagihan/pln?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&no=${args[1]}`).json()
                client.reply(from, `Nomor : ${pln.nomor}\nNama : ${pln.nama}\nTotal : ${pln.total}\nLembar Tagihan : ${pln.lembar_tagihan}`, id)
                break
            case '!bpjs':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!bpjs [no]*', id)
                const bpjs = await get.get(`https://api.i-tech.id/tagihan/bpjs?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&no=${args[1]}`).json()
                client.reply(from, `Nomor : ${bpjs.nomor}\nNama : ${bpjs.nama}\nTotal : ${bpjs.total}\nLembar Tagihan : ${bpjs.lembar_tagihan}`, id)
                break
            case '!gas':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!gas [no]*', id)
                const gas = await get.get(`https://api.i-tech.id/tagihan/gas?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&no=${args[1]}`).json()
                client.reply(from, `Nomor : ${gas.nomor}\nNama : ${gas.nama}\nTotal : ${gas.total}\nLembar Tagihan : ${gas.lembar_tagihan}`, id)
                break
            case '!indihome':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!indihome [no]*', id)
                const indihome = await get.get(`https://api.i-tech.id/tagihan/indihome?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&no=${args[1]}`).json()
                client.reply(from, `Nomor : ${indihome.nomor}\nNama : ${indihome.nama}\nTotal : ${indihome.total}\nLembar Tagihan : ${indihome.lembar_tagihan}`, id)
                break
            case '!speedy':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!speedy [no]*', id)
                const speedy = await get.get(`https://api.i-tech.id/tagihan/speedy?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&no=${args[1]}`).json()
                client.reply(from, `Nomor : ${speedy.nomor}\nNama : ${speedy.nama}\nTotal : ${speedy.total}\nLembar Tagihan : ${speedy.lembar_tagihan}`, id)
                break
            case '!cbn':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!cbn [no]*', id)
                const cbn = await get.get(`https://api.i-tech.id/tagihan/cbn?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&no=${args[1]}`).json()
                client.reply(from, `Nomor : ${cbn.nomor}\nNama : ${cbn.nama}\nTotal : ${cbn.total}\nLembar Tagihan : ${cbn.lembar_tagihan}`, id)
                break
            case '!hallo':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!hallo [no]*', id)
                const hallo = await get.get(`https://api.i-tech.id/tagihan/halo?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&no=${args[1]}`).json()
                client.reply(from, `Nomor : ${hallo.nomor}\nNama : ${hallo.nama}\nTotal : ${hallo.total}\nLembar Tagihan : ${hallo.lembar_tagihan}`, id)
                break
            case '!matrix':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!matrix [no]*', id)
                const matrix = await get.get(`https://api.i-tech.id/tagihan/matrix?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&no=${args[1]}`).json()
                client.reply(from, `Nomor : ${matrix.nomor}\nNama : ${matrix.nama}\nTotal : ${matrix.total}\nLembar Tagihan : ${matrix.lembar_tagihan}`, id)
                break
            case '!xl':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!xl [no]*', id)
                const xl = await get.get(`https://api.i-tech.id/tagihan/xl?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&no=${args[1]}`).json()
                client.reply(from, `Nomor : ${xl.nomor}\nNama : ${xl.nama}\nTotal : ${xl.total}\nLembar Tagihan : ${xl.lembar_tagihan}`, id)
                break
            case '!tri':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!tri [no]*', id)
                const tri = await get.get(`https://api.i-tech.id/tagihan/tri?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&no=${args[1]}`).json()
                client.reply(from, `Nomor : ${tri.nomor}\nNama : ${tri.nama}\nTotal : ${tri.total}\nLembar Tagihan : ${tri.lembar_tagihan}`, id)
                break
            case '!smart':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!smart [no]*', id)
                const smart = await get.get(`https://api.i-tech.id/tagihan/smart?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&no=${args[1]}`).json()
                client.reply(from, `Nomor : ${smart.nomor}\nNama : ${smart.nama}\nTotal : ${smart.total}\nLembar Tagihan : ${smart.lembar_tagihan}`, id)
                break
            case '!gambar':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!gambar [Text]*', id)
                const searchimg = await get.get(`https://api.i-tech.id/dl/googlei?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&query=${body.slice(11)}`).json()
                client.reply(from, searchimg.result, id)
                break
            case '!kataalay':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!kataalay [Text]*', id)
                const kataalay = await get.get(`https://api.i-tech.id/tools/alay?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&kata=${body.slice(10)}`).json()
                client.reply(from, kataalay.result, id)
                break
            case '!simi':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!simi [Text]*', id)
                const simi = await get.get(`https://rasi-tech-api.000webhostapp.com/simi.php?apikey=rasitech&text=${body.slice(6)}`).json()
                client.reply(from, simi.result, id)
                break
            case '!katahilih':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!katahilih [Text]*', id)
                const katahilih = await get.get(`https://api.i-tech.id/tools/hilih?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&kata=${body.slice(11)}`).json()
                client.reply(from, katahilih.result, id)
                break
            case '!kataninja':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!kataninja [Text]*', id)
                const kataninja = await get.get(`https://api.i-tech.id/tools/ninja?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&kata=${body.slice(11)}`).json()
                client.reply(from, kataninja.result, id)
                break
            case '!kbbi':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!kbbi [Text]*', id)
                const kbbi = await get.get(`https://api.i-tech.id/tools/kbbi?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&query=${body.slice(6)}`).json()
                client.reply(from, kbbi.result, id)
                break
            case '!md5':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!md5 [Text]*', id)
                const md5h = await get.get(`https://api.i-tech.id/hash/md5?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&string=${body.slice(5)}`).json()
                client.reply(from, md5h.result, id)
                break
            case '!katapasir':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!katapasir [Text]*', id)
                const katapasir = await get.get(`https://api.vhtear.com/sand_writing?text1=${body.slice(11)}&apikey=${RasiApi}`).json()
                client.sendFileFromUrl(from, katapasir.imgUrl, `katapasir.jpg`, `Sudah Jadi Donk!`, id)
                break
            case '!penyegar':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                const penyegar = await get.get(`https://api.i-tech.id/tools/gambar?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG`).json()
                client.sendFileFromUrl(from, penyegar.result, `penyegar.jpg`, `Penyegar Timeline :)`, id)
                break
            case '!gold':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                const gold = await get.get(`http://zeksapi.herokuapp.com/api/gplaybutton?text=${body.slice(6)}&apikey=apivinz`).json()
                client.sendFileFromUrl(from, gold.result, `gold.jpg`, `Selamat! Anda mendapatkan Gold Play Button dari youtube@support.com`, id)
                break
            case '!silver':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                const silver = await get.get(`http://zeksapi.herokuapp.com/api/splaybutton?text=${body.slice(6)}&apikey=apivinz`).json()
                client.sendFileFromUrl(from, silver.result, `gold.jpg`, `Selamat! Anda mendapatkan Silver Play Button dari youtube@support.com`, id)
                break
            case '!shopee':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                const shopee = await get.get(`https://api.vhtear.com/shopee?query=${body.slice(6)}&count=1&apikey=${RasiApi}`).json()
                client.sendFileFromUrl(from, shopee.image_cover, `shopee.jpg`, `*Nama* : ${shopee.nama}\n*Harga* : ${shopee.harga}\n*Terjual* : ${shopee.terjual}\n*Lokasi Toko* : ${shopee.shop_location}\n*Deskripsi* : ${shopee.description}`, id)
                const img_detail = shopee.image_detail
                for (let i of img_detail) {
                    client.sendFileFromUrl(from, i, `shopee.jpg`, ``, id)
                }
                break
            case '!calendargen':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                if (!args[1].match(isUrl)) return client.reply(from, mess.error.Iv, id)
                const calendargen = await get.get(`https://api.vhtear.com/calender?link=${args[1]}&apikey=${RasiApi}`).json()
                client.sendFileFromUrl(from, calendargen.imgUrl, `calendargen.jpg`, `Kalender ape ni man!`, id)
                break
            case '!img2fire':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                if (!args[1].match(isUrl)) return client.reply(from, mess.error.Iv, id)
                const img2fire = await get.get(`https://api.vhtear.com/burning_fire?link=${args[1]}&apikey=${RasiApi}`).json()
                client.sendImageAsSticker(from, img2fire.imgUrl, id)
                break
            case '!nama':

                if (args[1].toLowerCase() === 'laki') {
                    if (args[1] === `laki`) return
                    const namal = await get.get(`https://api.i-tech.id/tools/nama?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&gender=male`).json()
                    client.reply(from, namal.result, id)
                } else if (args[1].toLowerCase() === 'cewe') {
                    const namac = await get.get(`https://api.i-tech.id/tools/nama?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&gender=famle`).json()
                    client.reply(from, namac.result, id)
                }
                break
            case '!pastebin':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                arg = body.trim().split('|')
                if (arg.length >= 3) {
                    client.reply(from, mess.wait, id)
                    const judulp = encodeURIComponent(arg[1])
                    const textp = encodeURIComponent(arg[2])
                    const pastebin = await get.get(`https://rasi-tech-api.000webhostapp.com/pastebin.php?apikey=rasitech&privasi=0&judul=${judulp}&isi=${textp}`).json()
                    client.reply(from, pastebin.result, id)

                } else {
                    client.reply(from, 'Masukan Seperti ini !pastebin |judul|tulisan| example : !pastebin |Cara Membuat Kue|1. Siapkan bahan|', id)
                }
                break
            case '!qts':

                const qts = await get.get(`https://api.terhambar.com/qts/`).json()
                client.reply(from, qts.quotes, id)
                break
            case '!twist':

                const twist = await get.get(`https://api.i-tech.id/tools/twist?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&negara=id`).json()
                client.reply(from, twist.quotes, id)
                break
            case '!fact':

                const fact = await get.get(`https://api.i-tech.id/tools/fakta?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG`).json()
                client.reply(from, fact.result, id)
                break
            case '!pantunpakboi':

                const pantunpakboi = await get.get(`https://api.i-tech.id/tools/pantun?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG`).json()
                client.reply(from, pantunpakboi.result, id)
                break
            case '!kambing':

                const kambing = await get.get(`https://api.i-tech.id/tools/twist?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&negara=id`).json()
                client.sendFileFromUrl(from, kambing.result, `kambing.jpg`, `Nih Kambing!`, id)
                break
            case '!terjemah':

                var bahsa = body.slice(10, 12)
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!terjemah [en\bahasa] [Text]*', id)
                const terjemah = await get.get(`https://api.i-tech.id/tools/translate?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&lang=${bahsa}&teks=${body.slice(13)}`).json()
                client.reply(from, terjemah.result, id)
                break
            case '!oranghilang':

                const oranghilang = await get.get(`https://api.i-tech.id/tools/picmis?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&text1=Orang Hilang&text2=${args[3]}&text3=Segera hubungi nomor berikut ${args[2]}&pic=${args[1]}`).json()
                client.sendFileFromUrl(from, oranghilang.result, `ilang.jpg`, `dicari orang hilang!`, id)


                break

            case '!chatid':

                client.reply(from, from, id)
                break
            case '!getses':

                if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner bot', id)
                const sesPic = await client.getSnapshot()
                client.sendFile(from, sesPic, 'session.png', 'Neh...', id)
                break
            case '!lirik':

                if (args.length == 1) return client.reply(from, 'Kirim perintah *!lirik [optional]*, contoh *!lirik aku bukan boneka*', id)
                const lagu = body.slice(7)
                const lirik = await liriklagu(lagu)
                client.reply(from, lirik, id)
                break
            case '!nsfwmenu':
                if (!isNsfw) return
                client.reply(from, '1. !randomHentai\n2. !randomNsfwNeko', id)
                break
            case '!igstalk':
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!igStalk @username*\nConntoh *!igStalk @irwan_x_yans*', id)
                const stalk = await get.get(`https://irwanx-api.herokuapp.com/api/ig/stalk?username=${args[1]}&apiKey=${apiKey}`).json()
                if (stalk.error) return client.reply(from, stalk.error, id)
                const {
                    Biodata, Jumlah_Followers, Jumlah_Following, Jumlah_Post, Name, Username, Profile_pic
                } = stalk
                const caps = `➸ *Nama* : ${Name}\n➸ *Username* : ${Username}\n➸ *Jumlah Followers* : ${Jumlah_Followers}\n➸ *Jumlah Following* : ${Jumlah_Following}\n➸ *Jumlah Postingan* : ${Jumlah_Post}\n➸ *Biodata* : ${Biodata}`
                await client.sendFileFromUrl(from, Profile_pic, 'Profile.jpg', caps, id)
                break
            case '!infogempa':
                const bmkg = await get.get(`https://irwanx-api.herokuapp.com/api/infogempa?apikey=${apiKey}`).json()
                const {
                    potensi, koordinat, lokasi, kedalaman, magnitude, waktu, map
                } = bmkg
                const hasil = `*${waktu}*\n📍 *Lokasi* : *${lokasi}*\n〽️ *Kedalaman* : *${kedalaman}*\n💢 *Magnitude* : *${magnitude}*\n🔘 *Potensi* : *${potensi}*\n📍 *Koordinat* : *${koordinat}*`
                client.sendFileFromUrl(from, map, 'shakemap.jpg', hasil, id)
                break
            case '!nh':
                //if (isGroupMsg) return client.reply(from, 'Sorry this command for private chat only!', id)
                if (args.length === 2) {
                    const nuklir = body.split(' ')[1]
                    client.reply(from, mess.wait, id)
                    const cek = await nhentai.exists(nuklir)
                    if (cek === true) {
                        try {
                            const api = new API()
                            const pic = await api.getBook(nuklir).then(book => {
                                return api.getImageURL(book.cover)
                            })
                            const dojin = await nhentai.getDoujin(nuklir)
                            const {
                                title,
                                details,
                                link
                            } = dojin
                            const {
                                parodies,
                                tags,
                                artists,
                                groups,
                                languages,
                                categories
                            } = await details
                            var teks = `*Title* : ${title}\n\n*Parodies* : ${parodies}\n\n*Tags* : ${tags.join(', ')}\n\n*Artists* : ${artists.join(', ')}\n\n*Groups* : ${groups.join(', ')}\n\n*Languages* : ${languages.join(', ')}\n\n*Categories* : ${categories}\n\n*Link* : ${link}`
                            //exec('nhentai --id=' + nuklir + ` -P mantap.pdf -o ./hentong/${nuklir}.pdf --format `+ `${nuklir}.pdf`, (error, stdout, stderr) => {
                            client.sendFileFromUrl(from, pic, 'hentod.jpg', teks, id)
                            //client.sendFile(from, `./hentong/${nuklir}.pdf/${nuklir}.pdf.pdf`, then(() => `${title}.pdf`, '', id)).catch(() => 
                            //client.sendFile(from, `./hentong/${nuklir}.pdf/${nuklir}.pdf.pdf`, `${title}.pdf`, '', id))
                            /*if (error) {
                                console.log('error : '+ error.message)
                                return
                            }
                            if (stderr) {
                                console.log('stderr : '+ stderr)
                                return
                            }
                            console.log('stdout : '+ stdout)*/
                            //})
                        } catch (err) {
                            client.reply(from, '[❗] Terjadi kesalahan, mungkin kode nuklir salah', id)
                        }
                    } else {
                        client.reply(from, '[❗] Kode nuClear Salah!')
                    }
                } else {
                    client.reply(from, '[ WRONG ] Kirim perintah *!nh [nuClear]* untuk contoh kirim perintah *!readme*')
                }
                break
            case '!brainly':
                if (args.length >= 2) {
                    const BrainlySearch = require('./lib/brainly')
                    let tanya = body.slice(9)
                    let jum = Number(tanya.split('.')[1]) || 2
                    if (jum > 10) return client.reply(from, 'Max 10!', id)
                    if (Number(tanya[tanya.length - 1])) {
                        tanya
                    }
                    client.reply(from, `➸ *Pertanyaan* : ${tanya.split('.')[0]}\n\n➸ *Jumlah jawaban* : ${Number(jum)}`, id)
                    await BrainlySearch(tanya.split('.')[0], Number(jum), function(res) {
                        res.forEach(x => {
                            if (x.jawaban.fotoJawaban.length == 0) {
                                client.reply(from, `➸ *Pertanyaan* : ${x.pertanyaan}\n\n➸ *Jawaban* : ${x.jawaban.judulJawaban}\n`, id)
                            } else {
                                client.reply(from, `➸ *Pertanyaan* : ${x.pertanyaan}\n\n➸ *Jawaban* : ${x.jawaban.judulJawaban}\n\n➸ *Link foto jawaban* : ${x.jawaban.fotoJawaban.join('\n')}`, id)
                            }
                        })
                    })
                } else {
                    client.reply(from, 'Usage :\n!brainly [pertanyaan] [.jumlah]\n\nEx : \n!brainly NKRI .2', id)
                }
                break
            case '!wait':
                if (isMedia && type === 'image' || quotedMsg && quotedMsg.type === 'image') {
                    if (isMedia) {
                        var mediaData = await decryptMedia(message, uaOverride)
                    } else {
                        var mediaData = await decryptMedia(quotedMsg, uaOverride)
                    }
                    const fetch = require('node-fetch')
                    const imgBS4 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                    client.reply(from, 'Searching....', id)
                    fetch('https://trace.moe/api/search', {
                            method: 'POST',
                            body: JSON.stringify({
                                image: imgBS4
                            }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                        .then(respon => respon.json())
                        .then(resolt => {
                            if (resolt.docs && resolt.docs.length <= 0) {
                                client.reply(from, 'Maaf, saya tidak tau ini anime apa', id)
                            }
                            const {
                                is_adult,
                                title,
                                title_chinese,
                                title_romaji,
                                title_english,
                                episode,
                                similarity,
                                filename,
                                at,
                                tokenthumb,
                                anilist_id
                            } = resolt.docs[0]
                            teks = ''
                            if (similarity < 0.92) {
                                teks = '*Saya memiliki keyakinan rendah dalam hal ini* :\n\n'
                            }
                            teks += `➸ *Title Japanese* : ${title}\n➸ *Title chinese* : ${title_chinese}\n➸ *Title Romaji* : ${title_romaji}\n➸ *Title English* : ${title_english}\n`
                            teks += `➸ *Ecchi* : ${is_adult}\n`
                            teks += `➸ *Eps* : ${episode.toString()}\n`
                            teks += `➸ *Kesamaan* : ${(similarity * 100).toFixed(1)}%\n`
                            var video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`;
                            client.sendFileFromUrl(from, video, 'nimek.mp4', teks, id).catch(() => {
                                client.reply(from, teks, id)
                            })
                        })
                        .catch(() => {
                            client.reply(from, 'Error !', id)
                        })
                } else {
                    client.sendFile(from, './media/img/tutod.jpg', 'Tutor.jpg', 'Neh contoh mhank!', id)
                }
                break
            case '!quotemaker':
                arg = body.trim().split('|')
                if (arg.length >= 4) {
                    client.reply(from, mess.wait, id)
                    const quotes = encodeURIComponent(arg[1])
                    const author = encodeURIComponent(arg[2])
                    const theme = encodeURIComponent(arg[3])
                    await quotemaker(quotes, author, theme).then(amsu => {
                        client.sendFile(from, amsu, 'quotesmaker.jpg', 'neh...').catch(() => {
                            client.reply(from, mess.error.Qm, id)
                        })
                    })
                } else {
                    client.reply(from, 'Usage: \n!quotemaker |teks|watermark|theme\n\nEx :\n!quotemaker |ini contoh|bicit|random', id)
                }
                break
            case '!linkgroup':
                if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
                if (isGroupMsg) {
                    const inviteLink = await client.getGroupInviteLink(groupId);
                    client.sendLinkWithAutoPreview(from, inviteLink, `\nLink group *${name}*`)
                } else {
                    client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                }
                break
            case '!grouptitle':

                if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                const isGroupOwner1 = sender.id === chat.groupMetadata.owner
                if (!isGroupOwner1) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner group', id)
                if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
                if (args.length === 1) return client.reply(from, 'Masukan nama group Contoh !grouptitle Rasi Tech Group!', id)
                await client.setGroupTitle(from, body.slice(12), true)
                client.reply(from, 'Berhasil Merubah Judul Group', id)
                break
            case '!buka':

                if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
                await client.setGroupToAdminsOnly(groupId, false)
                client.reply(from, 'Group di buka', id)
                break
            case '!tutup':

                if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
                await client.setGroupToAdminsOnly(groupId, true)
                client.reply(from, 'Group di tutup', id)
                break
            case '!groupedit':

                if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                const isGroupOwner3 = sender.id === chat.groupMetadata.owner
                if (!isGroupOwner3) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner group', id)
                if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
                if (args.length === 1) return client.reply(from, 'Pilih enable atau disable!', id)
                if (args[1] === 'enable') {
                    await client.setGroupEditToAdminsOnly(groupId, true)
                    client.reply(from, 'Berhasil Mengaktifkan Hanya Admin Yang Dapat Mengedit Info Group', id)
                } else if (args[1] === 'disable') {
                    await client.setGroupEditToAdminsOnly(groupId, false)
                    client.reply(from, 'Berhasil Menonaktifkan Hanya Admin Yang Dapat Mengedit Info Group', id)
                } else {
                    client.reply(from, 'Pilih enable atau disable udin!', id)
                }
                break
            case '!groupdesc':
                if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                const isGroupOwner4 = sender.id === chat.groupMetadata.owner
                if (!isGroupOwner4) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner group', id)
                if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
                if (args.length === 1) return client.reply(from, 'Masukan Deskripsi Contoh !groupdesc ini Deskripsi grub rasi tech!', id)
                await client.setGroupDescription(groupId, body.slice(10), true)
                client.reply(from, 'Berhasil Merubah Judul Group', id)
                break
            case '!bc':
                if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner bot!', id)
                let msg = body.slice(4)
                const chatz = await client.getAllChatIds()
                for (let ids of chatz) {
                    var cvk = await client.getChatById(ids)
                    if (!cvk.isReadOnly) await client.sendText(ids, `[ Shinomiya Kaguya BOT Broadcast ]\n\n${msg}`)
                }
                client.reply(from, 'Broadcast Success!', id)
                break
            case '!bc2':

                if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner bot!', id)
                let msg2 = body.slice(4)
                const chatz2 = await client.getAllChatIds()
                for (let ids of chatz2) {
                    var cvk = await client.getChatById(ids)
                    if (!cvk.isReadOnly) await client.sendText(ids, `${msg2}`)
                }
                client.reply(from, 'Broadcast Success!', id)
                break
            case '!adminlist':
                if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                let mimin = ''
                for (let admon of groupAdmins) {
                    mimin += `➸ @${admon.replace(/@c.us/g, '')}\n`
                }
                await client.sendTextWithMentions(from, mimin)
                break
            case '!ownergroup':
                if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                const Owner_ = chat.groupMetadata.owner
                await client.sendTextWithMentions(from, `Owner Group : @${Owner_}`)
                break
            case '!mentionall':
                if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                const groupMem = await client.getGroupMembers(groupId)
                let hehe = '╔══✪〘 Mention All 〙✪══\n'
                for (let i = 0; i < groupMem.length; i++) {
                    hehe += '╠➥'
                    hehe += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
                }
                hehe += '╚═〘 Devaaaa BOT 〙'
                await client.sendTextWithMentions(from, hehe)
                break
            case '!add':

                const orang = args[1]
                if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
                if (args.length === 1) return client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!add* 628xxxxx', id)
                if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
                try {
                    await client.addParticipant(from, `${orang}@c.us`)
                } catch {
                    client.reply(from, mess.error.Ad, id)
                }
                break
            case '!kick':

                if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
                if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
                if (mentionedJidList.length === 0) return client.reply(from, 'Untuk menggunakan Perintah ini, kirim perintah *!kick* @tagmember', id)
                await client.sendText(from, `Perintah diterima, mengeluarkan:\n${mentionedJidList.join('\n')}`)
                for (let i = 0; i < mentionedJidList.length; i++) {
                    if (groupAdmins.includes(mentionedJidList[i])) return client.reply(from, mess.error.Ki, id)
                    await client.removeParticipant(groupId, mentionedJidList[i])
                }
                break
            case '!leave':

                if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
                if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                await client.sendText(from, 'Sayonara').then(() => client.leaveGroup(groupId))
                break
            case '!promote':

                if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
                if (!isGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
                if (!isBotGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
                if (mentionedJidList.length === 0) return client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!promote* @tagmember', id)
                if (mentionedJidList.length >= 2) return client.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 user.', id)
                if (groupAdmins.includes(mentionedJidList[0])) return client.reply(from, 'Maaf, user tersebut sudah menjadi admin.', id)
                await client.promoteParticipant(groupId, mentionedJidList[0])
                await client.sendTextWithMentions(from, `Perintah diterima, menambahkan @${mentionedJidList[0]} sebagai admin.`)
                break
            case '!demote':

                if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
                if (!isGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
                if (!isBotGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
                if (mentionedJidList.length === 0) return client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!demote* @tagadmin', id)
                if (mentionedJidList.length >= 2) return client.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 orang.', id)
                if (!groupAdmins.includes(mentionedJidList[0])) return client.reply(from, 'Maaf, user tersebut tidak menjadi admin.', id)
                await client.demoteParticipant(groupId, mentionedJidList[0])
                await client.sendTextWithMentions(from, `Perintah diterima, menghapus jabatan @${mentionedJidList[0]}.`)
                break
            case '!gabung':

                if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner bot!', id)
                const gabung = await client.getGroupMembers(groupId)
                const listccc = await client.getAllChatIds()
                for (let ids of listccc) {
                    var cvk = await client.getChatById(ids)
                    try {
                        if (!cvk.isReadOnly) await client.addParticipant(from, ids)
                    } catch (error) {
                        client.sendTextWithMentions(from, `Tidak dapat menambahkan ${ids.replace(/@c.us/g, '')}`)
                    }
                }
                client.reply(from, 'Berhasil Memindahkan Member!', id)
                break
            case '!linkmem':

                if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                const groupMem5 = await client.getGroupMembers(groupId)
                let hehe5 = '╔══✪〘 Link Nomor Member 〙✪══\n'
                for (let i = 0; i < groupMem5.length; i++) {
                    hehe5 += ` https://wa.me/${groupMem5[i].id.replace(/@c.us/g, '').replace(/@/g, '')}\n`
                }
                hehe5 += '╚═〘 Rasi Tech BOT 〙'
                await client.sendText(from, hehe5)
                client.reply(from, `Total Member : ${groupMem5.length}`, id)
                client.reply(from, 'Get All Link Member Success!', id)
                break
            case '!bcmem':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!bcmem [Pesan]*', id)
                if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                const groupMem4 = await client.getGroupMembers(groupId)
                for (let i = 0; i < groupMem4.length; i++) {
                    await client.sendText(groupMem4[i].id, `[ Group *${chat.contact.name}* Broadcast ]\n\n${body.slice(7)}`)
                    client.sendTextWithMentions(from, `Berhasil Terkirim ke @${groupMem4[i].id.replace(/@c.us/g, '')}`, id)
                }
                client.reply(from, `Total Member : ${groupMem4.length}`, id)
                client.reply(from, `Broadcast Member Success!`)
                break
            case '!mentionall2':

                if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                const groupMem2 = await client.getGroupMembers(groupId)
                for (let i = 0; i < groupMem2.length; i++) {
                    await client.sendTextWithMentions(from, `@${groupMem2[i].id.replace(/@c.us/g, '')}`)

                }
                client.reply(from, `Total Member : ${groupMem2.length}`, id)
                client.reply(from, 'Mentionall Success!', id)

                break
            case '!randommem':

                if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                const groupMem7 = await client.getGroupMembers(groupId)
                let ranm = ``
                for (let i = 0; i < Math.floor(Math.random() * groupMem7.length); i++) {
                    ranm = `@${groupMem7[i].id.replace(/@c.us/g, '')}`

                }
                await client.sendTextWithMentions(from, ranm)
                break

            case '!spam':

                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!spam | [628xxxx] | [Jumlah max 30] | [Kata]*', id)
                if (args[2] > 50) return client.reply(from, 'Jumlah maksimal pengiriman 50!', id)
                arg = body.trim().split('|')
                if (arg.length >= 3) {
                    client.reply(from, mess.wait, id)
                    const spamn = encodeURIComponent(arg[1])
                    const spams = encodeURIComponent(arg[3])
                    const spamj = encodeURIComponent(arg[2])
                    try {
                        for (let i = 0; i < spamj; i++) {
                            try {
                                client.sendText(`${spamn}@c.us`, spams)
                            } catch {
                                client.reply(from, mess.error.Ad, id)
                            }
                        }
                    } catch {
                        client.reply(from, mess.error.Ad, id)
                    }
                }
                client.reply(from, 'Spamming Success!', id)

                break

            case '!repeater':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!repeater [628xxxx] [Jumlah max 30] [Kata]*', id)
                if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                if (args[1] > 100) return client.reply(from, 'Jumlah maksimal pengiriman 100!', id)
                let repet = ''
                for (let i = 0; i < args[1]; i++) {
                    if (args[2] === `noline`)
                        repet += `${args[3]}`
                    else if (args[2] === `line`)
                        repet += `${args[3]}\n`
                }
                client.reply(from, repet)
                client.reply(from, 'Repeating Success!', id)

                break
            case '!repeater':

                if (args.length === 1) return client.reply(from, 'Kirim perintah *!repeater [628xxxx] [Jumlah max 30] [Kata]*', id)
                if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                let repett = ''
                for (let i = 0; i < args[1]; i++) {
                    repett += `${args[3]}\n`
                }
                break
            case '!kickall':
                if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                const isGroupOwner = sender.id === chat.groupMetadata.owner
                if (!isGroupOwner) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner group', id)
                if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
                const allMem = await client.getGroupMembers(groupId)
                for (let i = 0; i < allMem.length; i++) {
                    if (groupAdmins.includes(allMem[i].id)) {
                        console.log('Upss this is Admin group')
                    } else {
                        await client.removeParticipant(groupId, allMem[i].id)
                    }
                }
                client.reply(from, 'Succes kick all member', id)
                break
            case '!leaveall':
                if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner bot', id)
                const allChats = await client.getAllChatIds()
                const allGroups = await client.getAllGroups()
                for (let gclist of allGroups) {
                    await client.sendText(gclist.contact.id, `Maaf bot sedang pembersihan, total chat aktif : ${allChats.length}`)
                    await client.leaveGroup(gclist.contact.id)
                }
                client.reply(from, 'Succes leave all group!', id)
                break
            case '!clearall':
                if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner bot', id)
                const allChatz = await client.getAllChats()
                for (let dchat of allChatz) {
                    await client.deleteChat(dchat.id)
                }
                client.reply(from, 'Succes clear all chat!', id)
                break
            case '!ddos':
                if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!ddos [jumlah] [https://situs.com]*\nConntoh *!ddos 100 https://google.com*', id)
                if (!args[2].match(isUrl)) return client.reply(from, mess.error.Iv, id)
                let ddoss = '╔══✪〘 Progress RT-DDOS 〙✪══\n'
                for (let i = 0; i < args[1]; i++) {
                    const listddos = [`[!] DDOS Berhasil ke ${args[2]} Sebanyak ${args[1]}`, `[!] DDOS Gagal ke ${args[2]} Sebanyak ${args[1]}`]
                    let ddos = listddos[Math.floor(Math.random() * listddos.length)]
                    const ddosw = await get.get(args[2])
                    ddoss += '╠➥'
                    ddoss += `${ddos}\n`
                }
                ddoss += '╚═〘 Devaaa BOT 〙'
                await client.sendText(from, ddoss)
                break
            case '!mentionall3':
                if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                const groupMem3 = await client.getGroupMembers(groupId)
                let hehe3 = '╔══✪〘 Mention All 3 〙✪══\n'
                for (let i = 0; i < groupMem3.length; i++) {
                    hehe3 += ` ${groupMem3[i].id.replace(/@c.us/g, '').replace(/@/g, '')}\n`
                }
                hehe3 += '╚═〘 Devaaa BOT 〙'
                await client.sendText(from, hehe3)
                client.reply(from, `Total Member : ${groupMem3.length}`, id)
                client.reply(from, 'Mentionall Success!', id)
                break
            case '!pindahgrub':
                if (args.length === 1) return client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!pindahgrub grubId*', id)
                if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                const isGroupOwner5 = sender.id === chat.groupMetadata.owner
                if (!isGroupOwner5) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner group', id)
                if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
                const pindahgrub = await client.getGroupMembers(groupId)
                for (let i = 0; i < pindahgrub.length; i++) {
                    try {
                        await client.addParticipant(args[1], pindahgrub[i].id)
                    } catch (error) {
                        client.sendTextWithMentions(from, `Tidak dapat menambahkan ${pindahgrub[i].id.replace(/@c.us/g, '')}`)
                    }

                }
                break
            case '!imports':

                if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner bot!', id)
                if (args.length === 1) return client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!pindahgrub grubId*', id)
                const imports = await client.getGroupMembers(args[1])
                for (let i = 0; i < imports.length; i++) {
                    try {
                        await client.addParticipant(from, imports[i].id)
                    } catch (error) {
                        client.sendTextWithMentions(from, `Tidak dapat menambahkan ${imports[i].id.replace(/@c.us/g, '')}`)
                    }

                }
                break
            case '!add':
                const orang = args[1]
                if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
                if (args.length === 1) return client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!add* 628xxxxx', id)
                if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
                try {
                    await client.addParticipant(from, `${orang}@c.us`)
                } catch {
                    client.reply(from, mess.error.Ad, id)
                }
                break
            case '!kick':
                if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
                if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                if (!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
                if (mentionedJidList.length === 0) return client.reply(from, 'Untuk menggunakan Perintah ini, kirim perintah *!kick* @tagmember', id)
                await client.sendText(from, `Perintah diterima, mengeluarkan:\n${mentionedJidList.join('\n')}`)
                for (let i = 0; i < mentionedJidList.length; i++) {
                    if (groupAdmins.includes(mentionedJidList[i])) return client.reply(from, mess.error.Ki, id)
                    await client.removeParticipant(groupId, mentionedJidList[i])
                }
                break
            case '!leave':
                if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
                if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                await client.sendText(from, 'Sayonara').then(() => client.leaveGroup(groupId))
                break
            case '!promote':
                if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
                if (!isGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
                if (!isBotGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
                if (mentionedJidList.length === 0) return client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!promote* @tagmember', id)
                if (mentionedJidList.length >= 2) return client.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 user.', id)
                if (groupAdmins.includes(mentionedJidList[0])) return client.reply(from, 'Maaf, user tersebut sudah menjadi admin.', id)
                await client.promoteParticipant(groupId, mentionedJidList[0])
                await client.sendTextWithMentions(from, `Perintah diterima, menambahkan @${mentionedJidList[0]} sebagai admin.`)
                break
            case '!demote':
                if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
                if (!isGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
                if (!isBotGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
                if (mentionedJidList.length === 0) return client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!demote* @tagadmin', id)
                if (mentionedJidList.length >= 2) return client.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 orang.', id)
                if (!groupAdmins.includes(mentionedJidList[0])) return client.reply(from, 'Maaf, user tersebut tidak menjadi admin.', id)
                await client.demoteParticipant(groupId, mentionedJidList[0])
                await client.sendTextWithMentions(from, `Perintah diterima, menghapus jabatan @${mentionedJidList[0]}.`)
                break
            case '!join':
                //return client.reply(from, 'Jika ingin meng-invite bot ke group anda, silahkan izin ke wa.me/628882611841', id)
                if (args.length < 2) return client.reply(from, 'Kirim perintah *!join linkgroup key*\n\nEx:\n!join https://chat.whatsapp.com/blablablablablabla abcde\nuntuk key kamu bisa mendapatkannya hanya dengan donasi 5k', id)
                const link = args[1]
                const key = args[2]
                const tGr = await client.getAllGroups()
                const minMem = 2
                const isLink = link.match(/(https:\/\/chat.whatsapp.com)/gi)
                if (key !== 'lGjYt4zA5SQlTDx9z9Ca') return client.reply(from, '*key* salah! silahkan chat owner bot unruk mendapatkan key yang valid', id)
                const check = await client.inviteInfo(link)
                if (!isLink) return client.reply(from, 'Ini link? 👊🤬', id)
                if (tGr.length > 15) return client.reply(from, 'Maaf jumlah group sudah maksimal!', id)
                if (check.size < minMem) return client.reply(from, 'Member group tidak melebihi 30, bot tidak bisa masuk', id)
                if (check.status === 200) {
                    await client.joinGroupViaLink(link).then(() => client.reply(from, 'Bot akan segera masuk!'))
                } else {
                    client.reply(from, 'Link group tidak valid!', id)
                }
                break
            case '!delete':
                if (!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
                if (!isGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
                if (!quotedMsg) return client.reply(from, 'Salah!!, kirim perintah *!delete [tagpesanbot]*', id)
                if (!quotedMsgObj.fromMe) return client.reply(from, 'Salah!!, Bot tidak bisa mengahpus chat user lain!', id)
                client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
                break
            case '!getses':
                const sesPic = await client.getSnapshot()
                client.sendFile(from, sesPic, 'session.png', 'Neh...', id)
                break
            case '!lirik':
                if (args.length == 1) return client.reply(from, 'Kirim perintah *!lirik [optional]*, contoh *!lirik aku bukan boneka*', id)
                const lagu = body.slice(7)
                const lirik = await liriklagu(lagu)
                client.reply(from, lirik, id)
                break
            case '!chord':
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!chord [query]*, contoh *!chord aku bukan boneka*', id)
                const query__ = body.slice(7)
                const chord = await get.get(`https://irwanx-api.herokuapp.com/api/chordlagu?lagu=${query__}&apiKey=${apiKey}`).json()
                if (chord.error) return client.reply(from, chord.error, id)
                client.reply(from, chord.result, id)
                break
            case '!listdaerah':
                const listDaerah = await get('https://mhankbarbar.tech/daerah').json()
                client.reply(from, listDaerah.result, id)
                break
            case '!listblock':
                let hih = `This is list of blocked number\nTotal : ${blockNumber.length}\n`
                for (let i of blockNumber) {
                    hih += `➸ @${i.replace(/@c.us/g,'')}\n`
                }
                client.sendTextWithMentions(from, hih, id)
                break
            case '!jadwalshalat':
                if (args.length === 1) return client.reply(from, '[❗] Kirim perintah *!jadwalShalat [kota]*\ncontoh : *!jadwalShalat Magelang*\nUntuk list daerah kirim perintah *!listDaerah*')
                const daerah = body.slice(14)
                const jadwalShalat = await get.get(`https://irwanx-api.herokuapp.com/api/jadwalshalat?kota=${daerah}&apiKey=${apiKey}`).json()
                if (jadwalShalat.error) return client.reply(from, jadwalShalat.error, id)
                const {
                    Imsyak, Subuh, Dhuha, Dzuhur, Ashar, Maghrib, Isya
                } = await jadwalShalat
                arrbulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
                tgl = new Date().getDate()
                bln = new Date().getMonth()
                thn = new Date().getFullYear()
                const resultJadwal = `Jadwal shalat di ${daerah}, ${tgl}-${arrbulan[bln]}-${thn}\n\nImsyak : ${Imsyak}\nSubuh : ${Subuh}\nDhuha : ${Dhuha}\nDzuhur : ${Dzuhur}\nAshar : ${Ashar}\nMaghrib : ${Maghrib}\nIsya : ${Isya}`
                client.reply(from, resultJadwal, id)
                break
            case '!listchannel':
                client.reply(from, listChannel, id)
                break
            case '!jadwaltv':
                if (args.length === 1) return client.reply(from, 'Kirim perintah *!jadwalTv [channel]*', id)
                const query = body.slice(10).toLowerCase()
                const jadwal = await jadwalTv(query)
                client.reply(from, jadwal, id)
                break
            case '!jadwaltvnow':
                const jadwalNow = await get.get('https://api.haipbis.xyz/jadwaltvnow').json()
                client.reply(from, `Jam : ${jadwalNow.jam}\n\nJadwalTV : ${jadwalNow.jadwalTV}`, id)
                break
            case '!husbu':
                const diti = fs.readFileSync('./lib/husbu.json')
                const ditiJsin = JSON.parse(diti)
                const rindIndix = Math.floor(Math.random() * ditiJsin.length)
                const rindKiy = ditiJsin[rindIndix]
                client.sendFileFromUrl(from, rindKiy.image, 'Husbu.jpg', rindKiy.teks, id)
                break
            case '!randomhentai':
                if (isGroupMsg) {
                    if (!isNsfw) return client.reply(from, 'Command/Perintah NSFW belum di aktifkan di group ini!', id)
                    const hentai = await randomNimek('hentai')
                    if (hentai.endsWith('.png')) {
                        var ext = '.png'
                    } else {
                        var ext = '.jpg'
                    }
                    client.sendFileFromUrl(from, hentai, `Hentai${ext}`, 'Hentai!', id)
                    break
                } else {
                    const hentai = await randomNimek('hentai')
                    if (hentai.endsWith('.png')) {
                        var ext = '.png'
                    } else {
                        var ext = '.jpg'
                    }
                    client.sendFileFromUrl(from, hentai, `Hentai${ext}`, 'Hentai!', id)
                }
                case '!randomnsfwneko':
                    if (isGroupMsg) {
                        if (!isNsfw) return client.reply(from, 'Command/Perintah NSFW belum di aktifkan di group ini!', id)
                        const nsfwneko = await randomNimek('nsfw')
                        if (nsfwneko.endsWith('.png')) {
                            var ext = '.png'
                        } else {
                            var ext = '.jpg'
                        }
                        client.sendFileFromUrl(from, nsfwneko, `nsfwNeko${ext}`, 'Nsfwneko!', id)
                    } else {
                        const nsfwneko = await randomNimek('nsfw')
                        if (nsfwneko.endsWith('.png')) {
                            var ext = '.png'
                        } else {
                            var ext = '.jpg'
                        }
                        client.sendFileFromUrl(from, nsfwneko, `nsfwNeko${ext}`, 'Nsfwneko!', id)
                    }
                    break
                case '!randomnekonime':
                    const nekonime = await get.get('https://irwan-api-gans.herokuapp.com/api/nekonime').json()
                    if (nekonime.result.endsWith('.png')) {
                        var ext = '.png'
                    } else {
                        var ext = '.jpg'
                    }
                    client.sendFileFromUrl(from, nekonime.result, `Nekonime${ext}`, 'Nekonime!', id)
                    break
                case '!randomtrapnime':
                    const trap = await randomNimek('trap')
                    if (trap.endsWith('.png')) {
                        var ext = '.png'
                    } else {
                        var ext = '.jpg'
                    }
                    client.sendFileFromUrl(from, trap, `trapnime${ext}`, 'Trapnime!', id)
                    break
                case '!randomanime':
                    const nime = await randomNimek('anime')
                    if (nime.endsWith('.png')) {
                        var ext = '.png'
                    } else {
                        var ext = '.jpg'
                    }
                    client.sendFileFromUrl(from, nime, `Randomanime${ext}`, 'Randomanime!', id)
                    break
                case '!ip':
                    if (args.length === 1) return client.reply(from, 'Kirim perintah *!ip [IP]*', id)
                    const ip = await get.get(`http://ip-api.com/json/${args[1]}`).json()
                    client.reply(from, `Query : ${ip.query}\nCountry : ${ip.country}\nCountryCode : ${ip.countryCode}\nRegion : ${ip.region}\RegionName : ${ip.regionName}\nCity : ${ip.city}\nZip : ${ip.zip}\nLat : ${ip.lat}\nLon : ${ip.lon}\nTimezone : ${ip.timezone}\nIsp : ${ip.isp}\nOrg : ${ip.org}\nAs : ${ip.as}`, id)
                    break
                case '!inu':
                    const list = ["https://cdn.shibe.online/shibes/247d0ac978c9de9d9b66d72dbdc65f2dac64781d.jpg", "https://cdn.shibe.online/shibes/1cf322acb7d74308995b04ea5eae7b520e0eae76.jpg", "https://cdn.shibe.online/shibes/1ce955c3e49ae437dab68c09cf45297d68773adf.jpg", "https://cdn.shibe.online/shibes/ec02bee661a797518d37098ab9ad0c02da0b05c3.jpg", "https://cdn.shibe.online/shibes/1e6102253b51fbc116b887e3d3cde7b5c5083542.jpg", "https://cdn.shibe.online/shibes/f0c07a7205d95577861eee382b4c8899ac620351.jpg", "https://cdn.shibe.online/shibes/3eaf3b7427e2d375f09fc883f94fa8a6d4178a0a.jpg", "https://cdn.shibe.online/shibes/c8b9fcfde23aee8d179c4c6f34d34fa41dfaffbf.jpg", "https://cdn.shibe.online/shibes/55f298bc16017ed0aeae952031f0972b31c959cb.jpg", "https://cdn.shibe.online/shibes/2d5dfe2b0170d5de6c8bc8a24b8ad72449fbf6f6.jpg", "https://cdn.shibe.online/shibes/e9437de45e7cddd7d6c13299255e06f0f1d40918.jpg", "https://cdn.shibe.online/shibes/6c32141a0d5d089971d99e51fd74207ff10751e7.jpg", "https://cdn.shibe.online/shibes/028056c9f23ff40bc749a95cc7da7a4bb734e908.jpg", "https://cdn.shibe.online/shibes/4fb0c8b74dbc7653e75ec1da597f0e7ac95fe788.jpg", "https://cdn.shibe.online/shibes/125563d2ab4e520aaf27214483e765db9147dcb3.jpg", "https://cdn.shibe.online/shibes/ea5258fad62cebe1fedcd8ec95776d6a9447698c.jpg", "https://cdn.shibe.online/shibes/5ef2c83c2917e2f944910cb4a9a9b441d135f875.jpg", "https://cdn.shibe.online/shibes/6d124364f02944300ae4f927b181733390edf64e.jpg", "https://cdn.shibe.online/shibes/92213f0c406787acd4be252edb5e27c7e4f7a430.jpg", "https://cdn.shibe.online/shibes/40fda0fd3d329be0d92dd7e436faa80db13c5017.jpg", "https://cdn.shibe.online/shibes/e5c085fc427528fee7d4c3935ff4cd79af834a82.jpg", "https://cdn.shibe.online/shibes/f83fa32c0da893163321b5cccab024172ddbade1.jpg", "https://cdn.shibe.online/shibes/4aa2459b7f411919bf8df1991fa114e47b802957.jpg", "https://cdn.shibe.online/shibes/2ef54e174f13e6aa21bb8be3c7aec2fdac6a442f.jpg", "https://cdn.shibe.online/shibes/fa97547e670f23440608f333f8ec382a75ba5d94.jpg", "https://cdn.shibe.online/shibes/fb1b7150ed8eb4ffa3b0e61ba47546dd6ee7d0dc.jpg", "https://cdn.shibe.online/shibes/abf9fb41d914140a75d8bf8e05e4049e0a966c68.jpg", "https://cdn.shibe.online/shibes/f63e3abe54c71cc0d0c567ebe8bce198589ae145.jpg", "https://cdn.shibe.online/shibes/4c27b7b2395a5d051b00691cc4195ef286abf9e1.jpg", "https://cdn.shibe.online/shibes/00df02e302eac0676bb03f41f4adf2b32418bac8.jpg", "https://cdn.shibe.online/shibes/4deaac9baec39e8a93889a84257338ebb89eca50.jpg", "https://cdn.shibe.online/shibes/199f8513d34901b0b20a33758e6ee2d768634ebb.jpg", "https://cdn.shibe.online/shibes/f3efbf7a77e5797a72997869e8e2eaa9efcdceb5.jpg", "https://cdn.shibe.online/shibes/39a20ccc9cdc17ea27f08643b019734453016e68.jpg", "https://cdn.shibe.online/shibes/e67dea458b62cf3daa4b1e2b53a25405760af478.jpg", "https://cdn.shibe.online/shibes/0a892f6554c18c8bcdab4ef7adec1387c76c6812.jpg", "https://cdn.shibe.online/shibes/1b479987674c9b503f32e96e3a6aeca350a07ade.jpg", "https://cdn.shibe.online/shibes/0c80fc00d82e09d593669d7cce9e273024ba7db9.jpg", "https://cdn.shibe.online/shibes/bbc066183e87457b3143f71121fc9eebc40bf054.jpg", "https://cdn.shibe.online/shibes/0932bf77f115057c7308ef70c3de1de7f8e7c646.jpg", "https://cdn.shibe.online/shibes/9c87e6bb0f3dc938ce4c453eee176f24636440e0.jpg", "https://cdn.shibe.online/shibes/0af1bcb0b13edf5e9b773e34e54dfceec8fa5849.jpg", "https://cdn.shibe.online/shibes/32cf3f6eac4673d2e00f7360753c3f48ed53c650.jpg", "https://cdn.shibe.online/shibes/af94d8eeb0f06a0fa06f090f404e3bbe86967949.jpg", "https://cdn.shibe.online/shibes/4b55e826553b173c04c6f17aca8b0d2042d309fb.jpg", "https://cdn.shibe.online/shibes/a0e53593393b6c724956f9abe0abb112f7506b7b.jpg", "https://cdn.shibe.online/shibes/7eba25846f69b01ec04de1cae9fed4b45c203e87.jpg", "https://cdn.shibe.online/shibes/fec6620d74bcb17b210e2cedca72547a332030d0.jpg", "https://cdn.shibe.online/shibes/26cf6be03456a2609963d8fcf52cc3746fcb222c.jpg", "https://cdn.shibe.online/shibes/c41b5da03ad74b08b7919afc6caf2dd345b3e591.jpg", "https://cdn.shibe.online/shibes/7a9997f817ccdabac11d1f51fac563242658d654.jpg", "https://cdn.shibe.online/shibes/7221241bad7da783c3c4d84cfedbeb21b9e4deea.jpg", "https://cdn.shibe.online/shibes/283829584e6425421059c57d001c91b9dc86f33b.jpg", "https://cdn.shibe.online/shibes/5145c9d3c3603c9e626585cce8cffdfcac081b31.jpg", "https://cdn.shibe.online/shibes/b359c891e39994af83cf45738b28e499cb8ffe74.jpg", "https://cdn.shibe.online/shibes/0b77f74a5d9afaa4b5094b28a6f3ee60efcb3874.jpg", "https://cdn.shibe.online/shibes/adccfdf7d4d3332186c62ed8eb254a49b889c6f9.jpg", "https://cdn.shibe.online/shibes/3aac69180f777512d5dabd33b09f531b7a845331.jpg", "https://cdn.shibe.online/shibes/1d25e4f592db83039585fa480676687861498db8.jpg", "https://cdn.shibe.online/shibes/d8349a2436420cf5a89a0010e91bf8dfbdd9d1cc.jpg", "https://cdn.shibe.online/shibes/eb465ef1906dccd215e7a243b146c19e1af66c67.jpg", "https://cdn.shibe.online/shibes/3d14e3c32863195869e7a8ba22229f457780008b.jpg", "https://cdn.shibe.online/shibes/79cedc1a08302056f9819f39dcdf8eb4209551a3.jpg", "https://cdn.shibe.online/shibes/4440aa827f88c04baa9c946f72fc688a34173581.jpg", "https://cdn.shibe.online/shibes/94ea4a2d4b9cb852e9c1ff599f6a4acfa41a0c55.jpg", "https://cdn.shibe.online/shibes/f4478196e441aef0ada61bbebe96ac9a573b2e5d.jpg", "https://cdn.shibe.online/shibes/96d4db7c073526a35c626fc7518800586fd4ce67.jpg", "https://cdn.shibe.online/shibes/196f3ed10ee98557328c7b5db98ac4a539224927.jpg", "https://cdn.shibe.online/shibes/d12b07349029ca015d555849bcbd564d8b69fdbf.jpg", "https://cdn.shibe.online/shibes/80fba84353000476400a9849da045611a590c79f.jpg", "https://cdn.shibe.online/shibes/94cb90933e179375608c5c58b3d8658ef136ad3c.jpg", "https://cdn.shibe.online/shibes/8447e67b5d622ef0593485316b0c87940a0ef435.jpg", "https://cdn.shibe.online/shibes/c39a1d83ad44d2427fc8090298c1062d1d849f7e.jpg", "https://cdn.shibe.online/shibes/6f38b9b5b8dbf187f6e3313d6e7583ec3b942472.jpg", "https://cdn.shibe.online/shibes/81a2cbb9a91c6b1d55dcc702cd3f9cfd9a111cae.jpg", "https://cdn.shibe.online/shibes/f1f6ed56c814bd939645138b8e195ff392dfd799.jpg", "https://cdn.shibe.online/shibes/204a4c43cfad1cdc1b76cccb4b9a6dcb4a5246d8.jpg", "https://cdn.shibe.online/shibes/9f34919b6154a88afc7d001c9d5f79b2e465806f.jpg", "https://cdn.shibe.online/shibes/6f556a64a4885186331747c432c4ef4820620d14.jpg", "https://cdn.shibe.online/shibes/bbd18ae7aaf976f745bc3dff46b49641313c26a9.jpg", "https://cdn.shibe.online/shibes/6a2b286a28183267fca2200d7c677eba73b1217d.jpg", "https://cdn.shibe.online/shibes/06767701966ed64fa7eff2d8d9e018e9f10487ee.jpg", "https://cdn.shibe.online/shibes/7aafa4880b15b8f75d916b31485458b4a8d96815.jpg", "https://cdn.shibe.online/shibes/b501169755bcf5c1eca874ab116a2802b6e51a2e.jpg", "https://cdn.shibe.online/shibes/a8989bad101f35cf94213f17968c33c3031c16fc.jpg", "https://cdn.shibe.online/shibes/f5d78feb3baa0835056f15ff9ced8e3c32bb07e8.jpg", "https://cdn.shibe.online/shibes/75db0c76e86fbcf81d3946104c619a7950e62783.jpg", "https://cdn.shibe.online/shibes/8ac387d1b252595bbd0723a1995f17405386b794.jpg", "https://cdn.shibe.online/shibes/4379491ef4662faa178f791cc592b52653fb24b3.jpg", "https://cdn.shibe.online/shibes/4caeee5f80add8c3db9990663a356e4eec12fc0a.jpg", "https://cdn.shibe.online/shibes/99ef30ea8bb6064129da36e5673649e957cc76c0.jpg", "https://cdn.shibe.online/shibes/aeac6a5b0a07a00fba0ba953af27734d2361fc10.jpg", "https://cdn.shibe.online/shibes/9a217cfa377cc50dd8465d251731be05559b2142.jpg", "https://cdn.shibe.online/shibes/65f6047d8e1d247af353532db018b08a928fd62a.jpg", "https://cdn.shibe.online/shibes/fcead395cbf330b02978f9463ac125074ac87ab4.jpg", "https://cdn.shibe.online/shibes/79451dc808a3a73f99c339f485c2bde833380af0.jpg", "https://cdn.shibe.online/shibes/bedf90869797983017f764165a5d97a630b7054b.jpg", "https://cdn.shibe.online/shibes/dd20e5801badd797513729a3645c502ae4629247.jpg", "https://cdn.shibe.online/shibes/88361ee50b544cb1623cb259bcf07b9850183e65.jpg", "https://cdn.shibe.online/shibes/0ebcfd98e8aa61c048968cb37f66a2b5d9d54d4b.jpg"]
                    let kya = list[Math.floor(Math.random() * list.length)]
                    client.sendFileFromUrl(from, kya, 'Dog.jpeg', 'Inu')
                    break
                case '!neko':
                    q2 = Math.floor(Math.random() * 900) + 300;
                    q3 = Math.floor(Math.random() * 900) + 300;
                    client.sendFileFromUrl(from, 'http://placekitten.com/' + q3 + '/' + q2, 'neko.png', 'Neko ')
                    break
                    /*case '!sendto':
                        client.sendFile(from, './msgHndlr.js', 'msgHndlr.js')
                        break*/
                case '!quote':
                case '!quotes':
                    const quotes = await get.get('https://irwanx-api.herokuapp.com/api/randomquote?apikey=&apiKey=${apiKey}').json()
                    client.reply(from, `➸ *Quotes* : ${quotes.quotes}\n➸ *Author* : ${quotes.author}`, id)
                    break
                case '!quotesnime':
                    const skya = await get.get('https://mhankbarbar.tech/api/quotesnime/random').json()
                    skya_ = skya.data
                    client.reply(from, `➸ *Quotes* : ${skya_.quote}\n➸ *Character* : ${skya_.character}\n➸ *Anime* : ${skya_.anime}`, id)
                    break
                case '!inu':
                    const list = ["https://cdn.shibe.online/shibes/247d0ac978c9de9d9b66d72dbdc65f2dac64781d.jpg", "https://cdn.shibe.online/shibes/1cf322acb7d74308995b04ea5eae7b520e0eae76.jpg", "https://cdn.shibe.online/shibes/1ce955c3e49ae437dab68c09cf45297d68773adf.jpg", "https://cdn.shibe.online/shibes/ec02bee661a797518d37098ab9ad0c02da0b05c3.jpg", "https://cdn.shibe.online/shibes/1e6102253b51fbc116b887e3d3cde7b5c5083542.jpg", "https://cdn.shibe.online/shibes/f0c07a7205d95577861eee382b4c8899ac620351.jpg", "https://cdn.shibe.online/shibes/3eaf3b7427e2d375f09fc883f94fa8a6d4178a0a.jpg", "https://cdn.shibe.online/shibes/c8b9fcfde23aee8d179c4c6f34d34fa41dfaffbf.jpg", "https://cdn.shibe.online/shibes/55f298bc16017ed0aeae952031f0972b31c959cb.jpg", "https://cdn.shibe.online/shibes/2d5dfe2b0170d5de6c8bc8a24b8ad72449fbf6f6.jpg", "https://cdn.shibe.online/shibes/e9437de45e7cddd7d6c13299255e06f0f1d40918.jpg", "https://cdn.shibe.online/shibes/6c32141a0d5d089971d99e51fd74207ff10751e7.jpg", "https://cdn.shibe.online/shibes/028056c9f23ff40bc749a95cc7da7a4bb734e908.jpg", "https://cdn.shibe.online/shibes/4fb0c8b74dbc7653e75ec1da597f0e7ac95fe788.jpg", "https://cdn.shibe.online/shibes/125563d2ab4e520aaf27214483e765db9147dcb3.jpg", "https://cdn.shibe.online/shibes/ea5258fad62cebe1fedcd8ec95776d6a9447698c.jpg", "https://cdn.shibe.online/shibes/5ef2c83c2917e2f944910cb4a9a9b441d135f875.jpg", "https://cdn.shibe.online/shibes/6d124364f02944300ae4f927b181733390edf64e.jpg", "https://cdn.shibe.online/shibes/92213f0c406787acd4be252edb5e27c7e4f7a430.jpg", "https://cdn.shibe.online/shibes/40fda0fd3d329be0d92dd7e436faa80db13c5017.jpg", "https://cdn.shibe.online/shibes/e5c085fc427528fee7d4c3935ff4cd79af834a82.jpg", "https://cdn.shibe.online/shibes/f83fa32c0da893163321b5cccab024172ddbade1.jpg", "https://cdn.shibe.online/shibes/4aa2459b7f411919bf8df1991fa114e47b802957.jpg", "https://cdn.shibe.online/shibes/2ef54e174f13e6aa21bb8be3c7aec2fdac6a442f.jpg", "https://cdn.shibe.online/shibes/fa97547e670f23440608f333f8ec382a75ba5d94.jpg", "https://cdn.shibe.online/shibes/fb1b7150ed8eb4ffa3b0e61ba47546dd6ee7d0dc.jpg", "https://cdn.shibe.online/shibes/abf9fb41d914140a75d8bf8e05e4049e0a966c68.jpg", "https://cdn.shibe.online/shibes/f63e3abe54c71cc0d0c567ebe8bce198589ae145.jpg", "https://cdn.shibe.online/shibes/4c27b7b2395a5d051b00691cc4195ef286abf9e1.jpg", "https://cdn.shibe.online/shibes/00df02e302eac0676bb03f41f4adf2b32418bac8.jpg", "https://cdn.shibe.online/shibes/4deaac9baec39e8a93889a84257338ebb89eca50.jpg", "https://cdn.shibe.online/shibes/199f8513d34901b0b20a33758e6ee2d768634ebb.jpg", "https://cdn.shibe.online/shibes/f3efbf7a77e5797a72997869e8e2eaa9efcdceb5.jpg", "https://cdn.shibe.online/shibes/39a20ccc9cdc17ea27f08643b019734453016e68.jpg", "https://cdn.shibe.online/shibes/e67dea458b62cf3daa4b1e2b53a25405760af478.jpg", "https://cdn.shibe.online/shibes/0a892f6554c18c8bcdab4ef7adec1387c76c6812.jpg", "https://cdn.shibe.online/shibes/1b479987674c9b503f32e96e3a6aeca350a07ade.jpg", "https://cdn.shibe.online/shibes/0c80fc00d82e09d593669d7cce9e273024ba7db9.jpg", "https://cdn.shibe.online/shibes/bbc066183e87457b3143f71121fc9eebc40bf054.jpg", "https://cdn.shibe.online/shibes/0932bf77f115057c7308ef70c3de1de7f8e7c646.jpg", "https://cdn.shibe.online/shibes/9c87e6bb0f3dc938ce4c453eee176f24636440e0.jpg", "https://cdn.shibe.online/shibes/0af1bcb0b13edf5e9b773e34e54dfceec8fa5849.jpg", "https://cdn.shibe.online/shibes/32cf3f6eac4673d2e00f7360753c3f48ed53c650.jpg", "https://cdn.shibe.online/shibes/af94d8eeb0f06a0fa06f090f404e3bbe86967949.jpg", "https://cdn.shibe.online/shibes/4b55e826553b173c04c6f17aca8b0d2042d309fb.jpg", "https://cdn.shibe.online/shibes/a0e53593393b6c724956f9abe0abb112f7506b7b.jpg", "https://cdn.shibe.online/shibes/7eba25846f69b01ec04de1cae9fed4b45c203e87.jpg", "https://cdn.shibe.online/shibes/fec6620d74bcb17b210e2cedca72547a332030d0.jpg", "https://cdn.shibe.online/shibes/26cf6be03456a2609963d8fcf52cc3746fcb222c.jpg", "https://cdn.shibe.online/shibes/c41b5da03ad74b08b7919afc6caf2dd345b3e591.jpg", "https://cdn.shibe.online/shibes/7a9997f817ccdabac11d1f51fac563242658d654.jpg", "https://cdn.shibe.online/shibes/7221241bad7da783c3c4d84cfedbeb21b9e4deea.jpg", "https://cdn.shibe.online/shibes/283829584e6425421059c57d001c91b9dc86f33b.jpg", "https://cdn.shibe.online/shibes/5145c9d3c3603c9e626585cce8cffdfcac081b31.jpg", "https://cdn.shibe.online/shibes/b359c891e39994af83cf45738b28e499cb8ffe74.jpg", "https://cdn.shibe.online/shibes/0b77f74a5d9afaa4b5094b28a6f3ee60efcb3874.jpg", "https://cdn.shibe.online/shibes/adccfdf7d4d3332186c62ed8eb254a49b889c6f9.jpg", "https://cdn.shibe.online/shibes/3aac69180f777512d5dabd33b09f531b7a845331.jpg", "https://cdn.shibe.online/shibes/1d25e4f592db83039585fa480676687861498db8.jpg", "https://cdn.shibe.online/shibes/d8349a2436420cf5a89a0010e91bf8dfbdd9d1cc.jpg", "https://cdn.shibe.online/shibes/eb465ef1906dccd215e7a243b146c19e1af66c67.jpg", "https://cdn.shibe.online/shibes/3d14e3c32863195869e7a8ba22229f457780008b.jpg", "https://cdn.shibe.online/shibes/79cedc1a08302056f9819f39dcdf8eb4209551a3.jpg", "https://cdn.shibe.online/shibes/4440aa827f88c04baa9c946f72fc688a34173581.jpg", "https://cdn.shibe.online/shibes/94ea4a2d4b9cb852e9c1ff599f6a4acfa41a0c55.jpg", "https://cdn.shibe.online/shibes/f4478196e441aef0ada61bbebe96ac9a573b2e5d.jpg", "https://cdn.shibe.online/shibes/96d4db7c073526a35c626fc7518800586fd4ce67.jpg", "https://cdn.shibe.online/shibes/196f3ed10ee98557328c7b5db98ac4a539224927.jpg", "https://cdn.shibe.online/shibes/d12b07349029ca015d555849bcbd564d8b69fdbf.jpg", "https://cdn.shibe.online/shibes/80fba84353000476400a9849da045611a590c79f.jpg", "https://cdn.shibe.online/shibes/94cb90933e179375608c5c58b3d8658ef136ad3c.jpg", "https://cdn.shibe.online/shibes/8447e67b5d622ef0593485316b0c87940a0ef435.jpg", "https://cdn.shibe.online/shibes/c39a1d83ad44d2427fc8090298c1062d1d849f7e.jpg", "https://cdn.shibe.online/shibes/6f38b9b5b8dbf187f6e3313d6e7583ec3b942472.jpg", "https://cdn.shibe.online/shibes/81a2cbb9a91c6b1d55dcc702cd3f9cfd9a111cae.jpg", "https://cdn.shibe.online/shibes/f1f6ed56c814bd939645138b8e195ff392dfd799.jpg", "https://cdn.shibe.online/shibes/204a4c43cfad1cdc1b76cccb4b9a6dcb4a5246d8.jpg", "https://cdn.shibe.online/shibes/9f34919b6154a88afc7d001c9d5f79b2e465806f.jpg", "https://cdn.shibe.online/shibes/6f556a64a4885186331747c432c4ef4820620d14.jpg", "https://cdn.shibe.online/shibes/bbd18ae7aaf976f745bc3dff46b49641313c26a9.jpg", "https://cdn.shibe.online/shibes/6a2b286a28183267fca2200d7c677eba73b1217d.jpg", "https://cdn.shibe.online/shibes/06767701966ed64fa7eff2d8d9e018e9f10487ee.jpg", "https://cdn.shibe.online/shibes/7aafa4880b15b8f75d916b31485458b4a8d96815.jpg", "https://cdn.shibe.online/shibes/b501169755bcf5c1eca874ab116a2802b6e51a2e.jpg", "https://cdn.shibe.online/shibes/a8989bad101f35cf94213f17968c33c3031c16fc.jpg", "https://cdn.shibe.online/shibes/f5d78feb3baa0835056f15ff9ced8e3c32bb07e8.jpg", "https://cdn.shibe.online/shibes/75db0c76e86fbcf81d3946104c619a7950e62783.jpg", "https://cdn.shibe.online/shibes/8ac387d1b252595bbd0723a1995f17405386b794.jpg", "https://cdn.shibe.online/shibes/4379491ef4662faa178f791cc592b52653fb24b3.jpg", "https://cdn.shibe.online/shibes/4caeee5f80add8c3db9990663a356e4eec12fc0a.jpg", "https://cdn.shibe.online/shibes/99ef30ea8bb6064129da36e5673649e957cc76c0.jpg", "https://cdn.shibe.online/shibes/aeac6a5b0a07a00fba0ba953af27734d2361fc10.jpg", "https://cdn.shibe.online/shibes/9a217cfa377cc50dd8465d251731be05559b2142.jpg", "https://cdn.shibe.online/shibes/65f6047d8e1d247af353532db018b08a928fd62a.jpg", "https://cdn.shibe.online/shibes/fcead395cbf330b02978f9463ac125074ac87ab4.jpg", "https://cdn.shibe.online/shibes/79451dc808a3a73f99c339f485c2bde833380af0.jpg", "https://cdn.shibe.online/shibes/bedf90869797983017f764165a5d97a630b7054b.jpg", "https://cdn.shibe.online/shibes/dd20e5801badd797513729a3645c502ae4629247.jpg", "https://cdn.shibe.online/shibes/88361ee50b544cb1623cb259bcf07b9850183e65.jpg", "https://cdn.shibe.online/shibes/0ebcfd98e8aa61c048968cb37f66a2b5d9d54d4b.jpg"]
                    let kya = list[Math.floor(Math.random() * list.length)]
                    client.sendFileFromUrl(from, kya, 'Dog.jpeg', 'Inu')
                    break
                case '!cogan':
                    const list2 = ["https://i.pinimg.com/736x/20/9a/0e/209a0e5d345a93804e673e4e8b336b53.jpg", "https://i.pinimg.com/originals/32/46/8e/32468ec359145c4c7018782f23b1cfd6.jpg", "https://i.pinimg.com/564x/62/85/7f/62857f9a105204f08290c6e19a0e4f1d.jpg", "https://i.pinimg.com/originals/e4/68/7b/e4687ba6e500310684a546a88a0c431a.jpg", "https://i.pinimg.com/736x/00/47/ae/0047ae914f3fc4259b943d9828a9ed02.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWeKJ1_1yAp_IOxCd0QyFCufTcb3Kw6-RILA&usqp=CAU", "https://jauhdarimodern.files.wordpress.com/2016/02/2016-02-10-07-43-14-1-jpg.jpeg", "https://cdns.klimg.com/kapanlagi.com/g/8/_/8_foto_anak_farhat_abbas_yang_mungkin_tak_kamu_ketahui_ganteng/p/gusti_rayhan-20190701-001-non_fotografer_kly.jpg", "https://pbs.twimg.com/profile_images/1043848205744689152/4b2r9U9_.jpg", "https://i.pinimg.com/736x/09/be/bb/09bebb0f1f45192f45e087312b9bac0d.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdS-m0mLgv667mU3PqYtRpz5SowZVhdcupUQ&usqp=CAU", "https://i.pinimg.com/736x/20/9a/0e/209a0e5d345a93804e673e4e8b336b53.jpg", "https://i.pinimg.com/originals/32/46/8e/32468ec359145c4c7018782f23b1cfd6.jpg", "https://i.pinimg.com/736x/bc/46/1e/bc461ef3a9ae082206eebde9b384ddee.jpg", "https://i.pinimg.com/originals/79/5d/b0/795db039308dd2b98e8cb2d1a2da8bcd.jpg", "https://img.wattpad.com/36cb1bfb6cbefc9643996e3879f3ae4b8e25c1d5/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f6d476468633470616e6c556c4d673d3d2d3933373032373832332e3136326263303062396436366139323831313431393838313339332e6a7067?s=fit&w=720&h=720"]
                    let kya2 = list2[Math.floor(Math.random() * list2.length)]
                    client.sendFileFromUrl(from, kya2, 'cogan.jpeg', 'I Love Cogan Lokal')
                    break
                case '!url2img':
                    const _query = body.slice(9)
                    if (!_query.match(isUrl)) return client.reply(from, mess.error.Iv, id)
                    if (args.length === 1) return client.reply(from, 'Kirim perintah *!url2img [web]*\nContoh *!url2img https://google.com*', id)
                    if (url2img.error) return client.reply(from, url2img.error, id)
                    client.sendFileFromUrl(from, `https://rasi-tech-api.000webhostapp.com/ss.php?apikey=rasitech&url=${_query}`, 'kyaa.jpg', null, id)
                    break
                case '!code':
                    if (!isDf) return client.reply(from, 'Anda belum daftar! silahkan daftar dengan ketik !daftar di chat robot.', id)
                    if (args.length === 1) return client.reply(from, 'Kirim perintah *!code <h1>Rasi Tech<h1>', id)
                    get.get(`https://rt-files.000webhostapp.com/app/code/index.php?id=${from}&apikey=${RasiApi}&code=${body.slice(6)}`).json()
                    client.sendText(from, 'Code sudah tersave. Ketik !see untuk melihat hasil codingan. ', id)
                    break
                case '!see':
                    client.sendFileFromUrl(from, `https://api.apiflash.com/v1/urltoimage?access_key=a19bf9a08869406da6419566514c4e42&url=https://rt-files.000webhostapp.com/app/code/${from}.html&full_page=true`, 'see.jpg', `Created By Rasi Tech`, id)
                    break
                case '!meme':
                    const response = await axios.get('https://irwanx-api.herokuapp.com/api/random/meme?apikey=&apiKey=${apiKey}');
                    const {
                        postlink, title, subreddit, url, nsfw, spoiler
                    } = response.data
                    client.sendFileFromUrl(from, `${url}`, 'meme.jpg', `${title}`)
                    break
                case '!help':
                    client.sendText(from, help)
                    break
                case '!readme':
                    client.reply(from, readme, id)
                    break
                case '!info':
                    client.sendLinkWithAutoPreview(from, 'https://webprogrammingxyans.github.io', info)
                    break
                case '!snk':
                    client.reply(from, snk, id)
                    break
                case '!glitch':
                case '!qts':
                    const qts = await get.get(`https://api.terhambar.com/qts/`).json()
                    client.reply(from, qts.quotes, id)
                    break
                case '!twist':
                    const twist = await get.get(`https://api.i-tech.id/tools/twist?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&negara=id`).json()
                    client.reply(from, twist.quotes, id)
                    break
                case '!fact':
                    const fact = await get.get(`https://api.i-tech.id/tools/fakta?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG`).json()
                    client.reply(from, fact.result, id)
                    break
                case '!pantunpakboi':
                    const pantunpakboi = await get.get(`https://api.i-tech.id/tools/pantun?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG`).json()
                    client.reply(from, pantunpakboi.result, id)
                    break
                case '!kambing':
                    const kambing = await get.get(`https://api.i-tech.id/tools/twist?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&negara=id`).json()
                    client.sendFileFromUrl(from, kambing.result, `kambing.jpg`, `Nih Kambing!`, id)
                    break
                case '!terjemah':
                    var bahsa = body.slice(10, 12)
                    if (args.length === 1) return client.reply(from, 'Kirim perintah *!terjemah [en\bahasa] [Text]*', id)
                    const terjemah = await get.get(`https://api.i-tech.id/tools/translate?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&lang=${bahsa}&teks=${body.slice(13)}`).json()
                    client.reply(from, terjemah.result, id)
                    break
                case '!oranghilang':
                    const oranghilang = await get.get(`https://api.i-tech.id/tools/picmis?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&text1=Orang Hilang&text2=${args[3]}&text3=Segera hubungi nomor berikut ${args[2]}&pic=${args[1]}`).json()
                    client.sendFileFromUrl(from, oranghilang.result, `ilang.jpg`, `dicari orang hilang!`, id)
                    break
                case '!total':
                    if (!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    if (!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
                    const allgroup1 = await client.getAllGroups()
                    const allchat1 = await client.getAllChats()
                    const allnew1 = await client.getAllNewMessages()
                    const allun1 = await client.getAllUnreadMessages()
                    const alllod1 = await client.getAmountOfLoadedMessages()
                    const alllast1 = await client.getMyLastMessage()
                    const allcwm1 = await client.getAllChatsWithMessages()
                    const allMem1 = await client.getGroupMembers(groupId)
                    const loadedMsg = await client.getAmountOfLoadedMessages()
                    const chatIds = await client.getAllChatIds()
                    const groups = await client.getAllGroups()
                    client.sendText(from, `Status :\n- *${loadedMsg}* Loaded Messages\n- *${groups.length}* Group Chats\n- *${chatIds.length - groups.length}* Personal Chats\n- *${chatIds.length}* Total Chats`)
                    //   client.reply(from, `Total Member : ${allMem1.length}\nTotal Group : ${allgroup1.length}\nTotal Chat : ${allchat1.length}\nTotal Pesan Baru : ${allnew1}\nTotal Pesan Belum Terbaca : ${allun1.length}\nTotal Pesan : ${alllod1.length}\nPesan Terakhir : ${alllast1}\nTotal Semua Pesan : ${allcwm1.length}`, id)
                    break
                case '!resep':
                    if (args.length == 1) return client.reply(from, `Untuk mencari resep makanan\nCaranya ketik: !resep [search]\n\ncontoh: !resep tahu`, id)
                    axios.get('https://masak-apa.tomorisakura.vercel.app/api/search/?q=' + menu)
                        .then(async (res) => {
                            const {
                                results
                            } = await res.data
                            const random = Math.floor(Math.random() * 16)
                            axios.get('https://masak-apa.tomorisakura.vercel.app/api/recipe/' + results[random].key)
                                .then(async (result) => {
                                    const {
                                        results
                                    } = await result.data
                                    const bahannya = await `${results.ingredient}`
                                    const bahan = bahannya.replace(/,/g, '\n')
                                    const tutornya = await `${results.step}`
                                    const tutornih = tutornya.replace(/,/g, '\n')
                                    const tutor = tutornih.replace(/.,/g, '\n')
                                    const hasil = `*Judul:* ${results.title}\n*Penulis:* ${results.author.user}\n*Rilis:* ${results.author.datePublished}\n*Level:* ${results.dificulty}\n*Waktu:* ${results.times}\n*Porsi:* ${results.servings}\n\n*Bahan-bahan:*\n${bahan}\n\n*Step-by-step:*\n${tutor}`
                                    resolve(hasil)
                                    client.sendText(from, hasil)
                                })
                        })
                        .catch((err) => {
                            console.log(err)
                            get.get(`https://api.telegram.org/bot${BotApi}/sendMessage?chat_id=${Tchannel}&text=Dari : ${from}%0A${err}`).json()
                            reject(err)
                        })
                    break
                case '!infosurah':
                    if (args.length == 1) return client.reply(from, `*_!infosurah <nama surah>_*\nMenampilkan informasi lengkap mengenai surah tertentu. Contoh penggunan: !infosurah al-baqarah`, id)
                    var responseh = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                    var {
                        data
                    } = responseh.data
                    var idx = data.findIndex(function(post, index) {
                        if ((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
                            return true;
                    });
                    var pesan = ""
                    pesan = pesan + "Nama : " + data[idx].name.transliteration.id + "\n" + "Asma : " + data[idx].name.short + "\n" + "Arti : " + data[idx].name.translation.id + "\n" + "Jumlah ayat : " + data[idx].numberOfVerses + "\n" + "Nomor surah : " + data[idx].number + "\n" + "Jenis : " + data[idx].revelation.id + "\n" + "Keterangan : " + data[idx].tafsir.id
                    client.reply(from, pesan, message.id)
                    break
                case '!surah':
                    if (args.length == 1) return client.reply(from, `*_!surah <nama surah> <ayat>_*\nMenampilkan ayat Al-Quran tertentu beserta terjemahannya dalam bahasa Indonesia. Contoh penggunaan : !surah al-baqarah 1\n\n*_!surah <nama surah> <ayat> en/id_*\nMenampilkan ayat Al-Quran tertentu beserta terjemahannya dalam bahasa Inggris / Indonesia. Contoh penggunaan : !surah al-baqarah 1 id`, id)
                    var responseh = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                    var {
                        data
                    } = responseh.data
                    var idx = data.findIndex(function(post, index) {
                        if ((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
                            return true;
                    });
                    nmr = data[idx].number
                    if (!isNaN(nmr)) {
                        var responseh2 = await axios.get('https://api.quran.sutanlab.id/surah/' + nmr + "/" + args[1])
                        var {
                            data
                        } = responseh2.data
                        var last = function last(array, n) {
                            if (array == null) return void 0;
                            if (n == null) return array[array.length - 1];
                            return array.slice(Math.max(array.length - n, 0));
                        };
                        bhs = last(args)
                        pesan = ""
                        pesan = pesan + data.text.arab + "\n\n"
                        if (bhs == "en") {
                            pesan = pesan + data.translation.en
                        } else {
                            pesan = pesan + data.translation.id
                        }
                        pesan = pesan + "\n\n(Q.S. " + data.surah.name.transliteration.id + ":" + args[1] + ")"
                        client.reply(from, pesan, message.id)
                    }
                    break
                case '!tafsir':
                    if (args.length == 1) return client.reply(from, `*_!tafsir <nama surah> <ayat>_*\nMenampilkan ayat Al-Quran tertentu beserta terjemahan dan tafsirnya dalam bahasa Indonesia. Contoh penggunaan : !tafsir al-baqarah 1`, message.id)
                    var responsh = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                    var {
                        data
                    } = responsh.data
                    var idx = data.findIndex(function(post, index) {
                        if ((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
                            return true;
                    });
                    nmr = data[idx].number
                    if (!isNaN(nmr)) {
                        var responsih = await axios.get('https://api.quran.sutanlab.id/surah/' + nmr + "/" + args[1])
                        var {
                            data
                        } = responsih.data
                        pesan = ""
                        pesan = pesan + "Tafsir Q.S. " + data.surah.name.transliteration.id + ":" + args[1] + "\n\n"
                        pesan = pesan + data.text.arab + "\n\n"
                        pesan = pesan + "_" + data.translation.id + "_" + "\n\n" + data.tafsir.id.long
                        client.reply(from, pesan, message.id)
                    }
                    break
                case '!blank':
                    client.reply(from, ``, id)
                    client.sendText(from, ``, )
                    break
                case '!katagaul':
                    const katagaul = await get.get(`https://docs-jojo.herokuapp.com/api/kitabgaultoday`).json()
                    client.reply(from, `Kata : ${katagaul.kata}\nDefinisi : ${katagaul.definisi}\nContoh : ${katagaul.contoh}`, id)
                    break
                case '!corona':
                    const corona = await get.get(`https://docs-jojo.herokuapp.com/api/corona`).json()
                    client.reply(from, `TotalCases : ${corona.totalCases}\nNewCases : ${corona.newCases}\nTotalDeaths : ${corona.totalDeaths}\nNewDeaths : ${corona.newDeaths}\nRecovered : ${corona.recovered}\nActiveCases : ${corona.activeCases}\nCritical : ${corona.critical}`, id)
                    break
                case '!harinasional':
                    if (args.length === 1) return client.reply(from, 'Kirim perintah *!harinasional [Tanggal]*', id)
                    const harinasional = await get.get(`https://docs-jojo.herokuapp.com/api/harinasional?tanggal=${body.slice(14)}`).json()
                    client.reply(from, `Tanggal : ${harinasional.tanggal}\nKeterangan : ${harinasional.keterangan}`, id)
                    break
                case '!randomtongue':
                    const tongue = await get.get(`https://docs-jojo.herokuapp.com/api/randomtonguetwister/id`).json()
                    client.reply(from, tongue.text, id)
                    break
                case '!alaudio':
                    if (args.length == 1) return client.reply(from, `*_!ALaudio <nama surah>_*\nMenampilkan tautan dari audio surah tertentu. Contoh penggunaan : !ALaudio al-fatihah\n\n*_!ALaudio <nama surah> <ayat>_*\nMengirim audio surah dan ayat tertentu beserta terjemahannya dalam bahasa Indonesia. Contoh penggunaan : !ALaudio al-fatihah 1\n\n*_!ALaudio <nama surah> <ayat> en_*\nMengirim audio surah dan ayat tertentu beserta terjemahannya dalam bahasa Inggris. Contoh penggunaan : !ALaudio al-fatihah 1 en`, message.id)
                    ayat = "ayat"
                    bhs = ""
                    var responseh = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                    var surah = responseh.data
                    var idx = surah.data.findIndex(function(post, index) {
                        if ((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
                            return true;
                    });
                    nmr = surah.data[idx].number
                    if (!isNaN(nmr)) {
                        if (args.length > 2) {
                            ayat = args[1]
                        }
                        if (args.length == 2) {
                            var last = function last(array, n) {
                                if (array == null) return void 0;
                                if (n == null) return array[array.length - 1];
                                return array.slice(Math.max(array.length - n, 0));
                            };
                            ayat = last(args)
                        }
                        pesan = ""
                        if (isNaN(ayat)) {
                            var responsih2 = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah/' + nmr + '.json')
                            var {
                                names,
                                name_translations,
                                number_of_ayah,
                                number_of_surah,
                                recitations
                            } = responsih2.data
                            pesan = pesan + "Audio Quran Surah ke-" + number_of_surah + " " + name + " (" + name_translations.ar + ") " + "dengan jumlah " + number_of_ayah + " ayat\n"
                            pesan = pesan + "Dilantunkan oleh " + recitations[0].names + " : " + recitations[0].audio_url + "\n"
                            pesan = pesan + "Dilantunkan oleh " + recitations[1].names + " : " + recitations[1].audio_url + "\n"
                            pesan = pesan + "Dilantunkan oleh " + recitations[2].names + " : " + recitations[2].audio_url + "\n"
                            client.reply(from, pesan, message.id)
                        } else {
                            var responsih2 = await axios.get('https://api.quran.sutanlab.id/surah/' + nmr + "/" + ayat)
                            var {
                                data
                            } = responsih2.data
                            var last = function last(array, n) {
                                if (array == null) return void 0;
                                if (n == null) return array[array.length - 1];
                                return array.slice(Math.max(array.length - n, 0));
                            };
                            bhs = last(args)
                            pesan = ""
                            pesan = pesan + data.text.arab + "\n\n"
                            if (bhs == "en") {
                                pesan = pesan + data.translation.en
                            } else {
                                pesan = pesan + data.translation.id
                            }
                            pesan = pesan + "\n\n(Q.S. " + data.surah.names.transliteration.id + ":" + args[1] + ")"
                            await client.sendFileFromUrl(from, data.audio.secondary[0])
                            await client.reply(from, pesan, message.id)
                        }
                    }
                    break
                case 'ping':
                case 'p':
                    await client.sendText(from, `Pong!\nSpeed: ${processTime(t, moment())} s`)
                    break
                case '!urltrack':

                    if (!args[1].match(isUrl)) return client.reply(from, mess.error.Iv, id)
                    fetch('http://ki.tc/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                "url": args[1]
                            })
                        })
                        .then(respon => respon.json())
                        .then(resolt => {

                        })
                        .catch(() => {
                            client.reply(from, 'Error !', id)
                        })
                    break
                case '!quotemaker':

                    arg = body.trim().split('|')
                    if (arg.length >= 4) {
                        client.reply(from, mess.wait, id)
                        const quotes = encodeURIComponent(arg[1])
                        const author = encodeURIComponent(arg[2])
                        const theme = encodeURIComponent(arg[3])
                        await quotemaker(quotes, author, theme).then(amsu => {
                            client.sendFile(from, amsu, 'quotesmaker.jpg","neh...').catch(() => {
                                client.reply(from, mess.error.Qm, id)
                            })
                        })
                    } else {
                        client.reply(from, 'Usage: \n!quotemaker |teks|watermark|theme\n\nEx :\n!quotemaker |ini contoh|bicit|random', id)
                    }
                    break
                case '!sms':

                    arg = body.trim().split('|')
                    if (arg.length >= 3) {
                        client.reply(from, mess.wait, id)
                        const pesan = encodeURIComponent(arg[1])
                        const nomor = encodeURIComponent(arg[2])
                        if (!isPr) return client.reply(from, 'Perintah ini Khusus Member Premium', id)
                        const smsa = await get.get(`https://api.i-tech.id/special/sms?key=3b8JTm-WeSnVm-ynZYWt-mnMT1e-n888YG&no=${nomor}&msg=${pesan}`).json()

                        client.reply(from, `To : ${smsa.to}\nPesan : ${smsa.msg}\nStatus : ${smsa.status}`, id).catch(() => {
                            client.reply(from, mess.error.Qm, id)
                        })

                    } else {
                        client.reply(from, 'Masukan Seperti ini !sms |pesan|nomor\n\n*!sms |irwan ganteng|08882611841*', id)
                    }
                    break
                case '!list':

                    const chatzz = await client.getAllChatIds()
                    if (!isOwner) return client.reply(from, 'Perintah ini hanya untuk Owner bot!', id)
                    let listp = `Ini List Pengguna bot \nTotal : ${chatzz.length}\n`
                    for (let i of chatzz) {
                        listp += `➸ @${i.replace(/@c.us/g,'')}\n`
                        if (!isGroupMsg) fs.writeFile(`./akun/${i}.txt`, `${i.replace(/@c.us/g,'')}`)
                        if (isGroupMsg) fs.writeFile(`./akun/${i}.txt`, `${i.replace(/@g.us/g,'')}`)
                    }
                    client.sendTextWithMentions(from, listp, id)
                    break
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
        get.get(`https://api.telegram.org/bot${BotApi}/sendMessage?chat_id=${Tchannel}&text=Dari : ${from}%0A${err}`).json()
        client.reply(from, `Error, Mungkin Next Update Atau Lapor Ke Owner Dengan Cara Ketik !creator`, id)
        //client.kill().then(a => console.log(a))
    }
}
