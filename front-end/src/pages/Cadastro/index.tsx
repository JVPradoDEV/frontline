import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AccessButton } from "../../components/AccessButton";
import { assets } from "../../styles/assets";
import { NicknameModal } from "./NicknameModal";
import { useLoginMutation, useRegisterMutation } from "../../store/api/authApi";
import { setCredentials } from "../../store/slices/authSlice";
import type { AppDispatch } from "../../store";
import {
  ErrorMsg,
  FieldsDiv,
  LoginContainer,
  LoginDiv,
  SubmitButton,
} from "../Login/styles";
import { useEditProfileMutation } from "../../store/api/usersApi";

interface FormState {
  username: string;
  password: string;
  confirmPassword: string;
}

export function Cadastro() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState<FormState>({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [editProfile, { isLoading: isSavingNickname }] =
    useEditProfileMutation();

  const isLoading = isRegistering || isLoggingIn;

  function handleChange(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setError("");
    };
  }

  function validate(): string {
    if (!form.username.trim() || !form.password.trim())
      return "Preencha todos os campos.";
    if (form.password !== form.confirmPassword)
      return "As senhas não coincidem.";
    if (form.password.length < 6)
      return "A senha deve ter pelo menos 6 caracteres.";
    return "";
  }

  async function handleRegister() {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await register({
        username: form.username,
        password: form.password,
      }).unwrap();

      const loginData = await login({
        username: form.username,
        password: form.password,
      }).unwrap();

      if (!loginData.access || !loginData.refresh) {
        setError("Erro ao autenticar após cadastro. Tente fazer login.");
        return;
      }

      // ← mapeia os campos da API para os campos internos do Redux
      dispatch(
        setCredentials({
          accessToken: loginData.access,
          refreshToken: loginData.refresh,
          username: "",
        }),
      );

      setShowModal(true);
    } catch (err) {
      const errData = (err as { data?: Record<string, unknown> })?.data;
      const apiMsg = errData ? Object.values(errData).flat().join(" ") : null;

      setError(apiMsg || "Erro ao cadastrar. Tente novamente.");
    }
  }

  async function handleNicknameConfirm(nickname: string) {
    try {
      const formData = new FormData();
      formData.append("nickname", nickname.trim());
      await editProfile(formData).unwrap();
    } catch {
      console.error("Erro ao salvar nome de exibição.");
    }
    setShowModal(false);
    navigate("/feed");
  }

  return (
    <>
      <LoginContainer>
        <LoginDiv>
          <img src={`${assets.logo}`} />
          <FieldsDiv>
            <div className="input">
              <label>Nome de usuário:</label>
              <input
                type="text"
                value={form.username}
                onChange={handleChange("username")}
              />
            </div>
            <div className="input">
              <label>Senha:</label>
              <input
                type="password"
                value={form.password}
                onChange={handleChange("password")}
              />
            </div>
            <div className="input">
              <label>Confirme sua senha:</label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={handleChange("confirmPassword")}
              />
            </div>

            <ErrorMsg $visible={!!error}>{error}</ErrorMsg>

            <div className="btns">
              <SubmitButton onClick={handleRegister} disabled={isLoading}>
                {isLoading ? "Cadastrando..." : "Cadastrar"}
              </SubmitButton>
              <AccessButton path="/">Voltar</AccessButton>
            </div>
          </FieldsDiv>
        </LoginDiv>
      </LoginContainer>

      {showModal && (
        <NicknameModal
          onConfirm={handleNicknameConfirm}
          onSkip={() => {
            setShowModal(false);
            navigate("/feed");
          }}
          isLoading={isSavingNickname}
        />
      )}
    </>
  );
}
