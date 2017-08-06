#!/bin/bash

cat << EOF
apiVersion: v1
kind: ConfigMap
metadata:
  name: hasura-project-conf
  namespace: default
data:
  project: |
$(python -c 'import sys, yaml, json; json.dump(yaml.load(sys.stdin), sys.stdout, indent=2, sort_keys=False)' < project-conf.yaml | jq '.' | awk '$0="    "$0')
EOF
