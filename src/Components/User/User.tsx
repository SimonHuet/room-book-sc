import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as UserState from 'State/User'
import { RootState } from 'State'
import { User as UserType, UserId } from 'Utils/Types'
import { Avatar } from 'Components/UI/Avatar'

type Props = {
  userId: UserId
}

export const User: React.FC<Props> = ({ userId }) => {
  const dispatch = useDispatch()

  const user: UserType | undefined = useSelector((state: RootState) =>
    UserState.select.users.selectById(state, userId)
  )

  const isLoading: boolean = useSelector(UserState.select.isLoading)

  useEffect(() => {
    if (!isLoading && !user) dispatch(UserState.fetchUser({ id: userId }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return <>{user && <Avatar name={user.name} />}</>
}
