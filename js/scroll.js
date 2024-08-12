const MAX_SCROLL = 1000;
const BUTTONS_Y = 15;
const PAGE_1_Y = 500;
const PAGE_1_END_Y = 1000;

let scrollPosition = 0;
let startY = 0;

function checkVisibility() {
    let buttons = $('.home-title-btn').toArray();

    if (scrollPosition >= PAGE_1_END_Y) $('.arrow').addClass('arrow-hidden');
    else $('.arrow').removeClass('arrow-hidden');

    if (scrollPosition >= BUTTONS_Y) buttons = buttons.reverse();
    console.log(scrollPosition);

    $(buttons).each(function(index) {
        // Calculate delay based on index, e.g., first button has no delay, second has 100ms, third has 200ms, etc.
        var delay = index * 150; // Adjust the 100ms to control the speed of the sequence

        setTimeout(() => {
            // make buttons appear when scrolling with a delay
            if (scrollPosition >= BUTTONS_Y) {
                $(this).addClass('visible');
                $(this).removeClass('hidden');
            } else {
                $(this).removeClass('visible');
                $(this).addClass('hidden');
            }
        }, delay);
    });

    if (scrollPosition >= PAGE_1_Y) {
        $('#projectSection').css('display', 'flex');
        $('#projectSection h2').addClass('text-animation');
    } else {
        $('#projectSection').css('display', 'none');
        $('#projectSection h2').removeClass('text-animation');
    }
}

function simulateScroll(event) {
    switch (event.type) {
        case 'wheel':
            // Directly setting based on deltaY might not be practical for continuous events like 'wheel'
            // Consider using a function to calculate the target position based on deltaY
            if (scrollPosition <= PAGE_1_Y) {
                scrollPosition += event.originalEvent.deltaY;
            } else {
                scrollPosition = PAGE_1_Y + window.scrollY;
            }
            break;
        case 'keydown':
            // Directly set to next or previous section
            if (event.key === 'ArrowDown') {
                scrollToNextSection();
            } else if (event.key === 'ArrowUp') {
                scrollToPreviousSection();
            }
            break;
        case 'touchstart':
            startY = event.originalEvent.touches[0].clientY;
            break;
        case 'touchmove':
            const currentY = event.originalEvent.touches[0].clientY;
            // Directly set scrollPosition based on touch movement
            scrollPosition = startY - currentY + initialScrollPosition; // initialScrollPosition is where the scroll started
            startY = currentY; // Update startY for continuous scrolling
            break;
    }

    // Ensure scrollPosition is within bounds
    if (scrollPosition < 0) scrollPosition = 0;
    if (scrollPosition > MAX_SCROLL) scrollPosition = MAX_SCROLL;

    checkVisibility();
}

function scrollTo(position) {
    $('html, body').stop().animate({
        scrollTop: position
    }, position / 2, 'linear');
    checkVisibility();
}

function scrollToNextSection() {
    if (scrollPosition < BUTTONS_Y) scrollPosition = BUTTONS_Y;
    else if (scrollPosition < PAGE_1_END_Y) scrollPosition = PAGE_1_END_Y;
    else if (scrollPosition >= PAGE_1_END_Y) scrollPosition = BUTTONS_Y;
    else scrollPosition = 0;
    scrollTo(scrollPosition);
}

function scrollToPreviousSection() {
    if (scrollPosition <= BUTTONS_Y) scrollPosition = 0;
    else if (scrollPosition <= PAGE_1_END_Y) scrollPosition = BUTTONS_Y;
    else if (scrollPosition > PAGE_1_END_Y) scrollPosition = PAGE_1_END_Y;
    scrollTo(scrollPosition);
}

function scrollToSection(page) {
    switch (page) {
        case 1:
            scrollPosition = PAGE_1_END_Y;
            break;
    }
    // unfocus all buttons & as
    $('button').blur();
    $('a').blur();
    scrollTo(scrollPosition);
}

function easteregg() {
    let b_is_pressed = false;
    let f_is_pressed = false;
    let a_is_pressed = false;
    let n_is_pressed = false;
    let j_is_pressed = false;

    $(document).keydown(function (e) {
        if (e.key === 'b') {
            b_is_pressed = true;
        } else if (e.key === 'f') {
            f_is_pressed = true;
        } else if (e.key === 'a') {
            a_is_pressed = true;
        } else if (e.key === 'n') {
            n_is_pressed = true;
        } else if (e.key === 'j') {
            j_is_pressed = true;
        }

        if (b_is_pressed && f_is_pressed && a_is_pressed && n_is_pressed && j_is_pressed) {
            window.open('https://github.com/LighTouchOrg', '_blank');
            b_is_pressed = false;
            f_is_pressed = false;
            a_is_pressed = false;
            n_is_pressed = false;
            j_is_pressed = false;
        }
    });
}

$(document).ready(function () {
    easteregg(); // easter egg pour le fun
    $(window).on('wheel', simulateScroll);
    $(window).on('keydown', simulateScroll);
    $(window).on('touchstart', simulateScroll);
    $(window).on('touchmove', simulateScroll);

    checkVisibility(); // check visibility on page load
});
