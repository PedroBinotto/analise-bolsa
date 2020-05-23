import os
import datetime
import time
from iexfinance.stocks import Stock
from iexfinance.refdata import get_symbols
from flask import Flask, request, render_template, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

os.environ['IEX_TOKEN'] = 'Tpk_55f162dd34c248b0a92b41a417c0da25'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////home/pedro/Desktop/Programas/investimento-joao/Projeto/stocks.db'
app.config['SECRET_KEY'] = 'mysecret'
db = SQLAlchemy(app)

class Watch(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	symbol = db.Column(db.String(4), unique=True)
	name = db.Column(db.String(20))

class Hist(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	symbol = db.Column(db.String(4), db.ForeignKey('watch.symbol'))
	price = db.Column(db.Float)
	datetime = db.Column(db.DateTime)

db.create_all()

# Log
def logInfo():
	while True:
		try:
			symbol = 'AAPL'
			a = Stock(symbol, token=os.environ['IEX_TOKEN'])
			print( str(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")),\
			 ' PRICE: ' + str(a.get_quote()['latestPrice']))
			time.sleep(60.0)
		except:
			print('\nErro!')
			break

# logInfo()
# Read

'''
for i in get_symbols():
	print(i['symbol'], i['name'])
'''

@app.route('/', methods=['GET', 'POST'])
def index():
	symbols = []
	for i in get_symbols():
		tmp = [i['symbol'], i['name']]
		symbols.append(tmp)
	return render_template('index.html', s=symbols)

if __name__ == '__main__':
	app.run(debug=True)
