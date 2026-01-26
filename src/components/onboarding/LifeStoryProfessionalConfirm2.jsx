import { useState } from 'react'
import { useOnboarding, lifeStoryPrompts } from '../../context/OnboardingContext'

function LifeStoryProfessionalConfirm2() {
  const { profileData, updateLifeStory, completeLifeStory } = useOnboarding()
  const storyData = profileData.lifeStories.professional
  const story = lifeStoryPrompts.professional

  // Local state
  const [subsequentJobs, setSubsequentJobs] = useState(
    storyData.subsequentJobs.length > 0
      ? storyData.subsequentJobs.map(job => ({
          ...job,
          newTitle: ''
        }))
      : [{ company: '', titles: [], newTitle: '' }]
  )
  const [tags, setTags] = useState(storyData.tags || storyData.skills || [])
  const [newTag, setNewTag] = useState('')
  const [showSubmitPopup, setShowSubmitPopup] = useState(false)
  const [showErrors, setShowErrors] = useState(false)

  const maxTags = 15

  // Subsequent Jobs handlers
  const updateSubsequentJob = (index, field, value) => {
    const updated = [...subsequentJobs]
    updated[index][field] = value
    setSubsequentJobs(updated)
  }

  const addSubsequentJobTitle = (jobIndex) => {
    const job = subsequentJobs[jobIndex]
    if (job.newTitle && job.newTitle.trim()) {
      const updated = [...subsequentJobs]
      updated[jobIndex].titles = [...(updated[jobIndex].titles || []), job.newTitle.trim()]
      updated[jobIndex].newTitle = ''
      setSubsequentJobs(updated)
    }
  }

  const removeSubsequentJobTitle = (jobIndex, titleIndex) => {
    const updated = [...subsequentJobs]
    updated[jobIndex].titles = updated[jobIndex].titles.filter((_, i) => i !== titleIndex)
    setSubsequentJobs(updated)
  }

  const handleSubsequentTitleKeyPress = (e, jobIndex) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSubsequentJobTitle(jobIndex)
    }
  }

  const addSubsequentJob = () => {
    setSubsequentJobs([...subsequentJobs, { company: '', titles: [], newTitle: '' }])
  }

  const removeSubsequentJob = (index) => {
    if (subsequentJobs.length > 1) {
      setSubsequentJobs(subsequentJobs.filter((_, i) => i !== index))
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
    // At least one tag required
    if (tags.length === 0) return false
    return true
  }

  // Individual field error checks
  const getErrors = () => ({
    tags: tags.length === 0 ? 'Please add at least one tag to describe your professional skills' : ''
  })

  const errors = getErrors()

  const handleSubmit = () => {
    if (!isValid()) {
      setShowErrors(true)
      return
    }

    updateLifeStory('professional', {
      subsequentJobs: subsequentJobs
        .filter(j => j.company.trim())
        .map(j => ({
          company: j.company,
          titles: j.titles || []
        })),
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
        <h1 className="form-title">Mid/Professional Life</h1>
        <p className="form-subtitle">{isTextInput ? 'Add your details below' : 'Review and edit the information below'}</p>
      </div>

      {/* Subsequent Jobs */}
      <div className="confirm-section">
        <h3 className="section-title-bold">Subsequent Jobs</h3>
        {subsequentJobs.map((job, jobIdx) => (
          <div key={jobIdx} className="entry-card">
            <div className="entry-fields">
              <div className="input-group">
                <label className="input-label small">Company Name</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="eg: Google, Facebook, etc"
                  value={job.company}
                  onChange={(e) => updateSubsequentJob(jobIdx, 'company', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label small">Job Titles</label>
                {(job.titles || []).length > 0 && (
                  <div className="tags-container">
                    {(job.titles || []).map((title, titleIdx) => (
                      <span key={titleIdx} className="tag">
                        {title}
                        <button type="button" className="tag-remove" onClick={() => removeSubsequentJobTitle(jobIdx, titleIdx)}>×</button>
                      </span>
                    ))}
                  </div>
                )}
                <input
                  type="text"
                  className="input-field"
                  placeholder="Add a title (eg: Analyst, Director, etc..) and press Enter"
                  value={job.newTitle || ''}
                  onChange={(e) => updateSubsequentJob(jobIdx, 'newTitle', e.target.value)}
                  onKeyPress={(e) => handleSubsequentTitleKeyPress(e, jobIdx)}
                />
              </div>
            </div>
            {subsequentJobs.length > 1 && (
              <button type="button" className="entry-remove-btn" onClick={() => removeSubsequentJob(jobIdx)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            )}
          </div>
        ))}
        <button type="button" className="add-entry-btn-dashed" onClick={addSubsequentJob}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Another Job
        </button>
      </div>

      {/* Professional Life Tags */}
      <div className="confirm-section">
        <label className="input-label">
          Professional Life Tags <span className="required-asterisk">*</span>
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
              Your Mid/Professional Life story has been submitted for review. Our admin team will review your submission and get back to you soon.
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

export default LifeStoryProfessionalConfirm2
