import logo from '../images/logo2RC.png';

function Header() {
  return (
    <header className="border-bottom border-light border-opacity-10 py-4 shadow-sm" style={{ background: '#1b5e20' }}>
      <div className="container d-flex align-items-center justify-content-center gap-4">
        <img
          src={logo}
          alt="Logo Recicratiú"
          className="logo-sm bg-white rounded-circle p-2 shadow-sm"
        />

        <div className="text-center text-md-start">
          <h1 className="fw-bolder mb-0 text-white">
            RECICRATIÚ
          </h1>
          <h2 className="fs-5 text-white text-opacity-75 mb-0 fw-medium mw-400">
            Associação de Catadores de Materiais Recicláveis de Crateús
          </h2>
        </div>
      </div>
    </header>
  );
}

export default Header;