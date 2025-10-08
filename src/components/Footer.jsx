import React from 'react';
import styled from 'styled-components';

// --- Estrutura do Componente ---

const Footer = () => {
    return (
        <FooterContainer>
            <FooterContent>
                {/* Informações da Empresa / Copyright */}
                <BrandSection>
                    <FooterLogo> <a href="/">HeroesFlix</a></FooterLogo>
                    <FooterText>
                        © {new Date().getFullYear()} HeroesFlix. Todos os direitos reservados.
                        <br />
                        O universo de heróis gratuito que você sempre quis!
                        <br />
                        <Disclaimer>
                            Este é um projeto de estudo e não possui fins comerciais.
                        </Disclaimer>
                    </FooterText>
                </BrandSection>
                
                {/* Colunas de Links */}
                <FooterGrid>
                    <FooterLinksColumn>
                        <FooterLink href="/Login">Acesso Secreto</FooterLink>
                        <FooterLink href="#">Termos de Missão</FooterLink>
                        <FooterLink href="#">Regras da Liga</FooterLink>
                        <FooterLink href="#">Ajuda</FooterLink>
                    </FooterLinksColumn>

                    <FooterLinksColumn>
                        <FooterLink href="#">Centro de Imprensa</FooterLink>
                        <FooterLink href="#">Carreiras de Herói</FooterLink>
                        <FooterLink href="#">Preferências de Cookies</FooterLink>
                        <FooterLink href="#">Doações (App Gratuito)</FooterLink>
                    </FooterLinksColumn>
                    
                    <FooterLinksColumn>
                        <FooterLink href="#">Gift Cards</FooterLink>
                        <FooterLink href="#">Comunidade</FooterLink>
                        <FooterLink href="#">Privacidade</FooterLink>
                        <FooterLink href="#">Fale com o Vigilante</FooterLink>
                    </FooterLinksColumn>
                </FooterGrid>
                
            </FooterContent>
            <CTA>
                Pronto para a Ação? <a href="/registrar">Crie seu perfil de Herói.</a>
            </CTA>
        </FooterContainer>
    );
};

export default Footer;

// --- Estilos do Componente ---

const FooterContainer = styled.footer`
  background-color: #000; 
  border-top: 5px solid #1948c7ff;
  padding: 40px 5%;
  color: #737373;
  font-family: sans-serif;
  z-index: 0;
`;

const FooterContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-bottom: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start; /* Alinha o conteúdo ao topo */
  }
`;

const BrandSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
`;

const FooterLogo = styled.span`
  font-size: 1.8rem; 
  font-weight: bold;
  color: #1948c7ff;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
    & a {
    text-decoration: none;
    color: #1948c7ff;
  }
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.5;
`;

const Disclaimer = styled.span`
    display: block;
    margin-top: 10px;
    font-size: 0.8rem;
    color: #444; /* Cor mais sutil */
`;

const FooterGrid = styled.div`
    display: grid;
    /* 3 Colunas em telas grandes, 1 coluna em telas pequenas */
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); 
    gap: 20px;
    flex-grow: 1; /* Permite que o grid ocupe o espaço restante */
`;

const FooterLinksColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const FooterLink = styled.a`
  color: #737373;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`;

const CTA = styled.div`
    border-top: 1px solid #222;
    padding-top: 20px;
    text-align: center;
    font-size: 1rem;
    color: #a8a8a8;

    & a {
        color: #1948c7ff; /* Cor azul do HeroesFlix */
        text-decoration: none;
        font-weight: bold;
        &:hover {
            text-decoration: underline;
        }
    }
`;