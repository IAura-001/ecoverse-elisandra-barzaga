/* eslint-disable @typescript-eslint/no-require-imports -- Exercise the real TSX server render without another test dependency. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");

function loadTS(module, filename) {
  let output = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  output = output.replace(/require\("@\/([^"\n]+)"\)/g, (_, relative) => `require(${JSON.stringify(path.resolve(__dirname, "../src", relative))})`);
  module._compile(output, filename);
}
require.extensions[".ts"] = loadTS;
require.extensions[".tsx"] = loadTS;
require.extensions[".css"] = (module) => { module.exports = {}; };
const { JoseCard } = require("../src/app/jose-noguera/jose-card.tsx");
const { ProfileSheet } = require("../src/app/jose-noguera/profile-sheet.tsx");
const { PortfolioSheet } = require("../src/app/jose-noguera/portfolio-sheet.tsx");
const { PortfolioRoute } = require("../src/app/jose-noguera/portfolio-route.tsx");
const { TestimonialsRoute } = require("../src/app/jose-noguera/testimonials-route.tsx");
const { ContactRoute } = require("../src/app/jose-noguera/contact-route.tsx");
const { joseContact } = require("../src/config/jose-noguera.ts");

test("main card renders essential actions without mounted supporting sections or overlays", () => {
  const html = renderToStaticMarkup(React.createElement(JoseCard, { contact: joseContact }));
  for (const label of ["José Noguera", "Regional Manager", "Llamar ahora", "WhatsApp directo", "Instagram José Noguera", "Oficina Illinois", "Testimonios", "Reseñas", "Beneficios ECOVERSE"]) assert.ok(html.includes(label), label);
  assert.match(html, /<section/);
  assert.match(html, /<footer/);
  assert.doesNotMatch(html, /<dialog|<blockquote|Biografía profesional|Retrato próximamente|Francis Lucena|17862738717|Aqua Friendly Water/);
  assert.match(html, /\+1 708-655-4060/);
  assert.match(html, /href="tel:\+17086554060"/);
  assert.match(html, /href="https:\/\/wa\.me\/17086554060"/);
  assert.match(html, /Abrir perfil y trayectoria/);
  assert.doesNotMatch(html, /DEBUG: waiting|TEST BUTTON|onPointerDown|onTouchStart/);
  assert.match(html, /Ver perfil y trayectoria ↗/);
  assert.doesNotMatch(html, /Reconocimientos, eventos y experiencias/);
  assert.match(html, /href="\/jose-noguera\/perfil"/);
  assert.match(html, /href="\/jose-noguera\/testimonios"/);
  assert.match(html, /href="\/jose-noguera\/contacto"/);
  assert.match(html, /aria-label="Abrir menú de tarjeta"/);
});

test("José internal routes render full experiences with normal back links", () => {
  const portfolio = renderToStaticMarkup(React.createElement(PortfolioRoute, { items: joseContact.portfolio }));
  const testimonials = renderToStaticMarkup(React.createElement(TestimonialsRoute, { items: joseContact.testimonials }));
  const contact = renderToStaticMarkup(React.createElement(ContactRoute, { contact: joseContact }));
  assert.match(portfolio, /Perfil y trayectoria|Premio Líder Internacional/);
  assert.match(testimonials, /Experiencias|Cliente ECOVERSE|01 <span>\/ 09/);
  assert.match(contact, /Mi tarjeta digital|Guardar contacto|Compartir tarjeta|Copiar enlace/);
  assert.match(portfolio, /href="\/jose-noguera\/perfil\?slide=6"/);
  assert.match(portfolio, /href="\/jose-noguera\/perfil\?slide=2"/);
  assert.match(testimonials, /href="\/jose-noguera\/testimonios\?slide=9"/);
  assert.match(testimonials, /href="\/jose-noguera\/testimonios\?slide=2"/);
  for (const html of [portfolio, testimonials, contact]) assert.match(html, /href="\/jose-noguera"/);
});

test("José portfolio uses profile media and opens independently from testimonials", () => {
  assert.equal(joseContact.portfolio.length, 6);
  assert.ok(joseContact.portfolio.every(({ image }) => image.includes("/jose-noguera/profile/")));
  assert.ok(joseContact.portfolio.every(({ image }) => !image.includes("/jose-noguera/testimonials/")));
  const html = renderToStaticMarkup(React.createElement(PortfolioSheet, { items: joseContact.portfolio, onClose() {} }));
  for (const text of ["Perfil y trayectoria", "RECONOCIMIENTO", "Premio Líder Internacional", "Perfil anterior", "Siguiente perfil"]) assert.ok(html.includes(text), text);
  assert.match(html, /01 <span>\/ 06/);
  assert.doesNotMatch(html, /Cliente ECOVERSE|Testimonios|Experiencia compartida/);
});

test("José testimonials render only customer images, neutral attribution and navigation controls", () => {
  const html = renderToStaticMarkup(React.createElement(ProfileSheet, { kind: "testimonials", contact: joseContact, onClose() {} }));
  assert.match(html, /<dialog/);
  assert.match(html, /Experiencia de cliente/);
  assert.match(html, /Cliente ECOVERSE/);
  assert.match(html, /Experiencia compartida/);
  assert.match(html, /Muy buena atención y explicación durante todo el proceso/);
  assert.match(html, /01 <span>\/ 09/);
  assert.match(html, /WhatsApp%20Image%202026-09-05%20at%201\.34\.12%20PM%20\(5\)\.jpeg/);
  for (const label of ["Cerrar", "Testimonio anterior", "Siguiente testimonio"]) assert.ok(html.includes(`aria-label="${label}"`));
  assert.doesNotMatch(html, /de 5 estrellas|Nombre pendiente/);
});

test("José testimonial data contains only the nine customer images in filename order", () => {
  assert.equal(joseContact.testimonials.length, 9);
  assert.deepEqual(joseContact.testimonials.map(({ image }) => image), [
    "/jose-noguera/testimonials/WhatsApp Image 2026-09-05 at 1.34.12 PM (5).jpeg",
    "/jose-noguera/testimonials/WhatsApp Image 2026-09-05 at 1.34.12 PM (6).jpeg",
    "/jose-noguera/testimonials/WhatsApp Image 2026-09-05 at 1.34.13 PM (1).jpeg",
    "/jose-noguera/testimonials/WhatsApp Image 2026-09-05 at 1.34.13 PM (2).jpeg",
    "/jose-noguera/testimonials/WhatsApp Image 2026-09-05 at 1.34.13 PM (3).jpeg",
    "/jose-noguera/testimonials/WhatsApp Image 2026-09-05 at 1.34.13 PM (4).jpeg",
    "/jose-noguera/testimonials/WhatsApp Image 2026-09-05 at 1.34.13 PM (5).jpeg",
    "/jose-noguera/testimonials/WhatsApp Image 2026-09-05 at 1.34.13 PM (6).jpeg",
    "/jose-noguera/testimonials/WhatsApp Image 2026-09-05 at 1.34.13 PM.jpeg",
  ]);
  for (const testimonial of joseContact.testimonials) {
    assert.equal(testimonial.name, "Cliente ECOVERSE");
    assert.equal(testimonial.context, "Experiencia compartida");
    assert.equal(typeof testimonial.quote, "string");
    assert.equal(testimonial.rating, undefined);
  }
});

test("testimonials sheet remains separate from the Google reviews action", () => {
  const html = renderToStaticMarkup(React.createElement(ProfileSheet, { kind: "testimonials", contact: joseContact, onClose() {} }));
  assert.match(html, /Experiencia de cliente/);
  assert.doesNotMatch(html, /role="tab"|Ver reseñas en Google/);
  assert.equal(joseContact.reviews.url, "https://maps.app.goo.gl/LiujNRYbod8yVGJH6?g_st=com.google.maps.preview.copy");
});

test("image testimonial renders supplied photo, quote, attribution, context and optional rating", () => {
  const contact = { ...joseContact, testimonials: [{ image: "/jose-noguera/testimonials/customer-1.jpg", quote: "TEST QUOTE", name: "TEST NAME", context: "TEST CONTEXT", rating: 4.5 }] };
  const html = renderToStaticMarkup(React.createElement(ProfileSheet, { kind: "testimonials", contact, onClose() {} }));
  for (const text of ["customer-1.jpg", "TEST QUOTE", "TEST NAME", "TEST CONTEXT", "4.5 de 5 estrellas"]) assert.ok(html.includes(text));
  assert.equal((html.match(/disabled=""/g) || []).length, 2);
});

test("contact sheet exposes José’s real phone and WhatsApp without borrowing Francis details", () => {
  const html = renderToStaticMarkup(React.createElement(ProfileSheet, { kind: "contact", contact: joseContact, onClose() {} }));
  for (const label of ["Teléfono", "+1 708-655-4060", "WhatsApp", "Correo electrónico", "Redes sociales"]) assert.ok(html.includes(label));
  assert.match(html, /href="tel:\+17086554060"/);
  assert.match(html, /href="https:\/\/wa\.me\/17086554060"/);
  assert.doesNotMatch(html, /Francis|17862738717/);
});
