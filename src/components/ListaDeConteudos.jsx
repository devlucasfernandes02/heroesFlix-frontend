import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import api from "../services/api"; 

// ----------------------
// Variáveis e Estilos
// ----------------------
const ROW_PADDING = '4rem';
const HERO_BLUE = '#1948c7';
const PAGE_SIZE = 20; // TMDB retorna 20 itens por página

// ----------------------
// Componente Principal
// ----------------------
export default function ListaDeConteudos({ titulo, endpoint }) {
  const [conteudos, setConteudos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const rowRef = useRef();

  useEffect(() => {
    setIsLoading(true);
    fetchConteudos(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  const fetchConteudos = async (pageNumber = 1) => {
    try {
      const res = await api.get(`${endpoint}?page=${pageNumber}`);
      const results = res.data.results || res.data;

      if (results.length < PAGE_SIZE) setHasMore(false);

      // Adiciona os novos itens ao estado
      setConteudos((prev) => [...prev, ...results]);
    } catch (err) {
      console.error(`Erro ao buscar ${titulo} (${endpoint}):`, err);
    } finally {
      setIsLoading(false);
    }
  };

  // Detecta scroll horizontal e carrega próxima página
  const handleScroll = () => {
    if (!hasMore || !rowRef.current) return;

    const { scrollLeft, clientWidth, scrollWidth } = rowRef.current;
    if (scrollLeft + clientWidth >= scrollWidth - 5) {
      const nextPage = page + 1;
      fetchConteudos(nextPage);
      setPage(nextPage);
    }
  };

  const getImageUrl = (path) => 
    path ? `https://image.tmdb.org/t/p/w500${path}` : '/assets/placeholder-heroi.png';

  if (isLoading && page === 1) {
    return <LoadingText>Carregando {titulo}...</LoadingText>;
  }

  if (!conteudos || conteudos.length === 0) return null;

  return (
    <ListContainer>
      <Title>{titulo}</Title>
      
      <ScrollableRow ref={rowRef} onScroll={handleScroll}>
        {conteudos.map((f) => f.id && (
          <ItemWrapper 
            key={f.id} 
            title={f.title || f.name} 
            onClick={() => console.log('Navegar para detalhes do ID:', f.id)}
          >
            <ContentImage
              src={getImageUrl(f.poster_path)}
              alt={f.title || f.name}
            />
          </ItemWrapper>
        ))}
      </ScrollableRow>
    </ListContainer>
  );
}

// ----------------------
// STYLED COMPONENTS
// ----------------------

const LoadingText = styled.div`
  color: white;
  padding-left: ${ROW_PADDING};
  font-size: 1.2rem;
  margin-top: 20px;
`;

const ListContainer = styled.div`
  padding: 1rem 0;
  color: white;
  margin-top: 15px; 
`;

const Title = styled.h2`
  padding-left: ${ROW_PADDING};
  margin-bottom: 0.8rem;
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
`;

const ScrollableRow = styled.div`
  display: flex;
  padding: 0 ${ROW_PADDING};
  gap: 0.8rem;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ItemWrapper = styled.div`
  flex: 0 0 auto;
  width: 200px;
  cursor: pointer;
  transition: transform 0.3s ease, z-index 0.3s ease;
  position: relative;
  
  &:hover {
    transform: scale(1.09);
    z-index: 10;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
`;

const ContentImage = styled.img`
  width: 100%;
  border-radius: 4px;
  min-height: 100px;
  background-color: #333; 
  
  ${ItemWrapper}:hover & {
    border: 2px solid ${HERO_BLUE};
  }
`;
