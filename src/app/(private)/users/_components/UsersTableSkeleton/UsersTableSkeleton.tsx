import { Skeleton } from '@/components/ui/Skeleton/Skeleton';

import styles from './UsersTableSkeleton.module.scss';

const UsersTableSkeleton = () => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <Skeleton className={styles.title} />
          <Skeleton className={styles.subtitle} />
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHeader}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton className={styles.headerCell} key={index} />
          ))}
        </div>

        <div className={styles.tableBody}>
          {Array.from({ length: 20 }).map((_, rowIndex) => (
            <div className={styles.row} key={rowIndex}>
              {Array.from({ length: 6 }).map((_, cellIndex) => (
                <Skeleton className={styles.cell} key={cellIndex} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { UsersTableSkeleton };
