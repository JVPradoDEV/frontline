import { useState } from "react";
// import { useSelector } from "react-redux";
import {
  CreateCommentContainer,
  CommentAvatar,
  InputWrapper,
  CommentTextarea,
  CommentFooter,
  CommentButton,
  ErrorMessage,
} from "./styles";
// import { selectUserProfile } from "../../../store/slices/authSlice";
import { useCreateCommentMutation } from "../../../store/api/postsApi";

interface CreateCommentProps {
  postId: number;
}

export function CreateComment({ postId }: CreateCommentProps) {
  const [content, setContent] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [createComment, { isLoading }] = useCreateCommentMutation();

  // const { foto } = useSelector(selectUserProfile);

  async function handleComment() {
    if (!content.trim()) return;
    setErrorMsg(""); // Limpa o erro antes da nova tentativa
    try {
      // Passa o conteúdo e o ID do post, conforme exigido pelo backend
      await createComment({ conteudo: content.trim(), post: postId }).unwrap();
      setContent(""); // Limpa o campo após o sucesso
    } catch (error) {
      console.error("Erro ao enviar o comentário", error);
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
    <CreateCommentContainer>
      <CommentAvatar />
      <InputWrapper>
        <CommentTextarea
          placeholder="Digite sobre oque quiser..."
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

        <CommentFooter>
          <CommentButton
            onClick={handleComment}
            disabled={!content.trim() || isLoading}
          >
            {isLoading ? "Enviando..." : "Postar"}
          </CommentButton>
        </CommentFooter>
      </InputWrapper>
    </CreateCommentContainer>
  );
}
