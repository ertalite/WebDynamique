from flask import Flask, abort, render_template, request, jsonify
import os
import json
import bikeshop

TEMPLATES = "templates"

app = Flask(__name__, template_folder=TEMPLATES)

@app.route("/")
@app.route("/home")
def home():
    return render_template("output/home.html")

@app.route("/tout")
def tout():
    return render_template("output/shop.html", 
                           Descriptions = bikeshop.getDescr().items(),
                           titre = "Tout nos vélos")

@app.route("/dispos")
def dispo():
    return render_template("output/shop.html", 
                           Descriptions = bikeshop.velo_dispo().items(),
                           titre = "Les vélos dispos ^^")

@app.route("/velo/<code>")
def velo(code):
    return render_template("output/code.html",  code = code,
                                                nom = bikeshop.getDescr()[code][0], 
                                                short_desc = bikeshop.getDescr()[code][1],
                                                long_desc = bikeshop.getDescr()[code][2])

@app.route("/achat/<code>", methods = ["GET", "POST"])
def achat(code):
    if request.method == "GET":
        return render_template("output/achat.html", code = code)
    else:
        bikeshop.achat_velo(code)
        return render_template("output/do_achat.html")
    
@app.route("/reassort", methods = ["POST", "GET"])
def reassort():
        if request.method == "POST":
            jsonData = request.get_json()
            bikeshop.reassort(jsonData["invent"])
            return render_template("output/reassort.html")
        return render_template(
                            "output/reassort.html",
                            Descriptions = bikeshop.getDescr().items()
                            )

@app.route("/reassort/JSON")
def getJSON():
        data = {"descr" : bikeshop.getDescr(), "invent" : bikeshop.getInvent(), "img" : bikeshop.getImg()}
        return jsonify(data)