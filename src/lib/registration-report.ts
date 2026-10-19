export interface RegistrationReport {
  registrationId: string;
  submittedAt: string;
  details: [string, string][];
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]!);
}

export function createRegistrationReport(report: RegistrationReport) {
  const rows = report.details.map(([label, value]) =>
    `<tr><th scope="row">${escapeHtml(label)}</th><td>${escapeHtml(value || "Not provided")}</td></tr>`
  ).join("");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Kandy Roar Registration Summary — ${escapeHtml(report.registrationId)}</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; background: #f4eee3; color: #210408; font: 15px/1.6 Arial, sans-serif; }
    main { max-width: 800px; margin: 32px auto; background: white; padding: 40px; border-top: 6px solid #750f24; }
    h1 { margin: 0; color: #750f24; font-size: 28px; }
    h2 { margin: 4px 0 24px; color: #8a650c; font-size: 18px; }
    .code { padding: 16px; background: #f4eee3; border-left: 4px solid #b08b28; }
    table { width: 100%; border-collapse: collapse; margin: 24px 0; table-layout: fixed; }
    th, td { text-align: left; vertical-align: top; padding: 10px; border-bottom: 1px solid #e5dccb; overflow-wrap: anywhere; white-space: pre-wrap; }
    th { width: 36%; }
    button { background: #750f24; color: white; border: 0; border-radius: 8px; padding: 12px 20px; font: inherit; cursor: pointer; }
    footer { font-size: 12px; color: #65534f; }
    @media (max-width: 600px) { main { margin: 0; padding: 20px; } }
    @media print { body { background: white; } main { margin: 0; padding: 16px; max-width: none; } button { display: none; } tr { break-inside: avoid; } }
  </style>
</head>
<body><main>
  <h1>KANDY ROAR 7.0</h1>
  <h2>Registration Summary Report</h2>
  <div class="code"><strong>Registration code: ${escapeHtml(report.registrationId)}</strong><br>
    Prepared: ${escapeHtml(report.submittedAt)}<br>AIESEC in Kandy</div>
  <table><tbody>${rows}</tbody></table>
  <button type="button" onclick="window.print()">Print / Save as PDF</button>
  <footer><p>Keep this summary and your registration code for reference. This report contains your personal registration details.</p></footer>
</main></body></html>`;
}
