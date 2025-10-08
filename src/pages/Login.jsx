import React, { useState, useEffect } from 'react'; // Adicionado para estado e validação
import styled from 'styled-components';
import bannerUrl from '../assets/Heroes-image.webp';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [isFormValid, setIsFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    useEffect(() => {
        let error = '';
        let isValid = false;

        const areFieldsFilled = email.length > 0 && password.length > 0;

        if (areFieldsFilled) {
            if (!validateEmail(email)) {
                error = 'Email inválido.';
            } else if (password.length < 6) {
                error = 'A senha deve ter no mínimo 6 caracteres.';
            } else {
                isValid = true;
            }
        }
        
        if (isValid || (email.length === 0 && password.length === 0)) {
             setErrorMessage('');
        } else {
             setErrorMessage(error);
        }

        setIsFormValid(isValid);

    }, [email, password]); // Dependências: reexecuta sempre que email ou password mudam

    const handleLogin = (e) => {
        e.preventDefault();

        if (!isFormValid) {
            setErrorMessage('Por favor, corrija os erros do formulário.');
            console.error('Tentativa de login com formulário inválido.');
            return;
        }
        
        // Simulação de autenticação bem-sucedida
        // console.log('Login efetuado com:', { email, password });
        alert('Login bem-sucedido! Redirecionando para Home.'); 
        navigate('/Home');
    };

    return (
        <Container>
          
            <HeaderPlaceholder>
                 <a href="/">HeroesFlix</a> 
            </HeaderPlaceholder>
            
            <LoginBoxWrapper>
                <LoginBox>
                    <LoginTitle>Acesso ao Quartel-General</LoginTitle>
                    {/* Alterado para usar onSubmit e handleLogin */}
                    <LoginForm onSubmit={handleLogin}>
                        <LoginInput
                            type="email"
                            placeholder="Email ou Telefone"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            // Prop que será usada no styled-component para mudar a cor da borda
                            $isInvalid={email.length > 0 && !validateEmail(email)}
                        />
                        <LoginInput
                            type="password"
                            placeholder="Senha (mínimo 6 caracteres)"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            // Prop que será usada no styled-component para mudar a cor da borda
                            $isInvalid={password.length > 0 && password.length < 6}
                            />
                        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                        <Button type="submit">
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
                        <Link to="/Registrar">
                            Crie seu perfil de Herói agora.
                        </Link>
                    </LoginSignup>
                </LoginBox>
            </LoginBoxWrapper>
            <Footer />
        </Container>
    );
};

export default Login;

// ===================================
// ESTILOS (Styled Components) - Ajustados para suportar props de validação
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
  /* Adicionado border transparente para evitar layout shift */
  border: 1px solid transparent; 
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  
  &:focus {
    border-bottom: 2px solid #1948c7ff;
  }
  
  /* Aplica o estilo de erro quando a prop $isInvalid for verdadeira */
  ${props => props.$isInvalid && `
    border-bottom: 2px solid #E50914; /* Vermelho de erro */
  `}
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

// Novo componente para a mensagem de erro (usa position: absolute na tela)
const ErrorMessage = styled.p`
    
    background-color: #E50914; /* Vermelho Netflix */
    color: white;
    padding: 8px 15px;
    border-radius: 4px;
    font-size: 0.9rem;
    z-index: 20;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;
