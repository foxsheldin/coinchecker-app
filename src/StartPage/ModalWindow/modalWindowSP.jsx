import React from "react";

const ModalWindowSP = () => {
  return (
    <div>
      <div
        className="modal fade"
        id="addNewUser"
        tabIndex="-1"
        aria-labelledby="addNewUserLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addNewUserLabel">
                Регистрация
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form action="php/registration.php" method="POST">
              <div className="modal-body">
                <label htmlFor="username">Ваше имя:</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Имя"
                  required
                />
                <label htmlFor="email">Электронная почта:</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="E-mail"
                  required
                />
                <label htmlFor="password">Пароль:</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Пароль"
                  required
                />
                <label htmlFor="re-password">Подтверждение пароля:</label>
                <input
                  type="password"
                  className="form-control"
                  name="re-password"
                  placeholder="Подтверждение пароля"
                  required
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Закрыть
                </button>
                <button type="submit" className="btn btn-outline-primary">
                  Зарегистрироваться
                </button>
                {/* <!-- <button type="button" className="btn btn-primary" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#addNewUserSucess">Зарегистрироваться</button> --> */}
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="addNewUserSucess"
        tabIndex="-1"
        aria-labelledby="addNewUserSucessLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addNewUserSucessLabel">
                Успешная регистрация
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <span className="fs-6">
                Вы успешно зарегистрировались в системе!
              </span>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalWindowSP;
