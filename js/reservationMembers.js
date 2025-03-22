document.addEventListener("DOMContentLoaded", function () {
  // Set user name
  document.getElementById("user-name").textContent = "Reservataire";

  // Sample data for members table
  const members = [
    {
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@email.com",
      phone: "06 12 34 56 78",
      status: "active",
      joinDate: "2022-02-15",
    },
    {
      firstName: "Marie",
      lastName: "Martin",
      email: "marie.martin@email.com",
      phone: "06 23 45 67 89",
      status: "active",
      joinDate: "2022-03-01",
    },
    {
      firstName: "Pierre",
      lastName: "Bernard",
      email: "pierre.bernard@email.com",
      phone: "06 34 56 78 90",
      status: "active",
      joinDate: "2022-01-10",
    },
    {
      firstName: "Sophie",
      lastName: "Petit",
      email: "sophie.petit@email.com",
      phone: "06 45 67 89 01",
      status: "inactive",
      joinDate: "2022-05-20",
    },
    {
      firstName: "Lucas",
      lastName: "Robert",
      email: "lucas.robert@email.com",
      phone: "06 56 78 90 12",
      status: "active",
      joinDate: "2022-04-05",
    },
  ];

  // Populate members table
  populateTable(members);

  // Search functionality
  document
    .getElementById("search-member")
    .addEventListener("input", function () {
      filterMembers();
    });

  // Filter functionality
  document
    .getElementById("filter-status")
    .addEventListener("change", function () {
      filterMembers();
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

function populateTable(members) {
  const membersTable = document.getElementById("members-table");
  membersTable.innerHTML = "";

  members.forEach((member) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${member.lastName}</td>
            <td>${member.firstName}</td>
            <td>${member.email}</td>
            <td>${member.phone}</td>
            <td><span class="status-${member.status}">${
      member.status === "active" ? "Actif" : "Inactif"
    }</span></td>
            <td>${formatDate(member.joinDate)}</td>
        `;
    membersTable.appendChild(row);
  });
}

function filterMembers() {
  const searchTerm = document
    .getElementById("search-member")
    .value.toLowerCase();
  const statusFilter = document.getElementById("filter-status").value;

  // Implement filtering logic here
  alert(`Recherche: ${searchTerm}, Filtre: ${statusFilter}`);
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("fr-FR", options);
}
