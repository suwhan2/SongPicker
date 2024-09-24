import { useState } from 'react';
import Text72 from '../atoms/Text72';
import PayingButton from '../molecules/PayingButton';
import { PayingCategory } from './PayingData';
import AskPayModal from '../organisms/AskPayModal';
import { PayingInfo } from '../shared/Types';
import ProgressPayModal from '../organisms/ProgressPayModal';
import FinishPayModal from '../organisms/FinishPayModal';

const PayingPage = () => {
  const [askPay, setAskPay] = useState(false);
  const [progressPay, setProgressPay] = useState(false);
  const [finishPay, setFinishPay] = useState(false);
  const [selectedPay, setSelectedPay] = useState<PayingInfo | null>(null);

  // AskPayModal 열기
  const handleAskPayModal = (info: PayingInfo) => {
    setSelectedPay(info);
    setAskPay(true);
  };

  // AskPayModal 닫기
  const closeAskPayModal = () => {
    setAskPay(false);
    setSelectedPay(null);
  };

  // ProgressPayModal 열기
  const handleProgressPayModal = () => {
    setProgressPay(true);
    setAskPay(false);
    setSelectedPay(null);
  };

  // FinishPayModal 열기
  const handleFinishPayModal = () => {
    setFinishPay(true)
    setProgressPay(false)
  }

  const closeFinishPayModal = () => {
    setFinishPay(false)
  }

  return (
    <div className="flex flex-col gap-y-28 w-full h-full justify-center items-center">
      {/* 결제하기 타이틀 */}
      <div className="flex justify-center text-white">
        <Text72 text="결제 금액을 선택해주세요" />
      </div>

      {/* 결제 카테고리 버튼 */}
      <div className="w-fit h-fit grid grid-cols-2 gap-11">
        {PayingCategory.map((item, i) => {
          return (
            <div key={`PayCategory-${i}`}>
              <PayingButton
                categoryColor={item.categoryColor}
                categoryText={item.categoryText}
                amountText={item.amountText}
                moneyText={item.moneyText}
                onClick={() => handleAskPayModal(item)}
              />
            </div>
          );
        })}
      </div>

      {/* 결제 여부 모달창 */}

      {/* askPay 모달 */}
      {askPay && selectedPay && (
        <AskPayModal
          selectedPay={selectedPay}
          closeAskPayModal={closeAskPayModal}
          handleProgressPayModal={handleProgressPayModal}
        />
      )}
      
      {/* progressPay 모달 */}
      {progressPay && <ProgressPayModal handleFinishPayModal={handleFinishPayModal} />}

      {/* finishPay 모달 */}
      {
        finishPay && <FinishPayModal closeFinishPayModal={closeFinishPayModal}/>
      }

    </div>
  );
};

export default PayingPage;
