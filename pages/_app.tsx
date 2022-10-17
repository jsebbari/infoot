import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Navigation from "../components/Navigation";
import { ThemeContextProvider } from "../context/ThemeContext";
import Footer from "../components/Footer";
import ClipLoader from "react-spinners/ClipLoader";
import BarLoader from "react-spinners/BarLoader";
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
      <BarLoader
        loading={loadingRouter}
        color={"#128091"}
        width={"100%"}
        aria-label="Loading Spinner"
        className="spinnerTest"
        speedMultiplier={0.4}
      />
      <div>
        <Navigation />

        {/* <Navbar /> */}
        <Component {...pageProps} />
        <Footer />
      </div>
    </ThemeContextProvider>
  );
}

export default MyApp;
