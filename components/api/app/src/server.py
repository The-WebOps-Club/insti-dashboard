#!/usr/bin/env python
# -*- coding: utf-8 -*-
# File: server.py
# Author: Shahidh K Muhammed <shahidhkmuhammed@gmail.com>
# Date: 18.06.2017
# Last Modified: 18.06.2017

import os
import logging
import sys
from src import app
from flask import jsonify, abort, request
from .exceptions import RadiusException
from .utils import get_user, get_device, get_mac, insert_authz, delete_authz
from .utils import get_authz, is_valid, get_ipv4
from .radius import send_accounting_packet

HASURA_ADMIN_TOKEN = os.environ.get('HASURA_ADMIN_TOKEN')
DHCP_SERVER_TOKEN = os.environ.get('DHCP_SERVER_TOKEN')

log = logging.getLogger(__name__)
out_hdlr = logging.StreamHandler(sys.stdout)
out_hdlr.setFormatter(logging.Formatter('%(asctime)s %(message)s'))
out_hdlr.setLevel(logging.INFO)
log.addHandler(out_hdlr)
log.setLevel(logging.INFO)


@app.route('/')
def hello():
    return jsonify(hello='world')


@app.route('/v1/device/ipv4_mac', methods=['GET', 'OPTIONS'])
def get_ipv4_mac():
    ipv4 = request.headers.get('X-Forwarded-For', request.remote_addr)
    log.info('request for ' + ipv4)
    mac = get_mac(ipv4)
    return jsonify(ipv4=ipv4, mac=mac)


@app.route('/v1/device/authorize', methods=['POST'])
def authorize_device():
    '''
    API Endpoint to authorize a device for network access.
    POST JSON body:
    {
        validity: enum(0,1,...) number of days, max till 365. 0 means 1 hour
        mac: admin only
    }
    '''

    body = request.get_json()
    user = get_user(request)
    ipv4 = request.headers.get('X-Forwarded-For', request.remote_addr)

    if 'mac' in body and user['role'] != 'admin':
        return abort(401, 'only admin can authorize any mac')

    validity_option = int(body['validity'])
    if validity_option > 1 and user['role'] != 'admin':
        return abort(401, 'validity more than 1 day needs admin approval')

    if ('mac' in body and user['role'] == 'admin'):
        mac = body['mac']
    else:
        mac = get_mac(ipv4)

    try:
        device = get_device(mac, user['access_headers'])
    except Exception as e:
        return abort(400, 'device with given mac not found')

    # insert into authz table
    response = insert_authz(mac, validity_option)
    if not response:
        return abort(500, 'inserting into database failed')

    try:
        send_accounting_packet(device['user']['username'], ipv4)
    except RadiusException as e:
        abort(500, e)

    return jsonify(message='success', data=response)


@app.route('/v1/device/deauthorize', methods=['POST'])
def deauthorize_device():
    '''
    API Endpoint to de-authorize a device for network access.
    POST JSON body:
    {
        mac: admin only
    }
    '''

    body = request.get_json()
    user = get_user(request)
    ipv4 = request.headers.get('X-Forwarded-For', request.remote_addr)

    if 'mac' in body and user['role'] != 'admin':
        return abort(401, 'only admin can de-authorize any mac')

    if ('mac' in body and user['role'] == 'admin'):
        mac = body['mac']
    else:
        mac = get_mac(ipv4)

    try:
        device = get_device(mac, user['access_headers'])
    except Exception as e:
        return abort(400, 'device with given mac not found')

    # delete from authz table
    response = delete_authz(mac)
    if not response:
        return abort(500, 'deleting from database failed')

    try:
        send_accounting_packet(
            device['user']['username'],
            ipv4, start=False, stop=True
        )
    except RadiusException as e:
        abort(500, e)

    return jsonify(message='success', data=response)


@app.route('/v1/device/ensure_authz', methods=['POST'])
def ensure_authorization():
    """
    Endpoint to ensure authorization. Call firewall again to give access
    to device.
    POST JSON body:
    {
        mac: admin only
        ip: admin only
        token: DHCP_SERVER_TOKEN
    }
    """
    body = request.get_json()
    user = get_user(request)
    ipv4 = request.headers.get('X-Forwarded-For', request.remote_addr)

    if ('mac' in body) and (user['role'] != 'admin') and ('token' not in body):
        return abort(401, 'only admin can authorize any mac')

    if ('mac' in body and user['role'] == 'admin'):
        mac = body['mac']
    elif ('token' in body and 'mac' in body):
        if body['token'] == DHCP_SERVER_TOKEN:
            mac = body['mac']
            ipv4 = get_ipv4(mac)
        else:
            return abort(401, 'incorrect token')
    else:
        mac = get_mac(ipv4)

    # insert into authz table
    try:
        authz = get_authz(mac)
        if not authz:
            return jsonify(message='no authorization exist'), 400
    except Exception as e:
        return abort(500, e)

    print(authz)
    if is_valid(authz):
        try:
            send_accounting_packet(
                authz[0]['device']['user']['username'], ipv4)
        except RadiusException as e:
            abort(500, e)
        pass
    else:
        return jsonify(message='authorization expired'), 400

    return jsonify(message='success', data=authz)

