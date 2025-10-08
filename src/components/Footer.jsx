import React from 'react';
import styled from 'styled-components';

// --- Estrutura do Componente ---

const Footer = () => {
    return (
        <FooterContainer>
            <FooterContent>
                <FooterLogo>HeroesFlix</FooterLogo>
                <FooterText>
                    © {new Date().getFullYear()} HeroesFlix. Todos os direitos reservados.
                    <br />
                    O universo de heróis gratuito que você sempre quis!
                </FooterText>
                <FooterLinks>
                    <FooterLink href="/Login">Acesso Secreto</FooterLink>
                 
                </FooterLinks>
            </FooterContent>
        </FooterContainer>
    );
};

export default Footer;

// --- Estilos do Componente ---

const FooterContainer = styled.footer`
  /* Fundo escuro para combinar com o tema do streaming/banner */
  background-color: #000; 
  border-top: 5px solid #1948c7ff; /* Linha de separação azul (referência da sua borda) */
  padding: 40px 5%;
  color: #737373; /* Cor de texto padrão da Netflix */
  font-family: sans-serif;
  z-index: 0;
`;

const FooterContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const FooterLogo = styled.span`
  /* Destaque para o nome do app */
  font-size: 1.8rem; 
  font-weight: bold;
  color: #1948c7ff;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.5;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const FooterLink = styled.a`
  color: #737373;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #fff; /* Fica branco ao passar o mouse */
    text-decoration: underline;
  }
`;