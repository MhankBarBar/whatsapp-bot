const { create, decryptMedia } = require('@open-wa/wa-automate')
const fs = require('fs-extra')
const moment = require('moment')
const fetch = require('node-fetch')
const axios = require('axios')
const {artinama,
    quotes,
    weton,
    corona,
    alay,
    namaninjaku,
    liriklagu,
    quotemaker,
    yt,
    ytmp3,
    gd,
    jodoh,
    hilih,
    weather,
} = require('./lib/functions')
const quotedd = require('./lib/quote')
const insta = require('./lib/insta')
const videoUrlLink = require('video-url-link')
const kopit = require('./korona')
const fbvid = require('fbvideos');

const serverOption = {
    headless: true,
    qrRefreshS: 20,
    qrTimeout: 0,
    authTimeout: 0,
    autoRefresh: true,
    devtools: false,
    cacheEnabled:false,
    chromiumArgs: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
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
        })
}

freedomurl = "https://i.ibb.co/6J9ST0d/IMG-20200731-WA0791.jpg"

async function msgHandler (client, message) {
    try {
        // console.log(message)
        const { type, body, from, t, sender, isGroupMsg, chat, groupMetadata, caption, isMedia, mimetype, quotedMsg } = message
        const { id, pushname } = sender
        const { name } = chat
	const pushnames = sender.pushname || chat.name || sender.verifiedName || '';	
        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        const commands = ['!sticker', '!stiker', '!hello','!info','!covid','!join','!lirik','!quotemaker','!help','!owner','!meme','!setPic','!add','!kick','!leave','!promote','!demote','!admin','!linkGrup','!revLinkGrup','!Seasonal anime','!neko','!wallpaper','Heave ho','Heave ho!','!quote','!quotes','!Quote','!weather','#Tod','!Pokemon','!waifu','!Waifu','!fb','!ytmp3','!ig','!gifSticker','!gifStiker']
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
                        client.reply(from, `Dasar ${pushname} bodoh!, yang mau dijadiin stiker apa? lu cuma send teks *!stiker*. kalo mau bikin stiker send foto dengan caption *!stiker*.`, message)
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
						 client.reply(from, 'Fitur ini hanya bisa digunakan oleh admin[owner]', message)
					    }
				    }
			    } else {
				    client.reply(from, 'Fitur ini hanya bisa di gunakan dalam grup', message)
			    }
		    break
                case '!hello':
                        client.reply(from, `Hello *${pushname}*, How can I help?`, message)
                    break
		case '#tod':
			client.sendImageAsStickerGif(from, 'https://i.imgur.com/31zUM5g.gif')
			client.sendRawWebpAsSticker(from, 'https://i.giphy.com/media/LMt9638dO8dftAjtco/200.webp')
			client.sendStickerfromUrl(from, 'https://media.tenor.com/images/62c4b269d97c2412c4f364945f62afae/tenor.gif', {method: 'get'})			
                    break
		/*case '!covid':
			const result = await kopit()
			client.sendText(from, kopit())
		    break*/
		case '!ytmp3':
			if (args.length >=2){
                        	const url = args[1]
                        	const result = await ytmp3(url)
				console.log(result)
                        	client.sendFileFromUrl(from, result , 'audio.mp3')
				//client.sendPtt(from, result, 'audio.mp3')
			}else{
				client.reply(from, 'usage:\n\n!ytmp3 https://youtu.be/6l5V3BWDcMw', message)
}
                    break
		case '!ig':
			await videoUrlLink.instagram.getInfo(args, async (error, info) => {
				if(error){
					client.reply(from, 'Keknya ada yang salah, coba lagi nanti', message)
					console.log(error)
				}else{
					const url = info.list[0].video ? info.list[0].video : info.list[0].image;
					await client.sendFileFromUrl(from, url)
				}
			})
		    break
		case '!lirik':
			if(args.length == 2){
                        	const lagu = args[1]
                        	const result = await liriklagu(lagu)
                        	client.sendText(from, result)
			}else{
				client.reply(from, 'usage:\n\n!lirik aku-bukan-boneka\n"-" = spasi', message)
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
				const inviteLink = await client.getGroupInviteLink(chat.id);
				client.sendLinkWithAutoPreview(from, inviteLink, `\nLink group *${name}*`)
}
		    break
		case '!owner':
			var owner = from.split('-')[0]
			client.sendText(from, `[${owner}]`)
		    break
		case '!add':
			if(isGroupMsg){
				if(args.length >=2){
					var wkwk = `${from.split('-')[0]}@c.us`
					if(message.author == wkwk || message.author == '6285892766102@c.us'){
						org = args[1]
						client.addParticipant(from,`${org}@c.us`)
					}else{
						client.reply(from, 'Fitur ini hanya bisa di pakai oleh admin[owner]', message)
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
						client.reply(from, 'Fitur ini hanya bisa di pakai oleh admin[owner]', message)
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
		case '!promote':
			if(isGroupMsg){
				if(args.length >=2){
					var wkwk = `${from.split('-')[0]}@c.us`
					if(message.author == wkwk || message.author == '6285892766102@c.us' ){
						prom = body.split('@')[1] || args[1]
						client.promoteParticipant(from,`${prom}@c.us`)
					}else{
						client.reply(from, 'Fitur ini hanya bisa di pakai oleh admin[owner]', message)
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
						client.reply(from, 'Fitur ini hanya bisa di pakai oleh admin[owner]', message)
					}
				}
			}else{
				client.reply(from, 'Fitur ini hanya bisa di gunakan dalam grup', message)
			}
		    break
		case '!revLinkGrup':
			if(isGroupMsg){
				try {
					await client.revokeGroupInviteLink(chat.id);
					//client.sendText(from, 'Tautan undangan berhasil di tarik')
				} catch (e) {
					client.reply(from, 'Sepertinya bot belum menjadi admin', message)
				}
}
		    break
		case '!join':
			if (args.length >=2) {
				const link = args[1]
				const invite = link.replace('https://chat.whatsapp.com/', '')
				if (link.match(/(https:\/\/chat.whatsapp.com)/gi)) {
					try {
						await client.inviteInfo(invite);
						await client.joinGroupViaLink(invite)
						client.reply(from, 'Otw join gan', message)
					} catch (e) {
						client.reply(from, 'Sepertinya link grup bermasalah', message)
					}
				} else {
					client.reply(from, 'Ini link????', message)
				}
}
		    break
                    
                case '!Waifu':
                case '!waifu': 
                        q8 = q2 = Math.floor(Math.random() * 98) + 10;
                        client.sendFileFromUrl(from, 'http://randomwaifu.altervista.org/images/00'+q8+'.png', 'Waifu.png', 'Korewa daredesu ka?')
                    break
                case 'Heave ho':
                case 'Heave ho!':
                        client.sendFileFromUrl(from, 'https://i.ibb.co/KjJx5ps/Whats-App-Image-2020-08-01-at-16-36-10.jpg','Soran.jpg','*Soran Soran*')
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
                       client.sendFileFromUrl(from, 'https://wallpaperaccess.com/download/anime-'+q4,'Anime.png','Here is your wallpaper')
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
                        client.sendText(from, `Hi *${pushname}*\n\nPerintah\n\n!sticker \nMengubah gambar ke stiker\n\n!neko\nMengirim gambar kucing acak\n\n!Pokemon\nMengirim gambar pokemon acak \n \n!wallpaper \nMengirim wallpaper anime acak (beta)\n\n!Seasonal anime \nMenampilkan daftar anime musiman\n\n!info \nMenampilkan syarat dan ketentuan\n\n!quote\nMengirim quotedd\n\n!waifu\nMengirim gambar anime \n\n!linkGrup\nMengambil tautan undangan grup, [ bot admin ]\n\n!revLinkGrup\nMencabut tautan undangan saat ini, [ bot admin ]\n\n!join https://chat.whatsapp.com/blablabla\nUntuk menambahkan bot ke grup anda\n\n!lirik aku-bukan-boneka\nMenampilkan lirik lagu aku bukan boneka\n\n!ytmp3 https://youtu.be/6l5V3BWDcMw\nMendownload mp3 dari YouTube\n\n[ Owner Only ]\n\n!add 628xxxx\nUntuk menambahkan member grup\n\n!kick @tag\nUntuk mengeluarkan member grup\n\n!promote @tag\nMenaikkan pangkat member menjadi admin\n\n!demote @tag\nMenurunkan pangkat admin menjadi member\n\n!setPic\nMengubah icon grup, kirim foto dengan caption !setPic`)
                    break
		case '!Seasonal anime':
                        client.sendText(from, 'Summer 2020 \n Re:Zero kara Hajimeru Isekai Seikatsu 2nd Season \n Yahari Ore no Seishun Love Comedy wa Machigatteiru. Kan \n The God of High School \n Sword Art Online: Alicization - War of Underworld 2nd Season \n Enen no Shouboutai: Ni no Shou \n Maou Gakuin no Futekigousha: Shijou Saikyou no Maou no Shiso, Tensei shite Shison-tachi no Gakkou e \n Kanojo, Okarishimasu \n Deca-Dence \n Uzaki-chan wa Asobitai! \n Monster Musume no Oishasan')
		    break
                case '!Thank you':
                        client.sendText(from, 'Whatever... *smiles*') 
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
