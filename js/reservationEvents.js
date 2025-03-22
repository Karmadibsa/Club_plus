document.addEventListener("DOMContentLoaded", function () {
  // Set user name
  document.getElementById("user-name").textContent = "Reservataire";

  // Sample data for events
  const events = [
    {
      id: 1,
      name: "Tournoi de Tennis",
      date: "2023-06-15",
      time: "14:00",
      location: "Court central",
      capacity: 30,
      available: 6,
      status: "upcoming",
    },
    {
      id: 2,
      name: "Soirée Gala",
      date: "2023-06-20",
      time: "19:30",
      location: "Grand Hall",
      capacity: 100,
      available: 15,
      status: "upcoming",
    },
    {
      id: 3,
      name: "Cours de Yoga",
      date: "2023-05-10",
      time: "10:00",
      location: "Salle Zen",
      capacity: 15,
      available: 0,
      status: "past",
    },
    {
      id: 4,
      name: "Réunion Membres",
      date: "2023-05-05",
      time: "18:00",
      location: "Salle de conférence",
      capacity: 50,
      available: 0,
      status: "past",
    },
    {
      id: 5,
      name: "Championnat d'Échecs",
      date: "2023-06-30",
      time: "13:00",
      location: "Salle des jeux",
      capacity: 20,
      available: 8,
      status: "upcoming",
    },
  ];

  // Populate events table
  populateEventsTable(events);

  // Search functionality
  document
    .getElementById("search-event")
    .addEventListener("input", function () {
      filterEvents();
    });

  // Filter functionality
  document
    .getElementById("filter-status")
    .addEventListener("change", function () {
      filterEvents();
    });

  // Pagination setup
  document.getElementById("prev-page").addEventListener("click", function () {
    // Implement previous page logic
    alert("Précédent");
  });

  document.getElementById("next-page").addEventListener("click", function () {
    // Implement next page logic
    alert("Suivant");
  });
});

function populateEventsTable(events) {
  const eventsTable = document.getElementById("events-table");
  eventsTable.innerHTML = "";

  events.forEach((event) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${event.name}</td>
            <td>${formatDate(event.date)}</td>
            <td>${event.time}</td>
            <td>${event.location}</td>
            <td>${event.available} / ${event.capacity}</td>
            <td><span class="status-${
              event.status === "upcoming" ? "active" : "inactive"
            }">${event.status === "upcoming" ? "À venir" : "Passé"}</span></td>
            <td>
                <button class="btn-action" onclick="viewEvent(${event.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-action" onclick="editEvent(${event.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-action" onclick="deleteEvent(${event.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
    eventsTable.appendChild(row);
  });
}

function filterEvents() {
  const searchTerm = document
    .getElementById("search-event")
    .value.toLowerCase();
  const statusFilter = document.getElementById("filter-status").value;

  // Implement filtering logic here
  alert(`Recherche: ${searchTerm}, Filtre: ${statusFilter}`);
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("fr-FR", options);
}

function viewEvent(id) {
  alert(`Affichage des détails de l'événement #${id}`);
  // Redirection vers la page de détails: window.location.href = `event-details.html?id=${id}`;
}

function editEvent(id) {
  alert(`Modification de l'événement #${id}`);
  // Redirection vers la page d'édition: window.location.href = `edit-event.html?id=${id}`;
}

function deleteEvent(id) {
  if (confirm(`Êtes-vous sûr de vouloir supprimer l'événement #${id} ?`)) {
    // Delete event logic here
    alert(`Événement #${id} supprimé`);
  }
}
