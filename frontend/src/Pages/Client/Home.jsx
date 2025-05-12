import React from 'react';
import { Link } from 'react-router-dom';
import Baner from '../../assets/Banner.png';

import './../style/Client/Home.css';

function Home() {
  return (
    <div className="home">
      <img src={Baner} alt="Banner" className="home-banner" />

      <section className="about-section">
        <h2>Acerca de Nosotros</h2>
        <p>
          En Vital Byte, creemos que una alimentación saludable es la clave para una vida equilibrada y llena de energía.
          Nos especializamos en la venta de productos naturales y nutritivos diseñados para potenciar tu bienestar y ayudarte a alcanzar tus objetivos físicos.
        </p>
        <p>
          Nuestro compromiso es ofrecerte alimentos de alta calidad, cuidadosamente pensados en tu salud y en la de la naturaleza.
          Nos apasiona promover hábitos alimenticios responsables que no solo te ayuden a ti, sino también al planeta.
        </p>
        <p>
          Más que una tienda, somos una comunidad apasionada por la nutrición y el bienestar. Te acompañamos en tu camino hacia una vida más saludable,
          proponiéndote productos prácticos y deliciosos hechos a partir de ingredientes reales.
          ¡Bienvenido a Vital Byte y nutre tu cuerpo con lo mejor de la naturaleza! 🌿✨
        </p>
      </section>

      <section className="cards-container">
        <div className="card">
          <h3>Términos y Condiciones</h3>
          <p>
            sss ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
          </p>
        </div>
        <div className="card">
          <h3>Política de Privacidad</h3>
          <p>
            sss ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
          </p>
        </div>

      </section>


    </div>
  );
}

export default Home;
