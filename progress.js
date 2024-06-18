document.addEventListener('DOMContentLoaded', () => {
    const progressCircles = document.querySelectorAll('.progress-circle');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    function animateProgressCircle(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target.querySelector('.circle');
                const text = entry.target.querySelector('.percentage');
                const progress = entry.target.getAttribute('data-progress');
                const offset = (100 - progress) / 100 * 100;
                circle.style.strokeDashoffset = offset;
                
                let currentPercentage = 0;
                const interval = setInterval(() => {
                    if (currentPercentage <= progress) {
                        text.textContent = `${currentPercentage}%`;
                        currentPercentage++;
                    } else {
                        clearInterval(interval);
                    }
                }, 10); 
                observer.unobserve(entry.target);
            }
        });
    }

    const observer = new IntersectionObserver(animateProgressCircle, observerOptions);

    progressCircles.forEach(circle => {
        observer.observe(circle);
    });
});
