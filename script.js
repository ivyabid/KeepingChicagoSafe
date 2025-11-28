// using this to ensure proper fetching from github
const REPO_BASE_PATH = 'https://ivyabid.github.io/KeepingChicagoSafe/';

async function loadContent(url) {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;

    contentArea.innerHTML = '<p id="loading">Loading...</p>';

    const fullPath = REPO_BASE_PATH + url;

    try {
        // Fetch the content
        const response = await fetch(fullPath);
        
        // Check for successful HTTP status (e.g., not 404)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} for ${fullPath}`);
        }
        
        // Get the raw text from the other html files
        const htmlFragment = await response.text();

        // putting the text into the content-area div
        contentArea.innerHTML = htmlFragment;

    } catch (e) {
        // Handle any errors (network failure, 404, etc.)
        console.error('Failed to load content:', e.message);
        contentArea.innerHTML = 
            `<div id="failedLoad">
                <b>Error:</b> Could not load resource. Please check file path: ${url}
            </div>`;
    }
}

/**
 * Attaches click event listeners to all navigation buttons and loads default content.
 */
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-button');

    navButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            // Prevent the default link navigation
            event.preventDefault();
            
            const targetUrl = this.getAttribute('href');
            loadContent(targetUrl);
        });
    });

    // Load the default page content on initial page load
    const defaultPageUrl = document.getElementById('button-kyr')?.getAttribute('href');
    if (defaultPageUrl) {
        loadContent(defaultPageUrl);
    }
}

document.addEventListener('DOMContentLoaded', setupNavigation);
