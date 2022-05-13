import React from "react";
import { Field, Form } from "react-final-form";
import { toast, ToastContainer } from "react-toastify";
import { authAPI } from "../../api/api";

const ModalWindowSP = () => {
  const handleRegSubmit = async (formData) => {
    const response = await authAPI.registration(formData);
    if (!response.data.resultCode) {
      toast.success(response.data.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,
      });
    } else {
      toast.warn(response.data.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeButton: false,
      });
    }
  };

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
            <Form onSubmit={handleRegSubmit}>
              {(props) => (
                <form onSubmit={props.handleSubmit}>
                  <div className="modal-body">
                    <label htmlFor="username">Ваше имя:</label>
                    <Field
                      component={"input"}
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder="Имя"
                      required
                    />
                    <label htmlFor="email">Электронная почта:</label>
                    <Field
                      component={"input"}
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="E-mail"
                      required
                    />
                    <label htmlFor="password">Пароль:</label>
                    <Field
                      component={"input"}
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Пароль"
                      required
                    />
                    <label htmlFor="re-password">Подтверждение пароля:</label>
                    <Field
                      component={"input"}
                      type="password"
                      className="form-control"
                      name="repassword"
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
              )}
            </Form>
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
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ModalWindowSP;
