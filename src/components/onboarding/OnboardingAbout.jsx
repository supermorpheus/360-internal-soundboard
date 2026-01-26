import { useState } from 'react'
import { useOnboarding } from '../../context/OnboardingContext'
import OnboardingLayout from './OnboardingLayout'

function OnboardingAbout() {
  const { profileData, updateProfileData, nextStep } = useOnboarding()
  const [errors, setErrors] = useState({})

  const MAX_WORDS = 100

  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    // Word limit for introduction
    if (name === 'introduction') {
      const wordCount = countWords(value)
      if (wordCount > MAX_WORDS) {
        return // Don't update if over limit
      }
    }

    updateProfileData({ [name]: value })

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const validateAndNext = () => {
    const newErrors = {}

    if (!profileData.introduction?.trim()) {
      newErrors.introduction = 'Introduction is required'
    }
    if (!profileData.livesIn?.trim()) {
      newErrors.livesIn = 'Location is required'
    }
    if (!profileData.pincode?.trim()) {
      newErrors.pincode = 'Pincode is required'
    } else if (!/^\d{6}$/.test(profileData.pincode.trim())) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode'
    }
    if (!profileData.joyOutsideWork?.trim()) {
      newErrors.joyOutsideWork = 'This field is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    nextStep()
  }

  const wordCount = countWords(profileData.introduction || '')

  return (
    <OnboardingLayout>
      <div className="onboarding-form">
        <div className="form-header">
          <h1 className="form-title">About</h1>
        </div>

        {/* Introduction */}
        <div className="input-group">
          <label className="input-label" htmlFor="introduction">Introduction *</label>
          <div className={`input-field-with-icon textarea-field ${errors.introduction ? 'input-error' : ''}`}>
            <span className="input-icon intro-icon">📝</span>
            <textarea
              id="introduction"
              name="introduction"
              className="input-naked"
              placeholder="Your introduction in 4-5 sentences or 100 words."
              value={profileData.introduction}
              onChange={handleChange}
              rows={5}
            />
          </div>
          <div className="word-counter-row">
            <span className={`word-counter ${wordCount >= MAX_WORDS ? 'limit-reached' : ''}`}>
              {wordCount} / {MAX_WORDS} words
            </span>
          </div>
          {errors.introduction && <span className="error-text">{errors.introduction}</span>}
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

        {/* Joy Outside Work */}
        <div className="input-group">
          <label className="input-label" htmlFor="joyOutsideWork">What fills you with joy, outside your work? *</label>
          <div className={`input-field-with-icon textarea-field ${errors.joyOutsideWork ? 'input-error' : ''}`}>
            <span className="input-icon joy-icon">☺</span>
            <textarea
              id="joyOutsideWork"
              name="joyOutsideWork"
              className="input-naked"
              placeholder="Keep this short and concise not more than 2 lines."
              value={profileData.joyOutsideWork || ''}
              onChange={handleChange}
              rows={4}
            />
          </div>
          {errors.joyOutsideWork && <span className="error-text">{errors.joyOutsideWork}</span>}
        </div>

        {/* Continue Button */}
        <button className="btn-primary" onClick={validateAndNext}>
          Continue
        </button>
      </div>
    </OnboardingLayout>
  )
}

export default OnboardingAbout
