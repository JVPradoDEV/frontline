import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { usePosts } from "../../contexts/PostsContext";
import { FeedSidebar } from "../../components/Feed/FeedSidebar";
import { ProfileHeader } from "../../components/Profile/ProfileHeader";
import { ProfilePostList } from "../../components/Profile/ProfilePostList";
import {
  ProfileLayout,
  ProfileMain,
  ProfilePageHeader,
  BackButton,
  PageTitle,
  GlobalBackground,
} from "./styles";
import { BackIcon } from "../../styles/svgs";
import { selectCurrentUser } from "../../store/slices/authSlice";
import { useGetPublicUserProfileQuery } from "../../store/api/usersApi";

export function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);
  const isOwnProfile = currentUser.username === username;

  const {
    data: userProfile,
    isLoading,
    isError,
  } = useGetPublicUserProfileQuery(username ?? "", {
    skip: !username, // Não faz o GET se não tiver username na URL
  });

  const { posts } = usePosts();
  const userPosts = posts.filter((post) => post.userHandle === `@${username}`);

  const headerName = userProfile?.nickname || userProfile?.username || "Perfil";

  return (
    <>
      <GlobalBackground />
      <ProfileLayout>
        <FeedSidebar />

        <ProfileMain>
          <ProfilePageHeader>
            <BackButton onClick={() => navigate(-1)} aria-label="Voltar">
              <BackIcon />
            </BackButton>
            <PageTitle>{isLoading ? "Carregando..." : headerName}</PageTitle>
          </ProfilePageHeader>

          {isLoading ? (
            <p style={{ color: "#888", padding: "24px", textAlign: "center" }}>
              Carregando perfil...
            </p>
          ) : isError || !userProfile ? (
            <p style={{ color: "#888", padding: "24px", textAlign: "center" }}>
              Usuário não encontrado.
            </p>
          ) : (
            <>
              <ProfileHeader user={userProfile!} isOwnProfile={isOwnProfile} />
              <ProfilePostList posts={userPosts} />
            </>
          )}
        </ProfileMain>
      </ProfileLayout>
    </>
  );
}
