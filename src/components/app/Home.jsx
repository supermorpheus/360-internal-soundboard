import { useNavigate } from 'react-router-dom'
import { currentUser, newMembers, stats } from '../../data/mockData'
import AppLayout from './AppLayout'

function Home() {
  const navigate = useNavigate()

  const getStatusBadge = (status) => {
    const badges = {
      active: { label: 'Active', className: 'badge-active' },
      completed: { label: 'Completed', className: 'badge-completed' },
      super: { label: 'Super', className: 'badge-super' }
    }
    return badges[status] || badges.active
  }

  return (
    <AppLayout>
      <div className="home-page">
        {/* Welcome Section */}
        <div className="welcome-section">
          <span className="welcome-label">Welcome,</span>
          <h1 className="welcome-name">{currentUser.firstName} {currentUser.lastName}</h1>
          <p className="welcome-subtitle">
            {stats.newMembersThisMonth} new people have joined the community in the last 2 weeks
          </p>
        </div>

        {/* New Members Section */}
        <div className="members-section">
          {newMembers.map(member => (
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

        {/* Quick Stats */}
        <div className="stats-section">
          <div className="stat-card">
            <span className="stat-number">{stats.totalMembers}</span>
            <span className="stat-label">Total Members</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{stats.newMembersThisMonth}</span>
            <span className="stat-label">New This Month</span>
          </div>
        </div>

        {/* Browse All CTA */}
        <button className="browse-all-btn" onClick={() => navigate('/browse')}>
          Browse All Members
        </button>
      </div>
    </AppLayout>
  )
}

export default Home
