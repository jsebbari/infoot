import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { ThemeContextProvider } from "../context/ThemeContext";
import Footer from "../components/Footer";
import PropagateLoader from "react-spinners/PropagateLoader";
import LoaderPage from "../components/HomePage";
import "aos/dist/aos.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [loadingRouter, setLoadingRouter] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      setLoadingRouter(true);
    };

    const handleStop = () => {
      setLoadingRouter(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);
  return (
    <ThemeContextProvider>
      <div>
        <PropagateLoader
          loading={loadingRouter}
          color={"white"}
          size={30}
          aria-label="Loading Spinner"
          className="spinner"
        />
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </ThemeContextProvider>
  );
}

export default MyApp;
