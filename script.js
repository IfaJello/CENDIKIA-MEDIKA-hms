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

const addUserButton =
    document.getElementById("addUserButton");

const userModal =
    document.getElementById("userModal");

const closeUserModal =
    document.getElementById("closeUserModal");

const cancelUserModal =
    document.getElementById("cancelUserModal");

const addUserForm =
    document.getElementById("addUserForm");


function openUserModal() {

    if (!userModal) return;

    userModal.classList.add("open");

}


function closeUserModalWindow() {

    if (!userModal) return;

    userModal.classList.remove("open");

}


if (addUserButton) {

    addUserButton.addEventListener(
        "click",
        openUserModal
    );

}


if (closeUserModal) {

    closeUserModal.addEventListener(
        "click",
        closeUserModalWindow
    );

}


if (cancelUserModal) {

    cancelUserModal.addEventListener(
        "click",
        closeUserModalWindow
    );

}


/* Close when clicking outside modal */

if (userModal) {

    userModal.addEventListener("click", event => {

        if (event.target === userModal) {

            closeUserModalWindow();

        }

    });

}


/* =========================================================
   CREATE USER
   ========================================================= */

if (addUserForm) {

    addUserForm.addEventListener("submit", event => {

        event.preventDefault();


        const name =
            document
                .getElementById("newUserName")
                .value
                .trim();

        const email =
            document
                .getElementById("newUserEmail")
                .value
                .trim();

        const role =
            document
                .getElementById("newUserRole")
                .value;

        const department =
            document
                .getElementById("newUserDepartment")
                .value
                .trim();

        const status =
            document
                .getElementById("newUserStatus")
                .value;


        if (!name || !email || !role) {

            alert("Please complete the required fields.");

            return;

        }


        const table =
            document.querySelector("#usersTable tbody");


        if (!table) return;


        const row =
            document.createElement("tr");


        row.dataset.role = role;
        row.dataset.status = status;


        const roleName =
            role.charAt(0).toUpperCase() +
            role.slice(1);


        const statusLabel =
            status === "active"
                ? "Active"
                : "Inactive";


        const statusClass =
            status === "active"
                ? "status-success"
                : "status-neutral";


        row.innerHTML = `

            <td>
                <strong>
                    ${name}
                </strong>
            </td>

            <td>
                ${roleName}
            </td>

            <td>
                ${department || "—"}
            </td>

            <td>
                ${email}
            </td>

            <td>

                <span class="status ${statusClass}">
                    ${statusLabel}
                </span>

            </td>

            <td>
                Just now
            </td>

            <td>

                <button
                    class="table-action"
                    type="button"
                >
                    ⋮
                </button>

            </td>

        `;


        table.appendChild(row);


        // Reset form
        addUserForm.reset();


        // Close modal
        closeUserModalWindow();


        // Tell user it worked
        alert(
            `${name} has been added successfully.`
        );

    });

}
console.log("CENDEKIA MEDIKA script.js is working!");