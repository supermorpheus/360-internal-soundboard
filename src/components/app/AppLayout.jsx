import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { currentUser } from '../../data/mockData'
import '../../styles/App.css'

function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: '360', path: '/profile' },
    { id: 'browse', label: 'Browse Members', icon: 'people', path: '/browse' },
    { id: 'gurukul', label: 'Gurukul 2025', icon: 'palm', path: '/gurukul' },
  ]

  const adminItems = [
    { id: 'users', label: 'Users', icon: 'user', path: '/admin/users' },
    { id: 'pending', label: 'Pending Profiles', icon: 'user-plus', path: '/admin/pending' },
    { id: 'feedbacks', label: 'Feedbacks', icon: 'chat', path: '/admin/feedbacks' },
  ]

  const handleNavigation = (path) => {
    navigate(path)
    setSidebarOpen(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="app-layout">
      {/* Header */}
      <header className="app-header">
        <button className="header-btn menu-btn" onClick={() => setSidebarOpen(true)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="header-actions">
          <button className="header-btn notification-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>

          <button
            className="header-btn user-btn"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M20 21a8 8 0 1 0-16 0" />
            </svg>
          </button>
        </div>

        {/* User Menu Dropdown */}
        {userMenuOpen && (
          <>
            <div className="menu-overlay" onClick={() => setUserMenuOpen(false)} />
            <div className="user-menu-dropdown">
              <div className="user-menu-header">
                <img
                  src={currentUser.profilePicture}
                  alt={currentUser.firstName}
                  className="user-menu-avatar"
                />
                <div className="user-menu-info">
                  <span className="user-menu-name">{currentUser.firstName} {currentUser.lastName}</span>
                  <span className="user-menu-role">{currentUser.currentRole}</span>
                </div>
              </div>
              <div className="user-menu-divider" />
              <button
                className="user-menu-item"
                onClick={() => { handleNavigation('/profile'); setUserMenuOpen(false); }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M20 21a8 8 0 1 0-16 0" />
                </svg>
                My Profile
              </button>
              <button className="user-menu-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
                Settings
              </button>
              <div className="user-menu-divider" />
              <button className="user-menu-item logout">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16,17 21,12 16,7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            </div>
          </>
        )}
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src="/360-internal-soundboard/SM_Color_Whole.png" alt="SuperMorpheus" className="logo-image" />
            <span className="logo-text">Gang 360</span>
          </div>
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="sidebar-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#898989" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="text" placeholder="Search users..." />
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => handleNavigation(item.path)}
            >
              {item.icon === '360' && <span className="nav-icon-text">360</span>}
              {item.icon === 'people' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              )}
              {item.icon === 'palm' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M8 6c-2-2-4-2-6 0M16 6c2-2 4-2 6 0M6 10c-3 0-4 2-4 4M18 10c3 0 4 2 4 4" />
                </svg>
              )}
              <span>{item.label}</span>
            </button>
          ))}

          <div className="nav-divider">
            <span>Admin Controls</span>
          </div>

          {adminItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => handleNavigation(item.path)}
            >
              {item.icon === 'user' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M20 21a8 8 0 1 0-16 0" />
                </svg>
              )}
              {item.icon === 'user-plus' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="7" r="4" />
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <line x1="20" y1="8" x2="20" y2="14" />
                  <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
              )}
              {item.icon === 'chat' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              )}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="app-main">
        {children}
      </main>
    </div>
  )
}

export default AppLayout
