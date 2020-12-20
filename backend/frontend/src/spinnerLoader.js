import React from "react";
import Loader from "react-loader-spinner";

const spinnerLoader = () => {
  return (
    <Loader
      type="Oval"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={3000}
    />
  );
};

export default spinnerLoader;
