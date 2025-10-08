import React, { useState, useEffect } from 'react'; // 1. Importando os Hooks
import styled from 'styled-components';
import bannerUrl from '../assets/Heroes-image.webp';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { useNavigate, Link } from 'react-router-dom';

const Registrar = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [erroSenha, setErroSenha] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (confirmaSenha && senha !== confirmaSenha) {
            setErroSenha('As senhas não coincidem!');
            setIsFormValid(false);
        } else if (senha && senha.length < 6) {
             setErroSenha('A senha deve ter no mínimo 6 caracteres.');
             setIsFormValid(false);
        }
        else {
            setErroSenha('');
            if (email && senha && confirmaSenha && senha === confirmaSenha) {
                setIsFormValid(true);
            } else {
                setIsFormValid(false);
            }
        }
    }, [senha, confirmaSenha, email]);


    const handleRegister = (e) => {
        e.preventDefault();
        
        if (!isFormValid) {
            alert('Por favor, corrija os erros do formulário antes de registrar.');
            return;
        }
        // console.log('Dados para registro:', { email, senha });

        navigate('/Login');
    };

    return (
        <Container>
            <HeaderPlaceholder>
                 <a href="/">HeroesFlix</a> {/* Logo/Link para a Home */}
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
                            placeholder="Crie uma Senha Secreta (mín. 6)"
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
                        
                        {/* Exibição da mensagem de erro */}
                        {erroSenha && <ErrorMessage>{erroSenha}</ErrorMessage>}
                      
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
  padding: 60px 68px; 
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
  justify-content: center;
  font-size: 0.8rem;
  color: #b3b3b3;
  margin-top: 5px;
  text-align: center;
  & p {
    margin: 0;
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

// Novo estilo para exibir a mensagem de erro
const ErrorMessage = styled.p`
    color: #E50914; /* Vermelho padrão de erro/Netflix */
    font-size: 0.9rem;
    margin: 0;
    padding-left: 5px;
    text-align: left;
`;