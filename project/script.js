// Noapara RS Work Management System - Enhanced JavaScript

// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const contentSections = document.querySelectorAll('.content-section');
const devModeToggle = document.getElementById('dev-mode-toggle');
const toggleModeBtn = document.getElementById('toggle-mode');
const devBanner = document.getElementById('dev-banner');

// Job Management Elements
const jobModal = document.getElementById('job-modal');
const createJobBtn = document.getElementById('create-job');
const closeModalBtns = document.querySelectorAll('.close-modal');
const jobForm = document.getElementById('job-form');

// Current user role (this would come from authentication in a real app)
const currentUser = {
    name: 'Subhankar Dey',
    role: 'Junior Engineer',
    permissions: ['create_job', 'view_jobs', 'manage_staff', 'submit_compliance']
};

// Navigation functionality
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all nav items and sections
        navItems.forEach(nav => nav.classList.remove('active'));
        contentSections.forEach(section => section.classList.remove('active'));
        
        // Add active class to clicked nav item
        item.classList.add('active');
        
        // Show corresponding section
        const sectionId = item.getAttribute('data-section');
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Load section-specific data
            loadSectionData(sectionId);
        }
    });
});

// Load section-specific data
function loadSectionData(sectionId) {
    switch(sectionId) {
        case 'dashboard':
            updateDashboardStats();
            break;
        case 'jobs':
            loadJobsData();
            break;
        case 'staff':
            loadStaffData();
            break;
        case 'compliance':
            loadComplianceData();
            break;
        case 'reports':
            loadReportsData();
            break;
        case 'settings':
            loadSettingsData();
            break;
    }
}

// Update dashboard statistics
function updateDashboardStats() {
    // This would fetch real data from a backend
    const stats = {
        activeJobs: Math.floor(Math.random() * 30) + 20,
        totalStaff: 156,
        completedJobs: Math.floor(Math.random() * 25) + 15,
        pendingReviews: Math.floor(Math.random() * 10) + 3
    };
    
    // Update stat cards with animation
    animateStatUpdate('.stat-card:nth-child(1) h3', stats.activeJobs);
    animateStatUpdate('.stat-card:nth-child(3) h3', stats.completedJobs);
    animateStatUpdate('.stat-card:nth-child(4) h3', stats.pendingReviews);
}

// Animate stat updates
function animateStatUpdate(selector, newValue) {
    const element = document.querySelector(selector);
    if (element) {
        const currentValue = parseInt(element.textContent);
        const increment = newValue > currentValue ? 1 : -1;
        const duration = 1000;
        const steps = Math.abs(newValue - currentValue);
        const stepDuration = duration / steps;
        
        let current = currentValue;
        const timer = setInterval(() => {
            current += increment;
            element.textContent = current;
            
            if (current === newValue) {
                clearInterval(timer);
            }
        }, stepDuration);
    }
}

// Load jobs data
function loadJobsData() {
    console.log('Loading jobs data...');
    // Here you would fetch jobs from backend
    // For now, we'll use the static data in HTML
}

// Load staff data
function loadStaffData() {
    console.log('Loading staff data...');
    // Here you would fetch staff data from backend
}

// Load compliance data
function loadComplianceData() {
    console.log('Loading compliance data...');
    // Here you would fetch compliance reports from backend
}

// Load reports data
function loadReportsData() {
    console.log('Loading reports data...');
    // Here you would generate reports and charts
}

// Load settings data
function loadSettingsData() {
    console.log('Loading settings data...');
    // Here you would load user-specific settings
}

// Development mode toggle functionality
if (devModeToggle) {
    devModeToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            devBanner.style.display = 'block';
            document.body.classList.add('dev-mode');
            showNotification('Development Mode Activated', 'warning');
        } else {
            devBanner.style.display = 'none';
            document.body.classList.remove('dev-mode');
            showNotification('Live Mode Activated', 'success');
        }
    });
}

// Toggle mode button in banner
if (toggleModeBtn) {
    toggleModeBtn.addEventListener('click', () => {
        const isDevMode = devModeToggle.checked;
        devModeToggle.checked = !isDevMode;
        devModeToggle.dispatchEvent(new Event('change'));
        
        // Update button text
        toggleModeBtn.textContent = isDevMode ? 'Switch to Dev' : 'Switch to Live';
    });
}

// Job Modal functionality
if (createJobBtn) {
    createJobBtn.addEventListener('click', () => {
        if (hasPermission('create_job')) {
            openJobModal();
        } else {
            showNotification('You do not have permission to create jobs', 'error');
        }
    });
}

// Open job creation modal
function openJobModal() {
    jobModal.style.display = 'flex';
    resetJobForm();
    setupJobFormPreview();
}

// Close modal functionality
closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        jobModal.style.display = 'none';
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === jobModal) {
        jobModal.style.display = 'none';
    }
});

// Reset job form
function resetJobForm() {
    if (jobForm) {
        jobForm.reset();
        removeJobPreview();
    }
}

// Setup job form preview
function setupJobFormPreview() {
    const formInputs = jobForm.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('input', updateJobPreview);
        input.addEventListener('change', updateJobPreview);
    });
    
    // Create preview container
    createJobPreviewContainer();
}

// Create job preview container
function createJobPreviewContainer() {
    const existingPreview = document.querySelector('.job-preview');
    if (existingPreview) {
        existingPreview.remove();
    }
    
    const previewContainer = document.createElement('div');
    previewContainer.className = 'job-preview';
    previewContainer.innerHTML = `
        <h4><i class="fas fa-eye"></i> Job Preview</h4>
        <div class="preview-content">
            <div class="preview-item">
                <strong>Title:</strong>
                <span id="preview-title">-</span>
            </div>
            <div class="preview-item">
                <strong>Section:</strong>
                <span id="preview-section">-</span>
            </div>
            <div class="preview-item">
                <strong>Priority:</strong>
                <span id="preview-priority">-</span>
            </div>
            <div class="preview-item">
                <strong>Due Date:</strong>
                <span id="preview-date">-</span>
            </div>
            <div class="preview-item">
                <strong>Description:</strong>
                <span id="preview-description">-</span>
            </div>
        </div>
    `;
    
    jobForm.appendChild(previewContainer);
}

// Update job preview
function updateJobPreview() {
    const formData = new FormData(jobForm);
    const title = jobForm.querySelector('input[type="text"]').value;
    const section = jobForm.querySelector('select').value;
    const priority = jobForm.querySelectorAll('select')[1].value;
    const date = jobForm.querySelector('input[type="date"]').value;
    const description = jobForm.querySelector('textarea').value;
    
    // Update preview elements
    updatePreviewElement('preview-title', title || '-');
    updatePreviewElement('preview-section', section ? `Section ${section}` : '-');
    updatePreviewElement('preview-priority', priority ? priority.charAt(0).toUpperCase() + priority.slice(1) : '-');
    updatePreviewElement('preview-date', date || '-');
    updatePreviewElement('preview-description', description || '-');
}

// Update preview element
function updatePreviewElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
        
        // Add animation
        element.style.transform = 'scale(1.05)';
        element.style.color = 'var(--primary-color)';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.color = '';
        }, 200);
    }
}

// Remove job preview
function removeJobPreview() {
    const preview = document.querySelector('.job-preview');
    if (preview) {
        preview.remove();
    }
}

// Handle job form submission
if (jobForm) {
    jobForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleJobSubmission();
    });
}

// Handle job submission
function handleJobSubmission() {
    const formData = new FormData(jobForm);
    const jobData = {
        title: jobForm.querySelector('input[type="text"]').value,
        section: jobForm.querySelector('select').value,
        priority: jobForm.querySelectorAll('select')[1].value,
        dueDate: jobForm.querySelector('input[type="date"]').value,
        description: jobForm.querySelector('textarea').value,
        createdBy: currentUser.name,
        createdAt: new Date().toISOString(),
        status: 'pending'
    };
    
    // Validate form data
    if (validateJobData(jobData)) {
        // In a real app, this would send data to backend
        console.log('Creating job:', jobData);
        
        // Show success message
        showNotification('Job created successfully!', 'success');
        
        // Close modal
        jobModal.style.display = 'none';
        
        // Refresh jobs list
        loadJobsData();
        
        // Update dashboard stats
        updateDashboardStats();
    }
}

// Validate job data
function validateJobData(jobData) {
    if (!jobData.title.trim()) {
        showNotification('Please enter a job title', 'error');
        return false;
    }
    
    if (!jobData.section) {
        showNotification('Please select a section', 'error');
        return false;
    }
    
    if (!jobData.priority) {
        showNotification('Please select a priority', 'error');
        return false;
    }
    
    if (!jobData.dueDate) {
        showNotification('Please select a due date', 'error');
        return false;
    }
    
    // Check if due date is in the future
    const dueDate = new Date(jobData.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (dueDate < today) {
        showNotification('Due date must be in the future', 'error');
        return false;
    }
    
    return true;
}

// Check user permissions
function hasPermission(permission) {
    return currentUser.permissions.includes(permission);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
    
    // Manual close
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// Get notification icon
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Get notification color
function getNotificationColor(type) {
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        warning: '#f39c12',
        info: '#3498db'
    };
    return colors[type] || '#3498db';
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(notificationStyles);

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Set initial development mode state
    if (devModeToggle && devModeToggle.checked) {
        devBanner.style.display = 'block';
        document.body.classList.add('dev-mode');
    }
    
    // Load initial dashboard data
    updateDashboardStats();
    
    // Show welcome message
    setTimeout(() => {
        showNotification(`Welcome back, ${currentUser.name}!`, 'success');
    }, 1000);
    
    console.log('Noapara RS Work Management System initialized');
    console.log('Current user:', currentUser);
});

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Refresh data when page becomes visible
        const activeSection = document.querySelector('.content-section.active');
        if (activeSection) {
            loadSectionData(activeSection.id);
        }
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + N for new job
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        if (hasPermission('create_job')) {
            openJobModal();
        }
    }
    
    // Escape to close modal
    if (e.key === 'Escape') {
        if (jobModal.style.display === 'flex') {
            jobModal.style.display = 'none';
        }
    }
});

// Auto-save form data (for better UX)
let autoSaveTimer;
function setupAutoSave() {
    const formInputs = document.querySelectorAll('#job-form input, #job-form select, #job-form textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            clearTimeout(autoSaveTimer);
            autoSaveTimer = setTimeout(() => {
                saveFormData();
            }, 2000);
        });
    });
}

// Save form data to localStorage
function saveFormData() {
    if (jobForm) {
        const formData = {
            title: jobForm.querySelector('input[type="text"]').value,
            section: jobForm.querySelector('select').value,
            priority: jobForm.querySelectorAll('select')[1].value,
            dueDate: jobForm.querySelector('input[type="date"]').value,
            description: jobForm.querySelector('textarea').value
        };
        
        localStorage.setItem('jobFormDraft', JSON.stringify(formData));
    }
}

// Load saved form data
function loadSavedFormData() {
    const savedData = localStorage.getItem('jobFormDraft');
    if (savedData && jobForm) {
        const formData = JSON.parse(savedData);
        
        jobForm.querySelector('input[type="text"]').value = formData.title || '';
        jobForm.querySelector('select').value = formData.section || '';
        jobForm.querySelectorAll('select')[1].value = formData.priority || '';
        jobForm.querySelector('input[type="date"]').value = formData.dueDate || '';
        jobForm.querySelector('textarea').value = formData.description || '';
        
        updateJobPreview();
    }
}

// Clear saved form data
function clearSavedFormData() {
    localStorage.removeItem('jobFormDraft');
}

// Setup auto-save when modal opens
const originalOpenJobModal = openJobModal;
openJobModal = function() {
    originalOpenJobModal();
    setupAutoSave();
    loadSavedFormData();
};

// Clear saved data when form is submitted successfully
const originalHandleJobSubmission = handleJobSubmission;
handleJobSubmission = function() {
    const result = originalHandleJobSubmission();
    if (result !== false) {
        clearSavedFormData();
    }
    return result;
};