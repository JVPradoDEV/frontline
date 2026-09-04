import { AccessButton } from "../../components/AccessButton";
import { assets } from "../../styles/assets";
import { FieldsDiv, LoginContainer, LoginDiv } from "../Main/styles";

export function Cadastro() {
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
            <div className="input">
              <label>Confirme sua senha:</label>
              <input />
            </div>
            <div className="btns">
              <AccessButton path="/cadastro">Cadastrar</AccessButton>
              <AccessButton path="/">Voltar</AccessButton>
            </div>
          </FieldsDiv>
        </LoginDiv>
      </LoginContainer>
    </>
  );
}
