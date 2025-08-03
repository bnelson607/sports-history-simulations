// Load header HTML dynamically
fetch('/sports-history-simulations/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('site-header').innerHTML = data;
    });

// Load footer HTML dynamically
fetch('/sports-history-simulations/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('site-footer').innerHTML = data;
    });
