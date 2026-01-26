import { useOnboarding } from '../../context/OnboardingContext'
import OnboardingLayout from './OnboardingLayout'

function OnboardingWelcome() {
  const { nextStep } = useOnboarding()

  return (
    <OnboardingLayout showProgress={false} showBack={false}>
      <div className="welcome-screen">
        {/* SuperMorpheus Full Logo */}
        <div className="welcome-logo">
          <img
            src="/360-github/SM_Color_Whole.png"
            alt="Super Morpheus"
            className="welcome-logo-img"
          />
        </div>

        {/* Welcome Content */}
        <div className="welcome-content">
          <h1 className="welcome-title">Welcome to Gang 360</h1>
          <p className="welcome-subtitle">
            Trust. Share. Belong.
          </p>
        </div>

        {/* Features List */}
        <div className="welcome-features">
          <div className="welcome-feature">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div className="feature-text">
              <h3>Create Your Profile</h3>
              <p>Share your journey — reveal the many shades of who you are</p>
            </div>
          </div>

          <div className="welcome-feature">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div className="feature-text">
              <h3>Connect with Members</h3>
              <p>Find your tribe and create connections that run deep</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button className="btn-primary welcome-cta" onClick={nextStep}>
          Let's Get Started
        </button>

        <p className="welcome-time-note">
          This will take about 5 minutes
        </p>
      </div>
    </OnboardingLayout>
  )
}

export default OnboardingWelcome
