import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const ROW_PADDING = '4rem';
const HERO_BLUE = '#1948c7';
const PAGE_SIZE = 20;

export default function ListaDeConteudos({ titulo, endpoint, tipo }) {
  const [conteudos, setConteudos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const rowRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    setConteudos([]);
    setPage(1);
    setHasMore(true);
    fetchConteudos(1);
  }, [endpoint]);

  const fetchConteudos = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`${endpoint}?page=${pageNumber}`);
      const results = res.data.results || res.data;
      if (results.length < PAGE_SIZE) setHasMore(false);
      setConteudos(prev => [...prev, ...results]);
    } catch (err) {
      console.error(`Erro ao buscar ${titulo}:`, err);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (!hasMore || !rowRef.current || loading) return;
    const { scrollLeft, clientWidth, scrollWidth } = rowRef.current;
    if (scrollLeft + clientWidth >= scrollWidth - 5) {
      const nextPage = page + 1;
      fetchConteudos(nextPage);
      setPage(nextPage);
    }
  };

  const getImageUrl = (path) =>
    path ? `https://image.tmdb.org/t/p/w500${path}` : '/assets/placeholder-heroi.png';

  if (loading && conteudos.length === 0) {
    return (
      <ListContainer>
        <Title>{titulo}</Title>
        <LoadingPlaceholder>Carregando {titulo}...</LoadingPlaceholder>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      <Title>{titulo}</Title>
      <ScrollableRow ref={rowRef} onScroll={handleScroll}>
        {conteudos.map(f => (
          <ItemWrapper
            key={f.id}
            onClick={() => navigate(`/item/${tipo}/${f.id}/`)}
            title={f.title || f.name}
          >
            <ContentImage
              src={getImageUrl(f.poster_path)}
              alt={f.title || f.name}
            />
          </ItemWrapper>
        ))}
        {loading && conteudos.length > 0 && <Spinner>...</Spinner>}
      </ScrollableRow>
    </ListContainer>
  );
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
  &::-webkit-scrollbar { display: none; }
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
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  }
`;

const ContentImage = styled.img`
  width: 100%;
  border-radius: 4px;
  min-height: 100px;
  background-color: #333;
  ${ItemWrapper}:hover & { border: 2px solid ${HERO_BLUE}; }
`;

const LoadingPlaceholder = styled.div`
  padding-left: ${ROW_PADDING};
  color: #aaa;
  font-size: 1.2rem;
`;

const Spinner = styled.div`
  color: ${HERO_BLUE};
  font-size: 2rem;
  padding: 0 2rem;
  animation: ${spin} 1s infinite linear;
`;