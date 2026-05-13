import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Award,
  Users,
  TrendingUp,
  LogOut,
  ThumbsUp,
  Zap,
  Clock,
  Share2,
} from "lucide-react";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(0);
  const [isVoting, setIsVoting] = useState(false);
  const userEmail = localStorage.getItem("userEmail") || "demo@example.com";

  useEffect(() => {
    fetchPerson();
  }, []);

  const fetchPerson = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/person");
      const data = await res.json();
      setPerson(data);
      setVoteCount(data.voteCount);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async () => {
    if (voted || isVoting) return;
    setIsVoting(true);
    try {
      const res = await fetch("http://localhost:5000/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: userEmail,
          personId: person._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setVoteCount(data.voteCount);
        setVoted(true);
        navigate("/thank-you", { state: { personName: person.name } });
      } else {
        if (data.error === "You have already voted for this person")
          setVoted(true);
        alert(data.error);
      }
    } catch (err) {
      console.error("Vote error:", err);
      alert("Could not cast vote");
    } finally {
      setIsVoting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="dashboard-loader">
        <div className="loader-spinner"></div>
        <p>Loading developer profile...</p>
      </div>
    );
  }
  if (!person) return <div className="dashboard-error">No profile found</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-grid">
        {/* Left Column – Developer Profile */}
        <div className="profile-section">
          <div className="profile-card">
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={18} /> Logout
            </button>
            <div className="card-badge">
              <Award size={16} /> Top Contender
            </div>
            <div className="photo-wrapper">
              <img
                src={person.photoUrl}
                alt={person.name}
                className="profile-photo"
              />
              <div className="photo-overlay"></div>
            </div>
            <h2>{person.name}</h2>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Gender</span>
                <span className="detail-value">{person.sex}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Age</span>
                <span className="detail-value">{person.age}</span>
              </div>
            </div>
            <div className="developer-bio">
              <p>
                Full‑stack developer, open‑source contributor, and AI
                enthusiast. Building the future with React & Node.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column – Vote Card + Competition Info */}
        <div className="vote-section">
          <div className="competition-card">
            <div className="comp-header">
              <TrendingUp size={22} />
              <span>Developer of the Year 2025</span>
            </div>
            <p>
              Vote for the most innovative developer. Winner gets $10,000, a
              lifetime trophy, and a feature on our blog.
            </p>
            <div className="comp-stats">
              <div className="stat">
                <Users size={14} /> 1,284 participants
              </div>
              <div className="stat">
                <Clock size={14} /> 12 days left
              </div>
            </div>
          </div>

          <div className="vote-card">
            <div className="vote-header">
              <Zap size={20} className="zap-icon" />
              <span>Cast your vote</span>
            </div>
            <div className="vote-stats">
              <div className="vote-icon">
                <Heart size={48} fill="#ff4d6d" stroke="none" />
              </div>
              <div className="vote-number">{voteCount.toLocaleString()}</div>
              <div className="vote-label">total votes</div>
            </div>
            <button
              onClick={handleVote}
              disabled={voted || isVoting}
              className={`vote-btn ${voted ? "voted" : ""} ${isVoting ? "voting" : ""}`}
            >
              {isVoting ? (
                <span className="btn-spinner"></span>
              ) : voted ? (
                <>
                  {" "}
                  <ThumbsUp size={18} /> Vote recorded
                </>
              ) : (
                <>
                  {" "}
                  <Heart size={18} /> Vote for {person.name.split(" ")[0]}
                </>
              )}
            </button>
            {!voted && (
              <p className="vote-note">
                Your vote makes a difference. One vote per person.
              </p>
            )}
          </div>

          <div className="share-card">
            <Share2 size={16} />
            <span>Spread the word – invite others to vote!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
