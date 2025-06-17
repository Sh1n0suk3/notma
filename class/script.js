// Wait until the entire HTML document is loaded and parsed.
document.addEventListener('DOMContentLoaded', () => {

    // Get all the quiz links from the sidebar.
    const quizLinks = document.querySelectorAll('.quiz-link');

    // Get all the content sections for the answers.
    const answerContents = document.querySelectorAll('.answer-content');

    // Get the default message div.
    const defaultMessage = document.getElementById('default-message');

    // Add a click event listener to each quiz link.
    quizLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Prevent the link from trying to navigate to a new page.
            event.preventDefault();

            // --- 1. Update the link styles ---
            // First, remove the 'active-link' class from all links.
            quizLinks.forEach(l => l.classList.remove('active-link'));
            // Then, add the 'active-link' class to the one that was just clicked.
            link.classList.add('active-link');


            // --- 2. Update the content visibility ---
            // Get the target ID from the link's data-target attribute (e.g., "quiz1").
            const targetId = link.getAttribute('data-target');
            
            // Find the specific answer content div that matches the target ID.
            const targetContent = document.getElementById(targetId);

            // Hide all answer content sections first.
            answerContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Then, show only the target content by adding the 'active' class.
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});