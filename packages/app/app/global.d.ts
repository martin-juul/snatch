// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../node_modules/@types/react/index.d.ts"/>

declare module "*.svg" {
  import { SvgProps } from "react-native-svg"
  const content: React.FC<SvgProps>
  export default content
}

declare module "react-chat-elements/native" {
  export interface ChatItemProps {
    id?: string
    avatar?: string
    avatarFlexible?: boolean
    alt?: string
    title?: string
    subtitle?: string
    date?: Date
    dateString?: string
    unread?: number
    onClick?: () => void
    onContextMenu?: () => void
    statusColor?: string
    statusColorType?: "encircle" | "badge"
    statusText?: string
    muted?: boolean
    showMute?: boolean
    showVideoCall?: boolean
    onClickMute?: () => void
    onClickVideoCall?: () => void
  }

  export class ChatItem extends React.Component<ChatItemProps> {

  }

  export interface MessageBoxProps {
    id?: string
    position?: string
    type?: "text" | "photo" | "file" | "location" | "spotify" | "video" | "audio"
    text?: string
    title?: string
    titleColor?: string
    data?: object
    date?: Date
    dateString?: string
    onClick?: () => void
    onOpen?: () => void
    onDownload?: () => void
    onLoad?: () => void
    onPhotoError?: () => void
    onTitleClick?: () => void
    onForwardClick?: () => void
    onReplyClick?: () => void
    onMeetingMessageClick?: () => void
    onMeetingTitleClick?: () => void
    onMeetingVideoLinkClick?: () => void
    onReplyMessageClick?: () => void
    onRemoveMessageClick?: () => void
    onMeetingMoreSelect?: () => void
    onContextMenu?: () => void
    forwarded?: boolean
    replyButton?: boolean
    removeButton?: boolean
    status?: "waiting" | "sent" | "received" | "read"
    notch?: boolean
    avatar?: string
    renderAddCmp?: () => React.ReactElement
    copiableDate?: boolean
    onMessageFocused?: () => void
    reply?: object
    retracted?: boolean
  }

  export class MessageBox extends React.Component<MessageBoxProps> {
  }

  export interface MessageListProps {
    className?: string
    dataSource?: [],
    lockable?: boolean
    toBottomHeight?: number | "100%"
    onClick?: () => void
    onOpen?: () => void
    onDownload?: () => void
    onScroll?: () => void
    onForwardClick?: () => void
    onReplyClick?: () => void
    onReplyMessageClick?: () => void
    downButton?: boolean
    downButtonBadge?: boolean
    onDownButtonClick?: () => void
    onContextMenu?: () => void
    onPhotoError?: () => void
  }

  export class MessageList extends React.Component<MessageListProps> {

  }
}
