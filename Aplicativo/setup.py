from setuptools import setup, find_packages

setup(
	name='aplicativo',
	version = "100",
	author = "P. Binotto",
	author_email = "pedrosantibinotto@gmail.com",
	packages=find_packages(),
	include_package_data=True,
	zip_safe=False,
	install_requires=[
		'Flask>=0.10.1',
		'Flask-Bootstrap',	
		'requests>=2.20',
		'yfinance',
		'forex-python',
		'BeautifulSoup4',
		'html5lib'
	],
)
