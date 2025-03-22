document.addEventListener("DOMContentLoaded", function () {
  // Sélectionner les modales et les boutons
  const eventModal = document.querySelector(".event-modal");
  const dayEventsModal = document.querySelector(".day-events-modal");
  const closeButtons = document.querySelectorAll(".close-modal");
  const closeDayModalButton = document.querySelector(".close-day-modal");
  const cancelButton = eventModal.querySelector(".modal-button.secondary");

  // Fonction pour ouvrir la modale d'événement
  function openEventModal(event, title, time, date) {
    // Extraire seulement la date sans le badge "+2"
    let cleanDate = date;
    if (date.includes("+")) {
      cleanDate = date.replace(/\+\d+/g, "").trim();
    }

    // Remplir la modale avec les détails de l'événement
    document.querySelector(".event-title-detail").textContent = title;
    document.querySelector(".event-time-detail").textContent = time;
    document.querySelector(".event-date").textContent = cleanDate;

    // Afficher la modale
    eventModal.style.display = "flex";

    // Empêcher la propagation et l'action par défaut
    event.preventDefault();
    event.stopPropagation();
  }

  // Fonction simplifiée pour ouvrir la modale des événements du jour
  function openDayEventsModal(events, date) {
    // Extraire seulement la date sans le badge "+2"
    let cleanDate = date;
    if (date.includes("+")) {
      cleanDate = date.replace(/\+\d+/g, "").trim();
    }

    // Vider la liste des événements
    const eventsList = document.querySelector(".day-events-list");
    eventsList.innerHTML = "";

    // Mettre à jour le titre avec la date nettoyée
    const modalTitle = dayEventsModal.querySelector(".modal-title span");
    modalTitle.textContent = `Événements du ${cleanDate}`;

    // Créer les événements dans la modale - structure simplifiée sans badge
    events.forEach((event) => {
      const eventElement = document.createElement("div");
      eventElement.className = "event modal-event";

      // HTML simplifié sans badge ni conteneur de badge
      eventElement.innerHTML = `
        <span class="event-time">${event.time}</span>
        <span class="event-title">${event.title}</span>
      `;

      // Gestion du clic sur l'événement
      eventElement.addEventListener("click", function (e) {
        dayEventsModal.style.display = "none";
        openEventModal(e, event.title, event.time, date);
      });

      eventsList.appendChild(eventElement);
    });

    // Nettoyage supplémentaire - s'assurer qu'aucun badge n'est présent
    dayEventsModal
      .querySelectorAll(".events-badge, .badge-container")
      .forEach((badge) => {
        if (badge && badge.parentNode) {
          badge.parentNode.removeChild(badge);
        }
      });

    // Afficher la modale
    dayEventsModal.style.display = "flex";
  }

  // Fermer les modales avec les boutons
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      eventModal.style.display = "none";
      dayEventsModal.style.display = "none";
    });
  });

  if (cancelButton) {
    cancelButton.addEventListener("click", () => {
      eventModal.style.display = "none";
    });
  }

  if (closeDayModalButton) {
    closeDayModalButton.addEventListener("click", () => {
      dayEventsModal.style.display = "none";
    });
  }

  // Fermer les modales en cliquant en dehors
  window.addEventListener("click", function (event) {
    if (eventModal && eventModal.style.display === "flex") {
      const modalContent = eventModal.querySelector(".modal-content");
      if (event.target === eventModal && !modalContent.contains(event.target)) {
        eventModal.style.display = "none";
      }
    }

    if (dayEventsModal && dayEventsModal.style.display === "flex") {
      const modalContent = dayEventsModal.querySelector(".day-events-content");
      if (
        event.target === dayEventsModal &&
        !modalContent.contains(event.target)
      ) {
        dayEventsModal.style.display = "none";
      }
    }
  });

  // Écouter les clics sur les événements
  document.querySelectorAll(".event").forEach((eventElement) => {
    eventElement.addEventListener("click", function (e) {
      const time = this.querySelector(".event-time").textContent;
      const title = this.querySelector(".event-title").textContent;
      const day = this.closest(".day");
      const date = day
        ? day.querySelector(".date").textContent + " Mars 2025"
        : "Date non spécifiée";

      openEventModal(e, title, time, date);
    });
  });

  // Écouter les clics sur les jours
  document.querySelectorAll(".day").forEach((day) => {
    day.addEventListener("click", function (e) {
      if (e.target.closest(".event")) return;

      const events = [];

      // Extraire proprement le texte de date sans le badge
      const dateElement = this.querySelector(".date");
      let dateText = "";

      // Parcourir les nœuds de texte uniquement (pas les éléments enfants)
      for (const node of dateElement.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
          dateText += node.textContent.trim();
        }
      }

      this.querySelectorAll(".event").forEach((eventElement) => {
        events.push({
          time: eventElement.querySelector(".event-time").textContent,
          title: eventElement.querySelector(".event-title").textContent,
        });
      });

      if (events.length > 0) {
        openDayEventsModal(events, dateText + " Mars 2025");
      }
    });
  });
});
