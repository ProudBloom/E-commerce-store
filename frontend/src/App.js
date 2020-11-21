function App() {
  return (
    <div>
      <header>
            <a href="index.html" id="logo"><img src="../assets/img/Logo.svg" alt="Logo" /></a>
            <div className="header__menu">
                <a href="#">Mens</a>
                <a href="#">Ladies</a>
                <a href="#">Kids</a>
                <a href="#">Sportswear</a>
                <a href="#">Brands</a>
                <a href="#" id="sale">SALE%</a>
            </div>
            <div className="header__menu-basket">
                <div className="menu__wrapper">
                    <a href="#">
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 15C30 6.70967 23.2912 0 15 0C6.70967 0 0 6.70876 0 15C0 23.2169 6.65268 30 15 30C23.313 30 30 23.2546 30 15ZM15 1.75781C22.3018 1.75781 28.2422 7.69821 28.2422 15C28.2422 17.6711 27.4477 20.2384 25.9744 22.413C20.0583 16.0492 9.95247 16.0378 4.02557 22.413C2.55226 20.2384 1.75781 17.6711 1.75781 15C1.75781 7.69821 7.69821 1.75781 15 1.75781ZM5.12192 23.8184C10.3821 17.9182 19.6193 17.9196 24.8779 23.8184C19.6001 29.7231 10.402 29.7249 5.12192 23.8184Z" fill="white"/><path d="M15 15.8789C17.9077 15.8789 20.2734 13.5132 20.2734 10.6055V8.84766C20.2734 5.93994 17.9077 3.57422 15 3.57422C12.0923 3.57422 9.72656 5.93994 9.72656 8.84766V10.6055C9.72656 13.5132 12.0923 15.8789 15 15.8789ZM11.4844 8.84766C11.4844 6.90903 13.0614 5.33203 15 5.33203C16.9386 5.33203 18.5156 6.90903 18.5156 8.84766V10.6055C18.5156 12.5441 16.9386 14.1211 15 14.1211C13.0614 14.1211 11.4844 12.5441 11.4844 10.6055V8.84766Z" fill="white"/></svg>
                    </a>
                    <p>Account</p>
                </div>
                <div className="menu__wrapper">
                    <a href="#">
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path d="M29.8269 6.26784C29.6551 6.02172 29.3788 5.86959 29.0786 5.85677L10.4694 5.05462C9.93543 5.03126 9.48924 5.44348 9.46641 5.97493C9.44372 6.50617 9.85527 6.95505 10.3866 6.97787L27.736 7.72577L24.3248 18.3691H9.14429L6.40171 3.43597C6.34143 3.10868 6.11672 2.83564 5.80682 2.71405L1.31494 0.949381C0.819879 0.755558 0.261239 0.998726 0.0668122 1.49318C-0.127278 1.98791 0.115822 2.54689 0.610615 2.74131L4.60461 4.31035L7.3956 19.5056C7.47972 19.9624 7.87784 20.2942 8.34249 20.2942H8.80546L7.74827 23.2307C7.65978 23.4767 7.69623 23.7499 7.84682 23.9636C7.99721 24.1774 8.24178 24.3045 8.50288 24.3045H9.24439C8.78491 24.8159 8.50288 25.4892 8.50288 26.2296C8.50288 27.822 9.79854 29.1173 11.3905 29.1173C12.9825 29.1173 14.2782 27.822 14.2782 26.2296C14.2782 25.4893 13.9962 24.8159 13.5367 24.3045H19.8326C19.3729 24.8159 19.0909 25.4892 19.0909 26.2296C19.0909 27.822 20.3862 29.1173 21.9786 29.1173C23.571 29.1173 24.8662 27.822 24.8662 26.2296C24.8662 25.4893 24.5843 24.8159 24.1249 24.3045H25.0267C25.4698 24.3045 25.8288 23.9454 25.8288 23.5024C25.8288 23.0593 25.4697 22.7003 25.0267 22.7003H9.64419L10.5104 20.2939H25.0266C25.4452 20.2939 25.8156 20.0235 25.9431 19.6253L29.9538 7.11194C30.0459 6.82635 29.9986 6.5141 29.8269 6.26784ZM11.3906 27.5133C10.6828 27.5133 10.1072 26.9378 10.1072 26.23C10.1072 25.5222 10.6828 24.9465 11.3906 24.9465C12.0984 24.9465 12.674 25.5222 12.674 26.23C12.674 26.9378 12.0984 27.5133 11.3906 27.5133ZM21.9786 27.5133C21.2708 27.5133 20.6952 26.9378 20.6952 26.23C20.6952 25.5222 21.2708 24.9465 21.9786 24.9465C22.6864 24.9465 23.262 25.5222 23.262 26.23C23.262 26.9378 22.6864 27.5133 21.9786 27.5133Z" fill="white"/></g><defs><clipPath id="clip0"><rect width="30" height="30" fill="white"/></clipPath></defs></svg> 
                    </a>
                    <p>Shopping Cart</p>
                </div>
            </div>
        </header>

        <main>
            <div className="card__wrapper">
                <div className="card">
                    <div className="card__stars">
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star-half" aria-hidden="true"></i>
                    </div>
                    <h4>Sneakers</h4>
                    <h1>Nike predator</h1>
                    <h1 className="card__price">224.99$</h1>
                    <img className="card__image" src="../assets/img/shoes1.png" alt="nike predator shoe" />
                    <div className="card__buttons">
                        <button className="card__add-to-cart">
                            <img src="../assets/icons/shopping_cart-small.svg" alt="shopping cart" />
                            <p>Add to cart</p>
                        </button>
                        <button className="card__details">
                            <img src="../assets/icons/details-small.svg" alt="magnifier" />
                            <p>Details</p>
                        </button>
                    </div>
                </div>
            </div>
        </main>

        <footer>
            <p>© E-Shoerr 2020 All rights reserved</p>
            <p>Designed and developed by Jakub Sztompka</p>
        </footer>
    </div>
  );
}

export default App;
