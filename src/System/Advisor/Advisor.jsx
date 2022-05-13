import React from "react";

const Advisor = () => {
  return (
    <div className="container-fluid">
      <div className="container my-2">
        <div className="row bg-warning">
          <h3 className="">Персональный советник по управлению финансами</h3>
        </div>
        <div className="row border p-2">
          {/* <!-- left Menu Advisor --> */}
          <div className="col-3">
            <div className="leftMenuAdvisor row p-2">
              <a
                href="advisor.php?advice=first-step"
                className="btn btn-outline-secondary p-0 my-1"
              >
                <div className="row">
                  <div className="advisorTitle col">
                    Законы финансовой грамотности
                  </div>
                </div>
              </a>
              <a
                href="advisor.php?advice=fin-cushion"
                className="btn btn-outline-secondary p-0 my-1"
              >
                <div className="row">
                  <div className="advisorTitle col">Финансовая подушка</div>
                </div>
              </a>
              <a
                href="advisor.php?advice=test"
                className="btn btn-outline-secondary p-0 my-1"
              >
                <div className="row">
                  <div className="advisorTitle col">Тестовый пункт</div>
                </div>
              </a>
              <a
                href="advisor.php?advice=test"
                className="btn btn-outline-secondary p-0 my-1"
              >
                <div className="row">
                  <div className="advisorTitle col">Что-то еще</div>
                </div>
              </a>
            </div>
          </div>

          {/* <!-- info Adviser --> */}
          <div className="col-9">
            <div className="infoAdviser">
              <h3 className="titleAdvisor">
                Добро пожаловать в персональный советник
              </h3>
              <p className="descAdvisor fs-4">
                Объяснение смысла советника
                <br />
                <br />
                Пожалуйста, выберите пункт в боковом меню
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advisor;
