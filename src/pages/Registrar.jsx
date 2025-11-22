import React, { useState } from 'react';
import styled from 'styled-components';
import bannerUrl from '../assets/Heroes-image.webp';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Registrar = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        try {
            const response = await api.post("users/", {
                name: email.split("@")[0],  
                email: email,
                password: senha,
                confirm_password: confirmaSenha
            });

            alert("Conta criada com sucesso!");
            navigate('/Login');

        } catch (error) {

            if (error.response) {
                setErrorMsg(error.response.data.error || "Erro ao registrar.");
            } else {
                setErrorMsg("Erro ao conectar com o servidor.");
            }
        }
    };

    return (
        <Container>
            <HeaderPlaceholder>
                <a href="/">HeroesFlix</a>
            </HeaderPlaceholder>
            
            <LoginBoxWrapper>
                <LoginBox>
                    <LoginTitle>Cadastre seu Perfil de Herói</LoginTitle>
                    
                    <LoginForm onSubmit={handleRegister}>
                        <LoginInput
                            type="email"
                            placeholder="Email do Quartel-General"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <LoginInput
                            type="password"
                            placeholder="Crie uma Senha Secreta"
                            required
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />

                        <LoginInput
                            type="password"
                            placeholder="Confirme a Senha Secreta"
                            required
                            value={confirmaSenha}
                            onChange={(e) => setConfirmaSenha(e.target.value)}
                        />
                        
                        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
                      
                        <Button type="submit">
                            Registrar
                        </Button>

                        <LoginHelp>
                            <p>
                                Ao se registrar, você concorda com nossos Termos de Missão.
                            </p>
                        </LoginHelp>
                    </LoginForm>
                    
                    <LoginSignup>
                        <span>Já tem um Perfil de Herói?</span>
                        <Link to="/Login">
                            Acesse o Quartel-General.
                        </Link>
                    </LoginSignup>
                </LoginBox>
            </LoginBoxWrapper>
            <Footer />
        </Container>
    );
};

export default Registrar;

/* ===================================
   ESTILOS
=================================== */

const Container = styled.div`
  position: relative;
  min-height: 100dvh;
  background: linear-gradient(rgba(0, 0, 0, 0.83), rgba(0, 0, 0, 0.83)), url(${bannerUrl});
  background-size: cover;
  background-position: center;
  color: #fff;
  display: flex;
  flex-direction: column;
`;

const HeaderPlaceholder = styled.div`
  padding: 20px 10%;
  font-size: 3.5rem;
  font-style: italic;
  font-weight: bold;
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
  padding: 60px 68px; 
  background-color: rgba(0, 0, 0, 0.75); 
  border-radius: 4px;
`;

const LoginTitle = styled.h2`
  font-size: 2.4rem;
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
`;

const LoginHelp = styled.div`
  display: flex;
  justify-content: center;
  font-size: 0.8rem;
  color: #b3b3b3;
`;

const LoginSignup = styled.div`
  margin-top: 50px;
  text-align: center; 
  & span {
    color: #a8a8a8ff;
  }
  & a {
    color: #fff;
    text-decoration: none;
  }
`;

const ErrorMessage = styled.p`
    color: #E50914;
    font-size: 1rem;
    text-align: center;
    margin-top: -8px;
`;
