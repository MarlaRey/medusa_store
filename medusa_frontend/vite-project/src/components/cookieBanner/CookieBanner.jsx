import { useEffect, useState } from "react";
import style from "./CookieBanner.module.scss";
import ReactGA from "react-ga4";

export const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(true);

  // Tjek localStorage for cookieAccept ved komponentmontage
  useEffect(() => {
    if (localStorage.getItem("cookieAccept")) {
      if (JSON.parse(localStorage.getItem("cookieAccept")) === true) {
        ReactGA.initialize("import.meta.env.VITE_PUBLIC_GA_ID"); 
      }
    }
  }, [showBanner]);

  // accepter og sæt en local state og sporbegivenhed
  const accept = () => {
    localStorage.setItem("cookieAccept", true);
    setShowBanner(false);
    ReactGA.event({
      category: "Cookie Banner",
      action: "Accept",
    });
  };

  // afslå og sæt en local state og sporbegivenhed
  const deny = () => {
    localStorage.setItem("cookieAccept", false);
    setShowBanner(false);
    ReactGA.event({
      category: "Cookie Banner",
      action: "Deny",
    });
  };

  return (
    <>
      {showBanner && (
        <section className={style.cookieBanner}>
            <h2>Halløj der</h2>
          <p>
            Denne side bruger cookies, er du med på den?
          </p>

  
            <button onClick={() => accept()}>Yesss</button>
            <button onClick={() => deny()}>Nej</button>
   
        </section>
      )}
    </>
  );
};

