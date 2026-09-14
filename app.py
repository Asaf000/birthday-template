from flask import Flask, render_template, request, jsonify
import json
import os


app = Flask(__name__)


# =========================================
# JSON FILE LOCATION
# =========================================

DATA_FOLDER = "data"
CAKE_FILE = os.path.join(DATA_FOLDER, "cake.json")


# =========================================
# HOME PAGE
# =========================================

@app.route("/")
def home():

    return render_template("index.html")


# =========================================
# BAKING PAGE
# =========================================

@app.route("/baking")
def baking():

    return render_template("baking.html")


# =========================================
# CELEBRATE PAGE
# =========================================

@app.route("/celebrate")
def celebrate():

    cake_data = {
        "crust1": "pink",
        "crust2": "pink",
        "crust3": "pink"
    }

    if os.path.exists(CAKE_FILE):

        try:

            with open(CAKE_FILE, "r") as file:
                saved_data = json.load(file)

                cake_data["crust1"] = saved_data.get(
                    "crust1",
                    "pink"
                )

                cake_data["crust2"] = saved_data.get(
                    "crust2",
                    "pink"
                )

                cake_data["crust3"] = saved_data.get(
                    "crust3",
                    "pink"
                )

        except (json.JSONDecodeError, OSError):
            pass


    return render_template(
        "celebrate.html",
        cake_data=cake_data
    )

# =========================================
# SAVE CAKE
# =========================================

@app.route("/save-cake", methods=["POST"])
def save_cake():

    data = request.get_json()

    cake_data = {
        "crust1": data.get("crust1"),
        "crust2": data.get("crust2"),
        "crust3": data.get("crust3")
    }

    os.makedirs(DATA_FOLDER, exist_ok=True)

    with open(CAKE_FILE, "w") as file:

        json.dump(
            cake_data,
            file,
            indent=4
        )

    return jsonify({
        "success": True,
        "message": "Cake saved successfully!"
    })

@app.route("/party")
def party():
    return render_template("party.html")


# =========================================
# RUN APPLICATION
# =========================================

if __name__ == "__main__":

    app.run(debug=True)