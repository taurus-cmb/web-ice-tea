// script.js

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    let scrollPos = window.scrollY + window.innerHeight / 2;

    // Remove the 'active-section' class from all navigation links
    navLinks.forEach((link) => {
        link.classList.remove('active-section');
    });

    //check if we moved past the bottom of splash screen
    splash_div= document.querySelectorAll('.splash-container');
    if (window.scrollY < splash_div[0].offsetTop + splash_div[0].offsetHeight) {
        return;
    }

    let minDistance = Infinity;
    let closestSection;

    sections.forEach((section) => {
        let sectionMidpoint = section.offsetTop + section.offsetHeight / 2;
        let distance = Math.abs(sectionMidpoint - scrollPos);

        if (distance < minDistance) {
            minDistance = distance;
            closestSection = section;
        }
    });

    

    

    // Add the 'active-section' class to the current navigation link
    const currentLink = document.querySelector(`nav a[data-link="${closestSection.dataset.section}"]`);
    currentLink.classList.add('active-section');
});