#!/usr/bin/env python
# -*- coding: utf-8 -*-
# File: radius.py
# Author: Shahidh K Muhammed <shahidhkmuhammed@gmail.com>
# Date: 20.06.2017
# Last Modified: 20.06.2017

from pyrad.client import Client
from pyrad.dictionary import Dictionary
import random
import socket
import os
import pyrad.packet

from .exceptions import RadiusException

SERVER = os.environ.get('RADIUS_SERVER', '10.24.0.245')
SECRET = os.environ['RADIUS_SECRET']


def SendPacket(srv, req):
    try:
        srv.SendPacket(req)
    except pyrad.client.Timeout:
        raise RadiusException("RADIUS server did not reply")
    except socket.error as error:
        raise RadiusException("Network error: " + error[1])


def send_accounting_packet(
        username,
        ip_addr,
        auth_group='cc-netaccess',
        start=True, stop=False
):
    srv = Client(
        server=SERVER,
        secret=SECRET.encode(),
        dict=Dictionary("src/dictionary")
    )

    req = srv.CreateAcctPacket(User_Name=username)

    req["Framed-IP-Address"] = ip_addr
    req["Filter-Id"] = auth_group

    if start and not stop:
        print("Sending accounting start packet")
        req["Acct-Status-Type"] = "Start"
        SendPacket(srv, req)

    elif not start and stop:
        print("Sending accounting stop packet")
        req["Acct-Status-Type"] = "Stop"
        req["Acct-Input-Octets"] = random.randrange(2**10, 2**30)
        req["Acct-Output-Octets"] = random.randrange(2**10, 2**30)
        req["Acct-Session-Time"] = random.randrange(120, 3600)
        req["Acct-Terminate-Cause"] = random.choice(
            ["User-Request", "Idle-Timeout"]
        )
        SendPacket(srv, req)

    return True
