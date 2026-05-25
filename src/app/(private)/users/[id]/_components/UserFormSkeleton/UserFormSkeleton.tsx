import { Skeleton } from '@/components/ui/Skeleton/Skeleton';

import styles from './UserFormSkeleton.module.scss';

const UserFormSkeleton = () => {
  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <Skeleton className={styles.breadcrumbs} />

        <div className={styles.heading}>
          <Skeleton className={styles.title} />
          <Skeleton className={styles.subtitle} />
        </div>
      </div>

      <div className={styles.form}>
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div className={styles.field} key={index}>
              <Skeleton className={styles.label} />
              <Skeleton className={styles.input} />
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <Skeleton className={styles.buttonSecondary} />
          <Skeleton className={styles.buttonPrimary} />
        </div>
      </div>
    </section>
  );
};

export { UserFormSkeleton };
