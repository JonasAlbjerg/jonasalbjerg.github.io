function showProjectDetails(title, content, description) {
  document.getElementById("modalProjectTitle").innerText = title;

  const contentContainer = document.getElementById("modalProjectContent");
  contentContainer.innerHTML = "";

  for (const item of content) {
    if (item.type === "image") {
      const imageElement = document.createElement("img");
      imageElement.src = item.value;
      contentContainer.appendChild(imageElement);
    } else if (item.type === "text") {
      const textElement = document.createElement("p");
      textElement.innerText = item.value;
      contentContainer.appendChild(textElement);
    } else if (item.type === "video") {
      const videoElement = document.createElement("video");
      videoElement.src = item.value;
      videoElement.controls = true; // Show video controls
      contentContainer.appendChild(videoElement);
    }
  }

  document.getElementById("modalProjectDescription").innerText = description;
  document.getElementById("projectModal").classList.add("show");
}

// Function to hide the modal
function hideProjectDetails() {
  document.getElementById("projectModal").classList.remove("show"); // Remove .show class
}

// Get the projects section element
const projectsSection = document.getElementById("projects");

// Get the navigation bar element
const navbar = document.getElementById("navbar");

// Get the offset top position of the projects section
const projectsOffsetTop = projectsSection.offsetTop;

// Variable to keep track of whether the navigation bar should be shown or not
let shouldShowNavbar = false;

// Function to handle the scroll event
function handleScroll() {
  // Get the current scroll position
  const scrollPosition = window.scrollY;

  // Check if the scroll position is below the projects section
  if (scrollPosition >= projectsOffsetTop) {
    // Show the navigation bar only if it's not already shown
    if (!shouldShowNavbar) {
      shouldShowNavbar = true;
      navbar.classList.remove("hidden-nav");
    }
  } else {
    // Hide the navigation bar only if it's not already hidden
    if (shouldShowNavbar) {
      shouldShowNavbar = false;
      navbar.classList.add("hidden-nav");
    }
  }
}

// Function to check the initial scroll position and show/hide the navigation bar accordingly
function checkInitialScroll() {
  const scrollPosition = window.scrollY;
  if (scrollPosition >= projectsOffsetTop) {
    shouldShowNavbar = true;
    navbar.classList.remove("hidden-nav");
  } else {
    shouldShowNavbar = false;
    navbar.classList.add("hidden-nav");
  }
}

// Add a scroll event listener to the window
window.addEventListener("scroll", handleScroll);

// Trigger the scroll event on page load to check the initial position
checkInitialScroll();


// Function to handle link click event
function handleLinkClick(event) {
  // Get all the navigation links
  const links = document.querySelectorAll(".navbar-links a");

  // Remove the "active" class from all links
  links.forEach(link => link.classList.remove("active"));

  // Add the "active" class to the clicked link
  event.target.classList.add("active");
}

// Add click event listeners to all navigation links
const links = document.querySelectorAll(".navbar-links a");
links.forEach(link => link.addEventListener("click", handleLinkClick));

function filterProjects(category) {
  const projectCards = document.querySelectorAll('.card');

  projectCards.forEach(card => {
     const cardCategories = card.getAttribute('data-categories').split(',');

     if (category === 'alle' || cardCategories.includes(category)) {
        card.style.display = 'block';
     } else {
        card.style.display = 'none';
     }
  });
}

// Example sort function, you can customize this
function sortProjects() {
  const projectContainer = document.querySelector('.grid-container');
  const projectCards = document.querySelectorAll('.card');

  const sortedCards = Array.from(projectCards).sort((a, b) => {
    // Customize your sorting logic here
    return a.getAttribute('data-sort') - b.getAttribute('data-sort');
  });

  projectContainer.innerHTML = '';
  sortedCards.forEach(card => {
    projectContainer.appendChild(card);
  });
}