import "./Header.css"

const Header = () => {
  return (
    <div className="Header">
      <div className="configurator-step active step-1">
        <p className="configurator-step-text">
          STEP 1
        </p>
      </div>
      <div className="arrow-point"></div>
      <div className="configurator-step step-2">
        <p className="configurator-step-text">
          STEP 2
        </p>
      </div>
      <div className="arrow-point"></div>
      <div className="configurator-step step-3">
        <p className="configurator-step-text">
          STEP 3
        </p>
      </div>
      <div className="arrow-point"></div>
      <div className="configurator-step step-4">
        <p className="configurator-step-text">
          STEP 4
        </p>
      </div>
      <div className="arrow-point"></div>
      <div className="configurator-step step-5">
        <p className="configurator-step-text">
          STEP 5
        </p>
      </div>
      <div className="arrow-point"></div>
    </div>
  );
}

export default Header;