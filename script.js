document.getElementById("flightForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const apiKey = "api";  // Replace with your valid key
    const url = `link=${apiKey}`;

    document.getElementById("flightResults").innerHTML = "<p>Loading...</p>";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!data || !data.data) {
                document.getElementById("flightResults").innerHTML = "<p>No flights found or API limit reached.</p>";
                return;
            }

            let output = "<h3>Available Flights:</h3>";

            if (data.data.length === 0) {
                output += "<p>No flights found.</p>";
            } else {
                data.data.forEach(flight => {
                    output += `
                        <div>
                            <p><strong>Flight:</strong> ${flight.flight?.iata || "N/A"}</p>
                            <p><strong>Airline:</strong> ${flight.airline?.name || "N/A"}</p>
                            <p><strong>Origin:</strong> ${flight.departure?.iata || "N/A"}</p>
                            <p><strong>Destination:</strong> ${flight.arrival?.iata || "N/A"}</p>
                            <p><strong>Departure Time:</strong> ${flight.departure?.estimated || "N/A"}</p>
                            <p><strong>Arrival Time:</strong> ${flight.arrival?.estimated || "N/A"}</p>
                        </div>
                        <hr>
                    `;
                });
            }

            document.getElementById("flightResults").innerHTML = output;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("flightResults").innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        });
});
