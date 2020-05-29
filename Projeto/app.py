import yfinance as yf
from flask import Flask, request, render_template, url_for
from flask_bootstrap import Bootstrap
from itertools import zip_longest
import datetime
import json
import decimal

app = Flask(__name__)
bootstrap = Bootstrap(app)

def grouper(n, iterable, fillvalue=None):
    args = [iter(iterable)] * n
    return zip_longest(fillvalue=fillvalue, *args)

def quote(query):
	stock = str(query[0])
	amnt = int(query[1])
	prc = (yf.Ticker(stock)).info['regularMarketPreviousClose']
	val = prc * amnt
	return [stock, prc, amnt, val]

@app.route('/', methods=['GET', 'POST'])
def index():
	json_data = []
	if request.method == 'GET':
		json_data = json.dumps(json_data)
		info = []
		cb = []
		return render_template('index.html', j_data=json_data, info=info, cb=cb, render=0)
	else:
		data = request.form
		for i in grouper(2, data.values()):
			json_data.append(quote(i))
		
		info = json_data
		cb = []

		for i in info:
			cb.append(i[0])
		
		json_data = json.dumps(json_data)		
		return render_template('index.html', j_data=json_data, info=info, cb=cb, render=1)


if __name__ == '__main__':
	app.run()
