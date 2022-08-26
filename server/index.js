require('dotenv').config();
const express = require('express');
const { getPostBySlug } = require('./lib/api');
const puppeteer = require('puppeteer');

const app = express();

app.use(express.json());

app.get('/blog/:slug', async (req, res) => {
  const {
    data: { data: info },
  } = await getPostBySlug(req.params.slug);

  if (info.post === null) {
    return res.json({
      error: 'Wrong details',
      message: 'Why are you here?',
    });
  }

  const {
    title,
    author: {
      node: {
        name,
        avatar: { foundAvatar, url },
      },
    },
  } = info.post;

  let avatarURL = url;

  if (!foundAvatar || url.includes('gravatar'))
    avatarURL = 'https://media.raiyansarker.com/avatar/default.png';

  const construcURL = `${process.env.TEMPLATE_URL}/?avatar=${encodeURIComponent(
    avatarURL
  )}&title=${encodeURIComponent(title)}&author=${encodeURIComponent(name)}`;
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: true,
  });
  const page = await browser.newPage();
  await page.emulate({
    userAgent:
      'Mozilla/5.0 (Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36 Thumbnail-Generator/1.0 (+https://raiyansarker.com)',
    viewport: {
      width: 1200,
      height: 628,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: true,
    },
  });

  await page.goto(construcURL, {
    waitUntil: 'domcontentloaded',
  });

  // Wait until all images and fonts have loaded
  await page.evaluate(async () => {
    const selectors = Array.from(document.querySelectorAll('img'));
    await Promise.all([
      document.fonts.ready,
      ...selectors.map((img) => {
        // Image has already finished loading, let’s see if it worked
        if (img.complete) {
          // Image loaded and has presence
          if (img.naturalHeight !== 0) return;
          // Image failed, so it has no height
          throw new Error('Image failed to load');
        }
        // Image hasn’t loaded yet, added an event listener to know when it does
        return new Promise((resolve, reject) => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', reject);
        });
      }),
    ]);
  });
  const image = await page.screenshot({
    type: 'png',
    fullPage: true,
    deviceScaleFactor: 2,
  });
  await browser.close();
  res.status(200);
  res.setHeader('Content-Type', `image/png`);
  res.end(image);
});

app.get('/health-check', (req, res) => {
  res.status(200).json({
    status: 'OK 😀',
  });
});

app.all('*', (req, res) => {
  res.status(403).json({
    status: 403,
    error: {
      message: 'You are not invited here.',
    },
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
