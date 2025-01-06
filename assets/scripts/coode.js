window.addEventListener('scroll', function() {
    const navLinks = document.querySelectorAll('nav li');
    
    // Remove the 'active-section' class from all navigation links
    navLinks.forEach((link) => link.classList.remove('active-section'));

    //check if we're still in splash screen
    const splash = document.querySelector('.splash-container');
    if (window.scrollY < splash.offsetHeight - 100 ) {
        return;
    }

    // Find which section is most visible in the viewport
    const sections = document.querySelectorAll('section');
    const mostVisible = Array.from(sections).reduce((best, section) => {
        const rect = section.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        return visibleHeight > best.height ? {element: section, height: visibleHeight} : best;
    }, {element: null, height: 0});

    if (mostVisible.element) {
        // Add the 'active-section' class to the corresponding navigation link
        const currentLink = document.querySelector(`nav li[data-link="${mostVisible.element.dataset.section}"]`);
        currentLink.classList.add('active-section');
    }
});

function do_nav(tag_el) {
    // Get the target section from the data-link attribute
    const targetSection = document.querySelector(`section[data-section="${tag_el.dataset.link}"]`);
    
    if (!targetSection) return;

    // If it's not already active, scroll to it
    if (!tag_el.classList.contains('active-section')) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }
}

function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav ul');
    
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
}

// Close menu when clicking a nav item
document.querySelectorAll('nav li').forEach(item => {
    item.addEventListener('click', () => {
        const hamburger = document.querySelector('.hamburger');
        const nav = document.querySelector('nav ul');
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        const hamburger = document.querySelector('.hamburger');
        const nav = document.querySelector('nav ul');
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    }
});

function togglePersonDetails(button) {
    const personItem = button.closest('.person-item');
    const isExpanding = !personItem.classList.contains('expanded');
    
    // First collapse any currently expanded items
    document.querySelectorAll('.person-item.expanded').forEach(item => {
        if (item !== personItem) {
            item.classList.remove('expanded');
        }
    });
    
    // Toggle the clicked item
    personItem.classList.toggle('expanded');
    
    // Scroll into view if expanding
    if (isExpanding) {
        personItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}