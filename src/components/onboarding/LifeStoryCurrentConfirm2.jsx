import { useState } from 'react'
import { useOnboarding, lifeStoryPrompts } from '../../context/OnboardingContext'

function LifeStoryCurrentConfirm2() {
  const { profileData, updateLifeStory, completeLifeStory } = useOnboarding()
  const storyData = profileData.lifeStories.current
  const story = lifeStoryPrompts.current

  // Local state
  const [organizations, setOrganizations] = useState(
    (storyData.organizations && storyData.organizations.length > 0)
      ? storyData.organizations
      : (storyData.rolesOrganizations && storyData.rolesOrganizations.length > 0)
        ? storyData.rolesOrganizations.map(r => ({ name: r.organization, role: r.role }))
        : [{ name: '', role: '' }]
  )
  const [travelCities, setTravelCities] = useState(storyData.travelCities || [])
  const [newTravelCity, setNewTravelCity] = useState('')
  const [tags, setTags] = useState(storyData.tags || storyData.interests || [])
  const [newTag, setNewTag] = useState('')
  const [showSubmitPopup, setShowSubmitPopup] = useState(false)
  const [showErrors, setShowErrors] = useState(false)

  const maxTags = 15

  // Organization handlers
  const updateOrganization = (index, field, value) => {
    const updated = [...organizations]
    updated[index][field] = value
    setOrganizations(updated)
  }

  const addOrganization = () => {
    setOrganizations([...organizations, { name: '', role: '' }])
  }

  const removeOrganization = (index) => {
    if (organizations.length > 1) {
      setOrganizations(organizations.filter((_, i) => i !== index))
    }
  }

  // Travel Cities handlers
  const addTravelCity = () => {
    if (newTravelCity.trim()) {
      setTravelCities([...travelCities, newTravelCity.trim()])
      setNewTravelCity('')
    }
  }

  const removeTravelCity = (index) => {
    setTravelCities(travelCities.filter((_, i) => i !== index))
  }

  const handleTravelCityKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTravelCity()
    }
  }

  // Tag handlers
  const addTag = () => {
    if (newTag.trim() && tags.length < maxTags) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index))
  }

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  // Validation check
  const isValid = () => {
    // At least one organization with name and role
    const validOrgs = organizations.filter(o => o.name.trim() && o.role.trim())
    if (validOrgs.length === 0) return false
    // At least one tag required
    if (tags.length === 0) return false
    return true
  }

  // Individual field error checks
  const getErrors = () => ({
    organizations: organizations.filter(o => o.name.trim() && o.role.trim()).length === 0
      ? 'Please add at least one organization with name and role' : '',
    tags: tags.length === 0 ? 'Please add at least one tag to describe your current interests' : ''
  })

  const errors = getErrors()

  const handleSubmit = () => {
    if (!isValid()) {
      setShowErrors(true)
      return
    }

    updateLifeStory('current', {
      organizations: organizations.filter(o => o.name.trim()),
      travelCities,
      tags
    })
    setShowSubmitPopup(true)
  }

  const handlePopupClose = () => {
    setShowSubmitPopup(false)
    completeLifeStory()
  }

  const isTextInput = storyData.inputMethod === 'text'

  return (
    <div className="onboarding-form">
      <div className="form-header">
        <div className="story-header-icon">{story.icon}</div>
        <h1 className="form-title">Current Life</h1>
        <p className="form-subtitle">{isTextInput ? 'Add your details below' : 'Review and edit the information below'}</p>
      </div>

      {/* Current Organizations */}
      <div className="confirm-section">
        <h3 className="section-title-bold">Current Organizations</h3>
        {showErrors && errors.organizations && (
          <p className="field-error section-error">{errors.organizations}</p>
        )}
        {organizations.map((org, idx) => (
          <div key={idx} className="entry-card">
            <div className="entry-fields">
              <div className="input-group">
                <label className="input-label small">
                  Name <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  className={`input-field ${showErrors && errors.organizations && !org.name.trim() ? 'input-error' : ''}`}
                  placeholder="Organization name"
                  value={org.name}
                  onChange={(e) => updateOrganization(idx, 'name', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label small">
                  Role <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  className={`input-field ${showErrors && errors.organizations && !org.role.trim() ? 'input-error' : ''}`}
                  placeholder="Your role"
                  value={org.role}
                  onChange={(e) => updateOrganization(idx, 'role', e.target.value)}
                />
              </div>
            </div>
            {organizations.length > 1 && (
              <button type="button" className="entry-remove-btn" onClick={() => removeOrganization(idx)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            )}
          </div>
        ))}
        <button type="button" className="add-entry-btn-dashed" onClick={addOrganization}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Organization
        </button>
      </div>

      {/* Frequent Travel Cities */}
      <div className="confirm-section">
        <label className="input-label">
          Frequent Travel Cities
        </label>
        {travelCities.length > 0 && (
          <div className="tags-container">
            {travelCities.map((city, idx) => (
              <span key={idx} className="tag tag-location">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {city}
                <button type="button" className="tag-remove" onClick={() => removeTravelCity(idx)}>×</button>
              </span>
            ))}
          </div>
        )}
        <input
          type="text"
          className="input-field"
          placeholder="Add a city and press Enter"
          value={newTravelCity}
          onChange={(e) => setNewTravelCity(e.target.value)}
          onKeyPress={handleTravelCityKeyPress}
        />
      </div>

      {/* Current Life Tags */}
      <div className="confirm-section">
        <label className="input-label">
          Current Life Tags <span className="required-asterisk">*</span>
        </label>
        <p className="field-hint">Max {maxTags} tags</p>
        {tags.length > 0 && (
          <div className="tags-container">
            {tags.map((tag, idx) => (
              <span key={idx} className="tag">
                {tag}
                <button type="button" className="tag-remove" onClick={() => removeTag(idx)}>×</button>
              </span>
            ))}
          </div>
        )}
        <input
          type="text"
          className={`input-field ${showErrors && errors.tags ? 'input-error' : ''}`}
          placeholder="Add a tag and press Enter"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyPress={handleTagKeyPress}
          disabled={tags.length >= maxTags}
        />
        {showErrors && errors.tags && (
          <p className="field-error">{errors.tags}</p>
        )}
        <p className={`tag-counter ${tags.length >= maxTags ? 'at-limit' : ''}`}>
          {tags.length} / {maxTags} tags
        </p>
      </div>

      <button className="btn-primary btn-with-icon" onClick={handleSubmit}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
        Submit for Review
      </button>

      {/* Submit Popup */}
      {showSubmitPopup && (
        <div className="popup-overlay" onClick={handlePopupClose}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h2 className="popup-title">Thank You!</h2>
            <p className="popup-message">
              Your Current Life story has been submitted for review. Our admin team will review your submission and get back to you soon.
            </p>
            <button className="btn-primary" onClick={handlePopupClose}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default LifeStoryCurrentConfirm2
