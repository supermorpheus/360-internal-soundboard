import { useEffect, useState } from 'react'
import { useOnboarding, lifeStoryPrompts } from '../../context/OnboardingContext'

function LifeStoryProcessing({ storyKey }) {
  const { goToThumbnail } = useOnboarding()
  const story = lifeStoryPrompts[storyKey]
  const [progress, setProgress] = useState(0)

  const storyTitles = {
    earlyLife: 'Early Life',
    professional: 'Mid/Professional Life',
    current: 'Current Life'
  }

  // Simulate processing with auto-redirect
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 100)

    // Auto redirect after processing completes
    const timeout = setTimeout(() => {
      goToThumbnail()
    }, 5500) // 5.5 seconds to allow progress bar to complete

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [goToThumbnail])

  return (
    <div className="onboarding-form processing-screen">
      <div className="processing-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="clock-icon">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      </div>

      <h1 className="processing-title">Processing Your {storyTitles[storyKey]}</h1>

      <p className="processing-message">
        We're extracting information from your video / audio to populate your profile.
      </p>

      <div className="processing-progress">
        <div className="processing-progress-bar">
          <div
            className="processing-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="processing-percentage">{progress}%</span>
      </div>

      <div className="upload-warning-box">
        <div className="warning-icon-circle">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <ul className="warning-list">
          <li>
            <strong>Do not</strong> navigate away or close this tab while <strong>video / audio</strong> is <strong>uploading</strong>.
          </li>
          <li>
            <strong>Do not</strong> click the <strong>Back</strong> button, <strong>refresh</strong>, close this tab, or navigate elsewhere while <strong>video / audio</strong> is being <strong>processed</strong>.
          </li>
        </ul>
      </div>

      <p className="processing-auto-note">
        You'll be automatically redirected once processing is complete.
      </p>
    </div>
  )
}

export default LifeStoryProcessing
