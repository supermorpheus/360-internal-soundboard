import { useOnboarding } from '../../context/OnboardingContext'
import OnboardingLayout from './OnboardingLayout'

function OnboardingShare360() {
  const { nextStep } = useOnboarding()

  return (
    <OnboardingLayout>
      <div className="share360-screen">
        <div className="share360-content">
          <h1 className="share360-title">Share Your 360°</h1>

          <p className="share360-message">
            Gang 360 is all about sharing 360 degrees of our life with our fellow community members who we trust as friends. It all stays inside private in Gang 360.
          </p>

          <p className="share360-message">
            As you proceed be silent, self-aware, authentic, open, fearless, funny, intense or whatever you truly are..
          </p>

          <p className="share360-highlight">
            Unmask yourself..
          </p>
        </div>

        <button className="btn-primary" onClick={nextStep}>
          I am Ready
        </button>
      </div>
    </OnboardingLayout>
  )
}

export default OnboardingShare360
