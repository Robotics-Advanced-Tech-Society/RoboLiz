from flask import Flask, render_template, request, redirect, url_for, session, abort

app = Flask(__name__)

##Make sure to make a url function...
url="test.test"

@app.route('/')
def googleMeet():
    return render_template('RobolizConsole.html', power = "10%", distance = "10M",error= ["Testing","testing","Test"] )
    
