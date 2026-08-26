
const toolsButton = document.getElementById("toolsButton");
const toolsButtonIcon = document.getElementById("toolsButtonIcon");
const toolsMenu = document.getElementById("toolsMenu");
const uploadDocButton = document.getElementById("uploadDocButton");
const documentUploadInput = document.getElementById("documentUploadInput");

function openToolsMenu() {
    toolsMenu.classList.remove("opacity-0", "scale-95", "translate-y-2", "pointer-events-none");
    toolsMenu.classList.add("opacity-100", "scale-100", "translate-y-0");
    toolsButtonIcon.classList.add("rotate-45");
    toolsButton.setAttribute("aria-expanded", "true");
}

function closeToolsMenu() {
    toolsMenu.classList.add("opacity-0", "scale-95", "translate-y-2", "pointer-events-none");
    toolsMenu.classList.remove("opacity-100", "scale-100", "translate-y-0");
    toolsButtonIcon.classList.remove("rotate-45");
    toolsButton.setAttribute("aria-expanded", "false");
}

toolsButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = toolsButton.getAttribute("aria-expanded") === "true";
    isOpen ? closeToolsMenu() : openToolsMenu();
});

document.addEventListener("click", (event) => {
    if (!toolsMenu.contains(event.target) && !toolsButton.contains(event.target)) {
        closeToolsMenu();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeToolsMenu();
});

uploadDocButton.addEventListener("click", () => {
    documentUploadInput.click();
    closeToolsMenu();
});

documentUploadInput.addEventListener("change", () => {
    const file = documentUploadInput.files[0];
    if (file) {
        console.log("Selected file for RAG upload:", file.name);
        // Wire this to a real upload endpoint once the RAG backend module exists
    }
});