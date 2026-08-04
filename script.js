// =========================================================
// CENDEKIA MEDIKA — DEMO LOGIN
// =========================================================

// Demo accounts
const demoAccounts = {
    admin: {
        email: "admin@cendekiamedika.com",
        password: "admin123",
        name: "System Administrator",
        dashboard: "pages/admin-dashboard.html"
    },

    doctor: {
        email: "doctor@cendekiamedika.com",
        password: "doctor123",
        name: "Dr. Aditya Pratama",
        dashboard: "pages/doctor-dashboard.html"
    },

    nurse: {
        email: "nurse@cendekiamedika.com",
        password: "nurse123",
        name: "Ns. Siti Rahma",
        dashboard: "pages/nurse-dashboard.html"
    },

    patient: {
        email: "patient@cendekiamedika.com",
        password: "patient123",
        name: "Alya Putri",
        dashboard: "pages/patient-dashboard.html"
    }
};


// =========================================================
// ROLE SELECTION
// =========================================================

const roleCards = document.querySelectorAll(".role-card");

let selectedRole = "admin";

roleCards.forEach(card => {

    card.addEventListener("click", () => {

        roleCards.forEach(item => {
            item.classList.remove("active");
        });

        card.classList.add("active");

        selectedRole = card.dataset.role;

        // Update placeholder according to selected role
        const emailInput = document.getElementById("email");

        if (emailInput) {
            emailInput.value = "";
            emailInput.placeholder =
                `${selectedRole}@cendekiamedika.com`;
        }

    });

});


// =========================================================
// PASSWORD VISIBILITY
// =========================================================

const togglePassword =
    document.getElementById("togglePassword");

const passwordInput =
    document.getElementById("password");

if (togglePassword && passwordInput) {

    togglePassword.addEventListener("click", () => {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";
            togglePassword.textContent = "Hide";

        } else {

            passwordInput.type = "password";
            togglePassword.textContent = "Show";

        }

    });

}


// =========================================================
// LOGIN
// =========================================================

const loginForm =
    document.getElementById("loginForm");

const loginMessage =
    document.getElementById("loginMessage");


if (loginForm) {

    loginForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const account =
            demoAccounts[selectedRole];


        // Check credentials
        if (
            email === account.email &&
            password === account.password
        ) {

            loginMessage.textContent =
                `Welcome, ${account.name}.`;

            loginMessage.style.color =
                "#16a34a";


            // Save demo session
            sessionStorage.setItem(
                "userRole",
                selectedRole
            );

            sessionStorage.setItem(
                "userName",
                account.name
            );


            // Go to the appropriate dashboard
            setTimeout(() => {

                window.location.href =
                    account.dashboard;

            }, 500);


        } else {

            loginMessage.textContent =
                "Invalid email or password.";

            loginMessage.style.color =
                "#dc2626";

        }

    });

}