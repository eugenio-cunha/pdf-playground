FROM node:alpine

ENV HOME=/usr/src/app
WORKDIR $HOME

EXPOSE 3000

COPY . $HOME

RUN npm install --silent --production && npm rebuild --quiet

CMD [ "npm", "start" ]
