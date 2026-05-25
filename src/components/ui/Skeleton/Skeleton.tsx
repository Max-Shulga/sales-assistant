import cn from 'classnames';

import styles from './Skeleton.module.scss';

type TSkeletonProps = {
  className?: string;
};

const Skeleton = ({ className }: TSkeletonProps) => {
  return <div className={cn(styles.skeleton, className)} />;
};

export { Skeleton };
