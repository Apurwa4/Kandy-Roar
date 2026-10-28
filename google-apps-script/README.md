# Registration confirmation emails

Keep your current working `doPost`, spreadsheet ID, and column order.

1. Open Google Sheets → Extensions → Apps Script, using the Google account that should send confirmations.
2. Add a script file called `confirmation-email` and paste `confirmation-email.gs` into it.
3. In your existing `doPost`, replace the success block immediately after saving the row with:

```javascript
SpreadsheetApp.flush();
const emailStatus = sendRegistrationConfirmation(data);
return jsonResponse({
  success: true,
  registrationId: data.id,
  emailStatus: emailStatus
});
```

Do not call the email function before the row is saved. Email failures are returned as `failed` or `quota_exceeded`, while the registration remains successful. `sent` means Google accepted the send request; it does not guarantee inbox delivery.

4. Replace the spreadsheet ID placeholder in `authorizeConfirmationEmail` with the same ID your current `doPost` uses. Select `authorizeConfirmationEmail` in the function dropdown, click Run, and authorize access to Sheets and sending email. This helper does not send a message.
5. Save → Deploy → Manage deployments → Edit → New version → Deploy. Keep **Execute as: Me** and **Who has access: Anyone**. The sender is the deployment account; replies go to Kavishka.
6. Keep the same deployment `/exec` URL. If you create a new URL, update `GOOGLE_SHEETS_WEBHOOK_URL` in Vercel and redeploy.
7. Commit and push the website changes so Vercel shows the email status on the confirmation screen.
8. Register once using your own email and clearly marked test details. Confirm the spreadsheet row, registration code, and email (check Spam too). In a Gmail deployment account, check Sent if needed.

The email includes name, entity, registration code, and organizer contacts. It excludes NIC, date of birth, address, and emergency contact details. Existing registrations are not emailed retroactively. Google applies a daily recipient quota: https://developers.google.com/apps-script/guides/services/quotas
