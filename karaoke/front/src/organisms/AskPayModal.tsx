import Text48 from '../atoms/Text48';
import Text60 from '../atoms/Text60';
import { PayingInfo } from '../shared/Types';

type AskPayModalProps = {
  selectedPay: PayingInfo;
  closeAskPayModal: () => void;
  handleProgressPayModal: () => void,
};

const AskPayModal = (props: AskPayModalProps) => {
  return (
    <dialog className="modal modal-open font-bold">
      {/* 모달 내용 */}
      <div className="flex w-[1000px] h-96 rounded-[10px] bg-white justify-center">
        <div className="flex flex-col text-center justify-center gap-y-10">
          {/* 안내용 제목 */}
          <Text60 text="결제하시겠습니까?" />

          {/* 결제 금액 안내 */}
          <div className="flex justify-center gap-x-5 font-medium">
            <Text48 text={props.selectedPay.amountText} />
            <Text48 text={props.selectedPay.moneyText} />
          </div>

          {/* 결제 여부 버튼 */}
          <div className="flex gap-8 mt-4">
            <div
              className="btn w-56 h-20 text-white bg-blue"
              onClick={()=>{props.handleProgressPayModal()}}
            >
              <Text48 text="예" />
            </div>
            <div
              className="btn w-56 h-20 text-white bg-purple"
              onClick={()=>{props.closeAskPayModal()}}
            >
              <Text48 text="아니요" />
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default AskPayModal;
