# Heartland Referral API

Vercel serverless function that receives form submissions from the Heartland Behavior Group referral form and appends rows to Google Sheets.

## Deploy

1. Push this folder to a GitHub repo
2. Import the repo into Vercel
3. Add the environment variables below in Vercel → Project Settings → Environment Variables
4. Deploy — Vercel will give you a URL like `https://your-project.vercel.app`
5. Paste `https://your-project.vercel.app/api/submit-referral` into the Framer component's Webhook URL property control

## Environment Variables

Add these in Vercel → Settings → Environment Variables:

| Variable | Value |
|---|---|
| GOOGLE_PROJECT_ID | lucidxpress-1702957070976 |
| GOOGLE_PRIVATE_KEY_ID | 62e303d71b8f92fa637c99dd184efba85a3945a5 |
| GOOGLE_PRIVATE_KEY | (paste the full private key including BEGIN/END lines) |
| GOOGLE_CLIENT_EMAIL | heartland@lucidxpress-1702957070976.iam.gserviceaccount.com |
| GOOGLE_CLIENT_ID | 114391244656762945777 |

### GOOGLE_PRIVATE_KEY formatting note
In Vercel, paste the private key exactly as it appears in the JSON file — including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines. Vercel handles the newlines correctly.

## Endpoint

`POST /api/submit-referral`

Accepts JSON body with all referral form fields. Returns `{ success: true }` on success.
