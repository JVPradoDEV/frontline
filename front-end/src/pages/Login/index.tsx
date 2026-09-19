import { useNavigate } from "react-router-dom";
import { AccessButton } from "../../components/AccessButton";
import { assets } from "../../styles/assets";
import {
  LoginDiv,
  LoginContainer,
  FieldsDiv,
  ErrorMsg,
  SubmitButton,
} from "./styles";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { useState } from "react";
import { useLoginMutation } from "../../store/api/authApi";
import { setCredentials } from "../../store/slices/authSlice";

interface FormState {
  username: string;
  password: string;
}

export function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState<FormState>({ username: "", password: "" });
  const [error, setError] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  // ── Handlers ────────────────────────────────────────────────────────────────

  function handleChange(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setError("");
    };
  }

  function validate(): string {
    if (!form.username.trim() || !form.password.trim())
      return "Preencha todos os campos.";
    return "";
  }

  async function handleLogin() {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const data = await login({
        username: form.username,
        password: form.password,
      }).unwrap();

      // ── Valida se a API realmente devolveu os tokens ───────────────────────
      if (!data.access || !data.refresh) {
        setError("Resposta inválida do servidor. Tente novamente.");
        return;
      }

      dispatch(
        setCredentials({
          accessToken: data.access,
          refreshToken: data.refresh,
          userId: data.userId,
          username: data.username,
        }),
      );

      navigate("/feed");
    } catch {
      setError("Usuário ou senha incorretos.");
    }
  }

  // Permite enviar com Enter
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleLogin();
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
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="input">
              <label>Senha:</label>
              <input
                type="password"
                value={form.password}
                onChange={handleChange("password")}
                onKeyDown={handleKeyDown}
              />
            </div>

            <ErrorMsg $visible={!!error}>{error}</ErrorMsg>

            <div className="btns">
              <SubmitButton onClick={handleLogin} disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
              </SubmitButton>
              <p>Não possui uma conta?</p>
              <AccessButton path="/cadastro">Cadastrar-se</AccessButton>
            </div>
          </FieldsDiv>
        </LoginDiv>
      </LoginContainer>
    </>
  );
}
