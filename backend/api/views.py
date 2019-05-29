from flask import Flask, request, jsonify, make_response, Blueprint
from flask_sqlalchemy import SQLAlchemy
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps
from api.models import User
from api import db
from api import create_app
import os

main=Blueprint('main',__name__)
app = Flask(__name__)

app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'message' : 'Token is missing!'}), 401

        try: 
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = User.query.filter_by(public_id=data['public_id']).first()
        except:
            return jsonify({'message' : 'Token is invalid!'}), 401

        return f(current_user, *args, **kwargs)

    return decorated
@main.route('/signup', methods=['POST'])
def create_user():

    data = request.get_json(force=True)

    hashed_password = generate_password_hash(data['password'], method='sha256')

    new_user = User(public_id=str(uuid.uuid4()), name=data['name'],email=data['email'],password=hashed_password,wins=0,loses=0,ties=0)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message' : 'New user created!'})
@main.route('/test')
def testing():
    return 'it is on!'
@main.route('/login')
def login():
    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    user = User.query.filter_by(email=auth.username).first()

    if not user:
        return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

    if check_password_hash(user.password, auth.password):
        token = jwt.encode({'public_id' : user.public_id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])

        return jsonify({'token' : token.decode('UTF-8')})

    return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})
@main.route('/leaderboard', methods=['GET'])
@token_required
def get_leaders(current_user):

    leaders = User.query.order_by(User.wins.desc()).all()

    if not leaders:
        return jsonify({'message' : 'No user found!'})
    output=[]

    for leader in leaders:
        user_data = {}
        user_data['name'] = leader.name
        user_data['wins'] = leader.wins
        user_data['loses'] = leader.loses
        user_data['ties'] = leader.ties
        output.append(user_data)

    return jsonify({'leaders' : output})

@main.route('/user/<public_id>', methods=['GET'])
@token_required
def get_one_user(current_user, public_id):

    user = User.query.filter_by(public_id=public_id).first()

    if not user:
        return jsonify({'message' : 'No user found!'})

    user_data = {}
    user_data['public_id'] = user.public_id
    user_data['name'] = user.name
    user_data['password'] = user.password
    user_data['email'] = user.email
    user_data['wins'] = user.wins
    user_data['loses'] = user.loses
    user_data['ties'] = user.ties

    return jsonify({'user' : user_data})

@main.route('/user/win', methods=['PUT'])
@token_required
def win_game(current_user):
    userWin = User.query.filter_by(id=current_user.id).first()

    if not userWin:
        return jsonify({'message' : 'User not found'})

    userWin.wins = userWin.wins+1
    db.session.commit()

    return jsonify({'message' : 'Win has been saved!'})
@main.route('/user/lose', methods=['PUT'])
@token_required
def lose_game(current_user):
    userlose = User.query.filter_by(id=current_user.id).first()

    if not userlose:
        return jsonify({'message' : 'User not found'})

    userlose.loses = userlose.loses+1
    db.session.commit()

    return jsonify({'message' : 'Lose has been saved!'})
@main.route('/user/tie', methods=['PUT'])
@token_required
def tie_game(current_user):
    usertie = User.query.filter_by(id=current_user.id).first()

    if not usertie:
        return jsonify({'message' : 'User not found'})

    usertie.ties = usertie.ties+1
    db.session.commit()

    return jsonify({'message' : 'Tie has been saved!'})
@main.route('/user/record', methods=['GET'])
@token_required
def ger_record(current_user):
    userrecord = User.query.filter_by(id=current_user.id).first()

    if not userrecord:
        return jsonify({'message' : 'User not found'})

    user_record = {}
    user_record['wins'] = userrecord.wins
    user_record['loses'] = userrecord.loses
    user_record['ties'] = userrecord.ties

    return jsonify(user_record)

