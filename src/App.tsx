import './App.scss'
import Card from './components/Card/Card';
import OnboardingForm from './components/OnboardingForm/OnboardingForm';

function App() {
  return (
    <div className="app">
      <h1>Step 1 of 5</h1>
      <Card>
        <OnboardingForm />
      </Card>
    </div>
  )
}

export default App
