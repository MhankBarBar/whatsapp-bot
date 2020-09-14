function help() {
    return `==========================
            Commands
=========================
➥ *!sticker*
Kirim gambar dengan caption *!sticker* atau tag gambar yang sudah dikirim

➥ *!neko*
Mengirim gambar kucing [ random ]

➥ *!pokemon*
Mengirim gambar pokemon [ random ]

➥ *!inu*
Mengirim gambar anjing [ random ]

➥ *!brainly [pertanyaan] [.jumlah]*
Menampilkan jawaban dari brainly

Contoh : *!brainly NKRI .3*

➥ *!tts [kode bhs] [teks]*
Convert Text to voice

contoh : *!tts id Halo*

➥ *!quotemaker |teks|wm|theme*

Contoh : *!quotemaker |Ya contoh|ya watermark|random*

➥ *!wallpaper*
Mengirim gambar wallpaper anime [ random ]

➥ *!info*
Menampilkan info bot ini

➥ *!SnK*
Menampilkan Syarat dan Ketentuan Bot ini

➥ *!quotes*
Quotes² random

➥ *!waifu*
Mengirim gambar anime waifu

➥ *!wait*
[ What Anime Is This ], kirim gambar dengan caption *!wait*

➥ *!meme*
Random meme anime

➥ *!join [link]*
Untuk menginvite bot ke group mu via group link

➥ *!lirik [title]*
Menampilkan lirik lagu

Contoh : *!lirik aku bukan boneka*

➥ *!ytmp3 [link]*
Mengunduh audio dari YouTube via link

Contoh : *!ytmp3 https://youtu.be/blablabla*

➥ *!ig [link]*
Mengunduh Video/Gambar dari Instagram via link

Contoh : *!ig https://www.instagram.com/p/CEcNz0GoA4o/?igshid=11k8kupfuug14*
=========================
Admin Group Only
=========================
➥ *!kick @tagmember*
Mengeluarkan member nakal yang ada di group mu

Note : Bot tidak bisa mengeluarkan admin/owner group!

➥ *!add [nomor]*
Menambahkan member di group mu

Contoh : *!add 62858xxxx*

➥ *!demote @tagadmin*
Menurunkan pangkat admin menjadi member

➥ *!promote @tagmember*
Menaikkan pangkat member menjadi admin

➥ *!leave*
Bot keluar dari group ini

➥ *!mentionAll* [ beta ]
Mention semua member group termasuk admin
========================
    Owner Group Only
========================
➥ *!kickAll*
Mengeluarkan semua member group!

Note : Admin group tidak terkena kick
========================
    Owner Bot Only
========================
➥ *!ban @tagTarget*
Banned user nakal, agar tidak bisa memakai bot
➥ *!unban @tagTarget*
Unbanned user nakal, agar bisa memakai bot kembali
➥ *!bc [teks]*
Broadcast
➥ *!leaveAll*
Keluar dari semua group!
➥ *!clearAll*
Menghapus semua chat
=========================
Untuk donasi anda bisa langsung kirim perintah *!donasi*, agar bot terus update dan aktif`
}
exports.help = help()
function info() {
    return `Bot ini di buat dengan bahasa pemrograman Node.js / JavaScript
Source kode bot : https://github.com/mhankbarbar/whatsapp-bot
Owner Bot : wa.me/6285892766102
Author? : Ada pokoknya om, malas pasang nama doang

Oh iya om, bot ini geratis ya, soalnya saya lihat banyak yang jual bot² kayak gini, tapi ini geratis kok.`
}
exports.info = info()
function snk() {
    return `Syarat dan Ketentuan Bot *Shinomiya Kaguya*
1. Teks dan nama pengguna WhatsApp anda akan kami simpan di dalam server selama bot aktif
2. Data anda akan di hapus ketika bot Offline
3. Kami tidak menyimpan gambar, video, file, audio, dan dokumen yang anda kirim
4. Kami tidak akan pernah meminta anda untuk memberikan informasi pribadi
5. Jika menemukan Bug/Error silahkan langsung lapor ke Owner bot
6. Apapun yang anda perintah pada bot ini, KAMI TIDAK AKAN BERTANGGUNG JAWAB!

Thanks !`
}
exports.snk = snk()
function donate() {
    return `Ya halo om.. Mau donate?
    
Kalo mau donate langsung ae ke :
OVO/PULSA : 085892766102
SAWERIA : https://saweria.co/donate/mhankbarbar

Thanks !`
}
exports.donate = donate()