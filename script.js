// DOM元素选择
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');
const featureItems = document.querySelectorAll('.feature-item');
const serviceItems = document.querySelectorAll('.service-item');
const contactForm = document.querySelector('form');

// 汉堡菜单切换
 hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// 导航链接点击事件
 document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// 导航栏滚动效果
 window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // 滚动动画
    featureItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (itemTop < windowHeight - 50) {
            item.classList.add('fade-in');
        }
    });

    serviceItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (itemTop < windowHeight - 50) {
            item.classList.add('fade-in');
        }
    });
});

// 表单提交处理
 if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 获取表单数据
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // 简单验证
        if (name && email && message) {
            // 模拟表单提交
            console.log('表单提交成功!');
            console.log('姓名:', name);
            console.log('邮箱:', email);
            console.log('留言:', message);

            // 显示成功消息
            alert('提交成功! 我们会尽快联系您。');

            // 重置表单
            contactForm.reset();
        } else {
            alert('请填写所有必填字段!');
        }
    });
}

// 初始化页面
 document.addEventListener('DOMContentLoaded', () => {
    // 检查初始滚动位置
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    // 初始动画
    setTimeout(() => {
        featureItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('fade-in');
            }, index * 200);
        });

        setTimeout(() => {
            serviceItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('fade-in');
                }, index * 200);
            });
        }, 500);
    }, 300);

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// 图片懒加载
 document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = [].slice.call(document.querySelectorAll("img"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src || lazyImage.src;
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});

// 回到顶部按钮
 const backToTopButton = document.createElement('button');
 backToTopButton.classList.add('back-to-top');
 backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
 backToTopButton.style.position = 'fixed';
 backToTopButton.style.bottom = '30px';
 backToTopButton.style.right = '30px';
 backToTopButton.style.width = '50px';
 backToTopButton.style.height = '50px';
 backToTopButton.style.borderRadius = '50%';
 backToTopButton.style.backgroundColor = 'var(--primary-color)';
 backToTopButton.style.color = 'white';
 backToTopButton.style.border = 'none';
 backToTopButton.style.cursor = 'pointer';
 backToTopButton.style.display = 'none';
 backToTopButton.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
 backToTopButton.style.zIndex = '999';
 backToTopButton.style.transition = 'all 0.3s ease';

 document.body.appendChild(backToTopButton);

 window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'flex';
        backToTopButton.style.alignItems = 'center';
        backToTopButton.style.justifyContent = 'center';
    } else {
        backToTopButton.style.display = 'none';
    }
});

 backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});