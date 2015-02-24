import requests
import json
class Search:
    def __init__(self):
        self.payload = {'type':'1','total':'true','offset':'0','hlpretag':'<span class="s-fc2">','hlposttag':'</span>'}
        self.cookies = {'__csrf':'caa1ce5c93b8914a827f906ef9c20a43','__remember_me':'true','os':'osx','appver':'1.1.1','MUSIC_U':'1cc97d057ccf647c3366bd5f0f2450cb4d96991c79424fe65b3c591763341851de9691db918ce8a5afe7f83c9412f8eaa70b41177f9edcea','deviceId':'C8AD4D82-2562-5766-8DEE-3C2564EFADDF%7C5A9BAAA8-B820-4A23-A375-24E647525B44','usertrack':'ezq0alTodCa9hgiGgqkoAg==','channel':'netease'}
        self.song={}
    def fetch(self,keyword,limit,isjson):
        self.payload['s']=keyword
        self.payload['limit']=limit
        self.r1=requests.post("http://music.163.com/api/search/pc",data=self.payload,cookies=self.cookies)
        if isjson==1:
            return self.r1.text
        self.url=json.loads(self.r1.text)['result']['songs'][0]['mp3Url']
        self.name=json.loads(self.r1.text)['result']['songs'][0]['bMusic']['name']
        self.song['url']=self.url
        self.song['name']=self.name
        return self.song
    