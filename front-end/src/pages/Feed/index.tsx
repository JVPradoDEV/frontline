import { FeedSidebar } from "../../components/Feed/FeedSidebar";
import { FeedGlobalStyle, FeedLayout, MainContent } from "./styles";

export function FeedPage() {
  return (
    <>
      <FeedGlobalStyle />
      <FeedLayout>
        <FeedSidebar />
        <MainContent></MainContent>
      </FeedLayout>
    </>
  );
}
