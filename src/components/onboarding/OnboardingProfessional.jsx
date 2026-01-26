import { useState } from 'react'
import { useOnboarding } from '../../context/OnboardingContext'
import OnboardingLayout from './OnboardingLayout'

function OnboardingProfessional() {
  const { profileData, updateProfileData, nextStep } = useOnboarding()
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    updateProfileData({ [name]: value })

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const validateAndNext = () => {
    const newErrors = {}

    if (!profileData.currentOrganization?.trim()) {
      newErrors.currentOrganization = 'Organization is required'
    }
    if (!profileData.currentRole?.trim()) {
      newErrors.currentRole = 'Role is required'
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
          <h1 className="form-title">What do you do?</h1>
          <p className="form-subtitle">Tell us about your professional life</p>
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="currentOrganization">Current Organization *</label>
          <div className={`input-with-icon-inline ${errors.currentOrganization ? 'input-error' : ''}`}>
            <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            <input
              type="text"
              id="currentOrganization"
              name="currentOrganization"
              className="input-field input-field-icon"
              placeholder="Company or organization name"
              value={profileData.currentOrganization}
              onChange={handleChange}
            />
          </div>
          {errors.currentOrganization && <span className="error-text">{errors.currentOrganization}</span>}
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="currentRole">Current Role *</label>
          <div className={`input-with-icon-inline ${errors.currentRole ? 'input-error' : ''}`}>
            <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            <input
              type="text"
              id="currentRole"
              name="currentRole"
              className="input-field input-field-icon"
              placeholder="e.g., Founder & CEO"
              value={profileData.currentRole}
              onChange={handleChange}
            />
          </div>
          {errors.currentRole && <span className="error-text">{errors.currentRole}</span>}
        </div>

        <button className="btn-primary" onClick={validateAndNext}>
          Continue
        </button>
      </div>
    </OnboardingLayout>
  )
}

export default OnboardingProfessional
