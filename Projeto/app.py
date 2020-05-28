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
	prc = (yf.Ticker(stock)).info['regularMarketPrice']
	val = prc * amnt
	return [stock, prc, amnt, val]

@app.route('/', methods=['GET', 'POST'])
def index():
	json_data = []
	if request.method == 'GET':
		json_data = json.dumps(json_data)
		info = []
		cb = []
		return render_template('index.html', j_data=json_data, info=info, cb=cb)
	else:
		data = request.form
		for i in grouper(2, data.values()):
			json_data.append(quote(i))
		info = json_data
		cb = []
		for i in info:
			cb.append(i[0])
		json_data = json.dumps(json_data)		
		return render_template('index.html', j_data=json_data, info=info, cb=cb)


if __name__ == '__main__':
	app.run()


'''
def populate_select():
	select[:] = []
	select.append(request.form.getlist('maquina_select'))
	select.append(request.form.getlist('select_day'))
	if request.form.getlist('agrupamento'):
		select.append(1)
	else:
		select.append(0)

def input_production():
	if request.method == 'GET':
		lista_colunas[:] = []
		lista_maquinas[:] = []

		try:
			colunas_prod = cursor.execute("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'production';", multi=True)
			for coluna in cursor.fetchall():
				lista_colunas.append(coluna)

			maquina_prod = cursor.execute("SELECT DISTINCT maquina FROM production ORDER BY maquina;", multi=True)
			for maq in cursor.fetchall():
				maq = (str(maq)).translate({ord(f): None for f in " (,) "})
				lista_maquinas.append(maq)

		except mariadb.Error as error:
			print("Error: {}".format(error))

		return render_template('production_query.html', lm=lista_maquinas)
	else:
		populate_select()
		final_queries('production')
		return redirect('/result')
'''