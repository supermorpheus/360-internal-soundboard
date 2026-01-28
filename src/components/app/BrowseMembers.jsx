import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { members, stats } from '../../data/mockData'
import AppLayout from './AppLayout'

function BrowseMembers() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortMenuOpen, setSortMenuOpen] = useState(false)
  const [sortBy, setSortBy] = useState('profileCompletion-desc')

  const sortOptions = [
    { id: 'profileCompletion-desc', label: 'Profile Completion (Highest → Lowest)' },
    { id: 'profileCompletion-asc', label: 'Profile Completion (Lowest → Highest)' },
    { id: 'name-asc', label: 'Name (A - Z)' },
    { id: 'name-desc', label: 'Name (Z - A)' },
    { id: 'date-desc', label: 'Date Joined (Newest)' },
    { id: 'date-asc', label: 'Date Joined (Oldest)' },
  ]

  const getStatusBadge = (status) => {
    const badges = {
      active: { label: 'Active', className: 'badge-active' },
      completed: { label: 'Completed', className: 'badge-completed' },
      super: { label: 'Super', className: 'badge-super' }
    }
    return badges[status] || badges.active
  }

  const filteredMembers = members.filter(member => {
    const searchLower = searchQuery.toLowerCase()
    return (
      member.firstName.toLowerCase().includes(searchLower) ||
      member.lastName.toLowerCase().includes(searchLower) ||
      member.email.toLowerCase().includes(searchLower) ||
      member.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    )
  })

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.firstName.localeCompare(b.firstName)
      case 'name-desc':
        return b.firstName.localeCompare(a.firstName)
      case 'date-desc':
        return new Date(b.joinedDate) - new Date(a.joinedDate)
      case 'date-asc':
        return new Date(a.joinedDate) - new Date(b.joinedDate)
      case 'profileCompletion-asc':
        return (a.status === 'completed' ? 0 : 1) - (b.status === 'completed' ? 0 : 1)
      case 'profileCompletion-desc':
      default:
        return (b.status === 'completed' ? 1 : 0) - (a.status === 'completed' ? 1 : 0)
    }
  })

  const handleSort = (sortId) => {
    setSortBy(sortId)
    setSortMenuOpen(false)
  }

  return (
    <AppLayout>
      <div className="browse-page">
        {/* Header */}
        <div className="browse-header">
          <h1 className="browse-title">All members ({stats.totalMembers})</h1>
        </div>

        {/* Search and Filter */}
        <div className="browse-controls">
          <div className="search-bar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#898989" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, email or tags"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            className={`filter-btn ${sortMenuOpen ? 'active' : ''}`}
            onClick={() => setSortMenuOpen(!sortMenuOpen)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="6" y1="12" x2="18" y2="12" />
              <line x1="8" y1="18" x2="16" y2="18" />
            </svg>
          </button>
        </div>

        {/* Sort Menu */}
        {sortMenuOpen && (
          <>
            <div className="menu-overlay" onClick={() => setSortMenuOpen(false)} />
            <div className="sort-menu">
              <h4 className="sort-menu-title">Sort by</h4>
              {sortOptions.map(option => (
                <button
                  key={option.id}
                  className={`sort-option ${sortBy === option.id ? 'active' : ''}`}
                  onClick={() => handleSort(option.id)}
                >
                  {option.label}
                  {sortBy === option.id && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Members List */}
        <div className="members-list">
          {sortedMembers.map(member => (
            <div key={member.id} className="member-card" onClick={() => navigate(`/member/${member.id}`)}>
              <div className="member-avatar">
                <img src={member.profilePicture} alt={member.firstName} />
              </div>
              <div className="member-info">
                <span className={`member-badge ${getStatusBadge(member.status).className}`}>
                  {getStatusBadge(member.status).label}
                </span>
                <h3 className="member-name">{member.firstName} {member.lastName}</h3>
                {member.introduction && (
                  <p className="member-intro">{member.introduction.slice(0, 80)}...</p>
                )}
                <div className="member-details">
                  <div className="detail-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#898989" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{member.city}</span>
                  </div>
                  <div className="detail-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#898989" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 7l-10 7L2 7" />
                    </svg>
                    <a href={`mailto:${member.email}`} className="detail-link">{member.email}</a>
                  </div>
                  <div className="detail-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#898989" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <a href={`tel:${member.phone}`} className="detail-link">{member.phone}</a>
                  </div>
                </div>
                <span className="member-role-tag">{member.currentRole}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}

export default BrowseMembers
