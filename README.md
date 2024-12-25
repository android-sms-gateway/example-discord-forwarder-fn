# Example Discord Forwarder Function

This repository contains a Cloud Function designed to forward incoming SMS messages received through the [SMS Gateway for Android™](https://github.com/capcom6/android-sms-gateway) Webhooks to a Discord Webhook.

## Prerequisites

- Node.js installed on your machine
- SMS Gateway installed on your device in any mode: Local, Cloud or Private
- A Discord Server with Webhook registered as described at https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks

## Getting Started

1. Clone this repository to your local machine.
2. Install the required dependencies by running `npm install`.
3. Set up your environment variables to include:
   - `API_KEY`: Random value, which will be passed to cloud function in `apiKey` query parameter from webhook.
   - `WEBHOOK_URL`: Discord Webhook URL.
4. Deploy the function to your preferred cloud provider. You might need to make some changes to the source code, please consult with your cloud provider documentation.
5. [Register webhook in SMS Gateway](https://sms.capcom.me/getting-started/webhooks/) with the URL of your deployed function adding `?apiKey=YOUR_API_KEY` query parameter.

## Environment Variables

Ensure you have the following environment variables set up:

- `API_KEY`: Random value, which will be passed to cloud function in `apiKey` query parameter from webhook for security purposes.
- `WEBHOOK_URL`: Discord Webhook URL.

## Usage

The function is triggered by incoming webhook events from SMS Gateway. When an SMS message is received, the function validates the API key, processes the message, and forwards it to the specified Discord webhook.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the Apache-2.0 License - see the [LICENSE](LICENSE) file for details.
