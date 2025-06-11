document.addEventListener('DOMContentLoaded', function() {
    // 现代化导航栏滚动效果
    function updateHeaderOnScroll() {
        const header = document.querySelector('.header');
        
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // 移动端菜单切换
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            const isVisible = nav.style.display === 'block';
            
            if (isVisible) {
                nav.style.display = 'none';
            } else {
                nav.style.display = 'block';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.background = 'rgba(255, 255, 255, 0.98)';
                nav.style.backdropFilter = 'blur(20px)';
                nav.style.padding = '2rem';
                nav.style.boxShadow = '0 10px 25px -5px rgb(0 0 0 / 0.1)';
                nav.style.zIndex = '999';
                nav.style.borderRadius = '0 0 1rem 1rem';
                nav.style.border = '1px solid var(--border-light)';
                nav.style.borderTop = 'none';
                
                const navUl = nav.querySelector('ul');
                if (navUl) {
                    navUl.style.flexDirection = 'column';
                    
                    const navItems = navUl.querySelectorAll('li');
                    navItems.forEach((item, index) => {
                        item.style.margin = '0.5rem 0';
                        item.style.textAlign = 'center';
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        item.style.animation = `fadeInUp 0.3s ease forwards ${index * 0.1}s`;
                    });
                }
            }
        });
    }
    
    // 现代化平滑滚动
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // 移动端菜单关闭
                if (window.innerWidth <= 768 && nav.style.display === 'block') {
                    nav.style.display = 'none';
                }
            }
        });
    });

    // 现代化数字动画效果
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number, .prod-number');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    entry.target.setAttribute('data-animated', 'true');
                    animateNumber(entry.target);
                }
            });
        }, observerOptions);

        statNumbers.forEach(numberElement => {
            observer.observe(numberElement);
        });
    }

    function animateNumber(element) {
        const finalNumber = parseInt(element.textContent);
        const duration = 2000;
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(duration / frameDuration);
        const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
        
        let frame = 0;
        
        const counter = setInterval(() => {
            frame++;
            const progress = easeOutCubic(frame / totalFrames);
            const currentNumber = Math.round(finalNumber * progress);
            
            element.textContent = currentNumber;
            
            if (frame === totalFrames) {
                clearInterval(counter);
                element.textContent = finalNumber;
            }
        }, frameDuration);
    }

    // 现代化Intersection Observer动画
    function setupScrollAnimations() {
        const animatedElements = document.querySelectorAll(`
            .base-item, .value-item, .stat-item, .app-category, 
            .case-item, .feature-item, .product-item, .certificate-item,
            .material-item, .step, .production-item
        `);

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(element => {
            element.classList.add('animate-ready');
            observer.observe(element);
        });
    }

    // 视差滚动效果
    function setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-pattern, .leader-badge');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translate3d(0, ${rate}px, 0)`;
            });
        });
    }

    // 卡片悬停效果增强
    function enhanceCardEffects() {
        const cards = document.querySelectorAll(`
            .app-category, .case-item, .base-item, .value-item, 
            .stat-item, .production-item, .certificate-item, .material-item
        `);

        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // 表格响应式处理
    function handleResponsiveTables() {
        const tables = document.querySelectorAll('.specifications-table');
        
        tables.forEach(table => {
            const wrapper = table.parentElement;
            if (wrapper) {
                wrapper.style.position = 'relative';
                
                if (table.scrollWidth > wrapper.clientWidth) {
                    wrapper.classList.add('table-scrollable');
                }
            }
        });
    }

    // 现代化加载动画
    function addLoadingAnimations() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        // 延迟显示sections
        setTimeout(() => {
            sections.forEach((section, index) => {
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }, 300);
    }

    // 添加CSS动画关键帧
    function addAnimationKeyframes() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .animate-ready {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
                           transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .animate-in {
                opacity: 1;
                transform: translateY(0);
            }

            .table-scrollable::after {
                content: '→';
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                background: var(--primary-color);
                color: white;
                padding: 0.5rem;
                border-radius: 50%;
                font-size: 0.75rem;
                opacity: 0.7;
                pointer-events: none;
            }

            .nav ul li a {
                position: relative;
                overflow: hidden;
            }

            .nav ul li a::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                transition: left 0.5s ease;
            }

            .nav ul li a:hover::before {
                left: 100%;
            }
        `;
        document.head.appendChild(style);
    }

    // 初始化所有功能
    function initialize() {
        addAnimationKeyframes();
        addLoadingAnimations();
        setupScrollAnimations();
        setupParallaxEffects();
        enhanceCardEffects();
        handleResponsiveTables();
        animateNumbers();
        
        // 滚动事件监听
        window.addEventListener('scroll', updateHeaderOnScroll);
        
        // 窗口大小变化处理
        window.addEventListener('resize', () => {
            handleResponsiveTables();
            
            // 移动端菜单重置
            if (window.innerWidth > 768) {
                nav.style.display = '';
                nav.style.position = '';
                nav.style.top = '';
                nav.style.left = '';
                nav.style.width = '';
                nav.style.background = '';
                nav.style.padding = '';
                nav.style.boxShadow = '';
                nav.style.zIndex = '';
                nav.style.borderRadius = '';
                nav.style.border = '';
                
                const navUl = nav.querySelector('ul');
                if (navUl) {
                    navUl.style.flexDirection = '';
                    const navItems = navUl.querySelectorAll('li');
                    navItems.forEach(item => {
                        item.style.margin = '';
                        item.style.textAlign = '';
                        item.style.opacity = '';
                        item.style.transform = '';
                        item.style.animation = '';
                    });
                }
            }
        });
    }

    // 启动应用
    initialize();
}); 