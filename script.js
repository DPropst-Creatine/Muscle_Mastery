
// Muscle Mastery JavaScript
// Handles passcode protection, dark mode, and interactive features

class MuscleMastery {
    constructor() {
        this.passcode = 'ENTER42';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkAccess();
        this.setupDarkMode();
        this.setupAccessibility();
    }

    setupEventListeners() {
        // Passcode modal triggers
        const beginBtns = document.querySelectorAll('#beginCourseBtn, #beginCourseBtn2, #unlockCourseBtn, #accessCourseBtn');
        beginBtns.forEach(btn => {
            btn?.addEventListener('click', () => this.showPasscodeModal());
        });

        // Passcode modal controls
        const submitBtn = document.getElementById('submitPasscode');
        const cancelBtn = document.getElementById('cancelPasscode');
        const passcodeInput = document.getElementById('passcodeInput');
        const modal = document.getElementById('passcodeModal');

        submitBtn?.addEventListener('click', () => this.verifyPasscode());
        cancelBtn?.addEventListener('click', () => this.hidePasscodeModal());
        
        // Enter key support
        passcodeInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.verifyPasscode();
            }
        });

        // Modal backdrop click
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hidePasscodeModal();
            }
        });

        // Dark mode toggle
        const darkModeToggle = document.getElementById('darkModeToggle');
        darkModeToggle?.addEventListener('click', () => this.toggleDarkMode());

        // Smooth scrolling for anchor links
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

        // Mobile menu toggle (if needed)
        this.setupMobileMenu();
    }

    showPasscodeModal() {
        const modal = document.getElementById('passcodeModal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Focus on input for accessibility
            const input = document.getElementById('passcodeInput');
            if (input) {
                setTimeout(() => input.focus(), 100);
            }
        }
    }

    hidePasscodeModal() {
        const modal = document.getElementById('passcodeModal');
        const error = document.getElementById('passcodeError');
        const input = document.getElementById('passcodeInput');
        
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
        
        if (error) {
            error.classList.add('hidden');
        }
        
        if (input) {
            input.value = '';
        }
    }

    verifyPasscode() {
        const input = document.getElementById('passcodeInput');
        const error = document.getElementById('passcodeError');
        
        if (!input || !error) return;
        
        const enteredCode = input.value.trim();
        
        if (enteredCode === this.passcode) {
            // Store access in localStorage
            localStorage.setItem('muscleMasteryAccess', 'true');
            localStorage.setItem('muscleMasteryAccessTime', Date.now().toString());
            
            this.hidePasscodeModal();
            
            // Redirect to first lesson
            window.location.href = 'lessons/lesson-1.html';
        } else {
            error.classList.remove('hidden');
            input.value = '';
            input.focus();
            
            // Hide error after 3 seconds
            setTimeout(() => {
                error.classList.add('hidden');
            }, 3000);
        }
    }

    checkAccess() {
        const hasAccess = localStorage.getItem('muscleMasteryAccess');
        const accessTime = localStorage.getItem('muscleMasteryAccessTime');
        
        // Access expires after 30 days
        const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
        const now = Date.now();
        
        if (hasAccess && accessTime && (now - parseInt(accessTime)) < thirtyDaysMs) {
            // User has valid access
            this.enableLessonLinks();
        } else {
            // Clear expired access
            localStorage.removeItem('muscleMasteryAccess');
            localStorage.removeItem('muscleMasteryAccessTime');
            this.disableLessonLinks();
        }
    }

    enableLessonLinks() {
        // Enable direct lesson navigation if user has access
        const lessonLinks = document.querySelectorAll('a[href^="lessons/"]');
        lessonLinks.forEach(link => {
            link.style.pointerEvents = 'auto';
            link.style.opacity = '1';
        });
    }

    disableLessonLinks() {
        // Disable direct lesson access without passcode
        const lessonLinks = document.querySelectorAll('a[href^="lessons/"]');
        lessonLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showPasscodeModal();
            });
        });
    }

    setupDarkMode() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (!darkModeToggle) return;

        // Check for saved preference or default to light mode
        const savedMode = localStorage.getItem('darkMode');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedMode === 'true' || (!savedMode && systemPrefersDark)) {
            this.enableDarkMode();
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('darkMode')) {
                if (e.matches) {
                    this.enableDarkMode();
                } else {
                    this.disableDarkMode();
                }
            }
        });
    }

    toggleDarkMode() {
        if (document.documentElement.classList.contains('dark')) {
            this.disableDarkMode();
        } else {
            this.enableDarkMode();
        }
    }

    enableDarkMode() {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
        
        // Update toggle icon
        const toggle = document.getElementById('darkModeToggle');
        if (toggle) {
            toggle.innerHTML = `
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
                </svg>
            `;
        }
    }

    disableDarkMode() {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
        
        // Update toggle icon
        const toggle = document.getElementById('darkModeToggle');
        if (toggle) {
            toggle.innerHTML = `
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
            `;
        }
    }

    setupAccessibility() {
        // Keyboard navigation support
        document.addEventListener('keydown', (e) => {
            // ESC key closes modal
            if (e.key === 'Escape') {
                const modal = document.getElementById('passcodeModal');
                if (modal && !modal.classList.contains('hidden')) {
                    this.hidePasscodeModal();
                }
            }
        });

        // Focus management for modal
        const modal = document.getElementById('passcodeModal');
        if (modal) {
            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    const focusableElements = modal.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];

                    if (e.shiftKey && document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            });
        }

        // Announce page changes to screen readers
        this.announcePageChange();
    }

    announcePageChange() {
        const title = document.title;
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Page loaded: ${title}`;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    setupMobileMenu() {
        // Mobile menu toggle functionality
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                const isExpanded = mobileMenu.classList.contains('active');
                mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuBtn?.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn?.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Analytics and tracking (placeholder)
    trackEvent(eventName, eventData = {}) {
        // Implementation would go here for analytics
        console.log(`Event: ${eventName}`, eventData);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new MuscleMastery();
});

// Add loading state management
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden
        console.log('Page hidden');
    } else {
        // Page is visible
        console.log('Page visible');
    }
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker would be registered here
        console.log('Service Worker support detected');
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Error tracking would go here
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // Error tracking would go here
});
