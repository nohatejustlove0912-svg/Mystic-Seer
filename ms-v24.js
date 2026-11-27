const toggle = document.querySelector('.menu-toggle'),
      nav = document.querySelector('#site-nav');

if (toggle && nav) {
    toggle.onclick = () => {
        const open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(open));
    };

    nav.querySelectorAll('details').forEach(d =>
        d.addEventListener('toggle', () => {
            if (d.open) {
                nav.querySelectorAll('details').forEach(o => {
                    if (o !== d) o.open = false;
                });
            }
        })
    );

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            nav.querySelectorAll('details').forEach(d => d.open = false);
            nav.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

document.addEventListener('click', e => {
    const b = e.target.closest('[data-service]');
    if (b) {
        location.href = 'booking.html?service=' +
            encodeURIComponent(b.dataset.service);
    }
});

// Mystic Seer Privacy Policy Integration

function addPrivacyLink(container) {
    if (!container) return;

    const privacyURL = new URL('privacy.html', document.baseURI);

    const existing = Array.from(
        container.querySelectorAll('a[href]')
    ).some(a => new URL(a.href).pathname === privacyURL.pathname);

    if (existing) return;

    const link = document.createElement('a');
    link.href = 'privacy.html';
    link.textContent = 'Privacy Policy';

    if (location.pathname.endsWith('/privacy.html')) {
        link.setAttribute('aria-current', 'page');
    }

    container.appendChild(link);
}

function integratePrivacyPolicy() {
    document.querySelectorAll('#site-nav details').forEach(details => {
        const summary = details.querySelector('summary');

        if (summary && summary.textContent.trim() === 'Contact') {
            addPrivacyLink(details.querySelector('.dropdown'));
        }
    });

    document.querySelectorAll('.footer-links').forEach(footer => {
        addPrivacyLink(footer);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', integratePrivacyPolicy);
} else {
    integratePrivacyPolicy();
}
