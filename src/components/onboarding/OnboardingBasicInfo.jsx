import { useState, useRef } from 'react'
import { useOnboarding } from '../../context/OnboardingContext'
import OnboardingLayout from './OnboardingLayout'

function OnboardingBasicInfo() {
  const { profileData, updateProfileData, nextStep } = useOnboarding()
  const [errors, setErrors] = useState({})
  const fileInputRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    updateProfileData({ [name]: value })

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click()
  }

  const handleProfilePictureChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      updateProfileData({
        profilePicture: file,
        profilePicturePreview: previewUrl
      })
    }
  }

  const getInitials = () => {
    const first = profileData.firstName?.charAt(0) || ''
    const last = profileData.lastName?.charAt(0) || ''
    return (first + last).toUpperCase() || 'YA'
  }

  const validateAndNext = () => {
    const newErrors = {}

    if (!profileData.firstName?.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!profileData.lastName?.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    nextStep()
  }

  return (
    <OnboardingLayout>
      <div className="onboarding-form">
        <div className="form-header">
          <h1 className="form-title">Basic Information</h1>
        </div>

        {/* Profile Picture */}
        <div className="profile-picture-section">
          <label className="input-label centered-label">Profile Picture *</label>
          <div
            className="profile-picture-upload"
            onClick={handleProfilePictureClick}
          >
            {profileData.profilePicturePreview ? (
              <img
                src={profileData.profilePicturePreview}
                alt="Profile"
                className="profile-picture-preview"
              />
            ) : (
              <div className="profile-picture-placeholder">
                <span className="profile-upload-text">Click to upload</span>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* Name Fields */}
        <div className="input-group">
          <label className="input-label" htmlFor="firstName">First Name *</label>
          <div className={`input-with-icon-inline ${errors.firstName ? 'input-error' : ''}`}>
            <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="input-field input-field-icon"
              placeholder="e.g., John"
              value={profileData.firstName}
              onChange={handleChange}
            />
          </div>
          {errors.firstName && <span className="error-text">{errors.firstName}</span>}
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="middleName">Middle Name</label>
          <div className="input-with-icon-inline">
            <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <input
              type="text"
              id="middleName"
              name="middleName"
              className="input-field input-field-icon"
              placeholder="e.g., Fitzgerald"
              value={profileData.middleName || ''}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="lastName">Last Name *</label>
          <div className={`input-with-icon-inline ${errors.lastName ? 'input-error' : ''}`}>
            <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="input-field input-field-icon"
              placeholder="e.g., Kennedy"
              value={profileData.lastName}
              onChange={handleChange}
            />
          </div>
          {errors.lastName && <span className="error-text">{errors.lastName}</span>}
        </div>

        <button className="btn-primary" onClick={validateAndNext}>
          Continue
        </button>
      </div>
    </OnboardingLayout>
  )
}

export default OnboardingBasicInfo
