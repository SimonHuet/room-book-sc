import classNames from 'classnames'

import styles from './Avatar.module.scss'

type Props = {
  name: string
}

const getNameInitials = (name: string): string => {
  const [firstName, lastName] = name.split(' ')

  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  return firstName.charAt(0).toUpperCase()
}

export const Avatar: React.FC<Props> = ({ name }) => {
  return (
    <div className={styles.avatar}>
      <div>{getNameInitials(name)}</div>
      <label>{name}</label>
    </div>
  )
}
