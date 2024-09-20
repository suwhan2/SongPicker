import ChartName from '../molecules/ChartName';
import ChartCarousel from '../organisms/ChartCarousel';
import ChartData from '../shared/ChartData';
import LandingCharacter from '../assets/LandingCharacter.svg';

const ChartPage = () => {
  return (
    <div className="w-full relative mt-28 mb-1">
      <div className='absolute z-10 w-44 top-[-100px] left-10 -rotate-12'>
        <img src={LandingCharacter} alt=""/>
      </div>
      <div className="absolute top-0 left-40">
        <ChartName text="SongPicker 추천차트" />
      </div>
      <ChartCarousel data={ChartData} />
    </div>
  );
};

export default ChartPage;
