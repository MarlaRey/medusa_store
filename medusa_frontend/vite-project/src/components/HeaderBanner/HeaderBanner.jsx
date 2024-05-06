import React from "react";
import styles from "./HeaderBanner.module.scss";
import bannerImage from "../../assets/img/pexels-igor-haritanovich-814387-1695052.jpg";

const HeaderBanner = ({ text }) => {
  return (
    <div className={styles.headerBanner}>
      <img src={bannerImage} alt="Header Banner" className={styles.bannerImage} />
      <div className={styles.headerText}>
        <h1>We love coffee <br />
  And all the people who make it</h1>
      </div>
    </div>
  );
};

export default HeaderBanner;
