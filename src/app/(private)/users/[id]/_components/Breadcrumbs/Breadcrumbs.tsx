import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import styles from './Breadcrumbs.module.scss';

type TBreadcrumbItem = {
  label: string;
  href?: string;
};

type TBreadcrumbsProps = {
  items: readonly TBreadcrumbItem[];
};

const Breadcrumbs = ({ items }: TBreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li className={styles.item} key={`${item.label}-${index}`}>
              {item.href && !isLast ? (
                <Link className={styles.link} href={item.href}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.current}>{item.label}</span>
              )}
              {!isLast && <ChevronRight className={styles.separator} size={16} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export { Breadcrumbs };
