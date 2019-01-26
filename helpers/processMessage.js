const API_AI_TOKEN = '9dc4da8a97a04023a0538c5195da8248';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'EAAgxaOo1z7IBAIcZA9ggOqB6mdThtv6Oa2etLZACV36X1wrNPGyZAIsLGnKqqohqDP7ZC2yw2ZC0kXZCbaHEPVekCrIG0wrbYfqsr91X8M7L9HQrmxRGvWqmjiiPiO15CG8kEg93Okvqe8KY28vJSlyH3GxZBrofopnbdgu4eyzsQZDZD';
const request = require('request');
const sendTextMessage = (senderId, text) => {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: { text },
        }
    });
};
module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;
    const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'review_by_mr.&mrs.'});
    apiaiSession.on('response', (response) => {
        const result = response.result.fulfillment.speech;
        sendTextMessage(senderId, result);
        console.log("Result Sent: " + result);
    });
    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
};