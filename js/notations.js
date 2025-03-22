/**
 * Système de notation par étoiles pour les événements et joueurs
 * Club Plus - 2023
 */

// Initialiser le système quand le DOM est chargé
document.addEventListener("DOMContentLoaded", function () {
  // Initialiser Lucide pour les autres icônes
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Initialiser le système de notation
  initRatingSystem();
});

/**
 * Initialise le système de notation par étoiles
 */
function initRatingSystem() {
  // Sélectionner tous les groupes de notation
  const ratingGroups = document.querySelectorAll(".rating-scale");

  // Pour chaque groupe de notation
  ratingGroups.forEach((group) => {
    const inputs = Array.from(group.querySelectorAll('input[type="radio"]'));
    const labels = Array.from(group.querySelectorAll("label"));

    // Tous les inputs décochés par défaut (valeur null)
    inputs.forEach((input) => (input.checked = false));

    // Ajouter un élément pour afficher la note avec un espace réservé
    const ratingContainer = group.closest(".rating");
    let valueDisplay = ratingContainer.querySelector(".rating-value");

    if (!valueDisplay) {
      valueDisplay = document.createElement("div");
      valueDisplay.className = "rating-value";
      valueDisplay.innerHTML = "&nbsp;"; // Espace insécable pour conserver la hauteur
      ratingContainer.appendChild(valueDisplay);
    }

    // Gérer les clics sur les étoiles
    labels.forEach((label, index) => {
      label.addEventListener("click", function (e) {
        e.preventDefault();

        // Vérifier si l'étoile était déjà sélectionnée
        const wasSelected = inputs[index].checked;

        // Réinitialiser toutes les étoiles et inputs
        inputs.forEach((input) => (input.checked = false));
        labels.forEach((l) => {
          l.classList.remove("active");
          l.classList.remove("clicked");
        });

        if (!wasSelected) {
          // Sélectionner l'étoile et toutes les précédentes
          inputs[index].checked = true;

          // Ajouter la classe active aux étoiles sélectionnées
          for (let i = 0; i <= index; i++) {
            labels[i].classList.add("active");
          }

          // Ajouter l'animation à l'étoile cliquée
          label.classList.add("clicked");

          // Mettre à jour l'affichage de la note
          valueDisplay.textContent = `Note: ${index + 1}/10`;
        } else {
          // Si on clique sur la même étoile, réinitialiser (valeur null)
          valueDisplay.innerHTML = "&nbsp;"; // Espace insécable au lieu de texte
        }
      });

      // Support pour les appareils tactiles
      label.addEventListener("touchend", function (e) {
        e.preventDefault();
        this.click();
      });
    });
  });

  // Configurer le formulaire
  setupForm();
}

/**
 * Configure le gestionnaire du formulaire
 */
function setupForm() {
  const form = document.getElementById("evaluation-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Vérifier qu'un événement est sélectionné
      const eventSelect = document.getElementById("event-select");
      if (eventSelect && eventSelect.value === "") {
        alert("Veuillez sélectionner un événement à évaluer.");
        return;
      }

      // Traitement du formulaire
      alert("Merci pour votre évaluation !");
    });
  }
}
