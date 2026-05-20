"use client";
import { useState, useEffect } from "react";
import { useAdmin } from "./AdminContext";
import {
  FiX,
  FiMail,
  FiLock,
  FiArrowRight,
  FiRefreshCw,
  FiCheck,
  FiShield,
  FiCpu,
} from "react-icons/fi";
import { GiBugNet } from "react-icons/gi";

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const { checkAuth } = useAdmin();
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [devOtp, setDevOtp] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setMessage(data.message || "OTP sent to your email.");
      if (data.devOtp) {
        setDevOtp(data.devOtp);
        setOtp(data.devOtp);
      }
      setStep("otp");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      await checkAuth();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        background: "rgba(4,12,8,0.96)",
        backdropFilter: "blur(24px)",
        animation: "fadeIn 0.3s ease-out",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes borderFlow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes otpPulse {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 0px rgba(212,255,125,0);
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(212,255,125,0.5);
          }
        }
      `}</style>

      {/* Animated particles background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              borderRadius: "50%",
              background: `rgba(82,183,136,${0.1 + Math.random() * 0.3})`,
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animation: `float ${3 + Math.random() * 4}s infinite ease-in-out`,
              animationDelay: Math.random() * 5 + "s",
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Main modal container */}
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          position: "relative",
          animation: "slideUp 0.4s cubic-bezier(0.34, 1.2, 0.64, 1)",
        }}
      >
        {/* Glow effect following cursor */}
        <div
          style={{
            position: "absolute",
            inset: "-3rem",
            borderRadius: "50%",
            opacity: 0.25,
            pointerEvents: "none",
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(82,183,136,0.5) 0%, rgba(212,255,125,0.2) 40%, transparent 70%)`,
            transition: "background 0.1s ease",
          }}
        />

        {/* Modal card */}
        <div
          style={{
            position: "relative",
            borderRadius: "2rem",
            overflow: "hidden",
            background: "linear-gradient(160deg, rgba(15,42,26,0.98) 0%, rgba(8,28,21,0.98) 60%, rgba(6,15,10,0.98) 100%)",
            border: "1px solid rgba(82,183,136,0.3)",
            boxShadow: "0 60px 120px rgba(0,0,0,0.8), inset 0 1px 0 rgba(82,183,136,0.15), 0 0 40px rgba(82,183,136,0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Animated border gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "2rem",
              background: "linear-gradient(90deg, transparent, rgba(82,183,136,0.4), rgba(212,255,125,0.4), rgba(82,183,136,0.4), transparent)",
              animation: "borderFlow 3s linear infinite",
              pointerEvents: "none",
            }}
          />

          {/* Top gradient line */}
          <div
            style={{
              height: "1px",
              width: "100%",
              background: "linear-gradient(to right, transparent 0%, rgba(82,183,136,0.8) 25%, #d4ff7d 50%, rgba(82,183,136,0.8) 75%, transparent 100%)",
              animation: "glowPulse 2s ease-in-out infinite",
              position: "relative",
              zIndex: 1,
            }}
          />

          {/* Header section */}
          <div
            style={{
              padding: "2rem 2rem 1.5rem 2rem",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.25rem" }}>
                <div
                  style={{
                    width: "2.25rem",
                    height: "2.25rem",
                    borderRadius: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(212,255,125,0.1)",
                    border: "1px solid rgba(212,255,125,0.3)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <GiBugNet size={18} style={{ color: "#d4ff7d" }} />
                </div>
                <span
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    fontFamily: "monospace",
                    color: "rgba(82,183,136,0.8)",
                    fontWeight: 500,
                  }}
                >
                  SECURE ACCESS
                </span>
              </div>
              <h2
                style={{
                  fontSize: "1.875rem",
                  fontWeight: 300,
                  fontFamily: "Cormorant Garamond, serif",
                  color: "#fefae0",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {step === "credentials" ? "Welcome back" : "Secure Verification"}
              </h2>
              <p
                style={{
                  fontSize: "0.75rem",
                  fontFamily: "monospace",
                  marginTop: "0.25rem",
                  color: "rgba(254,250,224,0.45)",
                  letterSpacing: "0.3px",
                }}
              >
                {step === "credentials"
                  ? "Sign in to manage your portfolio"
                  : `Verification code sent to ${email}`}
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                width: "2.25rem",
                height: "2.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "0.75rem",
                background: "transparent",
                border: "none",
                color: "rgba(82,183,136,0.6)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(82,183,136,0.1)";
                e.currentTarget.style.color = "#d4ff7d";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "rgba(82,183,136,0.6)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <FiX size={18} />
            </button>
          </div>

          {/* Steps indicator */}
          <div style={{ padding: "0 2rem 1.5rem 2rem", display: "flex", alignItems: "center", gap: "0.75rem", position: "relative", zIndex: 1 }}>
            {["Credentials", "2FA Verification"].map((label, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.6rem",
                    fontFamily: "monospace",
                    fontWeight: "bold",
                    background: (i === 0 && step === "credentials") || (i === 1 && step === "otp")
                      ? "#d4ff7d"
                      : i === 0 && step === "otp"
                      ? "rgba(82,183,136,0.3)"
                      : "rgba(82,183,136,0.1)",
                    color: (i === 0 && step === "credentials") || (i === 1 && step === "otp")
                      ? "#081c15"
                      : i === 0 && step === "otp"
                      ? "#52b788"
                      : "rgba(82,183,136,0.5)",
                    boxShadow: (i === 0 && step === "credentials") || (i === 1 && step === "otp")
                      ? "0 0 20px rgba(212,255,125,0.4)"
                      : "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  {i === 0 && step === "otp" ? <FiCheck size={10} /> : i + 1}
                </div>
                <span
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.06em",
                    fontFamily: "monospace",
                    color: (i === 0 && step === "credentials") || (i === 1 && step === "otp")
                      ? "#d4ff7d"
                      : "rgba(82,183,136,0.5)",
                  }}
                >
                  {label}
                </span>
                {i === 0 && (
                  <div
                    style={{
                      width: "1.5rem",
                      height: "1px",
                      marginLeft: "0.25rem",
                      background: step === "otp"
                        ? "rgba(212,255,125,0.5)"
                        : "rgba(82,183,136,0.2)",
                      transition: "background 0.3s ease",
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Dev OTP notice */}
          {devOtp && (
            <div
              style={{
                margin: "0 2rem 1rem 2rem",
                padding: "0.75rem 1rem",
                borderRadius: "0.75rem",
                background: "linear-gradient(135deg, rgba(212,255,125,0.08), rgba(82,183,136,0.04))",
                border: "1px solid rgba(212,255,125,0.25)",
                boxShadow: "0 0 20px rgba(212,255,125,0.1)",
                position: "relative",
                zIndex: 1,
                animation: "slideUp 0.3s ease-out",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                <FiCpu size={10} style={{ color: "#d4ff7d" }} />
                <p
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontFamily: "monospace",
                    color: "rgba(212,255,125,0.8)",
                    margin: 0,
                  }}
                >
                  Development Mode — One-Time Password
                </p>
              </div>
              <p
                style={{
                  fontSize: "1.5rem",
                  fontFamily: "monospace",
                  letterSpacing: "0.4em",
                  color: "#d4ff7d",
                  margin: 0,
                  fontWeight: "bold",
                  animation: "otpPulse 2s ease-in-out infinite",
                }}
              >
                {devOtp}
              </p>
            </div>
          )}

          {/* Form area */}
          <div style={{ padding: "0 2rem 2rem 2rem", position: "relative", zIndex: 1 }}>
            {message && !devOtp && (
              <div
                style={{
                  marginBottom: "1rem",
                  padding: "0.75rem 1rem",
                  borderRadius: "0.75rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.625rem",
                  fontSize: "0.75rem",
                  fontFamily: "monospace",
                  background: "rgba(82,183,136,0.08)",
                  border: "1px solid rgba(82,183,136,0.2)",
                  color: "#52b788",
                  animation: "slideUp 0.3s ease-out",
                }}
              >
                <FiCheck size={12} style={{ marginTop: "0.125rem", flexShrink: 0 }} />
                {message}
              </div>
            )}

            {step === "credentials" ? (
              <form onSubmit={handleCredentials} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "0.5rem",
                      fontFamily: "monospace",
                      color: "rgba(82,183,136,0.8)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <FiMail size={10} /> Email Address
                  </label>
                  <div style={{ position: "relative" }}>
                    <FiMail
                      size={13}
                      style={{
                        position: "absolute",
                        left: "1rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: focusedField === "email" ? "#d4ff7d" : "rgba(82,183,136,0.5)",
                        transition: "color 0.2s ease",
                        pointerEvents: "none",
                      }}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="admin@example.com"
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      style={{
                        width: "100%",
                        padding: "0.875rem 1rem 0.875rem 2.75rem",
                        borderRadius: "0.75rem",
                        fontSize: "0.875rem",
                        fontFamily: "monospace",
                        outline: "none",
                        background: "rgba(6,20,11,0.8)",
                        border: `1px solid ${focusedField === "email" ? "#d4ff7d" : "rgba(82,183,136,0.2)"}`,
                        color: "#fefae0",
                        caretColor: "#d4ff7d",
                        transition: "all 0.2s ease",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "0.5rem",
                      fontFamily: "monospace",
                      color: "rgba(82,183,136,0.8)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <FiLock size={10} /> Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <FiLock
                      size={13}
                      style={{
                        position: "absolute",
                        left: "1rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: focusedField === "password" ? "#d4ff7d" : "rgba(82,183,136,0.5)",
                        transition: "color 0.2s ease",
                        pointerEvents: "none",
                      }}
                    />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      style={{
                        width: "100%",
                        padding: "0.875rem 1rem 0.875rem 2.75rem",
                        borderRadius: "0.75rem",
                        fontSize: "0.875rem",
                        fontFamily: "monospace",
                        outline: "none",
                        background: "rgba(6,20,11,0.8)",
                        border: `1px solid ${focusedField === "password" ? "#d4ff7d" : "rgba(82,183,136,0.2)"}`,
                        color: "#fefae0",
                        caretColor: "#d4ff7d",
                        transition: "all 0.2s ease",
                      }}
                    />
                  </div>
                </div>

                {error && (
                  <div
                    style={{
                      padding: "0.75rem 1rem",
                      borderRadius: "0.75rem",
                      fontSize: "0.75rem",
                      fontFamily: "monospace",
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.3)",
                      color: "#fca5a5",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      animation: "shake 0.3s ease-out",
                    }}
                  >
                    <FiShield size={12} />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "1rem",
                    borderRadius: "0.75rem",
                    fontSize: "0.75rem",
                    fontFamily: "monospace",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    background: "linear-gradient(135deg, #d4ff7d, #a8e063)",
                    color: "#081c15",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    opacity: loading ? 0.5 : 1,
                    transition: "all 0.3s ease",
                    transform: "translateY(0)",
                    boxShadow: loading ? "none" : "0 8px 30px rgba(212,255,125,0.3)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 12px 40px rgba(212,255,125,0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 8px 30px rgba(212,255,125,0.3)";
                    }
                  }}
                >
                  {loading ? (
                    <>
                      <FiRefreshCw size={13} style={{ animation: "spin 1s linear infinite" }} />
                      Sending Code...
                    </>
                  ) : (
                    <>
                      Continue <FiArrowRight size={13} style={{ transition: "transform 0.2s ease" }} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleOTP} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "0.5rem",
                      fontFamily: "monospace",
                      color: "rgba(82,183,136,0.8)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <FiShield size={10} /> Verification Code
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      required
                      maxLength={6}
                      placeholder="000000"
                      onFocus={() => setFocusedField("otp")}
                      onBlur={() => setFocusedField(null)}
                      style={{
                        width: "100%",
                        padding: "1.25rem 1rem",
                        borderRadius: "0.75rem",
                        textAlign: "center",
                        fontSize: "2rem",
                        fontFamily: "monospace",
                        letterSpacing: "0.7em",
                        outline: "none",
                        background: "rgba(6,20,11,0.8)",
                        border: `1px solid ${focusedField === "otp" ? "#d4ff7d" : "rgba(82,183,136,0.2)"}`,
                        color: "#d4ff7d",
                        caretColor: "#d4ff7d",
                        transition: "all 0.2s ease",
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", gap: "0.375rem", marginTop: "0.75rem", padding: "0 0.125rem" }}>
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: "4px",
                          borderRadius: "2px",
                          background: otp.length > i ? "#d4ff7d" : "rgba(82,183,136,0.15)",
                          boxShadow: otp.length > i ? "0 0 8px rgba(212,255,125,0.6)" : "none",
                          transition: "all 0.3s ease",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {error && (
                  <div
                    style={{
                      padding: "0.75rem 1rem",
                      borderRadius: "0.75rem",
                      fontSize: "0.75rem",
                      fontFamily: "monospace",
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.3)",
                      color: "#fca5a5",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      animation: "shake 0.3s ease-out",
                    }}
                  >
                    <FiShield size={12} />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  style={{
                    width: "100%",
                    padding: "1rem",
                    borderRadius: "0.75rem",
                    fontSize: "0.75rem",
                    fontFamily: "monospace",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    background: "linear-gradient(135deg, #d4ff7d, #a8e063)",
                    color: "#081c15",
                    border: "none",
                    cursor: loading || otp.length !== 6 ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    opacity: loading || otp.length !== 6 ? 0.5 : 1,
                    transition: "all 0.3s ease",
                    transform: "translateY(0)",
                    boxShadow: loading || otp.length !== 6 ? "none" : "0 8px 30px rgba(212,255,125,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading && otp.length === 6) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 12px 40px rgba(212,255,125,0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading && otp.length === 6) {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 8px 30px rgba(212,255,125,0.3)";
                    }
                  }}
                >
                  {loading ? (
                    <>
                      <FiRefreshCw size={13} style={{ animation: "spin 1s linear infinite" }} />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify Access <FiCheck size={13} />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep("credentials");
                    setError("");
                    setOtp("");
                    setMessage("");
                    setDevOtp("");
                  }}
                  style={{
                    width: "100%",
                    textAlign: "center",
                    fontSize: "0.75rem",
                    fontFamily: "monospace",
                    background: "none",
                    border: "none",
                    color: "rgba(82,183,136,0.7)",
                    cursor: "pointer",
                    padding: "0.5rem",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#d4ff7d";
                    e.currentTarget.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(82,183,136,0.7)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  ← Return to login
                </button>
              </form>
            )}
          </div>

          {/* Bottom decorative line */}
          <div
            style={{
              height: "1px",
              width: "100%",
              background: "linear-gradient(to right, transparent, rgba(82,183,136,0.3), transparent)",
              animation: "glowPulse 3s ease-in-out infinite",
              position: "relative",
              zIndex: 1,
            }}
          />
        </div>
      </div>
    </div>
  );
}