
'use strict';

const AWS = require('aws-sdk');
AWS.config.setPromisesDependency(require('bluebird'));
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.listAllFiles = (event, context, callback) => {
    const done = (error, data) => callback(null, {
        statusCode: error ? 400 : 200,
        headers: {
            'x-custom-header' : 'custom header value',
            "Access-Control-Allow-Origin" : "*" 
        },
        body: error ? error.message : JSON.stringify(data)
    });

    dynamoDb.scan({"TableName": process.env.FILES_TABLE}).promise()
    .then(data => done(null, data))
    .catch(err => done(err));
};