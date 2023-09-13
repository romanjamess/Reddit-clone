import React from "react";

const Login = () => {
  return (
    <>
    
      <div className="form-container">
        <form>
          <h1>Login</h1>
          <input placeholder="Username" />
          <input placeholder="Password" />
          <button>Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;