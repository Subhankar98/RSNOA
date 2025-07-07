// Staff Database Management System
class StaffDatabase {
    constructor() {
        this.storageKey = 'noapara_staff_database';
        this.staff = this.loadStaff();
        this.sections = [
            'Shift Section',
            'Mechanical Section',
            'Door Section',
            'Rotating Machine Section',
            'Brake Section',
            'Electronics Section',
            'Ancillary Section',
            'Control Gear Section'
        ];
        this.positions = [
            'SEE/RS/NOA - Senior Electrical Engineer',
            'SSE/PPO/RS/NOA - Senior Section Engineer (Planning)',
            'SSE/IC/RS/NOA - Senior Section Engineer (In-Charge)',
            'Junior Engineer',
            'Technician',
            'Helper',
            'Supervisor',
            'Maintainer'
        ];
        this.initializeDefaultStaff();
    }

    initializeDefaultStaff() {
        if (this.staff.length === 0) {
            // Add default senior staff
            this.addStaff({
                id: this.generateId(),
                name: 'Sanjit Kr. Pramanick',
                position: 'SEE/RS/NOA - Senior Electrical Engineer',
                section: 'All Sections',
                employeeId: 'SEE001',
                phone: '+91-9876543210',
                email: 'sanjit.pramanick@indianrailways.gov.in',
                status: 'Available',
                joinDate: '2015-03-15',
                experience: '25 years',
                specialization: 'Electrical Systems'
            });

            this.addStaff({
                id: this.generateId(),
                name: 'Tapos Roy',
                position: 'SSE/PPO/RS/NOA - Senior Section Engineer (Planning)',
                section: 'All Sections',
                employeeId: 'SSE001',
                phone: '+91-9876543211',
                email: 'tapos.roy@indianrailways.gov.in',
                status: 'Available',
                joinDate: '2018-07-20',
                experience: '15 years',
                specialization: 'Planning & Operations'
            });

            this.addStaff({
                id: this.generateId(),
                name: 'Sanjay Kumar Mandal',
                position: 'SSE/PPO/RS/NOA - Senior Section Engineer (Planning)',
                section: 'All Sections',
                employeeId: 'SSE002',
                phone: '+91-9876543212',
                email: 'sanjay.mandal@indianrailways.gov.in',
                status: 'Available',
                joinDate: '2017-11-10',
                experience: '18 years',
                specialization: 'Technical Planning'
            });

            // Add sample staff for each section
            this.sections.forEach((section, index) => {
                this.addStaff({
                    id: this.generateId(),
                    name: `Supervisor ${index + 1}`,
                    position: 'Supervisor',
                    section: section,
                    employeeId: `SUP00${index + 1}`,
                    phone: `+91-987654321${index + 3}`,
                    email: `supervisor${index + 1}@indianrailways.gov.in`,
                    status: 'Available',
                    joinDate: '2020-01-15',
                    experience: '8 years',
                    specialization: section.replace(' Section', '')
                });
            });

            this.saveStaff();
        }
    }

    generateId() {
        return 'staff_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    loadStaff() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading staff data:', error);
            return [];
        }
    }

    saveStaff() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.staff));
            return true;
        } catch (error) {
            console.error('Error saving staff data:', error);
            return false;
        }
    }

    addStaff(staffData) {
        const newStaff = {
            id: staffData.id || this.generateId(),
            name: staffData.name,
            position: staffData.position,
            section: staffData.section,
            employeeId: staffData.employeeId,
            phone: staffData.phone,
            email: staffData.email,
            status: staffData.status || 'Available',
            joinDate: staffData.joinDate,
            experience: staffData.experience,
            specialization: staffData.specialization,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.staff.push(newStaff);
        this.saveStaff();
        return newStaff;
    }

    updateStaff(id, updates) {
        const index = this.staff.findIndex(s => s.id === id);
        if (index !== -1) {
            this.staff[index] = {
                ...this.staff[index],
                ...updates,
                updatedAt: new Date().toISOString()
            };
            this.saveStaff();
            return this.staff[index];
        }
        return null;
    }

    deleteStaff(id) {
        const index = this.staff.findIndex(s => s.id === id);
        if (index !== -1) {
            const deleted = this.staff.splice(index, 1)[0];
            this.saveStaff();
            return deleted;
        }
        return null;
    }

    getStaff(id) {
        return this.staff.find(s => s.id === id);
    }

    getAllStaff() {
        return [...this.staff];
    }

    getStaffBySection(section) {
        return this.staff.filter(s => s.section === section || s.section === 'All Sections');
    }

    searchStaff(query) {
        const searchTerm = query.toLowerCase();
        return this.staff.filter(s => 
            s.name.toLowerCase().includes(searchTerm) ||
            s.position.toLowerCase().includes(searchTerm) ||
            s.section.toLowerCase().includes(searchTerm) ||
            s.employeeId.toLowerCase().includes(searchTerm)
        );
    }

    exportData() {
        return {
            staff: this.staff,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
    }

    importData(data) {
        try {
            if (data.staff && Array.isArray(data.staff)) {
                this.staff = data.staff;
                this.saveStaff();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    }

    getStatistics() {
        const stats = {
            total: this.staff.length,
            available: this.staff.filter(s => s.status === 'Available').length,
            booked: this.staff.filter(s => s.status === 'Booked').length,
            onLeave: this.staff.filter(s => s.status === 'On Leave').length,
            bySections: {}
        };

        this.sections.forEach(section => {
            stats.bySections[section] = this.getStaffBySection(section).length;
        });

        return stats;
    }
}

// Initialize global staff database
window.staffDB = new StaffDatabase();