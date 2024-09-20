import Text36 from '../atoms/Text36';

type ChartItemProps = {
  song: {
    songNumber: number;
    title: string;
    artist: string;
  };
};

const ChartItem = (props: ChartItemProps) => {
  return (
    <div className="w-[1690px] h-fit bg-black/50 grid grid-flow-col grid-cols-12 p-2.5 gap-x-2.5 hover:bg-[#80F9C6] duration-75 cursor-pointer group">
      {/* 노래방 번호 */}
      <div className="col-span-3 text-[#FDE047] text-center items-center py-2 ">
        <Text36 text={`${props.song.songNumber}`} />
      </div>

      {/* 노래 제목 */}
      <div className="col-span-5 text-white py-2 group-hover:text-black group-hover:font-semibold">
        <Text36 text={props.song.title} />
      </div>

      {/* 가수 */}
      <div className="col-span-4 text-white py-2 group-hover:text-black group-hover:font-semibold">
        <Text36 text={props.song.artist} />
      </div>
    </div>
  );
};

export default ChartItem;
