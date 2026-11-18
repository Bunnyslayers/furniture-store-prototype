const menuToggle = document.getElementById('menu-toggle');
const navigation = document.getElementById('main-navigation');

function collapseSubmenus(container) {
    container.querySelectorAll('.submenu-toggle').forEach(button => {
        button.setAttribute('aria-expanded', 'false');
        document.getElementById(button.getAttribute('aria-controls')).hidden = true;
    });
}

function closeNavigation() {
    navigation.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    collapseSubmenus(navigation);
}

menuToggle.addEventListener('click', () => {
    if (navigation.hidden) {
        navigation.hidden = false;
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', 'Close navigation');
    } else {
        closeNavigation();
    }
});

navigation.querySelectorAll('.submenu-toggle').forEach(button => {
    button.addEventListener('click', () => {
        const submenu = document.getElementById(button.getAttribute('aria-controls'));
        const isOpen = button.getAttribute('aria-expanded') === 'true';
        if (isOpen) collapseSubmenus(submenu);
        submenu.hidden = isOpen;
        button.setAttribute('aria-expanded', String(!isOpen));
    });
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !navigation.hidden) {
        closeNavigation();
        menuToggle.focus();
    }
});

document.addEventListener('click', event => {
    if (!navigation.hidden && !navigation.contains(event.target) && !menuToggle.contains(event.target)) {
        closeNavigation();
    }
});
