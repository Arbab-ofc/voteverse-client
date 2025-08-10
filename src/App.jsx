import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import About from './pages/About';
import NotFound from './pages/NotFound'; 
import OtpVerification from './pages/OtpVerification';
import { useAuth } from './context/AuthContext';
import CreateElection from './pages/CreateElection';
import AddCandidatePage from './pages/AddCandidatePage';
import CandidateList from './pages/CandidateList';
import DeleteElectionCard from './pages/DeleteElectionCard';
import UpdateElection from './pages/UpdateElection';
import CandidateRemovePage from './pages/CandidateRemovePage';
import ElectionEndPage from './pages/ElectionEndPage';
import ElectionResultPage from './pages/ElectionResultPage';
import MyProfile from './pages/MyProfile';
import ChangePassword from './pages/ChangePassword';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import ElectionDetailedCard from './components/ElectionDetailedCard';
import ResendOtp from './pages/ResendOtp';

function App() {
  const { user } = useAuth();
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header isAuthenticated={user} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="verify-otp" element={<OtpVerification />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/create-election" element={<CreateElection />} />
            <Route path="/add-candidate" element={<AddCandidatePage />} />
            <Route path="/candidates" element={<CandidateList />} />
            <Route path="/delete-election" element={<DeleteElectionCard />} />
            <Route path="/update-election" element={<UpdateElection />} />
            <Route path="/remove-candidate" element={<CandidateRemovePage />} />
            <Route path="/end-election" element={<ElectionEndPage />} />
            <Route path="/election-result" element={<ElectionResultPage />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
            <Route path="/verify-forget-otp" element={<ResetPassword />} />
            <Route path="/election-details/:electionId" element={<ElectionDetailedCard />} />
            <Route path="/resend-otp" element={<ResendOtp />} />
            <Route path="*" element={<NotFound />} /> 
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;