import React from 'react';
import { useRouter } from 'next/router';
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
      {showSignOut && (
        <button className={styles.signOutButton} onClick={handleSignOut}>
          Sign Out
        </button>
      )}
    </header>
  );
};

export default HeadBox;
