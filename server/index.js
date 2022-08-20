require('dotenv').config();
const express = require('express');
const puppeteer = require('puppeteer');
const slugify = require('slugify');
const { upload } = require('./lib/s3');

const app = express();

app.use(express.json());

app.post('/generate', async (req, res) => {
  const { avatar, title, author } = req.body;
  if (author !== undefined && title !== undefined && avatar !== undefined) {
    const construcURL = `${
      process.env.TEMPLATE_URL
    }/?avatar=${encodeURIComponent(avatar)}&title=${encodeURIComponent(
      title
    )}&author=${encodeURIComponent(author)}`;

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
      waitUntil: 'networkidle0',
    });

    const tmpFileName = `tmp-${Date.now()}.webp`;
    const path = `${__dirname}/${tmpFileName}`;

    await page.screenshot({
      path: tmpFileName,
      type: 'webp',
      fullPage: true,
    });
    await browser.close();

    const data = await upload(slugify(`${title}.webp`), path);

    res.status(201).json({
      status: 201,
      message: 'Upload successful',
      file: {
        url: data.Location.replace(`${new URL(data.Location).hostname}/`, ''),
        etag: data.ETag.substring(1, data.ETag.length - 1),
      },
    });
  } else {
    res.status(400).json({
      status: 400,
      error: {
        message: 'Data is not provided.',
      },
    });
  }
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
