import Text48 from "../atoms/Text48";

type PayingButtonProps = {
    categoryColor: string,
    categoryText: string,
    amountText: string,
    moneyText: string,
};

const PayingButton = (props: PayingButtonProps) => {
  return (
    <div className="card flex bg-transparent w-[720px] h-[170px] shadow-xl border-none relative overflow-hidden cursor-pointer">
        
        {/* 배경색 */}
        <div className="absolute inset-0 bg-black opacity-50">
        </div>

        {/* 내용 */}
        <div className="relative flex w-full h-full justify-around items-center">
            <div className={`flex w-36 h-28 bg-${props.categoryColor} justify-center items-center text-white rounded-[10px]`}>
                <Text48 text={props.categoryText}/>
            </div>
            <div className="flex w-80 gap-x-8 items-center text-white">
                <div className="flex">
                    <Text48 text={props.amountText}/>
                </div>
                <div className="flex">
                    <Text48 text={props.moneyText}/>
                </div>
            </div>
        </div>
    </div>
    
  );
};

export default PayingButton;
