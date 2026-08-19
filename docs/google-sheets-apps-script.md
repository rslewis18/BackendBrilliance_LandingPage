# Google Sheets + Apps Script Setup

Onboarding submissions are sent from the Cloudflare Pages Function at
`/api/onboarding` to a secure Google Apps Script webhook.

Do not expose the webhook URL or shared secret in browser code.

## Sheet Headers

Create or update a Google Sheet tab named `Onboarding` with these headers in
this exact order. Existing rows can remain in place; add any new columns to the
sheet and use the script below for future rows.

```txt
Timestamp
Status
Submission ID
Service / Solution
Custom Service
Business Name
Contact Name
Email
Phone
Business Website
Business Address
Service Area
Industry
Primary Goals
Other Goal
Current Setup
Service Specific Data
Systems Involved
Access Notes
Primary Email
Primary Phone
Preferred Contact Method
Best Time To Contact
Additional Team Contact
Final Notes
Source
```

Default status is `New`.

## Canonical Browser Payload

The browser submits a service-neutral business-intake payload to
`/api/onboarding`. It includes shared business fields, selected service, goals,
system/access notes, communication preferences, and conditional service-specific
fields.

The key top-level fields are:

```txt
selectedService
servicePurchased
customService
businessName
contactName
email
phone
businessWebsite
businessAddress
serviceArea
industry
primaryGoals
primaryGoalOther
currentSetup
systemsInvolved
systemsOther
accessNotes
primaryEmail
primaryPhone
preferredContactMethod
bestContactTime
additionalTeamContact
finalNotes
universalNotes
source
```

The Cloudflare Pages Function validates and trims the payload, then sends
top-level properties to Apps Script. It also includes these server-added fields:

```txt
secret
timestamp
status
submissionId
serviceSpecificDetails
serviceSpecificData
submissionStatus
```

For backward compatibility with the previous quick-intake sheet script, the
function also sends legacy aliases such as `currentWebsite`, `services`,
`primaryGoal`, `brandAssetsLink`, and `additionalNotes`.

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
  "Submission ID",
  "Service / Solution",
  "Custom Service",
  "Business Name",
  "Contact Name",
  "Email",
  "Phone",
  "Business Website",
  "Business Address",
  "Service Area",
  "Industry",
  "Primary Goals",
  "Other Goal",
  "Current Setup",
  "Service Specific Data",
  "Systems Involved",
  "Access Notes",
  "Primary Email",
  "Primary Phone",
  "Preferred Contact Method",
  "Best Time To Contact",
  "Additional Team Contact",
  "Final Notes",
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
      clean(body.submissionId),
      clean(body.servicePurchased) || clean(body.selectedService),
      clean(body.customService),
      clean(body.businessName),
      clean(body.contactName),
      clean(body.email),
      clean(body.phone),
      clean(body.businessWebsite) || clean(body.currentWebsite),
      clean(body.businessAddress),
      clean(body.serviceArea),
      clean(body.industry),
      clean(body.primaryGoals) || clean(body.primaryGoal),
      clean(body.primaryGoalOther),
      clean(body.currentSetup),
      clean(body.serviceSpecificData) || clean(body.serviceSpecificDetails),
      clean(body.systemsInvolved),
      clean(body.accessNotes),
      clean(body.primaryEmail),
      clean(body.primaryPhone),
      clean(body.preferredContactMethod),
      clean(body.bestContactTime),
      clean(body.additionalTeamContact),
      clean(body.universalNotes) || clean(body.finalNotes) || clean(body.additionalNotes),
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

Do not report Google Sheets as fully live-tested until a real submission appears
in the sheet with the selected service and service-specific details populated.
