import { uploadDocument } from "../../Api/documents.js";
import { setCurrentDocument, clearCurrentDocument } from "../../State/currentDocument.js";

const toolsButton = document.getElementById("toolsButton");
const toolsButtonIcon = document.getElementById("toolsButtonIcon");
const toolsMenu = document.getElementById("toolsMenu");
const uploadDocButton = document.getElementById("uploadDocButton");
const documentUploadInput = document.getElementById("documentUploadInput");
const searchForm = document.getElementById("searchForm");

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

// --- attached-document chip, shown above the search form ---
const documentChip = document.createElement("div");
documentChip.id = "attachedDocumentChip";
documentChip.className = "hidden items-center gap-2 mb-2 px-3 py-1.5 bg-teal/10 border border-teal/20 rounded-full text-xs text-body-text w-fit";

const chipLabel = document.createElement("span");
const chipRemoveBtn = document.createElement("button");
chipRemoveBtn.type = "button";
chipRemoveBtn.textContent = "×";
chipRemoveBtn.className = "text-secondary-text hover:text-mint ml-1 font-semibold";

documentChip.appendChild(chipLabel);
documentChip.appendChild(chipRemoveBtn);
searchForm.parentElement.insertBefore(documentChip, searchForm);

function showChip(text) {
    chipLabel.textContent = `📄 ${text}`;
    documentChip.classList.remove("hidden");
    documentChip.classList.add("flex");
}

function hideChip() {
    documentChip.classList.add("hidden");
    documentChip.classList.remove("flex");
}

chipRemoveBtn.addEventListener("click", () => {
    clearCurrentDocument();
    hideChip();
    documentUploadInput.value = ""; // lets the user re-pick the same file later
});

documentUploadInput.addEventListener("change", async () => {
    const file = documentUploadInput.files[0];
    if (!file) return;

    showChip(`Uploading ${file.name}...`);

    try {
        const { document_id } = await uploadDocument(file);
        setCurrentDocument(document_id, file.name);
        showChip(file.name);
    } catch (error) {
        console.error("Failed to upload document:", error);
        hideChip();
        alert("That document couldn't be uploaded. Please try again.");
    }
});