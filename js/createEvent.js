document.addEventListener("DOMContentLoaded", function () {
  // Set user name
  document.getElementById("user-name").textContent = "Reservataire";

  // Set minimum date to today
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const todayString = `${yyyy}-${mm}-${dd}`;
  document.getElementById("event-date").min = todayString;

  // Handle form submission
  document
    .getElementById("event-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const eventData = {
        name: document.getElementById("event-name").value,
        date: document.getElementById("event-date").value,
        time: document.getElementById("event-time").value,
        location: document.getElementById("event-location").value,
        capacity: document.getElementById("event-capacity").value,
        price: document.getElementById("event-price").value,
        description: document.getElementById("event-description").value,
        // Image handling would require more complex logic with FileReader API
      };

      // Validation logic could be added here

      // Submit data (would typically be an API call)
      console.log("Événement à créer:", eventData);
      alert("Événement créé avec succès!");

      // Redirect back to events page
      window.location.href = "evenements.html";
    });
});
