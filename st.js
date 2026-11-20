const topBtn = document.getElementById('TopBtn');

if (topBtn) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            topBtn.style.display = 'block';
        } else {
            topBtn.style.display = 'none';
        }
    });

    topBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

const fadeBlocks = document.querySelectorAll('.article-content p, .article-content h2, .article-content h3, .article-content blockquote');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeBlocks.forEach(block => {
    block.style.opacity = '0';
    block.style.transform = 'translateY(20px)';
    block.style.transition = 'all 0.5s ease';
    observer.observe(block);
});