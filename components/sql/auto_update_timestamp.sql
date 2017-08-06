CREATE OR REPLACE FUNCTION dhcp_event_update_timestamp_function()	
RETURNS TRIGGER AS $$
BEGIN
    NEW.timestamp = now();
    RETURN NEW;	
END;
$$ language 'plpgsql';

CREATE TRIGGER dhcp_event_update_timestamp_trigger BEFORE UPDATE ON dhcp_event FOR EACH ROW EXECUTE PROCEDURE  dhcp_event_update_timestamp_function();

