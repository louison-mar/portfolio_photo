document.addEventListener("DOMContentLoaded", () => {
    // Vérification si Slick est chargé
    $('.slick-carousel').slick({
        slidesToShow: 3,  // Afficher 3 images à la fois
        slidesToScroll: 1, // Faire défiler une image à la fois
        centerMode: true,  // Centrer l'image active
        focusOnSelect: true,
        infinite: true, // Défilement infini
        prevArrow: '<button type="button" class="slick-prev">Previous</button>',
        nextArrow: '<button type="button" class="slick-next">Next</button>',
        responsive: [
            {
                breakpoint: 768, // Sur les petits écrans, afficher moins d'images
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    // Reste de votre code pour le filtrage
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category");

            galleryItems.forEach(item => {
                if (category === "all" || item.getAttribute("data-category") === category) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });

            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
        });
    });

    // Smooth scrolling pour les liens de la barre de navigation
    const navLinks = document.querySelectorAll(".navbar a");

    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            if (link.hash !== "") {
                event.preventDefault();
                const target = document.querySelector(link.hash);

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Smooth scrolling pour le bouton "Discover Gallery" avec durée personnalisée
    function smoothScrollTo(targetElement, duration) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animationScroll(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);

            if (timeElapsed < duration) requestAnimationFrame(animationScroll);
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animationScroll);
    }

    const discoverGalleryBtn = document.getElementById("scroll-indicator");
    if (discoverGalleryBtn) { // Vérifie si le bouton existe avant de lier l'événement
        discoverGalleryBtn.addEventListener("click", (event) => {
            event.preventDefault();
            const gallerySection = document.querySelector("#about");
            if (gallerySection) {
                smoothScrollTo(gallerySection, 1500); // Définit une durée de 1500ms (1.5s)
            }
        });
    }
});

var sidenav = document.getElementById("mySidenav");
var openBtn = document.getElementById("openBtn");
var closeBtn = document.getElementById("closeBtn");

openBtn.onclick = openNav;
closeBtn.onclick = closeNav;

/* Set the width of the side navigation to 250px */
function openNav() {
    sidenav.classList.add("active");
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    sidenav.classList.remove("active");
}
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    const heroSection = document.querySelector(".hero");

    const heroBottom = heroSection.getBoundingClientRect().bottom;

    // Ajoute ou enlève une classe en fonction du défilement
    if (heroBottom <= 0) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});
