export interface PostAuthor {
  username: string;
  nickname: string;
  foto: string | null;
  n_seguidores: number;
  n_seguindo: number;
}

export interface PostData {
  id: number;
  conteudo: string;
  n_likes: number;
  n_comentarios: number;
  autor: PostAuthor;
  data_criacao: string;
  tipo: "post";
  deu_like: boolean;
}

export interface CommentData {
  id: number;
  conteudo: string;
  autor: PostAuthor;
  post: number;
  n_likes: number;
  tipo: "comentario";
  deu_like: boolean;
}

export interface UserProfile {
  id: number;
  userName: string;
  userHandle: string;
  avatarColor: string;
  followersCount: number;
  followingCount: number;
}
