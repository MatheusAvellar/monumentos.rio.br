import re
import requests
import time

URL = "http://inventariodosmonumentosrj.com.br/index.asp?iMENU=catalogo&iiCOD="
RE_NAME_DATE = re.compile("<li> Nome: <strong>(.+?)<\\/strong><\\/br> Data de Inauguração: <strong>(.+?)<\\/strong><\\/br>")
START_DELIM = "<h4>Dados do <strong>Monumento</strong></h4>"

def fetchWebsite(id):
	r = requests.get(URL+str(id))
	r.encoding = "utf-8"
	contents = r.text
	contents = " ".join(contents.split())

	if contents.find(START_DELIM) < 0:
		return -1
	contents = contents.split(START_DELIM)[1]
	contents = contents.split("&amp;sspn=")[0]

	out = []
	res = RE_NAME_DATE.search(contents)
	out.append(f"\"{res.group(1)}\"")
	out.append(f"\"{res.group(2)}\"")

	coords = contents.split("sll=")[1]
	out.append(coords)
	return ",".join(out)

with open("2000.csv", "w", encoding="utf-8") as f:
	f.write("id,nome,inaug,lat,lon\n")
	for i in range(1500,2000):
		time.sleep(0.4)
		print("Crawling", i, end="")
		fetch_results = fetchWebsite(i)
		if fetch_results == -1:
			print(" - not found")
			continue
		f.write(f"{i},{fetch_results}\n")
		print("")
