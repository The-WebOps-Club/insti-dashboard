#!/usr/bin/env python
# -*- coding: utf-8 -*-
# File: utils.py
# Author: Shahidh K Muhammed <shahidhkmuhammed@gmail.com>
# Date: 19.06.2017
# Last Modified: 19.06.2017

import requests
import os
import datetime as dt
from .exceptions import HasuraDataException

HASURA_DATA_URL = os.environ.get(
    'HASURA_DATA_URL',
    'http://data.hasura/v1/query'
)

headers = {
    'Content-Type': 'application/json',
    'X-Hasura-Role': 'admin',
    'X-Hasura-User-Id': '1'
}

if os.environ.get('DEV', None):
    headers['Authorization'] = 'Bearer ' + os.environ.get('HASURA_ADMIN_TOKEN', None)


def get_user(request):
    id = request.headers.get('x-hasura-user-id')
    role = request.headers.get('x-hasura-role')
    return {
        'id': int(id) if id else None,
        'role': role,
        'access_headers': {
            'X-Hasura-User-Id': id,
            'X-Hasura-Role': role
        }
    }


def get_user_details(id, headers):
    payload = {
        'type': 'select',
        'args': {
            'table': 'user',
            'columns': ["*"],
            'where': {'id': id}
        }
    }
    response = requests.post(HASURA_DATA_URL, json=payload, headers=headers)
    data = response.json()
    if len(data) > 0 and response.status_code == 200:
        return data[0]
    else:
        return None


def get_device(mac, headers):
    payload = {
        'type': 'select',
        'args': {
            'table': 'device',
            'columns': ['mac', 'nick', 'registered_at', {
                'name': 'user',
                'columns': ['*']
            }],
            'where': {'mac': mac}
        }
    }
    response = requests.post(HASURA_DATA_URL, json=payload, headers=headers)
    data = response.json()
    if len(data) > 0 and response.status_code == 200:
        return data[0]
    else:
        raise HasuraDataException(data)


def get_mac(ipv4):
    payload = {
        'type': 'select',
        'args': {
            'table': 'dhcp_event',
            'columns': ['id', 'ipv4', 'mac', 'timestamp'],
            'where': {
                'ipv4': ipv4,
                'event': 'commit'
            },
            'order_by': '-timestamp',
            'limit': 1
        }
    }
    response = requests.post(HASURA_DATA_URL, json=payload, headers=headers)
    data = response.json()
    if len(data) > 0 and response.status_code == 200:
        return data[0]['mac']
    else:
        raise HasuraDataException(data)


def get_ipv4(mac):
    payload = {
        'type': 'select',
        'args': {
            'table': 'dhcp_event',
            'columns': ['id', 'ipv4', 'mac', 'timestamp'],
            'where': {
                'mac': mac,
                'event': 'commit'
            },
            'order_by': '-timestamp',
            'limit': 1
        }
    }
    response = requests.post(HASURA_DATA_URL, json=payload, headers=headers)
    data = response.json()
    if len(data) > 0 and response.status_code == 200:
        return data[0]['ipv4']
    else:
        return None


def insert_authz(mac, validity):
    object = {
        'mac': mac
    }
    if validity == 0:
        object['valid_till'] = (
            dt.datetime.now() + dt.timedelta(hours=1)
        ).isoformat()
    else:
        object['valid_till'] = (
            dt.datetime.now() + dt.timedelta(days=validity)
        ).isoformat()
    payload = {
        'type': 'insert',
        'args': {
            'table': 'authz',
            'objects': [object],
            'returning': ['mac', 'authorized_at', 'valid_till']
        }
    }
    response = requests.post(HASURA_DATA_URL, json=payload, headers=headers)
    data = response.json()
    if response.status_code == 400 and data['error'].startswith(
            'Uniqueness violation'
    ):
        # authz already exist, update
        update_payload = {
            'type': 'update',
            'args': {
                'table': 'authz',
                '$set': {'valid_till': object['valid_till']},
                'where': {'mac': mac},
                'returning': ['mac', 'authorized_at', 'valid_till']
            }
        }
        update_response = requests.post(
            HASURA_DATA_URL,
            json=update_payload,
            headers=headers
        )
        update_data = update_response.json()['returning']
        if update_response.status_code == 200:
            return update_data[0]
        else:
            raise HasuraDataException(data)
            return None
    elif response.status_code == 200:
        return data
    else:
        raise HasuraDataException(data)
        return None


def delete_authz(mac):
    payload = {
        'type': 'delete',
        'args': {
            'table': 'authz',
            'where': {'mac': mac},
            'returning': ['mac', 'authorized_at', 'valid_till']
        }
    }
    response = requests.post(HASURA_DATA_URL, json=payload, headers=headers)
    data = response.json()
    if response.status_code == 200:
        return data
    else:
        raise HasuraDataException(data)


def get_authz(mac):
    payload = {
        'type': 'select',
        'args': {
            'table': 'authz',
            'where': {'mac': mac},
            'columns': ['mac', 'authorized_at', 'valid_till', {
                'name': 'device',
                'columns': ['nick', {
                    'name': 'user',
                    'columns': ['*']
                }]
            }]
        }
    }
    response = requests.post(HASURA_DATA_URL, json=payload, headers=headers)
    data = response.json()
    print(data)
    if response.status_code == 200:
        return data
    else:
        raise HasuraDataException(data)


def is_valid(authz):
    return dt.datetime.strptime(
        ''.join(authz[0]['valid_till'].rsplit(':', 1)),
        '%Y-%m-%dT%H:%M:%S.%f%z') > dt.datetime.now(dt.timezone.utc)
