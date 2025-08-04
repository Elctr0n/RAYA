// Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Email signup functionality
        const form = document.getElementById('supportForm');
        const button = form.querySelector('.cta-button');

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const data = new FormData(form);
            
            // Add loading state
            button.innerHTML = 'Submitting...';
            button.disabled = true;
            
            fetch(form.action, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    button.innerHTML = '✓ Thank you!';
                    button.style.background = '#22c55e';
                    button.style.color = '#fff';
                    form.reset();
                    setTimeout(() => {
                        button.innerHTML = 'Support The Work';
                        button.style.background = '#fafafa';
                        button.style.color = '#000';
                        button.disabled = false;
                    }, 3000);
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            alert(data["errors"].map(error => error["message"]).join(", "))
                        } else {
                            alert('Oops! There was a problem submitting your form');
                        }
                        button.innerHTML = 'Support The Work';
                        button.disabled = false;
                    })
                }
            }).catch(error => {
                alert('Oops! There was a problem submitting your form');
                button.innerHTML = 'Support The Work';
                button.disabled = false;
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
