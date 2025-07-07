// Mobile App Configuration and PWA Setup
class MobileApp {
    constructor() {
        this.isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.init();
    }

    init() {
        this.setupPWA();
        this.setupMobileUI();
        this.setupTouchGestures();
        this.setupOfflineSupport();
        this.registerServiceWorker();
    }

    setupPWA() {
        // Create manifest.json dynamically
        const manifest = {
            name: "Noapara RS Work Management System",
            short_name: "Noapara RS",
            description: "Railway Station Work Management System for Noapara RS",
            start_url: "/",
            display: "standalone",
            background_color: "#40E0D0",
            theme_color: "#40E0D0",
            orientation: "portrait-primary",
            icons: [
                {
                    src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDE5MiAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxOTIiIGhlaWdodD0iMTkyIiByeD0iMjQiIGZpbGw9IiM0MEUwRDAiLz4KPHN2ZyB4PSI0OCIgeT0iNDgiIHdpZHRoPSI5NiIgaGVpZ2h0PSI5NiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0yMSA2SDNjLTEuMSAwLTIgLjktMiAydjhIMXYyaDJjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMlYxOGgydi0ySDIxVjZ6TTMgOGgxOHY2SDN6Ii8+CjxjaXJjbGUgY3g9IjcuNSIgY3k9IjExIiByPSIxLjUiLz4KPGNpcmNsZSBjeD0iMTYuNSIgY3k9IjExIiByPSIxLjUiLz4KPC9zdmc+Cjwvc3ZnPg==",
                    sizes: "192x192",
                    type: "image/svg+xml"
                },
                {
                    src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiByeD0iNjQiIGZpbGw9IiM0MEUwRDAiLz4KPHN2ZyB4PSIxMjgiIHk9IjEyOCIgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMjEgNkgzYy0xLjEgMC0yIC45LTIgMnY4SDF2MmgyYzAgMS4xLjkgMiAyIDJoMTRjMS4xIDAgMi0uOSAyLTJWMThoMnYtMkgyMVY2ek0zIDhoMTh2NkgzeiIvPgo8Y2lyY2xlIGN4PSI3LjUiIGN5PSIxMSIgcj0iMS41Ii8+CjxjaXJjbGUgY3g9IjE2LjUiIGN5PSIxMSIgcj0iMS41Ii8+Cjwvc3ZnPgo8L3N2Zz4=",
                    sizes: "512x512",
                    type: "image/svg+xml"
                }
            ],
            categories: ["productivity", "business", "utilities"],
            screenshots: [
                {
                    src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjU2OCIgdmlld0JveD0iMCAwIDMyMCA1NjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iNTY4IiBmaWxsPSIjNDBFMEQwIi8+Cjx0ZXh0IHg9IjE2MCIgeT0iMjg0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsIj5Ob2FwYXJhIFJTPC90ZXh0Pgo8L3N2Zz4=",
                    sizes: "320x568",
                    type: "image/svg+xml",
                    form_factor: "narrow"
                }
            ]
        };

        const manifestBlob = new Blob([JSON.stringify(manifest)], { type: 'application/json' });
        const manifestURL = URL.createObjectURL(manifestBlob);
        
        const link = document.createElement('link');
        link.rel = 'manifest';
        link.href = manifestURL;
        document.head.appendChild(link);

        // Add meta tags for mobile
        this.addMetaTags();
    }

    addMetaTags() {
        const metaTags = [
            { name: 'mobile-web-app-capable', content: 'yes' },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
            { name: 'apple-mobile-web-app-title', content: 'Noapara RS' },
            { name: 'application-name', content: 'Noapara RS' },
            { name: 'msapplication-TileColor', content: '#40E0D0' },
            { name: 'theme-color', content: '#40E0D0' }
        ];

        metaTags.forEach(tag => {
            const meta = document.createElement('meta');
            meta.name = tag.name;
            meta.content = tag.content;
            document.head.appendChild(meta);
        });
    }

    setupMobileUI() {
        if (this.isMobile) {
            document.body.classList.add('mobile-device');
            
            // Add mobile-specific styles
            const mobileStyles = document.createElement('style');
            mobileStyles.textContent = `
                .mobile-device .sidebar {
                    transform: translateX(-100%);
                    transition: transform 0.3s ease;
                    position: fixed;
                    z-index: 1000;
                    height: 100vh;
                }
                
                .mobile-device .sidebar.open {
                    transform: translateX(0);
                }
                
                .mobile-device .main-content {
                    margin-left: 0;
                    width: 100%;
                }
                
                .mobile-device .header {
                    position: relative;
                }
                
                .mobile-menu-toggle {
                    display: block;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 0.5rem;
                }
                
                .mobile-overlay {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                    z-index: 999;
                }
                
                .mobile-overlay.active {
                    display: block;
                }
                
                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .jobs-grid,
                    .staff-sections,
                    .compliance-grid,
                    .reports-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .modal-content {
                        width: 95%;
                        max-height: 95vh;
                    }
                    
                    .form-row {
                        flex-direction: column;
                    }
                }
            `;
            document.head.appendChild(mobileStyles);
            
            this.addMobileMenuToggle();
        }
    }

    addMobileMenuToggle() {
        const header = document.querySelector('.header-content');
        const menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        
        header.insertBefore(menuToggle, header.firstChild);
        
        // Add overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-overlay';
        document.body.appendChild(overlay);
        
        // Toggle menu
        menuToggle.addEventListener('click', () => {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        });
        
        // Close menu when clicking overlay
        overlay.addEventListener('click', () => {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });
    }

    setupTouchGestures() {
        let startX, startY, currentX, currentY;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;
            
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
            
            const diffX = startX - currentX;
            const diffY = startY - currentY;
            
            // Swipe right to open menu (mobile)
            if (this.isMobile && diffX < -50 && Math.abs(diffY) < 100) {
                const sidebar = document.querySelector('.sidebar');
                const overlay = document.querySelector('.mobile-overlay');
                if (sidebar && !sidebar.classList.contains('open')) {
                    sidebar.classList.add('open');
                    overlay.classList.add('active');
                }
            }
            
            // Swipe left to close menu (mobile)
            if (this.isMobile && diffX > 50 && Math.abs(diffY) < 100) {
                const sidebar = document.querySelector('.sidebar');
                const overlay = document.querySelector('.mobile-overlay');
                if (sidebar && sidebar.classList.contains('open')) {
                    sidebar.classList.remove('open');
                    overlay.classList.remove('active');
                }
            }
        });
        
        document.addEventListener('touchend', () => {
            startX = null;
            startY = null;
        });
    }

    setupOfflineSupport() {
        // Cache essential data
        this.cacheData();
        
        // Handle online/offline status
        window.addEventListener('online', () => {
            showNotification('Connection restored', 'success');
            this.syncOfflineData();
        });
        
        window.addEventListener('offline', () => {
            showNotification('Working offline', 'warning');
        });
    }

    cacheData() {
        // Cache staff data
        const staffData = localStorage.getItem('noapara_staff_database');
        if (staffData) {
            localStorage.setItem('noapara_staff_database_backup', staffData);
        }
        
        // Cache app state
        const appState = {
            lastSync: new Date().toISOString(),
            version: '1.0.0'
        };
        localStorage.setItem('noapara_app_state', JSON.stringify(appState));
    }

    syncOfflineData() {
        // In a real app, this would sync with a backend server
        console.log('Syncing offline data...');
        
        // Simulate sync
        setTimeout(() => {
            showNotification('Data synchronized', 'success');
        }, 2000);
    }

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            // Create service worker content
            const swContent = `
                const CACHE_NAME = 'noapara-rs-v1';
                const urlsToCache = [
                    '/',
                    '/index.html',
                    '/styles.css',
                    '/script.js',
                    '/staff-database.js',
                    '/staff-management.js',
                    '/mobile-app.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
                ];

                self.addEventListener('install', (event) => {
                    event.waitUntil(
                        caches.open(CACHE_NAME)
                            .then((cache) => cache.addAll(urlsToCache))
                    );
                });

                self.addEventListener('fetch', (event) => {
                    event.respondWith(
                        caches.match(event.request)
                            .then((response) => {
                                if (response) {
                                    return response;
                                }
                                return fetch(event.request);
                            })
                    );
                });
            `;

            const swBlob = new Blob([swContent], { type: 'application/javascript' });
            const swURL = URL.createObjectURL(swBlob);

            navigator.serviceWorker.register(swURL)
                .then((registration) => {
                    console.log('ServiceWorker registration successful');
                })
                .catch((error) => {
                    console.log('ServiceWorker registration failed');
                });
        }
    }

    // Install prompt for PWA
    setupInstallPrompt() {
        let deferredPrompt;

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            // Show install button
            this.showInstallButton(deferredPrompt);
        });

        window.addEventListener('appinstalled', () => {
            showNotification('App installed successfully!', 'success');
            deferredPrompt = null;
        });
    }

    showInstallButton(deferredPrompt) {
        const installButton = document.createElement('button');
        installButton.className = 'btn btn-primary install-app-btn';
        installButton.innerHTML = '<i class="fas fa-download"></i> Install App';
        installButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            border-radius: 50px;
            padding: 12px 20px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;

        installButton.addEventListener('click', () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                }
                deferredPrompt = null;
                installButton.remove();
            });
        });

        document.body.appendChild(installButton);

        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (installButton.parentNode) {
                installButton.remove();
            }
        }, 10000);
    }

    // Generate APK/IPA build instructions
    generateMobileBuildInstructions() {
        const instructions = {
            android: {
                framework: "Capacitor",
                steps: [
                    "npm install @capacitor/core @capacitor/cli",
                    "npm install @capacitor/android",
                    "npx cap init",
                    "npx cap add android",
                    "npx cap copy",
                    "npx cap open android"
                ],
                requirements: [
                    "Android Studio",
                    "Java Development Kit (JDK) 8+",
                    "Android SDK"
                ]
            },
            ios: {
                framework: "Capacitor",
                steps: [
                    "npm install @capacitor/core @capacitor/cli",
                    "npm install @capacitor/ios",
                    "npx cap init",
                    "npx cap add ios",
                    "npx cap copy",
                    "npx cap open ios"
                ],
                requirements: [
                    "Xcode 12+",
                    "macOS",
                    "iOS Simulator or physical iOS device"
                ]
            }
        };

        return instructions;
    }
}

// Initialize mobile app
document.addEventListener('DOMContentLoaded', () => {
    window.mobileApp = new MobileApp();
    
    // Setup install prompt
    window.mobileApp.setupInstallPrompt();
    
    // Add mobile build info to settings
    if (document.getElementById('settings')) {
        const settingsGrid = document.querySelector('.settings-grid');
        const mobileBuildCard = document.createElement('div');
        mobileBuildCard.className = 'setting-card';
        mobileBuildCard.innerHTML = `
            <h3>Mobile App Build</h3>
            <p>Instructions for building Android/iOS apps</p>
            <button class="btn btn-outline" id="show-build-instructions">View Instructions</button>
        `;
        settingsGrid.appendChild(mobileBuildCard);
        
        document.getElementById('show-build-instructions').addEventListener('click', () => {
            const instructions = window.mobileApp.generateMobileBuildInstructions();
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.style.display = 'flex';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Mobile App Build Instructions</h3>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="build-instructions">
                            <h4>Android Build (APK)</h4>
                            <div class="requirements">
                                <strong>Requirements:</strong>
                                <ul>
                                    ${instructions.android.requirements.map(req => `<li>${req}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="steps">
                                <strong>Steps:</strong>
                                <ol>
                                    ${instructions.android.steps.map(step => `<li><code>${step}</code></li>`).join('')}
                                </ol>
                            </div>
                            
                            <h4>iOS Build (IPA)</h4>
                            <div class="requirements">
                                <strong>Requirements:</strong>
                                <ul>
                                    ${instructions.ios.requirements.map(req => `<li>${req}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="steps">
                                <strong>Steps:</strong>
                                <ol>
                                    ${instructions.ios.steps.map(step => `<li><code>${step}</code></li>`).join('')}
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary close-modal">Close</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            modal.querySelector('.close-modal').addEventListener('click', () => {
                modal.remove();
            });
        });
    }
});