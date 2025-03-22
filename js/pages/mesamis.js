/**
 * Gestion des fonctionnalités de la page Mes Amis Adhérents
 */

document.addEventListener("DOMContentLoaded", function () {
  // Éléments liés à la modal
  const deleteModal = document.getElementById("deleteModal");
  const modalOverlay = document.getElementById("modalOverlay");
  const closeModalBtn = document.getElementById("closeModal");
  const cancelDeleteBtn = document.getElementById("cancelDelete");
  const confirmDeleteBtn = document.getElementById("confirmDelete");
  const friendNameElement = document.querySelector(".modal-friend-name");

  // Élément pour stocker l'ID de l'ami à supprimer
  let friendToDeleteId = null;

  // Gestion du clic sur le bouton de copie du code ami
  const copyButton = document.querySelector(".copy-button");
  if (copyButton) {
    copyButton.addEventListener("click", function () {
      const codeText = document.querySelector(".code").textContent;
      navigator.clipboard
        .writeText(codeText)
        .then(() => {
          // Retour visuel pour indiquer que le code a été copié
          const originalText = copyButton.querySelector("span").textContent;
          copyButton.querySelector("span").textContent = "Copié !";

          setTimeout(() => {
            copyButton.querySelector("span").textContent = originalText;
          }, 2000);
        })
        .catch((err) => {
          console.error("Erreur lors de la copie : ", err);
        });
    });
  }

  // Événements pour tous les boutons de suppression d'ami
  const deleteButtons = document.querySelectorAll(".action-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Récupérer l'élément tr parent pour obtenir les informations de l'ami
      const friendRow = this.closest("tr");
      const friendName = friendRow.querySelector(".user-name").textContent;

      // Stocker l'ID pour une utilisation lors de la confirmation (à remplacer par le vrai ID)
      friendToDeleteId = friendRow.dataset.id || "1"; // Utiliser un ID par défaut si non présent

      // Mettre à jour le nom de l'ami dans la modal
      friendNameElement.textContent = friendName;

      // Afficher la modal et l'overlay
      showModal();
    });
  });

  // Fonction pour afficher la modal
  function showModal() {
    deleteModal.style.display = "block";
    modalOverlay.style.display = "block";

    // Ajouter la classe pour l'animation d'entrée si nécessaire
    setTimeout(() => {
      deleteModal.classList.add("show");
      modalOverlay.classList.add("show");
    }, 10);
  }

  // Fonction pour cacher la modal
  function hideModal() {
    deleteModal.classList.remove("show");
    modalOverlay.classList.remove("show");

    // Attendre la fin de l'animation avant de cacher complètement
    setTimeout(() => {
      deleteModal.style.display = "none";
      modalOverlay.style.display = "none";
    }, 300);
  }

  // Événements pour fermer la modal
  closeModalBtn.addEventListener("click", hideModal);
  cancelDeleteBtn.addEventListener("click", hideModal);
  modalOverlay.addEventListener("click", hideModal);

  // Événement pour confirmer la suppression
  confirmDeleteBtn.addEventListener("click", function () {
    // Ici, vous pourriez appeler une API pour supprimer l'ami
    console.log(`Suppression de l'ami avec l'ID: ${friendToDeleteId}`);

    // Simuler la suppression en retirant l'élément de la page
    const friendRow =
      document.querySelector(`tr[data-id="${friendToDeleteId}"]`) ||
      document.querySelector(".friend-card"); // Fallback pour la démo

    if (friendRow) {
      // Ajouter une animation de sortie si nécessaire
      friendRow.style.opacity = "0";
      friendRow.style.transform = "translateX(20px)";

      setTimeout(() => {
        friendRow.remove();
      }, 300);
    }

    // Fermer la modal
    hideModal();

    // Afficher un message de succès si nécessaire
    // showNotification('Ami supprimé avec succès');
  });

  // Gestion du bouton d'ajout d'ami
  const addFriendBtn = document.querySelector(".add-friend-btn");
  if (addFriendBtn) {
    addFriendBtn.addEventListener("click", function () {
      // Implémenter l'ouverture d'une modal pour ajouter un ami
      alert("Fonctionnalité à implémenter: Ajouter un ami par code");
    });
  }
});
