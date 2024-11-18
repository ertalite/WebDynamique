# Découverte du framework Flask

Avec le projet `Bikeshop`, l'objectif était de découvrir le framework Flask se basant sur Python.

## Installation

Vous devez installez la librairie Flask au préalable avec pip.

```bash
pip install Flask
```

## Preview

```python
@app.route("/achat/<code>", methods = ["GET", "POST"])
def achat(code):
    if request.method == "GET":
        return render_template("output/achat.html", code = code)
    else:
        bikeshop.achat_velo(code)
        return render_template("output/do_achat.html")
    
@app.route("/reassort")
def reassort():
        return render_template(
                            "output/reassort.html",
                            Descriptions = bikeshop.getDescr().items()
                            )

@app.route("/reassort/JSON")
def getJSON():
        return jsonify(data = bikeshop.getDescr())
```
