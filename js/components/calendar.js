document.addEventListener("DOMContentLoaded", function () {
  // Fonction simplifiée pour créer les badges
  function createBadges() {
    // Parcourir strictement les jours du calendrier principal (pas ceux des modales)
    document.querySelectorAll(".calendar > .day").forEach((day) => {
      const eventsContainer = day.querySelector(".events-container");
      const badgeContainer = day.querySelector(".date .badge-container");

      // Nettoyer tout badge précédemment créé
      if (badgeContainer) {
        badgeContainer.innerHTML = "";
      }

      // Si le jour contient des événements et un conteneur de badge
      if (eventsContainer && badgeContainer) {
        const events = eventsContainer.querySelectorAll(".event");

        // Créer le badge seulement si plus de 2 événements
        if (events.length > 2) {
          const badge = document.createElement("span");
          badge.className = "events-badge";
          badge.textContent = `+${events.length - 2}`;
          badgeContainer.appendChild(badge);
        }
      }
    });
  }

  // Créer les badges au chargement
  createBadges();

  // Ajouter un écouteur pour recréer les badges après l'ouverture/fermeture des modales
  document
    .querySelectorAll(".event-modal, .day-events-modal")
    .forEach((modal) => {
      modal.addEventListener("click", function (e) {
        if (
          e.target.classList.contains("close-modal") ||
          e.target.classList.contains("modal-button") ||
          e.target === modal
        ) {
          // Recréer les badges uniquement pour le calendrier principal
          setTimeout(createBadges, 50);
        }
      });
    });

  // Navigation calendrier
  const prevButton = document.querySelector(
    ".calendar-navigation button:first-child"
  );
  const nextButton = document.querySelector(
    ".calendar-navigation button:last-child"
  );

  if (prevButton && nextButton) {
    prevButton.addEventListener("click", function () {
      alert("Navigation vers le mois précédent (Février)");
    });

    nextButton.addEventListener("click", function () {
      alert("Navigation vers le mois suivant (Avril)");
    });
  }
});
