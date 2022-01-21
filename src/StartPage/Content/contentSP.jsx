import React from "react";

const ContentSP = () => {
    return (
        <section className="hero-2 position-relative">
            <div className="hero-2-overlay"></div>
            <div className="container">
                <div className="row hero-2-content align-items-center">
                    <div className="col-lg-5 col-md-5">
                        <div className="hero-2-img">
                            <img className="img-fluid" src={require('./images/hero-2-img.png')} alt="" />
                        </div>
                    </div>
                    <div className="col-lg-6 offset-lg-1 col-md-5 offset-md-1">
                        <h5 className="home-small-title text-primary mt-lg-0 mt-4">Увеличь контроль</h5>
                        <h1 className="hero-2-title mb-lg-4 mb-2">Красивый способ планирования финансов</h1>
                        <p className="mb-4">Планируйте свои расходы и доходы. Составляйте прогнозы и контролируйте исполнение бюджета.</p>
                        <a href="auth/index.html" className="btn btn-outline-primary">Войти</a>
                        <button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#addNewUser">Зарегистрироваться →</button>
                    </div>
                </div>
                {/* <!-- end row --> */}
            </div>
            {/* <!-- end container --> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="hero-2-bottom">
                        <img className="img-fluid" src={require('./images/hero-2-bottom.png')} alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContentSP;