document.addEventListener("DOMContentLoaded", function () {
  // Set user name (would typically come from a session/API)
  document.getElementById("user-name").textContent = "Reservataire";

  // Sample data for events table
  const events = [
    {
      name: "Tournoi de Tennis",
      date: "2023-06-15",
      location: "Court central",
      participants: 24,
      id: 1,
    },
    {
      name: "Soirée Gala",
      date: "2023-06-20",
      location: "Grand Hall",
      participants: 85,
      id: 2,
    },
    {
      name: "Cours de Yoga",
      date: "2023-06-10",
      location: "Salle Zen",
      participants: 12,
      id: 3,
    },
    {
      name: "Réunion Membres",
      date: "2023-06-05",
      location: "Salle de conférence",
      participants: 30,
      id: 4,
    },
  ];

  // Populate events table
  const eventsTable = document.getElementById("events-table");
  events.forEach((event) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${event.name}</td>
            <td>${event.date}</td>
            <td>${event.location}</td>
            <td>${event.participants}</td>
            <td>
                <button class="btn-action" onclick="viewEvent(${event.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-action" onclick="editEvent(${event.id})">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        `;
    eventsTable.appendChild(row);
  });

  // Stats summary (would typically come from an API)
  document.getElementById("total-members").textContent = "120";
  document.getElementById("upcoming-events").textContent = "5";
  document.getElementById("pending-reservations").textContent = "12";
});

// View event details
function viewEvent(id) {
  alert(`Affichage des détails de l'événement #${id}`);
  // Redirection vers la page de détails: window.location.href = `event-details.html?id=${id}`;
}

// Edit event
function editEvent(id) {
  alert(`Modification de l'événement #${id}`);
  // Redirection vers la page d'édition: window.location.href = `edit-event.html?id=${id}`;
}
