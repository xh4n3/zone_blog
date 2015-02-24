from flask import Flask,render_template
from flask import request,redirect
from pymongo import MongoClient
from search import Search
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/music")
def music():
    return render_template('music.html')

@app.route('/player', methods=['POST'])
def search():
    keyword = request.form['keyword']
    target=Search()
    if keyword == None:
        return "NONE"
    return render_template('player.html',song=target.fetch(keyword,1))

@app.route('/getjson', methods=['POST'])
def getjson():
    keyword = request.data
    para=json.loads(keyword)
    target=Search()
    if keyword == None:
        return "NONE"
    return target.fetch(para['keyword'],3,1) # keyword limit json

if __name__ == "__main__":
    app.run(debug=True)
    #app.run(host='0.0.0.0')


