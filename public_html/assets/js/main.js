document.addEventListener("DOMContentLoaded", function() {
    fetch('/public_html/assets/partials/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
        });

    fetch('/public_html/assets/partials/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
});

document.addEventListener("DOMContentLoaded", function() {
    const embed = document.querySelector('embed');
    const updateEmbedHeight = () => {
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const footerHeight = document.getElementById('footer').offsetHeight;
        const windowWidth = window.innerWidth;

        /**
         * There's a better way of doing this, will optimize later.
         * I couldn't set the height in a media query or as a percentage due
         * to the nature of embed elements.
         */
        if (windowWidth >= 2169) {
            embed.style.height = `${(.45 * windowWidth)}px`;
        }
        else if (windowWidth >= 1800 && windowWidth < 2169) {
            embed.style.height = `${(.6 * windowWidth)}px`;
        }
        else if (windowWidth >= 1400 && windowWidth < 1800) {
            embed.style.height = `${(.8 * windowWidth)}px`;
        }
        else if (windowWidth >= 1200 && windowWidth < 1400) {
            embed.style.height = `${(.9 * windowWidth)}px`;
        }
        else if (windowWidth >= 1024 && windowWidth < 1200) {
            embed.style.height = `${(.95 * windowWidth)}px`;
        }
        else if (windowWidth >= 767 && windowWidth < 1024) {
            embed.style.height = `${(1 * windowWidth)}px`;
        }
        else if (windowWidth >= 630 && windowWidth < 767) {
            embed.style.height = `${(1.05 * windowWidth)}px`;
        }
        else if (windowWidth >= 500 && windowWidth < 630) {
            embed.style.height = `${(1.1 * windowWidth)}px`;
        }
        else if (windowWidth < 500) {
            embed.style.height = `${(1.15 * windowWidth)}px`;
        }
    };

    updateEmbedHeight(); 
    window.addEventListener('resize', updateEmbedHeight);
});
