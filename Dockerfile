FROM node:lts-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node

WORKDIR /home/node/app

COPY package.json package-lock.json ./
RUN npm install

USER node

COPY --chown=node:node . .

CMD npm start
