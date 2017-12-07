#!/usr/bin/env node

const fs = require('fs');
const vars = require('./vars')

const pathupload = vars.pathupload(); 
const pathinfo = vars.pathinfo(); 

// const msPerDay = 24 * 60 * 60 * 1000;
// const expiration = new Date(Date.now() + msPerDay).toISOString();
// const bucketUrl = `https://${bucketName}.s3.amazonaws.com`;

// const policy = {
//   expiration,
//   conditions: [
//     ['starts-with', '$key', 'uploads/'],
//     { bucket: bucketName },
//     { acl: 'public-read' },
//     ['starts-with', '$Content-Type', 'image/png'],
//     { success_action_status: '201' },
//   ],
// };

// const policyB64 = Buffer(JSON.stringify(policy), 'utf-8').toString('base64');

// const hmac = crypto.createHmac('sha1', awsSecretAccessKey);
// hmac.update(new Buffer(policyB64, 'utf-8'));

// const signature = hmac.digest('base64');

fs.readFile('template/index-template.html', 'utf8', (err, input) => {
  if (err) {
    console.log(err);
  }

  const data = input
    .replace(/%SERVICE_PATH_UPLOAD%/g, pathupload)
    .replace(/%SERVICE_PATH_INFO%/g, pathinfo)

  fs.writeFile('website/index.html', data, 'utf8', (e) => {
    if (e) {
      console.log(e);
    }
  });
});
