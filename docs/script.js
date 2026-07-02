document.addEventListener('DOMContentLoaded', () => {
    const toc = document.getElementById('toc');
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const id = section.id;
        const title = section.querySelector('h2').innerText;
        
        const link = document.createElement('a');
        link.href = `#${id}`;
        link.innerText = title;
        link.dataset.target = id;
        
        // Add click listener for smooth scroll
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById(id).scrollIntoView({
                behavior: 'smooth'
            });
            // Update URL hash without jumping
            history.pushState(null, null, `#${id}`);
        });
        
        toc.appendChild(link);
    });

    // Intersection Observer for active TOC links
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.toc a').forEach(a => {
                    a.classList.toggle('active', a.dataset.target === entry.target.id);
                });
            }
        });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(section => observer.observe(section));
});
