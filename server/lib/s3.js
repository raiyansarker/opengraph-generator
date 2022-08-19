// const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

const bucketName = process.env.BUCKET_NAME;
const region = process.env.REGION;
// const endpoint = process.env.ENDPOINT
const accessKey = process.env.ACCESS_KEY;
const secretKey = process.env.SECRET_KEY;

const s3 = new S3({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  region,
});

// Upload
const upload = async (key = `tmp-${Date.now()}.webp`, body = null) => {
  const file = fs.readFileSync(body);

  const params = {
    Bucket: bucketName,
    Key: `thumbnail/${key}`,
    Body: file,
    ACL: 'public-read',
    ContentType: 'image/webp',
  };

  try {
    const data = await s3.upload(params).promise();
    fs.unlinkSync(body);
    return data;
  } catch (error) {
    console.error('Uplaod error', error);
  }
};

// Delete

module.exports = { upload };
