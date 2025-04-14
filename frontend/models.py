from app import db

class Subscription(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    plan = db.Column(db.String, default='free')
    post_count = db.Column(db.Integer, default=0)

class ScheduledPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    platform = db.Column(db.String)
    text = db.Column(db.Text)
    image_url = db.Column(db.String)
    schedule_time = db.Column(db.DateTime)