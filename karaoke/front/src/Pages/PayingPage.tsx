import Text72 from '../atoms/Text72';
import PayingButton from '../molecules/PayingButton';
import { PayingCategory } from './PayingData';


const PayingPage = () => {
  return (
    <div className="flex flex-col gap-y-28 w-full h-full justify-center items-center">
      {/* 결제하기 타이틀 */}
      <div className="flex justify-center text-white">
        <Text72 text="결제 금액을 선택해주세요" />
      </div>

      {/* 결제 카테고리 버튼 */}
      <div className="flex w-fit h-fit grid grid-cols-2 gap-11">
        {PayingCategory.map(item => {
          return (
            <PayingButton
              categoryColor={item.categoryColor}
              categoryText={item.categoryText}
              amountText={item.amountText}
              moneyText={item.moneyText}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PayingPage;
