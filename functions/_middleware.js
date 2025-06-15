/**
 * The HTML for the global warning banner, shown to non-Thai visitors.
 */
const HTML_BANNER = `
  <div id="geo-warning-banner">
    <div class="warning-content">
      <p><strong>GEOLOCATION ALERT:</strong> No Sussy Ma activities have been detected in your area.</p>
      <button onclick="this.parentElement.parentElement.style.display='none'">Acknowledge & Proceed</button>
    </div>
  </div>
`;

/**
 * The HTML for the exclusive message shown only to Thai visitors.
 */

/* Save this for later.
const THAI_MESSAGE = `
  <p style="color: #6a0dad; font-weight: bold;">ชาวไทยใช่ไหม? ดื่มน้ำสิงห์แล้วไปต่อ</p>
`;
*/

/**
 * Injects content into an element.
 */
class ContentInjector {
  constructor(content) {
    this.content = content;
  }
  element(element) {
    element.prepend(this.content, { html: true });
  }
}

/**
 * Hides an element by setting its style to "display: none;".
 */
class ElementHider {
  element(element) {
    element.setAttribute('style', 'display: none;');
  }
}

/**
 * The main middleware function that runs on every request.
 */
export async function onRequest(context) {
  const response = await context.next();
  const country = context.request.cf.country;
  console.log(`Visitor from country: ${country}`);

  const rewriter = new HTMLRewriter();

  if (country === 'TH') {
    // For Thai visitors, inject the exclusive welcome message.
    rewriter.on('#thai-exclusive', new ContentInjector(THAI_MESSAGE));
  } else {
    // For everyone else, inject the global banner and hide the police image.
    rewriter.on('body', new ContentInjector(HTML_BANNER));
    rewriter.on('img[src="img/gaypolice.jpg"]', new ElementHider());
  }

  return rewriter.transform(response);
}
