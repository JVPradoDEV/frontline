export interface CommentData {
  id: number;
  userName: string;
  userHandle: string;
  content: string;
  likesCount: number;
  avatarColor?: string;
}

export interface PostData {
  id: number;
  userName: string;
  userHandle: string;
  content: string;
  commentsCount: number;
  likesCount: number;
  avatarColor?: string;
  comments: CommentData[];
}

export interface UserProfile {
  id: number;
  userName: string;
  userHandle: string;
  avatarColor: string;
  followersCount: number;
  followingCount: number;
}
