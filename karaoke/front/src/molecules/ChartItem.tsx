import Text36 from '../atoms/Text36';

type ChartItemProps = {
  song: {
    songNumber: number;
    title: string;
    artist: string;
  };
};

const ChartItem = (props: ChartItemProps) => {
  console.log(props)
  return (
    <div className="flex w-[1690px] h-fit bg-black/50 grid grid-flow-col grid-cols-12 p-2.5 gap-x-2.5 border-b border-white/10 hover:bg-[#80F9C6] duration-75 cursor-pointer group">
      <div className="col-span-3 text-[#FDE047] text-center items-center py-2 ">
        <Text36 text={`${props.song.songNumber}`} />
      </div>
      <div className="col-span-5 text-white py-2 group-hover:text-black group-hover:font-semibold">
        <Text36 text={props.song.title} />
      </div>
      <div className="col-span-4 text-white py-2 group-hover:text-black group-hover:font-semibold">
        <Text36 text={props.song.artist} />
      </div>
    </div>
  );
};

export default ChartItem;
