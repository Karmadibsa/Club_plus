console.log("Calendar script loaded");

document.addEventListener("DOMContentLoaded", () => {
  // Sélection des éléments du DOM
  const calendar = document.querySelector(".calendar");
  const dayEventsModal = document.querySelector(".day-events-modal");
  const dayEventsContent = document.querySelector(".day-events-content");
  const dayEventsTitle = document.querySelector(
    ".day-events-modal .modal-title span"
  );
  const dayEventsList = document.querySelector(".day-events-list");
  const closeButtons = document.querySelectorAll(
    ".day-events-modal .close-modal, .day-events-modal .modal-button.secondary"
  );

  // Fonction pour ouvrir la modale des événements du jour
  function openDayEventsModal(day) {
    if (!day || !dayEventsModal || !dayEventsTitle || !dayEventsList) return;

    // Récupérer la date du jour (sans le badge +2)
    const dateElement = day.querySelector(".date");
    const dateText = dateElement.childNodes[0].textContent.trim();
    const formattedDate = `Événements du ${dateText} Mars 2025`;

    // Mettre à jour le titre de la modale
    dayEventsTitle.textContent = formattedDate;

    // Vider et remplir la liste des événements
    dayEventsList.innerHTML = "";
    const events = day.querySelectorAll(".event");
    events.forEach((event) => {
      const eventClone = event.cloneNode(true);
      eventClone.style.display = "flex";
      dayEventsList.appendChild(eventClone);
    });

    // Afficher la modale
    dayEventsModal.style.display = "flex";
  }

  // Ajouter des écouteurs d'événements pour chaque jour du calendrier
  if (calendar) {
    const days = calendar.querySelectorAll(".day");
    days.forEach((day) => {
      const events = day.querySelectorAll(".event");

      // Afficher tous les événements par défaut
      events.forEach((event) => {
        event.style.display = "flex";
      });

      if (events.length > 2) {
        // En desktop, masquer les événements au-delà des 2 premiers
        if (window.innerWidth > 768) {
          events.forEach((event, index) => {
            if (index >= 2) {
              event.style.display = "none";
            }
          });
        }

        // Créer le badge pour les événements supplémentaires
        const eventsBadge = document.createElement("span");
        eventsBadge.className = "events-badge";
        eventsBadge.textContent = `+${events.length - 2}`;
        day.querySelector(".date").appendChild(eventsBadge);

        // Ajouter l'événement click sur le jour entier
        day.addEventListener("click", (e) => {
          if (!e.target.closest(".event")) {
            openDayEventsModal(day);
          }
        });
      }

      day.addEventListener("click", (e) => {
        // Ne pas ouvrir la modale si on clique directement sur un événement
        if (!e.target.closest(".event")) {
          openDayEventsModal(day);
        }
      });
    });
  }

  // Fermer la modale au clic sur les boutons de fermeture
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      dayEventsModal.style.display = "none";
    });
  });

  // Fermer la modale en cliquant en dehors
  window.addEventListener("click", (e) => {
    if (e.target === dayEventsModal) {
      dayEventsModal.style.display = "none";
    }
  });
});
