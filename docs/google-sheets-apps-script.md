# Google Sheets + Apps Script Setup

Onboarding submissions are sent from the Cloudflare Pages Function at
`/api/onboarding` to a secure Google Apps Script webhook.

Do not expose the webhook URL or secret in browser code.

## Sheet Headers

Create a Google Sheet with these headers:

```txt
Submission ID
Timestamp
Status
Selected Offer
Business Name
Contact Name
Email
Phone
Preferred Contact Method
Industry
Website
Domain
Current Website Platform
Business Address
Service Area
Business Description
Primary Services
Priority Service
Highest-Revenue Service
Promotions
Pricing Information
Financing Information
Brand Colors
Brand Style
Brand Asset Link
Booking Platform
Booking URL
Current CRM
Lead Notification Email
Lead Notification Phone
Facebook
Instagram
TikTok
LinkedIn
YouTube
Google Business Profile
Goals
Primary Goal
Competitors
Deadline
Additional Notes
```

Default status is `New Client`.

## Apps Script Example

Replace `PASTE_SHARED_SECRET_HERE` with the same value used for
`GOOGLE_SHEETS_WEBHOOK_SECRET` in Cloudflare Pages.

```js
const SHARED_SECRET = "PASTE_SHARED_SECRET_HERE";
const SHEET_NAME = "Onboarding";

function doPost(e) {
  const payload = JSON.parse(e.postData.contents);

  if (payload.secret !== SHARED_SECRET) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: "unauthorized" })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const headers = payload.headers;
  const row = headers.map((header) => payload.row[header] || "");

  sheet.appendRow(row);

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true })
  ).setMimeType(ContentService.MimeType.JSON);
}
```

## Cloudflare Environment Variables

Set these in both Preview and Production as appropriate:

```env
GOOGLE_SHEETS_WEBHOOK_URL=
GOOGLE_SHEETS_WEBHOOK_SECRET=
```

The Cloudflare Pages Function sends the shared secret only from server-side code
inside the webhook payload. It is never exposed in the browser bundle.

Do not report Google Sheets as tested until a real submission appears in the
sheet.
