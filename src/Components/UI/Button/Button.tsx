import { ReactNode } from 'react'
import classNames from 'classnames'

import { Spinner } from '../Spinner'

import styles from './Button.module.scss'

type ButtonProps = {
  onClick: () => void
  isLoading?: boolean
  children: ReactNode
  secondary?: boolean
}

export const Button = ({
  onClick,
  isLoading,
  children,
  secondary,
}: ButtonProps): JSX.Element => (
  <button
    className={classNames(styles.button, {
      [styles.secondary]: secondary,
    })}
    onClick={onClick}
  >
    {isLoading && <Spinner className={styles.spinner} />}

    <span className={isLoading ? styles.hide : ''}>{children}</span>
  </button>
)
