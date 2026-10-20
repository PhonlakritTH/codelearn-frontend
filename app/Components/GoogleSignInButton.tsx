"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import error from "next/dist/api/error";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function GoogleSignInButton({ onSuccess }: { onSuccess: () => void }) {
  const [error, setError] = useState("");

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      setError("");
      try {
        const res = await fetch(`${API}/auth/google/code`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: codeResponse.code }),
        });
        const data = await res.json();

        if (data.success && data.pending) {
          // เก็บสถานะรอ OTP (ยังไม่เก็บ user)
          sessionStorage.setItem(
            "otpPending",
            JSON.stringify({
              token: data.pending_token,
              email: data.email_masked,
              expiresAt: Date.now() + data.expires_in * 1000,
            })
          );
          onSuccess(); // -> router.push("/OTP")
        } else {
          setError(data.error || "ล็อกอินไม่สำเร็จ");
        }
      } catch {
        setError("เชื่อมต่อ server ไม่ได้");
      }
    },
    onError: () => setError("ล็อกอินด้วย Google ไม่สำเร็จ"),
  });

  return (
    <div>
     
       <button
          type="button"   onClick={() => login()}
          className="google-btn group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl border border-[#C3C6D6] bg-[#F8F6FA] px-6 py-3 text-[16px] font-semibold text-[#1F1F1F] transition-colors duration-500 hover:text-white"
        >
          {/* วงกลม corner fill ขยายจากมุมขวาบนตอน hover */}
          <span className="absolute -right-5 -top-2 h-4 w-4 rounded-full bg-[#14213F] transition-transform duration-500 ease-out group-hover:scale-[55]" />

          <svg className="google-icon relative z-10" width="24" height="24" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"/>
            <path fill="#FBBC05" d="M10.5 28.7c-.5-1.4-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z"/>
            <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/>
          </svg>
          <span className="relative z-10">Sign in with Google</span>
       </button>
       {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
  
 