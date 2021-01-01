/ *
* "Wahai orang-orang yang beriman, mengapakah kamu mengatakan sesuatu yang tidak kamu kerjakan?
* Amat besar kebencian di sisi Allah bahwa kamu mengatakan apa-apa yang tidak kamu kerjakan. "
* (QS ash-Shaff: 2-3).
* /
const  { decryptMedia }  =  require ( '@ open-wa / wa-decrypt' )
const  fs  =  require ( 'fs-extra' )
const  axios  =  require ( 'axios' )
 momento  const =  requer ( 'fuso horário do momento' )
const  get  =  require ( 'got' )
const  fetch  =  require ( 'node-fetch' )
const  color  =  require ( './lib/color' )
const  { spawn , exec }  =  require ( 'child_process' )
const  nhentai  =  require ( 'nhentai-js' )
const  {  API  }  =  requer ( 'nhentai-api' )
const  { liriklagu , quotemaker , randomNimek , fb , sleep , jadwalTv , ss }  =  require ( './lib/functions' )
const  { help , snk , info , donate , readme , listChannel }  =  require ( './lib/help' )
const  { stdout }  =  requer ( 'processo' )
const  nsfw_  =  JSON . parse ( fs . readFileSync ( './lib/NSFW.json' ) )
const  welkom  =  JSON . parse ( fs . readFileSync ( './lib/welcome.json' ) )
const  { RemoveBgResult , removeBackgroundFromImageBase64 , removeBackgroundFromImageFile }  =  require ( 'remove.bg' )

momento . tz . setDefault ( 'Ásia / Jacarta' ) . locale ( 'id' )

módulo . exportações  =  msgHandler  =  async  ( cliente ,  mensagem )  =>  {
    tente  {
        const  { tipo , id , de , t , remetente , isGroupMsg , bate-papo , legenda , isMedia , mimetype , quotedMsg , quotedMsgObj , mentionedJidList }  =  mensagem
        deixe  { body }  =  mensagem
        const  { name , formattedTitle }  =  chat
        deixe  { pushname , verifiedName }  =  remetente
        pushname  =  pushname  ||  Verificado
         comandos  const =  legenda  ||  corpo  ||  ''
         comando  const =  comandos . toLowerCase ( ) . dividir ( '' ) [ 0 ]  ||  ''
        const  args  =   comandos . dividir ( '' )

        const  msgs  =  ( mensagem )  =>  {
            if  ( command . startsWith ( '!' ) )  {
                if  ( mensagem . comprimento > = 10 ) {
                    retornar  ` $ { mensagem . substr ( 0 ,  15 ) } `
                } else {
                    return  ` $ { message } `
                }
            }
        }

        const  mess  =  {
            espere : '[WAIT] Sedang di proses⏳ silahkan tunggu sebentar' ,
            erro : {
                St : '[❗] Envie fotos com legendas *! Sticker * ou tag de imagem que foi enviado' ,
                Qm : '[❗] Ocorreu um erro, talvez o tema não esteja disponível!' ,
                Yt3 : '[❗] Ocorreu um erro, não foi possível converter para mp3!' ,
                Yt4 : '[❗] Ocorreu um erro, talvez o erro tenha sido causado pelo sistema.' ,
                Ig : '[❗] Ocorreu um erro, talvez porque a conta seja privada' ,
                Ki : '[❗] O bot não pode emitir administradores de grupo!' ,
                Anúncio : '[❗] Incapaz de adicionar alvo, talvez porque é privado' ,
                Iv : '[❗] O link que você enviou não é válido!'
            }
        }
        const  apiKey  =  'API-KEY'  // apikey, você pode obtê-lo em https://mhankbarbars.herokuapp.com/api
         tempo  const =  momento ( t * 1000 ) . formato ( 'DD / MM HH: mm: ss' )
        const  botNumber  =  aguarda  cliente . getHostNumber ( )
        const  blockNumber  =  aguarda  cliente . getBlockedIds ( )
        const  groupId  =  isGroupMsg ? bate-papo . groupMetadata . id : ''
        const  groupAdmins  =  isGroupMsg ? aguardar  cliente . getGroupAdmins ( groupId ) : ''
        const  isGroupAdmins  =  isGroupMsg ? groupAdmins . inclui ( remetente . id ) : falso
        const  isBotGroupAdmins  =  isGroupMsg ? groupAdmins . inclui ( botNumber  +  '@ c.us' ) : false
        const  ownerNumber  =  [ "0556196333905@c.us" , "55xxxxx" ]  // substitua pelo seu número do Whatsapp
        const  isOwner  =  ownerNumber . inclui ( remetente . id )
        const  isBlocked  =  blockNumber . inclui ( remetente . id )
        const  isNsfw  =  isGroupMsg ? nsfw_ . inclui ( chat . id ) : falso
        const  uaOverride  =  'WhatsApp / 2.2029.4 Mozilla / 5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit / 537.36 (KHTML, como Gecko) Chrome / 83.0.4103.116 Safari / 537.36'
        const  isUrl  =  new  RegExp ( / https ?: \ / \ / ( www \. ) ? [ -a-zA-Z0-9 @:% ._ + ~ # = ] { 1,256 } \. [ a-zA-Z0 -9 () ] { 1,6 } \ b ( [ -a-zA-Z0-9 () @:% _ +. ~ #? & / = ] * ) / Gi )
        if  ( ! isGroupMsg  &&  command . startsWith ( '!' ) )  console . log ( '\ x1b [1; 31m ~ \ x1b [1; 37m>' ,  '[\ x1b [1; 32mEXEC \ x1b [1; 37m]' ,  tempo ,  cor ( msgs ( comando ) ) ,  'de' ,  cor (nome do usuário ) )
        if  ( isGroupMsg  &&  command . startsWith ( '!' ) )  console . log ( '\ x1b [1; 31m ~ \ x1b [1; 37m>' ,  '[\ x1b [1; 32mEXEC \ x1b [1; 37m]' ,  tempo ,  cor ( msgs ( comando ) ) ,  'de' ,  color ( pushname ) ,  'in' ,  color ( formattedTitle ) )
        // if (! isGroupMsg &&! command.startsWith ('!')) console.log ('\ x1b [1; 33m ~ \ x1b [1; 37m>', '[\ x1b [1; 31mMSG \ x1b [1 ; 37m] ', tempo, cor (corpo),' de ', cor (nome do usuário))
        // if (isGroupMsg &&! command.startsWith ('!')) console.log ('\ x1b [1; 33m ~ \ x1b [1; 37m>', '[\ x1b [1; 31mMSG \ x1b [1; 37m] ', tempo, cor (corpo),' de ', cor (nome do usuário),' em ', cor (titulo formatado))
        if  ( isBlocked )  return
        // if (! isOwner) return
        switch ( comando )  {
        caso  '! adesivo' :
        case  '! stiker' :
            if  ( isMedia  &&  type  ===  'imagem' )  {
                const  mediaData  =  Await  decryptMedia ( mensagem ,  uaOverride )
                const  imageBase64  =  `data: $ { mimetype } ; base64, $ { mediaData . toString ( 'base64' ) } `
                aguardar  cliente . sendImageAsSticker ( de ,  imageBase64 )
            }  else  if  ( quotedMsg  &&  quotedMsg . type  ==  'image' )  {
                const  mediaData  =  Await  decryptMedia ( quotedMsg ,  uaOverride )
                const  imageBase64  =  `data: $ { quotedMsg . mimetype } ; base64, $ { mediaData . toString ( 'base64' ) } `
                aguardar  cliente . sendImageAsSticker ( de ,  imageBase64 )
            }  else  if  ( args . length  ===  2 )  {
                 url  const =  args [ 1 ]
                if  ( url . match ( isUrl ) )  {
                    aguardar  cliente . sendStickerfromUrl ( from ,  url ,  {  método : 'get'  } )
                        . catch ( err  =>  console . log ( 'Exceção detectada:' ,  err ) )
                }  else  {
                    cliente . responder ( de ,  bagunça . erro . Iv ,  id )
                }
            }  else  {
                    cliente . responder ( de ,  bagunça . erro . St ,  id )
            }
            pausa
        case  '! stickergif' :
        case  '! stikergif' :
        case  '! sgif' :
            if  ( isMedia )  {
                if  ( mimetype  ===  'video / mp4'  &&  mensagem . duração  <  10  ||  mimetype  ===  'imagem / gif'  &&  mensagem . duração  <  10 )  {
                    const  mediaData  =  Await  decryptMedia ( mensagem ,  uaOverride )
                    cliente . responder ( de ,  '[ESPERE] Em andamento⏳ por favor aguarde ± 1 min!' ,  id )
                    const  filename  =  `./media/aswu. $ { mimetype . dividir ( '/' ) [ 1 ] } `
                    aguarde  fs . writeFileSync ( nome de arquivo ,  mediaData )
                    Await  exec ( `gify $ { nome } ./media/output.gif --fps = 30 --scale = 240: 240` ,  assíncrono  função  ( erro ,  stdout ,  stderr )  {
                        const  gif  =  espera  fs . readFileSync ( './media/output.gif' ,  {  codificação : "base64"  } )
                        aguardar  cliente . sendImageAsSticker ( de ,  `data: image / gif; base64, $ { gif . toString ( 'base64' ) } ` )
                    } )
                }  outro  (
                    cliente . responder ( de ,  '[❗] Kirim video dengan caption *! stickerGif * max 10 sec!' ,  id )
                )
            }
            pausa
	    case  '! stickernobg' :
        case  '! stikernobg' :
	    if  ( isMedia )  {
                tente  {
                    var  mediaData  =  Await  decryptMedia ( mensagem ,  uaOverride )
                    var  imageBase64  =  `data: $ { mimetype } ; base64, $ { mediaData . toString ( 'base64' ) } `
                    var  base64img  =  imageBase64
                    var  outFile  =  './media/img/noBg.png'
                    // untuk api key kalian bisa dapatkan pada website remove.bg
                    var  resultado  =  aguardam  removeBackgroundFromImageBase64 ( { base64img ,  apiKey : 'API-KEY' ,  tamanho : 'auto' ,  tipo : 'auto' , outFile } )
                    aguarde  fs . writeFile ( outFile ,  result . base64img )
                    aguardar  cliente . sendImageAsSticker ( from ,  `data: $ { mimetype } ; base64, $ { result . base64img } ` )
                }  catch ( errar )  {
                    console . log ( errar )
                }
            }
            pausa
        case  '! donasi' :
        case  '! donate' :
            cliente . sendLinkWithAutoPreview ( de ,  'https://saweria.co/donate/mhankbarbar' ,  doar )
            pausa
        case  '! tts' :
            if  ( args . length  ===  1 )  cliente de retorno  . responder ( de , 'Enviar pedidos *! tts [id, en, jp, ar] [teks] *, contoh *! tts id halo semua *' ) 
            const  ttsId  =  require ( 'node-gtts' ) ( 'id' )
            const  ttsEn  =  require ( 'node-gtts' ) ( 'en' )
	    const  ttsJp  =  require ( 'node-gtts' ) ( 'ja' )
            const  ttsAr  =  require ( 'node-gtts' ) ( 'ar' )
            const  dataText  =  body . fatia ( 8 )
            if  ( dataText  ===  '' )  cliente de retorno  . responder ( de , 'Baka?' , id )  
            if  ( dataText . length  >  500 )  retorna o  cliente . resposta ( de ,  'Teks terlalu panjang!' ,  id )
            var  dataBhs  =  corpo . fatia ( 5 ,  7 )
	        if  ( dataBhs  ==  'id' )  {
                ttsId . save ( './media/tts/resId.mp3' ,  dataText ,  function  ( )  {
                    cliente . sendPtt ( de ,  './media/tts/resId.mp3' ,  id )
                } )
            }  else  if  ( dataBhs  ==  'en' )  {
                ttsEn . save ( './media/tts/resEn.mp3' ,  dataText ,  function  ( )  {
                    cliente . sendPtt ( de ,  './media/tts/resEn.mp3' ,  id )
                } )
            }  else  if  ( dataBhs  ==  'jp' )  {
                ttsJp . save ( './media/tts/resJp.mp3' ,  dataText ,  function  ( )  {
                    cliente . sendPtt ( de ,  './media/tts/resJp.mp3' ,  id )
                } )
	    }  else  if  ( dataBhs  ==  'ar' )  {
                ttsAr . save ( './media/tts/resAr.mp3' ,  dataText ,  function  ( )  {
                    cliente . sendPtt ( de ,  './media/tts/resAr.mp3' ,  id )
                } )
            }  else  {
                cliente . responder ( de ,  'Insira os dados do idioma: [id] para a indonesia, [en] para a inggris, [jp] para a jepang, dan [ar] para a arabia' ,  id )
            }
            pausa
        case  '! nulis' :
            if  ( args . length  ===  1 )  cliente de retorno  . resposta ( de , 'Enviar pedidos *! nulis [teks] *' , id )  
            const  nulis  =  encodeURIComponent ( body . slice ( 7 ) )
            cliente . responder ( de ,  bagunçar . esperar ,  id )
            let  urlnulis  =  `https://mhankbarbars.herokuapp.com/nulis?text= $ { nulis } & apiKey = $ { apiKey } `
            aguardar  busca ( urlnulis ,  { método : "GET" } )
            . então ( res  =>  res . json ( ) )
            . então ( assíncrono  ( json )  =>  {
                aguardar  cliente . sendFileFromUrl ( from ,  json . result ,  'Nulis.jpg' ,  'Nih anjim' ,  id )
            } ) . catch ( e  =>  cliente . resposta ( de ,  "Erro:" +  e ) ) ;
            pausa
        case  '! ytmp3' :
            if  ( args . length  ===  1 )  cliente de retorno  . responder ( de , 'Enviar pedidos *! ytmp3 [linkYt] *, para 
exemplos por favor Enviar pedidos *! leia-me *' ) 
            let  isLinks  =  args [ 1 ] . corresponder ( / (?: https ?: \ / { 2 } ) ? (?: w { 3 } \. ) ? youtu (?: be ) ? \. (?: com | be ) (?: \ / watch \ ? v = | \ / ) ( [ ^ \ s & ] + ) / )
            if  ( ! isLinks )  retorna o  cliente . responder ( de ,  bagunça . erro . Iv ,  id )
            tente  {
                cliente . responder ( de ,  bagunçar . esperar ,  id )
                const  resp  =  espera  obter . get ( `https://mhankbarbars.herokuapp.com/api/yta?url= $ { args [ 1 ] } & apiKey = $ { apiKey } ` ) . json ( )
                if  ( resp . erro )  {
                    cliente . resposta ( de ,  erro resp . , id ) 
                }  else  {
                    const  { título , polegar , tamanho do arquivo , resultado }  =  aguardam  resp
                    if  ( Number ( filesize . split ( 'MB' ) [ 0 ] ) > = 30,00 )  cliente de retorno  . resposta ( de , 'Desculpe, a duração do vídeo excedeu o limite máximo!' , id )  
                    cliente . sendFileFromUrl ( from ,  thumb ,  'thumb.jpg' ,  `➸ * Title *: $ { title } \ n➸ * Filesize *: $ { filesize } \ n \ nPor favor aguarde um momento, o processo de entrega do arquivo leva alguns minutos.` ,  id )
                    aguardar  cliente . sendFileFromUrl ( de ,  resultado ,  ` $ { title } .mp3` ,  '' ,  id ) . catch ( ( )  =>  cliente . resposta ( de ,  bagunça . erro . Yt3 ,  id ) )
                    // aguarda client.sendAudio (de, resultado, id)
                }
            }  catch  ( errar )  {
                cliente . sendText ( ownerNumber [ 0 ] ,  'Erro ytmp3:' +  err )
                cliente . responder ( de ,  bagunça . erro . Yt3 ,  id )
            }
            pausa
        case  '! ytmp4' :
            if  ( args . length  ===  1 )  cliente de retorno  . responder ( de , 'Enviar pedidos *! ytmp4 [linkYt] *, para um exemplo por favor Enviar pedidos *! leia-me *' ) 
            let  isLin  =  args [ 1 ] . corresponder ( / (?: https ?: \ / { 2 } ) ? (?: w { 3 } \. ) ? youtu (?: be ) ? \. (?: com | be ) (?: \ / watch \ ? v = | \ / ) ( [ ^ \ s & ] + ) / )
            if  ( ! isLin )  cliente de retorno  . responder ( de , bagunça . erro . Iv , id )  
            tente  {
                cliente . responder ( de ,  bagunçar . esperar ,  id )
                const  ytv  =  espera  obter . get ( `https://mhankbarbars.herokuapp.com/api/ytv?url= $ { args [ 1 ] } & apiKey = $ { apiKey } ` ) . json ( )
                if  ( ytv . error )  {
                    cliente . responder ( de ,  ytv . erro ,  id )
                }  else  {
                    if  ( Number ( ytv . filesize . split ( 'MB' ) [ 0 ] )  >  40,00 )  cliente de retorno  . resposta ( de , 'Desculpe, a duração do vídeo excedeu o limite máximo!' , id )  
                    cliente . sendFileFromUrl ( de ,  ytv . thumb ,  'thumb.jpg' ,  `➸ * Título *: $ { ytv . title } \ n➸ * Tamanho do arquivo *: $ { ytv . tamanho do arquivo } \ n \ nSilahkan tunggu sebentar proses pengiriman arquivo membutuhkan waktu beberapa menit. ,  id )
                    aguardar  cliente . sendFileFromUrl ( from ,  ytv . result ,  ` $ { ytv . title } .mp4` ,  '' ,  id ) . catch ( ( )  =>  cliente . resposta ( de ,  bagunça . erro . Yt4 ,  id ) )
                }
            }  catch  ( er )  {
                cliente . sendText ( ownerNumber [ 0 ] ,  'Erro ytmp4:' +  er )
                cliente . responder ( de ,  bagunça . erro . Yt4 ,  id )
            }
            pausa
        caso  '! wiki' :
            if  ( args . length  ===  1 )  cliente de retorno  . responder ( de , 'Enviar pedidos *! wiki [consulta] * \ nContoh: *! wiki asu *' , id )  
            const  query_  =  body . fatia ( 6 )
            const  wiki  =  await  get . get ( `https://mhankbarbars.herokuapp.com/api/wiki?q= $ { query_ } & lang = id & apiKey = $ { apiKey } ` ) . json ( )
            if  ( wiki . erro )  {
                cliente . responder ( de ,  wiki . erro ,  id )
            }  else  {
                cliente . responder ( de ,  `➸ * Consulta *: $ { consulta_ } \ n \ n➸ * Resultado *: $ { wiki . resultado } ` ,  id )
            }
            pausa
        case  '! cuaca' :
            if  ( args . length  ===  1 )  cliente de retorno  . resposta ( de , 'Enviar pedidos *! cuaca [tempat] * \ nContoh: *! cuaca tangerang' , id )  
            const  tempat  =  corpo . fatia ( 7 )
             tempo  constante =  espera  obter . obter ( `https://mhankbarbars.herokuapp.com/api/cuaca?q= $ { tempat } & apiKey = $ { apiKey } ` ) . json ( )
            if  ( meteorologia . erro )  {
                cliente . resposta ( de ,  clima . erro ,  id )
            }  else  {
                cliente . reply ( from ,  `➸ Tempat: $ { weather . result . tempat } \ n \ n➸ Angin: $ { weather . result . angin } \ n➸ Cuaca: $ { weather . result . cuaca } \ n➸ Deskripsi: $ { clima . resultado . mesa } \ n➸ Kelembapan: $ { clima . resultado . kelembapan } \ n➸ Suhu: $ {clima . resultado . suhu } \ n➸ Udara: $ { clima . resultado . udara } `, id)
            }
            pausa
        case  '! fb' :
            if  ( args . length  ===  1 )  cliente de retorno  . responder ( de , 'Enviar pedidos *! fb [linkFb] * para um exemplo por favor Enviar pedidos *! readme *' , id )  
            if  ( ! args [ 1 ] . includes ( 'facebook.com' ) )  cliente de retorno  . responder ( de , bagunça . erro . Iv , id )  
            cliente . responder ( de ,  bagunçar . esperar ,  id )
            const  epbe  =  espera  obter . get ( `https://mhankbarbars.herokuapp.com/api/epbe?url= $ { args [ 1 ] } & apiKey = $ { apiKey } ` ) . json ( )
            se  ( erro epbe . ) retornar cliente . responder ( de , epbe . erro , id )    
            cliente . sendFileFromUrl ( de ,  epbe . resultado ,  'epbe.mp4' ,  epbe . título ,  id )
            pausa
        case  '! creator' :
            cliente . sendContact ( de ,  '6285892766102@c.us' )
            pausa
        case  '! ig' :
            if  ( args . length  ===  1 )  cliente de retorno  . responder ( de , 'Enviar pedidos *! ig [linkIg] * para um exemplo por favor Enviar pedidos *! readme *' ) 
            if  ( ! args [ 1 ] . match ( isUrl )  && ! args [ 1 ] . includes ( 'instagram.com' ) )  cliente de retorno  . responder ( de , bagunça . erro . Iv , id )  
            tente  {
                cliente . responder ( de ,  bagunçar . esperar ,  id )
                const  resp  =  espera  obter . get ( `https://mhankbarbars.herokuapp.com/api/ig?url= $ { args [ 1 ] } & apiKey = $ { apiKey } ` ) . json ( )
                if  ( resp . resultado . inclui ( '.mp4' ) )  {
                    var  ext  =  '.mp4'
                }  else  {
                    var  ext  =  '.jpg'
                }
                aguardar  cliente . sendFileFromUrl ( de ,  resp . resultado ,  `igeh $ { ext } ` ,  '' ,  id )
            }  catch  {
                cliente . responder ( de ,  bagunça . erro . Ig ,  id )
                }
            pausa
        case  '! nsfw' :
            if  ( ! isGroupMsg )  cliente de retorno  . responder ( de , 'Este comando só pode ser usado em grupos!!' , id )  
            if  ( ! isGroupAdmins )  retorna o  cliente . responder ( de ,  'Este comando só pode ser usado pelo Admin do grupo!' ,  id )
            if  ( args . length  ===  1 )  cliente de retorno  . responder ( de , 'Selecione ativar ou desativar!' , id )  
            if  ( args [ 1 ] . toLowerCase ( )  ===  'ativar' )  {
                nsfw_ . push ( chat . id )
                fs . writeFileSync ( './lib/NSFW.json' ,  JSON . stringify ( nsfw_ ) )
                cliente . responder ( de ,  'Comando NSWF ativado com sucesso neste grupo! Enviar pedidos *! nsfwMenu * untuk mengetahui menu' ,  id )
            }  else  if  ( args [ 1 ] . toLowerCase ( )  ===  'desativar' )  {
                nsfw_ . splice ( chat . id ,  1 )
                fs . writeFileSync ( './lib/NSFW.json' ,  JSON . stringify ( nsfw_ ) )
                cliente . resposta ( de ,  'NSFW Comando desativado com sucesso neste grupo!' ,  id )
            }  else  {
                cliente . responder ( de ,  'Selecione ativar ou desativar udin!' ,  id )
            }
            pausa
        case  '! bem-vindo' :
            if  ( ! isGroupMsg )  cliente de retorno  . responder ( de , 'Este comando só pode ser usado em grupos!!' , id )  
            if  ( ! isGroupAdmins )  retorna o  cliente . responder ( de ,  'Este comando só pode ser usado pelo Admin do grupo!' ,  id )
            if  ( args . length  ===  1 )  cliente de retorno  . responder ( de , 'Selecione ativar ou desativar!' , id )  
            if  ( args [ 1 ] . toLowerCase ( )  ===  'ativar' )  {
                welkom . push ( chat . id )
                fs . writeFileSync ( './lib/welcome.json' ,  JSON . stringify ( welkom ) )
                cliente . resposta ( de ,  'O recurso de boas-vindas foi ativado com sucesso neste grupo!' ,  id )
            }  else  if  ( args [ 1 ] . toLowerCase ( )  ===  'desativar' )  {
                welkom . splice ( chat . id ,  1 )
                fs . writeFileSync ( './lib/welcome.json' ,  JSON . stringify ( welkom ) )
                cliente . resposta ( de ,  'O recurso de boas-vindas foi desativado com sucesso neste grupo!' ,  id )
            }  else  {
                cliente . responder ( de ,  'Selecione ativar ou desativar udin!' ,  id )
            }
            pausa
        case  '! nsfwmenu' :
            if  ( ! isNsfw )  return
            cliente . responder ( de ,  '1.! randomHentai \ n2.! randomNsfwNeko' ,  id )
            pausa
        case  '! igstalk' :
            if  ( args . length  ===  1 )   cliente de retorno  . responder ( de , 'Enviar pedidos *! igStalk @ username * \ nConntoh *! igStalk @ duar_amjay *' , id )  
            const  stalk  =  await  get . get ( `https://mhankbarbars.herokuapp.com/api/stalk?username= $ { args [ 1 ] } & apiKey = $ { apiKey } ` ) . json ( )
            se  ( erro de stalk . ) retornar cliente . responder ( a partir , talo . erro , id )    
            const  { biográfica , Jumlah_Followers , Jumlah_Following , Jumlah_Post , Nome , Nome de usuário , Profile_pic }  =  caule
            const  caps  =  `➸ * Nama *: $ { Name } \ n➸ * Nome de usuário *: $ { Username } \ n➸ * Seguidores de Jumlah *: $ { Jumlah_Followers } \ n➸ * Seguindo Jumlah *: $ { Jumlah_Following } \ n ➸ * Jumlah Postingan *: $ { Jumlah_Post } \ n➸ * biográfica *: $ { biográfica } `
            aguardar  cliente . sendFileFromUrl ( de ,  Profile_pic ,  'Profile.jpg' ,  maiúsculas ,  id )
            pausa
        case  '! infogempa' :
            const  bmkg  =  aguarda  obter . get ( `https://mhankbarbars.herokuapp.com/api/infogempa?apiKey= $ { apiKey } ` ) . json ( )
            const  { potensi , koordinat , lokasi , kedalaman , magnitude , waktu , mapa }  =  bmkg
            const  hasil  =  `* $ { waktu } * \ n📍 * Lokasi *: * $ { lokasi } * \ n〽️ * Kedalaman *: * $ { kedalaman } * \ n💢 * Magnitude *: * $ { magnitude } * \ n🔘 * Potensi *: * $ { potensi } * \ n📍 * Koordinat *: * $ { koordinat } * `
            cliente . sendFileFromUrl ( from ,  map ,  'shakemap.jpg' ,  hasil ,  id )
            pausa
        caso  '! anime' :
            if  ( args . length  ===  1 )  cliente de retorno  . responder ( de , 'Enviar pedidos *! anime [consulta] * \ nContoh: *! anime querido no franxx *' , id )  
            const  animek  =  espera  obter . get ( `https://mhankbarbars.herokuapp.com/api/kuso?q= $ { body . slice ( 7 ) } & apiKey = $ { apiKey } ` ) . json ( )
            se  ( animek . erro )  retornar  cliente . responder ( de ,  animek . erro ,  id )
            const  res_animek  =  `Título: * $ { animek . título } * \ n \ n $ { animek . info } \ n \ nSinopsis: $ { animek . sinopsis } \ n \ nLink Download: \ n $ { animek . link_dl } `
            cliente . sendFileFromUrl ( de ,  animek . thumb ,  'kusonime.jpg' ,  res_animek ,  id )
            pausa
        case  '! nh' :
            // if (isGroupMsg) return client.reply (from, 'Desculpe, este comando apenas para bate-papo privado!', id)
            if  ( args . length  ===  2 )  {
                const  nuklir  =  corpo . dividir ( '' ) [ 1 ]
                cliente . responder ( de ,  bagunçar . esperar ,  id )
                const  cek  =  espera  nhentai . existe ( nuklir )
                if  ( cek  ===  true )   {
                    tente  {
                        const  api  =  new  API ( )
                        const  pic  =  aguarda  api . getBook ( nuklir ) . então ( livro  =>  {
                            return  api . getImageURL ( livro . cover )
                        } )
                        const  dojin  =  espera  nhentai . getDoujin ( nuklir )
                        const  { título , detalhes , link }  =  dojin
                        const  { paródias , tags , artistas , grupos , línguas , categorias }  =  aguardar  detalhes
                        var  teks  =  `* Título *: $ { title } \ n \ n * Paródias *: $ { paródias } \ n \ n * Tags *: $ { tags . join ( ',' ) } \ n \ n * Artistas *: $ { artistas . join ( ',' ) } \ n \ n * Grupos *: $ { grupos . join ( ',' ) } \ n \ n * Idiomas *: $ { languages . join ( ',' ) } \ n \ n * Categorias *: $ {categorias } \ n \ n * Link *: $ { link } `
                        // exec ('nhentai --id =' + nuklir + `-P mantap.pdf -o ./hentong/${nuklir}.pdf --format` + `$ {nuklir} .pdf`, (erro, stdout , stderr) => {
                        cliente . sendFileFromUrl ( from ,  pic ,  'hentod.jpg' ,  teks ,  id )
                            //client.sendFile(from, `./hentong / $ {nuklir} .pdf / $ {nuklir} .pdf.pdf`, então (() =>` $ {title} .pdf`, '', id) ) .catch (() => 
                            //client.sendFile(from, `./hentong / $ {nuklir} .pdf / $ {nuklir} .pdf.pdf`,` $ {title} .pdf`, '', id))
                            / * if (erro) {
                                console.log ('erro:' + erro.mensagem)
                                Retorna
                            }
                            if (stderr) {
                                console.log ('stderr:' + stderr)
                                Retorna
                            }
                            console.log ('stdout:' + stdout) * /
                            //})
                    }  catch  ( errar )  {
                        cliente . resposta ( de ,  '[❗] Algo deu errado, talvez o código nuclear esteja errado' ,  id )
                    }
                }  else  {
                    cliente . responder ( de ,  '[❗] Código nuClear incorreto!' )
                }
            }  else  {
                cliente . responder ( de ,  '[ERRADO] Enviar pedidos *! nh [nuClear] * por exemplo Enviar pedidos *! readme *' )
            }
        	pausa
        caso  '! brainly' :
            if  ( args . length > = 2 ) {
                const  BrainlySearch  =  require ( './lib/brainly' )
                deixe  tanya  =  corpo . fatia ( 9 )
                deixe  jum  =  Número ( tanya . split ( '.' ) [ 1 ] )  ||  2
                if  ( jum  >  10 )  cliente de retorno  . resposta ( de , 'Máx. 10!' , id )  
                if  ( Número ( tanya [ tanya . comprimento - 1 ] ) ) {
                    tanya
                }
                cliente . responder ( de ,  `➸ * Questão *: $ { tanya . split ( '.' ) [ 0 ] } \ n \ n➸ * Número de respostas *: $ { Number ( jum ) } ` ,  id )
                aguarde  BrainlySearch ( tanya . split ( '.' ) [ 0 ] , Número ( jum ) ,  função ( res ) {
                    res . forEach ( x => {
                        if  ( x . Responda . fotoResponda . comprimento  ==  0 )  {
                            cliente . responder ( de ,  `➸ * Questão *: $ { x . Questão } \ n \ n➸ * Responda *: $ { x . Responda . judulResponda } \ n` ,  id )
                        }  else  {
                            cliente . responder ( de ,  `➸ * Questão *: $ { x . Questão } \ n \ n➸ * Responda *: $ { x . Responda . judulResponda } \ n \ n➸ * Link foto Responda *: $ { x . Responda . fotoResponda . join ( '\ n' ) } ` ,  id )
                        }
                    } )
                } )
            }  else  {
                cliente . responder ( de ,  'Uso: \ n! brainly [Questão] [.jumlah] \ n \ nEx: \ n! brainly NKRI .2' ,  id )
            }
            pausa
        caso  '! espere' :
            if  ( isMedia  &&  type  ===  'imagem'  ||  quotedMsg  &&  quotedMsg . type  ===  'imagem' )  {
                if  ( isMedia )  {
                    var  mediaData  =  Await  decryptMedia ( mensagem ,  uaOverride )
                }  else  {
                    var  mediaData  =  Await  decryptMedia ( quotedMsg ,  uaOverride )
                }
                const  fetch  =  require ( 'node-fetch' )
                const  imgBS4  =  `data: $ { mimetype } ; base64, $ { mediaData . toString ( 'base64' ) } `
                cliente . responder ( de ,  'Pesquisando ....' ,  id )
                fetch ( 'https://trace.moe/api/search' ,  {
                    método : 'POST' ,
                    corpo : JSON . stringify ( {  image : imgBS4  } ) ,
                    cabeçalhos : {  "Content-Type" : "application / json"  }
                } )
                . então ( respon  =>  respon . json ( ) )
                . então ( resolt  =>  {
                	if  ( resolt . docs  &&  resolt . docs . length <= 0 )  {
                		cliente . resposta ( de ,  'Desculpe, não sei que anime é esse :(' ,  id )
                	}
                    const  { is_adult , title , title_chinese , title_romaji , title_english , episódio , similarity , filename , at , tokenthumb , anilist_id }  =  resolt . docs [ 0 ]
                    teks  =  ''
                    if  ( similaridade  <  0,92 )  {
                    	teks  =  '* Eu tenho pouca fé nisso *: \ n \ n'
                    }
                    teks  + =  `➸ * Título em japonês *: $ { title } \ n➸ * Título em chinês *: $ { title_chinese } \ n➸ * Título Romaji *: $ { title_romaji } \ n➸ * Título em inglês *: $ { title_english } \ n`
                    teks  + =  `➸ * Ecchi *: $ { is_adult } \ n`
                    teks  + =  `➸ * Eps *: $ { episódio . toString ( ) } \ n`
                    teks  + =  `➸ * Kesamaan *: $ { ( similaridade * 100 ) . toFixed ( 1 ) } % \ n`
                    var  video  =  `https://media.trace.moe/video/ $ { anilist_id } / $ { encodeURIComponent ( filename ) } ? t = $ { at } & token = $ { tokenthumb } ` ;
                    cliente . sendFileFromUrl ( de ,  vídeo ,  'nimek.mp4' ,  teks ,  id ) . catch ( ( )  =>  {
                        cliente . responder ( de ,  teks ,  id )
                    } )
                } )
                . catch ( ( )  =>  {
                    cliente . responder ( de ,  'Erro!' ,  id )
                } )
            }  else  {
                cliente . sendFile ( from ,  './media/img/tutod.jpg' ,  'Tutor.jpg' ,  'Aqui está um exemplo mhank!' ,  id )
            }
            pausa
        case  '! quotemaker' :
            arg  =  corpo . trim ( ) . dividir ( '|' )
            if  ( arg . comprimento > = 4 )  {
                cliente . responder ( de ,  bagunçar . esperar ,  id )
                 citações  const =  encodeURIComponent ( arg [ 1 ] )
                 autor  const =  encodeURIComponent ( arg [ 2 ] )
                const  theme  =  encodeURIComponent ( arg [ 3 ] )
                aguarde o  quotemaker ( citações ,  autor ,  tema ) . então ( amsu  =>  {
                    cliente . sendFile ( from ,  amsu ,  'quotesmaker.jpg' , 'neh ...' ) . catch ( ( )  =>  {
                       cliente . responder ( de ,  bagunça . erro . Qm ,  id )
                    } )
                } )
            }  else  {
                cliente . responder ( de ,  'Uso: \ n! quotemaker | teks | marca d'água | tema \ n \ nEx: \ n! quotemaker | ini contoh | bicit | aleatório' ,  id )
            }
            pausa
        caso  '! grupo de links' :
            if  ( ! isBotGroupAdmins )  retorna o  cliente . resposta ( de ,  'Este comando só pode ser usado quando o bot se torna administrador' ,  id )
            if  ( isGroupMsg )  {
                const  inviteLink  =  espera o  cliente . getGroupInviteLink ( groupId ) ;
                cliente . sendLinkWithAutoPreview ( de ,  inviteLink ,  `\ nLink group * $ { name } *` )
            }  else  {
            	cliente . responder ( de ,  'Este comando só pode ser usado em grupos!!' ,  id )
            }
            pausa
        case  '! bc' :
            if  ( ! isOwner )  retorna o  cliente . responder ( de ,  'Este comando é apenas para bots Proprietários!' ,  id )
            deixe  msg  =  corpo . fatia ( 4 )
            const  chatz  =  espera  cliente . getAllChatIds ( )
            para  ( deixe  ids  de  chatz )  {
                var  cvk  =  espera  cliente . getChatById ( ids )
                if  ( ! cvk . isReadOnly )  aguarda o  cliente . sendText ( ids ,  `[Shinomiya Kaguya BOT Broadcast] \ n \ n $ { msg } ` )
            }
            cliente . responder ( de ,  'Transmissão bem-sucedida!' ,  id )
            pausa
        case  '! adminlist' :
            if  ( ! isGroupMsg )  cliente de retorno  . responder ( de , 'Este comando só pode ser usado em grupos!!' , id )  
            deixe  mimin  =  ''
            para  ( vamos  advertir  de  groupAdmins )  {
                mimin  + =  `➸ @ $ { admon . substituir ( /@c.us/g ,  '' ) } \ n` 
            }
            aguardar  cliente . sendTextWithMentions ( de ,  mimin )
            pausa
        case  '! ownergroup' :
            if  ( ! isGroupMsg )  cliente de retorno  . responder ( de , 'Este comando só pode ser usado em grupos!!' , id )  
            const  Owner_  =  chat . groupMetadata . proprietário
            aguardar  cliente . sendTextWithMentions ( de ,  `Grupo de proprietários: @ $ { Owner_ } ` )
            pausa
        caso  '! mencionar tudo' :
            if  ( ! isGroupMsg )  cliente de retorno  . responder ( de , 'Este comando só pode ser usado em grupos!!' , id )  
            if  ( ! isGroupAdmins )  retorna o  cliente . responder ( de ,  'Este comando só pode ser usado pelo Admin do grupo' ,  id )
            const  groupMem  =  espera  cliente . getGroupMembers ( groupId )
            deixe  hehe  =  '╔══✪〘 Mencionar Todos 〙✪══ \ n'
            para  ( deixar  i  =  0 ;  i  <  groupMem . comprimento ;  i ++ )  {
                hehe  + =  '╠➥'
                hehe  + =  `@ $ { groupMem [ i ] . id . substituir ( /@c.us/g ,  '' ) } \ n`
            }
            hehe  + =  '╚═〘 Shinomiya Kaguya BOT〙'
            aguardar  cliente . sendTextWithMentions ( de ,  hehe )
            pausa
        case  '! kickall' :
            if  ( ! isGroupMsg )  cliente de retorno  . responder ( de , 'Este comando só pode ser usado em grupos!!' , id )  
            const  isGroupOwner  =  remetente . id  ===  chat . groupMetadata . proprietário
            if  ( ! isGroupOwner )  cliente de retorno  . responder ( de , 'Este comando só pode ser usado por proprietários do grupo' , id )  
            if  ( ! isBotGroupAdmins )  retorna o  cliente . resposta ( de ,  'Este comando só pode ser usado quando o bot se torna administrador' ,  id )
            const  allMem  =  espera  cliente . getGroupMembers ( groupId )
            para  ( deixe  i  =  0 ;  i  <  allMem . length ;  i ++ )  {
                if  ( groupAdmins . includes ( allMem [ i ] . id ) )  {
                    console . log ( 'Upss, este é o grupo de administração' )
                }  else  {
                    aguardar  cliente . removeParticipant ( groupId ,  allMem [ i ] . id )
                }
            }
            cliente . resposta ( de ,  'Sucesso no kick de todos os membros' ,  id )
            pausa
        case  '! leaveall' :
            if  ( ! isOwner )  retorna o  cliente . responder ( de ,  'Este comando é apenas para o  Proprietário do bot' ,  id )
            const  allChats  =  espera  cliente . getAllChatIds ( )
            const  allGroups  =  aguarda  cliente . getAllGroups ( )
            para  ( deixe  gclist  de  allGroups )  {
                aguardar  cliente . sendText ( gclist . contact . id ,  `Desculpe, o bot está limpando,  chat total  ativo: $ { allChats . length } ` )
                aguardar  cliente . leaveGroup ( gclist . contact . id )
            }
            cliente . responder ( de ,  'Sucesso ao sair de todo o grupo!' ,  id )
            pausa
        case  '! clearall' :
            if  ( ! isOwner )  retorna o  cliente . responder ( de ,  'Este comando é apenas para o  Proprietário do bot' ,  id )
            const  allChatz  =  espera  cliente . getAllChats ( )
            para  ( deixe  dchat  de  allChatz )  {
                aguardar  cliente . deleteChat ( dchat . id )
            }
            cliente . responder ( de ,  'Sucesso em limpar todo o chat!' ,  id )
            pausa
        caso  '! add' :
            const  orang  =  args [ 1 ]
            if  ( ! isGroupMsg )  cliente de retorno  . resposta ( de , 'Este recurso só pode ser usado em grupos' , id )  
            if  ( args . length  ===  1 )  cliente de retorno  . responder ( de , 'Para usar este recurso, Enviar pedidos *! add * 628xxxxx' , id )  
            if  ( ! isGroupAdmins )  retorna o  cliente . responder ( de ,  'Este comando só pode ser usado pelo Admin do grupo' ,  id )
            if  ( ! isBotGroupAdmins )  retorna o  cliente . resposta ( de ,  'Este comando só pode ser usado quando o bot se torna administrador' ,  id )
            tente  {
                aguardar  cliente . addParticipant ( from , ` $ { orang } @ c.us` )
            }  catch  {
                cliente . responder ( de ,  bagunça . erro . Anúncio ,  id )
            }
            pausa
        case  '! kick' :
            if  ( ! isGroupMsg )  cliente de retorno  . resposta ( de , 'Este recurso só pode ser usado em grupos' , id )  
            if  ( ! isGroupAdmins )  retorna o  cliente . responder ( de ,  'Este comando só pode ser usado pelo Admin do grupo' ,  id )
            if  ( ! isBotGroupAdmins )  retorna o  cliente . resposta ( de ,  'Este comando só pode ser usado quando o bot se torna administrador' ,  id )
            if  ( postedJidList . length  ===  0 )  cliente de retorno  . responder ( de , 'Para usar este comando, Enviar pedidos *! kick * @tagmember' , id )  
            aguardar  cliente . SendText ( a partir ,  `pedidos recebidos, emitidos: \ n $ { mentionedJidList . juntar-se ( '\ n' ) } ` )
            para  ( deixe  i  =  0 ;  i  <  mencionadoJidList . comprimento ;  i ++ )  {
                se  ( groupAdmins . inclui ( mentionedJidList [ i ] ) )  return  cliente . responder ( de ,  bagunça . erro . Ki ,  id )
                aguardar  cliente . removeParticipant ( groupId ,  mentionedJidList [ i ] )
            }
            pausa
        case  '! leave' :
            if  ( ! isGroupMsg )  cliente de retorno  . resposta ( de , 'Este comando só pode ser usado em grupos!' , id )  
            if  ( ! isGroupAdmins )  retorna o  cliente . responder ( de ,  'Este comando só pode ser usado pelo Admin do grupo' ,  id )
            aguardar  cliente . sendText ( de , 'Sayonara' ) . então ( ( )  =>  cliente . leaveGroup ( groupId ) )
            pausa
        caso  '! promova' :
            if  ( ! isGroupMsg )  cliente de retorno  . resposta ( de , 'Este recurso só pode ser usado em grupos' , id )  
            if  ( ! isGroupAdmins )  retorna o  cliente . responder ( de ,  'Este recurso só pode ser usado por administradores de grupo' ,  id )
            if  ( ! isBotGroupAdmins )  retorna o  cliente . resposta ( de ,  'Este recurso só pode ser usado quando o bot é um administrador' ,  id )
            if  ( postedJidList . length  ===  0 )  cliente de retorno  . responder ( de , 'Para usar este recurso, Enviar pedidos *! promover * @tagmember' , id )  
            if  ( postedJidList . length > = 2 )  cliente de retorno  . responder ( de , 'Desculpe, este comando só pode ser usado em 1 usuário.' , id )  
            se  ( groupAdmins . inclui ( mentionedJidList [ 0 ] ) )  return  cliente . responder ( de ,  'Desculpe, o usuário já é um administrador.' ,  id )
            aguardar  cliente . promovaParticipante ( groupId ,  mencionadoJidList [ 0 ] )
            aguardar  cliente . sendTextWithMentions ( de ,  `Pedidos aceitos, adicionados @ $ { mentionedJidList [ 0 ] } como admin.` )
            pausa
        case  '! demote' :
            if  ( ! isGroupMsg )  cliente de retorno  . resposta ( de , 'Este recurso só pode ser usado em grupos' , id )  
            if  ( ! isGroupAdmins )  retorna o  cliente . responder ( de ,  'Este recurso só pode ser usado por administradores de grupo' ,  id )
            if  ( ! isBotGroupAdmins )  retorna o  cliente . resposta ( de ,  'Este recurso só pode ser usado quando o bot é um administrador' ,  id )
            if  ( postedJidList . length  ===  0 )  cliente de retorno  . responder ( de , 'Para usar este recurso, Enviar pedidos *! demote * @tagadmin' , id )  
            if  ( postedJidList . length > = 2 )  cliente de retorno  . resposta ( de , 'Desculpe, este comando só pode ser usado em 1 orang.' , id )  
            se  ( ! groupAdmins . inclui ( mentionedJidList [ 0 ] ) )  return  cliente . responder ( de ,  'Desculpe, o usuário não é um administrador.' ,  id )
            aguardar  cliente . demoteParticipant ( groupId ,  mentionedJidList [ 0 ] )
            aguardar  cliente . sendTextWithMentions ( a partir ,  `Pedido recebido, excluir posição @ $ { mentionedJidList [ 0 ] } .` )
            pausa
        case  '! join' :
            // return client.reply (from, 'Se você quiser convidar bots para o seu grupo, dê permissão para wa.me/6285892766102', id)
            if  ( args . length  <  2 )  cliente de retorno  . responder ( de , 'Enviar pedidos *! juntar chave de grupo de links * \ n \ nEx: \ n! entrar https://chat.whatsapp.com/blablablablablabla abcde \ nuntuk chave kamu bisa mendapatkannya hanya dengan donasi 5k' , id )  
             link  const =  args [ 1 ]
             chave  const =  args [ 2 ]
            const  tGr  =  espera  cliente . getAllGroups ( )
            const  minMem  =  30
            const  isLink  =  link . corresponder ( / ( https: \ / \ / chat.whatsapp.com ) / gi )
            if  ( key ! == 'lGjYt4zA5SQlTDx9z9Ca' )  cliente de retorno  . responder ( de , '* chave * errado! converse com o proprietário do bot para obter uma chave válida' , id )  
            const  verificar  =  esperar  cliente . inviteInfo ( link )
            if  ( ! isLink )  retorna o  cliente . responder ( de ,  'Este é um link? 👊🤬' ,  id )
            if  ( tGr . comprimento  >  15 )  cliente de retorno  . responder ( de , 'Desculpe, o número de grupos é máximo!' , id )  
            se  ( verifique . tamanho  <  minMem )  cliente de retorno  . resposta ( de , 'Grupo de membros não exceda 30, o bot não pode entrar' , id )  
            if  ( verificar . status  ===  200 )  {
                aguardar  cliente . joinGroupViaLink ( link ) . then ( ( )  =>  cliente . responder ( de ,  'O bot chegará em breve!' ) )
            }  else  {
                cliente . resposta ( de ,  'Grupo de links tidak válido!' ,  id )
            }
            pausa
        case  '! delete' :
            if  ( ! isGroupMsg )  cliente de retorno  . resposta ( de , 'Este recurso só pode ser usado em grupos' , id )  
            if  ( ! isGroupAdmins )  retorna o  cliente . responder ( de ,  'Este recurso só pode ser usado por administradores de grupo' ,  id )
            if  ( ! quotedMsg )  cliente de retorno  . responder ( de , 'Errado !!, Enviar pedidos *! delete [tagpesanbot] *' , id )  
            if  ( ! quotedMsgObj . fromMe )  cliente de retorno  . responder ( de , 'Errado !!, usuário de bate-papo do Bot não pode deletar lista!' , id )  
            cliente . deleteMessage ( quotedMsgObj . chatId ,  quotedMsgObj . id ,  falsa )
            pausa
        case  '! getses' :
            const  sesPic  =  aguarda  cliente . getSnapshot ( )
            cliente . sendFile ( de ,  sesPic ,  'session.png' ,  'Neh ...' ,  id )
            pausa
        case  '! lirik' :
            if  ( args . length  ==  1 )  cliente de retorno  . resposta ( de , 'Enviar pedidos *! lirik [opcional] *, contoh *! lirik Eu não sou uma boneca *' , id )  
            const  lagu  =  body . fatia ( 7 )
            const  lirik  =  espera  liriklagu ( lagu )
            cliente . responder ( de ,  letra ,  id )
            pausa
        case  '! chord' :
            if  ( args . length  ===  1 )  cliente de retorno  . responder ( de , 'Enviar pedidos *! chord [consulta] *, contoh *! chord Eu não sou uma boneca *' , id )  
            const  query__  =  body . fatia ( 7 )
            const  chord  =  await  get . get ( `https://mhankbarbar.herokuapp.com/api/chord?q= $ { query__ } & apiKey = $ { apiKey } ` ) . json ( )
             cliente de retorno if ( chord . error )  . responder ( de , chord . erro , id )   
            cliente . responder ( de ,  acorde . resultado ,  id )
            pausa
        case  '! listdaerah' :
            const  listDaerah  =  aguardam  get ( 'https://mhankbarbar.herokuapp.com/daerah' ) . json ( )
            cliente . responder ( de ,  listDaerah . resultado ,  id )
            pausa
        case  '! listblock' :
            let  hih  =  `Esta é a lista de números bloqueados \ nTotal: $ { blockNumber . comprimento } \ n`
            para  ( deixe  i  de  blockNumber )  {
                hih  + =  `➸ @ $ { i . substituir ( /@c.us/g , '' ) } \ n`
            }
            cliente . sendTextWithMentions ( from ,  hih ,  id )
            pausa
        case  '! jadwalshalat' :
            if  ( args . length  ===  1 )  cliente de retorno  . responder ( de , '[❗] Enviar pedidos *! jadwalShalat [daerah] * \ ncontoh: *! jadwalShalat Tangerang * \ nUntuk list daerah Enviar pedidos *! listDaerah *' ) 
            const  daerah  =  corpo . fatia ( 14 )
            const  jadwalShalat  =  aguarda  obter . get ( `https://mhankbarbars.herokuapp.com/api/jadwalshalat?daerah= $ { daerah } & apiKey = $ { apiKey } ` ) . json ( )
            if  ( erro jadwalShalat . ) retornar cliente . responder ( de , jadwalShalat . erro , id )    
            const  { Imsyak , Subuh , Dhuha , Dzuhur , Ashar , Magrebe , Isya }  =  Await  jadwalShalat
            arrbulan  =  [ "Januari" , "Februari" , "Maret" , "abril" , "Mei" , "Juni" , "Juli" , "Agustus" , "setembro" , "outubro" , "novembro" , "Desember" ] ;
            tgl  =  nova  data ( ) . getDate ( )
            bln  =  nova  data ( ) . getMonth ( )
            thn  =  nova  data ( ) . getFullYear ( )
            const  resultJadwal  =  `Jadwal shalat di $ { daerah } , $ { tgl } - $ { arrbulan [ bln ] } - $ { thn } \ n \ nImsyak: $ { Imsyak } \ nSubuh: $ { Subuh } \ nDhuha: $ { Dhuha } \ nDzuhur: $ { Dzuhur } \ nAshar: $ { Ashar } \ nMaghrib: $ { Maghrib } \ nIsya: $ { Isya} `
            cliente . responder ( de ,  resultJadwal ,  id )
            pausa
        case  '! listchannel' :
            cliente . responder ( de ,  listChannel ,  id )
            pausa
        case  '! jadwaltv' :
            if  ( args . length  ===  1 )  cliente de retorno  . responder ( de , 'Enviar pedidos *! jadwalTv [canal] *' , id )  
            const  query  =  body . fatia ( 10 ) . toLowerCase ( )
            const  Jadwal  =  Await  jadwalTv ( query )
            cliente . responder ( de ,  jadwal ,  id )
            pausa
        case  '! jadwaltvnow' :
            const  jadwalNow  =  esperar  obter . get ( 'https://api.haipbis.xyz/jadwaltvnow' ) . json ( )
            cliente . responder ( de ,  `Jam: $ { jadwalNow . jam } \ n \ nJadwalTV: $ { jadwalNow . jadwalTV } ` ,  id )
            pausa
        case  '! loli' :
            const  loli  =  espera  obter . get ( 'https://mhankbarbars.herokuapp.com/api/randomloli' ) . json ( )
            cliente . sendFileFromUrl ( from ,  loli . result ,  'loli.jpeg' ,  'Lolinya om' ,  id )
            pausa
        case  '! waifu' :
            const  waifu  =  espera  obter . get ( `https://mhankbarbars.herokuapp.com/api/waifu?apiKey= $ { apiKey } ` ) . json ( )
            cliente . sendFileFromUrl ( de ,  waifu . image ,  'Waifu.jpg' ,  `➸ Nome: $ { waifu . name } \ n➸ Descrição: $ { waifu . desc } \ n \ n➸ Fonte: $ { waifu . source } ` ,  id )
            pausa
        case  '! husbu' :
            const  diti  =  fs . readFileSync ( './lib/husbu.json' )
            const  ditiJsin  =  JSON . analisar ( diti )
            const  rindIndix  =  Math . floor ( Math . random ( ) * ditiJsin . length )
            const  rindKiy  =  ditiJsin [ rindIndix ]
            cliente . sendFileFromUrl ( from ,  rindKiy . image ,  'Husbu.jpg' ,  rindKiy . teks ,  id )
            pausa
        case  '! randomhentai' :
            if  ( isGroupMsg )  {
                if  ( ! isNsfw )  cliente de retorno  . resposta ( de , 'Command / O comando NSFW não foi ativado neste grupo!' , id )  
                const  Hentai  =  Await  randomNimek ( 'hentai' )
                if  ( hentai . endsWith ( '.png' ) )  {
                    var  ext  =  '.png'
                }  else  {
                    var  ext  =  '.jpg'
                }
                cliente . sendFileFromUrl ( de ,  hentai ,  `Hentai $ { ext } ` ,  'Hentai!' ,  id )
                pausa
            }  else  {
                const  Hentai  =  Await  randomNimek ( 'hentai' )
                if  ( hentai . endsWith ( '.png' ) )  {
                    var  ext  =  '.png'
                }  else  {
                    var  ext  =  '.jpg'
                }
                cliente . sendFileFromUrl ( de ,  hentai ,  `Hentai $ { ext } ` ,  'Hentai!' ,  id )
            }
        case  '! randomnsfwneko' :
            if  ( isGroupMsg )  {
                if  ( ! isNsfw )  cliente de retorno  . resposta ( de , 'Command / O comando NSFW não foi ativado neste grupo!' , id )  
                const  nsfwneko  =  Await  randomNimek ( 'nsfw' )
                if  ( nsfwneko . endsWith ( '.png' ) )  {
                    var  ext  =  '.png'
                }  else  {
                    var  ext  =  '.jpg'
                }
                cliente . sendFileFromUrl ( de ,  nsfwneko ,  `nsfwNeko $ { ext } ` ,  'Nsfwneko!' ,  id )
            }  else  {
                const  nsfwneko  =  Await  randomNimek ( 'nsfw' )
                if  ( nsfwneko . endsWith ( '.png' ) )  {
                    var  ext  =  '.png'
                }  else  {
                    var  ext  =  '.jpg'
                }
                cliente . sendFileFromUrl ( de ,  nsfwneko ,  `nsfwNeko $ { ext } ` ,  'Nsfwneko!' ,  id )
            }
            pausa
        case  '! randomnekonime' :
            const  nekonime  =  espera  obter . get ( 'https://mhankbarbars.herokuapp.com/api/nekonime' ) . json ( )
            if  ( nekonime . result . endsWith ( '.png' ) )  {
                var  ext  =  '.png'
            }  else  {
                var  ext  =  '.jpg'
            }
            cliente . sendFileFromUrl ( de ,  nekonime . result ,  `Nekonime $ { ext } ` ,  'Nekonime!' ,  id )
            pausa
        case  '! randomtrapnime' :
            const  armadilha  =  aguardam  randomNimek ( 'armadilha' )
            if  ( trap . endsWith ( '.png' ) )  {
                var  ext  =  '.png'
            }  else  {
                var  ext  =  '.jpg'
            }
            cliente . sendFileFromUrl ( from ,  trap ,  `trapnime $ { ext } ` ,  'Trapnime!' ,  id )
            pausa
        case  '! randomanime' :
            const  nime  =  aguardam  randomNimek ( 'anime' )
            if  ( nime . endsWith ( '.png' ) )  {
                var  ext  =  '.png'
            }  else  {
                var  ext  =  '.jpg'
            }
            cliente . sendFileFromUrl ( de ,  nime ,  `Randomanime $ { ext } ` ,  'Randomanime!' ,  id )
            pausa
        case  '! inu' :
            const  lista  =  [ "https://cdn.shibe.online/shibes/247d0ac978c9de9d9b66d72dbdc65f2dac64781d.jpg" , "https://cdn.shibe.online/shibes/1cf322acb7d74308995b04ea5eae7b520e0eae76.jpg" , "https://cdn.shibe.online /shibes/1ce955c3e49ae437dab68c09cf45297d68773adf.jpg " "https://cdn.shibe.online/shibes/ec02bee661a797518d37098ab9ad0c02da0b05c3.jpg" , "https://cdn.shibe.online/shibes/1e6102253b51fbc116b887e3d3cde7b5c5083542.jpg" , " https: // CDN .shibe.online / shibes / f0c07a7205d95577861eee382b4c8899ac620351.jpg " , " https://cdn.shibe.online/shibes/3eaf3b7427e2d375f09fc883f94fa8a6d4178a0a.jpg " ,"https://cdn.shibe.online/shibes/c8b9fcfde23aee8d179c4c6f34d34fa41dfaffbf.jpg","https://cdn.shibe.online/shibes/55f298bc16017ed0aeae952031f0972b31c959cb.jpg","https://cdn.shibe.online/shibes/2d5dfe2b0170d5de6c8bc8a24b8ad72449fbf6f6.jpg","https://cdn.shibe.online/shibes/e9437de45e7cddd7d6c13299255e06f0f1d40918.jpg","https://cdn.shibe.online/shibes/6c32141a0d5d089971d99e51fd74207ff10751e7.jpg","https://cdn.shibe.online/shibes/028056c9f23ff40bc749a95cc7da7a4bb734e908.jpg","https://cdn.shibe.online/shibes/4fb0c8b74dbc7653e75ec1da597f0e7ac95fe788.jpg","https://cdn.shibe.online/shibes/125563d2ab4e520aaf27214483e765db9147dcb3.jpg","https://cdn.shibe.online/shibes/ea5258fad62cebe1fedcd8ec95776d6a9447698c.jpg","https://cdn.shibe.online/shibes/5ef2c83c2917e2f944910cb4a9a9b441d135f875.jpg","https://cdn.shibe.online/shibes/6d124364f02944300ae4f927b181733390edf64e.jpg","https://cdn.shibe.online/shibes/92213f0c406787acd4be252edb5e27c7e4f7a430.jpg","https://cdn.shibe.online/shibes/40fda0fd3d329be0d92dd7e436faa80db13c5017.jpg","https://cdn.shibe.online/shibes/e5c085fc427528fee7d4c3935ff4cd79af834a82.jpg","https://cdn.shibe.online/shibes/f83fa32c0da893163321b5cccab024172ddbade1.jpg","https://cdn.shibe.online/shibes/4aa2459b7f411919bf8df1991fa114e47b802957.jpg","https://cdn.shibe.online/shibes/2ef54e174f13e6aa21bb8be3c7aec2fdac6a442f.jpg","https://cdn.shibe.online/shibes/fa97547e670f23440608f333f8ec382a75ba5d94.jpg","https://cdn.shibe.online/shibes/fb1b7150ed8eb4ffa3b0e61ba47546dd6ee7d0dc.jpg","https://cdn.shibe.online/shibes/abf9fb41d914140a75d8bf8e05e4049e0a966c68.jpg","https://cdn.shibe.online/shibes/f63e3abe54c71cc0d0c567ebe8bce198589ae145.jpg","https://cdn.shibe.online/shibes/4c27b7b2395a5d051b00691cc4195ef286abf9e1.jpg","https://cdn.shibe.online/shibes/00df02e302eac0676bb03f41f4adf2b32418bac8.jpg","https://cdn.shibe.online/shibes/4deaac9baec39e8a93889a84257338ebb89eca50.jpg","https://cdn.shibe.online/shibes/199f8513d34901b0b20a33758e6ee2d768634ebb.jpg","https://cdn.shibe.online/shibes/f3efbf7a77e5797a72997869e8e2eaa9efcdceb5.jpg","https://cdn.shibe.online/shibes/39a20ccc9cdc17ea27f08643b019734453016e68.jpg","https://cdn.shibe.online/shibes/e67dea458b62cf3daa4b1e2b53a25405760af478.jpg","https://cdn.shibe.online/shibes/0a892f6554c18c8bcdab4ef7adec1387c76c6812.jpg","https://cdn.shibe.online/shibes/1b479987674c9b503f32e96e3a6aeca350a07ade.jpg","https://cdn.shibe.online/shibes/0c80fc00d82e09d593669d7cce9e273024ba7db9.jpg","https://cdn.shibe.online/shibes/bbc066183e87457b3143f71121fc9eebc40bf054.jpg","https://cdn.shibe.online/shibes/0932bf77f115057c7308ef70c3de1de7f8e7c646.jpg","https://cdn.shibe.online/shibes/9c87e6bb0f3dc938ce4c453eee176f24636440e0.jpg","https://cdn.shibe.online/shibes/0af1bcb0b13edf5e9b773e34e54dfceec8fa5849.jpg","https://cdn.shibe.online/shibes/32cf3f6eac4673d2e00f7360753c3f48ed53c650.jpg","https://cdn.shibe.online/shibes/af94d8eeb0f06a0fa06f090f404e3bbe86967949.jpg","https://cdn.shibe.online/shibes/4b55e826553b173c04c6f17aca8b0d2042d309fb.jpg","https://cdn.shibe.online/shibes/a0e53593393b6c724956f9abe0abb112f7506b7b.jpg","https://cdn.shibe.online/shibes/7eba25846f69b01ec04de1cae9fed4b45c203e87.jpg","https://cdn.shibe.online/shibes/fec6620d74bcb17b210e2cedca72547a332030d0.jpg","https://cdn.shibe.online/shibes/26cf6be03456a2609963d8fcf52cc3746fcb222c.jpg","https://cdn.shibe.online/shibes/c41b5da03ad74b08b7919afc6caf2dd345b3e591.jpg","https://cdn.shibe.online/shibes/7a9997f817ccdabac11d1f51fac563242658d654.jpg","https://cdn.shibe.online/shibes/7221241bad7da783c3c4d84cfedbeb21b9e4deea.jpg","https://cdn.shibe.online/shibes/283829584e6425421059c57d001c91b9dc86f33b.jpg","https://cdn.shibe.online/shibes/5145c9d3c3603c9e626585cce8cffdfcac081b31.jpg","https://cdn.shibe.online/shibes/b359c891e39994af83cf45738b28e499cb8ffe74.jpg","https://cdn.shibe.online/shibes/0b77f74a5d9afaa4b5094b28a6f3ee60efcb3874.jpg","https://cdn.shibe.online/shibes/adccfdf7d4d3332186c62ed8eb254a49b889c6f9.jpg","https://cdn.shibe.online/shibes/3aac69180f777512d5dabd33b09f531b7a845331.jpg","https://cdn.shibe.online/shibes/1d25e4f592db83039585fa480676687861498db8.jpg","https://cdn.shibe.online/shibes/d8349a2436420cf5a89a0010e91bf8dfbdd9d1cc.jpg","https://cdn.shibe.online/shibes/eb465ef1906dccd215e7a243b146c19e1af66c67.jpg","https://cdn.shibe.online/shibes/3d14e3c32863195869e7a8ba22229f457780008b.jpg","https://cdn.shibe.online/shibes/79cedc1a08302056f9819f39dcdf8eb4209551a3.jpg","https://cdn.shibe.online/shibes/4440aa827f88c04baa9c946f72fc688a34173581.jpg","https://cdn.shibe.online/shibes/94ea4a2d4b9cb852e9c1ff599f6a4acfa41a0c55.jpg","https://cdn.shibe.online/shibes/f4478196e441aef0ada61bbebe96ac9a573b2e5d.jpg","https://cdn.shibe.online/shibes/96d4db7c073526a35c626fc7518800586fd4ce67.jpg","https://cdn.shibe.online/shibes/196f3ed10ee98557328c7b5db98ac4a539224927.jpg","https://cdn.shibe.online/shibes/d12b07349029ca015d555849bcbd564d8b69fdbf.jpg","https://cdn.shibe.online/shibes/80fba84353000476400a9849da045611a590c79f.jpg","https://cdn.shibe.online/shibes/94cb90933e179375608c5c58b3d8658ef136ad3c.jpg","https://cdn.shibe.online/shibes/8447e67b5d622ef0593485316b0c87940a0ef435.jpg","https://cdn.shibe.online/shibes/c39a1d83ad44d2427fc8090298c1062d1d849f7e.jpg","https://cdn.shibe.online/shibes/6f38b9b5b8dbf187f6e3313d6e7583ec3b942472.jpg","https://cdn.shibe.online/shibes/81a2cbb9a91c6b1d55dcc702cd3f9cfd9a111cae.jpg","https://cdn.shibe.online/shibes/f1f6ed56c814bd939645138b8e195ff392dfd799.jpg","https://cdn.shibe.online/shibes/204a4c43cfad1cdc1b76cccb4b9a6dcb4a5246d8.jpg","https://cdn.shibe.online/shibes/9f34919b6154a88afc7d001c9d5f79b2e465806f.jpg","https://cdn.shibe.online/shibes/6f556a64a4885186331747c432c4ef4820620d14.jpg","https://cdn.shibe.online/shibes/bbd18ae7aaf976f745bc3dff46b49641313c26a9.jpg","https://cdn.shibe.online/shibes/6a2b286a28183267fca2200d7c677eba73b1217d.jpg","https://cdn.shibe.online/shibes/06767701966ed64fa7eff2d8d9e018e9f10487ee.jpg","https://cdn.shibe.online/shibes/7aafa4880b15b8f75d916b31485458b4a8d96815.jpg","https://cdn.shibe.online/shibes/b501169755bcf5c1eca874ab116a2802b6e51a2e.jpg","https://cdn.shibe.online/shibes/a8989bad101f35cf94213f17968c33c3031c16fc.jpg","https://cdn.shibe.online/shibes/f5d78feb3baa0835056f15ff9ced8e3c32bb07e8.jpg","https://cdn.shibe.online/shibes/75db0c76e86fbcf81d3946104c619a7950e62783.jpg","https://cdn.shibe.online/shibes/8ac387d1b252595bbd0723a1995f17405386b794.jpg","https://cdn.shibe.online/shibes/4379491ef4662faa178f791cc592b52653fb24b3.jpg","https://cdn.shibe.online/shibes/4caeee5f80add8c3db9990663a356e4eec12fc0a.jpg","https://cdn.shibe.online/shibes/99ef30ea8bb6064129da36e5673649e957cc76c0.jpg","https://cdn.shibe.online/shibes/aeac6a5b0a07a00fba0ba953af27734d2361fc10.jpg","https://cdn.shibe.online/shibes/9a217cfa377cc50dd8465d251731be05559b2142.jpg","https://cdn.shibe.online/shibes/65f6047d8e1d247af353532db018b08a928fd62a.jpg","https://cdn.shibe.online/shibes/fcead395cbf330b02978f9463ac125074ac87ab4.jpg","https://cdn.shibe.online/shibes/79451dc808a3a73f99c339f485c2bde833380af0.jpg" , "https://cdn.shibe.online/shibes/bedf90869797983017f764165a5d97a630b7054b.jpg" , "https://cdn.shibe.online/shibes/dd20e5801badd797513729a3645c502ae4629247 .jpg" , "https://cdn.shibe.online/shibes/88361ee50b544cb1623cb259bcf07b9850183e65.jpg" , "https://cdn.shibe.online/shibes/0ebcfd98e8aa61c048968cb37f66a2b5d9d54d4b.jpg" ]
            vamos  kya  =  listar [ Math . floor ( Math . random ( ) * list . length ) ]
            cliente . sendFileFromUrl ( de ,  kya ,  'Dog.jpeg' ,  'Inu' )
            pausa
        case  '! neko' :
            q2  =  matemática . chão ( matemática . aleatório ( ) * 900 )  +  300 ;
            q3  =  Matemática . chão ( matemática . aleatório ( ) * 900 )  +  300 ;
            cliente . sendFileFromUrl ( de ,  'http://placekitten.com/' + q3 + '/' + q2 ,  'neko.png' , 'Neko' )
            pausa
        case  '! sendto' :
            cliente . sendFile ( de ,  './msgHndlr.js' ,  'msgHndlr.js' )
            pausa
        case  '! url2img' :
            const  _query  =  body . fatia ( 9 )
            if  ( ! _query . match ( isUrl ) )  cliente de retorno  . responder ( de , bagunça . erro . Iv , id )  
            if  ( args . length  ===  1 )  cliente de retorno  . responder ( de , 'Enviar pedidos *! url2img [web] * \ nContoh *! url2img https: //google.com*' , id )  
            const  url2img  =  espera  obter . get ( `https://mhankbarbar.herokuapp.com/api/url2image?url= $ { _query } & apiKey = $ { apiKey } ` ) . json ( )
            se  ( erro url2img . ) retornar cliente . responder ( de , url2img . erro , id )    
            cliente . sendFileFromUrl ( de ,  url2img . resultado ,  'kyaa.jpg' ,  nulo ,  id )
            pausa
        case  '! quote' :
        caso  '! aspas' :
             citações  const =  esperar  obter . get ( 'https://mhankbarbars.herokuapp.com/api/randomquotes' ) . json ( )
            cliente . responder ( de ,  `➸ * Quotes *: $ { quotes . quotes } \ n➸ * Author *: $ { quotes . author } ` ,  id )
            pausa
        case  '! quotesnime' :
            const  skya  =  espera  obter . get ( 'https://mhankbarbars.herokuapp.com/api/quotesnime/random' ) . json ( )
            skya_  =  skya . dados
            cliente . responder ( de ,  `➸ * Citações *: $ { skya_ . quote } \ n➸ * Personagem *: $ { skya_ . character } \ n➸ * Anime *: $ { skya_ . anime } ` ,  id )
            pausa
        case  '! meme' :
             resposta  const =  esperar  axios . get ( 'https://meme-api.herokuapp.com/gimme/wholesomeanimemes' ) ;
            const  { postlink , título , subreddit , url , nsfw , spoiler }  =  resposta . dados
            cliente . sendFileFromUrl ( de ,  ` $ { url } ` ,  'meme.jpg' ,  ` $ { title } ` )
            pausa
        case  '! help' :
            cliente . sendText ( de ,  ajuda )
            pausa
        case  '! readme' :
            cliente . responder ( de ,  leia-me ,  id )
            pausa
        caso  '! info' :
            cliente . sendLinkWithAutoPreview ( de ,  'Levy lindo' ,  informações )
            pausa
        case  '! snk' :
            cliente . responder ( de ,  snk ,  id )
            pausa
        }
    }  catch  ( errar )  {
        console . log ( cor ( '[ERROR]' ,  'vermelho' ) ,  err )
        //client.kill().then(a => console.log (a))
    }
}
