function escapeMarkdown(text) {
    return text
        .replace(/\\/g, '\\\\') // backslash
        .replace(/\*/g, '\\*')  // asterisk
        .replace(/_/g, '\\_')   // underscore
        .replace(/~/g, '\\~')   // tilde
        .replace(/`/g, '\\`')   // backtick
        .replace(/>/g, '\\>')   // greater than
        .replace(/\|/g, '\\|'); // pipe
}

/**
 * Lambda function handler for incoming webhook events from SMS Gateway.
 * Validates the API key, processes the message, and forwards it to Discord.
 *
 * @param {Object} event - The event object passed to the handler.
 * @param {Object} context - The context object passed to the handler.
 * @returns {Promise} - A promise that resolves to the response object.
 */
module.exports.handler = async (event, context) => {
    // Check if the API key is valid
    const apiKey = event.queryStringParameters.apiKey;
    if (apiKey !== process.env.API_KEY) {
        return {
            statusCode: 401,
            body: 'Unauthorized' // Return 401 Unauthorized if the API key is invalid
        };
    }

    // Parse the request body
    const body = JSON.parse(event.body);
    const payload = body.payload;
    const phoneNumber = escapeMarkdown(payload.phoneNumber);
    const message = payload.message;

    // Prepare the message to be sent to Telegram
    const content = `New message from **${phoneNumber}**:\n\`${message}\``;

    // Send the message to Discord
    await fetch(process.env.WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content,
        }),
    });

    return {
        statusCode: 200,
        body: 'OK' // Return 200 OK if the message was sent successfully
    };
};
