import { useEffect } from 'react';
import Text60 from '../atoms/Text60';

type ProgressPayModalProps = {
  handleFinishPayModal: () => void;
};

const ProgressPayModal = (props: ProgressPayModalProps) => {
  useEffect(() => {
    setTimeout(() => {
      props.handleFinishPayModal();
    }, 1500);
  });
  return (
    <dialog className="modal modal-open font-bold">
      {/* 모달 내용 */}
      <div className="flex w-[1000px] h-96 rounded-[10px] bg-white justify-center">
        <div className="flex flex-col text-center justify-center items-center gap-y-10">
          <span className="w-20 loading loading-bars bg-blue"></span>
          {/* 안내용 제목 */}
          <Text60 text="결제중..." />
        </div>
      </div>
    </dialog>
  );
};

export default ProgressPayModal;
