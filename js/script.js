/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/* Menu show */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
    const header = document.getElementById('header')
    // Add a class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('scroll-header')
        : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== TESTIMONIAL SWIPER ===============*/
let testimonialSwiper = new Swiper(".testimonial-swiper", {
    spaceBetween: 30,
    loop: 'true',

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

/*=============== NEW SWIPER ===============*/
let newSwiper = new Swiper(".new-swiper", {
    spaceBetween: 24,
    loop: 'true',

    breakpoints: {
        576: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 4,
        },
    },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SHOW CART ===============*/
const cart = document.getElementById('cart'),
    cartShop = document.getElementById('cart-shop'),
    cartClose = document.getElementById('cart-close'),
    cartContainer = document.querySelector('.cart__container'),
    cartPricesTotal = document.querySelector('.cart__prices-total'),
    cartPricesItems = document.querySelector('.cart__prices-item');

let cartItems = []; // Хранилище товаров

/*===== Показать корзину =====*/
if (cartShop) {
    cartShop.addEventListener('click', () => {
        cart.classList.add('show-cart');
        updateCart();
    });
}

/*===== Закрыть корзину =====*/
if (cartClose) {
    cartClose.addEventListener('click', () => {
        cart.classList.remove('show-cart');
    });
}

/*===== Добавление товаров в корзину из всех секций =====*/
document.querySelectorAll('.products__button, .featured__button, .new__button').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.products__card, .featured__card, .new__card'); // Исправлено
        if (!productCard) return;

        const nameElement = productCard.querySelector('.products__title, .featured__title, .new__title'); // Исправлено
        const priceElement = productCard.querySelector('.products__price, .featured__price, .new__price'); // Исправлено
        const imgElement = productCard.querySelector('.products__img, .featured__img, .new__img'); // Исправлено

        if (!nameElement || !priceElement || !imgElement) {
            console.error("Ошибка: не найдены необходимые элементы товара.");
            return;
        }

        const name = nameElement.innerText.trim();
        const priceText = priceElement.innerText.replace(/[^\d.]/g, '');
        const price = parseFloat(priceText);
        const imgSrc = imgElement.src;

        if (isNaN(price)) {
            console.error("Ошибка: цена товара не распарсилась корректно", priceText);
            return;
        }

        addToCart(name, price, imgSrc);
    });
});

/*===== Добавление товара из секции Home =====*/
const homeButton = document.querySelector('.home__button');
if (homeButton) {
    homeButton.addEventListener('click', () => {
        const name = "B720 Watch";
        const price = 1245;
        const imgSrc = "img/home.png"; // Используем изображение из home секции

        addToCart(name, price, imgSrc);
    });
}

/*===== Функция добавления в корзину =====*/
function addToCart(name, price, imgSrc) {
    let existingItem = cartItems.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ name, price, quantity: 1, imgSrc });
    }

    updateCart();
}

/*===== Обновление корзины =====*/
function updateCart() {
    cartContainer.innerHTML = ''; // Очищаем контейнер
    let totalItems = 0;
    let totalPrice = 0;

    cartItems.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        const cartCard = document.createElement('article');
        cartCard.classList.add('cart__card');
        cartCard.innerHTML = `
            <div class="cart__box">
                <img src="${item.imgSrc}" class="cart__img">
            </div>
            <div class="cart__details">
                <h3 class="cart__title">${item.name}</h3>
                <span class="cart__price">$${(item.price * item.quantity).toFixed(2)}</span>
                <div class="cart__amount">
                    <div class="cart__amount-content">
                        <button class="cart__amount-box decrease" data-name="${item.name}">-</button>
                        <span class="cart__amount-number">${item.quantity}</span>
                        <button class="cart__amount-box increase" data-name="${item.name}">+</button>
                    </div>
                    <i class="bx bx-trash-alt cart__amount-trash" data-name="${item.name}"></i>
                </div>
            </div>
        `;

        cartContainer.appendChild(cartCard);
    });

    cartPricesItems.innerText = `${totalItems} items`;
    cartPricesTotal.innerText = `$${totalPrice.toFixed(2)}`;

    if (cartItems.length === 0) {
        cartPricesItems.innerText = "0 items";
        cartPricesTotal.innerText = "$0.00";
    }

    document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = e.target.dataset.name;
            cartItems.find(item => item.name === name).quantity++;
            updateCart();
        });
    });

    document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = e.target.dataset.name;
            const item = cartItems.find(item => item.name === name);
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                cartItems = cartItems.filter(i => i.name !== name);
            }
            updateCart();
        });
    });

    document.querySelectorAll('.cart__amount-trash').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = e.target.dataset.name;
            cartItems = cartItems.filter(item => item.name !== name);
            updateCart();
        });
    });
}

updateCart();

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})