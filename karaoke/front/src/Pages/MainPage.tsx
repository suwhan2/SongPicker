import MainBackground from '../assets/MainBackground.png';
import GuideQrcode from '../organisms/guideQrcode';

type Props = {};

const MainPage = (props: Props) => {
  return (
    <div className="relative">
      <GuideQrcode/>
      {/* <img src={MainBackground} /> */}
    </div>
  );
};

export default MainPage;
