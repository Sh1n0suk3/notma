const HTML_BANNER = `
  <div id="geo-warning-banner">
    <div class="warning-content">
      <p><strong>GEOLOCATION ALERT:</strong> Sussy Ma activities have been detected in your area. This is a Certified Ma Moment™.</p>
      <button onclick="this.parentElement.parentElement.style.display='none'">Acknowledge & Proceed</button>
    </div>
  </div>
`;

 // Injects content into an element.
class ContentInjector {
  constructor(content) {
    this.content = content;
  }
  element(element) {
    element.prepend(this.content, { html: true });
  }
}

class ElementHider {
  element(element) {
    element.setAttribute('style', 'display: none;');
  }
}

 // The main middleware function that runs on every request.
export async function onRequest(context) {
  const response = await context.next();
  const country = context.request.cf.country;
  console.log(`Visitor from country: ${country}`);

  const rewriter = new HTMLRewriter();

  if (country === 'TH') {
  } else {
    rewriter.on('body', new ContentInjector(HTML_BANNER));
    rewriter.on('img[src="img/gaypolice.jpg"]', new ElementHider());
  }

  return rewriter.transform(response);
}
