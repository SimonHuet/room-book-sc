import { ReactNode } from 'react'
import classNames from 'classnames'

import { Spinner } from '../Spinner'

import styles from './Button.module.scss'

type ButtonType = 'button' | 'submit' | 'reset' | undefined

type ButtonProps = {
  id: string
  onClick: () => void
  isLoading?: boolean
  children: ReactNode
  secondary?: boolean
  round?: boolean
  className?: string
  ariaLabel?: string
  type?: ButtonType
  disabled?: boolean
}

export const Button = ({
  id,
  onClick,
  isLoading,
  children,
  secondary,
  round,
  className,
  ariaLabel,
  type,
  disabled = undefined,
}: ButtonProps): JSX.Element => (
  <button
    className={classNames(
      styles.button,
      {
        [styles.secondary]: secondary,
        [styles.round]: round,
      },
      className
    )}
    onClick={onClick}
    aria-labelledby={id}
    {...(disabled && { disabled })}
    {...(type && { type })}
    {...(ariaLabel && { 'aria-label': ariaLabel })}
  >
    {isLoading && <Spinner className={styles.spinner} />}

    <span id={id} className={isLoading ? styles.hide : ''}>
      {children}
    </span>
  </button>
)
