const { create, Client } = require('@open-wa/wa-automate')
const msgHandler = require('./msgHndlr')
const options = require('./options')

const start = (client = new Client()) => {
        console.log('[SERVER] Server Started!')
        // Force it to keep the current session
        client.onStateChanged((state) => {
                console.log('[Client State]', state)
                if (state === 'CONFLICT') client.forceRefocus()
                if (state === 'UNLAUNCHED') client.forceRefocus()
        })
        // listening on message
        client.onMessage( async (message) => {
            client.getAmountOfLoadedMessages()
                .then((msg) => {
                    if (msg >= 3000) {
                        console.log('[CLIENT]', `Loaded Message Reach ${msg}, cuting message cache...`)
                        client.cutMsgCache()
                    }
                })
            await msgHandler(client, message)
        })

        
        client.onAddedToGroup((async (chat) => {
            let totalMem = await chat.groupMetadata.participants.length
            if (totalMem < 30) { 
            	client.sendText(chat.id, `Cih member nya cuma ${totalMem}, Kalo mau invite bot, minimal jumlah mem ada 30`).then(() => client.leaveGroup(chat.id)).then(() => client.deleteChat(chat.id))
            } else {
                client.sendText(chat.groupMetadata.id, `Halo warga grup *${chat.contact.name}* terimakasih sudah menginvite bot ini, untuk melihat menu silahkan kirim *!help*`)
            }
        }))

        client.onAck((x => {
            const { from, to, ack } = x
            if (x !== 3) client.sendSeen(to)
        }))

        // listening on Incoming Call
        client.onIncomingCall(( async (call) => {
            await client.sendText(call.peerJid, 'Maaf, saya tidak bisa menerima panggilan. nelfon = block!')
            .then(() => client.contactBlock(call.peerJid))
        }))
    }

create('BarBar', options(true, start))
    .then(async client => await start(client))
    .catch((error) => console.log(error))