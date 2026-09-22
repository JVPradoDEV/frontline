import { useState } from "react";
import {
  ModalOverlay,
  ModalCard,
  ModalTitle,
  ModalSubtitle,
  ModalInput,
  ModalActions,
  ConfirmButton,
  SkipButton,
} from "./styles";

interface NicknameModalProps {
  onConfirm: (nickname: string) => void;
  onSkip: () => void;
  isLoading?: boolean;
}

export function NicknameModal({
  onConfirm,
  onSkip,
  isLoading,
}: NicknameModalProps) {
  const [nickname, setNickname] = useState("");

  return (
    <ModalOverlay>
      <ModalCard>
        <ModalTitle>Nome de exibição</ModalTitle>
        <ModalSubtitle>
          Gostaria de adicionar um nome de exibição ao seu perfil? Você pode
          deixar para fazer isso depois nas configurações.
        </ModalSubtitle>

        <ModalInput
          type="text"
          placeholder="Ex: João Silva"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          disabled={isLoading}
        />

        <ModalActions>
          <ConfirmButton
            onClick={() => onConfirm(nickname)}
            disabled={!nickname.trim() || isLoading}
          >
            {isLoading ? "Salvando..." : "Confirmar"}
          </ConfirmButton>
          <SkipButton onClick={onSkip} disabled={isLoading}>
            Deixar para depois
          </SkipButton>
        </ModalActions>
      </ModalCard>
    </ModalOverlay>
  );
}
