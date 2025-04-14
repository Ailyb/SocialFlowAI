from flask import Flask, render_template, request, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required
from celery import Celery
from decouple import config
import requests

app = Flask(__name__)
app.config['SECRET_KEY'] = config('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = config('DATABASE_URL')
app.config['CELERY_BROKER_URL'] = config('CELERY_BROKER_URL')
app.config['CELERY_RESULT_BACKEND'] = config('CELERY_RESULT_BACKEND')

db = SQLAlchemy(app)
login_manager = LoginManager(app)
celery = Celery(app.name, broker=app.config['CELERY_BROKER_URL'])
celery.conf.update(app.config)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True)
    subscription = db.Column(db.String, default='free')

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

from routes import *
if __name__ == '__main__':
    app.run(debug=True)