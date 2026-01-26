import { useState, useRef, useEffect } from 'react'
import { useOnboarding, lifeStoryPrompts } from '../../context/OnboardingContext'

function LifeStoryEarlyConfirm1() {
  const { profileData, updateLifeStory, goToConfirm2 } = useOnboarding()
  const storyData = profileData.lifeStories.earlyLife
  const story = lifeStoryPrompts.earlyLife

  // Local state
  const [selectedThumbnail, setSelectedThumbnail] = useState(0)
  const [customThumbnailPreview, setCustomThumbnailPreview] = useState(storyData.thumbnail || null)
  const [generatedThumbnails, setGeneratedThumbnails] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [summary, setSummary] = useState(storyData.summary || storyData.text || '')
  const [bornIn, setBornIn] = useState(storyData.bornIn || '')
  const [hometown, setHometown] = useState(storyData.hometown || '')
  const [schools, setSchools] = useState(
    storyData.schools.length > 0 ? storyData.schools : [{ name: '', location: '' }]
  )
  const [showErrors, setShowErrors] = useState(false)

  const fileInputRef = useRef(null)
  const videoRef = useRef(null)

  // Word count helper
  const getWordCount = (text) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0
  }

  const wordCount = getWordCount(summary)
  const maxWords = 100

  // Handle summary change with word limit
  const handleSummaryChange = (e) => {
    const text = e.target.value
    const words = text.trim().split(/\s+/)
    if (words.length <= maxWords || text.length < summary.length) {
      setSummary(text)
    }
  }

  // Generate thumbnails from video
  const generateThumbnails = () => {
    if (storyData.videoUrl && videoRef.current) {
      setIsGenerating(true)
      const video = videoRef.current
      video.src = storyData.videoUrl

      video.onloadeddata = () => {
        const duration = video.duration
        const offsets = [
          Math.random() * 0.2,
          0.2 + Math.random() * 0.2,
          0.4 + Math.random() * 0.2,
          0.6 + Math.random() * 0.3
        ]
        const timestamps = offsets.map(t => t * duration)
        const thumbnails = []

        const canvas = document.createElement('canvas')
        canvas.width = 320
        canvas.height = 180
        const ctx = canvas.getContext('2d')

        let loadedCount = 0

        timestamps.forEach((time, index) => {
          video.currentTime = time
          video.onseeked = () => {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
            thumbnails[index] = canvas.toDataURL('image/jpeg')
            loadedCount++

            if (loadedCount === timestamps.length) {
              setGeneratedThumbnails(thumbnails)
              setIsGenerating(false)
            }
          }
        })
      }
    }
  }

  useEffect(() => {
    if (storyData.videoUrl) {
      generateThumbnails()
    }
  }, [storyData.videoUrl])

  // Initialize with existing thumbnail
  useEffect(() => {
    if (storyData.thumbnail && !generatedThumbnails.includes(storyData.thumbnail)) {
      setCustomThumbnailPreview(storyData.thumbnail)
      setSelectedThumbnail('custom')
    }
  }, [storyData.thumbnail])

  const handleRefresh = () => {
    generateThumbnails()
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCustomThumbnailPreview(reader.result)
        setSelectedThumbnail('custom')
      }
      reader.readAsDataURL(file)
    }
  }

  // School handlers
  const updateSchool = (index, field, value) => {
    const updated = [...schools]
    updated[index][field] = value
    setSchools(updated)
  }

  const addSchool = () => {
    setSchools([...schools, { name: '', location: '' }])
  }

  const removeSchool = (index) => {
    if (schools.length > 1) {
      setSchools(schools.filter((_, i) => i !== index))
    }
  }

  // Validation check
  const isValid = () => {
    if (!summary.trim()) return false
    if (!bornIn.trim()) return false
    if (!hometown.trim()) return false
    // At least one school with name and location
    const validSchools = schools.filter(s => s.name.trim() && s.location.trim())
    if (validSchools.length === 0) return false
    return true
  }

  // Individual field error checks
  const getErrors = () => ({
    summary: !summary.trim() ? 'Please share a brief summary of your early life' : '',
    bornIn: !bornIn.trim() ? 'Please enter the city where you were born' : '',
    hometown: !hometown.trim() ? 'Please enter your hometown' : '',
    schools: schools.filter(s => s.name.trim() && s.location.trim()).length === 0
      ? 'Please add at least one school with name and location' : ''
  })

  const errors = getErrors()

  const handleContinue = () => {
    if (!isValid()) {
      setShowErrors(true)
      return
    }

    // Save thumbnail
    const thumbnailData = selectedThumbnail === 'custom'
      ? customThumbnailPreview
      : generatedThumbnails[selectedThumbnail] || storyData.thumbnail

    updateLifeStory('earlyLife', {
      thumbnail: thumbnailData,
      summary,
      bornIn,
      hometown,
      schools: schools.filter(s => s.name.trim())
    })
    goToConfirm2()
  }

  const hasVideo = storyData.videoUrl && storyData.inputMethod === 'video'
  const isTextInput = storyData.inputMethod === 'text'

  return (
    <div className="onboarding-form">
      <div className="form-header">
        <div className="story-header-icon">{story.icon}</div>
        <h1 className="form-title">Early Life</h1>
        <p className="form-subtitle">{isTextInput ? 'Add your details below' : 'Review and edit the information below'}</p>
      </div>

      {/* Thumbnail Selection - Only for video */}
      {hasVideo && (
        <div className="thumbnail-section-card">
          <div className="thumbnail-section-header">
            <h2 className="thumbnail-section-title">Thumbnail Selection</h2>
            <div className="thumbnail-header-actions">
              <button
                type="button"
                className="thumbnail-action-btn"
                onClick={handleRefresh}
                disabled={isGenerating}
                title="Refresh thumbnails"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isGenerating ? 'spin' : ''}>
                  <path d="M23 4v6h-6M1 20v-6h6"/>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                </svg>
              </button>
              <button
                type="button"
                className="thumbnail-action-btn"
                onClick={() => fileInputRef.current?.click()}
                title="Upload custom thumbnail"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </button>
            </div>
          </div>

          <p className="thumbnail-section-description">
            These thumbnails are automatically generated from your video. You can select one, upload a custom thumbnail, or refresh to generate new options.
          </p>

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          <video ref={videoRef} style={{ display: 'none' }} />

          <div className="thumbnail-grid thumbnail-grid-small">
            {generatedThumbnails.length > 0 ? (
              generatedThumbnails.slice(0, 2).map((thumb, index) => (
                <button
                  key={index}
                  type="button"
                  className={`thumbnail-option ${selectedThumbnail === index ? 'selected' : ''}`}
                  onClick={() => setSelectedThumbnail(index)}
                >
                  <img src={thumb} alt={`Thumbnail ${index + 1}`} />
                  {selectedThumbnail === index && (
                    <div className="thumbnail-selected-badge">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                  )}
                </button>
              ))
            ) : (
              [0, 1].map((index) => (
                <div key={index} className="thumbnail-option placeholder">
                  <div className="thumbnail-loading">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="spin">
                      <line x1="12" y1="2" x2="12" y2="6"/>
                      <line x1="12" y1="18" x2="12" y2="22"/>
                      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
                      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
                      <line x1="2" y1="12" x2="6" y2="12"/>
                      <line x1="18" y1="12" x2="22" y2="12"/>
                      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
                      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
                    </svg>
                  </div>
                </div>
              ))
            )}
          </div>

          {customThumbnailPreview && selectedThumbnail === 'custom' && (
            <div className="custom-thumbnail-inline">
              <img src={customThumbnailPreview} alt="Custom thumbnail" className="custom-thumb-preview" />
              <div className="thumbnail-selected-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Early Life Summary */}
      <div className="confirm-section">
        <label className="input-label">
          Early Life Summary <span className="required-asterisk">*</span>
        </label>
        <p className="field-hint">Max {maxWords} words</p>
        <textarea
          className={`input-field textarea-field ${showErrors && errors.summary ? 'input-error' : ''}`}
          placeholder="A brief summary of your early life..."
          value={summary}
          onChange={handleSummaryChange}
          rows={4}
        />
        {showErrors && errors.summary && (
          <p className="field-error">{errors.summary}</p>
        )}
        <p className={`word-counter ${wordCount > maxWords ? 'over-limit' : ''}`}>
          {wordCount} / {maxWords} words
        </p>
      </div>

      {/* Born In */}
      <div className="confirm-section">
        <label className="input-label">
          Born in <span className="required-asterisk">*</span>
        </label>
        <input
          type="text"
          className={`input-field ${showErrors && errors.bornIn ? 'input-error' : ''}`}
          placeholder="City where you were born"
          value={bornIn}
          onChange={(e) => setBornIn(e.target.value)}
        />
        {showErrors && errors.bornIn && (
          <p className="field-error">{errors.bornIn}</p>
        )}
      </div>

      {/* Hometown */}
      <div className="confirm-section">
        <label className="input-label">
          Hometown <span className="required-asterisk">*</span>
        </label>
        <input
          type="text"
          className={`input-field ${showErrors && errors.hometown ? 'input-error' : ''}`}
          placeholder="Your hometown"
          value={hometown}
          onChange={(e) => setHometown(e.target.value)}
        />
        {showErrors && errors.hometown && (
          <p className="field-error">{errors.hometown}</p>
        )}
      </div>

      {/* Schools */}
      <div className="confirm-section">
        <h3 className="section-title-bold">Schools</h3>
        {showErrors && errors.schools && (
          <p className="field-error section-error">{errors.schools}</p>
        )}
        {schools.map((school, idx) => (
          <div key={idx} className="entry-card">
            <div className="entry-fields">
              <div className="input-group">
                <label className="input-label small">
                  Name <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  className={`input-field ${showErrors && errors.schools && !school.name.trim() ? 'input-error' : ''}`}
                  placeholder="School name"
                  value={school.name}
                  onChange={(e) => updateSchool(idx, 'name', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label small">
                  Location <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  className={`input-field ${showErrors && errors.schools && !school.location.trim() ? 'input-error' : ''}`}
                  placeholder="Location"
                  value={school.location}
                  onChange={(e) => updateSchool(idx, 'location', e.target.value)}
                />
              </div>
            </div>
            {schools.length > 1 && (
              <button type="button" className="entry-remove-btn" onClick={() => removeSchool(idx)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            )}
          </div>
        ))}
        <button type="button" className="add-entry-btn-dashed" onClick={addSchool}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add School
        </button>
      </div>

      <button className="btn-primary" onClick={handleContinue}>
        Continue
      </button>
    </div>
  )
}

export default LifeStoryEarlyConfirm1
