import { ReactNode } from 'react'
import classNames from 'classnames'

import styles from './Timeline.module.scss'

type Props = {
  children: ReactNode
  isCurrent?: boolean
}

export const Timeline: React.FC<Props> = ({ children }) => (
  <div className={styles['timeline-container']}>{children}</div>
)

export const TimelineItem: React.FC<Props> = ({ children, isCurrent }) => (
  <div
    className={classNames(styles['timeline-item'], {
      [styles.current]: isCurrent,
    })}
  >
    <div className={styles['timeline-item-content']}>
      {children}
      <span className={styles.circle} />
    </div>
  </div>
)
