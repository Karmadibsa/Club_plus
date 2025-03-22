/**
 * Script optimisé pour supprimer les badges des modales
 */
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    // Fonction pour nettoyer les textes des badges dans les modales
    function cleanBadgesFromTextContent() {
      // Nettoyer le texte dans les modales pour supprimer les "+2" ou autres signes
      document
        .querySelectorAll(
          ".event-modal .event-date, .day-events-modal .modal-title span"
        )
        .forEach((element) => {
          if (element.textContent.includes("+")) {
            element.textContent = element.textContent
              .replace(/\+\d+/g, "")
              .trim();
          }
        });
    }

    // Observer les modales pour détecter leur ouverture
    const modalObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "style" &&
          mutation.target.style.display === "flex"
        ) {
          // Nettoyer les badges physiquement
          document
            .querySelectorAll(
              ".event-modal .badge-container, .day-events-modal .badge-container"
            )
            .forEach((badge) => {
              if (badge) badge.remove();
            });

          // Nettoyer les textes des badges
          cleanBadgesFromTextContent();
        }
      });
    });

    // Observer les modales
    document
      .querySelectorAll(".event-modal, .day-events-modal")
      .forEach((modal) => {
        modalObserver.observe(modal, { attributes: true });
      });

    // Exécuter une fois au démarrage
    cleanBadgesFromTextContent();
  });
})();
