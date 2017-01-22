/**
 * Created by dulino on 6/11/16.
 */

var lambda=require("./index");


var launchRequest={
    "version": "1.0",
    "session": {
        "new": true,

        "user": {
            "userId": "TEST"
        }
    },
    "request": {
        "type": "LaunchRequest",
        "requestId": "amzn1.echo-api.request.e1a63226-2cb4-4a06-8a14-efd003c3c908",
        "timestamp": "2016-06-19T17:21:42Z",
        "locale": "en-US"
    }
};

var canIWatch={
    "version": "1.0",
    "session": {
        "new": true,
        "user": {
            "userId": "TEST"
        },
        "application": {
            "applicationId": "amzn1.echo-sdk-ams.app.f8fc1f7d-65bf-4fd6-9a1a-f9ab92eea501"
        }
    },
    "request": {
        "type": "IntentRequest",
        "requestId": "amzn1.echo-api.request.b3130a31-9e4b-4c07-903a-8f45882efbee",
        "timestamp": "2016-06-19T18:06:17Z",
        "locale": "en-US",
        "intent": {
            "name": "CanIWatchIntent"
        }
    }
}



var context={
    succeed: function(success) {
        console.log(JSON.stringify(success));
    },
    fail: function(error) {
        console.log(JSON.stringify(error));
    }
}

lambda.handler(canIWatch, context);