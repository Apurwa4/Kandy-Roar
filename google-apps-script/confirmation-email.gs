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
      "Villager name: " + name,
      "Entity: " + entity,
      "Email: " + email,
      "Gathering dates: 9th–10th January (Tentative)",
      "Royal Duty Approved",
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

    const logo = loadConfirmationLogo();
    const message = {
      to: email,
      subject: "Kandy Roar 7.0 — Registration Confirmation",
      name: "Kandy Roar 7.0 | AIESEC in Kandy",
      replyTo: "kavishkaaushadi@aiesec.net",
      body: body,
      htmlBody: buildRegistrationEmailHtml(data, Boolean(logo)),
    };
    if (logo) {
      message.inlineImages = { kandyRoarLogo: logo };
    }
    MailApp.sendEmail(message);
    return "sent";
  } catch (_) {
    // The registration is already saved; email failure must not undo success.
    console.error("Registration saved, but confirmation email could not be sent.");
    return "failed";
  }
}

function loadConfirmationLogo() {
  try {
    const response = UrlFetchApp.fetch(
      "https://kandy-roar-7.vercel.app/images/kandy-roar-logo-transparent.png",
      { muteHttpExceptions: true, followRedirects: true }
    );
    const blob = response.getBlob();
    if (response.getResponseCode() !== 200 || blob.getContentType() !== "image/png") {
      throw new Error("Logo URL did not return a PNG image.");
    }
    return blob.setName("kandy-roar-logo.png");
  } catch (_) {
    // Keep sending the confirmation if the image is unavailable.
    console.error("Confirmation logo could not be loaded; email will use text branding.");
    return null;
  }
}

function buildRegistrationEmailHtml(data, hasInlineLogo) {
  const name = escapeEmailHtml(String(data.fullName || "Delegate").trim());
  const code = escapeEmailHtml(String(data.id || "").trim());
  const entity = escapeEmailHtml(String(data.entity || "").trim());
  const email = escapeEmailHtml(String(data.email || "").trim());

  // Tables and inline styles work without JavaScript in email clients.
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f7f1e5;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f7f1e5;font-family:Arial,Helvetica,sans-serif;color:#2b1810;">
    <tr><td align="center" style="padding:24px 12px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;">
        <tr><td align="center" style="padding:24px;background-color:#580b1a;border-radius:18px 18px 0 0;">
          <h1 style="margin:0;font-size:26px;color:#f1cf6b;">KANDY ROAR 7.0</h1>
          <p style="margin:8px 0 0;font-size:13px;color:#fae19c;">AIESEC in Kandy</p>
        </td></tr>
        <tr><td style="padding:24px 16px;background-color:#fffdf8;">
          <h2 style="margin:0 0 16px;font-size:23px;color:#750f24;">Your Royal Registration Is Confirmed!</h2>
          <p style="margin:0 0 12px;line-height:1.7;">Hello ${name},</p>
          <p style="margin:0 0 24px;line-height:1.7;">Your registration has been recorded. Here is your delegate pass for the royal gathering.</p>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:2px solid #c9b382;border-radius:18px;background-color:#fffefa;">
            <tr><td style="padding:20px 16px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="90" valign="middle" style="padding-right:12px;">
                    ${hasInlineLogo
                      ? '<img src="cid:kandyRoarLogo" width="90" height="48" alt="Kandy Roar" style="display:block;border:0;width:90px;height:48px;">'
                      : '<span style="font-size:14px;font-weight:bold;color:#8a650c;">KANDY<br>ROAR</span>'}
                  </td>
                  <td valign="middle">
                    <p style="margin:0 0 4px;font-size:12px;font-weight:bold;letter-spacing:1px;color:#8a650c;">DELEGATE PASS</p>
                    <p style="margin:0;font-size:22px;font-weight:bold;color:#210408;">KANDY ROAR 7.0</p>
                  </td>
                </tr>
                <tr><td colspan="2" style="padding-top:16px;">
                  <p style="margin:0 0 4px;font-size:11px;letter-spacing:1px;color:#8a650c;">REGISTRY CODE</p>
                  <p style="margin:0;font-size:24px;font-weight:bold;color:#750f24;">${code}</p>
                </td></tr>
              </table>
            </td></tr>
            <tr><td style="padding:0 16px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #d9ccaa;border-bottom:1px solid #d9ccaa;">
                <tr><td style="padding:18px 0;font-size:15px;line-height:1.8;overflow-wrap:anywhere;word-break:break-word;">
                  <p style="margin:0 0 8px;"><strong>Villager Name:</strong> ${name}</p>
                  <p style="margin:0 0 8px;"><strong>Kingdom / Entity:</strong> ${entity}</p>
                  <p style="margin:0 0 8px;"><strong>Royal Messenger:</strong> ${email}</p>
                  <p style="margin:0;"><strong>Gathering Dates:</strong> 9th–10th January (Tentative)</p>
                </td></tr>
              </table>
            </td></tr>
            <tr><td style="padding:16px;font-size:13px;font-weight:bold;color:#750f24;">Royal Duty Approved</td></tr>
          </table>

          <p style="margin:24px 0 16px;line-height:1.7;">Keep this email and your registration code for reference.</p>
          <p style="margin:0 0 12px;font-weight:bold;color:#750f24;">Your Royal Messengers</p>
          <p style="margin:0 0 12px;font-size:14px;line-height:1.8;">
            Kavishka: <a href="mailto:kavishkaaushadi@aiesec.net" style="color:#750f24;">kavishkaaushadi@aiesec.net</a><br>076 220 6380
          </p>
          <p style="margin:0 0 20px;font-size:14px;line-height:1.8;">
            Dilshini: <a href="mailto:dilshibandara@aiesec.net" style="color:#750f24;">dilshibandara@aiesec.net</a><br>076 289 9108
          </p>
          <p style="margin:0;line-height:1.7;">See you at the royal gathering!<br><strong>Kandy Roar 7.0 Organizing Committee</strong><br>AIESEC in Kandy</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function escapeEmailHtml(value) {
  return String(value).replace(/[&<>"']/g, function (character) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
  });
}

// Run this once in the editor to authorize Sheets access and email sending.
// It checks the quota without sending a test email.
function authorizeConfirmationEmail() {
  SpreadsheetApp.openById("1rSZSQQrncA9IxOpkjKaGs5y4RVo2wlbgbMOsJ46nZCg").getName();
  console.log("Remaining email recipients today: " + MailApp.getRemainingDailyQuota());
  if (!loadConfirmationLogo()) {
    throw new Error("Logo check failed. Check authorization and the public logo URL before deploying.");
  }
  console.log("Embedded logo loaded successfully.");
}
