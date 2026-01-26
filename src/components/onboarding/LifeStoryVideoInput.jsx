import { useState, useRef, useEffect } from 'react'
import { useOnboarding, lifeStoryPrompts } from '../../context/OnboardingContext'

function LifeStoryVideoInput({ storyKey }) {
  const { profileData, updateLifeStory, goToUploadComplete } = useOnboarding()
  const storyData = profileData.lifeStories[storyKey]
  const story = lifeStoryPrompts[storyKey]

  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [videoUrl, setVideoUrl] = useState(storyData.videoUrl || null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [showPrompts, setShowPrompts] = useState(false)
  const [showSavePopup, setShowSavePopup] = useState(false)
  const videoRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const timerRef = useRef(null)
  const streamRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      streamRef.current = stream
      videoRef.current.srcObject = stream
      videoRef.current.play()

      mediaRecorderRef.current = new MediaRecorder(stream)
      chunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' })
        const url = URL.createObjectURL(blob)
        setVideoUrl(url)
        updateLifeStory(storyKey, { videoBlob: blob, videoUrl: url })

        // Stop all tracks
        stream.getTracks().forEach(track => track.stop())
        streamRef.current = null
        videoRef.current.srcObject = null
        videoRef.current.src = url
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
      setIsPaused(false)
      setRecordingTime(0)

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    } catch (err) {
      console.error('Error accessing camera:', err)
      alert('Unable to access camera. Please ensure you have granted camera permissions.')
    }
  }

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording && !isPaused) {
      mediaRecorderRef.current.pause()
      setIsPaused(true)
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isRecording && isPaused) {
      mediaRecorderRef.current.resume()
      setIsPaused(false)
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setIsPaused(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }

  const retakeVideo = () => {
    setVideoUrl(null)
    setRecordingTime(0)
    updateLifeStory(storyKey, { videoBlob: null, videoUrl: null })
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file)
      setVideoUrl(url)
      updateLifeStory(storyKey, { videoBlob: file, videoUrl: url })
      if (videoRef.current) {
        videoRef.current.src = url
      }
    }
  }

  const handleSave = () => {
    if (videoUrl) {
      setShowSavePopup(true)
    }
  }

  const handlePopupContinue = () => {
    setShowSavePopup(false)
    goToUploadComplete()
  }

  const renderPromptList = () => {
    if (story.sections) {
      return story.sections.map((section, idx) => (
        <div key={idx} className="prompt-section">
          <p className="prompt-section-title"><strong>{section.title}:</strong></p>
          <ul>
            {section.prompts.map((prompt, pIdx) => (
              <li key={pIdx}>{prompt}</li>
            ))}
          </ul>
        </div>
      ))
    }

    return (
      <>
        {story.introText && (
          <p className="prompt-intro-text">{story.introText}</p>
        )}
        <ul>
          {story.prompts.map((prompt, idx) => (
            <li key={idx}>{prompt}</li>
          ))}
        </ul>
        {story.highlightText && (
          <p className="prompt-highlight-text"><u>{story.highlightText}</u></p>
        )}
      </>
    )
  }

  return (
    <div className="onboarding-form">
      <div className="form-header">
        <div className="story-header-icon">{story.icon}</div>
        <h1 className="form-title">Record Your Video</h1>
        <p className="form-subtitle">{story.subtitle}</p>
      </div>

      <div className="video-recording-section">
        <div className="video-container">
          <video
            ref={videoRef}
            className="video-preview"
            playsInline
            muted={isRecording}
            controls={!isRecording && videoUrl}
          />
          {!videoUrl && !isRecording && (
            <div className="video-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M23 7l-7 5 7 5V7z"/>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
              </svg>
              <span>Ready to Record</span>
            </div>
          )}

          {/* Info button for prompts */}
          <button
            type="button"
            className="info-prompts-btn"
            onClick={() => setShowPrompts(true)}
            title="View prompts"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
          </button>

          {/* Recording duration overlay */}
          {isRecording && (
            <div className="recording-duration-overlay">
              <span className="recording-indicator-dot"></span>
              <span className="recording-duration-text">{formatTime(recordingTime)}</span>
              {isPaused && <span className="paused-label">PAUSED</span>}
            </div>
          )}
        </div>

        <div className="video-controls">
          {!videoUrl ? (
            <>
              {!isRecording ? (
                <button type="button" className="btn-record" onClick={startRecording}>
                  <span className="record-dot"></span>
                  Start Recording
                </button>
              ) : (
                <div className="recording-control-buttons">
                  {!isPaused ? (
                    <button type="button" className="btn-pause-record" onClick={pauseRecording}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16"/>
                        <rect x="14" y="4" width="4" height="16"/>
                      </svg>
                      Pause
                    </button>
                  ) : (
                    <button type="button" className="btn-resume-record" onClick={resumeRecording}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                      </svg>
                      Resume
                    </button>
                  )}
                  <button type="button" className="btn-stop-record" onClick={stopRecording}>
                    <span className="stop-square"></span>
                    Stop
                  </button>
                </div>
              )}
            </>
          ) : (
            <button type="button" className="btn-retake" onClick={retakeVideo}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 4v6h-6M1 20v-6h6"/>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
              </svg>
              Retake Video
            </button>
          )}
        </div>

        <div className="video-tips">
          <p>Find a quiet, well-lit space for best results.</p>
        </div>
      </div>

      {/* Upload from device option */}
      {!videoUrl && !isRecording && (
        <>
          <div className="upload-divider">
            <span>or</span>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept="video/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          <button
            type="button"
            className="btn-upload-file"
            onClick={() => fileInputRef.current?.click()}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Upload Video from Device
          </button>
        </>
      )}

      <button className="btn-primary" onClick={handleSave} disabled={!videoUrl}>
        Submit
      </button>

      {/* Prompts Popup */}
      {showPrompts && (
        <div className="popup-overlay" onClick={() => setShowPrompts(false)}>
          <div className="popup-content prompts-popup" onClick={(e) => e.stopPropagation()}>
            <div className="prompts-popup-header">
              <h3>What you can talk about</h3>
              <button
                type="button"
                className="popup-close-btn"
                onClick={() => setShowPrompts(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="prompts-popup-content">
              {renderPromptList()}
            </div>
            <button className="btn-primary" onClick={() => setShowPrompts(false)}>
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Save Confirmation Popup */}
      {showSavePopup && (
        <div className="popup-overlay">
          <div className="popup-content save-warning-popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-icon warning-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <h2 className="popup-title">Important Note</h2>
            <p className="popup-message">
              Your video will be visible on your profile once uploaded. Please do not navigate away from this tab while your video is being uploaded and processed.
            </p>
            <button className="btn-primary" onClick={handlePopupContinue}>
              I Understand, Continue
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default LifeStoryVideoInput
