export default function Footer() {

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/micael-ribeiro-a2230433a/",
      ariaLabel: "LinkedIn Button",
      svgPath: `
        <path d="M5.77,17.89 L5.77,7.17 L2.21,7.17 L2.21,17.89 L5.77,17.89 L5.77,17.89 Z M3.99,5.71 C5.23,5.71 6.01,4.89 6.01,3.86 C5.99,2.8 5.24,2 4.02,2 C2.8,2 2,2.8 2,3.85 C2,4.88 2.77,5.7 3.97,5.7 L3.99,5.7 L3.99,5.71 L3.99,5.71 Z"></path>
        <path d="M7.75,17.89 L11.31,17.89 L11.31,11.9 C11.31,11.58 11.33,11.26 11.43,11.03 C11.69,10.39 12.27,9.73 13.26,9.73 C14.55,9.73 15.06,10.71 15.06,12.15 L15.06,17.89 L18.62,17.89 L18.62,11.74 C18.62,8.45 16.86,6.92 14.52,6.92 C12.6,6.92 11.75,7.99 11.28,8.73 L11.3,8.73 L11.3,7.17 L7.75,7.17 C7.79,8.17 7.75,17.89 7.75,17.89 L7.75,17.89 L7.75,17.89 Z"></path>
      `,
    },
    {
      name: "GitHub",
      url: "https://github.com/mica-1999",
      ariaLabel: "GitHub Button",
      svgPath: `
        <path d="M10 1C4.48 1 0 5.48 0 11c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 10 4.8c.85.004 1.71.11 2.51.32 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.02 10.02 0 0 0 20 11c0-5.52-4.48-10-10-10z"></path>
      `,
    },
    {
      name: "Twitter",
      url: "https://x.com/ribeiro_micael",
      ariaLabel: "Twitter Button",
      svgPath: `
        <path d="m15.08,2.1h2.68l-5.89,6.71,6.88,9.1h-5.4l-4.23-5.53-4.84,5.53H1.59l6.24-7.18L1.24,2.1h5.54l3.82,5.05,4.48-5.05Zm-.94,14.23h1.48L6,3.61h-1.6l9.73,12.71h0Z"></path>
      `,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/goncalomicael20/",
      ariaLabel: "Instagram Button",
      svgPath: `
        <path d="M13.55,1H6.46C3.45,1,1,3.44,1,6.44v7.12c0,3,2.45,5.44,5.46,5.44h7.08c3.02,0,5.46-2.44,5.46-5.44V6.44 C19.01,3.44,16.56,1,13.55,1z M17.5,14c0,1.93-1.57,3.5-3.5,3.5H6c-1.93,0-3.5-1.57-3.5-3.5V6c0-1.93,1.57-3.5,3.5-3.5h8 c1.93,0,3.5,1.57,3.5,3.5V14z"></path>
        <circle cx="14.87" cy="5.26" r="1.09"></circle>
        <path d="M10.03,5.45c-2.55,0-4.63,2.06-4.63,4.6c0,2.55,2.07,4.61,4.63,4.61c2.56,0,4.63-2.061,4.63-4.61 C14.65,7.51,12.58,5.45,10.03,5.45L10.03,5.45L10.03,5.45z"></path>
      `,
    },
  ];


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
          <strong>Workplace</strong>
          <p>Caminho do Lombo da Piedade nº123 Canhas, Funchal, Madeira</p>
          <p><strong>NIF:</strong> 261446509</p>
        </div>
        <div className="col-lg-3 d-flex flex-column contacts">
          <p><strong>Telefone:</strong> <a href="tel:+964420812">+351 964 420 812</a></p>
          <p><strong>Email:</strong> <a href="mailto:micael1999work@gmail.com">micael1999work@gmail.com</a></p>
          <p><strong>Instragram:</strong> <a href="#">micael</a></p>
          <p><strong>LinkedIn:</strong> <a href="#">micael</a></p>
          <p><strong>Facebook:</strong> <a href="#">micael</a></p>
          <p><strong>X:</strong> <a href="https://x.com/ribeiro_micael">micael</a></p>
          <p><strong>Github:</strong> <a href="https://github.com/mica-1999">micael</a></p>
        </div>
      </div>


      <div className="row d-flex social-icons justify-content-center align-items-center">
      <div className="col-lg-12 d-flex justify-content-center align-items-center gap-4">
        {socialLinks.map(({ name, url, ariaLabel, svgPath }, index) => (
          <div key={index} className="social-icon-container d-flex justify-content-center align-items-center bg-white">
            <a href={url} aria-label={ariaLabel} target="_blank" rel="noreferrer">
              <span uk-icon={`icon: ${name.toLowerCase()}; width: 20; height: 20;`}>
                <svg width="20" height="20" viewBox="0 0 20 20" dangerouslySetInnerHTML={{ __html: svgPath }} />
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
    
      <div className="row d-flex justify-content-center align-items-center mt-3 copyright">
        <div className="col-lg-12 d-flex justify-content-center align-items-center">
          <p className="text-center">© 2024-2025 Micael Ribeiro, Web Design e Desenvolvimento Web , Madeira - Portugal.</p>
        </div>
      </div>
    </>
  );
}
