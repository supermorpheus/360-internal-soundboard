import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Onboarding from './components/onboarding/Onboarding'
import Dashboard from './components/dashboard/Dashboard'
import Home from './components/app/Home'
import BrowseMembers from './components/app/BrowseMembers'
import Profile from './components/app/Profile'
import { OnboardingProvider } from './context/OnboardingContext'
import './styles/App.css'

// Wrapper component for onboarding with provider
function OnboardingWrapper() {
  return (
    <OnboardingProvider>
      <Onboarding />
    </OnboardingProvider>
  )
}

function App() {
  return (
    <HashRouter>
      <div className="app-container">
        <div className="mobile-frame">
          <Routes>
            {/* Main App Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/browse" element={<BrowseMembers />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/member/:id" element={<Profile />} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Onboarding */}
            <Route path="/onboarding" element={<OnboardingWrapper />} />

            {/* Dashboard (legacy) */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  )
}

export default App
