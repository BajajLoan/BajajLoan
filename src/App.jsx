import { useAuth } from "./navigation/AuthContext";
import AppStack from "./navigation/AppStack";
import AuthStack from "./navigation/AuthStack";

const App = () => {
  const { token } = useAuth();

  return token ? <AppStack /> : <AuthStack />;
};

export default App;
