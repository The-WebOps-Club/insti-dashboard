#!/usr/bin/env python
# -*- coding: utf-8 -*-
# File: exceptions.py
# Author: Shahidh K Muhammed <shahidhkmuhammed@gmail.com>
# Date: 18.06.2017
# Last Modified: 20.06.2017

class LDAPLoginException(Exception):
    def __init___(self, dErrorArguments):
        Exception.__init__(self, "LDAP login failed: {0}".format(dErrArguments))
        self.dErrorArguments = dErrorArguements

class HasuraAuthException(Exception):
    def __init___(self, dErrorArguments):
        Exception.__init__(self, "Hasura auth failed: {0}".format(dErrArguments))
        self.dErrorArguments = dErrorArguements

class HasuraDataException(Exception):
    def __init___(self, dErrorArguments):
        Exception.__init__(self, "Hasura data failed: {0}".format(dErrArguments))
        self.dErrorArguments = dErrorArguements

class RadiusException(Exception):
    def __init___(self, dErrorArguments):
        Exception.__init__(self, "Radius action failed: {0}".format(dErrArguments))
        self.dErrorArguments = dErrorArguements
