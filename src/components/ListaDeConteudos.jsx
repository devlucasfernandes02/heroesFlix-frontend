import React, { useEffect, useState } from "react";
import styled from "styled-components";
// O caminho foi ajustado para refletir 'src/services/api'
import api from "../services/api"; 

// ----------------------
// Variáveis e Estilos (Para melhor organização)
// ----------------------
const ROW_PADDING = '4rem';
const HERO_BLUE = '#1948c7';

// ----------------------
// Componente Principal
// ----------------------

export default function ListaDeConteudos({ titulo, endpoint }) {
  const [conteudos, setConteudos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Chamada ao seu Back-end
    api.get(endpoint)
      .then((res) => setConteudos(res.data.results || res.data)) 
      .catch((err) => console.error(`Erro ao buscar ${titulo} (${endpoint}):`, err))
      .finally(() => setIsLoading(false));
  }, [endpoint, titulo]);

  // Função para retornar a URL da imagem (ou um placeholder)
  const getImageUrl = (path) => 
    path ? `https://image.tmdb.org/t/p/w500${path}` : '/assets/placeholder-heroi.png';
    // Nota: Você deve criar um arquivo /public/assets/placeholder-heroi.png

  if (isLoading) {
    return (
        <LoadingText>Carregando {titulo}...</LoadingText>
    );
  }

  // Não renderiza a lista se não houver conteúdo
  if (!conteudos || conteudos.length === 0) {
      return null; 
  }
  
  return (
    <ListContainer>
      <Title>{titulo}</Title>
      
      <ScrollableRow>
        {conteudos.map((f) => (
          // Garante que só renderizamos se houver ID (chave única)
          f.id && (
            <ItemWrapper 
              key={f.id} 
              // Adiciona título nativo para acessibilidade e debug
              title={f.title || f.name} 
              onClick={() => console.log('Navegar para detalhes do ID:', f.id)}
            >
              <ContentImage
                src={getImageUrl(f.poster_path)}
                alt={f.title || f.name}
              />
            </ItemWrapper>
          )
        ))}
      </ScrollableRow>
    </ListContainer>
  );
}

// -----------------------------------------------------------
// STYLED COMPONENTS
// -----------------------------------------------------------

const LoadingText = styled.div`
    color: white;
    padding-left: ${ROW_PADDING};
    font-size: 1.2rem;
    margin-top: 20px;
`;

const ListContainer = styled.div`
  padding: 1rem 0;
  color: white;
  /* Margem negativa para compensar o padding do Billboard na Home.js */
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
  /* Espaçamento interno lateral da linha de conteúdo */
  padding: 0 ${ROW_PADDING}; 
  gap: 0.8rem; /* Espaçamento entre os itens */
  
  /* Permite o scroll horizontal e oculta a barra de scroll */
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

const ItemWrapper = styled.div`
  flex: 0 0 auto; /* Não cresce, não encolhe, mantém o tamanho */
  width: 200px; /* Largura padrão do item */
  cursor: pointer;
  transition: transform 0.3s ease, z-index 0.3s ease;
  position: relative;
  
  &:hover {
    transform: scale(1.09); /* Efeito de zoom */
    z-index: 10; /* Eleva o item sobre os vizinhos */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
`;

const ContentImage = styled.img`
  width: 100%;
  border-radius: 4px;
  /* Garante que o item ocupe um espaço definido, mesmo se a imagem falhar */
  min-height: 100px; 
  background-color: #333; 
  
  /* Efeito de destaque no hover (opcional, mas comum na Netflix) */
  ${ItemWrapper}:hover & {
    border: 2px solid ${HERO_BLUE};
  }
`;