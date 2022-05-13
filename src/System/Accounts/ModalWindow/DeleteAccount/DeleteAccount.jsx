import React from "react";

const DeleteAccount = (props) => {
  return (
    <div
      className="modal fade"
      id="deleteAccount"
      tabIndex="-1"
      aria-labelledby="deleteAccountLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteAccountLabel">
              Удаление счета
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <label htmlFor="name">
              Вы уверены, что хотите удалить "(?) счет"?
            </label>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Отменить
            </button>
            <button type="submit" className="btn btn-primary">
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
