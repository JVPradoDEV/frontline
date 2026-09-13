import { useState } from "react";
import { usePosts } from "../../../contexts/PostsContext";
import {
  CreateCommentContainer,
  CommentAvatar,
  InputWrapper,
  CommentTextarea,
  CommentFooter,
  CommentButton,
} from "./styles";

interface CreateCommentProps {
  postId: number;
}

export function CreateComment({ postId }: CreateCommentProps) {
  const [content, setContent] = useState("");
  const { addComment } = usePosts();

  function handleComment() {
    if (!content.trim()) return;
    addComment(postId, content.trim());
    setContent("");
  }

  return (
    <CreateCommentContainer>
      <CommentAvatar />
      <InputWrapper>
        <CommentTextarea
          placeholder="Digite sobre oque quiser..."
          value={content}
          rows={1}
          onChange={(e) => setContent(e.target.value)}
        />
        <CommentFooter>
          <CommentButton onClick={handleComment} disabled={!content.trim()}>
            Postar
          </CommentButton>
        </CommentFooter>
      </InputWrapper>
    </CreateCommentContainer>
  );
}
