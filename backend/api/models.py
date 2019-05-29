from api import db

class User(db.Model):
    __tablename__="user"
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    email = db.Column(db.String(50))
    name = db.Column(db.String(50))
    password = db.Column(db.String(80))
    wins=db.Column(db.Integer)
    loses=db.Column(db.Integer)
    ties=db.Column(db.Integer)
