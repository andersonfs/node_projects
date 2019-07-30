/**
 * Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
*/


// ABOUT THIS NODE.JS SAMPLE: This sample is part of the AWS Secrets Manager.
// In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://aws.amazon.com/developers/getting-started/nodejs/

// Load the AWS SDK
const AWS = require('aws-sdk');

const region = "us-east-1";
const secretName = "stg/frontend/clarotv";

// Create a Secrets Manager client
var client = new AWS.SecretsManager({
    region
});

// In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
// See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
// We rethrow the exception by default.

client.getSecretValue({SecretId: secretName}, function(err, data) {
    if (err) {
        if (err.code === 'DecryptionFailureException')
            console.log("Decryption failure: " + err.message);
        else if (err.code === 'InternalServiceErrorException')
            console.log("Internal server error: " + err.message);
        else if (err.code === 'InvalidParameterException')
            console.log("The request had invalid params: " + err.message);
        else if (err.code === 'InvalidRequestException')
            console.log("The request was invalid due to: " + err.message);
        else if (err.code === 'ResourceNotFoundException')
            console.log("The requested secret " + secretName + " was not found");
        else
          console.log("Generic error: " + err.message);
    } else {
        if (data.SecretString !== "") {
             const secret = JSON.parse(data.SecretString);
             console.log(data);
             console.log("========================================");
             console.log(secret.ampq_user);
             console.log(secret.ampq_password);
        } else {
          binarySecretData = data.SecretBinary;
          console.log(binarySecretData);
        }
    }
});
