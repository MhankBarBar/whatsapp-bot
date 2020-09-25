const { create } = require('@open-wa/wa-automate')
const msgHandler = require('./msgHndlr')
const serverOption = {
    headless: false,
    cacheEnabled: false,
    useChrome: false,
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

const opsys = process.platform
if (opsys === 'win32' || opsys === 'win64') {
    serverOption.executablePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
} else if (opsys === 'linux') {
    serverOption.browserRevision = '737027'
} else if (opsys === 'darwin') {
    serverOption.executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
}

const startServer = async (client) => {
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

        /*client.onGlobalParicipantsChanged((x) => {
            const { action, who , chat} = x
            const groupPic = client.getProfilePicFromServer(chat.id)
            const { desc } = chat.groupMetadata
            console.log(x)
            console.log(chat.id)
            console.log(chat.groupMetadata)
            if (action === 'add') return client.sendFileFromUrl(chat, groupPic, 'groupPic.jpg', `Halo New Member!, selamat datang di group ${chat.name}, Jangan lupa intro dan juga baca desk:)`)
            if (action === 'remove') return client.sendText(chat.id, 'Member group left detected!')
        })*/
        
        client.onAddedToGroup((chat) => {
            let totalMem = chat.groupMetadata.participants.length
            if (totalMem < 30) { 
            	client.sendText(chat.id, `Cih member nya cuma ${totalMem}, Kalo mau invite bot, minimal jumlah mem ada 30`).then(() => client.leaveGroup(chat.id))
            	client.deleteChat(chat.id)
            } else {
                client.sendText(chat.groupMetadata.id, `Halo warga grup *${chat.contact.name}* terimakasih sudah menginvite bot ini, untuk melihat menu silahkan kirim *!help*`)
            }
        })

        // listening on Incoming Call
        client.onIncomingCall((call) => {
            client.sendText(call.peerJid, 'Maaf, saya tidak bisa menerima panggilan. nelfon = block!')
            client.contactBlock(call.peerJid)
            //ban.push(call.peerJid)
            //fs.writeFileSync('./lib/banned.json', JSON.stringify(ban))
        })
    }

create('barbar', serverOption)
    .then(async (client) => startServer(client))
    .catch((error) => console.log(error))
