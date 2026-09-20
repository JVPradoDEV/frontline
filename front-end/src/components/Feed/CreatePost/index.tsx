import { useState } from "react";
import {
  CreatePostContainer,
  SelfAvatar,
  InputWrapper,
  PostTextarea,
  PostFooter,
  PostButton,
} from "./styles";
import { useCreatePostMutation } from "../../../store/api/postsApi";
import { ErrorMessage } from "../../Post/CreateComment/styles";

export function CreatePost() {
  const [content, setContent] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [createPost, { isLoading }] = useCreatePostMutation();

  // const { foto } = useSelector(selectUserProfile);

  async function handlePost() {
    if (!content.trim()) return;
    setErrorMsg("");
    try {
      // .unwrap() lança o erro pro 'catch' caso a API recuse a requisição
      await createPost({ conteudo: content.trim() }).unwrap();
      setContent(""); // Limpa o textarea se deu certo
    } catch (error) {
      console.error("Erro ao publicar o post", error);

      const errData = (error as any)?.data;

      const apiError =
        errData?.conteudo?.[0] ||
        errData?.details ||
        errData?.detail ||
        "Erro ao postar comentário. Tente novamente.";
      setErrorMsg(apiError);
    }
  }

  return (
    <CreatePostContainer>
      <SelfAvatar />
      <InputWrapper>
        <PostTextarea
          placeholder="Digite sobre oque quiser..."
          value={content}
          rows={1}
          onChange={(e) => {
            setContent(e.target.value);
            setErrorMsg("");
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          disabled={isLoading}
        />

        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}

        <PostFooter>
          <PostButton
            onClick={handlePost}
            disabled={!content.trim() || isLoading}
          >
            {isLoading ? "Enviando..." : "Postar"}
          </PostButton>
        </PostFooter>
      </InputWrapper>
    </CreatePostContainer>
  );
}
