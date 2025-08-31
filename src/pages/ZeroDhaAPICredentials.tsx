import React, { useState } from 'react';
import HeadBox from '../components/HeadBox';
import styles from '../styles/components/ZeroDhaAPICredentials.module.scss';

const ZeroDhaAPICredentials: React.FC = () => {
  const [credentials, setCredentials] = useState({
    apiKey: '',
    apiSecret: '',
    accessToken: '',
    publicToken: '',
    requestToken: '',
    pin: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

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
    if (!credentials.accessToken.trim()) newErrors.accessToken = 'Access Token is required';
    if (!credentials.pin.trim()) newErrors.pin = 'PIN is required';
    else if (credentials.pin.length !== 4 && credentials.pin.length !== 6) {
      newErrors.pin = 'PIN must be 4 or 6 digits';
    }

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

  const handleSaveCredentials = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate saving credentials
    setTimeout(() => {
      setIsLoading(false);
      alert('API credentials saved successfully!');
      // In a real app, you'd save to localStorage, database, or secure storage
      localStorage.setItem('zerodhaCredentials', JSON.stringify(credentials));
    }, 1500);
  };

  const handleGenerateAccessToken = () => {
    // In a real app, this would redirect to Zerodha's login flow
    alert('Redirecting to Zerodha login for token generation...');
    // window.location.href = 'https://kite.zerodha.com/connect/login';
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
        <div className={styles.connectionStatus}>
          <div className={`${styles.statusIndicator} ${isConnected ? styles.connected : styles.disconnected}`}>
            <div className={styles.statusDot}></div>
            <span>{isConnected ? 'Connected' : 'Not Connected'}</span>
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.formCard}>
            <h2 className={styles.sectionTitle}>API Configuration</h2>

            <div className={styles.instructions}>
              <p><strong>Step 1:</strong> Get your API credentials from <a href="https://kite.zerodha.com/connect/login" target="_blank" rel="noopener noreferrer">Zerodha Kite</a></p>
              <p><strong>Step 2:</strong> Fill in your API Key and API Secret below</p>
              <p><strong>Step 3:</strong> Generate and enter your Access Token</p>
              <p><strong>Step 4:</strong> Test the connection and save your credentials</p>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.field}>
                <label className={styles.label}>API Key *</label>
                <input
                  type="text"
                  name="apiKey"
                  value={credentials.apiKey}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.apiKey ? styles.error : ''}`}
                  placeholder="Enter your API Key"
                />
                {errors.apiKey && <span className={styles.errorText}>{errors.apiKey}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>API Secret *</label>
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

              <div className={styles.field}>
                <label className={styles.label}>Access Token *</label>
                <div className={styles.tokenField}>
                  <input
                    type="password"
                    name="accessToken"
                    value={credentials.accessToken}
                    onChange={handleInputChange}
                    className={`${styles.input} ${errors.accessToken ? styles.error : ''}`}
                    placeholder="Enter your Access Token"
                  />
                  <button
                    type="button"
                    className={styles.generateButton}
                    onClick={handleGenerateAccessToken}
                  >
                    Generate
                  </button>
                </div>
                {errors.accessToken && <span className={styles.errorText}>{errors.accessToken}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>PIN *</label>
                <input
                  type="password"
                  name="pin"
                  value={credentials.pin}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.pin ? styles.error : ''}`}
                  placeholder="Enter your 4/6 digit PIN"
                  maxLength={6}
                />
                {errors.pin && <span className={styles.errorText}>{errors.pin}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Public Token (Optional)</label>
                <input
                  type="text"
                  name="publicToken"
                  value={credentials.publicToken}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Enter your Public Token"
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Request Token (Optional)</label>
                <input
                  type="text"
                  name="requestToken"
                  value={credentials.requestToken}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Enter your Request Token"
                />
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
                onClick={handleTestConnection}
                disabled={testStatus === 'testing'}
              >
                {testStatus === 'testing' ? 'Testing...' : 'Test Connection'}
              </button>

              <button
                type="button"
                className={styles.saveButton}
                onClick={handleSaveCredentials}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Credentials'}
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
    </div>
  );
};

export default ZeroDhaAPICredentials;
