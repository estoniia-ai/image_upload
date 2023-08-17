// Maximum desired height for the image preview in viewport height units.
const DESIRED_PREVIEW_MAX_HEIGHT_VH = 50;

// DOM elements
const uploadArea = document.getElementById('uploadArea');
const photoInput = document.getElementById('photoInput');
const preview = document.getElementById('preview');
const uploadFormButton = document.getElementById('uploadFormSubmit');

// Event listeners
photoInput.addEventListener('change', handleFileSelection);

window.onload = displayUploadMessage;

/**
 * Handles the file selection event.
 * @param {Event} event - The file input change event.
 */
function handleFileSelection(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function() {
        displayImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
}

/**
 * Displays the selected image in the preview area.
 * @param {string} imageData - The data URL of the selected image.
 */
function displayImagePreview(imageData) {
    const image = new Image();
    image.src = imageData;

    image.onload = function() {
        adjustImageDimensions(image);
    }

    preview.innerHTML = '';
    preview.appendChild(image);
    uploadFormButton.classList.remove('hidden');
}

/**
 * Adjusts the dimensions of the image based on the desired maximum height.
 * @param {HTMLImageElement} image - The image element to adjust.
 */
function adjustImageDimensions(image) {
    const imageAspectRatio = image.width / image.height;
    const imageHeightInVH = image.height / window.innerHeight * 100;
    const desiredMaxHeightInPixels = window.innerHeight / 100 * DESIRED_PREVIEW_MAX_HEIGHT_VH;

    if (imageHeightInVH > DESIRED_PREVIEW_MAX_HEIGHT_VH) {
        image.height = desiredMaxHeightInPixels;
        image.width = imageAspectRatio * image.height;
    }
}

/**
 * Displays a message after the image upload.
 */
function displayUploadMessage() {
    const message = document.body.getAttribute('data-message');
    if (message && message !== "{{ message }}") {
        if (message === "success") {
            alert("Thank you!");
        } else {
            alert(message);
        }
    }
}
