export interface UserState {
  userInfo: UserInfo
  token: string
}

export interface UserInfo {
  id: number
  name: string
  avatar: string
}
