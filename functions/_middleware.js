/**
 * The HTML for the warning banner.
 */
const HTML_BANNER = `
  <div id="geo-warning-banner">
    <div class="warning-content">
      <p><strong>Heads up, visitor from Ireland!</strong> If you were looking for a transport site (like the MTA or NTA), you've taken a wonderfully weird detour. This is not a transportation website.</p>
      <button onclick="this.parentElement.parentElement.style.display='none'">Got it, thanks!</button>
    </div>
  </div>
`;

/**
 * A class that our HTMLRewriter will use to inject the banner.
 */
class BannerInjector {
  element(element) {
    element.prepend(HTML_BANNER, { html: true });
  }
}

/**
 * The main middleware function that runs on every request.
 */
export async function onRequest(context) {
  // Get the country code from the request object.
  const country = context.request.cf.country;

  // This log will help with debugging if needed.
  console.log(`Visitor from country: ${country}`);

  // Get the original response by continuing the request chain.
  const response = await context.next();

  // If the visitor is not from Ireland (IE), return the original response.
  if (country !== 'IE') {
    return response;
  }

  // If the visitor IS from Ireland, use HTMLRewriter to transform the response.
  return new HTMLRewriter().on('body', new BannerInjector()).transform(response);
}