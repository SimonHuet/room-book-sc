import styles from './Spinner.module.scss'

import classNames from 'classnames'

type SpinnerProps = {
  className?: string
}

export const Spinner = ({ className }: SpinnerProps) => (
  <div className={styles.container}>
    <div className={classNames(styles.spinner, className)} role="status">
      <span className={styles['sr-only']}>Loading...</span>
    </div>
  </div>
)
