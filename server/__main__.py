import functools
import json
import serializer
import datetime
from peewee import *
from flask import Flask, request
from flask.ext.restful import Resource, Api
from bottle import get, run, response
import bottle_auth.database as auth
from bottle_auth.auth import *

# configure our database
DATABASE = {
    'name': 'example.db',
    'engine': 'peewee.SqliteDatabase',
}
DEBUG = True
SECRET_KEY = 'ssshhhh'

s = serializer.Serializer()
def jsonwrap(f):
    @functools.wraps(f)
    def wrapper(*args, **kwargs):
        print "wrapper"
        ret = f(*args, **kwargs)
        response.content_type = "application/json"
        if "query" in ret.__class__.__name__.lower():
            return json.dumps(s.serialize_query(ret))
        return json.dumps(s.serialize_object(ret))
    return wrapper


# instantiate the db wrapper
db = SqliteDatabase("test2.db")


class Note(Model):
    message = TextField()
    created = DateTimeField(default=datetime.datetime.now)


class NoteRes(Resource):
    @jsonwrap
    def get(self):
        n = Note.create(message = "AAAA")
        return n

class Notes(object):
    @get("/bottle/<text>")
    @jsonwrap
    @authorize(role = "kick")
    def bottlefunc(text):
        n = Note.create(message = text)
        return n

    @get("/bottle")
    @jsonwrap
    def bottlefunc():
        return Note.select()


if __name__ == '__main__':
    auth.initTables()
    auth.createTestData()
    run(port = 5001)
