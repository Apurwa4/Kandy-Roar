// Add these functions alongside your existing doPost and jsonResponse functions.
// Call sendRegistrationConfirmation(data) AFTER SpreadsheetApp.flush().
function sendRegistrationConfirmation(data) {
  try {
    // One recipient only: do not allow commas, semicolons, or line breaks.
    const email = String(data.email || "").trim();
    if (!/^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/.test(email)) {
      return "failed";
    }
    if (MailApp.getRemainingDailyQuota() < 1) {
      return "quota_exceeded";
    }

    const name = String(data.fullName || "Delegate").trim();
    const code = String(data.id || "").trim();
    const entity = String(data.entity || "").trim();
    const body = [
      "Hello " + name + ",",
      "",
      "Your registration for Kandy Roar 7.0 has been recorded!",
      "",
      "Registration code: " + code,
      "Entity: " + entity,
      "",
      "Keep this email and your registration code for reference.",
      "",
      "For questions, contact our Royal Messengers:",
      "Kavishka: kavishkaaushadi@aiesec.net | 076 220 6380",
      "Dilshini: dilshibandara@aiesec.net | 076 289 9108",
      "",
      "See you at the royal gathering!",
      "Kandy Roar 7.0 Organizing Committee",
      "AIESEC in Kandy",
    ].join("\n");

    MailApp.sendEmail({
      to: email,
      subject: "Kandy Roar 7.0 — Registration Confirmation",
      name: "Kandy Roar 7.0 | AIESEC in Kandy",
      replyTo: "kavishkaaushadi@aiesec.net",
      body: body,
      htmlBody:
        '<div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;color:#210408;line-height:1.7">' +
        '<h1 style="background:#580b1a;color:#f1cf6b;padding:24px">KANDY ROAR 7.0</h1>' +
        '<div style="padding:0 24px 24px">' +
        "<h2>Your Registration Is Confirmed!</h2>" +
        "<p>Hello " + escapeEmailHtml(name) + ",</p>" +
        "<p>Your registration for Kandy Roar 7.0 has been recorded.</p>" +
        '<p style="background:#f4eee3;padding:16px"><strong>Registration code: ' + escapeEmailHtml(code) +
        "</strong><br>Entity: " + escapeEmailHtml(entity) + "</p>" +
        "<p>Keep this email and your registration code for reference.</p>" +
        "<p>For questions, contact our Royal Messengers:<br>" +
        '<a href="mailto:kavishkaaushadi@aiesec.net">Kavishka</a> · 076 220 6380<br>' +
        '<a href="mailto:dilshibandara@aiesec.net">Dilshini</a> · 076 289 9108</p>' +
        "<p>See you at the royal gathering!<br>Kandy Roar 7.0 Organizing Committee<br>AIESEC in Kandy</p>" +
        "</div></div>",
    });
    return "sent";
  } catch (_) {
    // The registration is already saved; email failure must not undo success.
    console.error("Registration saved, but confirmation email could not be sent.");
    return "failed";
  }
}

function escapeEmailHtml(value) {
  return String(value).replace(/[&<>"']/g, function (character) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
  });
}

// Run this once in the editor to authorize Sheets access and email sending.
// It checks the quota without sending a test email.
function authorizeConfirmationEmail() {
  SpreadsheetApp.openById("PASTE_YOUR_EXISTING_SPREADSHEET_ID_HERE").getName();
  console.log("Remaining email recipients today: " + MailApp.getRemainingDailyQuota());
}
