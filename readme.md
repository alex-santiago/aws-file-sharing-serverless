# Serverless Deployed Service that Uploads a file to an AWS S3 Bucket

Using the Serverless framework for the backend and a simple HTML and JavaScript frontend  hosted this service uses AWS create a small file sharing service.

This service keep files in an s3 bucket and adds a reference to a DynamoDB table. The DynamoDB table is used to create a list of files and a brief description that will be displayed on the hosted site.

## Instalation

1. Clone the repository.

2. Create a `variables.yml` and choose a unique S3 bucket name. The file content should be as follows:
```yml
# environment variables
  var:
    IMG_BUCKET: 'Unique bucket name'
```
5. In order to deploy the api to AWS, simply run:
```bash
serverless deploy
```

4. Create a `vars.js` and fill in the file with the endpoints for the `fileupload` and `fileinfo`. The file content should be as follows:
```js
exports.pathupload = () => { return 'https://< FILE UP LOAD URL >' };
exports.pathinfo = () => { return 'https://< FILE INFO URL>' };
```

5. Generate the HTML form (index.html) by executing:
```bash
node generate-index-html.js
```

## Usage

Open the generated `index.html` in your browser and upload an image to the AWS S3 bucket informed in Instalation step 3. 

Click on the List Files button to view a list of uploaded files.


