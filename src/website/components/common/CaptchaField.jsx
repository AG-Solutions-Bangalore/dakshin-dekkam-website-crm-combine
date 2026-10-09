import React, { useEffect, useRef, useState, useCallback } from "react";
import { RotateCw, ShieldCheck } from "lucide-react";

const CHARACTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed ambiguous characters 0, O, 1, I

/**
 * Generate a random captcha string
 */
export const generateCaptchaCode = (length = 5) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
  }
  return result;
};

/**
 * Custom hook to easily manage CAPTCHA & Spam Filter in any form
 */
export const useCaptcha = () => {
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [loadTime] = useState(() => Date.now());

  const refreshCaptcha = useCallback(() => {
    setCaptchaCode(generateCaptchaCode(5));
    setCaptchaInput("");
  }, []);

  useEffect(() => {
    refreshCaptcha();
  }, [refreshCaptcha]);

  const validateCaptcha = useCallback(() => {
    // 1. Honeypot check - bots auto-fill hidden fields
    if (honeypot && honeypot.trim().length > 0) {
      return { isValid: false, message: "Spam detected. Submission blocked." };
    }

    // 2. Time-trap check - bots submit instantaneously (< 1.5 seconds)
    const timeTaken = Date.now() - loadTime;
    if (timeTaken < 1500) {
      return { isValid: false, message: "Please take a moment before submitting." };
    }

    // 3. Captcha code check
    if (!captchaInput || !captchaInput.trim()) {
      return { isValid: false, message: "Please enter the security verification code" };
    }

    if (captchaInput.trim().toUpperCase() !== captchaCode.toUpperCase()) {
      refreshCaptcha();
      return { isValid: false, message: "Invalid verification code. Please try again." };
    }

    return { isValid: true, message: "" };
  }, [captchaCode, captchaInput, honeypot, loadTime, refreshCaptcha]);

  return {
    captchaCode,
    captchaInput,
    setCaptchaInput,
    honeypot,
    setHoneypot,
    refreshCaptcha,
    validateCaptcha,
  };
};

/**
 * Reusable CaptchaField Component
 */
const CaptchaField = ({
  captchaCode,
  captchaInput,
  onChange,
  onRefresh,
  honeypot,
  onHoneypotChange,
  error,
  className = "",
}) => {
  const canvasRef = useRef(null);

  // Draw captcha with distortion and noise lines
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !captchaCode) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background gradient
    const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGradient.addColorStop(0, "#f8fafc");
    bgGradient.addColorStop(1, "#e2e8f0");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw random noise lines
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(${Math.floor(Math.random() * 150)}, ${Math.floor(
        Math.random() * 150
      )}, ${Math.floor(Math.random() * 150)}, 0.45)`;
      ctx.lineWidth = Math.random() * 1.5 + 0.8;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.bezierCurveTo(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * canvas.width,
        Math.random() * canvas.height
      );
      ctx.stroke();
    }

    // Draw random dots
    for (let i = 0; i < 35; i++) {
      ctx.fillStyle = `rgba(${Math.floor(Math.random() * 180)}, ${Math.floor(
        Math.random() * 180
      )}, ${Math.floor(Math.random() * 180)}, 0.5)`;
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 1.8,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Draw text characters with random rotation and colors
    const colors = ["#1e293b", "#0f172a", "#334155", "#b91c1c", "#1d4ed8", "#047857"];
    ctx.textBaseline = "middle";

    const charSpacing = canvas.width / (captchaCode.length + 1);
    for (let i = 0; i < captchaCode.length; i++) {
      const char = captchaCode[i];
      ctx.save();
      const x = charSpacing * (i + 1);
      const y = canvas.height / 2 + (Math.random() * 6 - 3);
      ctx.translate(x, y);
      const angle = (Math.random() * 26 - 13) * (Math.PI / 180);
      ctx.rotate(angle);

      ctx.font = `bold ${Math.floor(Math.random() * 4 + 22)}px "Courier New", monospace`;
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.fillText(char, -8, 0);
      ctx.restore();
    }
  }, [captchaCode]);

  return (
    <div className={`w-full mb-4 ${className}`}>
      {/* Honeypot field - invisible to humans, traps automated bot submission */}
      <input
        type="text"
        name="_hp_security_guard"
        value={honeypot}
        onChange={onHoneypotChange}
        tabIndex={-1}
        autoComplete="off"
        style={{
          opacity: 0,
          position: "absolute",
          top: 0,
          left: 0,
          height: 0,
          width: 0,
          zIndex: -1,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      <label className="block text-sm font-medium text-gray-700 mb-1">
        Security Verification <span className="text-red-600 ml-1">*</span>
      </label>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Captcha Canvas Image & Refresh */}
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-lg p-1.5 shrink-0 shadow-xs">
          <canvas
            ref={canvasRef}
            width={140}
            height={38}
            className="rounded border border-gray-200 select-none bg-white cursor-pointer"
            onClick={onRefresh}
            title="Click image to refresh code"
          />
          <button
            type="button"
            onClick={onRefresh}
            title="Get new code"
            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-md transition"
          >
            <RotateCw size={16} />
          </button>
        </div>

        {/* Captcha Input */}
        <div
          className={`flex items-center flex-1 border rounded-lg px-3 py-2 ${
            error
              ? "border-red-500 focus-within:ring-red-400"
              : "border-gray-300 focus-within:ring-2 focus-within:ring-[#db2920]"
          }`}
        >
          <span className="mr-2 text-gray-400">
            <ShieldCheck size={18} />
          </span>
          <input
            type="text"
            value={captchaInput}
            onChange={onChange}
            maxLength={6}
            placeholder="Enter verification code"
            className="w-full outline-none bg-transparent text-gray-700 uppercase tracking-widest font-mono text-sm"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default CaptchaField;
