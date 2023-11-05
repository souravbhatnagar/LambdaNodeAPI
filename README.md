# LambdaNodeAPI
Creating &amp; building a node.js based sample REST API using AWS Lamda.

## Pre-requisite
### Installing Claudia.js
Claudia makes it easy to deploy Node.js projects to AWS Lambda and API Gateway. It automates all the error-prone deployment and configuration tasks, and sets everything up the way JavaScript developers expect out of the box.

Claudia is available on NPM, and the simplest way to use it is to install it as a global utility.
```shell
npm install claudia -g
```
This will make Claudia instantly available to all your projects. Verify that Claudia was installed correctly by running the following command:
```shell
claudia --version
```
### Configuring access credentials
Create an AWS profile with **IAM full access, Lambda full access and API Gateway Administrator privileges**.
Add the keys to your .aws/credentials file
```ini
[claudia]
aws_access_key_id = YOUR_ACCESS_KEY
aws_secret_access_key = YOUR_ACCESS_SECRET
```
Set the ```AWS_PROFILE``` environment variable to ```claudia```

## How to deploy
To make the app work correctly with AWS Lambda, you need to generate AWS Lambda wrapper for your Express app. With Claudia, you can do so by running the following command in your terminal:
```shell
claudia generate-serverless-express-proxy --express-module app
```
where ```app``` is a name of an entry file of your Express app, just without the .js extension.

This step generates a file named lambda.js

### Deploy your Express app (with lambda.js file) to AWS Lambda and API Gateway using the claudia create command
```shell
claudia create --handler lambda.handler --runtime nodejs16.x --deploy-proxy-api --region eu-central-1
```
## How to test
After executing the claudia create command there will be a json output generated, for example
```json
{
  "FunctionName": "lambdanodeapi",
  "FunctionArn": "arn:aws:lambda:us-east-1:462242201169:function:lambdanodeapi:2",
  "Runtime": "nodejs16.x",
  "Role": "arn:aws:iam::462242201169:role/lambdanodeapi-executor",
  "Handler": "lambda.handler",
  "CodeSize": 912543,
  "Description": "Creating &amp; building a node.js based sample REST API using AWS Lamda.",
  "Timeout": 3,
  "MemorySize": 128,
  "LastModified": "2023-11-05T04:00:36.000+0000",
  "CodeSha256": "jLC+GipX0wseFfPYCiVnQfPJ28Yhq+qKSs/Hyyw51SU=",
  "Version": "2",
  "KMSKeyArn": null,
  "TracingConfig": {
    "Mode": "PassThrough"
  },
  "MasterArn": null,
  "RevisionId": "fc435ea1-3a69-4f78-9c0e-3ed8f597b94c",
  "State": "Pending",
  "StateReason": "The function is being created.",
  "StateReasonCode": "Creating",
  "LastUpdateStatus": null,
  "LastUpdateStatusReason": null,
  "LastUpdateStatusReasonCode": null,
  "PackageType": "Zip",
  "SigningProfileVersionArn": null,
  "SigningJobArn": null,
  "Architectures": [
    "x86_64"
  ],
  "url": "https://tnwc520cwh.execute-api.us-east-1.amazonaws.com/latest"
}
```
From this we need to extract the ```url``` and execute the curl command as the following
```shell
curl -X GET https://tnwc520cwh.execute-api.us-east-1.amazonaws.com/latest/api/length/souravbhatnagar
```
This command will result in the following expected output
```shell
{"word":"souravbhatnagar","length":15}
```