import { ReactNode } from 'react'
import { Button } from '../Button'

import styles from './Modal.module.scss'

type Props = {
  title: string | ReactNode
  children: ReactNode
  onClose: () => void
}

export const Modal: React.FC<Props> = ({ title, children, onClose }) => {
  return (
    <div className={styles.modal}>
      <h2 className={styles.title}>
        <span>{title}</span>
        <Button
          id="modal-close"
          round
          className={styles.close}
          onClick={onClose}
          ariaLabel="close"
        >
          x
        </Button>
      </h2>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
