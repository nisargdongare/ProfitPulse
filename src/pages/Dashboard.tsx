import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/components/Dashboard.module.scss';
import CounterTest from '../components/CounterTest';

const Dashboard: React.FC = () => {
  const router = useRouter();
  const dashboardOptions = [
    {
      title: 'Fundamental Analysis',
      description: 'Analyze company fundamentals and financial data',
      icon: '📊',
      route: '/FundamentalAnalysis'
    },
    {
      title: 'Create Admin Account',
      description: 'Manage administrative user accounts',
      icon: '👤',
      route: '/CreateAdminAccount'
    },
    {
      title: 'ZeroDha API Credentials',
      description: 'Configure and manage API credentials',
      icon: '🔑',
      route: '/ZeroDhaAPICredentials'
    },
    {
      title: 'Portfolio Management',
      description: 'Track and manage investment portfolios',
      icon: '📈',
      route: null
    },
    {
      title: 'Market Data',
      description: 'Real-time market information and trends',
      icon: '🌍',
      route: null
    },
    {
      title: 'Reports & Analytics',
      description: 'Generate detailed financial reports',
      icon: '📋',
      route: null
    }
  ];

  const handleCardClick = (route: string | null) => {
    if (route) {
      router.push(route);
    }
  };

  const handleSignOut = () => {
    router.push('/LoginScreen');
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h1 className={styles.title}>ProfitPulse Dashboard</h1>
            <p className={styles.subtitle}>Welcome to your trading and analysis platform</p>
          </div>
          <button className={styles.signOutButton} onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </header>

      <div className={styles.grid}>
        {dashboardOptions.map((option, index) => (
          <div
            key={index}
            className={`${styles.card} ${option.route ? styles.clickable : ''}`}
            onClick={() => handleCardClick(option.route)}
          >
            <div className={styles.cardIcon}>
              {option.icon}
            </div>
            <h3 className={styles.cardTitle}>{option.title}</h3>
            <p className={styles.cardDescription}>{option.description}</p>
            <button
              className={styles.cardButton}
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick(option.route);
              }}
            >
              Access
            </button>
          </div>
        ))}
      </div>

      {/* Redux Test Component */}
      <CounterTest />
    </div>
  );
};

export default Dashboard;
