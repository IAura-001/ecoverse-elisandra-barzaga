/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS loader executes the real TS modules without an extra runtime dependency. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");
const ts = require("typescript");
const QRCode = require("qrcode");

// Load the real TypeScript data/utility modules without adding a test dependency.
require.extensions[".ts"] = (module, filename) => {
  const source = fs.readFileSync(filename, "utf8");
  module._compile(ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText, filename);
};
const { makeVCard, resolveProfileUrl, LEGACY_CARD_URL } = require("../src/lib/card-profile.ts");
const { contact: francis } = require("../src/config/contact.ts");
const { joseContact: jose } = require("../src/config/jose-noguera.ts");

test("Francis vCard remains byte-for-byte compatible", () => {
  assert.equal(makeVCard(francis), [
    "BEGIN:VCARD", "VERSION:3.0", "N:Lucena;Francis;;;", "FN:Francis Lucena",
    "ORG:ECOVERSE", "TITLE:Ejecutiva de Ventas", "TEL;TYPE=CELL,VOICE:+17862738717",
    "URL:https://www.ecoverseusa.com", "END:VCARD",
  ].join("\r\n"));
});

test("José exports his identity, real phone, office address and profile URL", () => {
  const vcard = makeVCard(jose);
  assert.ok(vcard.includes("N:Noguera;José;;;\r\nFN:José Noguera"));
  assert.ok(vcard.includes("TITLE:Regional Manager"));
  assert.ok(vcard.includes("TEL;TYPE=CELL,VOICE:+17086554060"));
  assert.ok(vcard.includes("ADR;TYPE=WORK:;;1515 Butterfield Rd\\nOffice 101\\nAurora\\, IL 60502\\nUnited States;;;;"));
  assert.ok(vcard.includes(`URL:${jose.productionUrl}`));
  assert.doesNotMatch(vcard, /FN:Francis|N:Lucena|17862738717|wa\.me/i);
  assert.equal(new URL(jose.productionUrl).pathname, "/jose-noguera");
  assert.equal(jose.slug, "jose-noguera");
  assert.equal(jose.phone, "+17086554060");
  assert.equal(jose.phoneDisplay, "+1 (708) 655-4060");
  assert.equal(jose.phoneActionDisplay, "+1 708-655-4060");
  assert.equal(jose.whatsapp, "https://wa.me/17086554060");
  assert.equal(jose.address, "1515 Butterfield Rd\nOffice 101\nAurora, IL 60502\nUnited States");
  assert.equal(jose.email, "");
  assert.equal(jose.biography, "");
  assert.equal(jose.portrait, "/jose-noguera/profile/WhatsApp Image 2026-09-05 at 1.34.11 PM.jpeg");
  assert.deepEqual(jose.socialLinks, []);
  assert.equal(jose.testimonials.length, 9);
});

test("José uses the final white-row links without borrowing Francis personal links", () => {
  assert.equal(jose.instagramEcoverse.url, "https://www.instagram.com/ecoverseusa?igsi=MmZ5ajMwbTY4d2R3");
  assert.equal(jose.instagramPersonal.url, "https://www.instagram.com/noguerajoseito?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==");
  assert.equal(jose.reviews.url, "https://maps.app.goo.gl/LiujNRYbod8yVGJH6?g_st=com.google.maps.preview.copy");
  assert.match(joseOfficeUrl(), /1515%20Butterfield%20Rd/);
  assert.doesNotMatch(jose.instagramPersonal.url, /aquafriendly|francis/i);
});

function joseOfficeUrl() {
  return "https://www.google.com/maps/search/?api=1&query=1515%20Butterfield%20Rd%2C%20Office%20101%2C%20Aurora%2C%20IL%2060502%2C%20United%20States";
}

test("profile URL replaces any legacy or mistaken profile path, query and hash", () => {
  for (const source of ["https://cards.example/francis-lucena?person=francis#contact", "https://cards.example/", "https://cards.example/another-profile"]) {
    assert.equal(resolveProfileUrl("/jose-noguera", source), "https://cards.example/jose-noguera");
  }
  assert.equal(resolveProfileUrl("/jose-noguera", "https://jose.example/wrong", "https://legacy.example"), "https://jose.example/jose-noguera");
});

test("missing, placeholder and unsafe URLs fall through safely", () => {
  for (const source of [undefined, "", "https://TU-URL-PUBLICA-AQUI", "not a url", "javascript:alert(1)"]) {
    assert.equal(resolveProfileUrl("/jose-noguera", source), `${LEGACY_CARD_URL}/jose-noguera`);
  }
  assert.equal(resolveProfileUrl("/jose-noguera", "https://TU-URL-PUBLICA-AQUI", "https://production.example"), "https://production.example/jose-noguera");
});

test("QR encoding contains José's exact profile URL", async () => {
  const qr = QRCode.create(jose.productionUrl, { errorCorrectionLevel: "H" });
  const payload = qr.segments.map(segment => typeof segment.data === "string" ? segment.data : Buffer.from(segment.data).toString("utf8")).join("");
  assert.equal(payload, jose.productionUrl);
  assert.ok(payload.endsWith("/jose-noguera"));
  assert.match(await QRCode.toDataURL(jose.productionUrl), /^data:image\/png;base64,/);
});

test("vCard escapes line breaks and delimiters without injecting contact fields", () => {
  const vcard = makeVCard({ ...jose, jobTitle: "Manager\r\nTEL:123;test,other" });
  assert.ok(vcard.includes("TITLE:Manager\\nTEL:123\\;test\\,other"));
  assert.doesNotMatch(vcard, /\r\nTEL:/);
});

