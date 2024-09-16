import Text60 from "../atoms/Text60";
import PayModalButton from "../molecules/PayModalButton";

const AskPayModal = () => {
  return (
    <dialog className="modal">
      <div className="modal-box">
        <Text60 text="결제하시겠습니까?"/>
        <div className="modal-action">
          <PayModalButton text="예" bgColor="#575ED2"/>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <PayModalButton text="아니요" bgColor="#9747FF"/>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AskPayModal;
