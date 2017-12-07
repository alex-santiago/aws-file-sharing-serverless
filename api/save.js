'use strict';

// const fetch = require('node-fetch');
const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(require('bluebird'));
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports.saveInfo = (event, context, callback) => {
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
    requestBody = JSON.parse(event.body);

    // Path Parameters
    pathParams = event.path;

    // Query String Parameters
    queryStringParams = event.queryStringParameters;

    if (requestBody.description === undefined || requestBody.description === null) {
        done(new Error('Image description invalid.'));
        return;
    }

    if (requestBody.key === undefined || requestBody.key === null) {
      done(new Error('Image name invalid.'));
      return;
    }
    
    let putParams = {
        "TableName": process.env.FILES_TABLE,
        "Item": {
            "fileId": uuid.v1(),
            "fileName": requestBody.key,
            "fileDescription": requestBody.description,
            "Path": `https://s3-${process.env.REGION}.amazonaws.com/${process.env.IMG_BUCKET}/${requestBody.key}`
        }
    };
    dynamoDb.put(putParams).promise()
    .then(res => done(null, {message: "Saved!"}))
    .catch(err => done(err));

};