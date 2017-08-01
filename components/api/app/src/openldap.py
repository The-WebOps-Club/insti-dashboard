#!/usr/bin/env python
# -*- coding: utf-8 -*-
# File: openldap.py
# Author: Shahidh K Muhammed <shahidhkmuhammed@gmail.com>
# Date: 18.06.2017
# Last Modified: 18.06.2017

import os
import ldap
from password import check_password
from exceptions import LDAPLoginException

LDAP_BIND_URL = os.environ.get('LDAP_BIND_URL', 'ldap://10.24.0.127:389')
LDAP_BIND_DN  = os.environ.get('LDAP_BIND_DN', 'cn=hproxybind,ou=bind,dc=ldap,dc=iitm,dc=ac,dc=in')
LDAP_BIND_PW  = os.environ['LDAP_BIND_PW'] # Required
LDAP_BASE_DN  = os.environ.get('LDAP_BASE_DN', 'dc=ldap,dc=iitm,dc=ac,dc=in')

def convert(data):
  data_type = type(data)

  if data_type == bytes: return data.decode()
  if data_type in (str, int): return str(data)

  if data_type == dict: data = data.items()
  return data_type(map(convert, data))

def search_user(conn, username):
    results = conn.search_s(LDAP_BASE_DN, ldap.SCOPE_SUBTREE, "(cn=%s)" % username)
    return results

def login(username, password):
    conn = ldap.initialize(LDAP_BIND_URL, bytes_mode=False)

    conn.simple_bind_s(LDAP_BIND_DN, LDAP_BIND_PW)
    results = conn.search_s(LDAP_BASE_DN, ldap.SCOPE_SUBTREE, "(cn=%s)" % username)
    if len(results) == 1:
        hashed_passwd = results[0][1]['userPassword'][0].decode('UTF-8')
        if check_password(hashed_passwd, password):
            return convert(results[0])
        else:
            raise(LDAPLoginException('Invalid password'))
    else:
        raise(LDAPLoginException('Invalid username'))
