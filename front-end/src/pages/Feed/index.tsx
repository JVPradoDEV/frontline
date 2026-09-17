import { FeedSidebar } from "../../components/Feed/FeedSidebar";
import { CreatePost } from "../../components/Feed/CreatePost";
import { PostList } from "../../components/Feed/PostList";
import { FeedGlobalStyle, FeedLayout, MainContent } from "./styles";

export function FeedPage() {
  return (
    <>
      <FeedGlobalStyle />
      <FeedLayout>
        <FeedSidebar />
        <MainContent>
          <CreatePost />
          <PostList />
        </MainContent>
      </FeedLayout>
    </>
  );
}
