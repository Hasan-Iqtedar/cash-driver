import { IoCloseCircleSharp, IoPencil } from "react-icons/io5";
import "../styles/modal.css";

const Modal = (props) => {
  const classNames = props.show ? "modal show" : "modal hide";

  return (
    <div
      className={classNames}
      onClick={(e) =>
        e.target.classList[0] === "modal" ? props.hideModal() : null
      }
    >
      <div className="modal-content" style={props.contentStyle}>
        <div className="modal-header">
          <div className="center-container">
            <span style={{marginRight: '10px'}} >{props.title}</span>
            <IoPencil />
          </div>
          <IoCloseCircleSharp onClick={props.hideModal} className="icon" />
        </div>
        <div className="children-container">{props.children}</div>
      </div>
    </div>
  );
};

export default Modal;