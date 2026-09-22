import { useState, useRef } from "react";
import {
  useEditProfileMutation,
  useChangePasswordMutation,
} from "../../../store/api/usersApi";
import type { UserProfilePayload } from "../../../store/slices/authSlice";
import {
  ModalOverlay,
  ModalCard,
  ModalTitle,
  ModalSubtitle,
  AvatarButton,
  ModalAvatar,
  Field,
  FieldLabel,
  FieldInput,
  ChangePasswordBtn,
  ModalActions,
  ModalBtn,
} from "./styles";
import { ErrorMsg } from "../../../pages/Login/styles";
import { LockIcon } from "../../../styles/svgs";

type View = "main" | "password";

interface EditProfileModalProps {
  user: UserProfilePayload;
  onClose: () => void;
}

// Extrai mensagem de erro do retorno da API (Django REST Framework)
function parseApiError(err: unknown): string {
  const data = (err as { data?: unknown })?.data;
  if (!data) return "Erro ao salvar. Tente novamente.";
  if (typeof data === "string") return data;
  if (typeof data === "object") {
    return Object.values(data as Record<string, unknown>)
      .flat()
      .join(" ");
  }
  return "Erro inesperado.";
}

export function EditProfileModal({ user, onClose }: EditProfileModalProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  const [view, setView] = useState<View>("main");
  const [nickname, setNickname] = useState(user.nickname ?? "");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(user.foto);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [error, setError] = useState("");

  const [editProfile, { isLoading: savingProfile }] = useEditProfileMutation();
  const [changePassword, { isLoading: savingPassword }] =
    useChangePasswordMutation();

  // ── Foto ────────────────────────────────────────────────────────────────────
  function handlePhotoClick() {
    fileRef.current?.click();
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  // ── Confirmar perfil ────────────────────────────────────────────────────────
  async function handleConfirmMain() {
    setError("");
    const formData = new FormData();

    if (nickname.trim() !== (user.nickname ?? "")) {
      formData.append("nickname", nickname.trim());
    }
    if (photo) {
      formData.append("foto", photo);
    }

    // Nada mudou → fecha sem chamar a API
    if (!formData.has("nickname") && !formData.has("foto")) {
      onClose();
      return;
    }

    try {
      await editProfile(formData).unwrap();
      // setProfile + invalidatesTags já cuidam da atualização automática
      onClose();
    } catch (err) {
      setError(parseApiError(err));
    }
  }

  // ── Confirmar senha ─────────────────────────────────────────────────────────
  async function handleConfirmPassword() {
    setError("");
    if (!senhaAtual.trim() || !novaSenha.trim()) {
      setError("Preencha todos os campos.");
      return;
    }
    try {
      await changePassword({
        senha_atual: senhaAtual,
        senha_nova: novaSenha,
      }).unwrap();
      // Volta para a tela principal após sucesso
      setView("main");
      setSenhaAtual("");
      setNovaSenha("");
    } catch (err) {
      setError(parseApiError(err));
    }
  }

  // ── View: alterar senha ─────────────────────────────────────────────────────
  if (view === "password") {
    return (
      <ModalOverlay onClick={onClose}>
        <ModalCard onClick={(e) => e.stopPropagation()}>
          <ModalTitle>
            Para alterar a sua senha, por gentileza, insira a sua Senha Atual e
            a sua Nova Senha
          </ModalTitle>

          <Field>
            <FieldLabel>Senha Atual:</FieldLabel>
            <FieldInput
              type="password"
              value={senhaAtual}
              onChange={(e) => {
                setSenhaAtual(e.target.value);
                setError("");
              }}
            />
          </Field>

          <Field>
            <FieldLabel>Nova Senha:</FieldLabel>
            <FieldInput
              type="password"
              value={novaSenha}
              onChange={(e) => {
                setNovaSenha(e.target.value);
                setError("");
              }}
            />
          </Field>

          <ErrorMsg $visible={!!error}>{error}</ErrorMsg>

          <ModalActions>
            <ModalBtn onClick={handleConfirmPassword} disabled={savingPassword}>
              {savingPassword ? "Salvando..." : "Confirmar"}
            </ModalBtn>
            <ModalBtn
              $secondary
              onClick={() => {
                setView("main");
                setError("");
              }}
            >
              Voltar
            </ModalBtn>
          </ModalActions>
        </ModalCard>
      </ModalOverlay>
    );
  }

  // ── View: principal ─────────────────────────────────────────────────────────
  return (
    <ModalOverlay onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <ModalSubtitle>Aperte para alterar sua foto de perfil:</ModalSubtitle>

        <AvatarButton type="button" onClick={handlePhotoClick}>
          <ModalAvatar $foto={photoPreview} />
        </AvatarButton>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handlePhotoChange}
        />

        <Field>
          <FieldLabel>Nome de Exibição:</FieldLabel>
          <FieldInput
            type="text"
            value={nickname}
            placeholder={user.nickname || user.username}
            onChange={(e) => {
              setNickname(e.target.value);
              setError("");
            }}
          />
        </Field>

        <ChangePasswordBtn
          type="button"
          onClick={() => {
            setView("password");
            setError("");
          }}
        >
          <LockIcon /> Alterar Senha
        </ChangePasswordBtn>

        <ErrorMsg $visible={!!error}>{error}</ErrorMsg>

        <ModalActions>
          <ModalBtn onClick={handleConfirmMain} disabled={savingProfile}>
            {savingProfile ? "Salvando..." : "Confirmar"}
          </ModalBtn>
          <ModalBtn $secondary onClick={onClose}>
            Cancelar
          </ModalBtn>
        </ModalActions>
      </ModalCard>
    </ModalOverlay>
  );
}
