import Text36 from '../atoms/Text36';

// type Props = {};

const ChartItem = () => {
  return (
    <div className='flex w-[1690px] h-fit bg-black/50 grid grid-flow-col grid-cols-12 p-2.5 gap-x-2.5'>
      <div className="col-span-3 text-[#FDE047] text-center items-center">
        <Text36 text="789456"/>
      </div>
      <div className="col-span-5 text-white">
        <Text36 text="헤어지자 말해요" />
      </div>
      <div className="col-span-4 text-white">
        <Text36 text="박재정" />
      </div>
    </div>
  );
};

export default ChartItem;
