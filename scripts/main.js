// Load main page header HTML dynamically
fetch('/sports-history-simulations/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('site-header').innerHTML = data;
    });

// Load main page footer HTML dynamically
fetch('/sports-history-simulations/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('site-footer').innerHTML = data;
    });

// Load USA header HTML dynamically
fetch('/sports-history-simulations/usa/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('usa-header').innerHTML = data;
    });

// Tab switching function
function showTab(group, tabId) {
    const tabElement = document.getElementById(tabId);
    if (!tabElement) return;

    const container = tabElement.closest('details');
    if (!container) return;

    const tabs = container.querySelectorAll('.tab-content.' + group);
    tabs.forEach(tab => {
        tab.classList.toggle('active', tab.id === tabId);
    });

    const buttons = container.querySelectorAll('.tab-buttons button');
    buttons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('onclick')?.includes(tabId));
    });
}

// function resizeIframe(iframe) {
//     try {
//         const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
//         if (!iframeDocument) return;

//         const body = iframeDocument.body;
//         const html = iframeDocument.documentElement;

//         const contentHeight = Math.max(
//             body.scrollHeight,
//             body.offsetHeight,
//             html.clientHeight,
//             html.scrollHeight,
//             html.offsetHeight
//         );

//         const extra_1 = iframe.classList.contains('extra-padding') ? 15 : 0;
//         const extra_2 = iframe.classList.contains('double-extra-padding') ? 30 : 0;

//         iframe.style.height = (contentHeight + extra_1 + extra_2) + 'px';
//     } catch (e) {
//         console.warn('Resize failed:', e);
//     }
// }

function resizeIframe(iframe) {
    try {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        if (!iframeDocument) return;

        const body = iframeDocument.body;
        const html = iframeDocument.documentElement;

        // Only proceed if both exist
        if (!body || !html) return;

        const contentHeight = Math.max(
            body.scrollHeight || 0,
            body.offsetHeight || 0,
            html.clientHeight || 0,
            html.scrollHeight || 0,
            html.offsetHeight || 0
        );

        const extra_1 = iframe.classList.contains('extra-padding') ? 15 : 0;
        const extra_2 = iframe.classList.contains('double-extra-padding') ? 30 : 0;

        iframe.style.height = (contentHeight + extra_1 + extra_2) + 'px';
    } catch (e) {
        console.warn('Resize failed:', e);
    }
}


function attachIframeListeners() {
    const iframes = document.querySelectorAll('iframe');

    iframes.forEach(iframe => {
        // 1. Add a 'load' listener to resize after load
        iframe.addEventListener('load', () => {
            // Small delay to allow rendering
            setTimeout(() => resizeIframe(iframe), 100);
        });

        // 2. If it's already loaded, resize immediately
        if (iframe.contentDocument?.readyState === 'complete') {
            setTimeout(() => resizeIframe(iframe), 100);
        }
    });
}

window.addEventListener('load', attachIframeListeners);


// Add listeners to resize iframes on load
// window.addEventListener('load', () => {
//     resizeIframes();
//     document.querySelectorAll('iframe').forEach(iframe => {
//         iframe.addEventListener('load', resizeIframes);
//     });
// });

function lazyLoadIframes() {
  const detailsElements = document.querySelectorAll('details');

  detailsElements.forEach(details => {
    details.addEventListener('toggle', () => {
      if (details.open) {
        // Find iframes inside the opened details
        const iframes = details.querySelectorAll('iframe');

        iframes.forEach(iframe => {
          if (!iframe.src) {
            const dataSrc = iframe.getAttribute('data-src');
            if (dataSrc) {
              iframe.src = dataSrc;
            }
          }
        });
      }
    });
  });
}

window.addEventListener('load', () => {
  lazyLoadIframes();

  // Existing iframe resize listeners
  attachIframeListeners();
});

