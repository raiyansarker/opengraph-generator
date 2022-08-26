FROM alekzonder/puppeteer:latest

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
RUN yarn

COPY . /app
CMD ["npm", "start"]