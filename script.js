// script.js
document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.getElementById('downloadButton');
    const overlay = document.getElementById('overlay');
    const closeOverlayButton = document.getElementById('closeOverlayButton');

    // Function to open the overlay
    const openOverlay = () => {
        overlay.classList.add('active');
    };

    // Function to close the overlay
    const closeOverlay = () => {
        overlay.classList.remove('active');
    };

    // Event listener for the download button
    if (downloadButton) {
        downloadButton.addEventListener('click', openOverlay);
    }

    // Event listener for the close button in the overlay
    if (closeOverlayButton) {
        closeOverlayButton.addEventListener('click', closeOverlay);
    }

    // Optional: Close overlay if clicked outside the content (but within the overlay container)
    if (overlay) {
        overlay.addEventListener('click', (event) => {
            // Check if the click occurred directly on the overlay container, not its children
            if (event.target === overlay) {
                closeOverlay();
            }
        });
    }
});

// Dropdown Menu

const menuButton = document.getElementById('menuButton');
const menuContent = document.getElementById('menuContent');

menuButton.addEventListener('click', () => {
    if (!menuContent.classList.contains('active')) {
        // Make it visible first
        menuContent.classList.remove('hidden');

        // Force reflow to trigger transition
        void menuContent.offsetWidth;

        // Add active to trigger slide-in
        menuContent.classList.add('active');
    } else {
        // Remove active to slide out
        menuContent.classList.remove('active');

        // After transition, hide the element
        setTimeout(() => {
            menuContent.classList.add('hidden');
        }, 300); // match your CSS transition duration
    }
});


// Optional: close when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !menuContent.contains(e.target)) {
        menuContent.classList.add('hidden');
    }
});

// Main Background transition
const backgrounds = [
    'img/BG-Color.webp',
    'img/BG-Color2.jpg',
    'img/BG-Color4.jpg'
];

const wrapper = document.querySelector('.main-background');

function setRandomBackground() {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    wrapper.style.setProperty('--bg-url', `url('${backgrounds[randomIndex]}')`);
}

setRandomBackground();
setInterval(setRandomBackground, 10000);


// JavaScript to handle modal open / close functionality
// Use querySelectorAll to select all buttons with the class 'login-trigger'
// const loginButtons = document.querySelectorAll('.login-trigger');
const closeButton = document.getElementById('closeButton');
const loginModal = document.getElementById('loginModal');

// Function to show the modal
function showModal() {
    loginModal.classList.remove('hidden');
}

// Function to hide the modal
function hideModal() {
    loginModal.classList.add('hidden');
}

// // Add event listeners to all buttons with the 'login-trigger' class
// loginButtons.forEach(button => {
//     button.addEventListener('click', showModal);
// });

// Event listener to close the modal when the close button is clicked
closeButton.addEventListener('click', hideModal);

// // Event listener to close the modal if the user clicks outside the login card
// loginModal.addEventListener('click', (event) => {
//     // Check if the click occurred on the modal backdrop itself and not on the login card
//     if (event.target === loginModal) {
//         hideModal();
//     }
// });
