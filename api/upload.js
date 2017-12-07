'use strict';

const fetch = require('node-fetch');
const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(require('bluebird'));
const s3 = new AWS.S3();

module.exports.onsave = (event, context, callback) => {
    const done = (error, data) => callback(null, {
        statusCode: error ? 400 : 200,
        headers: {
            'x-custom-header' : 'custom header value',
            "Access-Control-Allow-Origin" : "*" 
        },
        body: error ? error.message : JSON.stringify(data)
    });

    let requestBody, pathParams, queryStringParams, httpMethod;

    // Request Body
    console.log('Body:');
    console.log(event.body);
    requestBody = JSON.parse(event.body);

    // Path Parameters
    pathParams = event.path;

    // Query String Parameters
    queryStringParams = event.queryStringParameters;

    if (requestBody.imageUrl === undefined || requestBody.imageUrl === null) {
        done(new Error('Image URL invalid.'));
        return;
    }

    console.log('requestBody.imageUrl:');
    console.log(requestBody.imageUrl);

    fetch(requestBody.imageUrl)
        .then((response) => {
            if (response.ok) {
                return response;
            } else {
                return Promise.reject(new Error(`Fetch error: ${response.url}: ${response.status} ${response.statusText}`));
            }
        })
        .then(response => response.buffer())
        .then(buffer => {
            console.log('Before put')
            s3.putObject({
                "Bucket": process.env.IMG_BUCKET,
                "Key": requestBody.key,
                "Body": buffer,
                "ACL": "public-read"
            }).promise()
            console.log('after put')
        })
        .then(res => done(null, {message: "Uploaded!"}))
        .catch(err => done(err));

};