import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AccessButton } from "../../components/AccessButton";
import { assets } from "../../styles/assets";
import { NicknameModal } from "./NicknameModal";
import {
  useRegisterMutation,
  useUpdateNicknameMutation,
} from "../../store/api/authApi";
import { setCredentials } from "../../store/slices/authSlice";
import { useAuth } from "../../hooks/useAuth";
import type { AppDispatch } from "../../store";
import {
  ErrorMsg,
  FieldsDiv,
  LoginContainer,
  LoginDiv,
  SubmitButton,
} from "../Login/styles";

interface FormState {
  username: string;
  password: string;
  confirmPassword: string;
}

export function Cadastro() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth(); // userId já vem do Redux após o register

  const [form, setForm] = useState<FormState>({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [updateNickname] = useUpdateNicknameMutation();

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
      const data = await register({
        username: form.username,
        password: form.password,
      }).unwrap();

      // Persiste access token na memória e refresh token no localStorage
      dispatch(setCredentials(data));
      setShowModal(true);
    } catch {
      setError("Erro ao cadastrar. Tente novamente.");
    }
  }

  async function handleNicknameConfirm(nickname: string) {
    if (user.userId) {
      try {
        // Token injetado automaticamente pelo interceptor do Axios
        await updateNickname({ userId: user.userId, nickname }).unwrap();
      } catch {
        console.error("Erro ao salvar nome de exibição.");
      }
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
                placeholder="@seuusuario"
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
              <SubmitButton onClick={handleRegister} disabled={isRegistering}>
                {isRegistering ? "Cadastrando..." : "Cadastrar"}
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
        />
      )}
    </>
  );
}
