import React, { useState } from 'react';
import HeadBox from '../components/HeadBox';
import { UseCreateAccount} from '../redux/axios';
import styles from '../styles/components/CreateAdminAccount.module.scss';

const CreateAdminAccount: React.FC = () => {
  const [formData, setFormData] = useState({
    FIRST_NAME: '',
    LAST_NAME: '',
    EMAIL: '',
    MOBILE: '',
    PASSWORD: '',
    ROLE: 'user'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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

    if (!formData.FIRST_NAME.trim()) newErrors.FIRST_NAME = 'First name is required';
    if (!formData.LAST_NAME.trim()) newErrors.LAST_NAME = 'Last name is required';
    if (!formData.EMAIL.trim()) newErrors.EMAIL = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.EMAIL)) newErrors.EMAIL = 'Email is invalid';
    if (!formData.MOBILE.trim()) newErrors.MOBILE = 'Mobile number is required';
    if (!formData.PASSWORD) newErrors.PASSWORD = 'Password is required';
    else if (formData.PASSWORD.length < 8) newErrors.PASSWORD = 'Password must be at least 8 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await UseCreateAccount(formData);

      alert('Account has been created');
      // Reset form
      setFormData({
        FIRST_NAME: '',
        LAST_NAME: '',
        EMAIL: '',
        MOBILE: '',
        PASSWORD: '',
        ROLE: 'user'
      });
    } catch (error: any) {
      console.error('Error creating account:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create account';
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <HeadBox
        title="Create Admin Account"
        subtitle="Add new administrative users to the system"
        backRoute="/Dashboard"
      />

      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Personal Information</h2>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>First Name *</label>
                <input
                  type="text"
                  name="FIRST_NAME"
                  value={formData.FIRST_NAME}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.FIRST_NAME ? styles.error : ''}`}
                  placeholder="Enter first name"
                />
                {errors.FIRST_NAME && <span className={styles.errorText}>{errors.FIRST_NAME}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Last Name *</label>
                <input
                  type="text"
                  name="LAST_NAME"
                  value={formData.LAST_NAME}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.LAST_NAME ? styles.error : ''}`}
                  placeholder="Enter last name"
                />
                {errors.LAST_NAME && <span className={styles.errorText}>{errors.LAST_NAME}</span>}
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Email Address *</label>
                <input
                  type="email"
                  name="EMAIL"
                  value={formData.EMAIL}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.EMAIL ? styles.error : ''}`}
                  placeholder="admin@company.com"
                />
                {errors.EMAIL && <span className={styles.errorText}>{errors.EMAIL}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Mobile Number *</label>
                <input
                  type="tel"
                  name="MOBILE"
                  value={formData.MOBILE}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.MOBILE ? styles.error : ''}`}
                  placeholder="1234567890"
                />
                {errors.MOBILE && <span className={styles.errorText}>{errors.MOBILE}</span>}
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Account Details</h2>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Password *</label>
                <input
                  type="password"
                  name="PASSWORD"
                  value={formData.PASSWORD}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.PASSWORD ? styles.error : ''}`}
                  placeholder="Enter password (min 8 characters)"
                />
                {errors.PASSWORD && <span className={styles.errorText}>{errors.PASSWORD}</span>}
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Role</label>
                <select
                  name="ROLE"
                  value={formData.ROLE}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="user">User</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            </div>
          </div>



          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Admin Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAdminAccount;
