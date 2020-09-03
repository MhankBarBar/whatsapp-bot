const { create, decryptMedia } = require('@open-wa/wa-automate')
const { NotificationLanguage } = require('@open-wa/wa-automate/dist/api/model')
const fs = require('fs-extra')
const axios = require('axios')
const moment = require('moment')
const get = require('got')
const color = require('./lib/color')
const { liriklagu, quotemaker } = require('./lib/functions')
const quotedd = require('./lib/quote')

const serverOption = {
    useChrome: true,
    //restartOnCrash: start,
    headless:false,
    throwErrorOnTosBlock:true,
    //qrTimeout:60,
    authTimeout:60,
    killProcessOnBrowserClose: true,
    autoRefresh:true, //default to true
    qrRefreshS:15, //please note that if this is too long then your qr code scan may end up being invalid. Generally qr codes expire every 15 seconds.
    safeMode: true,
    hostNotificationLang: NotificationLanguage.IDID
}

const opsys = process.platform
if (opsys === 'win32' || opsys === 'win64') {
    serverOption.executablePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
} else if (opsys === 'linux') {
    serverOption.browserRevision = '737027'
} else if (opsys === 'darwin') {
    serverOption.executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
}

const startServer = async () => {
    create('Imperial', serverOption)
        .then((client) => {
            console.log('[SERVER] Server Started!')
            // Force it to keep the current session
            client.onStateChanged((state) => {
                console.log('[Client State]', state)
                if (state === 'CONFLICT') client.forceRefocus()
            })
            // listening on message
            client.onMessage((message) => {
                msgHandler(client, message)
            })

            client.onAddedToGroup((chat) => {
            	let totalMem = chat.groupMetadata.participants.length
            	if (totalMem < 30) { 
            		client.sendText(chat.id, `Cih member nya cuma ${totalMem}, Kalo mau invite bot, minimal jumlah mem ada 31`)
            		client.leaveGroup(chat.id)
            		client.deleteChat(chat.id)
            	} else {
                	client.sendText(chat.groupMetadata.id, `Halo warga grup *${chat.contact.name}* terimakasih sudah menginvite bot ini, untuk melihat menu silahkan kirim *!help*`)
                }
            })
            // listening on Incoming Call
            client.onIncomingCall((call) => {
                client.sendText(call.peerJid, 'Maaf, saya tidak bisa menerima panggilan. nelfon = block!')
                client.contactBlock(call.peerJid)
                client.deleteChat(call.peerJid)
            })
        })
        .catch((err) => {
            console.error(err)
        })
}

async function msgHandler (client, message) {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, mentionedJidList } = message
        let { body } = message
        const { name } = chat
        let { pushname, verifiedName } = sender
        const prefix = '!'
        body = (type === 'chat' && body.startsWith(prefix)) ? body : ((type === 'image' && caption) && caption.startsWith(prefix)) ? caption : ''
        const command = body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase()
        const args = body.slice(prefix.length).trim().split(/ +/).slice(1)
        const isCmd = body.startsWith(prefix)
        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        if (!isCmd && !isGroupMsg) return console.log('[RECV]', color(time, 'yellow'), 'Message from', color(pushname))
        if (!isCmd && isGroupMsg) return console.log('[RECV]', color(time, 'yellow'), 'Message from', color(pushname), 'in', color(name))
        if (isCmd && !isGroupMsg) console.log(color('[EXEC]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && isGroupMsg) console.log(color('[EXEC]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name))
        const botNumber = await client.getHostNumber()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)
        switch (command) {
            case 'sticker':
            case 'stiker':
                if (isMedia) {
                    const mediaData = await decryptMedia(message)
                    const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                    await client.sendImageAsSticker(from, imageBase64, message)
                } else if (quotedMsg && quotedMsg.type == 'image') {
                    const mediaData = await decryptMedia(quotedMsg)
                    const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                    await client.sendImageAsSticker(from, imageBase64, message)
                } else if (args.length >= 1) {
                    const url = args[1]
                    if (url.match(isUrl)) {
                        await client.sendStickerfromUrl(from, url, { method: 'get' })
                            .catch(err => console.log('Caught exception: ', err))
                    } else {
                        client.sendText(from, 'Url is invalid')
                    }
                } else {
                    if(isGroupMsg) {
                        client.sendTextWithMentions(from, `Dasar @${message.author} bodoh!, yang mau dijadiin stiker apa? lu cuma send teks *!stiker*. kalo mau bikin stiker send foto dengan caption *!stiker*.`)
                    } else {
                        client.reply(from, 'Dasar bodoh!, yang mau di jadiin stiker apa? Lu cuma send teks *!stiker*. kalo mau bikin stiker send foto dengan caption *!stiker*', message)
                    }
                }
            break
        // kalian bebas edit apapun, tapi saya minta bagian ini jangan di edit:)
        case 'donasi':
        case 'donate':
            var teks = '59612068616c6f206f6d2c206d617520646f6e6174653f0a0a4b616c6f206d617520646f6e617465206e6968206c616e6773756e67206165206b653a0a4f564f203a203038353839323736363130320a50756c7361203a203038353839323736363130320a53617765726961203a2068747470733a2f2f736177657269612e636f2f646f6e6174652f6d68616e6b626172626172'
            client.sendLinkWithAutoPreview(from,'https://saweria.co/donate/mhankbarbar', Buffer.from(teks, 'hex').toString('utf-8'))
            break
        case 'stikGif':
            var orl = body.substring(body.indexOf(' '), body.length)
            if (args.length == 0) return client.reply(from, 'Untuk menggunakan Perintah ini, kirim perintah *!tod* https://media.giphy.com/blablabla/asw.gif', message.id)
            const reUrl = orl.match(new RegExp(/https?:\/\/media.giphy.com\/media/, 'gi'))
            if(!reUrl) return client.reply(from, 'Untuk saat ini stiker gif hanya bisa menggunakan link giphy saja', message.id)
            await client.sendGiphyAsSticker(from, args[1])
            break
        case 'tts':
        	if (args.length == 0) return client.reply(from, 'Kirim perintah *!tts* [id, en, jp, ar] <teks>, contoh *!tts* id halo semua')
        	const ttsId = require('node-gtts')('id')
                const ttsEn = require('node-gtts')('en')
	        const ttsJp = require('node-gtts')('ja')
                const ttsAr = require('node-gtts')('ar')
                const dataText = body.slice(8)
                var dataBhs = body.slice(5, 7)
	        if (dataBhs == 'id') {
                    ttsId.save('./tts/resId.mp3', dataText, function () {
                        client.sendPtt(from, './tts/resId.mp3', message.id)
                })
		} else if (dataBhs == 'en') {
                    ttsEn.save('./tts/resEn.mp3', dataText, function () {
                        client.sendPtt(from, './tts/resEn.mp3', message.id)
                })
		} else if (dataBhs == 'jp') {
                    ttsJp.save('./tts/resJp.mp3', dataText, function () {
                        client.sendPtt(from, './tts/resJp.mp3', message.id)
                })
		} else if (dataBhs == 'ar') {
                    ttsAr.save('./tts/resAr.mp3', dataText, function () {
                        client.sendPtt(from, './tts/resAr.mp3', message.id)
                })
		} else {
		    client.reply(from, 'Masukkan data bahasa : [id] untuk indonesia, [en] untuk inggris, [jp] untuk jepang, dan [ar] untuk arab', message.id)
            }
        break
        case 'wait':
            if (isMedia) {
                const fetch = require('node-fetch')
                const toBS4 = require('image-to-base64')
                const mediaData = await decryptMedia(message, uaOverride)
                fs.writeFileSync('./img/nimek.jpg', mediaData, 'base64')
                let res = ''
                toBS4('./img/nimek.jpg')
                .then((res) => {
                fetch('https://trace.moe/api/search', {
                    method: 'POST',
                    body: JSON.stringify({ image: res }),
                    headers: { "Content-Type": "application/json" }
                })
                .then(respon => respon.json())
                .then(resolt => {
                	if (resolt.docs.length == 0) {
                		client.reply(from, 'Maaf, saya tidak tau ini anime apa', message.id)
                	}
                    const { is_adult, title, title_chinese, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = resolt.docs[0]
                    teks = ''
                    if (similarity < 0.92) {
                    	teks = 'Saya memiliki keyakinan rendah dalam hal ini :\n'
                    }
                    teks += [title, title_chinese, title_romaji, title_english]
                    teks += '\n'
                    teks += `Eps : ${episode.toString()}\n`
                    teks += `Kesamaan : ${(similarity * 100).toFixed(1)}%\n`
                    var video = `https://trace.moe/preview.php?anilist_id=${anilist_id}&file=${encodeURIComponent(filename)}&t=${at}&token=${tokenthumb}`;
                    client.sendFileFromUrl(from, video, 'nimek.mp4', teks)
                    }) 
                })
            } else {
                client.sendFile(from, './img/tutod.jpg', 'Tutor.jpg', 'Neh contoh mhank!')
            }
            break
        case 'ytmp3':
            if (args.length >= 1){
                var param = body.substring(body.indexOf(' '), body.length)
                try {
                    client.reply(from, 'Tunggu sebentar yak...', message.id)
                    const resp = await get.get('https://yutmp3.herokuapp.com/?url='+ param).json()
                    console.log(resp)
                    if (!resp.file) {
                        client.reply(from, 'Videonya ga valid!', message.id)
                    } else {
                        client.reply(from, `Title : ${resp.title}`, message.id)
                        await client.sendFileFromUrl(from, `https://yutmp3.herokuapp.com${resp.file}`, `${resp.title}.mp3`)
                    }
                } catch {
                    client.reply(from, 'Terjadi kesalahan!', message.id)
                }
            }
            break
        case 'tiktod':
            if(args.length == 0) return client.reply(from, 'Maaf, link yang kamu kirim tidak valid', message.id)
            const arl = body.split(' ')[1]
            if (!arl.match(isUrl) && !arl.includes('tiktok.com')) return client.reply(from, 'Maaf, link yang kamu kirim tidak valid', message.id)
            await client.sendText(from, '*Scraping Metadata...*')
            await tiktod(arl)
                .then((videoMeta) => {
                    const filename = videoMeta.authorMeta.name + '.mp4'
                    const caps = `*Metadata:*\nUsername: ${videoMeta.authorMeta.name} \nMusic: ${videoMeta.musicMeta.musicName} \nView: ${videoMeta.playCount.toLocaleString()} \nLike: ${videoMeta.diggCount.toLocaleString()} \nComment: ${videoMeta.commentCount.toLocaleString()} \nShare: ${videoMeta.shareCount.toLocaleString()} \nCaption: ${videoMeta.text.trim() ? videoMeta.text : '-'}.`
                    client.sendFileFromUrl(from, videoMeta.url, filename, videoMeta.NoWaterMark ? caps : `⚠ Video tanpa watermark tidak tersedia. \n\n${caps}`, '', { headers: { 'User-Agent': 'okhttp/4.5.0' } })
                        .catch(err => console.log('Caught exception: ', err))
                }).catch(() => {
                    client.reply(from, 'Gagal mengambil metadata, link yang kamu kirim tidak valid', message.id)
                })
            break
        case 'ig':
            if (args.length >= 1) {
                var param = body.substring(body.indexOf(' '), body.length)
                try {
                    client.reply(from, 'Tunggu sebentar, sedang di proses..', message.id)
                    const resp = await get.get('https://villahollanda.com/api.php?url='+ param).json()
                    console.log(resp)
                    if (resp.mediatype == 'photo') {
                        var ext = '.png'
                    }else{
                        var ext = '.mp4'
                    }
                        client.sendFileFromUrl(from, resp.descriptionc, `igeh${ext}`)
                } catch {
                    client.reply(from, 'Terjadi kesalahan!')
                    }
                }
            break
        /*case 'dujin':
            if (args.length >= 1) {
                const nuklir = body.split(' ')[1]
                const nanap = require('nana-api')
                const nana = new nanap()
                const { exec } = require ('child_process')
                client.sendText(from,'Tunnggu yak')
                nana.g(nuklir).then((g => {
                    if (g == 'Book not found'){
                         client.reply(from, 'Kode nuklir salah um', message.id)
                    } else {
                        var url = "https://t.nhentai.net/galleries/"+ g.media_id +"/cover.jpg"
                        try {
                            var teks = "Judul English  : "+ g.title.english.slice("0") +" \n \n Judul Japanese : "+ g.title.japanese +"\n \n Judul Pendek   : "+ g.title.pretty +"\n \n Kode Nuklir    : "+ g.id;
                            exec('nhentai --id=' + g.id + ` -P mantap.pdf -o ./hentong/${g.id}.pdf --format `+ `${g.id}.pdf`, (error, stdout, stderr) => {
                                client.sendFileFromUrl(from, url, 'hentod.jpg', teks)
                                client.sendFile(from, `./hentong/${g.id}.pdf/${g.id}.pdf.pdf`, `${g.title.pretty}.pdf`)
                            if (error) {
                                console.log('error : '+ error.message)
                                return
                            }
                            if (stderr) {
                                console.log('stderr : '+ stderr)
                                return
                            }
                            console.log('stdout : '+ stdout)
                                })
                        } catch {
                            client.reply(from, 'Terjadi kesalahan, mungkin kode nuklir salah', message.id)
                        }
                        }
                    }))
                }	
                break*/
        case 'brainly':
            if(args.length >= 1){
                function BrainlySearch(pertanyaan, amount,cb){
                    brainly(pertanyaan.toString(),Number(amount)).then(res => {	
                        let brainlyResult=[];	
                    res.forEach(ask=>{
                        let opt={
                            pertanyaan:ask.pertanyaan,
                            fotoPertanyaan:ask.questionMedia,
                        }
                        ask.jawaban.forEach(answer=>{
                            opt.jawaban={
                                judulJawaban:answer.text,
                                fotoJawaban:answer.media
                            }
                        })
                        brainlyResult.push(opt)
                        })	
                        return brainlyResult	
                    }).then(x=>{
                        cb(x)	
                    }).catch(err=>{
                        console.log(`${err}`.error)
                    })
                    }
                    const brainly = require('brainly-scraper')
                    let tanya = body.slice(9)
                    console.log(tanya.length-1)
                    let jum = Number(tanya.split('.')[1]) || 2
                    if(Number(tanya[tanya.length-1])){
                        tanya
                    }
                    let quest = body.slice(9)
                    client.reply(from, `*Pertanyaan : ${quest.split(' .')[0]}*\n*Jumlah jawaban : ${Number(jum)}*`, message.id)
                    BrainlySearch(quest.split(' .')[0],Number(jum), function(res){
                        console.log(res)
                        res.forEach(x=>{
                            client.reply(from, `*foto pertanyaan*\n${x.fotoPertanyaan.join('\n')}\n*pertanyaan :*\n${x.pertanyaan}\n\n*jawaban :*\n${x.jawaban.judulJawaban}\n\n*foto jawaban*\n${x.jawaban.fotoJawaban.join('\n')}`, message.id)
                        })
                    })
            } else {
                client.reply(from, 'Usage :\n!brainly <pertanyaan> <.jumlah>\n\nEx : \n!brainly NKRI .2', message.id)
            }
            break
        case 'quotemaker':
            arg = body.trim().split('|')
            if (arg.length >= 3) {
                client.reply(from, 'Tunggu yaa, sedang proses . . .', message.id) 
                const quotes = arg[1]
                const author = arg[2]
                const theme = arg[3]
                try {
                    const resolt = await quotemaker(quotes, author, theme)
                    client.sendFile(from, resolt, 'quotesmaker.jpg','neh...')
                } catch {
                    client.reply(from, 'Maaf quotesmaker gagal di proses:(', message.id)
                }
            } else {
                client.reply(from, 'Usage: \n!quotemaker |teks|watermark|theme\n\nEx :\n!quotemaker |ini contoh|bicit|random', message.id)
            }
            break
        case 'linkGrup':
            if(!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', message.id)
            if(isGroupMsg) {
                const inviteLink = await client.getGroupInviteLink(groupId);
                client.sendLinkWithAutoPreview(from, inviteLink, `\nLink group *${name}*`)
            } else {
            	client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', message.id)
            }
            break
        case 'add':
            if(!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', message.id)
            if(args.length == 0) return client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!add* 628xxxxx', message.id)
            if(!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', message.id)
            if(!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', message.id)
            try {
                await client.addParticipant(from,`${args[1]}@c.us`)
            } catch {
                client.reply(from, `Tidak dapat menambahkan ${args[1]} mungkin karena di private`, message.id)
            }
            break
        case 'kick':
            if(!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', message.id)
            if(!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', message.id)
            if(!isBotGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', message.id)
            if(mentionedJidList.length === 0) return client.reply(from, 'Untuk menggunakan Perintah ini, kirim perintah *!kick* @tagmember', message.id)
            await client.sendText(from, `Perintah diterima, mengeluarkan:\n${mentionedJidList.join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                try {
                    if (groupAdmins.includes(mentionedJidList[i])) return await client.sendText('Gagal, kamu tidak bisa mengeluarkan admin grup.')
                    await client.removeParticipant(groupId, mentionedJidList[i])
                } catch {
                    client.sendText('Gagal, kamu tidak bisa mengeluarkan admin grup.')
                }
            }
            break
        case 'leave':
            if(!isGroupMsg) return client.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', message.id)
            if(!isGroupAdmins) return client.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', message.id)
            client.sendText(from,'Sayonara')
            client.leaveGroup(groupId)
            break
        case 'promote':
            if(!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', message.id)
            if(!isGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', message.id)
            if(!isBotGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', message.id)
            if (mentionedJidList.length === 0) return await client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!promote* @tagmember', message.id)
            if (mentionedJidList.length >= 2) return await client.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 user.', message.id)
            if (groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, 'Maaf, user tersebut sudah menjadi admin.', message.id)
            await client.promoteParticipant(groupId, mentionedJidList[0])
            await client.sendTextWithMentions(from, `Perintah diterima, menambahkan @${mentionedJidList[0].replace('@c.us', '')} sebagai admin.`)
            break
        case 'demote':
            if(!isGroupMsg) return client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', message.id)
            if(!isGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', message.id)
            if(!isBotGroupAdmins) return client.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', message.id)
            if (mentionedJidList.length === 0) return client.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!demote* @tagadmin', message.id)
            if (mentionedJidList.length >= 2) return await client.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 orang.', message.id)
            if (!groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, 'Maaf, user tersebut tidak menjadi admin.', message.id)
            await client.demoteParticipant(groupId, mentionedJidList[0])
            await client.sendTextWithMentions(from, `Perintah diterima, menghapus jabatan @${mentionedJidList[0].replace('@c.us', '')}.`)
            break
        case 'revLinkGrup':
            if(isGroupMsg && isBotGroupAdmins && isGroupAdmins) {
                await client.revokeGroupInviteLink(groupId)
            } else if(!isGroupMsg) {
                client.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', message.id)
            } else if(!isGroupAdmins) {
                client.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', message.id)
            } else if(!isBotGroupAdmins) {
                client.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', message.id)
            }
            break
        case 'join':
            if (args.length >= 1) {
                const link = body.slice(6)
                if (link.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                    const check = await client.inviteInfo(link)
                    if (check.size < 30) {
                        client.reply(from, 'Member group tidak melebihi 30, bot tidak bisa masuk', message.id)
                    } else {
                    	try {
                        	await client.joinGroupViaLink(link).then(async () => {
                        		client.reply(from, 'Otw join gan', message.id)
                        	})
                        } catch (error) {
                        	client.reply(from, 'Terjadi kesalahan, mungkin link group tidak valid', message.id)
                        }
                    } 
                } else {
                    client.reply(from, 'Ini link? 👊🤬', message.id)
                }
            } else {
                client.reply(from, 'Kirim perintah *!join* linkgroup\n\nEx:\n!join https://chat.whatsapp.com/blablablablablabla', message.id)
            }
            break
        case 'lirik':
            if (args.length == 0) return client.reply(from, 'Kirim perintah *!lirik* judul lagu, contoh *!lirik* aku bukan boneka', message.id)
            const lagu = body.slice(7)
            console.log(lagu)
            const lirik = await liriklagu(lagu)
            client.sendText(from, lirik)
            break
        case 'waifu': 
            const data = fs.readFileSync('./lib/waifu.json')
            const dataJson = JSON.parse(data)
            const randIndex = Math.floor(Math.random() * dataJson.length)
            const randKey = dataJson[randIndex]
            client.sendFileFromUrl(from, randKey.image, 'Waifu.jpg', randKey.teks)
            break
        case 'inu':
            const list = ["https://cdn.shibe.online/shibes/247d0ac978c9de9d9b66d72dbdc65f2dac64781d.jpg","https://cdn.shibe.online/shibes/1cf322acb7d74308995b04ea5eae7b520e0eae76.jpg","https://cdn.shibe.online/shibes/1ce955c3e49ae437dab68c09cf45297d68773adf.jpg","https://cdn.shibe.online/shibes/ec02bee661a797518d37098ab9ad0c02da0b05c3.jpg","https://cdn.shibe.online/shibes/1e6102253b51fbc116b887e3d3cde7b5c5083542.jpg","https://cdn.shibe.online/shibes/f0c07a7205d95577861eee382b4c8899ac620351.jpg","https://cdn.shibe.online/shibes/3eaf3b7427e2d375f09fc883f94fa8a6d4178a0a.jpg","https://cdn.shibe.online/shibes/c8b9fcfde23aee8d179c4c6f34d34fa41dfaffbf.jpg","https://cdn.shibe.online/shibes/55f298bc16017ed0aeae952031f0972b31c959cb.jpg","https://cdn.shibe.online/shibes/2d5dfe2b0170d5de6c8bc8a24b8ad72449fbf6f6.jpg","https://cdn.shibe.online/shibes/e9437de45e7cddd7d6c13299255e06f0f1d40918.jpg","https://cdn.shibe.online/shibes/6c32141a0d5d089971d99e51fd74207ff10751e7.jpg","https://cdn.shibe.online/shibes/028056c9f23ff40bc749a95cc7da7a4bb734e908.jpg","https://cdn.shibe.online/shibes/4fb0c8b74dbc7653e75ec1da597f0e7ac95fe788.jpg","https://cdn.shibe.online/shibes/125563d2ab4e520aaf27214483e765db9147dcb3.jpg","https://cdn.shibe.online/shibes/ea5258fad62cebe1fedcd8ec95776d6a9447698c.jpg","https://cdn.shibe.online/shibes/5ef2c83c2917e2f944910cb4a9a9b441d135f875.jpg","https://cdn.shibe.online/shibes/6d124364f02944300ae4f927b181733390edf64e.jpg","https://cdn.shibe.online/shibes/92213f0c406787acd4be252edb5e27c7e4f7a430.jpg","https://cdn.shibe.online/shibes/40fda0fd3d329be0d92dd7e436faa80db13c5017.jpg","https://cdn.shibe.online/shibes/e5c085fc427528fee7d4c3935ff4cd79af834a82.jpg","https://cdn.shibe.online/shibes/f83fa32c0da893163321b5cccab024172ddbade1.jpg","https://cdn.shibe.online/shibes/4aa2459b7f411919bf8df1991fa114e47b802957.jpg","https://cdn.shibe.online/shibes/2ef54e174f13e6aa21bb8be3c7aec2fdac6a442f.jpg","https://cdn.shibe.online/shibes/fa97547e670f23440608f333f8ec382a75ba5d94.jpg","https://cdn.shibe.online/shibes/fb1b7150ed8eb4ffa3b0e61ba47546dd6ee7d0dc.jpg","https://cdn.shibe.online/shibes/abf9fb41d914140a75d8bf8e05e4049e0a966c68.jpg","https://cdn.shibe.online/shibes/f63e3abe54c71cc0d0c567ebe8bce198589ae145.jpg","https://cdn.shibe.online/shibes/4c27b7b2395a5d051b00691cc4195ef286abf9e1.jpg","https://cdn.shibe.online/shibes/00df02e302eac0676bb03f41f4adf2b32418bac8.jpg","https://cdn.shibe.online/shibes/4deaac9baec39e8a93889a84257338ebb89eca50.jpg","https://cdn.shibe.online/shibes/199f8513d34901b0b20a33758e6ee2d768634ebb.jpg","https://cdn.shibe.online/shibes/f3efbf7a77e5797a72997869e8e2eaa9efcdceb5.jpg","https://cdn.shibe.online/shibes/39a20ccc9cdc17ea27f08643b019734453016e68.jpg","https://cdn.shibe.online/shibes/e67dea458b62cf3daa4b1e2b53a25405760af478.jpg","https://cdn.shibe.online/shibes/0a892f6554c18c8bcdab4ef7adec1387c76c6812.jpg","https://cdn.shibe.online/shibes/1b479987674c9b503f32e96e3a6aeca350a07ade.jpg","https://cdn.shibe.online/shibes/0c80fc00d82e09d593669d7cce9e273024ba7db9.jpg","https://cdn.shibe.online/shibes/bbc066183e87457b3143f71121fc9eebc40bf054.jpg","https://cdn.shibe.online/shibes/0932bf77f115057c7308ef70c3de1de7f8e7c646.jpg","https://cdn.shibe.online/shibes/9c87e6bb0f3dc938ce4c453eee176f24636440e0.jpg","https://cdn.shibe.online/shibes/0af1bcb0b13edf5e9b773e34e54dfceec8fa5849.jpg","https://cdn.shibe.online/shibes/32cf3f6eac4673d2e00f7360753c3f48ed53c650.jpg","https://cdn.shibe.online/shibes/af94d8eeb0f06a0fa06f090f404e3bbe86967949.jpg","https://cdn.shibe.online/shibes/4b55e826553b173c04c6f17aca8b0d2042d309fb.jpg","https://cdn.shibe.online/shibes/a0e53593393b6c724956f9abe0abb112f7506b7b.jpg","https://cdn.shibe.online/shibes/7eba25846f69b01ec04de1cae9fed4b45c203e87.jpg","https://cdn.shibe.online/shibes/fec6620d74bcb17b210e2cedca72547a332030d0.jpg","https://cdn.shibe.online/shibes/26cf6be03456a2609963d8fcf52cc3746fcb222c.jpg","https://cdn.shibe.online/shibes/c41b5da03ad74b08b7919afc6caf2dd345b3e591.jpg","https://cdn.shibe.online/shibes/7a9997f817ccdabac11d1f51fac563242658d654.jpg","https://cdn.shibe.online/shibes/7221241bad7da783c3c4d84cfedbeb21b9e4deea.jpg","https://cdn.shibe.online/shibes/283829584e6425421059c57d001c91b9dc86f33b.jpg","https://cdn.shibe.online/shibes/5145c9d3c3603c9e626585cce8cffdfcac081b31.jpg","https://cdn.shibe.online/shibes/b359c891e39994af83cf45738b28e499cb8ffe74.jpg","https://cdn.shibe.online/shibes/0b77f74a5d9afaa4b5094b28a6f3ee60efcb3874.jpg","https://cdn.shibe.online/shibes/adccfdf7d4d3332186c62ed8eb254a49b889c6f9.jpg","https://cdn.shibe.online/shibes/3aac69180f777512d5dabd33b09f531b7a845331.jpg","https://cdn.shibe.online/shibes/1d25e4f592db83039585fa480676687861498db8.jpg","https://cdn.shibe.online/shibes/d8349a2436420cf5a89a0010e91bf8dfbdd9d1cc.jpg","https://cdn.shibe.online/shibes/eb465ef1906dccd215e7a243b146c19e1af66c67.jpg","https://cdn.shibe.online/shibes/3d14e3c32863195869e7a8ba22229f457780008b.jpg","https://cdn.shibe.online/shibes/79cedc1a08302056f9819f39dcdf8eb4209551a3.jpg","https://cdn.shibe.online/shibes/4440aa827f88c04baa9c946f72fc688a34173581.jpg","https://cdn.shibe.online/shibes/94ea4a2d4b9cb852e9c1ff599f6a4acfa41a0c55.jpg","https://cdn.shibe.online/shibes/f4478196e441aef0ada61bbebe96ac9a573b2e5d.jpg","https://cdn.shibe.online/shibes/96d4db7c073526a35c626fc7518800586fd4ce67.jpg","https://cdn.shibe.online/shibes/196f3ed10ee98557328c7b5db98ac4a539224927.jpg","https://cdn.shibe.online/shibes/d12b07349029ca015d555849bcbd564d8b69fdbf.jpg","https://cdn.shibe.online/shibes/80fba84353000476400a9849da045611a590c79f.jpg","https://cdn.shibe.online/shibes/94cb90933e179375608c5c58b3d8658ef136ad3c.jpg","https://cdn.shibe.online/shibes/8447e67b5d622ef0593485316b0c87940a0ef435.jpg","https://cdn.shibe.online/shibes/c39a1d83ad44d2427fc8090298c1062d1d849f7e.jpg","https://cdn.shibe.online/shibes/6f38b9b5b8dbf187f6e3313d6e7583ec3b942472.jpg","https://cdn.shibe.online/shibes/81a2cbb9a91c6b1d55dcc702cd3f9cfd9a111cae.jpg","https://cdn.shibe.online/shibes/f1f6ed56c814bd939645138b8e195ff392dfd799.jpg","https://cdn.shibe.online/shibes/204a4c43cfad1cdc1b76cccb4b9a6dcb4a5246d8.jpg","https://cdn.shibe.online/shibes/9f34919b6154a88afc7d001c9d5f79b2e465806f.jpg","https://cdn.shibe.online/shibes/6f556a64a4885186331747c432c4ef4820620d14.jpg","https://cdn.shibe.online/shibes/bbd18ae7aaf976f745bc3dff46b49641313c26a9.jpg","https://cdn.shibe.online/shibes/6a2b286a28183267fca2200d7c677eba73b1217d.jpg","https://cdn.shibe.online/shibes/06767701966ed64fa7eff2d8d9e018e9f10487ee.jpg","https://cdn.shibe.online/shibes/7aafa4880b15b8f75d916b31485458b4a8d96815.jpg","https://cdn.shibe.online/shibes/b501169755bcf5c1eca874ab116a2802b6e51a2e.jpg","https://cdn.shibe.online/shibes/a8989bad101f35cf94213f17968c33c3031c16fc.jpg","https://cdn.shibe.online/shibes/f5d78feb3baa0835056f15ff9ced8e3c32bb07e8.jpg","https://cdn.shibe.online/shibes/75db0c76e86fbcf81d3946104c619a7950e62783.jpg","https://cdn.shibe.online/shibes/8ac387d1b252595bbd0723a1995f17405386b794.jpg","https://cdn.shibe.online/shibes/4379491ef4662faa178f791cc592b52653fb24b3.jpg","https://cdn.shibe.online/shibes/4caeee5f80add8c3db9990663a356e4eec12fc0a.jpg","https://cdn.shibe.online/shibes/99ef30ea8bb6064129da36e5673649e957cc76c0.jpg","https://cdn.shibe.online/shibes/aeac6a5b0a07a00fba0ba953af27734d2361fc10.jpg","https://cdn.shibe.online/shibes/9a217cfa377cc50dd8465d251731be05559b2142.jpg","https://cdn.shibe.online/shibes/65f6047d8e1d247af353532db018b08a928fd62a.jpg","https://cdn.shibe.online/shibes/fcead395cbf330b02978f9463ac125074ac87ab4.jpg","https://cdn.shibe.online/shibes/79451dc808a3a73f99c339f485c2bde833380af0.jpg","https://cdn.shibe.online/shibes/bedf90869797983017f764165a5d97a630b7054b.jpg","https://cdn.shibe.online/shibes/dd20e5801badd797513729a3645c502ae4629247.jpg","https://cdn.shibe.online/shibes/88361ee50b544cb1623cb259bcf07b9850183e65.jpg","https://cdn.shibe.online/shibes/0ebcfd98e8aa61c048968cb37f66a2b5d9d54d4b.jpg"]
            let kya = list[Math.floor(Math.random() * list.length)]
            client.sendFileFromUrl(from, kya, 'Dog.jpeg', 'Inu')
            break
        case 'neko':          
            q2 = Math.floor(Math.random() * 900) + 300;
            q3 = Math.floor(Math.random() * 900) + 300;
            client.sendFileFromUrl(from, 'http://placekitten.com/'+q3+'/'+q2, 'neko.png','Neko ')
            break
        case 'pokemon':
            q7 = Math.floor(Math.random() * 890) + 1;
            client.sendFileFromUrl(from, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'+q7+'.png','Pokemon.png',)
            break
        case 'wallpaper' :
            q4 = Math.floor(Math.random() * 800) + 100;
            client.sendFileFromUrl(from, 'https://wallpaperaccess.com/download/anime-'+q4,'Wallpaper.png','Here is your wallpaper')
            break
        case 'quote' :
        case 'quotes' :
            client.sendText(from, quotedd())
            break
        case 'meme':
            const response = await axios.get('https://meme-api.herokuapp.com/gimme/wholesomeanimemes');
            const { postlink, title, subreddit, url, nsfw, spoiler } = response.data
            await client.sendFileFromUrl(from, `${url}`, 'meme.jpg', `${title}`)
            break
        case 'help':
            var teks = 'e29594e29590e29590e29590e29590e29590e29590e29590e29590e29590e29590e29590e29590e29590e29590e295900ae295a0e29590e29590e29caae3809820436f6d6d616e647320e38099e29caae29590e295900ae295a0e29ea521737469636b65720ae295a0e29ea5216e656b6f0ae295a0e29ea521706f6b656d6f6e0ae295a0e29ea521696e750ae295a0e29ea521627261696e6c79203c70657274616e7961616e3e203c2e6a756d3e0ae295a0e29ea521747473205b69642c20656e2c206a702c2061725d0ae295a0e29ea52171756f74656d616b6572203c6f7074696f6e616c3e0ae295a0e29ea52177616c6c70617065720ae295a0e29ea521696e666f0ae295a0e29ea52171756f7465730ae295a0e29ea52177616966750ae295a0e29ea521776169740ae295a0e29ea5216d656d650ae295a0e29ea5216a6f696e203c6c696e6b3e0ae295a0e29ea5216c6972696b203c6f7074696f6e616c3e0ae295910ae295a0e29caae3809820446f776e6c6f6164657220e38099e29caae295900ae295a0e29ea52179746d7033203c6c696e6b3e0ae295a0e29ea5216967203c6c696e6b3e0ae295a0e29ea52164756a696e203c6e756b6c69723e205b204f6666205d0ae295910ae295a0e29caae3809820466f722061646d696e2067726f757020e38099e29caae295900ae295a0e29ea52161646420363238787878780ae295a0e29ea5216b69636b203c407461676d656d6265723e0ae295a0e29ea52170726f6d6f7465203c407461676d656d6265723e0ae295a0e29ea52164656d6f7465203c4074616761646d696e3e0ae295a0e29ea5216c656176650ae295910ae295a0e29caae3809820446f6e617465203a2920e38099e29caae29590e29590e29590e295900ae295a0e29ea521646f6e6173690ae2959ae29590e38098204d6520426f7420e38099'
            client.sendText(from, Buffer.from(teks, 'hex').toString('utf-8'))
            break
        case 'info':
            client.sendText(from, 'Ini adalah program yang ditulis dalam Javascript. \n \nDengan menggunakan bot, Anda menyetujui Syarat dan Ketentuan kami \n \nSyarat dan ketentuan \n \nTeks dan nama pengguna whatsapp Anda akan disimpan di server kami selama bot aktif, data Anda akan dihapus ketika  bot menjadi offline.  Kami TIDAK menyimpan gambar, video, file audio dan dokumen yang Anda kirim.  Kami tidak akan pernah meminta Anda untuk mendaftar atau meminta kata sandi, OTP, atau PIN Anda.\n\nTerima kasih, Selamat bersenang-senang!\n\nWarning: !!! dikarenakan saya sering melihat ada orang yang menjual bot, saya informasikan kalau bot ini geratis!.')    
            break
        default:
            console.log(color('[ERROR]', 'red'), color(time, 'yellow'), 'Unregistered Command from', color(pushname))
            break
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
    }
}

startServer()
