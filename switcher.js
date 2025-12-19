function documentReady() {
    // Get reference to the switcher element
    const switcher = document.querySelector(".switcher");

    if (!switcher) {
        console.error("Switcher element not found!");
        return;
    }

    // Function to track the previously selected radio button option
    const trackPrevious = (el) => {
        // Get all radio buttons within the switcher element
        const radios = el.querySelectorAll('input[type="radio"]');
        // Variable to store the previous selection
        let previousValue = null;

        // Find and store the initially checked radio button
        const initiallyChecked = el.querySelector('input[type="radio"]:checked');
        if (initiallyChecked) {
            // Get the c-option attribute value from the initially checked radio
            previousValue = initiallyChecked.getAttribute("c-option");
            // Set the c-previous attribute on the switcher element
            el.setAttribute("c-previous", previousValue);
            // Save theme preference to localStorage and set data attribute
            const themeValue = initiallyChecked.getAttribute("value");
            localStorage.setItem("theme-preference", themeValue);
            document.body.setAttribute("data-theme", themeValue);
            console.log("Initial theme set to:", themeValue);
        }

        // Add change event listener to each radio button
        radios.forEach((radio) => {
            radio.addEventListener("change", () => {
                // When a radio button is checked, update the previous value
                if (radio.checked) {
                    // Store the old selection in c-previous attribute
                    el.setAttribute("c-previous", previousValue ?? "");
                    // Update previousValue to the newly selected option
                    previousValue = radio.getAttribute("c-option");
                    // Save theme preference to localStorage and set data attribute
                    const themeValue = radio.getAttribute("value");
                    localStorage.setItem("theme-preference", themeValue);
                    document.body.setAttribute("data-theme", themeValue);
                    console.log("Theme changed to:", themeValue);
                }
            });
        });
    };

    // Restore theme preference from localStorage
    const restoreThemePreference = () => {
        const savedTheme = localStorage.getItem("theme-preference");
        if (savedTheme) {
            const radio = switcher.querySelector(`input[value="${savedTheme}"]`);
            if (radio) {
                radio.checked = true;
                document.body.setAttribute("data-theme", savedTheme);
                console.log("Restored theme from storage:", savedTheme);
            }
        } else {
            // Set default theme
            document.body.setAttribute("data-theme", "light");
            console.log("Set default theme: light");
        }
    };

    // Restore theme on page load
    restoreThemePreference();
    
    // Initialize the tracking functionality for the switcher
    trackPrevious(switcher);
}
document.addEventListener('DOMContentLoaded', documentReady);