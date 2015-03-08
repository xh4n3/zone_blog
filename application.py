from flask import Flask,render_template
from flask import request,redirect,session,url_for
from mongoengine import connect
from search import Search
from model import *
import datetime
import json
import os
from bson import json_util

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/home')
def homepage():
    return render_template('homepage.html')

@app.route('/post/show')
def postshow():
    return render_template('postshow.html')

@app.route("/post/edit")
def postedit():
    return render_template('postedit.html')

@app.route("/admin")
def admin():
    return render_template('admin.html')

@app.route("/admin/index")
def admin_index():
    if 'admin' in session:
        return render_template('admin_index.html')
    return redirect(url_for('admin_login'))

@app.route("/admin/login",methods=['GET','POST'])
def admin_login():
    if request.method == 'POST':
        if request.form['username'] == 'admin':
            session['admin']='True'
        return redirect(url_for('admin'))
    return render_template('admin_login.html')

@app.route('/post/json', methods=['GET'])
def post_json():
    return c_articles.objects.order_by('-created_at').all().to_json()

@app.route('/post/<postid>')
def post_content(postid):
    return c_articles.objects(id=postid).all().to_json()

@app.route("/post/save", methods=['POST'])
def post_save():
    rawcontent = request.data
    content=json.loads(rawcontent)
    c_articles(content['title'],content['category'],content['body']).save()
    return 'Success'

@app.route("/post/save/<postid>", methods=['POST'])
def post_update(postid):
    rawcontent = request.data
    content=json.loads(rawcontent)
    c_articles.objects(id=postid).update(set__title=content['title'],set__category=content['category'],set__body=content['body'])
    return 'Post ' + postid + ' modified'

@app.route("/post/delete/<postid>")
def post_delete(postid):
    c_articles.objects(id=postid).first().delete()
    return 'Post ' + postid + ' deleted'

@app.route('/search/json', methods=['POST'])
def search_json():
    keyword = request.data
    para=json.loads(keyword)['keyword']
    c_log('search',para).save()
    target=Search()
    if keyword == None:
        return "NONE"
    return target.fetch(para,3,1) # keyword limit isjson

@app.route("/test")
def test():
    print c_log.objects.limit(5).to_json()
    return "hello"

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

if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True)


