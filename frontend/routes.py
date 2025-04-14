from flask import render_template, request, redirect, url_for
from app import app, db, login_user
import requests

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dashboard', methods=['GET', 'POST'])
def dashboard():
    if request.method == 'POST':
        preferences = {
            'platform': request.form['platform'],
            'tone': request.form['tone'],
            'niche': request.form['niche'],
            'keywords': request.form['keywords'].split(','),
            'max_length': int(request.form['max_length'])
        }
        response = requests.post(
            'http://backend:8000/generate',
            json=preferences,
            headers={'X-API-Key': config('API_KEY')}
        ).json()
        return render_template('preview.html', post=response)
    return render_template('dashboard.html')

@app.route('/post/<platform>', methods=['POST'])
def post(platform):
    post = request.form['post']
    image = request.form['image']
    requests.post(
        f'http://backend:8000/post/{platform}',
        json={'text': post, 'image_url': image},
        headers={'X-API-Key': config('API_KEY')}
    )
    return redirect(url_for('dashboard'))