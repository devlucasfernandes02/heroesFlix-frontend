import React, { useState } from 'react';
import styled from 'styled-components';
import bannerUrl from '../assets/Heroes-image.webp';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        // validação mínima
        if (!email || !password) {
            setErrorMessage("Preencha email e senha.");
            return;
        }

        try {
            setLoading(true);
            setErrorMessage('');

            const response = await api.post('login/create/', {
                email,
                password
            });

            console.log("Login OK:", response.data);
            navigate('/Perfil');

        } catch (error) {
            console.error("Erro no login:", error);

            if (error.response?.status === 401) {
                setErrorMessage("Email ou senha incorretos.");
            } else {
                setErrorMessage("Erro ao conectar ao servidor.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <HeaderPlaceholder>
                <a href="/">HeroesFlix</a>
            </HeaderPlaceholder>

            <LoginBoxWrapper>
                <LoginBox>
                    <LoginTitle>Acesso ao Quartel-General</LoginTitle>

                    <LoginForm onSubmit={handleLogin}>
                        <LoginInput
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <LoginInput
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

                        <Button type="submit" disabled={loading}>
                            {loading ? "Entrando..." : "Entrar"}
                        </Button>
                    </LoginForm>

                    <LoginSignup>
                        <span>Ainda não tem conta?</span>
                        <Link to="/Registrar">Crie seu perfil de Herói agora.</Link>
                    </LoginSignup>
                </LoginBox>
            </LoginBoxWrapper>

            <Footer />
        </Container>
    );
};

// =================================== // ESTILOS (Styled Components) - 

export default Login;

// ===================== STYLED COMPONENTS =====================

const Container = styled.div`
  position: relative;
  min-height: 100dvh;
  background: linear-gradient(rgba(0, 0, 0, 0.83), rgba(0, 0, 0, 0.83)),
              url(${bannerUrl});
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
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-bottom: 2px solid #1948c7ff;
  }

  /* Quando vier prop $isInvalid */
  ${props =>
    props.$isInvalid &&
    `
      border-bottom: 2px solid #E50914;
    `}
`;

const LoginHelp = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.8rem;
  color: #b3b3b3;
  margin-top: 5px;

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

const ErrorMessage = styled.p`
  background-color: #E50914;
  color: white;
  padding: 8px 15px;
  border-radius: 4px;
  font-size: 0.9rem;
  z-index: 20;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;
