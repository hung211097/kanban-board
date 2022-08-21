import { Routes } from "./routes";
import HeaderComponent from "components/Header";
import { Layout } from "antd";
import "./App.scss";
const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header className="header">
        <HeaderComponent />
      </Header>
      <Layout className="app-content">
        <Content>
          <Routes />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
