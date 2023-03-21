import SharedLayout from "../components/layout/SharedLayout";
import AuthContextProvider from "../contexts/AuthContextProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <SharedLayout>
        <Component {...pageProps} />
      </SharedLayout>
    </AuthContextProvider>
  );
}

export default MyApp;
