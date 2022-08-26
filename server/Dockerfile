FROM itisfoundation/puppeteer:14-3

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
RUN yarn

COPY . /app
CMD ["npm", "start"]