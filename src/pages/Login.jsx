import React from 'react';
import styled from 'styled-components';
import bannerUrl from '../assets/Heroes-image.webp';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <HeaderPlaceholder>
                 <a href="/">HeroesFlix</a> {/* Logo/Link para a Home */}
            </HeaderPlaceholder>
            
            <LoginBoxWrapper>
                <LoginBox>
                    <LoginTitle>Acesso ao Quartel-General</LoginTitle>
                    <LoginForm>
                        <LoginInput
                            type="email"
                            placeholder="Email ou Telefone"
                            required
                        />
                        <LoginInput
                            type="password"
                            placeholder="Senha"
                            required
                        />
                        <Button type="submit" onClick={() => navigate('/Home')}>
                            Entrar
                        </Button>
                        <LoginHelp>
                            <label>
                                <input type="checkbox" defaultChecked /> Lembre-se de mim
                            </label>
                        </LoginHelp>
                    </LoginForm>
                    
                    <LoginSignup>
                        <span>Ainda não tem conta?</span>
                        <a href="/Registrar">
                            Crie seu perfil de Herói agora.
                        </a>
                    </LoginSignup>
                </LoginBox>
            </LoginBoxWrapper>
            <Footer />
        </Container>
    );
};

export default Login;

// ===================================
// ESTILOS (Styled Components)
// ===================================

const Container = styled.div`
  position: relative;
  min-height: 100dvh;
  background: linear-gradient(rgba(0, 0, 0, 0.83), rgba(0, 0, 0, 0.83)), url(${bannerUrl});
  background-size: cover;
  background-position: center;
  font-family: sans-serif;
  color: #fff;
  display: flex;
  flex-direction: column; 
`;

const HeaderPlaceholder = styled.div`
  padding: 20px 10%;
  font-size: 3.5rem;
  font-style: italic;
  font-weight: bold;
  z-index: 10;
  position: relative;
  & a {
    text-decoration: none;
    color: #1948c7ff;
  }
`;

const LoginBoxWrapper = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center; 
    padding-bottom: 50px;
`;

const LoginBox = styled.div`
  max-width: 480px;
  padding: 40px 68px;
  background-color: rgba(0, 0, 0, 0.75); 
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  position: relative;
  z-index: 5;
`;

const LoginTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: bold;
  margin-bottom: 28px;
  text-align: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LoginInput = styled.input`
  padding: 16px 20px;
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  
  &:focus {
    border-bottom: 2px solid #1948c7ff;
  }
`;

const LoginHelp = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.8rem;
  color: #b3b3b3;
  margin-top: 5px;

  /* Checkbox e Link */
  & label {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const LoginSignup = styled.div`
  margin-top: 50px;
  font-size: 1rem;
  text-align: center; 
  
  & span {
    color: #a8a8a8ff;
  }
  
  & a {
    color: #fff;
    text-decoration: none;
    margin-left: 5px;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;