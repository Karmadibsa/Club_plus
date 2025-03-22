console.log("Modal script loaded");

document.addEventListener("DOMContentLoaded", () => {
  const eventModal = document.querySelector(".event-modal");
  const closeButtons = document.querySelectorAll(".event-modal .close-modal, .event-modal .modal-button.secondary");

  // Fonction pour ouvrir la modale d'événement
  function openEventModal(event) {
    const eventElement = event.currentTarget;
    const time = eventElement.querySelector(".event-time").textContent;
    const title = eventElement.querySelector(".event-title").textContent;
    const date = eventElement.closest(".day")?.querySelector(".date")?.textContent || "";
    
    // Mise à jour du contenu de la modale
    const eventDate = eventModal.querySelector(".event-date");
    const eventTime = eventModal.querySelector(".event-time-detail");
    const eventTitle = eventModal.querySelector(".event-title-detail");
    const eventDesc = eventModal.querySelector(".event-description");
    
    if (eventDate) eventDate.textContent = date ? `${date} Mars 2025` : "";
    if (eventTime) eventTime.textContent = time;
    if (eventTitle) eventTitle.textContent = title;
    if (eventDesc) eventDesc.textContent = eventElement.dataset.description || "Description détaillée de l'événement...";

    // Afficher la modale
    eventModal.style.display = "flex";
  }

  // Ajouter les écouteurs d'événements pour les événements individuels
  document.querySelectorAll(".event").forEach((event) => {
    event.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      openEventModal(e);
    });
  });

  // Fermer la modale au clic sur les boutons de fermeture
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      eventModal.style.display = "none";
    });
  });

  // Fermer la modale en cliquant en dehors
  window.addEventListener("click", (e) => {
    if (e.target === eventModal) {
      eventModal.style.display = "none";
    }
  });
});
