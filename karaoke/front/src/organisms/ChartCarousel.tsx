// type Props = {}

import Text48 from '../atoms/Text48';
import ChartItem from '../molecules/ChartItem';
import CarouselLeft from '../assets/CarouselLeft.svg';
import CarouselRight from '../assets/CarouselRight.svg';

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
};

const ChartCarouselItem = (props: ChartCarouselItemProps) => {
  // console.log(props)
  return (
    <div id="chart1" className="carousel-item relative w-full">
      <div className="flex flex-col w-full items-center gap-[14px]">
        {/* 차트 닉네임 */}
        <div className="flex w-[610px] h-[70px] bg-gradient-to-r from-[#565ed2] via-[#47c490] to-[#565ed2] justify-center items-center text-white tracking-wide last:*:drop-shadow-md">
          <a
            href="#slide4"
            className="btn bg-transparent border-none hover:bg-transparent hover:scale-125"
          >
            <img src={CarouselLeft} />
          </a>
          <div className="px-6">
            <Text48 text={props.data.nickname} />
          </div>
          <a
            href="#slide2"
            className="btn bg-transparent border-none hover:bg-transparent hover:scale-125"
          >
            <img src={CarouselRight} />
          </a>
        </div>

        {/* 차트 */}
        <div>
          {props.data.songs.map((item) => {
            return <ChartItem song={item} key={item.songNumber} />;
          })}
        </div>
      </div>
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"></div>
    </div>
  );
};

const ChartCarousel = (props: ChartCarouselProps) => {
  // console.log(props.data.nicknames);
  return (
    <div className="">
      <div className="carousel w-full">
        {props.data.nicknames.map((item, i) => {
          return <ChartCarouselItem data={item} key={i} />;
        })}
      </div>
    </div>
  );
};

export default ChartCarousel;
