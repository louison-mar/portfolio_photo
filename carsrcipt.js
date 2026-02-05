document.addEventListener("DOMContentLoaded", () => {
    // Récupère le modal, l'image, et le conteneur de crédits
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const caption = document.getElementById("caption");

    // Récupère toutes les images dans les éléments ".photo-item"
    const images = document.querySelectorAll(".photo-item img");

    // Fonction pour ouvrir le modal
    function openModal(image) {
        const imageSrc = image.src;
        const imageInfo = image.getAttribute("data-info") || "No information available";

        // Affiche l'image et le crédit
        modalImage.src = imageSrc;
        caption.textContent = imageInfo;

        // Affiche le modal
        modal.style.display = "block";
    }

    // Fonction pour fermer le modal
    function closeModal() {
        modal.style.display = "none";
    }

    // Ajoute un gestionnaire d'événements à chaque image
    images.forEach((image) => {
        image.addEventListener("click", () => openModal(image));
    });

    // Ferme le modal si on clique en dehors de l'image ou sur le bouton de fermeture
    modal.addEventListener("click", (event) => {
        if (event.target === modal || event.target.classList.contains("close")) {
            closeModal();
        }
    });
});
