const { create, decryptMedia } = require('@open-wa/wa-automate')
const fs = require('fs-extra')
const moment = require('moment')
const fetch = require('node-fetch')
const axios = require('axios')
const get = require('got')
const {artinama,
    quotes,
    weton,
    corona,
    alay,
    namaninjaku,
    liriklagu,
    quotemaker,
    yt,
    gd,
    jodoh,
    hilih,
    weather,
} = require('./lib/functions')
const quotedd = require('./lib/quote')
const videoUrlLink = require('video-url-link')
const tiktod = require('./tiktod')
const fbvid = require('fbvideos');

const serverOption = {
    headless: true,
    qrRefreshS: 60,
    qrTimeout: 0,
    authTimeout: 0,
    autoRefresh: true,
    devtools: false,
    cacheEnabled:false,
    chromiumArgs: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--aggressive-cache-discard',
      '--disable-cache',
      '--disable-application-cache',
      '--disable-offline-load-stale-cache',
      '--disk-cache-size=0'
    ]
}

const opsys = process.platform;
if (opsys == "win32" || opsys == "win64") {
serverOption['executablePath'] = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
} else if (opsys == "linux") {
serverOption['browserRevision'] = '737027';
} else if (opsys == "darwin") {
serverOption['executablePath'] = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
}

const startServer = async (from) => {
create('Imperial', serverOption)
        .then(client => {
            console.log('[SERVER] Server Started!')

            // Force it to keep the current session
            client.onStateChanged(state => {
                console.log('[State Changed]', state)
                if (state === 'CONFLICT') client.forceRefocus()
            })

            client.onMessage((message) => {
                msgHandler(client, message)
            })
	    client.onIncomingCall(call => {
			console.log(call)
			client.contactBlock(call.peerJid)
		})
        })
}


async function msgHandler (client, message) {
    try {
        // console.log(message)
        const { type, body, from, t, sender, isGroupMsg, chat, groupMetadata, caption, isMedia, mimetype, quotedMsg } = message
        const { id, pushname } = sender
        const { name } = chat
	const pushnames = sender.pushname || chat.name || sender.verifiedName || '';	
        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        const commands = ['!sticker',
	'!stiker',
	'!donate',
	'!donasi',
	'!dujin',
	'!info',
	'!tiktod',
	'!F',
	'!join',
	'!lirik',
	'!quotemaker',
	'!help',
	'!owner',
	'!meme',
	'!setPic',
	'!add',
	'!kick',
	'!leave',
	'!promote',
	'!demote',
	'!admin',
	'!linkGrup',
	'!revLinkGrup',
	'!getPic',
	'!neko',
	'!wallpaper',
	'!quote',
	'!quotes',
	'!Quote',
	'!weather',
	'#Tod',
	'!Pokemon',
	'!waifu',
	'!Waifu',
	'!fb',
	'!ytmp3',
	'!ig',
	'!gifSticker',
	'!setName',
	'!setDesc',
	'!gifStiker']
        const cmds = commands.map(x => x + '\\b').join('|')
        const cmd = type === 'chat' ? body.match(new RegExp(cmds, 'gi')) : type === 'image' && caption ? caption.match(new RegExp(cmds, 'gi')) : ''

        if (cmd) {
            if (!isGroupMsg) console.log(color('[EXEC]'), color(time, 'yellow'), color(cmd[0]), 'from', color(pushname))
            if (isGroupMsg) console.log(color('[EXEC]'), color(time, 'yellow'), color(cmd[0]), 'from', color(pushname), 'in', color(name))
            const args = body.trim().split(' ')
            switch (cmd[0]) {
                case '!sticker':
                case '!stiker':
                    if (isMedia) {
                        const mediaData = await decryptMedia(message)
                        const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                        await client.sendImageAsSticker(from, imageBase64, message)
                    } else if (quotedMsg && quotedMsg.type == 'image') {
                        const mediaData = await decryptMedia(quotedMsg)
                        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await client.sendImageAsSticker(from, imageBase64, message)
                    } else if (args.length == 2) {
                        var isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi);
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
		/*case '!gifSticker':
		case '!gifStiker':
			    if (args.length == 1){
                		const url = args[0]
                		const isMediaGiphy = url.match(new RegExp(/https?:\/\/media.giphy.com\/media/, 'gi'));
                		const isGiphy = url.match(new RegExp(/https?:\/\/(www\.)?giphy.com/, 'gi'));
                		if(isGiphy){
                    			const getGiphyCode = url.match(new RegExp(/\-(?:.(?!\-))+$/, 'gi'));
                    			if(getGiphyCode){
                        			let delHyphen = getGiphyCode[0].replace(/-/gi, "");
                        			const smallGif = "https://media.giphy.com/media/"+delHyphen+"/giphy-downsized.gif";
                        			await client.sendGiphyAsSticker(from, smallGif)
                        			.catch((err) => {
                            			console.log(err)
                        			})
                    			} else {
                        			client.reply(from, "Gagal membuat sticker gif", id)
                    			}
                		} else if(isMediaGiphy){
                    			const normalGif = url.match(new RegExp(/(giphy|source).(gif|mp4)/, 'gi'));
                    			if(normalGif){
                        			let smallGif = url.replace(normalGif[0], "giphy-downsized.gif")
                        			await client.sendGiphyAsSticker(from, smallGif)
                        			.catch((err) => {
                            			console.log(err)
                        			})
                    			}
                		} else {
                    			client.reply(from, "Saat ini sticker gif hanya bisa menggunakan link giphy saja kak.", id)
                		}
            		}
                    break*/
		case '!setPic':
			    if(isGroupMsg) {
				    if(isMedia) {
					    var wkk = `${from.split('-')[0]}@c.us`
					    if(message.author == wkk || message.author == '6285892766102@c.us') {
					    	const mediaData = await decryptMedia(message)
					    	const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
					    	await client.setGroupIcon(from, imageBase64)
					    }else{
							client.reply(from, 'Lu siapa ajg? fitur ini cuma buat owner grup', message)
					    }
				    }
			    } else {
				    client.reply(from, 'Fitur ini hanya bisa di gunakan dalam grup', message)
			    }
		    break
		case '!setDesk':
			if(isGroupMsg) {
				var wkk = `${from.split('-')[0]}@c.us`
				if(message.author == wkk || message.author == '6285892766102@c.us') {
					try {
						const desk = body.slice(9)
						await client.setGroupDescription(from, `${desk}`)
					} catch {
						client.reply(from, 'Terjadi kesalahan, tidak dapat mengubah deskripsi grup', message)
					}
				}else{
					client.reply(from, 'Lu siapa ajg? fitur ini cuma buat owner grup', message)
				}
			}else{
				client.reply(from, 'Fitur ini hanya bisa di gunakan dalam grup', message)
			}
                    break
		case '!donasi':
		case '!donate':
				client.sendLinkWithAutoPreview(from,'https://saweria.co/donate/mhankbarbar','Ya halo om, mau donate?\n\nKalo mau donate nih langsung ae ke:\nOVO : 085892766102\nPulsa : 085892766102\nSaweria : https://saweria.co/donate/mhankbarbar')
		    break
		case '#tod':
			if (args.length == 2) {
				const url = args[1]
				const reUrl = url.match(new RegExp(/https?:\/\/media.giphy.com\/media/, 'gi'))
				if(reUrl) {
					await client.sendGiphyAsSticker(from, url)
				} else {
					client.reply(from, 'Untuk saat ini stiker gif hanya bisa menggunakan link giphy saja', message)
				}
			}
                    break
		case '!ytmp3':
			if (args.length >= 2){
				const url = args[1]
				var param = body.substring(body.indexOf(' '), body.length)
				const resp = await get.get('https://yutmp3.herokuapp.com/?url='+ param).json()
				console.log(resp)
				if (!resp.file) {
					client.reply(from, 'Videonya ga valid!', message)
				} else {
					client.reply(from, `Title : ${resp.title}`, message)
					await client.sendFileFromUrl(from, `https://yutmp3.herokuapp.com${resp.file}`, `${resp.title}.mp3`)
				}
			}
		    break
		case '!tiktod':
			if(args.length !== 2) return client.reply(from, 'Maaf, link yang kamu kirim tidak valid', message)
                        const arl = args[1]
                        if (!arl.match(isUrl) && !arl.includes('tiktok.com')) return client.reply(from, 'Maaf, link yang kamu kirim tidak valid', message)
                        await client.sendText(from, '*Scraping Metadata...*')
                        await tiktod(arl)
                            .then((videoMeta) => {
                                 const filename = videoMeta.authorMeta.name + '.mp4'
                                 const caps = `*Metadata:*\nUsername: ${videoMeta.authorMeta.name} \nMusic: ${videoMeta.musicMeta.musicName} \nView: ${videoMeta.playCount.toLocaleString()} \nLike: ${videoMeta.diggCount.toLocaleString()} \nComment: ${videoMeta.commentCount.toLocaleString()} \nShare: ${videoMeta.shareCount.toLocaleString()} \nCaption: ${videoMeta.text.trim() ? videoMeta.text : '-'}.`
                                 client.sendFileFromUrl(from, videoMeta.url, filename, videoMeta.NoWaterMark ? caps : `⚠ Video tanpa watermark tidak tersedia. \n\n${caps}`, '', { headers: { 'User-Agent': 'okhttp/4.5.0' } })
                                     .catch(err => console.log('Caught exception: ', err))
                            }).catch(() => {
                                 client.reply(from, 'Gagal mengambil metadata, link yang kamu kirim tidak valid', id)
                            })
		    break
		case '!ig':
			if (args.length >= 2) {
				var param = body.substring(body.indexOf(' '), body.length)
				const resp = await get.get('https://villahollanda.com/api.php?url='+ param).json()
				console.log(resp)
				if (resp.mediatype == 'photo') {
					var ext = '.png'
				}else{
					var ext = '.mp4'
				}
				client.sendFileFromUrl(from, resp.descriptionc, `igeh${ext}`)
			}
		    break
		case '!dujin':
			if (args.length >= 2) {
				var nuklir = args[1]
				var dujin = 'https://kegma.herokuapp.com'
				const resp = await get.get('https://kegma.herokuapp.com/doujinshi/'+ nuklir).json()
				console.log(resp)
				//const wk = resp.content.split('unduh/')[1].replace(/%20/g,' ').replace(/%C2%BB/g,'�').replace(/%3A/g,':')
				if (resp.status) {
					client.reply(from, `Result : ${dujin}${resp.content}`, message)
					//client.sendFileFromUrl(from, `${dujin}${resp.content}`, `${nuklir}.pdf`)
					//client.senFile(from, `C:\\Users\\administrator\\NApi\\pdf\\${wk}`, `${wk}`)
				}else{
					client.reply(from, 'Kode nuklir salah om', message)
				}
			}
			
                    break
		case '!F':
			if(isGroupMsg){
				var asw = client.getGroupAdmins(from)
				console.log(asw)
			}
		    break
		case '!lirik':
			if(args.length >= 2){
                        	const lagu = body.slice(7)
                        	const result = await liriklagu(lagu)
                        	client.sendText(from, result)
			}else{
				client.reply(from, 'usage:\n\n!lirik aku bukan boneka', message)
			}
                    break
		case '!weather':
			if(args.length >= 2){
				const kota = args[1]
                        	const result = await weather(kota)
                        	client.sendText(from, result)
			}
                    break
		case '!quotemaker':
			arg = body.trim().split('|')
                        if (arg.length == 4) {
				client.sendText(from, 'Tunggu yaa, sedang proses . . .') 
                        	const quotes = arg[1]
                        	const author = arg[2]
                        	const theme = arg[3]
                        	const result = await quotemaker(quotes, author, theme)
                        	client.sendFile(from, result, 'quotesmaker.jpg','neh...')
			}
                    break
		case '!linkGrup':
			if(isGroupMsg){
				try {
					const inviteLink = await client.getGroupInviteLink(chat.id);
					client.sendLinkWithAutoPreview(from, inviteLink, `\nLink group *${name}*`)
				} catch {
					client.reply(from, 'Sepertinya bot belum menjadi admin', message)
				}
			}else{
				client.reply(from, 'Perintah ini hanya bisa di gunakan dalam grup', message)
			}
		    break
		case '!owner':
			if(isGroupMsg){
				var owner = from.split('-')[0]
				client.sendText(from, `[${owner}]`)
			}else{
				client.reply(from, 'Perintah ini hanya bisa di gunakan dalam grup', message)
			}
		    break
		case '!getPic':
			if(!isGroupMsg){
				try{
					var jnck = await client.getProfilePicFromServer(from)
					client.sendFileFromUrl(from, jnck, `awok.jpg`)
				} catch {
					client.reply(from, 'Pp lu gada anying, di private atau gimana?', message)
				}
			}else{
				try{
					var jnck = await client.getProfilePicFromServer(from)
					client.sendFileFromUrl(from, jnck, 'gblk.jpg')
				} catch {
					client.reply(from, 'Terjadi kesalahan, tidak dapat mengirimkan foto profile group', message)
				}
			}
		    break
		case '!add':
			if(isGroupMsg){
				if(args.length >=2){
					var wkwk = `${from.split('-')[0]}@c.us`
					if(message.author == wkwk || message.author == '6285892766102@c.us'){
						try {
							org = args[1]
							client.addParticipant(from,`${org}@c.us`)
						} catch {
							client.reply(from, `Tidak dapat menambahkan ${org} mungkin karena di private`, message)
						}
					}else{
						client.reply(from, 'Lu siapa ajg? fitur ini cuma buat owner grup', message)
					}
				}
			}else{
				client.reply(from, 'Fitur ini hanya bisa di gunakan dalam grup', message)
			}
		    break
		case '!kick':
			if(isGroupMsg){
				if(args.length >=2){
					var wkwk = `${from.split('-')[0]}@c.us`
					if(message.author == wkwk || message.author == '6285892766102@c.us' ){
						wong = body.split('@')[1] || args[1]
						client.removeParticipant(from,`${wong}@c.us`)
					}else{
						client.reply(from, 'Lu siapa ajg? fitur ini cuma buat owner grup', message)
					}
				}
			}else{
				client.reply(from, 'Fitur ini hanya bisa di gunakan dalam grup', message)
			}
		    break
	/*	case '!leave':
			if(isGroupMsg){
				client.sendText(from,'Sayonara')
				client.leaveGroup(from)
}
		    break*/
		case '!setName':
			if(isGroupMsg){
				if(args.length >= 2) {
					var wkk = `${from.split('-')[0]}@c.us`
					if(message.author == wkk || message.author == '6285892766102@c.us') {
						try {
							const subject = body.slice(9)
							console.log(subject)
							client.setGroupTitle(from, subject)
						} catch {
							client.reply(from, 'Terjadi Kesalahan, tidak dapat mengubah title group!', message)
						}
					} else {
						client.reply(from, 'Lu siapa ajg? fitur ini cuma buat owner grup', message)
					}
				}
			} else {
				client.reply(from, 'Fitur ini hanya bisa gunakan dalam grup', message)
			}
		    break
		case '!promote':
			if(isGroupMsg){
				if(args.length >=2){
					var wkwk = `${from.split('-')[0]}@c.us`
					if(message.author == wkwk || message.author == '6285892766102@c.us' ){
						prom = body.split('@')[1] || args[1]
						client.promoteParticipant(from,`${prom}@c.us`)
					}else{
						client.reply(from, 'Lu siapa ajg? fitur ini cuma buat owner grup', message)
					}
				}
			}else{
				client.reply(from, 'Fitur ini hanya bisa di gunakan dalam grup', message)
			}
		    break
		case '!demote':
			if(isGroupMsg){
				if(args.length >=2){
					var wkwk = `${from.split('-')[0]}@c.us`
					if(message.author == wkwk || message.author == '6285892766102@c.us' ){
						demo = body.split('@')[1] || args[1]
						client.demoteParticipant(from,`${demo}@c.us`)
					}else{
						client.reply(from, 'Lu siapa ajg? fitur ini cuma buat owner grup', message)
					}
				}
			}else{
				client.reply(from, 'Fitur ini hanya bisa di gunakan dalam grup', message)
			}
		    break
		case '!revLinkGrup':
			if(isGroupMsg){
				var wkk = `${from.split('-')[0]}@c.us`
				if(message.author == wkk) {
					try {
						await client.revokeGroupInviteLink(chat.id);
						//client.sendText(from, 'Tautan undangan berhasil di tarik')
					} catch (e) {
						client.reply(from, 'Sepertinya bot belum menjadi admin', message)
					}
				}else{
					client.reply(from, 'Lu siapa ajg? fitur ini cuma buat owner grup', message)
				}
			}else{
				client.reply(from, 'Perintah ini hanya bisa di gunakan dalam grup', message)
			}
		    break
		case '!join':
			client.reply(from, 'Izin dulu sama wa.me/6285892766102 kalo mau invite bot di grup mu', message)
			/*if (args.length >=2) {
				const link = args[1]
				const invite = link.replace('https://chat.whatsapp.com/', '')
				if (link.match(/(https:\/\/chat.whatsapp.com)/gi)) {
					const check = await client.inviteInfo(invite);
					if (check) {
						await client.joinGroupViaLink(invite)
						client.reply(from, 'Otw join gan', message)
					} else {
						client.reply(from, 'Sepertinya link grup bermasalah', message)
					}
				} else {
					client.reply(from, 'Ini link????', message)
				}
			}*/
		    break
                case '!Waifu':
                case '!waifu': 
                        q8 = q2 = Math.floor(Math.random() * 98) + 10;
                        client.sendFileFromUrl(from, 'http://randomwaifu.altervista.org/images/00'+q8+'.png', 'Waifu.png', 'Korewa daredesu ka?')
                    break
                case '!neko':          
                        q2 = Math.floor(Math.random() * 900) + 300;
                        q3 = Math.floor(Math.random() * 900) + 300;
                        client.sendFileFromUrl(from, 'http://placekitten.com/'+q3+'/'+q2, 'neko.png','Neko ')
                    break
                 case '!Pokemon':
                        q7 = Math.floor(Math.random() * 890) + 1;
                        client.sendFileFromUrl(from, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'+q7+'.png','Pokemon.png',)
                    break
                case '!wallpaper' :
                       q4 = Math.floor(Math.random() * 800) + 100;
                       client.sendFileFromUrl(from, 'https://wallpaperaccess.com/download/anime-'+q4,'Wallpaper.png','Here is your wallpaper')
                    break
                case '!quote' :
				case '!quotes' :
				case '!Quote' :
					client.sendText(from, quotedd())
				    break
				case '!meme':
					const response = await axios.get('https://meme-api.herokuapp.com/gimme/wholesomeanimemes');
					const { postlink, title, subreddit, url, nsfw, spoiler } = response.data
					await client.sendFileFromUrl(from, `${url}`, 'meme.jpg', `${title}`)
				    break
                case '!fb':
                    if (args.length >=2) {
                        const urlvid = args[1]
                        const high = await fbvid.high(urlvid)
                        const low = await fbvid.low(urlvid)
                        if (high == "Either the video is deleted or it's not shared publicly!") {
                            client.sendFileFromUrl(from, low.url, "video.mp4", "SD Video successfully downloaded")
                        } else if (high !== "Either the video is deleted or it's not shared publicly!") {
                            client.sendFileFromUrl(from, high.url, "video.mp4", "HD Video successfully downloaded")
                        } else if (high == "Either the video is deleted or it's not shared publicly!" && low == "Either the video is deleted or it's not shared publicly!") {
                            client.reply(from,"The URL is invalid",message)
                        }
                    } else {
                        client.reply(from,"The format is !fb [URL Video]",message)
                    }
                    break
		case '!help':
			client.sendText(from, `╔═══════════════
╠══✪〘 Commands 〙✪══
╠➥!sticker
╠➥!neko
╠➥!Pokemon
╠➥!wallpaper
╠➥!info 
╠➥!quotes
╠➥!waifu
╠➥!linkGrup
╠➥!join
╠➥!getPic
╠➥!lirik <optional>
║
╠✪〘 Downloader 〙✪═
╠➥!ytmp3 <link>
╠➥!ig <link>
║
╠✪〘 For owner group 〙✪═
╠➥!add 628xxxx
╠➥!kick <@tagmember>
╠➥!promote <@tagmember>
╠➥!demote <@tagadmin>
╠➥!setPic send image with caption
╠➥!revLinkGrup
║
╠✪〘 Donate :) 〙✪════
╠➥!donasi
╚═〘 Me Bot 〙`)
                    break
                case '!info':
                        client.sendText(from, 'Ini adalah program sumber terbuka yang ditulis dalam Javascript. \n \nDengan menggunakan bot, Anda menyetujui Syarat dan Ketentuan kami \n \nSyarat dan ketentuan \n \nTeks dan nama pengguna whatsapp Anda akan disimpan di server kami selama bot aktif, data Anda akan dihapus ketika  bot menjadi offline.  Kami TIDAK menyimpan gambar, video, file audio dan dokumen yang Anda kirim.  Kami tidak akan pernah meminta Anda untuk mendaftar atau meminta kata sandi, OTP, atau PIN Anda.  \n \n Terima kasih, Selamat bersenang-senang!')    
                     }
        } else {
            if (!isGroupMsg) console.log('[RECV]', color(time, 'yellow'), color(body, 'red'), color(pushname))
            if (isGroupMsg) console.log('[RECV]', color(time, 'yellow'), color(body, 'red'), color(pushname), 'in', color(name))
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
    }
}

process.on('Something went wrong', function (err) {
    console.log('Caught exception: ', err);
  });

function color (text, color) {
  switch (color) {
    case 'red': return '\x1b[31m' + text + '\x1b[0m'
    case 'yellow': return '\x1b[33m' + text + '\x1b[0m'
    default: return '\x1b[32m' + text + '\x1b[0m' // default is green
  }
}

startServer()
