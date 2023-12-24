import { FaCaretSquareUp } from "react-icons/fa";
import "./scrollToTop.scss";

const ScrollToTop = () => {
  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="ScrollToTop" onClick={toTop}>
      <div className="ScrollToTop-container">
        <FaCaretSquareUp />
      </div>
    </div>
  );
};

export default ScrollToTop;
