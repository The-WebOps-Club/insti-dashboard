#!/usr/bin/env python
"""
http://www.openldap.org/faq/data/cache/347.html

As seen working on Ubuntu 12.04 with OpenLDAP 2.4.28-1.1ubuntu4

Author: Roberto Aguilar <roberto@baremetal.io>
"""
import hashlib
import os
import base64

def check_password(tagged_digest_salt, password):
    """
    Checks the OpenLDAP tagged digest against the given password
    """
    # the entire payload is base64-encoded
    assert tagged_digest_salt.startswith('{SSHA}')

    # strip off the hash label
    digest_salt_b64 = tagged_digest_salt[6:]

    # the password+salt buffer is also base64-encoded.  decode and split the
    # digest and salt
    digest_salt = base64.b64decode(digest_salt_b64)
    digest = digest_salt[:20]
    salt = digest_salt[20:]

    sha = hashlib.sha1(password.encode())
    sha.update(salt)

    return digest == sha.digest()


def make_secret(password):
    """
    Encodes the given password as a base64 SSHA hash+salt buffer
    """
    salt = os.urandom(4)

    # hash the password and append the salt
    sha = hashlib.sha1(password.encode())
    sha.update(salt)

    # create a base64 encoded string of the concatenated digest + salt
    digest_salt_b64 = base64.b64encode(sha.digest() + salt).strip().decode('utf-8')

    # now tag the digest above with the {SSHA} tag
    tagged_digest_salt = '{{SSHA}}{}'.format(digest_salt_b64)

    return tagged_digest_salt
