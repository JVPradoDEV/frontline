import { useState } from "react";
import { FeedSidebar } from "../../components/Feed/FeedSidebar";
import { UserCard } from "../../components/Search/UserCard";
import { useLazySearchUsersQuery } from "../../store/api/usersApi";
import {
  GlobalBackground,
  PageLayout,
  MainContent,
  PageTitle,
  SearchBar,
  SearchInput,
  SearchButton,
  ResultsGrid,
  FeedbackMsg,
} from "./styles";
import { SearchIcon } from "../../styles/svgs";

export function EncontrarPage() {
  const [query, setQuery] = useState("");

  const [
    triggerSearch,
    { data: users, isLoading, isFetching, isError, isUninitialized },
  ] = useLazySearchUsersQuery();

  function handleSearch() {
    if (!query.trim()) return;
    triggerSearch(query.trim());
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSearch();
  }

  const loading = isLoading || isFetching;
  const hasResult = !isUninitialized && !loading;

  return (
    <>
      <GlobalBackground />
      <PageLayout>
        <FeedSidebar />

        <MainContent>
          <PageTitle>
            Encontre outros usuários digitando o seu @ abaixo.
          </PageTitle>

          <SearchBar>
            <SearchInput
              type="text"
              placeholder="@usuario"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <SearchButton
              onClick={handleSearch}
              aria-label="Buscar"
              disabled={loading}
            >
              <SearchIcon />
            </SearchButton>
          </SearchBar>

          {/* Estados de feedback */}
          {loading && <FeedbackMsg>Buscando...</FeedbackMsg>}
          {isError && (
            <FeedbackMsg>Erro ao buscar usuários. Tente novamente.</FeedbackMsg>
          )}
          {hasResult && !isError && users?.length === 0 && (
            <FeedbackMsg>Nenhum usuário encontrado para "{query}".</FeedbackMsg>
          )}

          {/* Grid de resultados */}
          {hasResult && !isError && users && users.length > 0 && (
            <ResultsGrid>
              {users.map((user) => (
                <UserCard key={user.username} {...user} />
              ))}
            </ResultsGrid>
          )}
        </MainContent>
      </PageLayout>
    </>
  );
}
