const fs = require('fs-extra')

module.exports = welcome = async (client, event) => {
    //console.log(event.action)
    const welkom = JSON.parse(fs.readFileSync('./lib/welcome.json'))
    const isWelkom = welkom.includes(event.chat)
    try {
        if (event.action == 'add' && isWelkom) {
            const gChat = await client.getChatById(event.chat)
            const pChat = await client.getContact(event.who)
            const { contact, groupMetadata, name } = gChat
            const pepe = await client.getProfilePicFromServer(event.who)
            const capt = `Halo member baru👋, Welcome to group *${name}* selamat bergabung dan juga semoga betah disini.`
            if (pepe == '' || pepe == undefined) {
                await client.sendFileFromUrl(event.chat, 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU', 'profile.jpg', capt)
            } else {
                await client.sendFileFromUrl(event.chat, pepe, 'profile.jpg', capt)
            }

        }
    } catch (err) {
        console.log(err)
    }
}
