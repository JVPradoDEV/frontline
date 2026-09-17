import { AccessButton } from "../../components/AccessButton";
import { assets } from "../../styles/assets";
import { LoginDiv, LoginContainer, FieldsDiv } from "./styles";

export function MainPage() {
  return (
    <>
      <LoginContainer>
        <LoginDiv>
          <img src={`${assets.logo}`} />
          <FieldsDiv>
            <div className="input">
              <label>Nome de usuário:</label>
              <input />
            </div>
            <div className="input">
              <label>Senha:</label>
              <input />
            </div>
            <div className="btns">
              <AccessButton path="/">Entrar</AccessButton>
              <p>Não possui uma conta?</p>
              <AccessButton path="/cadastro">Cadastrar-se</AccessButton>
            </div>
          </FieldsDiv>
        </LoginDiv>
      </LoginContainer>
    </>
  );
}
