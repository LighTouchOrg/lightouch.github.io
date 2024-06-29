$(document).ready(function() {
    const MAX_SCROLL = 20;
    let scrollPosition = 0;
    let startY = 0;
    
    function checkVisibility() {
        const windowHeight = $(window).height();
        
        $('.home-title-btn').each(function(index) {
            // make buttons appear when scrolling
            if (scrollPosition >= 20) {
                $(this).addClass('visible');
            } else {
                $(this).removeClass('visible');
            }
        });
    }

    function simulateScroll(event) {
        switch (event.type) {
            case 'wheel':
                if (event.originalEvent.deltaY > 0 && scrollPosition < MAX_SCROLL) {
                    scrollPosition += 20;
                } else if (event.originalEvent.deltaY < 0) {
                    scrollPosition -= 20;
                }
                break;
            case 'keydown':
                if (event.key === 'ArrowDown' && scrollPosition < MAX_SCROLL) {
                    scrollPosition += 20;
                } else if (event.key === 'ArrowUp') {
                    scrollPosition -= 20;
                }
                break;
            case 'touchstart':
                startY = event.originalEvent.touches[0].clientY; // Store starting Y position
                break;
            case 'touchmove':
                const currentY = event.originalEvent.touches[0].clientY;
                if (currentY < startY && scrollPosition < MAX_SCROLL) { // Moving up
                    scrollPosition += 20;
                } else if (currentY > startY && scrollPosition > 0) { // Moving down
                    scrollPosition -= 20;
                }
                startY = currentY; // Update startY to the current position for continuous scrolling
                break;
        }

        if (scrollPosition < 0) scrollPosition = 0;

        checkVisibility();
    }

    $(window).on('wheel', simulateScroll);
    $(window).on('keydown', simulateScroll);
    $(window).on('touchstart', simulateScroll);
    $(window).on('touchmove', simulateScroll);

    checkVisibility(); // Vérifiez la visibilité au chargement initial
});
