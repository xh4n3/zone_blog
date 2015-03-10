#!/usr/bin/python
# -*- coding: utf-8 -*-

from flask import Flask, render_template
from flask import send_from_directory
from flask import request, redirect, session, url_for
from mongoengine import connect
from search import Search
from model import *
import datetime
import time
import json
import os
from bson import json_util
from werkzeug import secure_filename

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


@app.route('/post/edit')
def postedit():
    return render_template('postedit.html')


@app.route('/admin')
def admin():
    return render_template('admin.html')


@app.route('/admin/index')
def admin_index():
    if 'admin' in session:
        return render_template('admin_index.html')
    return redirect(url_for('admin_login'))


@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        if request.form['username'] == 'admin':  # password
            session['admin'] = 'True'
        return redirect(url_for('admin'))
    return render_template('admin_login.html')


@app.route('/admin/logout')
def admin_logout():
    session.pop('admin', None)
    return redirect(url_for('index'))


@app.route('/post/json', methods=['GET'])
def post_json():
    return c_articles.objects(lock='green unlock'
                              ).order_by('-created_at').all().to_json()


@app.route('/post/<postid>')
def post_content(postid):
    return c_articles.objects(id=postid).all().to_json()


@app.route('/post/list', methods=['GET'])
def post_list():
    return c_articles.objects().order_by('-created_at').all().to_json()


@app.route('/post/save', methods=['POST'])
def post_save():
    rawcontent = request.data
    content = json.loads(rawcontent)

    c_articles(content['title'], content['category'], content['body'],
               'green unlock').save()
    return 'Success'


@app.route('/post/save/<postid>', methods=['POST'])
def post_update(postid):
    rawcontent = request.data
    content = json.loads(rawcontent)
    c_articles.objects(id=postid).update(set__title=content['title'],
            set__category=content['category'], set__body=content['body'
            ])
    return 'Post ' + postid + ' modified'

@app.route('/post/upload', methods=['GET', 'POST'])
def post_upload():
    if request.method == 'POST':
        file = request.files['file']
        if file and '.' in file.filename and file.filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS:
            filename = str(int(time.time()*100))+'.'+file.filename.rsplit('.', 1)[1]
            print filename
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return app.config['UPLOAD_FOLDER']+'/'+filename
    return '''
    <form action="" method=post enctype=multipart/form-data>
      <p><input type=file name=file>
         <input type=submit value=Upload>
    </form>
    '''

@app.route('/post/delete/<postid>')
def post_delete(postid):
    c_articles.objects(id=postid).first().delete()
    return 'Post ' + postid + ' deleted'


@app.route('/post/lock/<postid>')
def post_lock(postid):
    c_articles.objects(id=postid).first().update(set__lock='black lock')
    return 'success'


@app.route('/post/unlock/<postid>')
def post_unlock(postid):
    c_articles.objects(id=postid).first().update(set__lock='green unlock'
            )
    return 'success'


@app.route('/search/json', methods=['POST'])
def search_json():
    keyword = request.data
    para = json.loads(keyword)['keyword']
    c_log('search', para).save()
    target = Search()
    if keyword == None:
        return 'NONE'
    return target.fetch(para, 3, 1)  # keyword limit isjson


if __name__ == '__main__':
    UPLOAD_FOLDER = './uploads'
    ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    app.secret_key = os.urandom(24)
    app.run(debug=True)

