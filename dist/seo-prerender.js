/* Retain readable HTML if the interactive runtime or its content fails to load. */
(() => {
  const fallback = document.getElementById('seo-prerender');
  if (!fallback) return;
  const normalize = value => (value || '').replace(/\s+/g, ' ').trim();
  const enhance = () => {
    const root = document.getElementById('dc-root');
    if (!root || !root.querySelector('footer')) return;
    if (normalize(root.querySelector('h1')?.textContent) !== fallback.dataset.heading) return;
    // Content and sibling components have loaded. Reveal the interactive version
    // and remove the snapshot together, leaving a single copy of page content.
    observer.disconnect();
    document.documentElement.classList.add('dc-enhanced');
    fallback.remove();
    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('scroll'));
  };
  const observer = new MutationObserver(enhance);
  observer.observe(document.body, { childList:true, subtree:true, characterData:true });
  enhance();
})();
