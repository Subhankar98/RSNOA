// Staff Management UI Controller
class StaffManagement {
    constructor() {
        this.staffDB = window.staffDB;
        this.currentView = 'list';
        this.selectedStaff = null;
        this.initializeUI();
    }

    initializeUI() {
        this.createStaffManagementModal();
        this.bindEvents();
    }

    createStaffManagementModal() {
        const modalHTML = `
            <div id="staff-management-modal" class="modal">
                <div class="modal-content staff-modal-content">
                    <div class="modal-header">
                        <h3>Staff Database Management</h3>
                        <div class="staff-modal-controls">
                            <button class="btn btn-sm btn-primary" id="add-new-staff">
                                <i class="fas fa-user-plus"></i> Add Staff
                            </button>
                            <button class="btn btn-sm btn-secondary" id="export-staff-data">
                                <i class="fas fa-download"></i> Export
                            </button>
                            <button class="btn btn-sm btn-secondary" id="import-staff-data">
                                <i class="fas fa-upload"></i> Import
                            </button>
                            <button class="close-modal">&times;</button>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div class="staff-search-bar">
                            <input type="text" id="staff-search" placeholder="Search staff by name, position, section..." class="search-input">
                            <i class="fas fa-search search-icon"></i>
                        </div>
                        
                        <div class="staff-statistics">
                            <div class="stat-item">
                                <span class="stat-label">Total Staff:</span>
                                <span class="stat-value" id="total-staff">0</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Available:</span>
                                <span class="stat-value available" id="available-staff">0</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Booked:</span>
                                <span class="stat-value booked" id="booked-staff">0</span>
                            </div>
                        </div>

                        <div id="staff-list-container">
                            <!-- Staff list will be populated here -->
                        </div>
                    </div>
                </div>
            </div>

            <div id="staff-form-modal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 id="staff-form-title">Add New Staff Member</h3>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="staff-form">
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Full Name *</label>
                                    <input type="text" name="name" required>
                                </div>
                                <div class="form-group">
                                    <label>Employee ID *</label>
                                    <input type="text" name="employeeId" required>
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Position *</label>
                                    <select name="position" required>
                                        <option value="">Select Position</option>
                                        <option value="SEE/RS/NOA - Senior Electrical Engineer">SEE/RS/NOA - Senior Electrical Engineer</option>
                                        <option value="SSE/PPO/RS/NOA - Senior Section Engineer (Planning)">SSE/PPO/RS/NOA - Senior Section Engineer (Planning)</option>
                                        <option value="SSE/IC/RS/NOA - Senior Section Engineer (In-Charge)">SSE/IC/RS/NOA - Senior Section Engineer (In-Charge)</option>
                                        <option value="Junior Engineer">Junior Engineer</option>
                                        <option value="Technician">Technician</option>
                                        <option value="Helper">Helper</option>
                                        <option value="Supervisor">Supervisor</option>
                                        <option value="Maintainer">Maintainer</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Section *</label>
                                    <select name="section" required>
                                        <option value="">Select Section</option>
                                        <option value="All Sections">All Sections</option>
                                        <option value="Shift Section">Shift Section</option>
                                        <option value="Mechanical Section">Mechanical Section</option>
                                        <option value="Door Section">Door Section</option>
                                        <option value="Rotating Machine Section">Rotating Machine Section</option>
                                        <option value="Brake Section">Brake Section</option>
                                        <option value="Electronics Section">Electronics Section</option>
                                        <option value="Ancillary Section">Ancillary Section</option>
                                        <option value="Control Gear Section">Control Gear Section</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label>Phone Number</label>
                                    <input type="tel" name="phone" placeholder="+91-XXXXXXXXXX">
                                </div>
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="email" name="email" placeholder="name@indianrailways.gov.in">
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label>Join Date</label>
                                    <input type="date" name="joinDate">
                                </div>
                                <div class="form-group">
                                    <label>Experience</label>
                                    <input type="text" name="experience" placeholder="e.g., 5 years">
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label>Status</label>
                                    <select name="status">
                                        <option value="Available">Available</option>
                                        <option value="Booked">Booked</option>
                                        <option value="On Leave">On Leave</option>
                                        <option value="Training">Training</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Specialization</label>
                                    <input type="text" name="specialization" placeholder="Area of expertise">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary close-modal">Cancel</button>
                        <button class="btn btn-primary" id="save-staff">Save Staff Member</button>
                    </div>
                </div>
            </div>

            <input type="file" id="import-file-input" accept=".json" style="display: none;">
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    bindEvents() {
        // Open staff management modal
        document.addEventListener('click', (e) => {
            if (e.target.closest('#manage-staff-db')) {
                this.openStaffManagement();
            }
        });

        // Add new staff
        document.getElementById('add-new-staff').addEventListener('click', () => {
            this.openStaffForm();
        });

        // Search functionality
        document.getElementById('staff-search').addEventListener('input', (e) => {
            this.searchStaff(e.target.value);
        });

        // Save staff
        document.getElementById('save-staff').addEventListener('click', () => {
            this.saveStaff();
        });

        // Export data
        document.getElementById('export-staff-data').addEventListener('click', () => {
            this.exportStaffData();
        });

        // Import data
        document.getElementById('import-staff-data').addEventListener('click', () => {
            document.getElementById('import-file-input').click();
        });

        document.getElementById('import-file-input').addEventListener('change', (e) => {
            this.importStaffData(e.target.files[0]);
        });

        // Close modals
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-modal')) {
                this.closeModals();
            }
        });
    }

    openStaffManagement() {
        document.getElementById('staff-management-modal').style.display = 'flex';
        this.refreshStaffList();
        this.updateStatistics();
    }

    openStaffForm(staff = null) {
        const modal = document.getElementById('staff-form-modal');
        const form = document.getElementById('staff-form');
        const title = document.getElementById('staff-form-title');

        if (staff) {
            title.textContent = 'Edit Staff Member';
            this.populateForm(form, staff);
            this.selectedStaff = staff;
        } else {
            title.textContent = 'Add New Staff Member';
            form.reset();
            this.selectedStaff = null;
        }

        modal.style.display = 'flex';
    }

    populateForm(form, staff) {
        Object.keys(staff).forEach(key => {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = staff[key] || '';
            }
        });
    }

    saveStaff() {
        const form = document.getElementById('staff-form');
        const formData = new FormData(form);
        const staffData = {};

        for (let [key, value] of formData.entries()) {
            staffData[key] = value;
        }

        // Validation
        if (!staffData.name || !staffData.employeeId || !staffData.position || !staffData.section) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        try {
            if (this.selectedStaff) {
                // Update existing staff
                this.staffDB.updateStaff(this.selectedStaff.id, staffData);
                showNotification('Staff member updated successfully', 'success');
            } else {
                // Add new staff
                this.staffDB.addStaff(staffData);
                showNotification('Staff member added successfully', 'success');
            }

            this.closeModals();
            this.refreshStaffList();
            this.updateStatistics();
        } catch (error) {
            showNotification('Error saving staff member', 'error');
            console.error('Error saving staff:', error);
        }
    }

    refreshStaffList() {
        const container = document.getElementById('staff-list-container');
        const staff = this.staffDB.getAllStaff();

        if (staff.length === 0) {
            container.innerHTML = '<div class="no-staff">No staff members found. Add some staff to get started.</div>';
            return;
        }

        const staffHTML = staff.map(member => `
            <div class="staff-item" data-id="${member.id}">
                <div class="staff-info">
                    <div class="staff-name">${member.name}</div>
                    <div class="staff-details">
                        <span class="staff-position">${member.position}</span>
                        <span class="staff-section">${member.section}</span>
                        <span class="staff-id">ID: ${member.employeeId}</span>
                    </div>
                    <div class="staff-contact">
                        ${member.phone ? `<span><i class="fas fa-phone"></i> ${member.phone}</span>` : ''}
                        ${member.email ? `<span><i class="fas fa-envelope"></i> ${member.email}</span>` : ''}
                    </div>
                </div>
                <div class="staff-status">
                    <span class="status-badge ${member.status.toLowerCase().replace(' ', '-')}">${member.status}</span>
                </div>
                <div class="staff-actions">
                    <button class="btn btn-sm btn-secondary edit-staff" data-id="${member.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger delete-staff" data-id="${member.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        container.innerHTML = staffHTML;

        // Bind edit and delete events
        container.addEventListener('click', (e) => {
            if (e.target.closest('.edit-staff')) {
                const id = e.target.closest('.edit-staff').dataset.id;
                const staff = this.staffDB.getStaff(id);
                this.openStaffForm(staff);
            }

            if (e.target.closest('.delete-staff')) {
                const id = e.target.closest('.delete-staff').dataset.id;
                this.deleteStaff(id);
            }
        });
    }

    deleteStaff(id) {
        if (confirm('Are you sure you want to delete this staff member?')) {
            this.staffDB.deleteStaff(id);
            showNotification('Staff member deleted successfully', 'success');
            this.refreshStaffList();
            this.updateStatistics();
        }
    }

    searchStaff(query) {
        const container = document.getElementById('staff-list-container');
        const staff = query ? this.staffDB.searchStaff(query) : this.staffDB.getAllStaff();

        if (staff.length === 0) {
            container.innerHTML = '<div class="no-staff">No staff members found matching your search.</div>';
            return;
        }

        this.displayStaffList(staff);
    }

    updateStatistics() {
        const stats = this.staffDB.getStatistics();
        document.getElementById('total-staff').textContent = stats.total;
        document.getElementById('available-staff').textContent = stats.available;
        document.getElementById('booked-staff').textContent = stats.booked;
    }

    exportStaffData() {
        const data = this.staffDB.exportData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `noapara_staff_database_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showNotification('Staff database exported successfully', 'success');
    }

    importStaffData(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (this.staffDB.importData(data)) {
                    showNotification('Staff database imported successfully', 'success');
                    this.refreshStaffList();
                    this.updateStatistics();
                } else {
                    showNotification('Invalid file format', 'error');
                }
            } catch (error) {
                showNotification('Error importing file', 'error');
                console.error('Import error:', error);
            }
        };
        reader.readAsText(file);
    }

    closeModals() {
        document.getElementById('staff-management-modal').style.display = 'none';
        document.getElementById('staff-form-modal').style.display = 'none';
    }
}

// Initialize staff management
document.addEventListener('DOMContentLoaded', () => {
    window.staffManagement = new StaffManagement();
});