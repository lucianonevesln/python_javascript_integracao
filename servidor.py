from flask import Flask, request, render_template, jsonify


app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/api', methods=['POST'])
def cadastro():
    json = request.get_json()
    nome = json['nome']
    email = json['email']
    return jsonify(nome=nome, email=email)


if __name__ == '__main__':
    app.run(host = 'localhost', port = 5000, debug = True)