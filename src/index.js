/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * CanIWatchSkill is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var CanIWatchSkill = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
CanIWatchSkill.prototype = Object.create(AlexaSkill.prototype);
CanIWatchSkill.prototype.constructor = CanIWatchSkill;

CanIWatchSkill.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("CanIWatchSkill onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

CanIWatchSkill.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("CanIWatchSkill onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    response.tell(fortune.fortune());
};

CanIWatchSkill.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("CanIWatchSkill onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

CanIWatchSkill.prototype.intentHandlers = {
    // register custom intent handlers
    "CanIWatchIntent": function (intent, session, response) {
        //response.tellWithCard("Blah! Blah! Blah! This skill is not fully implemented yet", "Can I Watch", "Not implemented yet");//
        session.attributes.conversationState='homework';
        response.ask("Is your homework done?", "Is your homework done? You can say yes or no");
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.tell('I help you decide whether you should be watching TV or not');
    },
    "AMAZON.YesIntent" : function(intent, session, response) {
        if (session.attributes.conversationState=='homework') {
            session.attributes.conversationState='musicalInstrument';
            response.ask("Have you practiced your musical instrument ?", "Have you practiced your musical instrument ? You can say yes or no");
        }
        if (session.attributes.conversationState=='musicalInstrument') {
            session.attributes.conversationState='readABook';
            response.ask("Have you read a book today?", "Have you read a book today? You can say yes or no");
        }
        if (session.attributes.conversationState=='readABook') {
            session.attributes.conversationState='laundry';
            response.ask("Is your laundry done?","Is your laundry done? You can say yes or no" );
        }
        if (session.attributes.conversationState=='laundry'){
            session.attributes.conversationState='roomClean';
            response.ask('Is your room reasonably clean?', 'Is your room clean? You can say yes or no');
        }
        if (session.attributes.conversationState=='roomClean') {
            response.tell('You may watch, play on the iPad or play on the computer for 40 minutes, or 2 episodes. You can ask me to set a timer.')
        }




            response.tell('You said Yes to something but I am totally confused. I have no idea what we are talking about');



    },
    "AMAZON.NoIntent" : function(intent, session, response) {
        if (session.attributes.conversationState=='homework') {
            response.tell('Complete your homework, and please ask me again when you are done');
        }
        if (session.attributes.conversationState=='musicalInstrument') {
            response.tell('Please practice your musical instrument for 10 minutes. You can ask me to set a timer. Please ask me again when you are done.');
        }
        if (session.attributes.conversationState=='readABook') {
            response.tell('Please read a book for 20 minutes. You can ask me to set a timer. Please ask me again when you are done');
        }
        if (session.attributes.conversationState=='laundry') {
            response.tell('Please complete your laundry. Please ask me again when you are done');
        }
        if (session.attributes.conversationState=='cleanRoom'){
            response.tell('Make sure your room is reasonably clean. Please ask me again when you are done');
        }

        response.tell('You said No to something but I am totally confused. I have no idea what we are talking about');

    }
};


// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the CanIWatchSkill skill.
    console.log(JSON.stringify(event));
    var f = new CanIWatchSkill();
    f.execute(event, context);
};

