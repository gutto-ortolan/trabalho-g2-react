import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer_area p_120 fixarRodape">
        <div className="container">
            <div className="row footer_inner">
                <div className="col-lg-12 col-sm-12 centralizador">
                        <div className="centralizador letrasFooter">
                            <h3>Desenvolvedor</h3>
                        </div>
                        <p className="centralizador letrasFooter">Augusto Krûger Ortolan</p>
                        <p className="centralizador letrasFooter">augustoortolan02@gmail.com</p>
                </div>
            </div>
        </div>
    </footer>
  );
}

export default Footer;