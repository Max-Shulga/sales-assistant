import Image from 'next/image';

import LogoIcon from '@/icons/logo.svg';

import styles from './signIn.module.css';

function SignInPage() {
  return (
    <section className={styles.signInPageWrapper}>
      <div className={styles.signInPageContainer}>
        <div className={styles.container}>
          <div className={styles.header}>
            <Image src={LogoIcon} alt="Magic icon" />
            <h3>Sales Assistant</h3>
          </div>
          <div>
            <h2>Login</h2>
          </div>
        </div>
        <div className={styles.separator}>
          <span>or</span>
        </div>
      </div>
    </section>
  );
}
export default SignInPage;
