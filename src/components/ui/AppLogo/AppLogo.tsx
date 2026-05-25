import Image from 'next/image';

import styles from './AppLogo.module.scss';

const AppLogo = () => {
  return (
    <div className={styles.logo}>
      <Image src="/logo.svg" alt="Sales Assistant logo" width={36} height={36} priority />
      <span className={styles.name}>Sales Assistant</span>
    </div>
  );
};

export { AppLogo };
