import yfinance as yf
from flask import Flask, request, render_template, url_for
from flask_bootstrap import Bootstrap
from itertools import zip_longest
from forex_python.converter import CurrencyRates
import datetime
import json
import decimal


app = Flask(__name__)
bootstrap = Bootstrap(app)


def grouper(n, iterable, fillvalue=None):
    args = [iter(iterable)] * n
    return zip_longest(fillvalue=fillvalue, *args)


def quote(query):
	try:
		c = CurrencyRates()

		stock = str(query[0])
		amnt = int(query[1])

		tickr = yf.Ticker(stock)
		prc = tickr.info['regularMarketPreviousClose']
		currency = tickr.info['currency']

		prc = round(c.convert(currency, 'BRL', prc), 2)
		val = prc * amnt

		return [stock, prc, amnt, val, 'BRL']
	except:
		return ['SÍMBOLO INVÁLIDO', 0, 0, 0]


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
