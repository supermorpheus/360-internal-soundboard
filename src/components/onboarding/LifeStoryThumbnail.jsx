import { useState, useRef, useEffect } from 'react'
import { useOnboarding, lifeStoryPrompts } from '../../context/OnboardingContext'

function LifeStoryThumbnail({ storyKey }) {
  const { profileData, updateLifeStory, goToConfirmation } = useOnboarding()
  const storyData = profileData.lifeStories[storyKey]
  const story = lifeStoryPrompts[storyKey]

  const [selectedThumbnail, setSelectedThumbnail] = useState(0)
  const [customThumbnail, setCustomThumbnail] = useState(null)
  const [customThumbnailPreview, setCustomThumbnailPreview] = useState(null)
  const [generatedThumbnails, setGeneratedThumbnails] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)

  // Generate thumbnails from video
  const generateThumbnails = () => {
    if (storyData.videoUrl && videoRef.current) {
      setIsGenerating(true)
      const video = videoRef.current
      video.src = storyData.videoUrl

      video.onloadeddata = () => {
        const duration = video.duration
        // Use random offsets for refresh functionality
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
              setSelectedThumbnail(0)
            }
          }
        })
      }
    }
  }

  useEffect(() => {
    generateThumbnails()
  }, [storyData.videoUrl])

  const handleRefresh = () => {
    generateThumbnails()
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setCustomThumbnail(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setCustomThumbnailPreview(reader.result)
        setSelectedThumbnail('custom')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleContinue = () => {
    // Save selected thumbnail
    const thumbnailData = selectedThumbnail === 'custom'
      ? customThumbnailPreview
      : generatedThumbnails[selectedThumbnail] || null

    updateLifeStory(storyKey, { thumbnail: thumbnailData })
    goToConfirmation()
  }

  // For audio or text, skip directly to confirmation
  if (storyData.inputMethod === 'audio' || storyData.inputMethod === 'text') {
    goToConfirmation()
    return null
  }

  return (
    <div className="onboarding-form thumbnail-screen">
      <video ref={videoRef} style={{ display: 'none' }} />

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

        <div className="thumbnail-grid">
          {generatedThumbnails.length > 0 ? (
            generatedThumbnails.map((thumb, index) => (
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
            // Placeholder thumbnails while loading
            [0, 1, 2, 3].map((index) => (
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

        {/* Custom thumbnail preview */}
        {customThumbnailPreview && (
          <>
            <div className="thumbnail-divider">
              <span>Custom Upload</span>
            </div>
            <button
              type="button"
              className={`custom-thumbnail-preview ${selectedThumbnail === 'custom' ? 'selected' : ''}`}
              onClick={() => setSelectedThumbnail('custom')}
            >
              <img src={customThumbnailPreview} alt="Custom thumbnail" />
              {selectedThumbnail === 'custom' && (
                <div className="thumbnail-selected-badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
              )}
              <button
                type="button"
                className="change-thumbnail-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  fileInputRef.current?.click()
                }}
              >
                Change
              </button>
            </button>
          </>
        )}
      </div>

      <button className="btn-primary" onClick={handleContinue}>
        Continue
      </button>
    </div>
  )
}

export default LifeStoryThumbnail
