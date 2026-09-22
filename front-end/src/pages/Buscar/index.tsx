import { useState } from "react";
import { FeedSidebar } from "../../components/Feed/FeedSidebar";
import { UserCard } from "../../components/Search/UserCard";
import {
  useLazySearchUsersQuery,
  useGetAllUsersQuery,
} from "../../store/api/usersApi";
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
  SectionTitle,
} from "./styles";
import { SearchIcon } from "../../styles/svgs";

export function EncontrarPage() {
  const [query, setQuery] = useState("");

  const [
    triggerSearch,
    {
      data: searchResults,
      isLoading: searching,
      isFetching,
      isError,
      isUninitialized,
    },
  ] = useLazySearchUsersQuery();

  // Recomendações: carregadas imediatamente ao entrar na página
  const { data: allUsers = [], isLoading: loadingAll } = useGetAllUsersQuery();

  function handleSearch() {
    if (!query.trim()) return;
    triggerSearch(query.trim());
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSearch();
  }

  // Limpa a busca ao apagar o campo
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  const loading = searching || isFetching;
  const showSearch = !isUninitialized; // já buscou algo
  const showAllUsers = isUninitialized && !loadingAll; // ainda não buscou

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
              onChange={handleInputChange}
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

          {/* ── Recomendações (antes de qualquer busca) ──────────────────── */}
          {showAllUsers && (
            <>
              <SectionTitle>Recomendações para você:</SectionTitle>
              {loadingAll && <FeedbackMsg>Carregando...</FeedbackMsg>}
              {allUsers.length === 0 && !loadingAll && (
                <FeedbackMsg>Nenhum usuário disponível.</FeedbackMsg>
              )}
              <ResultsGrid>
                {allUsers.map((user) => (
                  <UserCard key={user.username} {...user} />
                ))}
              </ResultsGrid>
            </>
          )}

          {/* ── Resultados da busca ───────────────────────────────────────── */}
          {showSearch && (
            <>
              {loading && <FeedbackMsg>Buscando...</FeedbackMsg>}

              {isError && (
                <FeedbackMsg>
                  Erro ao buscar usuários. Tente novamente.
                </FeedbackMsg>
              )}

              {!loading && !isError && searchResults?.length === 0 && (
                <FeedbackMsg>
                  Nenhum usuário encontrado para "{query}".
                </FeedbackMsg>
              )}

              {!loading &&
                !isError &&
                searchResults &&
                searchResults.length > 0 && (
                  <>
                    <SectionTitle>Resultados para "{query}":</SectionTitle>
                    <ResultsGrid>
                      {searchResults.map((user) => (
                        <UserCard key={user.username} {...user} />
                      ))}
                    </ResultsGrid>
                  </>
                )}
            </>
          )}
        </MainContent>
      </PageLayout>
    </>
  );
}
