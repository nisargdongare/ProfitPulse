import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure, logout } from '../redux/slices/userSlice';
import { setServiceNotConnectedDefault } from '../redux/slices/commonSlice';
import { UseLogin } from '../redux/axios';
import styles from '../styles/components/LoginScreen.module.scss';
// File: components/Login.tsx

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [EMAIL, setEmail] = useState('');
  const [PASSWORD, setPassword] = useState('12345678');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset all localStorage and Redux states on component mount
  useEffect(() => {
    // Clear all localStorage
    localStorage.clear();

    // Reset Redux states to default
    dispatch(logout());
    dispatch(setServiceNotConnectedDefault());

    console.log('All localStorage and Redux states have been reset to default');
  }, [dispatch]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    dispatch(loginStart());

    try {
      const data = await UseLogin({ EMAIL, PASSWORD });
      // Save login details to localStorage
      const loginDetails = {
        EMAIL,
        PASSWORD,
        ...data.user, // Include any additional data from response
        token: data.token
      };
      localStorage.setItem('LoginDetails', JSON.stringify(loginDetails));

      // Dispatch login success to Redux
      dispatch(loginSuccess(loginDetails));

      // Redirect to Dashboard
      router.push('/Dashboard');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      dispatch(loginFailure(errorMessage));
    } finally {
      setLoading(false);
    }
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
            {error && (
              <div className={styles.error}>
                {error}
              </div>
            )}

            <label className={styles.field}>
              <span className={styles.labelText}>Email</span>
              <input
                type="email"
                inputMode="email"
                value={EMAIL}
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
                value={PASSWORD}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={styles.input}
                required
                aria-label="Password"
              />
            </label>

            <button className={styles.primaryBtn} type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
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
