import { useState } from 'react'
import { useOnboarding } from '../../context/OnboardingContext'
import OnboardingLayout from './OnboardingLayout'

function OnboardingLocation() {
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

    if (!profileData.livesIn?.trim()) {
      newErrors.livesIn = 'Location is required'
    }
    if (!profileData.pincode?.trim()) {
      newErrors.pincode = 'Pincode is required'
    } else if (!/^\d{6}$/.test(profileData.pincode.trim())) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode'
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
          <h1 className="form-title">Where do you live?</h1>
          <p className="form-subtitle">Help members near you connect</p>
        </div>

        {/* Lives In */}
        <div className="input-group">
          <label className="input-label" htmlFor="livesIn">Lives in *</label>
          <div className={`input-with-icon-inline ${errors.livesIn ? 'input-error' : ''}`}>
            <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <input
              type="text"
              id="livesIn"
              name="livesIn"
              className="input-field input-field-icon"
              placeholder="e.g., Bengaluru, India"
              value={profileData.livesIn || ''}
              onChange={handleChange}
            />
          </div>
          {errors.livesIn && <span className="error-text">{errors.livesIn}</span>}
        </div>

        {/* Pincode */}
        <div className="input-group">
          <label className="input-label" htmlFor="pincode">Pincode *</label>
          <div className={`input-with-icon-inline ${errors.pincode ? 'input-error' : ''}`}>
            <span className="field-icon hash-icon">#</span>
            <input
              type="text"
              id="pincode"
              name="pincode"
              className="input-field input-field-icon"
              placeholder="e.g., 560001"
              value={profileData.pincode || ''}
              onChange={handleChange}
              maxLength={6}
            />
          </div>
          {errors.pincode && <span className="error-text">{errors.pincode}</span>}
        </div>

        {/* Locality */}
        <div className="input-group">
          <label className="input-label" htmlFor="locality">Locality / Area</label>
          <div className="input-with-icon-inline">
            <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <input
              type="text"
              id="locality"
              name="locality"
              className="input-field input-field-icon"
              placeholder="e.g., Whitefield/Kormangala/Sector 23 Dwarka"
              value={profileData.locality || ''}
              onChange={handleChange}
            />
          </div>
        </div>

        <button className="btn-primary" onClick={validateAndNext}>
          Continue
        </button>
      </div>
    </OnboardingLayout>
  )
}

export default OnboardingLocation
