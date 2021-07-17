const { create, Client } = require('@open-wa/wa-automate')
const welcome = require('./lib/welcome')
const msgHandler = require('./msgHndlr')
const options = require('./options')

const start = async (client = new Client()) => {
        console.log('[SERVER] Server Started!')
        // Force it to keep the current session
        client.onStateChanged((state) => {
            console.log('[Client State]', state)
            if (state === 'CONFLICT' || state === 'UNLAUNCHED') client.forceRefocus()
        })
        // listening on message
        client.onMessage((async (message) => {
            client.getAmountOfLoadedMessages()
            .then((msg) => {
                if (msg >= 3000) {
                    client.cutMsgCache()
                }
            })
            msgHandler(client, message)
        }))

        client.onGlobalParticipantsChanged((async (heuh) => {
            await welcome(client, heuh)
            //left(client, heuh)
            }))
        
        client.onAddedToGroup(((chat) => {
            let totalMem = chat.groupMetadata.participants.length
            if (totalMem < 30) { 
            	client.sendText(chat.id, `Os membros são apenas ${totalMem}, se você quiser convidar o bot, o número mínimo de membros é 30`).then(() => client.leaveGroup(chat.id)).then(() => client.deleteChat(chat.id))
            } else {
                client.sendText(chat.groupMetadata.id, `Olá membros do grupo * $ {chat.contact.name} obrigado por convidar este bot, para ver o menu envie /mv`)
            }
        }))

        /*client.onAck((x => {
            const { from, to, ack } = x
            if (x !== 3) client.sendSeen(to)
        }))*/

        // listening on Incoming Call
        client.onIncomingCall(( async (call) => {
            await client.sendText(call.peerJid, 'Não consigo receber chamadas. Ligou novamente= bock!')
            .then(() => client.contactBlock(call.peerJid))
        }))
    }

create(options(true, start))
    .then(client => start(client))
    .catch((error) => console.log(error))
