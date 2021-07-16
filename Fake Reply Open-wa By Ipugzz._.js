//SCRIPT FAKE REPLY OPEN-WA

//BIKIN 3 FILE JSON, ISI FILE []
//LETAK FILE TERSERAH

//FILE 1, NAMA FILE nomer.JSON
//FILE 2, NAMA FILE pesanatas.json
//FILE 3, NAMA FILE pbawah.json

//TARUH DIATAS 	switch(command)
	let lnomerb = JSON.parse(fs.readFileSync('./LETAK FILE/nomer.json'))
	let ltatas = JSON.parse(fs.readFileSync('./LETAK FILE/pesanatas.json'))
	let ltbawah = JSON.parse(fs.readFileSync('./LETAK FILE/pbawah.json'))
	if(message.body == `${ltatas}`){
    	client.reply(lnomerb, `${ltbawah}`, message.id)
    	client.reply(from, `Berhasil Mengirim Fake Reply`, message.id)
    	console.log("Berhasil Mengirim Fake Reply")
	}

//CASE BUAT TEXT FAKE REPLY
		case 'uptext':
            argosm = body.trim().split('/')
            if (argosm.length >= 4) {
                const tnomer = argosm[1]
                const tbatas = argosm[2]
                const tbbawah = argosm[3]
            const nomerb = [`${tnomer}@c.us`]
            const patasb = [`${tbatas}`]
            const bwahb = [`${tbbawah}`]
            fs.writeFileSync('./LETAK FILE/nomer.json', JSON.stringify(nomerb));
            fs.writeFileSync('./LETAK FILE/pesanatas.json', JSON.stringify(patasb));
            fs.writeFileSync('./LETAK FILE/pbawah.json', JSON.stringify(bwahb));
            client.reply(from, `Berhasil Menambahkan Text`, message.id)
            }
            break

//CARA PERINTAH BOT
//KIRIM TEXT PESANATAS 
//MISAL PAS MERINTAH #uptext /62xxx/gue habis coli/lah ngaku
//NAH KIRIM PESAN YANG TENGAH " gue habis coli "
//SI BOT BAKAL NGIRIM FAKE REPLY KE TARGET VIA PRIVATE CHAT XIXIXI

//BY Ipungzz._
