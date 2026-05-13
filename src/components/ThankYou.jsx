import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Award, LogOut } from "lucide-react";
import "./ThankYou.css";

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { personName } = location.state || { personName: "the developer" };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div className="thankyou-container">
      <div className="thankyou-card">
        <div className="success-icon">
          <CheckCircle size={64} color="#10b981" />
        </div>
        <h1>Thank You for Voting!</h1>
        <p className="thankyou-message">
          You successfully cast your vote for <strong>{personName}</strong>.
        </p>
        <div className="competition-highlight">
          <Award size={24} />
          <div>
            <h3>Developer Competition 2025</h3>
            <p>
              Your vote helps decide who will be crowned Developer of the Year.
              The winner will be announced live on June 15th, 2025.
            </p>
          </div>
        </div>
        <div className="share-section">
          <p>Spread the word:</p>
          <div className="social-buttons"></div>
        </div>
        <button className="logout-thanks-btn" onClick={handleLogout}>
          <LogOut size={18} /> Log out
        </button>
        <button className="return-btn" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
