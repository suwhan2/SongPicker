import Text60 from '../atoms/Text60';
import Check from '../assets/Check.svg';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type FinishPayModalProps = {
  closeFinishPayModal: () => void;
};


const FinishPayModal = (props: FinishPayModalProps) => {
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      props.closeFinishPayModal();
      navigate('/main')
    }, 1500);
  });
  return (
    <dialog className="modal modal-open font-bold">
      {/* 모달 내용 */}
      <div className="flex flex-col w-[1000px] h-96 rounded-[10px] bg-white justify-center items-center gap-y-10">
        <img src={Check} />
        {/* 안내용 제목 */}
        <Text60 text="결제가 완료됐습니다!" />
      </div>
    </dialog>
  );
};

export default FinishPayModal;
