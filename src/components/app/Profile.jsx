import { useState } from 'react'
import { currentUser } from '../../data/mockData'
import AppLayout from './AppLayout'

function Profile() {
  const [jumpToOpen, setJumpToOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')
  const [showMoreSummary, setShowMoreSummary] = useState({
    current: false,
    early: false,
    professional: false
  })

  const user = currentUser

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    setJumpToOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const copyProfileLink = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('Profile link copied!')
  }

  return (
    <AppLayout>
      <div className="profile-page">
        {/* Profile Header */}
        <section id="overview" className="profile-header-section">
          <div className="profile-actions">
            <span className="status-badge badge-super">Super</span>
            <button className="copy-link-btn" onClick={copyProfileLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Profile Link
            </button>
          </div>

          <div className="profile-header">
            <div className="profile-name-section">
              <h1 className="profile-name">{user.firstName} {user.lastName}</h1>
            </div>
            <img
              src={user.profilePicture}
              alt={user.firstName}
              className="profile-avatar-large"
            />
          </div>

          <div className="profile-location">
            <span className="location-label">Lives in </span>
            <a href="#" className="location-link">{user.city}</a>
          </div>

          <p className="profile-introduction">{user.introduction}</p>
        </section>

        {/* Current Life Section */}
        <section id="current-life" className="life-section">
          <div className="section-header">
            <h2 className="section-title">Current Life</h2>
            <img src="/360-internal-soundboard/SM_Color_Whole.png" alt="" className="section-icon" />
          </div>

          <div className="video-thumbnail">
            <img src={user.lifeStories.current.videoThumbnail} alt="Current Life Video" />
            <button className="play-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </button>
            <span className="video-duration">{user.lifeStories.current.videoDuration}</span>
          </div>

          <div className="tags-container">
            {user.lifeStories.current.tags.map((tag, idx) => (
              <span key={idx} className="tag">{tag}</span>
            ))}
          </div>

          <div className="info-group">
            <span className="info-label">Roles / Organizations</span>
            {user.lifeStories.current.organizations.map((org, idx) => (
              <div key={idx} className="info-box">
                <span className="info-text">{org.role} / {org.name}</span>
              </div>
            ))}
          </div>

          <div className="info-group">
            <span className="info-label">Frequent Travel Cities</span>
            <div className="tags-container">
              {user.lifeStories.current.travelCities.map((city, idx) => (
                <span key={idx} className="tag">{city}</span>
              ))}
            </div>
          </div>

          <div className="info-group">
            <span className="info-label">Current Life Summary</span>
            <p className="summary-text">
              {showMoreSummary.current
                ? user.lifeStories.current.summary
                : `${user.lifeStories.current.summary.slice(0, 50)}...`}
            </p>
            <button
              className="show-more-btn"
              onClick={() => setShowMoreSummary({ ...showMoreSummary, current: !showMoreSummary.current })}
            >
              {showMoreSummary.current ? 'Show Less' : 'Show More'}
            </button>
          </div>
        </section>

        {/* Early Life Section */}
        <section id="early-life" className="life-section">
          <div className="section-header">
            <h2 className="section-title">Early Life</h2>
            <img src="/360-internal-soundboard/SM_Color_Whole.png" alt="" className="section-icon" />
          </div>

          <div className="video-thumbnail">
            <img src={user.lifeStories.earlyLife.videoThumbnail} alt="Early Life Video" />
            <button className="play-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </button>
            <span className="video-duration">{user.lifeStories.earlyLife.videoDuration}</span>
          </div>

          <div className="tags-container">
            {user.lifeStories.earlyLife.tags.map((tag, idx) => (
              <span key={idx} className="tag">{tag}</span>
            ))}
          </div>

          <div className="info-group">
            <span className="info-label">Hometown</span>
            <span className="info-value-link">{user.lifeStories.earlyLife.hometown}</span>
          </div>

          <div className="info-group">
            <span className="info-label">Born in</span>
            <span className="info-value-link">{user.lifeStories.earlyLife.bornIn}</span>
          </div>

          <div className="info-group">
            <span className="info-label">Went to school at</span>
            <span className="info-value-link">{user.lifeStories.earlyLife.schools[0]?.name}</span>
          </div>

          <div className="info-group">
            <span className="info-label">Went to college at</span>
            <span className="info-value-link">{user.lifeStories.earlyLife.universities[0]?.name}</span>
          </div>

          <div className="info-group">
            <span className="info-label">Early Life Summary</span>
            <p className="summary-text">
              {showMoreSummary.early
                ? user.lifeStories.earlyLife.summary
                : `${user.lifeStories.earlyLife.summary.slice(0, 50)}...`}
            </p>
            <button
              className="show-more-btn"
              onClick={() => setShowMoreSummary({ ...showMoreSummary, early: !showMoreSummary.early })}
            >
              {showMoreSummary.early ? 'Show Less' : 'Show More'}
            </button>
          </div>
        </section>

        {/* Quote Card */}
        <div className="quote-card">
          <span className="quote-label">A Quote that inspires me!</span>
          <p className="quote-text">{user.inspiringQuote}</p>
          <img src="/360-internal-soundboard/SM_Color_Whole.png" alt="" className="quote-icon" />
        </div>

        {/* Professional Life Section */}
        <section id="professional-life" className="life-section">
          <div className="section-header">
            <h2 className="section-title">Professional Life</h2>
            <img src="/360-internal-soundboard/SM_Color_Whole.png" alt="" className="section-icon" />
          </div>

          <div className="video-thumbnail">
            <img src={user.lifeStories.professional.videoThumbnail} alt="Professional Life Video" />
            <button className="play-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </button>
            <span className="video-duration">{user.lifeStories.professional.videoDuration}</span>
          </div>

          <div className="tags-container">
            {user.lifeStories.professional.tags.map((tag, idx) => (
              <span key={idx} className="tag">{tag}</span>
            ))}
          </div>

          <div className="info-group">
            <span className="info-label">First Job</span>
            <div className="info-box">
              <span className="info-text">
                {user.lifeStories.professional.firstJob.company} - {user.lifeStories.professional.firstJob.titles.join(', ')}
              </span>
            </div>
          </div>

          <div className="info-group">
            <span className="info-label">Subsequent Jobs</span>
            {user.lifeStories.professional.subsequentJobs.map((job, idx) => (
              <div key={idx} className="info-box">
                <span className="info-text">{job.company} - {job.titles.join(', ')}</span>
              </div>
            ))}
          </div>

          <div className="info-group">
            <span className="info-label">Professional Life Summary</span>
            <p className="summary-text">
              {showMoreSummary.professional
                ? user.lifeStories.professional.summary
                : `${user.lifeStories.professional.summary.slice(0, 50)}...`}
            </p>
            <button
              className="show-more-btn"
              onClick={() => setShowMoreSummary({ ...showMoreSummary, professional: !showMoreSummary.professional })}
            >
              {showMoreSummary.professional ? 'Show Less' : 'Show More'}
            </button>
          </div>
        </section>

        {/* Joy Card */}
        <div className="joy-card">
          <span className="joy-label">What fills me with joy</span>
          <p className="joy-text">{user.joyOutsideWork}</p>
          <img src="/360-internal-soundboard/SM_Color_Whole.png" alt="" className="joy-icon" />
        </div>

        {/* Coordinates Section */}
        <section className="coordinates-section">
          <h2 className="section-title">{user.firstName}'s Coordinates</h2>
          <div className="coordinates-grid">
            <a href={`mailto:${user.email}`} className="coordinate-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
              </svg>
              <span>Email</span>
            </a>
            <a href={`https://wa.me/${user.phone.replace(/\D/g, '')}`} className="coordinate-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>Whatsapp</span>
            </a>
            <a href={`tel:${user.phone}`} className="coordinate-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Text/Cell</span>
            </a>
          </div>
        </section>

        {/* Jump To FAB */}
        <button
          className={`fab-btn ${jumpToOpen ? 'active' : ''}`}
          onClick={() => setJumpToOpen(!jumpToOpen)}
        >
          {jumpToOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          )}
        </button>

        {/* Jump To Modal */}
        {jumpToOpen && (
          <>
            <div className="menu-overlay" onClick={() => setJumpToOpen(false)} />
            <div className="jump-to-modal">
              <h4 className="jump-to-title">Jump to</h4>
              <button
                className={`jump-to-option ${activeSection === 'overview' ? 'active' : ''}`}
                onClick={() => scrollToSection('overview')}
              >
                Overview
              </button>
              <button
                className={`jump-to-option ${activeSection === 'current-life' ? 'active' : ''}`}
                onClick={() => scrollToSection('current-life')}
              >
                Current Life
              </button>
              <button
                className={`jump-to-option ${activeSection === 'early-life' ? 'active' : ''}`}
                onClick={() => scrollToSection('early-life')}
              >
                Early Life
              </button>
              <button
                className={`jump-to-option ${activeSection === 'professional-life' ? 'active' : ''}`}
                onClick={() => scrollToSection('professional-life')}
              >
                Professional Life
              </button>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  )
}

export default Profile
