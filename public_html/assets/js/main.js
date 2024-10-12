/**
 * Load in partials footer and navbar
 */
document.addEventListener("DOMContentLoaded", function() {
    fetch('/assets/partials/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
        });

    fetch('/assets/partials/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
});