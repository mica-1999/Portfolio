export default function Footer() {
  return (
    <>
      <div className="row mt-5" style={{ backgroundColor: '#2F2F3A', height: '90px', color: 'white' }}>
        <div className="col-lg-6 justify-content-center align-items-center d-flex">
          <h4>Contact Me</h4>
        </div>
        <div className="col-lg-6 justify-content-center align-items-center d-flex">
          <h4>Portuguese Site</h4>
        </div>
      </div>
      <div className="row d-flex justify-content-evenly bg-white contact-section" style={{ padding: '40px 90px' }}>
        <div className="col-lg-6 d-flex flex-column">
          <h2>Sobre Mim</h2>
          <p className="mt-3">Olá! Meu nome é Micael Ribeiro e sou um desenvolvedor web apaixonado por criar soluções inovadoras e eficientes. Com experiência em diversas tecnologias, como HTML, CSS, JavaScript e frameworks modernos, estou sempre em busca de novos desafios para aprimorar minhas habilidades.</p>
        </div>
        <div className="col-lg-3 d-flex flex-column">
          <strong><p className="mb-0 mb-2">Workplace</p></strong>
          <p>Caminho do Lombo da Piedade nº123 Canhas, Funchal, Madeira</p>
          <strong><p>NIF: </strong> 261446509</p>
        </div>
        <div className="col-lg-3 d-flex flex-column contacts">
          <strong><p className="mb-0 mb-2">Telefone: </strong><a href="tel:+964420812">+ 351 964 420 812</a></p>
          <strong><p className="mb-0 mb-2">Email: </strong><a href="mailto:micael1999work@gmail.com">micael1999work@gmail.com</a></p>
          <strong><p className="mb-0 mb-2">Instragram: </strong><a href="#">micael</a></p>
          <strong><p className="mb-0 mb-2">LinkedIn: </strong><a href="#">micael</a></p>
          <strong><p className="mb-0 mb-2">Facebook: </strong><a href="#">micael</a></p>
          <strong><p className="mb-0 mb-2">X: </strong><a href="https://x.com/ribeiro_micael">micael</a></p>
          <strong><p className="mb-0 mb-2">Github: </strong><a href="https://github.com/mica-1999">micael</a></p>
        </div>
      </div>
    </>
  );
}
