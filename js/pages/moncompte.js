document.addEventListener("DOMContentLoaded", function () {
  const profileOptions = document.querySelectorAll(".profile-option");
  const currentProfile = document.getElementById("currentProfile");
  let selectedAvatar = null;

  profileOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove selected class from all options
      profileOptions.forEach((opt) => opt.classList.remove("selected"));

      // Add selected class to clicked option
      this.classList.add("selected");

      // Get selected avatar data
      selectedAvatar = this.querySelector("img").getAttribute("data-avatar");

      // Update current profile image preview
      currentProfile.src = `../assets/images/avatars/${selectedAvatar}`;
    });
  });

  // Save button functionality could be implemented here
  const saveButtons = document.querySelectorAll(".btn");
  saveButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Prevent default form submission
      e.preventDefault();

      // Show feedback to user
      if (
        this.closest(".account-section").querySelector("h2").textContent ===
          "Photo de profil" &&
        selectedAvatar
      ) {
        alert("Photo de profil mise à jour avec succès!");
      } else if (this.textContent.trim() === "Enregistrer les préférences") {
        alert("Préférences enregistrées avec succès!");
      } else if (this.textContent.trim() === "Mettre à jour") {
        alert("Informations personnelles mises à jour avec succès!");
      } else if (this.textContent.trim() === "Changer le mot de passe") {
        alert("Mot de passe changé avec succès!");
      }
    });
  });
});
