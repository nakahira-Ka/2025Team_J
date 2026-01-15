import React from "react";
import "../css/ress.css";
import "../css/map.css";
import FooterNav from "../components/FooterNav";
import Map from '../components/Map';

const Home = () => {
  return (
    <main>
      <Map />
      <FooterNav />
    </main>
  );
};

export default Home;
