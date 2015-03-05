from flask import Flask,render_template
from flask import request,redirect
from mongoengine import connect
from search import Search
from model import *
import datetime
import json
from bson import json_util

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/player', methods=['POST'])
def search():
    keyword = request.form['keyword']
    ross = User(email='ross@example.com', first_name=keyword, last_name='Lawley').save()
    for post in User.objects:
        print post.first_name
    target=Search()
    if keyword == None:
        return "NONE"
    return render_template('player.html',song=target.fetch(keyword,1,0))

@app.route('/search/json', methods=['POST'])
def search_json():
    keyword = request.data
    para=json.loads(keyword)['keyword']
    c_log('search',para).save()
    target=Search()
    if keyword == None:
        return "NONE"
    return target.fetch(para,3,1) # keyword limit isjson

@app.route('/post/json', methods=['GET'])
def post_json():
    return c_articles.objects.order_by('-created_at').all().to_json()

@app.route("/post/new")
def post():
    return render_template('post.html')

@app.route("/post/save", methods=['POST'])
def post_save():
    rawcontent = request.data
    content=json.loads(rawcontent)
    c_articles(content['title'],'heart',content['body']).save()
    return 'Success'


@app.route("/test")
def test():
    print c_log.objects.limit(5).to_json()
    return "hello"

if __name__ == "__main__":
    app.run(debug=True)
    #app.run(host='0.0.0.0')


