import React, { useContext, useState, useEffect } from "react";
import bemCssModules from "bem-css-modules";

import Modal from "../Modal/Modal";
import { StoreContext } from "../../store/StoreProvider";

import { default as LoginFormStyles } from "./LoginForm.module.scss";
import request from "../../helpers/request";

const style = bemCssModules(LoginFormStyles);

const LoginForm = ({ handleOnClose, isModalOpen }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [validateMessage, setValidateMessage] = useState("");

  const { setUser } = useContext(StoreContext);
  const validateMessageComponent = validateMessage.length ? (
    <p className={style("validate-message")}>{validateMessage}</p>
  ) : null;

  useEffect(() => {
    if (isModalOpen) {
      resetStateOfInputs();
    }
  }, [isModalOpen]);

  const resetStateOfInputs = () => {
    setLogin("");
    setPassword("");
    setValidateMessage("");
  };

  const handleOnChangeLogin = ({ target }) => setLogin(target.value);
  const handleOnChangePassword = ({ target }) => setPassword(target.value);

  const handleOnCloseModal = (event) => {
    event.preventDefault();
    handleOnClose();
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const { data, status } = await request.post("/users", { login, password });

    if (status === 200) {
      setUser(data.user);
      resetStateOfInputs();
      handleOnClose();
    } else {
      setValidateMessage(data.message);
    }
  };

  return (
    <Modal
      handleOnClose={handleOnClose}
      isOpen={isModalOpen}
      shouldBeCloseOnOutsideClick={true}
    >
      <form className={style()} method="post" onSubmit={handleOnSubmit}>
        <div className={style("row")}>
          <label>
            Login:
            <input type="text" value={login} onChange={handleOnChangeLogin} />
          </label>
        </div>
        <div className={style("row")}>
          <label>
            Hasło:
            <input
              type="password"
              value={password}
              onChange={handleOnChangePassword}
            />
          </label>
        </div>
        <div className={style("row")}>
          <button type="submit">Zaloguj</button>
          <button type="button" onClick={handleOnCloseModal}>
            Anuluj
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default LoginForm;
