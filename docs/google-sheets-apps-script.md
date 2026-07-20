# Google Sheets + Apps Script Setup

Onboarding submissions are sent from the Cloudflare Pages Function at
`/api/onboarding` to a secure Google Apps Script webhook.

Do not expose the webhook URL or shared secret in browser code.

## Sheet Headers

Create a Google Sheet tab named `Onboarding` with these headers in this exact
order:

```txt
Timestamp
Status
Business Name
Contact Name
Email
Phone
Current Website
Services
Service Area
Primary Goal
Preferred Contact Method
Brand Assets Link
Additional Notes
Source
```

Default status is `New`.

## Canonical Cloudflare Payload

The browser submits this canonical payload to `/api/onboarding`:

```json
{
  "businessName": "",
  "contactName": "",
  "email": "",
  "phone": "",
  "currentWebsite": "",
  "services": "",
  "serviceArea": "",
  "primaryGoal": "",
  "preferredContactMethod": "",
  "brandAssetsLink": "",
  "additionalNotes": "",
  "source": "Backend Brilliance Onboarding"
}
```

The Cloudflare Pages Function validates and trims those fields, then sends the
same top-level property names to Apps Script, plus:

```txt
secret
timestamp
status
```

Do not nest onboarding fields under `data`, `formData`, `row`, or another
object in Apps Script.

## Apps Script Example

Replace `PASTE_SHARED_SECRET_HERE` with the same value used for
`GOOGLE_SHEETS_WEBHOOK_SECRET` in Cloudflare Pages.

```js
const SHARED_SECRET = "PASTE_SHARED_SECRET_HERE";
const SHEET_NAME = "Onboarding";

const HEADERS = [
  "Timestamp",
  "Status",
  "Business Name",
  "Contact Name",
  "Email",
  "Phone",
  "Current Website",
  "Services",
  "Service Area",
  "Primary Goal",
  "Preferred Contact Method",
  "Brand Assets Link",
  "Additional Notes",
  "Source",
];

function jsonResponse(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    if (body.secret !== SHARED_SECRET) {
      return jsonResponse({ success: false, error: "unauthorized" });
    }

    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      return jsonResponse({ success: false, error: "sheet_not_found" });
    }

    const row = [
      clean(body.timestamp) || new Date().toISOString(),
      clean(body.status) || "New",
      clean(body.businessName),
      clean(body.contactName),
      clean(body.email),
      clean(body.phone),
      clean(body.currentWebsite),
      clean(body.services),
      clean(body.serviceArea),
      clean(body.primaryGoal),
      clean(body.preferredContactMethod),
      clean(body.brandAssetsLink),
      clean(body.additionalNotes),
      clean(body.source) || "Backend Brilliance Onboarding",
    ];

    sheet.appendRow(row);

    return jsonResponse({ success: true });
  } catch (error) {
    return jsonResponse({
      success: false,
      error: error && error.message ? error.message : "unknown_error",
    });
  }
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
sheet with all columns populated.
