import React from 'react';
import styled, { keyframes } from 'styled-components';
import bannerUrl from '../assets/Heroes-image.webp';
import Button from '../components/Button';
import Footer from '../components/Footer';

// Animações
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Componente principal
const Inicial = () => (
    <Container>
        <Header>
            <Logo>HeroesFlix</Logo>
            <ButtonHeader onClick={() => window.location.href = '/Login'}>
                Entrar
            </ButtonHeader>
        </Header>

        <Banner>
            
            <Overlay>
                <Content>
                    <Title>
                        Bem-vindo ao <Highlight>HeroesFlix!</Highlight>
                    </Title>
                    <Subtitle>Sua plataforma definitiva para filmes e séries de super-heróis!</Subtitle>
                    <ButtonInicial onClick={() => window.location.href = '/Login'}>
                        Entrar
                    </ButtonInicial>
                </Content>
            </Overlay>
        </Banner>
        <CardsSection>
        <GradientRadialBlur />
            <SectionTitle>Por que Escolher HeroesFlix?</SectionTitle>
            <CardsContainer onClick={() => window.location.href = '/Login'}>
                <Card>
                    <CardTitle>Missões em Qualquer Tela</CardTitle>
                    <CardText>
                        Assista em Smart TVs, consoles (PlayStation, Xbox), Chromecast, laptops e outros dispositivos. O quartel-general é onde você estiver.
                    </CardText>
                    <CardIcon>🖥️</CardIcon>
                </Card>
                <Card>
                    <CardTitle>Baixe para Combater Offline</CardTitle>
                    <CardText>
                        Salve seus filmes e séries favoritos de heróis para assistir onde a conexão é fraca. Prepare sua Liga para o ataque.
                    </CardText>
                    <CardIcon>⬇️</CardIcon>
                </Card>
                <Card>
                    <CardTitle>Liberdade Total de Acesso</CardTitle>
                    <CardText>
                        Assista a quantos filmes e séries quiser no celular, tablet, laptop e TV, sem limites ou restrições de dispositivos.
                    </CardText>
                    <CardIcon>🔭</CardIcon>
                </Card>
                <Card>
                    <CardTitle>Zona de Treinamento Infantil</CardTitle>
                    <CardText>
                        Crie um perfil seguro para os futuros heróis assistirem apenas a conteúdos apropriados, sem precisar pagar nada a mais.
                    </CardText>
                    <CardIcon>😊</CardIcon>
                </Card>
            </CardsContainer>
        </CardsSection>
        <Footer />
    </Container>
);

export default Inicial;

// ----------------------
// Styled Components
// ----------------------

const Container = styled.div`
  
  background-color: #141414;
  color: #fff;
  font-family: cursive;
`;

const Header = styled.header`
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #000;
  z-index: 100;
`;

const Logo = styled.h1`
  color: #1948c7ff;
  font-family: cursive;
  font-size: 3.5rem;
  font-style: italic;
  animation: ${fadeIn} 1s ease forwards;
`;

const ButtonHeader = styled(Button)`
  animation: ${fadeIn} 1.2s ease forwards;
`;

const Banner = styled.div`
  height: 80dvh;
  background: linear-gradient(rgba(0,0,0,0.83), rgba(0,0,0,0.83)), url(${bannerUrl});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid #1948c7ff;
  margin-top: -100px;
  z-index: 1;
`;


const Overlay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  padding: 2rem 3rem;
  border-radius: 10px;
  text-align: center;
  animation: ${fadeIn} 1.5s ease forwards;
`;

const Title = styled.h1`
  font-size: 5rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const Highlight = styled.span`
  color: #1948c7ff;
`;

const Subtitle = styled.p`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

const ButtonInicial = styled(Button)`
  margin-top: 0.5rem;  
  font-size: 22px!important;
`;

// Gradiente com blur
const GradientRadialBlur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10%;           // ajuste conforme necessidade
  z-index: 0;            // atrás do conteúdo
  background: radial-gradient(circle at bottom, #1948c7ff, transparent);
  opacity: 0.5;          // controla intensidade
  filter: blur(60px);    // efeito blur
  pointer-events: none;  // evita que interfira em cliques
`;

const CardsSection = styled.section`
  padding: 3rem 2rem;
  background: #0a0a0a;   // fundo escuro fora do banner
  z-index: 2;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
  color: #fff;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: rgba(25, 72, 199, 0.1);
  border: 1px solid rgba(25, 72, 199, 0.3);
  border-radius: 15px;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  color: #fff;
  transition: transform 0.3s ease, background 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(25, 72, 199, 0.2);
  }
    cursor: pointer;
`;

const CardTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: bold;
`;

const CardText = styled.p`
  font-size: 1.2rem;
  color: #e0e0e0;
`;

const CardIcon = styled.div`
  font-size: 2rem;
  margin-top: auto;
  align-self: flex-end;
`;

