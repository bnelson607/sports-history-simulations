// Load header HTML dynamically
fetch('/sports-history-simulations/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
    });

// Load footer HTML dynamically
fetch('/sports-history-simulations/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('site-footer').innerHTML = data;
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

// Resize iframe contents to fit
function resizeIframes() {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        try {
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            if (iframeDocument) {
                const height = Math.max(
                    iframeDocument.body.scrollHeight,
                    iframeDocument.documentElement.scrollHeight
                );
                const extra_1 = iframe.classList.contains('extra-padding') ? 15 : 0;
                const extra_2 = iframe.classList.contains('double-extra-padding') ? 30 : 0;
                iframe.style.height = (height + extra_1 + extra_2) + 'px';
            }
        } catch (e) {
            console.warn('Cannot access iframe content to resize:', iframe.src);
        }
    });
}

// Add listeners to resize iframes on load
window.addEventListener('load', () => {
    resizeIframes();
    document.querySelectorAll('iframe').forEach(iframe => {
        iframe.addEventListener('load', resizeIframes);
    });
});
