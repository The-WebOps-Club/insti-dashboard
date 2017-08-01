#!/usr/bin/env python
# -*- coding: utf-8 -*-
# File: server.py
# Author: Shahidh K Muhammed <shahidhkmuhammed@gmail.com>
# Date: 18.06.2017
# Last Modified: 18.06.2017

import os
import datetime as dt
from src import app
from flask import jsonify, abort, request, redirect
#import openldap
from .exceptions import LDAPLoginException, HasuraAuthException, RadiusException, HasuraDataException
from .hasura import Hasura
from .utils import get_user
from .radius import send_accounting_packet

HASURA_ADMIN_TOKEN = os.environ['HASURA_ADMIN_TOKEN']

@app.route('/')
def hello():
    return jsonify(hello='world')

@app.route('/ciao')
def ciao():
    return jsonify(ciao='Mondo')

@app.route('/401')
def _401():
    abort(401)

@app.route('/405')
def _405():
    return "This is a 405", 405

@app.route('/500')
def _500():
    raise InternalServerError("This is an error")

@app.route('/get_ip', methods=['GET', 'OPTIONS'])
def get_ip():
    return jsonify(ipv4=request.headers.get('X-Forwarded-For', request.remote_addr))

@app.route('/authorize_device', methods=['POST', 'GET'])
def authorize_device():
    '''
    POST params: ip, nick, mac_addr, validity_option
    '''
    token = request.cookies.get('dinoisses', request.headers.get('authorization'))
    if not token:
        abort(401, 'no token/cookie')
    elif token.startswith('Bearer'):
        token = token.split(' ')[1]

    origin = request.headers.get('X-Forwarded-For', request.remote_addr)

    hasura = Hasura('hasura.dashboard.iitm.ac.in', 'http', token)
    hasura_admin = Hasura('hasura.dashboard.iitm.ac.in', 'http', HASURA_ADMIN_TOKEN)
    try:
        user = hasura.auth.info()
    except HasuraAuthException as e:
        abort(401, 'invalid token/cookie')

    try:
        radius_resp = send_accounting_packet(user['username'], origin)
    except RadiusException as e:
        abort(500, e)

    body = {}
    if request.method == 'GET':
        body['nick'] = 'machine-' + origin
        body['mac_addr'] = 'mac-' + origin
        body['associated_at'] = dt.datetime.now().isoformat()
        body['valid_till'] = (dt.datetime.now() + dt.timedelta(hours=1)).isoformat()

    elif request.method == 'POST':
        body = request.get_json()
        body['associated_at'] = dt.datetime.now().isoformat()
        validity_option = int(body['validity_option'])
        if validity_option == 0:
            body['valid_till'] = (dt.datetime.now() + dt.timedelta(hours=1)).isoformat()
        else:
            body['valid_till'] = (dt.datetime.now() + dt.timedelta(days=validity_option)).isoformat()

    try:
        nick = body['nick']
        resp = hasura.data.select('device', ['id', 'mac_addr', 'nick'], {'nick': nick})
        if len(resp) == 0:
            new_device = hasura_admin.data.insert('device', [{
                    'user_id': user['hasura_id'],
                    'mac_addr': body['mac_addr'],
                    'nick': nick
                }], ['id', 'user_id', 'mac_addr', 'nick'])
            new_device = new_device['returning'][0]
        else:
            new_device = resp[0]
        ipv4_association = hasura_admin.data.update('ipv4', {
            'ip': origin }, {
            'device_id': new_device['id'],
            'valid_till': body['valid_till'],
            'associated_at': body['associated_at']
        }, returning=['id', 'ip', 'device_id', 'associated_at', 'valid_till'])
        if len(ipv4_association['returning']) == 0:
            new_ipv4 = hasura_admin.data.insert('ipv4', [{
                    'ip': origin,
                    'device_id': new_device['id'],
                    'associated_at': body['associated_at'],
                    'valid_till': body['valid_till']
                }], ['id', 'ip', 'device_id', 'associated_at', 'valid_till'])
        else:
            new_ipv4 = ipv4_association['returning']

    except Exception as e:
        abort(500, e)

    return jsonify(token=token, user=user, origin=request.headers.get('X-Forwarded-For', request.remote_addr), radius=radius_resp, device=new_device, ipv4=new_ipv4)


@app.route('/remove_device', methods=['POST', 'GET'])
def remove_device():
    token = request.cookies.get('dinoisses', request.headers.get('authorization'))
    if not token:
        abort(401, 'no token/cookie')
    elif token.startswith('Bearer'):
        token = token.split(' ')[1]

    origin = request.headers.get('X-Forwarded-For', request.remote_addr)

    hasura = Hasura('hasura.dashboard.iitm.ac.in', 'http', token)
    hasura_admin = Hasura('hasura.dashboard.iitm.ac.in', 'http', HASURA_ADMIN_TOKEN)
    try:
        user = hasura.auth.info()
    except HasuraAuthException as e:
        abort(401, 'invalid token/cookie')

    try:
        radius_resp = send_accounting_packet(user['username'], origin, start=False, stop=True)
    except RadiusException as e:
        abort(500, e)

    try:
        ipv4_resp = hasura_admin.data.delete('ipv4', {'ip': origin}, returning=['id','ip','device_id'])
    except Exception as e:
        abort(500, e)

    return jsonify(token=token, user=user, origin=request.headers.get('X-Forwarded-For', request.remote_addr), radius=radius_resp, del_ipv4=ipv4_resp)
