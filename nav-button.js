document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to navigation items
    document.querySelectorAll('.bottom-nav .nav-item').forEach(function(item) {
        item.addEventListener('click', function(event) {
            // Remove the checked class from all nav items within the bottom-nav
            document.querySelectorAll('.bottom-nav .nav-item').forEach(function(nav) {
                nav.classList.remove('checked');
            });

            // Add the checked class to the clicked nav item
            item.classList.add('checked');
        });
    });

    // Check the current URL and set the corresponding nav item as checked
    const currentPath = window.location.pathname.split("/").pop();
    document.querySelectorAll('.bottom-nav .nav-item').forEach(function(item) {
        const link = item.querySelector('a').getAttribute('href');
        if (link === currentPath || (link === 'index.html' && currentPath === '')) {
            item.classList.add('checked');
        }
    });
});
