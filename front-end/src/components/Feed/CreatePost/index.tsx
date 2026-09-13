import { useState } from "react";
import { usePosts } from "../../../contexts/PostsContext";
import {
  CreatePostContainer,
  SelfAvatar,
  InputWrapper,
  PostTextarea,
  PostFooter,
  PostButton,
} from "./styles";

export function CreatePost() {
  const [content, setContent] = useState("");
  const { addPost } = usePosts();

  function handlePost() {
    if (!content.trim()) return;
    // TODO: enviar para API
    addPost(content.trim());
    setContent("");
  }

  return (
    <CreatePostContainer>
      <SelfAvatar />
      <InputWrapper>
        <PostTextarea
          placeholder="Digite sobre oque quiser..."
          value={content}
          rows={1}
          onChange={(e) => setContent(e.target.value)}
        />
        <PostFooter>
          <PostButton onClick={handlePost} disabled={!content.trim()}>
            Postar
          </PostButton>
        </PostFooter>
      </InputWrapper>
    </CreatePostContainer>
  );
}
