import { useOnboarding, lifeStoryPrompts } from '../../context/OnboardingContext'

function LifeStoryUploadComplete({ storyKey }) {
  const { goToProcessing } = useOnboarding()
  const story = lifeStoryPrompts[storyKey]

  const storyTitles = {
    earlyLife: 'Early Life',
    professional: 'Mid/Professional Life',
    current: 'Current Life'
  }

  return (
    <div className="onboarding-form upload-complete-screen">
      <div className="upload-complete-icon">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>

      <h1 className="upload-complete-title">
        {storyTitles[storyKey]}<br />
        Upload Complete
      </h1>

      <p className="upload-complete-message">
        Thanks for uploading your video / audio, We're processing it to extract the information for your profile.
      </p>

      <p className="upload-complete-time">
        This usually takes 1–2 minutes. You'll be automatically redirected to next stage once it's ready, and we'll also notify you by email.
      </p>

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

      <button className="btn-primary" onClick={goToProcessing}>
        Continue to Processing
      </button>
    </div>
  )
}

export default LifeStoryUploadComplete
