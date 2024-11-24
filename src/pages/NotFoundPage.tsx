/* Not-found Page */

import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="not-found py-5 flex flex-col justify-center items-center cursor-pointer"
      onClick={() => {
        navigate("/");
      }}
    >
      <div className="not-found__content bg-s500 p-10 flex flex-col gap-5 cursor-default color-s400">
        <h1 className="heading heading--primary ">404 | Not Found</h1>
        <p className="body body--primary">
          Sorry, we couldn't fint the page you were looking for!{" "}
        </p>
        <p className="body body--primary">
          Click on any Speedy Snail to go back to homepage 🚀
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
