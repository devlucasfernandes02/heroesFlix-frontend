import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom'; // IMPORTANTE: Adicione Link e useNavigate
import ListaDeConteudos from '../components/ListaDeConteudos';

const Home = () => {
    const navigate = useNavigate();
    
    return (
        <HomeContainer>
            <HomeHeader>
                {/* Usando useNavigate no logo para ir para a Home Logada */}
                <Logo src="/logo.png" alt="HeroesFlix" className="logo" onClick={() => navigate('/Home')} />
                
                <nav>
                    {/* Usando o componente Link para navegação interna */}
                    <StyledLink to="/Home">Início</StyledLink>
                    <StyledLink to="/series">Séries</StyledLink> {/* Rota a ser implementada */}
                    <StyledLink to="/filmes">Filmes</StyledLink> {/* Rota a ser implementada */}
                    {/* Usando Link em vez de <a> evita o recarregamento completo da página */}
                </nav>
            </HomeHeader>

            <Banner>
                {/* Conteúdo do Banner */}
                <img src="/banner.jpg" alt="Banner" />
                <BannerInfo>
                    <h1>O Herói da Meia-Noite</h1>
                    <p>O melhor dos heróis com superpoderes e ação ininterrupta!</p>
                    <button>Assistir</button>
                </BannerInfo>
            </Banner>

            <ContentWrapper>
                <ListaDeConteudos 
                    titulo="Continuar Assistindo" 
                    // Certifique-se de implementar esta view no seu views.py!
                    endpoint="filmes/continue-watching" 
                />

                <ListaDeConteudos 
                    titulo="Populares em HeroesFlix" 
                    // Este endpoint corresponde à view 'filmes_populares' no backend
                    endpoint="filmes/populares" 
                />

                <ListaDeConteudos 
                    titulo="Ação e Aventura" 
                    // CORRIGIDO: Assumimos que você implementou a view 'filmes_acao'
                    endpoint="filmes/acao" 
                />

                <ListaDeConteudos 
                    titulo="Os Mais Bem Avaliados" 
                    // Este endpoint corresponde à view 'filmes_top10'
                    endpoint="filmes/top10" 
                />
            </ContentWrapper>


            <HomeFooter>
                HeroesFlix &copy; {new Date().getFullYear()} - Inspirado na Netflix
            </HomeFooter>
        </HomeContainer>
    );
};

export default Home;


// -----------------------------------------------------------
// STYLED COMPONENTS
// -----------------------------------------------------------

const StyledLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    font-weight: 500;
    font-size: 1.1rem;
    transition: color 0.2s;

    &:hover {
        color: #e50914;
    }
`;

const Logo = styled.img`
    height: 48px;
    cursor: pointer; /* Adiciona cursor pointer para indicar que é clicável */
`;

const ContentWrapper = styled.div`
    padding-top: 20px;
`;

const HomeContainer = styled.div`
    background: #141414;
    color: #fff;
    min-height: 100vh;
    font-family: 'Roboto', Arial, sans-serif;
`;

const HomeHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 40px;
    background: #181818;

    .logo {
        height: 48px;
    }

    nav {
        display: flex;
        gap: 32px;
    }
`;

const Banner = styled.section`
    position: relative;
    width: 100%;
    height: 340px;
    overflow: hidden;
    margin-bottom: 32px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: brightness(0.6);
    }
`;

const BannerInfo = styled.div`
    position: absolute;
    top: 40px;
    left: 60px;
    z-index: 2;

    h1 {
        font-size: 2.8rem;
        margin-bottom: 12px;
        color: #fff;
        text-shadow: 2px 2px 8px #000;
    }

    p {
        font-size: 1.3rem;
        margin-bottom: 18px;
        color: #fff;
        text-shadow: 1px 1px 6px #000;
    }

    button {
        background: #e50914;
        color: #fff;
        border: none;
        padding: 12px 32px;
        font-size: 1.1rem;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        transition: background 0.2s;

        &:hover {
            background: #b0060f;
        }
    }
`;

const HomeFooter = styled.footer`
    text-align: center;
    padding: 24px 0;
    background: #181818;
    color: #aaa;
    font-size: 1rem;
    margin-top: 40px;
`;