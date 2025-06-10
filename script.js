document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
            
            if (nav.style.display === 'block') {
                nav.style.position = 'absolute';
                nav.style.top = '70px';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.background = 'linear-gradient(135deg, #0078a8, #00b7ea)';
                nav.style.padding = '20px';
                nav.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                nav.style.zIndex = '999';
                
                const navUl = nav.querySelector('ul');
                if (navUl) {
                    navUl.style.flexDirection = 'column';
                    
                    const navItems = navUl.querySelectorAll('li');
                    navItems.forEach(item => {
                        item.style.margin = '10px 0';
                        item.style.textAlign = 'center';
                    });
                }
            }
        });
    }
    
    // 滚动效果
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // 如果是移动端，点击菜单项后关闭菜单
                if (window.innerWidth <= 768 && nav.style.display === 'block') {
                    nav.style.display = 'none';
                }
            }
        });
    });
    
    // 滚动时导航栏变化
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        
        if (window.scrollY > 50) {
            header.style.padding = '10px 50px';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '20px 50px';
            header.style.boxShadow = 'none';
        }
        
        // 响应式调整
        if (window.innerWidth <= 768) {
            if (window.scrollY > 50) {
                header.style.padding = '10px 20px';
            } else {
                header.style.padding = '20px';
            }
        }
    });
    
    // 简单动画效果
    const baseItems = document.querySelectorAll('.base-item');
    const valueItems = document.querySelectorAll('.value-item');
    const statItems = document.querySelectorAll('.stat-item');
    const introBoxes = document.querySelectorAll('.company-intro-box');
    
    function animateOnScroll(elements, delay = 0) {
        elements.forEach((item, index) => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, delay * index);
            }
        });
    }
    
    // 初始化元素样式
    function initElements(elements) {
        elements.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    }
    
    // 初始化所有动画元素
    initElements(baseItems);
    initElements(valueItems);
    initElements(statItems);
    initElements(introBoxes);
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        animateOnScroll(baseItems, 100);
        animateOnScroll(valueItems, 150);
        animateOnScroll(statItems, 100);
        animateOnScroll(introBoxes, 150);
    });
    
    // 初始触发一次
    animateOnScroll(baseItems);
    animateOnScroll(valueItems);
    animateOnScroll(statItems);
    animateOnScroll(introBoxes);
    
    // 添加视差滚动效果
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroSection = document.querySelector('.hero-left');
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        }
    });
}); 