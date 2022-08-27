FROM node:16
WORKDIR /app

RUN apt-get install -y \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libgbm1 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxfixes3 \
  libxi6 \
  libxrandr2 \
  libxss1 \
  libxtst6

COPY package.json .
COPY yarn.lock  .
RUN yarn install --production

RUN chmod -R o+rwx node_modules/puppeteer/.local-chromium

CMD [ "yarn", "start" ]