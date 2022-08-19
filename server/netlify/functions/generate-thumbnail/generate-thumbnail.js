const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');
const { upload } = require('../../../lib/s3');
const fspath = require('path');
const slugify = require('slugify');

const handler = async (event) => {
  if (event.httpMethod === 'POST') {
    const request = JSON.parse(event.body);
    const { avatar, title, author } = request;
    if (author !== undefined && title !== undefined && avatar !== undefined) {
      const construcURL = `${
        process.env.TEMPLATE_URL
      }/?avatar=${encodeURIComponent(avatar)}&title=${encodeURIComponent(
        title
      )}&author=${encodeURIComponent(author)}`;

      const browser = await puppeteer.launch({
        args: chrome.args,
        headless: true,
        executablePath:
          process.env.CHROME_EXEC_PATH || (await chrome.executablePath),
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
        waitUntil: 'networkidle2',
      });

      const tmpFileName = `tmp-${Date.now()}.webp`;
      const path = `${fspath.join(__dirname, '../../../')}${tmpFileName}`;

      await page.screenshot({
        path: tmpFileName,
        type: 'webp',
        quality: 70,
        fullPage: true,
      });
      await browser.close();

      const data = await upload(slugify(`${title}.webp`), path);

      return {
        statusCode: 201,
        body: JSON.stringify({
          message: 'Upload successful',
          file: {
            url: data.Location,
            etag: data.ETag,
          },
        }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({
          status: 400,
          error: {
            message: 'Data is not provided',
          },
        }),
      };
    }
  } else {
    try {
      return {
        statusCode: 403,
        body: JSON.stringify({
          status: 403,
          error: {
            message: 'You are not invited here',
          },
        }),
      };
    } catch {
      return {
        statusCode: 500,
        error: {
          message: 'Something went wrong',
        },
      };
    }
  }
};

module.exports = { handler };
