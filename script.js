/* =========================================================
   CENDEKIA MEDIKA — LOGIN SYSTEM
   Prototype only
   ========================================================= */

// Currently selected role
let selectedRole = "admin";

// Demo accounts
const demoAccounts = {
    admin: {
        email: "admin@cendekiamedika.com",
        password: "admin123",
        name: "Hospital Administrator",
        page: "pages/admin-dashboard.html"
    },

    doctor: {
        email: "doctor@cendekiamedika.com",
        password: "doctor123",
        name: "Dr. Amelia Putri",
        page: "pages/doctor-dashboard.html"
    },

    nurse: {
        email: "nurse@cendekiamedika.com",
        password: "nurse123",
        name: "Ns. Siti Rahma",
        page: "pages/nurse-dashboard.html"
    },

    patient: {
        email: "patient@cendekiamedika.com",
        password: "patient123",
        name: "Budi Santoso",
        page: "pages/patient-dashboard.html"
    }
};


/* =========================================================
   ROLE SELECTION
   ========================================================= */

const roleCards = document.querySelectorAll(".role-card");

roleCards.forEach(card => {

    card.addEventListener("click", () => {

        // Remove active state
        roleCards.forEach(item => {
            item.classList.remove("active");
        });

        // Activate selected role
        card.classList.add("active");

        // Store selected role
        selectedRole = card.dataset.role;

        // Clear previous message
        const message = document.getElementById("loginMessage");

        if (message) {
            message.textContent = "";
        }

    });

});


/* =========================================================
   PASSWORD VISIBILITY
   ========================================================= */

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

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


/* =========================================================
   LOGIN
   ========================================================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", event => {

        event.preventDefault();

        const email = document
            .getElementById("email")
            .value
            .trim()
            .toLowerCase();

        const password = document
            .getElementById("password")
            .value;

        const message = document.getElementById("loginMessage");

        const account = demoAccounts[selectedRole];


        // Check login credentials
        if (
            email === account.email &&
            password === account.password
        ) {

            // Store temporary session information
            sessionStorage.setItem(
                "userRole",
                selectedRole
            );

            sessionStorage.setItem(
                "userName",
                account.name
            );

            // Redirect to dashboard
            window.location.href = account.page;

        } else {

            message.textContent =
                "Incorrect email or password for the selected role.";

            message.style.color = "#dc2626";

        }

    });

}
/* =========================================================
   ADMIN — ADD USER MODAL
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const addUserButton = document.getElementById("addUserButton");
    const addUserModal = document.getElementById("addUserModal");
    const closeUserModal = document.getElementById("closeUserModal");
    const cancelUserModal = document.getElementById("cancelUserModal");

    // If we're not on the User Management page,
    // stop here.
    if (!addUserButton || !addUserModal) {
        return;
    }

    // OPEN MODAL
    addUserButton.addEventListener("click", function () {
        addUserModal.hidden = false;
    });

    // CLOSE MODAL
    closeUserModal.addEventListener("click", function () {
        addUserModal.hidden = true;
    });

    // CANCEL
    cancelUserModal.addEventListener("click", function () {
        addUserModal.hidden = true;
    });

    // CLICK OUTSIDE MODAL
    addUserModal.addEventListener("click", function (event) {

        if (event.target === addUserModal) {
            addUserModal.hidden = true;
        }

    });

});