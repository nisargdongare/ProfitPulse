import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HeadBox from '../components/HeadBox';
import { setServiceConnected, setServiceNotConnected } from '../redux/slices/commonSlice';
import { getZerodhaProfile } from '../redux/axios';
import styles from '../styles/components/ZeroDhaAPICredentials.module.scss';

const ZeroDhaAPICredentials: React.FC = () => {
  const dispatch = useDispatch();
  const LoginDetails = useSelector((state: any) => state.user.loginDetails);
  const serviceConnectionStatus = useSelector((state: any) => state.common.serviceConnectionStatus);

  const [credentials, setCredentials] = useState({
    apiKey: 'rrgbfjopephkdfrk',
    apiSecret: 'svsggl3040imnd5u4wyhtol1n01dd5d6',
    accessToken: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  // Profile state
  const [profile, setProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  // Fetch profile function
  const fetchProfile = async () => {
    setProfileLoading(true);
    setProfileError(null);
    try {
      const profileData = await getZerodhaProfile();
      setProfile(profileData);
      // Keep service connected if profile fetch succeeds
      dispatch(setServiceConnected());
    } catch (error: any) {
      // Handle error gracefully without throwing
      const errorMessage = error.response?.data?.message || 'Failed to fetch profile';
      setProfileError(errorMessage);
      console.warn('Profile fetch failed:', errorMessage);
      // If profile fetch fails, set service status to not connected
      dispatch(setServiceNotConnected());
      // Don't re-throw the error, just handle it gracefully
    } finally {
      setProfileLoading(false);
    }
  };

  // Handle messages from popup window
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "http://localhost:4000" && event.origin !== "http://localhost:3000") {
        return; // ignore messages from unknown origins
      }
      console.log("Data from popup:", event.data);

      if (event.data === "success") {
        // Update Redux state to Service Connected
        dispatch(setServiceConnected());
        alert("Service connected successfully!");
        // Fetch profile after successful connection
        // fetchProfile();
      } else if (event.data === "failed") {
        // Update Redux state to Service Not Connected
        dispatch(setServiceNotConnected());
        alert("Service connection failed. Please try again.");
      } else if (event.data.access_token) {
        // Fallback for old format - still update Redux
        setCredentials(prev => ({
          ...prev,
          accessToken: event.data.access_token
        }));
        dispatch(setServiceConnected());
        alert("Login success: " + event.data.user_id);
        // Fetch profile after successful connection
        // fetchProfile();
      } else if (event.data.error) {
        dispatch(setServiceNotConnected());
        alert("Login failed: " + event.data.error);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [dispatch]);

  // Watch for service connection status changes and fetch profile when connected
  useEffect(() => {
    // if (serviceConnectionStatus === 'Service Connected') {
      fetchProfile();
    // }
  }, [serviceConnectionStatus]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!credentials.apiKey.trim()) newErrors.apiKey = 'API Key is required';
    if (!credentials.apiSecret.trim()) newErrors.apiSecret = 'API Secret is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTestConnection = async () => {
    if (!validateForm()) return;

    setTestStatus('testing');

    // Simulate API connection test
    setTimeout(() => {
      // Mock success/failure - in real app, this would test the actual API
      const isSuccess = Math.random() > 0.3; // 70% success rate for demo

      if (isSuccess) {
        setTestStatus('success');
        setIsConnected(true);
        setTimeout(() => setTestStatus('idle'), 3000);
      } else {
        setTestStatus('error');
        setTimeout(() => setTestStatus('idle'), 3000);
      }
    }, 2000);
  };



  const handleGenerateAccessToken = async () => {
    if (!credentials.apiKey.trim() || !credentials.apiSecret.trim()) {
      alert('Please enter API Key and API Secret first');
      return;
    }

    if (!LoginDetails?._id) {
      alert('Please login first to access this feature');
      return;
    }

    try {
      // Open popup window for Kite login with userId from Redux
      const loginUrl = `http://localhost:4000/api/v1/zerodha/login?API_KEY=${credentials.apiKey}&API_SECRET=${credentials.apiSecret}&userId=${LoginDetails?._id}`;
      console.log("Login URL: " + loginUrl);
      // Try to open as popup first
      let popup = window.open(
        loginUrl,
        "kiteLogin",
        // "width=600,height=600,scrollbars=yes,resizable=yes,status=yes,location=no,toolbar=no,menubar=no,directories=no"
        "popup=yes,width=600,height=600"
      );

      // If popup is null or undefined, try alternative approach
      if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        // Fallback: try opening with minimal features
        popup = window.open(
          loginUrl,
          "kiteLogin",
          "width=600,height=600"
        );
      }

      if (!popup) {
        alert('Popup blocked! Please allow popups for this site.');
      }
    } catch (error) {
      console.error('Error opening popup:', error);
      alert('Error opening login popup');
    }
  };

  const getTestStatusMessage = () => {
    switch (testStatus) {
      case 'testing':
        return { text: 'Testing connection...', color: '#3182ce' };
      case 'success':
        return { text: 'Connection successful! ✓', color: '#38a169' };
      case 'error':
        return { text: 'Connection failed. Please check credentials.', color: '#e53e3e' };
      default:
        return { text: '', color: '#000' };
    }
  };

  const statusMessage = getTestStatusMessage();

  return (
    <div className={styles.container}>
      <HeadBox
        title="ZeroDha API Credentials"
        subtitle="Configure your Zerodha API credentials to fetch live stock data"
        backRoute="/Dashboard"
      />

      <div className={styles.content}>

        {/* Profile Display Section */}
        {(profile || profileLoading || profileError) && (
          <div className={styles.profileSection}>
            <div className={styles.formCard}>
              <h2 className={styles.sectionTitle}>Zerodha Profile</h2>

              {profileLoading && (
                <div className={styles.loading}>
                  <p>Loading profile...</p>
                </div>
              )}

              {profileError && (
                <div className={styles.error}>
                  <p>Error: {profileError}</p>
                </div>
              )}

              {profile && (
                <div className={styles.profileGrid}>
                  <div className={styles.profileField}>
                    <label className={styles.profileLabel}>User ID</label>
                    <span className={styles.profileValue}>{profile.user_id}</span>
                  </div>

                  <div className={styles.profileField}>
                    <label className={styles.profileLabel}>User Type</label>
                    <span className={styles.profileValue}>{profile.user_type}</span>
                  </div>

                  <div className={styles.profileField}>
                    <label className={styles.profileLabel}>Email</label>
                    <span className={styles.profileValue}>{profile.email}</span>
                  </div>

                  <div className={styles.profileField}>
                    <label className={styles.profileLabel}>Full Name</label>
                    <span className={styles.profileValue}>{profile.user_name}</span>
                  </div>

                  <div className={styles.profileField}>
                    <label className={styles.profileLabel}>Short Name</label>
                    <span className={styles.profileValue}>{profile.user_shortname}</span>
                  </div>

                  <div className={styles.profileField}>
                    <label className={styles.profileLabel}>Broker</label>
                    <span className={styles.profileValue}>{profile.broker}</span>
                  </div>

                  <div className={styles.profileField}>
                    <label className={styles.profileLabel}>Exchanges</label>
                    <div className={styles.arrayValue}>
                      {profile.exchanges?.map((exchange: string, index: number) => (
                        <span key={index} className={styles.arrayItem}>{exchange}</span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.profileField}>
                    <label className={styles.profileLabel}>Products</label>
                    <div className={styles.arrayValue}>
                      {profile.products?.map((product: string, index: number) => (
                        <span key={index} className={styles.arrayItem}>{product}</span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.profileField}>
                    <label className={styles.profileLabel}>Order Types</label>
                    <div className={styles.arrayValue}>
                      {profile.order_types?.map((orderType: string, index: number) => (
                        <span key={index} className={styles.arrayItem}>{orderType}</span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.profileField}>
                    <label className={styles.profileLabel}>Demat Consent</label>
                    <span className={styles.profileValue}>{profile.meta?.demat_consent}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className={styles.formSection}>
          <div className={styles.formCard}>
            <h2 className={styles.sectionTitle}>API Configuration</h2>

            <div className={styles.instructions}>
              <p><strong>Step 1:</strong> Get your API credentials from <a href="https://kite.zerodha.com/connect/login" target="_blank" rel="noopener noreferrer">Zerodha Kite</a></p>
              <p><strong>Step 2:</strong> Fill in your API Key and API Secret below</p>
              <p><strong>Step 3:</strong> Click "Connect to Service" to authenticate with Zerodha</p>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label className={styles.label}>API Key</label>
                <input
                  type="password"
                  name="apiKey"
                  value={credentials.apiKey}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.apiKey ? styles.error : ''}`}
                  placeholder="Enter your API Key"
                />
                {errors.apiKey && <span className={styles.errorText}>{errors.apiKey}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>API Secret</label>
                <input
                  type="password"
                  name="apiSecret"
                  value={credentials.apiSecret}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.apiSecret ? styles.error : ''}`}
                  placeholder="Enter your API Secret"
                />
                {errors.apiSecret && <span className={styles.errorText}>{errors.apiSecret}</span>}
              </div>




            </div>

            {statusMessage.text && (
              <div className={styles.testStatus} style={{ color: statusMessage.color }}>
                {statusMessage.text}
              </div>
            )}

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.testButton}
                onClick={handleGenerateAccessToken}
                disabled={isLoading}
              >
                {isLoading ? 'Connecting...' : 'Connect to Service'}
              </button>
            </div>
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.infoCard}>
            <h3>🔒 Security Notice</h3>
            <ul>
              <li>Your API credentials are stored locally in your browser</li>
              <li>Never share your API credentials with anyone</li>
              <li>Regularly rotate your API keys for security</li>
              <li>Use HTTPS when transmitting sensitive data</li>
            </ul>
          </div>

          <div className={styles.infoCard}>
            <h3>📊 What you can do with these credentials</h3>
            <ul>
              <li>Fetch real-time stock prices and market data</li>
              <li>Get historical price data for analysis</li>
              <li>Place orders programmatically</li>
              <li>Monitor your portfolio automatically</li>
              <li>Generate trading signals and alerts</li>
            </ul>
          </div>
        </div>
      </div>
      {/* <pre>{JSON.stringify(LoginDetails, null, 2)}</pre> */}
    </div>
  );
};

export default ZeroDhaAPICredentials;
