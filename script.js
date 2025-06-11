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
                nav.style.background = 'linear-gradient(135deg, #1e74b8, #0288d1)';
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
            header.style.padding = '15px 50px';
            header.style.boxShadow = 'none';
        }
        
        // 响应式调整
        if (window.innerWidth <= 768) {
            if (window.scrollY > 50) {
                header.style.padding = '10px 20px';
            } else {
                header.style.padding = '15px 20px';
            }
        }
    });
    
    // 数字动画效果
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number, .prod-number');
        
        statNumbers.forEach(numberElement => {
            const finalNumber = parseInt(numberElement.textContent);
            const duration = 2000; // 2秒
            const frameDuration = 1000 / 60; // 60fps
            const totalFrames = Math.round(duration / frameDuration);
            const easeOutQuad = t => t * (2 - t);
            
            let frame = 0;
            const countTo = finalNumber;
            
            const counter = setInterval(() => {
                frame++;
                const progress = easeOutQuad(frame / totalFrames);
                const currentNumber = Math.round(countTo * progress);
                
                numberElement.textContent = currentNumber;
                
                if (frame === totalFrames) {
                    clearInterval(counter);
                    numberElement.textContent = finalNumber;
                }
            }, frameDuration);
        });
    }
    
    // 简单动画效果
    const baseItems = document.querySelectorAll('.base-item');
    const valueItems = document.querySelectorAll('.value-item');
    const statItems = document.querySelectorAll('.stat-item');
    const appCategories = document.querySelectorAll('.app-category');
    const caseItems = document.querySelectorAll('.case-item');
    const featureItems = document.querySelectorAll('.feature-item');
    const productItems = document.querySelectorAll('.product-item');
    const teamStats = document.querySelectorAll('.team-stats .stat-item');
    const productionStats = document.querySelectorAll('.production-stats .production-item');
    
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
    
    // 特殊的数字统计动画
    function animateStatsOnScroll() {
        const statsSection = document.querySelector('.tech-content');
        if (statsSection) {
            const sectionPosition = statsSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (sectionPosition < screenPosition && !statsSection.hasAttribute('data-animated')) {
                statsSection.setAttribute('data-animated', 'true');
                animateNumbers();
            }
        }
    }
    
    // 初始化元素样式
    function initElements(elements) {
        elements.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }
    
    // 初始化所有动画元素
    initElements(baseItems);
    initElements(valueItems);
    initElements(statItems);
    initElements(appCategories);
    initElements(caseItems);
    initElements(featureItems);
    initElements(productItems);
    initElements(teamStats);
    initElements(productionStats);
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        animateOnScroll(baseItems, 100);
        animateOnScroll(valueItems, 150);
        animateOnScroll(statItems, 100);
        animateOnScroll(appCategories, 200);
        animateOnScroll(caseItems, 150);
        animateOnScroll(featureItems, 100);
        animateOnScroll(productItems, 50);
        animateOnScroll(teamStats, 150);
        animateOnScroll(productionStats, 150);
        
        // 数字动画
        animateStatsOnScroll();
    });
    
    // 初始触发一次
    animateOnScroll(baseItems);
    animateOnScroll(valueItems);
    animateOnScroll(statItems);
    animateOnScroll(appCategories);
    animateOnScroll(caseItems);
    animateOnScroll(featureItems);
    animateOnScroll(productItems);
    animateOnScroll(teamStats);
    animateOnScroll(productionStats);
    animateStatsOnScroll();
    
    // 添加页面加载动画
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // 鼠标跟随光点效果
    const createMouseFollower = () => {
        const follower = document.createElement('div');
        follower.style.position = 'fixed';
        follower.style.width = '20px';
        follower.style.height = '20px';
        follower.style.background = 'radial-gradient(circle, rgba(102, 126, 234, 0.8), transparent)';
        follower.style.borderRadius = '50%';
        follower.style.pointerEvents = 'none';
        follower.style.zIndex = '9999';
        follower.style.transition = 'transform 0.1s ease-out';
        document.body.appendChild(follower);
        
        document.addEventListener('mousemove', (e) => {
            follower.style.left = e.clientX - 10 + 'px';
            follower.style.top = e.clientY - 10 + 'px';
        });
    };
    
    createMouseFollower();
    
    // 添加视差滚动效果
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // 渐入动画触发
        const elements = document.querySelectorAll('.stat-item, .base-item, .value-item');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < window.innerHeight * 0.8) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });
    
    // 为卡片添加3D倾斜效果
    const addTiltEffect = (selector) => {
        const cards = document.querySelectorAll(selector);
        cards.forEach(card => {
            card.addEventListener('mouseenter', function(e) {
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                this.addEventListener('mousemove', handleTilt);
                this.addEventListener('mouseleave', removeTilt);
                
                function handleTilt(e) {
                    const mouseX = e.clientX - centerX;
                    const mouseY = e.clientY - centerY;
                    const rotateX = (mouseY / rect.height) * 30;
                    const rotateY = (mouseX / rect.width) * -30;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
                }
                
                function removeTilt() {
                    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
                    card.removeEventListener('mousemove', handleTilt);
                    card.removeEventListener('mouseleave', removeTilt);
                }
            });
        });
    };
    
    // 应用3D效果到各种卡片
    addTiltEffect('.value-item');
    addTiltEffect('.base-item');
    addTiltEffect('.stat-item');
    
    // 为应用领域添加交互效果
    const appItems = document.querySelectorAll('.app-category');
    appItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // 为客户案例添加点击效果
    const cases = document.querySelectorAll('.case-item');
    cases.forEach(caseItem => {
        caseItem.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        
        caseItem.style.cursor = 'pointer';
        caseItem.style.transition = 'all 0.3s ease';
    });
    
    // 添加视差滚动效果
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroPattern = document.querySelector('.hero-pattern');
        
        if (heroPattern) {
            heroPattern.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        }
        
        // 特殊的背景图案动效
        const circles = document.querySelectorAll('.logo-circles');
        circles.forEach(circle => {
            const rect = circle.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                circle.style.transform = `rotate(${scrollPosition * 0.1}deg)`;
            }
        });
    });
    
    // 产品规格表格响应式处理
    const tables = document.querySelectorAll('.specifications-table table');
    tables.forEach(table => {
        // 为小屏幕添加滚动提示
        if (window.innerWidth <= 768) {
            const container = table.parentElement;
            const scrollHint = document.createElement('div');
            scrollHint.textContent = '← 滑动查看更多 →';
            scrollHint.style.cssText = `
                text-align: center;
                font-size: 12px;
                color: #999;
                margin-top: 10px;
                animation: fadeInOut 2s infinite;
            `;
            container.appendChild(scrollHint);
            
            // 添加CSS动画
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeInOut {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
    });
    
    // 生产线流程动画
    const flowSteps = document.querySelectorAll('.step');
    flowSteps.forEach((step, index) => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.zIndex = '10';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '1';
        });
    });
    
    // Logo圆圈旋转动画
    const logoCircles = document.querySelectorAll('.logo-circles');
    logoCircles.forEach(circle => {
        let rotation = 0;
        setInterval(() => {
            rotation += 1;
            circle.style.transform = `rotate(${rotation}deg)`;
        }, 100);
    });
}); 