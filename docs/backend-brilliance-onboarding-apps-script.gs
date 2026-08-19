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

function ensureHeaders(sheet) {
  const currentHeaders = sheet
    .getRange(1, 1, 1, Math.max(sheet.getLastColumn(), HEADERS.length))
    .getValues()[0];

  const needsHeaders = HEADERS.some(
    (header, index) => currentHeaders[index] !== header
  );

  if (needsHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
}

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    if (!lock.tryLock(5000)) {
      return jsonResponse({ success: false, error: "temporarily_locked" });
    }

    const body = JSON.parse(e.postData.contents);

    if (body.secret !== SHARED_SECRET) {
      return jsonResponse({ success: false, error: "unauthorized" });
    }

    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      return jsonResponse({ success: false, error: "sheet_not_found" });
    }

    ensureHeaders(sheet);

    const row = [
      clean(body.timestamp) || new Date().toISOString(),
      clean(body.submissionStatus) || clean(body.status) || "New",
      clean(body.submissionId),
      clean(body.servicePurchased) || clean(body.selectedService),
      clean(body.customService),
      clean(body.businessName),
      clean(body.contactName),
      clean(body.email),
      clean(body.phone),
      clean(body.businessWebsite) || clean(body.currentWebsite),
      clean(body.businessAddress),
      clean(body.addressOrServiceArea) || clean(body.serviceArea),
      clean(body.industry),
      clean(body.primaryGoals) || clean(body.primaryGoal),
      clean(body.primaryGoalOther),
      clean(body.currentProblem) || clean(body.currentSetup),
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
  } finally {
    try {
      lock.releaseLock();
    } catch (error) {
      // Lock may not have been acquired.
    }
  }
}
