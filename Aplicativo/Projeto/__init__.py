from yahooquery import Ticker
from flask import Flask, request, render_template, url_for
from flask_bootstrap import Bootstrap
from itertools import zip_longest
from forex_python.converter import CurrencyRates
import sys
import datetime
import json
import decimal


app = Flask(__name__)
bootstrap = Bootstrap(app)


def grouper(n, iterable, fillvalue=None):
    args = [iter(iterable)] * n
    return zip_longest(fillvalue=fillvalue, *args)


def quote(query, convert):				# Contata API e ajusta os valores de moeda
	try:
		c = CurrencyRates()		# Valores de moeda (Forex-Python)

		stock = str(query[0])
		amnt = int(query[1])

		tickr = Ticker(stock)	# Informaçoes da ação (yahooquery)
		data = tickr.summary_detail

		prc = data[stock]['regularMarketPreviousClose']
		currency = data[stock]['currency']

		if convert:				# Conversão de moeda
			prc = round(c.convert(currency, 'BRL', prc), 2)
			val = prc * amnt
			return [stock, prc, amnt, val, 'BRL']
		
		val = prc * amnt		# Sem conversão
		return [stock, prc, amnt, val, currency]
	except:
		return ['SÍMBOLO INVÁLIDO', 0, 0, 0]	# Em caso de erro interno


@app.route('/', methods=['GET', 'POST'])		# Rota para a página
def index():
	json_data = []
	if request.method == 'GET':	# **Sem consulta
		json_data = json.dumps(json_data)
		info = []
		cb = []
		return render_template('index.html', j_data=json_data, info=info, cb=cb, render=0)
	else:						# **Com consulta
		data = request.form

		if request.form.getlist('convert'):
			convert = True
			data = data.to_dict()
			data.popitem()
		else:
			convert = False
			print(data, file=sys.stdout)

		for i in grouper(2, data.values()):
			json_data.append(quote(i, convert))
		
		info = json_data
		cb = []

		for i in info:
			cb.append(i[0])
		
		json_data = json.dumps(json_data)	# Passa as informações da API para script JS
		return render_template('index.html', j_data=json_data, info=info, cb=cb, render=1)


if __name__ == '__main__':					# Inicializar aplicativo
	app.run()
