import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate  } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from "../redux/actions/authActions";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = () => {
    let navigate = useNavigate();
  
    const form = useRef();
    const checkBtn = useRef();
  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');

  
    const { isLoggedIn } = useSelector(state => state.authReducer);

  
    const dispatch = useDispatch();
  
    const onChangeUsername = (e) => setUsername(e.target.value);  
    const onChangePassword = (e) => setPassword(e.target.value);  

    const handleLogin = (e) => {
      e.preventDefault();
      setLoading(true);
      form.current.validateAll();
  
      if (checkBtn.current.context._errors.length === 0) {
        dispatch(login(username, password))
          .then(() => {
            navigate("/notes");
            window.location.reload();
          })
          .catch(() => {
            setLoading(false);
            setErrorMsg("Invalid username or password");
            setTimeout(() => {
              setErrorMsg('')
            }, 5000);
          });
      } else {
        setLoading(false);
        setErrorMsg('Invalid username or password')
        setTimeout(() => {
          setErrorMsg('')
        }, 5000);
      }
    };
  
    if (isLoggedIn) {
      return <Navigate to="/profile" />;
    }
  
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card" />
  
          <Form onSubmit={handleLogin} ref={form}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input type="text" className="form-control" name="username" value={username} onChange={onChangeUsername} validations={[required]} />
            </div>
  
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input type="password" className="form-control" name="password" value={password} onChange={onChangePassword} validations={[required]} />
            </div>

            {errorMsg !== '' ? <p className="login-error-msg">{errorMsg}</p> : null}
            <div className="form-group" style={{textAlign: "center"}}>
              <button className="btn btn-primary btn-block" style={{marginTop:"20px"}} disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    );
  };
  
  export default Login;