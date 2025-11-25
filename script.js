const REPO_BASE_PATH = '/MyWebsite/';


async function loadContent(url) {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;

    // Clear previous content and show loading message
    contentArea.innerHTML = '<p style="text-align: center; padding: 20px;">Loading...</p>';

    const fullPath = REPO_BASE_PATH + url;

    try {
        // 1. Fetch the content
        const response = await fetch(fullPath);
        
        // 2. Check for successful HTTP status (e.g., not 404)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} for ${fullPath}`);
        }
        
        // 3. Get the raw text (the content fragment)
        const htmlFragment = await response.text();

        // 4. Inject the content
        contentArea.innerHTML = htmlFragment;

        // Optional: Update the browser history/URL
        window.history.pushState({}, '', `#${url.split('.')[0]}`);

    } catch (e) {
        // 5. Handle any errors (network failure, 404, etc.)
        console.error('Failed to load content:', e.message);
        contentArea.innerHTML = 
            `<div style="color: red; padding: 20px; border: 1px solid #f8d7da; background-color: #f8d7da; text-align: center;">
                <strong>Error:</strong> Could not load resource. Please check file path: ${url}
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