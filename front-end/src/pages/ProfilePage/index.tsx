import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
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
import { selectUserProfile } from "../../store/slices/authSlice";
import {
  useGetPublicUserProfileQuery,
  useGetUserFollowedsQuery,
  useGetUserFollowersQuery,
} from "../../store/api/usersApi";
import { useGetUserPostsQuery } from "../../store/api/postsApi";
import { colors } from "../../styles/colors";
import { FollowList } from "../../components/Profile/FollowList";

type ActiveTab = "seguidores" | "seguindo" | null;

export function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const currentUser = useSelector(selectUserProfile);
  const isOwnProfile = currentUser.username === username;

  const [activeTab, setActiveTab] = useState<ActiveTab>(null);

  const { data: userInfo, isLoading: loadingProfile } =
    useGetPublicUserProfileQuery(username!, {
      skip: !username,
      refetchOnMountOrArgChange: true,
    });

  const { data: posts = [], isLoading: loadingPosts } = useGetUserPostsQuery(
    username!,
    {
      skip: !username,
      refetchOnMountOrArgChange: true,
    },
  );

  const {
    data: followers = [],
    isLoading: loadingFollowers,
    refetch: refetchFollowers,
  } = useGetUserFollowersQuery(username!, {
    skip: !username || activeTab !== "seguidores",
  });

  const {
    data: followeds = [],
    isLoading: loadingFolloweds,
    refetch: refetchFolloweds,
  } = useGetUserFollowedsQuery(username!, {
    skip: !username || activeTab !== "seguindo",
  });

  const isLoading = loadingProfile || loadingPosts;

  function handleTabChange(tab: ActiveTab) {
    setActiveTab(tab);

    if (tab === "seguidores") {
      refetchFollowers();
    } else if (tab === "seguindo") {
      refetchFolloweds();
    }
  }

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
            <PageTitle>
              {isLoading
                ? "..."
                : userInfo?.nickname || userInfo?.username || "Perfil"}
            </PageTitle>
          </ProfilePageHeader>

          {isLoading && (
            <p style={{ color: `${colors.gray}`, padding: "24px" }}>
              Carregando...
            </p>
          )}

          {!isLoading && userInfo && (
            <>
              <ProfileHeader
                key={username}
                user={userInfo}
                isOwnProfile={isOwnProfile}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />

              {activeTab === "seguidores" && (
                <FollowList
                  title="Seguidores"
                  users={followers}
                  isLoading={loadingFollowers}
                  currentUsername={currentUser.username}
                  onClose={() => setActiveTab(null)}
                />
              )}

              {activeTab === "seguindo" && (
                <FollowList
                  title="Seguindo"
                  users={followeds}
                  isLoading={loadingFolloweds}
                  currentUsername={currentUser.username}
                  onClose={() => setActiveTab(null)}
                />
              )}

              <ProfilePostList posts={posts} isOwnProfile={isOwnProfile} />
            </>
          )}

          {!isLoading && !userInfo && (
            <p style={{ color: `${colors.gray}`, padding: "24px" }}>
              Usuário não encontrado.
            </p>
          )}
        </ProfileMain>
      </ProfileLayout>
    </>
  );
}
