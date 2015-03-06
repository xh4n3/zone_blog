from mongoengine import *
import datetime

connect('blog')

class c_articles(Document):
    title = StringField(max_length=255, required=True)
    category = StringField(required=True)
    body = StringField(required=True)
    created_at = DateTimeField(default=datetime.datetime.now)
    comments = ListField(EmbeddedDocumentField('c_comment'))

class c_log(Document):
    action = StringField(required=True)
    detail = StringField(required=True)
    created_at = DateTimeField(default=datetime.datetime.now)

    
class c_comment(EmbeddedDocument):
    author = StringField(max_length=255, required=True)
    body = StringField(required=True)
    created_at = DateTimeField(default=datetime.datetime.now, required=True)