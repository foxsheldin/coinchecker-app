import React from "react";
import preloader from "../../../assets/images/Eclipse-1s-200px.svg";

function PreLoader() {
  return (
    <div className="d-flex justify-content-center">
      <img src={preloader} />
    </div>
  );
}

export default PreLoader;
