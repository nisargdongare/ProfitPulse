import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import styles from '../styles/components/HeadBox.module.scss';

interface HeadBoxProps {
  title: string;
  subtitle: string;
  backRoute?: string;
  backText?: string;
  showSignOut?: boolean;
}

const HeadBox: React.FC<HeadBoxProps> = ({
  title,
  subtitle,
  backRoute,
  backText = 'Back to Dashboard',
  showSignOut = true
}) => {
  const router = useRouter();
  const serviceConnectionStatus = useSelector((state: any) => state.common.serviceConnectionStatus);

  const handleSignOut = () => {
    router.push('/LoginScreen');
  };

  const handleBack = () => {
    if (backRoute) {
      router.push(backRoute);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        {backRoute && (
          <button
            className={styles.backButton}
            onClick={handleBack}
          >
            ← {backText}
          </button>
        )}
        <div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>

      <div className={styles.headerRight}>
        <div className={`${styles.statusIndicator} ${
          serviceConnectionStatus === 'Service Connected' ? styles.connected :
          serviceConnectionStatus === 'Service Not Connected' ? styles.disconnected :
          styles.default
        }`}>
          <div className={styles.statusDot}></div>
          <span>{serviceConnectionStatus}</span>
        </div>

        {showSignOut && (
          <button className={styles.signOutButton} onClick={handleSignOut}>
            Sign Out
          </button>
        )}
      </div>
    </header>
  );
};

export default HeadBox;
