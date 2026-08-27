export let currentDocumentId = null;
export let currentDocumentName = null;

export function setCurrentDocument(id, name) {
    currentDocumentId = id;
    currentDocumentName = name;
}

export function clearCurrentDocument() {
    currentDocumentId = null;
    currentDocumentName = null;
}