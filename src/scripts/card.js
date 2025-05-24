document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.querySelector('.hover-effect').style.setProperty('--x', `${x}%`);
            card.querySelector('.hover-effect').style.setProperty('--y', `${y}%`);
        });
    });