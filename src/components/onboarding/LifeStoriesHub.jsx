import { useOnboarding } from '../../context/OnboardingContext'
import OnboardingLayout from './OnboardingLayout'
import LifeStorySelection from './LifeStorySelection'
import LifeStoryPrompts from './LifeStoryPrompts'
import LifeStoryInputMethod from './LifeStoryInputMethod'
import LifeStoryVideoInput from './LifeStoryVideoInput'
import LifeStoryAudioInput from './LifeStoryAudioInput'
import LifeStoryTextInput from './LifeStoryTextInput'
import LifeStoryUploadComplete from './LifeStoryUploadComplete'
import LifeStoryProcessing from './LifeStoryProcessing'
import LifeStoryThumbnail from './LifeStoryThumbnail'
import LifeStoryEarlyConfirm1 from './LifeStoryEarlyConfirm1'
import LifeStoryEarlyConfirm2 from './LifeStoryEarlyConfirm2'
import LifeStoryProfessionalConfirm1 from './LifeStoryProfessionalConfirm1'
import LifeStoryProfessionalConfirm2 from './LifeStoryProfessionalConfirm2'
import LifeStoryCurrentConfirm1 from './LifeStoryCurrentConfirm1'
import LifeStoryCurrentConfirm2 from './LifeStoryCurrentConfirm2'

function LifeStoriesHub() {
  const {
    selectedLifeStory,
    lifeStorySubStep,
    profileData,
    backToLifeStorySelection,
    backToPrompts,
    backToInputMethod,
    backToThumbnail,
    backToConfirm1
  } = useOnboarding()

  // Get current input method for the selected story
  const currentInputMethod = selectedLifeStory
    ? profileData.lifeStories[selectedLifeStory].inputMethod
    : null

  // Custom back handler based on substep
  const getBackHandler = () => {
    switch (lifeStorySubStep) {
      case 'prompts':
        return backToLifeStorySelection
      case 'inputMethod':
        return backToPrompts
      case 'input':
        return backToInputMethod
      case 'uploadComplete':
      case 'processing':
        // No back during upload/processing
        return null
      case 'thumbnail':
        return null // No back during thumbnail selection
      case 'confirm1':
        return backToThumbnail
      case 'confirm2':
        return backToConfirm1
      default:
        return null
    }
  }

  // Calculate progress for life story sub-flow
  // Progress shows what's completed across the expanded flow
  // prompts (0%) -> inputMethod (15%) -> input (30%) -> uploadComplete (45%) -> processing (55%) -> thumbnail (65%) -> confirm1 (75%) -> confirm2 (90%)
  const getLifeStoryProgress = () => {
    switch (lifeStorySubStep) {
      case 'prompts':
        return 0
      case 'inputMethod':
        return 15
      case 'input':
        return 30
      case 'uploadComplete':
        return 45
      case 'processing':
        return 55
      case 'thumbnail':
        return 65
      case 'confirm1':
        return 75
      case 'confirm2':
        return 90
      default:
        return null // Use default progress for selection screen
    }
  }

  // Render confirm1 component based on selected life story
  const renderConfirm1Component = () => {
    switch (selectedLifeStory) {
      case 'earlyLife':
        return <LifeStoryEarlyConfirm1 />
      case 'professional':
        return <LifeStoryProfessionalConfirm1 />
      case 'current':
        return <LifeStoryCurrentConfirm1 />
      default:
        return null
    }
  }

  // Render confirm2 component based on selected life story
  const renderConfirm2Component = () => {
    switch (selectedLifeStory) {
      case 'earlyLife':
        return <LifeStoryEarlyConfirm2 />
      case 'professional':
        return <LifeStoryProfessionalConfirm2 />
      case 'current':
        return <LifeStoryCurrentConfirm2 />
      default:
        return null
    }
  }

  // Render the appropriate component based on substep
  const renderSubStep = () => {
    switch (lifeStorySubStep) {
      case 'selection':
        return <LifeStorySelection />

      case 'prompts':
        return <LifeStoryPrompts storyKey={selectedLifeStory} />

      case 'inputMethod':
        return <LifeStoryInputMethod storyKey={selectedLifeStory} />

      case 'input':
        if (currentInputMethod === 'video') {
          return <LifeStoryVideoInput storyKey={selectedLifeStory} />
        } else if (currentInputMethod === 'audio') {
          return <LifeStoryAudioInput storyKey={selectedLifeStory} />
        } else if (currentInputMethod === 'text') {
          return <LifeStoryTextInput storyKey={selectedLifeStory} />
        }
        return null

      case 'uploadComplete':
        return <LifeStoryUploadComplete storyKey={selectedLifeStory} />

      case 'processing':
        return <LifeStoryProcessing storyKey={selectedLifeStory} />

      case 'thumbnail':
        return <LifeStoryThumbnail storyKey={selectedLifeStory} />

      case 'confirm1':
        return renderConfirm1Component()

      case 'confirm2':
        return renderConfirm2Component()

      default:
        return <LifeStorySelection />
    }
  }

  // For selection screen, don't show custom back - use default layout back
  if (lifeStorySubStep === 'selection') {
    return (
      <OnboardingLayout>
        {renderSubStep()}
      </OnboardingLayout>
    )
  }

  // For upload/processing screens, hide back button
  const showBack = !['uploadComplete', 'processing', 'thumbnail'].includes(lifeStorySubStep)

  // For other substeps, show custom back handler and custom progress
  return (
    <OnboardingLayout
      customBackHandler={getBackHandler()}
      customProgress={getLifeStoryProgress()}
      showBack={showBack}
    >
      {renderSubStep()}
    </OnboardingLayout>
  )
}

export default LifeStoriesHub
