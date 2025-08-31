import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/components/LoginScreen.module.scss';
// File: components/Login.tsx

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Replace with your API call
    setTimeout(() => {
      setLoading(false);
      // Redirect to Dashboard after successful sign in
      router.push('/Dashboard');
    }, 800);
  }

  return (
    <div className={styles.pageWrap}>
      <div className={styles.leftPanel} aria-hidden>
        <div className={styles.brandArea}>
          <div className={styles.logo}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              {/* Background circle */}
              <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.1"/>
              {/* Profit trending line */}
              <path d="M6 16l3-4 2 1 3-5 2 3 2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              {/* Profit indicator dot */}
              <circle cx="16" cy="9" r="1.5" fill="currentColor"/>
              {/* Upward arrow */}
              <path d="M18.5 7.5l-1.5 1.5-1.5-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              {/* Pulse dots */}
              <circle cx="8" cy="8" r="1" fill="currentColor" opacity="0.6">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="12" cy="6" r="1" fill="currentColor" opacity="0.4">
                <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" begin="0.5s"/>
              </circle>
            </svg>
          </div>
          <h1 className={styles.project}>ProfitPulse</h1>
          <p className={styles.tag}>Track. Analyse. Profit.</p>
        </div>
        <div className={styles.art}>
          <div className={styles.pulse}></div>
        </div>
      </div>

      <main className={styles.cardWrap}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Welcome back</h2>
          <p className={styles.cardSubtitle}>Sign in to continue to ProfitPulse</p>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <label className={styles.field}>
              <span className={styles.labelText}>Email</span>
              <input
                type="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className={styles.input}
                required
                aria-label="Email"
              />
            </label>

            <label className={styles.field}>
              <span className={styles.labelText}>Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={styles.input}
                required
                aria-label="Password"
              />
            </label>

            <div className={styles.rowBetween}>
              <label className={styles.remember}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  aria-label="Remember me"
                />
                <span>Remember me</span>
              </label>
              <a className={styles.link} href="#">Forgot?</a>
            </div>

            <button className={styles.primaryBtn} type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            <div className={styles.or}>
              <span>or continue with</span>
            </div>

            <div className={styles.socials}>
              <button type="button" className={styles.socialBtn} aria-label="Sign in with Google">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21.35 11.1H12v2.8h5.35c-.23 1.48-1.01 2.73-2.15 3.57v2.96h3.47C20.68 19.05 22 15.43 22 12c0-.82-.08-1.62-.22-2.4z" fill="currentColor"/></svg>
                Google
              </button>

              <button type="button" className={styles.socialBtn} aria-label="Sign in with GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.2-3.37-1.2-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.84.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.115 2.51.338 1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .26.18.58.69.48A10 10 0 0022 12c0-5.52-4.48-10-10-10z" fill="currentColor"/></svg>
                GitHub
              </button>
            </div>

            <p className={styles.signup}>Don't have an account? <a href="#" className={styles.link}>Sign up</a></p>
          </form>
        </div>

        <footer className={styles.footer}>© {new Date().getFullYear()} ProfitPulse</footer>
      </main>
    </div>
  );
}


/*
  File: components/Login.module.scss
  Place this SCSS file next to Login.tsx and import it as shown above.
*/
