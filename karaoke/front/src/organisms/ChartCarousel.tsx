// type Props = {}

import ChartItem from '../molecules/ChartItem';
import CarouselLeft from '../assets/CarouselLeft.svg';
import CarouselRight from '../assets/CarouselRight.svg';
import Text36 from '../atoms/Text36';

type ChartCarouselProps = {
  data: {
    nicknames: {
      nickname: string;
      songs: {
        songNumber: number;
        title: string;
        artist: string;
      }[];
    }[];
  };
};

type ChartCarouselItemProps = {
  data: {
    nickname: string;
    songs: {
      songNumber: number;
      title: string;
      artist: string;
    }[];
  };
  id: number;
  total: number;
};

const ChartCarouselItem = (props: ChartCarouselItemProps) => {
  return (
    <div id={`chart-${props.id}`} className="carousel-item relative w-full">
      <div className="flex flex-col w-full items-center gap-2">
        {/* 차트 닉네임 */}
        <div className="flex w-[610px] h-20 bg-gradient-to-r from-[#565ed2] via-[#47c490] to-[#565ed2] justify-center items-center text-white tracking-wide last:*:drop-shadow-md">
          {/* 왼쪽 화살표 */}
          <a
            href={props.id - 1 < 0 ? `#chart-${props.total - 1}` : `#chart-${props.id - 1}`}
            className="btn bg-transparent border-none hover:bg-transparent hover:scale-125"
            style={props.total === 1 ? { display: 'none' } : {}}
          >
            <img src={CarouselLeft} />
          </a>

          {/* 닉네임 */}
          <div className="w-96 px-6 text-center font-semibold">
            <Text36 text={props.data.nickname} />
          </div>

          {/* 오른쪽 화살표 */}
          <a
            href={props.id + 1 > props.total - 1 ? '#chart-0' : `#chart-${props.id + 1}`}
            className="btn bg-transparent border-none hover:bg-transparent hover:scale-125"
            style={props.total === 1 ? { display: 'none' } : {}}
          >
            <img src={CarouselRight} />
          </a>
        </div>

        {/* 차트 */}
        <div className="h-screen grid grid-cols-1 bg-black/60 gap-y-1 overflow-auto">
          {props.data.songs.map(item => {
            return <ChartItem song={item} key={item.songNumber} />;
          })}
        </div>
      </div>
    </div>
  );
};

const ChartCarousel = (props: ChartCarouselProps) => {
  return (
    <div className="carousel w-full h-full">
      {props.data.nicknames.map((item, i) => {
        return (
          <ChartCarouselItem
            data={item}
            id={i}
            total={props.data.nicknames.length}
            key={`chartcarousel-${i}`}
          />
        );
      })}
    </div>
  );
};

export default ChartCarousel;
