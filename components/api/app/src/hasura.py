#!/usr/bin/env python
# -*- coding: utf-8 -*-
# File: hasura.py
# Author: Shahidh K Muhammed <shahidhkmuhammed@gmail.com>
# Date: 18.06.2017
# Last Modified: 20.06.2017

import requests
import json
from .exceptions import HasuraAuthException, HasuraDataException

class Hasura:
    '''
    Base class for Hasura APIs
    hasura = Hasura(domain[, scheme[, token]])
    '''
    def __init__(self, domain, scheme='https', token=''):
        self.domain = domain
        self.token = token
        self.user = None
        self.scheme = scheme
        self.headers = {
            'Content-Type': 'application/json',
        }
        self.cookie_header = None
        self.data = _Data(self)
        self.auth = _Auth(self)

class _Auth:
    '''
    Base class for Hasura Auth APIs
    '''
    def __init__(self, hasura):
        if hasura.token:
            hasura.headers['Authorization'] = 'Bearer ' + hasura.token
        self.auth_url = hasura.scheme + '://auth.' + hasura.domain
        self.hasura = hasura

    def login(self, username, password):
        ''' Login method '''
        res = requests.post(self.auth_url + '/login', json={
            'username': username,
            'password': password
        })
        if res.status_code == 200:
            self.hasura.token = res.json()['auth_token']
            self.hasura.user = res.json()
            return res.json()
        else:
            raise HasuraAuthException(str(res.status_code) + ' : ' + res.json()['message'])

    def signup(self, username, password):
        ''' Register method '''
        res = requests.post(self.auth_utl + '/signup', json={
            'username': username,
            'password': password
        })
        if res.status_code == 200:
            self.hasura.token = res.json()['auth_token']
            self.hasura.user = res.json()
            return res.json()
        else:
            raise HasuraAuthException(str(res.status_code) + ' : ' + res.json()['message'])

    def logout(self):
        ''' Logout method '''
        pass

    def info(self):
        ''' Account info '''
        res = requests.get(self.auth_url + '/user/account/info', headers=self.hasura.headers)
        if res.status_code == 200:
            self.hasura.user = res.json()
            return res.json()
        else:
            raise HasuraAuthException(str(res.status_code) + ' : ' + res.json()['message'])



class _Data:
    '''
    Base class for Hasura Data APIs
    '''
    def __init__(self, hasura):
        self.data_url = hasura.scheme + '://data.' + hasura.domain
        self.query_url = self.data_url + '/v1/query'
        self.headers = hasura.headers
        if hasura.token:
            self.headers['Authorization'] = 'Bearer ' + hasura.token

    def query(self, req_type, req_args):
        ''' Generic query data method '''
        res = requests.post(
                self.query_url,
                data=json.dumps({
                    'type': req_type,
                    'args': req_args
                }),
                headers = self.headers
            )
        if res.status_code == 200:
            return res
        else:
            raise HasuraDataException(str(res.status_code) + ' : ' + res.json()['path'] + ' , ' + res.json()['error'])

    def insert(self, table, objects, returning=[]):
        ''' Insert data method '''
        args = locals()
        del args['self']
        res = self.query('insert', {key : value for key, value in list(args.items()) if value})
        return res.json()

    def update(self, table, where, _set={}, _inc={}, _mul={}, _default={}, returning=[]):
        ''' Update data method '''
        args = locals()
        del args['self']
        res = self.query('update', {'$' + key[1:] if key[0] == '_' else key : value for key, value in list(args.items()) if value})
        return res.json()

    def delete(self, table, where, returning=[]):
        ''' Delete data method '''
        args = locals()
        del args['self']
        res = self.query('delete', {key : value for key, value in list(args.items()) if value})
        return res.json()

    def select(self, table, columns, where={}, order_by={}, limit=10, offset=0):
        ''' Select data method '''
        args = locals()
        del args['self']
        res = self.query('select', {key : value for key, value in list(args.items()) if value})
        return res.json()

    def count(self, table, where={}, distinct=[]):
        ''' Count method '''
        args = locals()
        del args['self']
        res = self.query('count', {key : value for key, value in list(args.items()) if value})
        return res.json()['count']
