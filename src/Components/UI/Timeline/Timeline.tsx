import { ReactNode } from 'react'

import styles from './Timeline.module.scss'

type Props = {
  children: ReactNode
  style?: object
}

export const Timeline: React.FC<Props> = ({ children }) => (
  <div className={styles['timeline-container']}>{children}</div>
)

export const TimelineItem: React.FC<Props> = ({ children, style }) => (
  <div className={styles['timeline-item']} style={style}>
    <div className={styles['timeline-item-content']}>
      {children}
      <span className={styles.circle} />
    </div>
  </div>
)
