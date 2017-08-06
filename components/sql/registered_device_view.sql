create view registered_device as 
  select ipv4, d.* from 
    (
			select device.mac, user_id, nick, registered_at, authorized_at, valid_till from device
    	left join authz
    	on authz.mac = device.mac
		) as d
		left join dhcp_event
		on dhcp_event.mac = d.mac
;
