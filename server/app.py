from flask import Flask, render_template, request, url_for, redirect, send_file, jsonify
import cv2
import numpy as np
from numpy import core
import correct
from flask_cors import CORS
import base64

app = Flask(__name__)
CORS(app, resources={r'*': {'origins': '*'}})

@app.route('/process', methods = ['GET', 'POST'])
def process():
    if request.method == "GET":
        return redirect(url_for("home"))
    f = request.files['file']
    src = cv2.imdecode(np.fromstring(request.files['file'].read(), np.uint8), cv2.IMREAD_UNCHANGED)
    dst = correct.correct(src)
    _, buffer = cv2.imencode('.jpg', dst)
    data = base64.b64encode(buffer)
    return jsonify({"uri":f"data:image/jpeg;base64,{str(data)[2:-1]}"})    

@app.route('/')
def home():
    return render_template(
        "home.html",
    )

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False, ssl_context=("fullchain.pem", "privkey.pem"))
