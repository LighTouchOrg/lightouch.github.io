// make appear buttons when scrolling
$(document).ready(function() {
    const MAX_SCROLL = 20;
    let scrollPosition = 0;

    function checkVisibility() {
        const windowHeight = $(window).height();

        $('.home-title-btn').each(function(index) {

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
            case 'touchmove':
                if (event.originalEvent.touches[0].clientY > 0 && scrollPosition < MAX_SCROLL) {
                    scrollPosition += 20;
                } else if (event.originalEvent.touches[0].clientY < 0) {
                    scrollPosition -= 20;
                }
                break;
        }

        if (scrollPosition < 0) scrollPosition = 0;

        checkVisibility();
    }

    $(window).on('wheel', simulateScroll);
    $(window).on('keydown', simulateScroll);
    $(window).on('touchmove', simulateScroll);

    checkVisibility(); // Vérifiez la visibilité au chargement initial
});
