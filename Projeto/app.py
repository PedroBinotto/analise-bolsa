import yfinance as yf
from flask import Flask, request, render_template, url_for
from flask_wtf import FlaskForm
from flask_bootstrap import Bootstrap
from wtforms import StringField, PasswordField
from wtforms.validators import Length, InputRequired
import datetime
import json
import decimal


app = Flask(__name__)
bootstrap = Bootstrap(app)


msft = yf.Ticker("MSFT")
print(msft.info['regularMarketPrice'])


@app.route('/', methods=['GET', 'POST'])
def index():
	if request.method == 'GET':
		return render_template('index.html')
	else:
		return redirect('/result')	


@app.route('/result', methods=['GET', 'POST'])
def result():
	return render_template('result.html')

if __name__ == '__main__':
	app.run()
