document.addEventListener("DOMContentLoaded", () => {
  // Vérifier si le menu burger existe, sinon le créer
  let menuBurger = document.querySelector(".menu-burger");
  if (!menuBurger) {
    // Créer le menu burger
    menuBurger = document.createElement("div");
    menuBurger.className = "menu-burger";

    // Ajouter les trois barres
    for (let i = 0; i < 3; i++) {
      const span = document.createElement("span");
      menuBurger.appendChild(span);
    }

    // Ajouter à la barre de navigation
    const navContainer = document.querySelector(".navbar-container");
    if (navContainer) {
      navContainer.appendChild(menuBurger);
    } else {
      document.querySelector(".navbar").appendChild(menuBurger);
    }
  }

  const navMenu = document.querySelector(".navbar-menu");
  const navButtons = document.querySelector(".navbar-buttons");

  // Création du menu mobile s'il n'existe pas déjà
  let mobileMenu = document.querySelector(".mobile-menu");
  if (!mobileMenu) {
    // Structure de base
    mobileMenu = document.createElement("div");
    mobileMenu.className = "mobile-menu";

    // Bouton de fermeture
    const closeButton = document.createElement("button");
    closeButton.className = "mobile-menu-close";
    closeButton.setAttribute("aria-label", "Fermer le menu");
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    mobileMenu.appendChild(closeButton);

    // Conteneur central
    const contentContainer = document.createElement("div");
    contentContainer.className = "mobile-menu-content";
    mobileMenu.appendChild(contentContainer);

    // Liens de navigation
    const menuItems = document.createElement("ul");
    menuItems.className = "navbar-menu";

    // Groupe de liens
    const compactGroup = document.createElement("div");
    compactGroup.className = "compact-links-group";

    // Ajouter les liens
    const originalLinks = navMenu.querySelectorAll("li");
    originalLinks.forEach((link) => {
      compactGroup.appendChild(link.cloneNode(true));
    });
    menuItems.appendChild(compactGroup);

    // Boutons d'action
    const actionButtons = document.createElement("div");
    actionButtons.className = "navbar-buttons";

    // Cloner les boutons
    const buttons = navButtons.querySelectorAll("a");
    buttons.forEach((btn) => {
      actionButtons.appendChild(btn.cloneNode(true));
    });

    // Assembler le tout
    contentContainer.appendChild(menuItems);
    contentContainer.appendChild(actionButtons);
    document.body.appendChild(mobileMenu);

    // Événement de fermeture
    closeButton.addEventListener("click", () => {
      menuBurger.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  }

  // Toggle menu on burger click
  menuBurger.addEventListener("click", () => {
    menuBurger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    document.body.style.overflow = mobileMenu.classList.contains("active")
      ? "hidden"
      : "auto";
  });

  // Fermer le menu en cliquant sur un lien
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuBurger.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  // Fermer le menu en cliquant en dehors
  document.addEventListener("click", (e) => {
    if (
      !menuBurger.contains(e.target) &&
      !mobileMenu.contains(e.target) &&
      mobileMenu.classList.contains("active")
    ) {
      menuBurger.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
});
