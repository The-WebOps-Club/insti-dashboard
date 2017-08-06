FROM mhart/alpine-node:6 

# APK is the alpine-pakage-manager Python gcc is need for node-sass
RUN apk add --no-cache make gcc g++ python git

RUN npm install -g bower gulp http-server
#Install deps
RUN mkdir /app
COPY ./package.json /app/package.json
COPY ./bower.json /app/bower.json
RUN cd /app && npm install
RUN cd /app && bower --allow-root install

#Add all source code
ADD . /app/
RUN cd /app && gulp build 

#Default command
CMD ["/app/runserver.sh"]
