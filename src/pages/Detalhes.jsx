import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import styled from "styled-components";

// URL base para imagens grandes (banners) do TMDB
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const HERO_BLUE = '#1948c7';

const Detalhes = () => {
  const { tipo, id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        // Acessa a rota correta do Django: /api/item/filmes/617126
        const res = await api.get(`/item/${tipo}/${id}/`);
        setItem(res.data);
      } catch (err) {
        console.error("Erro ao buscar item:", err);
        setErro(true);
      } finally { 
        setLoading(false); 
      }
    };
    fetchItem();
  }, [tipo, id]);

  if (loading) return <Loading>Carregando Detalhes...</Loading>;
  if (erro || !item) return <Error>Item não encontrado. Verifique se o backend está ativo e a TMDB API Key está correta.</Error>;

  // Extrai dados do TMDB, tratando tanto Filme quanto Série
  const titulo = item.title || item.name;
  const descricao = item.overview;
  const generos = item.genres ? item.genres.map(g => g.name).join(', ') : 'N/A';
  const ano = (item.release_date || item.first_air_date || '').substring(0, 4);
  const bannerPath = item.backdrop_path;
  const capaPath = item.poster_path;


  return (
    <Container>
      {/* BOTÃO MOVIDO PARA O TOPO E POSICIONADO FORA DA BANNER SECTION */}
      <Button onClick={() => navigate(-1)}>← Voltar</Button>
      
      <BannerSection $bannerUrl={bannerPath ? `${IMAGE_BASE_URL}${bannerPath}` : null}>
        <Overlay>
          <Content>
            <Title>{titulo}</Title>
            <Description>{descricao}</Description>
            <Info><strong>Gênero:</strong> {generos}</Info>
            <Info><strong>Ano de Lançamento:</strong> {ano}</Info>
          </Content>
        </Overlay>
      </BannerSection>
      
      <BottomContent>
        {capaPath && <Cover src={`${IMAGE_BASE_URL}${capaPath}`} alt={titulo} />}
        <ExtraInfo>
            <h3>Sinopse Completa</h3>
            <p>{descricao || "Sem descrição disponível."}</p>
        </ExtraInfo>
      </BottomContent>

    </Container>
  );
};

export default Detalhes;

// =================== Styled Components ===================

const Container = styled.div`
  background-color: #111;
  min-height: 100vh;
  color: #fff;
  font-family: sans-serif;
`;

const Loading = styled.p`
  color: #fff;
  padding: 50px;
  text-align: center;
`;

const Error = styled.p`
  color: red;
  padding: 50px;
  text-align: center;
`;

const Button = styled.button`
  /* NOVO: Estilo para posicionar no canto superior esquerdo */
  position: fixed; 
  top: 40px; 
  left: 4rem; /* 4rem = 64px, para alinhar com o padding do banner/conteúdo */
  z-index: 100; /* Garante que fique acima de tudo */
  
  background: ${HERO_BLUE};
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  font-weight: 500;
  transition: background 0.2s;
  &:hover { background: #0f3270; }
`;

const BannerSection = styled.section`
  position: relative;
  height: 60vh;
  background: ${props => props.$bannerUrl 
    ? `linear-gradient(to bottom, rgba(17, 17, 17, 0.4), rgba(17, 17, 17, 1)), url(${props.$bannerUrl})` 
    : '#111'};
  background-size: cover;
  background-position: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 40px 4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Content = styled.div`
  max-width: 700px;
  z-index: 10;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 15px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 15px;
  line-height: 1.4;
`;

const Info = styled.p`
  font-size: 1rem;
  margin-bottom: 8px;
  & strong {
    color: ${HERO_BLUE};
  }
`;

const BottomContent = styled.div`
    padding: 40px 4rem;
    display: flex;
    gap: 40px;
    align-items: flex-start;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
`;

const Cover = styled.img`
    width: 250px;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.5);
`;

const ExtraInfo = styled.div`
    flex-grow: 1;
    h3 {
        font-size: 1.8rem;
        margin-bottom: 15px;
        color: ${HERO_BLUE};
    }
    p {
        font-size: 1rem;
        line-height: 1.6;
        color: #ddd;
    }
`;