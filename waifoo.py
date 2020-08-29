from bs4 import BeautifulSoup as bs
from requests import get
piw = '[\n'
for i in range(200):
        a = get('http://randomwaifu.altervista.org').text
        b = bs(a, 'html.parser')
        kata = b.find('p').text
        image = b.find('meta', attrs={'property': 'og:image'}).attrs.get('content')
        kya = '    {\n\t"teks": "%s",\n\t"image": "http://randomwaifu.altervista.org/%s"\n    },\n'%(kata,image)
        piw += kya
        print(kya)
piw += '\n]'
open('./lib/waifu.json','w').write(piw)