const eventsData = [
    {
      type: "Tech Talk",
      title: "Tech Summit 2025",
      date: "March 10, 2025",
      description: "Join us for an exciting tech summit featuring industry leaders.",
      image: "https://techsummit.ai/wp-content/uploads/2024/03/AI-Tech-Summit-Skopje-2023-428.jpg",
      link: "{{url_for('home')}}"
    },
    {
      type: "Workshop",
      title: "AI Workshop",
      date: "April 5, 2025",
      description: "A hands-on workshop exploring AI and Machine Learning.",
      image: "https://www.unlv.edu/sites/default/files/styles/1920_width/public/media/image/2023-05/AI%20Workshop%20Image.jpg?itok=hYN3AmnH",
      link: "{{url_for('home')}}"
    },
    {
      type: "Hackathon",
      title: "Hackathon 2025",
      date: "May 15, 2025",
      description: "Compete in a 24-hour coding challenge and win prizes!",
      image: "https://edison365.com/?seraph_accel_gi=wp-content%2Fuploads%2F2022%2F03%2FHow-do-hackathons-work.png&n=iNf2OlXUkWEBkZdk37MnnA",
      link: "https://www.google.com"
    }
  ];
  
  function createEventCard(event) {
    /* const link = document.createElement("a");
    link.className = "event-card-link"; */

    const card = document.createElement("div");
    card.className = "event-card";
  
    const image = document.createElement("img");
    image.className = "event-image";
    image.src = event.image;
    image.alt = event.title;
  
    const date = document.createElement("div");
    date.className = "event-date";
    date.textContent = event.date;
  
    const title = document.createElement("div");
    title.className = "event-title";
    title.textContent = event.title;

    const type = document.createElement("div");
    type.className = "event-type";
    type.textContent = event.type;
  
    const description = document.createElement("div");
    description.className = "event-description";
    description.textContent = event.description;

    card.appendChild(image);
    card.appendChild(type);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(date);
  
    return card;
  }
  
  const eventsContainer = document.getElementById("events-container");
  eventsData.forEach((event) => {
    const card = createEventCard(event);
    eventsContainer.appendChild(card);
  });
// Modified event listener code
document.querySelectorAll('.event-card').forEach((card, index) => {
  card.addEventListener('click', function(e) {
    // Get the URL from the corresponding event in eventsData
    const url = eventsData[index].link;
    window.location.href = url;
  });
  
  // Add a visual cue that the card is clickable
  card.style.cursor = 'pointer';
});