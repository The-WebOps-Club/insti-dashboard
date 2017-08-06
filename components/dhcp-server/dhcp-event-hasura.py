#!/usr/bin/env python
# -*- coding: utf-8 -*-
# File: dhcp-event-hasura.py
# Author: Shahidh K Muhammed <shahidhkmuhammed@gmail.com>
# Date: 29.07.2017
# Last Modified: 01.08.2017

import requests
import sys
import os
import logging

logging.basicConfig(filename="./log", level=logging.INFO)

# Configuration values
DHCP_SERVER_TOKEN = os.environ.get('DHCP_SERVER_TOKEN')
AUTHZ_API_URL = 'http://api.dashboard.iitm.ac.in/v1/device/ensure_authz'

# Check if enough arguments are there
if len(sys.argv) < 4:
    logging.critical('Not enough arguments supplied, exiting!')
    sys.exit()

# ./dhcp-event-hasura.py <ipaddress> <macaddress> <event>
ipv4 = sys.argv[1]
mac = sys.argv[2]
event = sys.argv[3]

# Set the headers
headers = {
    'Content-Type': 'application/json',
}

# Construct payload
authz_payload = {
    'ipv4': ipv4,
    'mac': mac,
    'token': DHCP_SERVER_TOKEN
}

# ensure authorization for the device
if event == 'commit':
    authz_response = requests.post(
        AUTHZ_API_URL, json=authz_payload, headers=headers)
    # Act on the response
    if authz_response.status_code == 200:
        logging.info('ensured_authz : ' + 
                     ipv4 + ' ' + mac + ' ' + str(authz_response.json()))
    else:
        logging.error('ensure authz failed: ' + str(authz_response.json()))
elif event == 'expiry' or event == 'release':
    # deauthorize ip
    logging.info('deauthorize: ' + ipv4 + ' ' + mac)
else:
    logging.error('unsupported event')
