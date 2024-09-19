// type Props = {}

import Text48 from '../atoms/Text48';
import Chart from '../organisms/Chart';

const ChartPage = () => {
  return (
    <div className="flex flex-col w-full items-center mt-[120px] gap-[14px]">
      <div className='flex'>
        <div className="flex w-[610px] h-[70px] bg-gradient-to-r from-[#565ed2] via-[#47c490] to-[#565ed2] justify-center items-center text-white tracking-wide last:*:drop-shadow-md">
          <Text48 text="홈런볼 모임" />
        </div>
      </div>

      {/* 차트 */}
      <Chart />
    </div>
  );
};

export default ChartPage;
