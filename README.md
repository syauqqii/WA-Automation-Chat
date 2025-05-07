# 📱 WhatsApp Automation: Customer Service AI with Gemini API & Backend Endpoint for Campaign Marketing

WA Automation Chat is a project that automates WhatsApp messages using ~~`@open-wa/wa-automate`~~ `whatsapp-web.js`. It provides a backend endpoint for campaign marketing and customer service automation via the Gemini API (optional).

## 🚀 Features
- Uses ~~`@open-wa/wa-automate`~~ `whatsapp-web.js` for WhatsApp message automation.
- Implements Express with `express-rate-limit` to create an API with the `/send-message` or `/send-message-with-file` endpoint.  
- Provides an Express API with endpoints for sending messages:
    - `/send-message`: Send text messages.
    - `/send-message-with-file:` Send messages with media files.
- Uses dotenv for environment variable management.
- Rate limiting with express-rate-limit. 
- Integrates with Gemini AI API for customer service automation (optional).

## 🎬 Demo

[How to use (Video)](https://drive.google.com/file/d/1mb6Gpw3ecujCo18Rfj9OS0lqv6rfrBNE/view?usp=sharing)

## 🛠️ Installation and Setup

Clone this repository
```
git clone https://github.com/syauqqii/WA-Automation-Chat
```

Navigate to the Project Directory

```
cd WA-Automation-Chat
```

Install Dependencies

```
npm install
```

Configure Environment Variables, open a `.env` file in the project root:

```bash
# setting for SERVER
HOST=localhost
PORT=4437

# set for DEBUG [1 / 0], default: 1
DEBUG=1

# set message prefix command symbol
PREFIX_COMMAND=.

# setting for APPLICATION, default: [10 Requests/1 Minute]
LIMIT_MINUTES=1 # Minute, Default: 1
LIMIT_REQUEST=10 # Request, Default: 10

# setting for chat delay if array
MIN_DELAY_EVERY_CHAT=3 # Seconds, Default: 3
MAX_DELAY_EVERY_CHAT=5 # Seconds, Default: 5
BATCH_SIZE=5 # Bulk Sending Message, Default: 5

# gemini option, IS_NEED_CS [1 / 0], default: 0
ACTIVATE_AI=0
GEMINI_API_KEY=
```

Start the Application

```
npm start
```

## 🌐 API Endpoints

**Headers**
```bash
Content-Type: application/json
```

**[RAW] Send Message (Single Message)**
```bash
[POST] http://localhost:4437/send-message

data :
{
    "to":"62877xxxxxxx",
    "text":"Hello!!"
}
```

**[RAW] Send Message (Many Message)**
```bash
[POST] http://localhost:4437/send-message

data :
{
    "to":[
        "62812xxxxxxx",
        "62877xxxxxxx"
    ],
    "text":"Hello!!"
}
```

**[FORM-DATA] Send Message with Media (Single Message)**
```bash
[POST] http://localhost:4437/send-message-with-file

data :
{
    "to":"62812xxxxxxx"
    "text":"Hello!!",
    "file":<SELECT FROM YOUR PERSONAL COMPUTER>
}
```

**[FORM-DATA] Send Message with Media (Many Message)**
```bash
[POST] http://localhost:4437/send-message-with-file

data :
{
    "to":"62812xxxxxxx",
    "to":"62877xxxxxxx"
    "text":"Hello!!",
    "file":<SELECT FROM YOUR PERSONAL COMPUTER>
}
```

## 🧩 Integration with Gemini API (Optional)

If you want to add customer service automation:
- Get your Gemini API key.
- Add the key to the `.env` file:
```bash
ACTIVATE_AI=1
GEMINI_API_KEY=your-gemini-api-key
```
- Adjust your request payload to include the necessary parameters for Gemini AI.
