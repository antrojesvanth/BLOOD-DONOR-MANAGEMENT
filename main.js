// ===== LIFEFLOW BLOOD BANK - MAIN JS =====

// ---- NAV ACTIVE LINK ----
(function () {
  const links = document.querySelectorAll('.nav-links a');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });
})();

// ---- HAMBURGER MENU ----
const hamburger = document.querySelector('.nav-hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '68px';
    navLinks.style.left = '0'; navLinks.style.right = '0';
    navLinks.style.background = 'var(--cream)';
    navLinks.style.padding = '16px 5vw 20px';
    navLinks.style.borderBottom = '1px solid var(--border)';
  });
}

// ---- MODAL HELPERS ----
function openModal(id) {
  document.getElementById(id).classList.add('open');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
});

// ---- ALERT HELPER ----
function showAlert(id, type, message) {
  const el = document.getElementById(id);
  if (!el) return;
  el.className = `alert alert-${type} show`;
  el.textContent = message;
  setTimeout(() => el.classList.remove('show'), 4000);
}

// ---- BLOOD BADGE TOGGLE ----
document.querySelectorAll('.blood-badge').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.blood-badge').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
  });
});

// ---- LOCAL STORAGE DATA LAYER ----
const DB = {
  get: (key) => JSON.parse(localStorage.getItem('lf_' + key) || '[]'),
  set: (key, val) => localStorage.setItem('lf_' + key, JSON.stringify(val)),
  push: (key, item) => {
    const arr = DB.get(key);
    item.id = item.id || Date.now();
    item.createdAt = item.createdAt || new Date().toISOString();
    arr.push(item);
    DB.set(key, arr);
    return item;
  },
  remove: (key, id) => {
    const arr = DB.get(key).filter(i => i.id !== id);
    DB.set(key, arr);
  },
  update: (key, id, updates) => {
    const arr = DB.get(key).map(i => i.id === id ? { ...i, ...updates } : i);
    DB.set(key, arr);
  }
};

// ---- SEED DEMO DATA ----
function seedData() {
  if (DB.get('seeded').length) return;

  DB.set('inventory', [
    { id: 1, type: 'A+', units: 320, collected: '2026-03-15', expiry: '2026-04-14', location: 'Store A', status: 'Available' },
    { id: 2, type: 'A-', units: 80,  collected: '2026-03-12', expiry: '2026-04-10', location: 'Store A', status: 'Low' },
    { id: 3, type: 'B+', units: 210, collected: '2026-03-16', expiry: '2026-04-15', location: 'Store B', status: 'Available' },
    { id: 4, type: 'B-', units: 55,  collected: '2026-03-10', expiry: '2026-04-08', location: 'Store B', status: 'Low' },
    { id: 5, type: 'AB+',units: 85,  collected: '2026-03-11', expiry: '2026-04-09', location: 'Store C', status: 'Low' },
    { id: 6, type: 'AB-',units: 22,  collected: '2026-03-08', expiry: '2026-04-06', location: 'Store C', status: 'Critical' },
    { id: 7, type: 'O+', units: 842, collected: '2026-03-17', expiry: '2026-04-16', location: 'Store D', status: 'Available' },
    { id: 8, type: 'O-', units: 48,  collected: '2026-03-09', expiry: '2026-04-07', location: 'Store D', status: 'Critical' },
  ]);

  DB.set('donors', [
    { id: 1, name: 'Arjun Kumar',    blood: 'O+',  age: 28, phone: '9876543210', email: 'arjun@email.com', city: 'Chennai',   donations: 4, lastDonation: '2026-01-10', status: 'Eligible' },
    { id: 2, name: 'Priya Sharma',   blood: 'A+',  age: 32, phone: '9123456780', email: 'priya@email.com', city: 'Mumbai',    donations: 7, lastDonation: '2026-02-20', status: 'Eligible' },
    { id: 3, name: 'Rahul Verma',    blood: 'B+',  age: 25, phone: '9988776655', email: 'rahul@email.com', city: 'Delhi',     donations: 2, lastDonation: '2025-12-05', status: 'Eligible' },
    { id: 4, name: 'Sneha Reddy',    blood: 'AB-', age: 30, phone: '9345678901', email: 'sneha@email.com', city: 'Hyderabad', donations: 3, lastDonation: '2026-03-01', status: 'Cooldown' },
    { id: 5, name: 'Karthik Nair',   blood: 'O-',  age: 22, phone: '9012345678', email: 'karthik@email.com', city: 'Kochi',  donations: 1, lastDonation: '2025-11-20', status: 'Eligible' },
    { id: 6, name: 'Meena Pillai',   blood: 'A-',  age: 27, phone: '9654321098', email: 'meena@email.com', city: 'Chennai',  donations: 5, lastDonation: '2026-02-10', status: 'Eligible' },
  ]);

  DB.set('requests', [
    { id: 1, hospital: 'Apollo Hospital',   blood: 'O-',  units: 5,  priority: 'Emergency', date: '2026-03-17', status: 'Pending',  contact: 'Dr. Suresh', phone: '9111222333' },
    { id: 2, hospital: 'Fortis Healthcare', blood: 'A+',  units: 10, priority: 'Normal',    date: '2026-03-16', status: 'Approved', contact: 'Dr. Anita',  phone: '9222333444' },
    { id: 3, hospital: 'MIOT Hospital',     blood: 'B+',  units: 6,  priority: 'Urgent',    date: '2026-03-15', status: 'Pending',  contact: 'Dr. Ramesh', phone: '9333444555' },
    { id: 4, hospital: 'Kauvery Hospital',  blood: 'AB+', units: 3,  priority: 'Normal',    date: '2026-03-14', status: 'Dispatched', contact: 'Dr. Kavya', phone: '9444555666' },
    { id: 5, hospital: 'Global Hospital',   blood: 'O+',  units: 15, priority: 'Normal',    date: '2026-03-13', status: 'Approved', contact: 'Dr. Pradeep', phone: '9555666777' },
  ]);

  DB.set('hospitals', [
    { id: 1, name: 'Apollo Hospital',    city: 'Chennai',   contact: 'Dr. Suresh',  phone: '044-28290200', type: 'Multi-Specialty', status: 'Active' },
    { id: 2, name: 'Fortis Healthcare',  city: 'Mumbai',    contact: 'Dr. Anita',   phone: '022-66214444', type: 'Super Specialty',  status: 'Active' },
    { id: 3, name: 'MIOT Hospital',      city: 'Chennai',   contact: 'Dr. Ramesh',  phone: '044-22492288', type: 'Orthopedic',       status: 'Active' },
    { id: 4, name: 'Kauvery Hospital',   city: 'Trichy',    contact: 'Dr. Kavya',   phone: '0431-4077777', type: 'Multi-Specialty',  status: 'Active' },
    { id: 5, name: 'Global Hospital',    city: 'Hyderabad', contact: 'Dr. Pradeep', phone: '040-30244444', type: 'General',          status: 'Inactive' },
  ]);

  DB.push('seeded', { done: true });
}

seedData();

// ---- UTILITY ----
function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
function daysUntil(iso) {
  const diff = new Date(iso) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
