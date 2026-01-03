import ContentWrapper from "@/components/ui/ContentWrapper";
import Chat from "@/layouts/Chat";
import Navbar from "@/layouts/Navbar";
import Sidebar from "@/layouts/Sidebar";

export default function Home() {
  return (
    <ContentWrapper direction="row" minHeight="100vh">
      <Sidebar />
      <ContentWrapper flexValue="1 1 auto" direction="column">
        <Navbar />
        <Chat />
      </ContentWrapper>
    </ContentWrapper>
  );
}
