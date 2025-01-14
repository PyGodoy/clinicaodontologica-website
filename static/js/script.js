// Typing animation for hero section
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.element.innerHTML = `Recupere sua ${this.txt}`;

        // Initial Type Speed
        let typeSpeed = 200;

        if (this.isDeleting) {
            typeSpeed /= 2; // Faster when deleting
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Button hover animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typing animation
    const txtElement = document.querySelector('.hero-section h1');
    const words = ['autoestima', 'confiança', 'alegria'];
    new TypeWriter(txtElement, words);

    // Button hover animations
    const buttons = document.querySelectorAll('a, button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'all 0.3s ease';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Before/After slider functionality
    const sliderButtons = document.querySelectorAll('.before-after-slider button');
    const sliderImage = document.querySelector('.before-after-slider img');
    let currentImageIndex = 0;
    const images = [
        'static/images/exterior.jpg',
        'static/images/interior1.png',
        'static/images/interior2.jpg',
        'static/images/interior3.jpg'
    ];

    sliderButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (index === 0) { // Previous button
                currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            } else { // Next button
                currentImageIndex = (currentImageIndex + 1) % images.length;
            }
            sliderImage.style.opacity = '0';
            setTimeout(() => {
                sliderImage.src = images[currentImageIndex];
                sliderImage.style.opacity = '1';
            }, 300);
        });
    });

    // Testimonial cards hover effect
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Mobile menu toggle
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.classList.add('md:hidden', 'text-gray-800', 'p-2');
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    const nav = document.querySelector('nav .container');
    nav.appendChild(mobileMenuButton);
    
    const menuItems = document.querySelector('nav .hidden');
    
    mobileMenuButton.addEventListener('click', () => {
        menuItems.classList.toggle('hidden');
        menuItems.classList.toggle('flex');
        menuItems.classList.toggle('flex-col');
        menuItems.classList.toggle('absolute');
        menuItems.classList.toggle('top-full');
        menuItems.classList.toggle('left-0');
        menuItems.classList.toggle('right-0');
        menuItems.classList.toggle('bg-white');
        menuItems.classList.toggle('p-4');
    });
});

// Add necessary styles
const style = document.createElement('style');
style.textContent = `
    .before-after-slider img {
        transition: opacity 0.3s ease;
    }
    
    .testimonial-card, button, a {
        transition: all 0.3s ease;
    }
    
    @media (max-width: 768px) {
        nav .hidden.flex {
            display: flex;
        }
    }
`;
document.head.appendChild(style);

// BOTÃO DO MOBILE
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    function toggleMenu() {
        mobileMenu.classList.toggle('hidden');
        body.style.overflow = mobileMenu.classList.contains('hidden') ? '' : 'hidden';
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);

    // Fechar menu ao clicar em um link
    const mobileLinks = mobileMenu.querySelectorAll('.nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
});

// Espera o DOM carregar completamente
// Função para inicializar o slider
function initializeSlider() {
    const slides = document.querySelectorAll('.slides-container .slide');
    const indicators = document.querySelectorAll('.indicators div');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let isTransitioning = false;

    // Função para mostrar um slide específico
    function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        // Esconde todos os slides
        slides.forEach(slide => {
            slide.style.opacity = '0';
            slide.style.zIndex = '0';
        });

        // Remove a classe ativa de todos os indicadores
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
            indicator.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        });

        // Mostra o slide atual
        slides[index].style.opacity = '1';
        slides[index].style.zIndex = '1';
        
        // Atualiza o indicador ativo
        indicators[index].classList.add('active');
        indicators[index].style.backgroundColor = '#ffffff';

        currentSlide = index;

        // Permite a próxima transição após 500ms
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    // Função para ir para o próximo slide
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    // Função para ir para o slide anterior
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    // Adiciona eventos aos botões
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Adiciona eventos aos indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showSlide(index));
    });

    // Mostra o primeiro slide
    showSlide(0);

    // Inicia o autoplay
    let autoplayInterval = setInterval(nextSlide, 5000);

    // Pausa o autoplay quando o mouse está sobre o slider
    const sliderContainer = document.querySelector('.before-after-slider');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(nextSlide, 5000);
    });
}

// Inicializa o slider quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initializeSlider);

// CARROSSEL DE IMAGENS
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.dental-carousel');
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.slider-dot');
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');

    let currentIndex = 0;
    const slideCount = slides.length;

    function updateCarousel() {
        // Atualiza a posição do track
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Atualiza os dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
    }

    // Event Listeners
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    // Auto play (opcional)
    setInterval(nextSlide, 5000);
});

// VIDEO PRO YT

document.addEventListener('DOMContentLoaded', function() {
    const videoModal = document.getElementById('videoModal');
    const playVideoBtn = document.getElementById('playVideoBtn');
    const closeVideoModal = document.getElementById('closeVideoModal');
    const videoIframe = document.getElementById('videoIframe');
    const videoUrl = 'https://www.youtube.com/embed/XdEmAh2cVrE?autoplay=1';

    if (playVideoBtn) {
        playVideoBtn.addEventListener('click', function() {
            videoModal.classList.remove('hidden');
            videoIframe.setAttribute('src', videoUrl);
        });
    }

    if (closeVideoModal) {
        closeVideoModal.addEventListener('click', function() {
            videoModal.classList.add('hidden');
            videoIframe.setAttribute('src', '');
        });
    }

    // Fechar modal ao clicar fora do vídeo
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            videoModal.classList.add('hidden');
            videoIframe.setAttribute('src', '');
        }
    });
});