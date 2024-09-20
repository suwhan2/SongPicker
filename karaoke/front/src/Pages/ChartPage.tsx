import ChartCarousel from '../organisms/ChartCarousel';
import ChartData from '../shared/ChartData';



const ChartPage = () => {
  return (
    <div className='w-full'>
      <ChartCarousel data={ChartData}/>
    </div>
  );
};

export default ChartPage;
