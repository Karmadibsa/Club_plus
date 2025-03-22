document.addEventListener("DOMContentLoaded", function () {
  // Génération des QR codes
  const qrContents = [
    "TICKET-BASKET-ADULTE-01012025-1730",
    "TICKET-BASKET-ENFANT-01012025-1730",
    "TICKET-FOOT-ADULTE-15012025-1900",
    "TICKET-CONCERT-ADULTE-25012025-2030",
  ];

  // Générer les QR codes
  for (let i = 1; i <= qrContents.length; i++) {
    QRCode.toCanvas(document.getElementById(`qrcode${i}`), qrContents[i - 1], {
      width: 200,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    });
  }

  // Navigation entre les tickets
  const prevBtn = document.getElementById("prevTicket");
  const nextBtn = document.getElementById("nextTicket");
  const currentTicketSpan = document.getElementById("currentTicket");
  const totalTicketsSpan = document.getElementById("totalTickets");
  const ticketCards = document.querySelectorAll(".ticket-card");
  const eventSelect = document.getElementById("event-select");

  let currentTicket = 1;
  let visibleTickets = [...ticketCards];
  totalTicketsSpan.textContent = ticketCards.length;

  // Filtrer les tickets par événement
  eventSelect.addEventListener("change", function () {
    const selectedEvent = this.value;

    visibleTickets = [...ticketCards].filter((ticket) => {
      if (selectedEvent === "all") {
        ticket.style.display = "";
        return true;
      } else {
        const isMatch = ticket.dataset.event === selectedEvent;
        ticket.style.display = isMatch ? "" : "none";
        return isMatch;
      }
    });

    currentTicket = 1;
    updateTicketDisplay();
  });

  function updateTicketDisplay() {
    ticketCards.forEach((card) => card.classList.remove("active"));

    if (visibleTickets.length > 0) {
      visibleTickets[currentTicket - 1].classList.add("active");
      currentTicketSpan.textContent = currentTicket;
      totalTicketsSpan.textContent = visibleTickets.length;
    } else {
      currentTicketSpan.textContent = 0;
      totalTicketsSpan.textContent = 0;
    }

    prevBtn.disabled = currentTicket === 1;
    nextBtn.disabled =
      currentTicket === visibleTickets.length || visibleTickets.length === 0;
  }

  prevBtn.addEventListener("click", function () {
    if (currentTicket > 1) {
      currentTicket--;
      updateTicketDisplay();
    }
  });

  nextBtn.addEventListener("click", function () {
    if (currentTicket < visibleTickets.length) {
      currentTicket++;
      updateTicketDisplay();
    }
  });

  // CORRECTION : Modal pour zoom QR code
  const qrCodeWrappers = document.querySelectorAll(".qr-code-wrapper");
  const zoomModal = document.getElementById("qrZoomModal");
  const zoomedQrContainer = document.querySelector(".zoomed-qr-container");
  const closeModal = document.querySelector(".close-modal");

  qrCodeWrappers.forEach((wrapper) => {
    wrapper.addEventListener("click", function () {
      const qrCanvas = this.querySelector("canvas");

      // Créer une image à partir du canvas au lieu de cloner le canvas
      const qrImage = new Image();
      qrImage.src = qrCanvas.toDataURL("image/png");
      qrImage.width = 300;
      qrImage.height = 300;
      qrImage.style.display = "block";

      // Nettoyer le conteneur et ajouter l'image du QR code
      zoomedQrContainer.innerHTML = "";
      zoomedQrContainer.appendChild(qrImage);

      zoomModal.style.display = "flex";
    });
  });

  closeModal.addEventListener("click", function () {
    zoomModal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === zoomModal) {
      zoomModal.style.display = "none";
    }
  });

  // Implémentation PDF avec correction du formatage des données
  document.getElementById("downloadPDF").addEventListener("click", function () {
    // Trouver le ticket actif
    const activeTicket = document.querySelector(".ticket-card.active");
    if (!activeTicket) {
      alert("Aucun ticket disponible à télécharger");
      return;
    }

    try {
      // Extraire les informations du ticket
      const eventTitle = activeTicket.querySelector("h2").textContent;
      const ticketNum = activeTicket.dataset.ticket;

      // Méthode d'extraction des textes améliorée pour éviter les doublons de labels
      function extractCleanValue(element) {
        if (!element) return "";

        // Récupérer le texte brut de l'élément
        const rawText = element.textContent || "";

        // Trouver la position du premier ":" pour isoler la valeur
        const colonPos = rawText.indexOf(":");
        if (colonPos > 0) {
          // Extraire uniquement la valeur après les deux points
          return rawText.substring(colonPos + 1).trim();
        }

        return rawText.trim();
      }

      // Extraire proprement les données sans duplication de labels
      const addressElem = activeTicket.querySelector(
        ".event-details p:nth-child(2)"
      );
      const ticketTypeElem = activeTicket.querySelector(
        ".event-details p:nth-child(3)"
      );
      const locationElem = activeTicket.querySelector(
        ".event-details p:nth-child(4)"
      );
      const dateTimeElem = activeTicket.querySelector(
        ".event-details p:nth-child(5)"
      );

      const address = extractCleanValue(addressElem);
      const ticketType = extractCleanValue(ticketTypeElem);
      const location = extractCleanValue(locationElem);
      const dateTime = extractCleanValue(dateTimeElem);

      // Obtenir le QR Code
      const qrCanvas = document.getElementById(`qrcode${ticketNum}`);

      // Configurer le document PDF
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Couleurs exactes du site depuis root.css
      const mainBlue = [26, 95, 122]; // #1a5f7a
      const mainOrange = [242, 97, 34]; // #f26122
      const neutralBlue = [44, 62, 80]; // #2c3e50
      const textDark = [51, 51, 51]; // #333333
      const textMedium = [102, 102, 102]; // #666666
      const bgLightGray = [248, 249, 250]; // #f8f9fa
      const bgMediumGray = [233, 236, 239]; // #e9ecef
      const white = [255, 255, 255]; // #ffffff

      // Dimensions et positionnement
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - margin * 2;
      const centerX = pageWidth / 2;

      // En-tête
      doc.setFillColor(...mainBlue);
      doc.rect(0, 0, pageWidth, 40, "F");

      // Bande orange décorative
      doc.setFillColor(...mainOrange);
      doc.rect(0, 0, pageWidth, 5, "F");

      // Titre du billet
      let yPos = 25;
      doc.setTextColor(...white);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("Billet Club Plus", centerX, yPos, { align: "center" });

      // Titre de l'événement
      yPos = 55;
      doc.setFillColor(...neutralBlue);
      doc.roundedRect(margin, yPos - 12, contentWidth, 20, 3, 3, "F");

      doc.setTextColor(...white);
      doc.setFontSize(16);
      doc.text(eventTitle, centerX, yPos, { align: "center" });

      // Section informations corrigée
      yPos = 75;
      doc.setFillColor(...bgLightGray);
      doc.roundedRect(margin, yPos, contentWidth, 60, 3, 3, "F");

      yPos += 10;
      doc.setTextColor(...mainBlue);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Informations", margin + 10, yPos);

      yPos += 5;
      doc.setDrawColor(...bgMediumGray);
      doc.setLineWidth(0.5);
      doc.line(margin + 10, yPos, margin + contentWidth - 10, yPos);

      // Informations détaillées avec espacement corrigé
      yPos += 10;
      doc.setTextColor(...textDark);

      // Fonction corrigée pour afficher les détails
      function addInfoRow(label, value, y) {
        const labelWidth = 25; // Largeur réduite pour le label
        const valueX = margin + 10 + labelWidth; // Position X de la valeur

        // Rectangle orange décoratif à gauche
        doc.setFillColor(...mainOrange);
        doc.rect(margin + 10, y - 3.5, 3, 3, "F");

        // Label en bold
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text(label, margin + 15, y);

        // Valeur en normal
        doc.setFont("helvetica", "normal");

        // Gestion du texte long
        const maxWidth = contentWidth - labelWidth - 20;
        const textLines = doc.splitTextToSize(value, maxWidth);
        doc.text(textLines, valueX, y);

        // Retourner la hauteur utilisée
        return Math.max(6, textLines.length * 6);
      }

      // Ajouter les détails avec espacement cohérent
      const rowSpacing = 8; // Espacement réduit entre les lignes

      yPos += addInfoRow("Adresse:", address, yPos);
      yPos += rowSpacing;

      yPos += addInfoRow("Billet:", ticketType, yPos);
      yPos += rowSpacing;

      yPos += addInfoRow("Place:", location, yPos);
      yPos += rowSpacing;

      yPos += addInfoRow("Date:", dateTime, yPos);

      // Section QR Code
      yPos = 150;
      doc.setFillColor(...white);
      doc.setDrawColor(...bgMediumGray);
      doc.setLineWidth(0.3);
      doc.roundedRect(centerX - 40, yPos, 80, 95, 5, 5, "FD");

      // Accent orange sur le QR code
      doc.setFillColor(...mainOrange);
      doc.rect(centerX - 40, yPos, 80, 3, "F");

      // Titre du QR code
      yPos += 15;
      doc.setTextColor(...mainBlue);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Votre QR Code d'accès", centerX, yPos, { align: "center" });

      // QR Code
      yPos += 10;
      const imgData = qrCanvas.toDataURL("image/png", 1.0);
      const qrSize = 55;
      doc.addImage(imgData, "PNG", centerX - qrSize / 2, yPos, qrSize, qrSize);

      // Instructions
      yPos += qrSize + 10;
      doc.setTextColor(...textMedium);
      doc.setFontSize(9);
      doc.setFont("helvetica", "italic");
      doc.text("Présentez ce QR code à l'entrée", centerX, yPos, {
        align: "center",
      });

      // Pied de page
      const footerY = pageHeight - 20;
      doc.setFillColor(...neutralBlue);
      doc.rect(0, footerY, pageWidth, 20, "F");

      doc.setTextColor(...white);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(
        "Ce billet est personnel et ne peut être transféré",
        centerX,
        footerY + 8,
        { align: "center" }
      );
      doc.text(
        "© " + new Date().getFullYear() + " Club Plus",
        centerX,
        footerY + 15,
        { align: "center" }
      );

      // Référence de sécurité
      doc.setTextColor(...mainOrange);
      doc.setFontSize(7);
      doc.text(
        "REF: " + qrContents[parseInt(ticketNum) - 1].substring(0, 15),
        margin,
        footerY - 5
      );

      // Enregistrer le PDF
      const sanitizedTitle = eventTitle
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "_");
      const filename = `Billet_${sanitizedTitle}.pdf`;
      doc.save(filename);

      console.log("PDF généré avec succès - formatage corrigé");
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      alert(
        "Une erreur est survenue lors de la génération du PDF. Veuillez réessayer."
      );
    }
  });

  // Initialisation
  updateTicketDisplay();
});
