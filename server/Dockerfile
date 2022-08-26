FROM node:16-alpine3.16
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
RUN apk update && apk add --no-cache nmap && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache \
      chromium \
      harfbuzz \
      "freetype>2.8" \
      ttf-freefont \
      nss


WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
RUN yarn

COPY . /app
CMD ["npm", "start"]