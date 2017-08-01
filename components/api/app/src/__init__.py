import six
from flask import Flask, jsonify
from werkzeug.exceptions import default_exceptions, InternalServerError
from werkzeug.exceptions import HTTPException


__all__ = ['make_json_app']

def make_json_app(import_name, **kwargs):
    """
    Creates a JSON-oriented Flask app.
    All error responses that you don't specifically
    manage yourself will have application/json content
    type, and will contain JSON like this (just an example):
    { "message": "405: Method Not Allowed" }
    This method was adapted from http://flask.pocoo.org/snippets/83/
    """
    def make_json_error(ex):
        response = jsonify({"Error": str(ex)})
        response.status_code = (ex.code
                                if isinstance(ex, HTTPException)
                                else 500)
        return response

    app = Flask(import_name, **kwargs)

    # In the linked snippet, this statement was as follows:
    # for code in default_exceptions.iterkeys():
    #     app.error_handler_spec[None][code] = make_json_error

    for code in six.iterkeys(default_exceptions):   # iterkeys is not available in Python3
        app.errorhandler(code)(make_json_error)     # Flask has updated how to change error handlers

    return app

app = make_json_app(__name__)

from flask_cors import CORS
CORS(app, supports_credentials=True)


from .server import *
