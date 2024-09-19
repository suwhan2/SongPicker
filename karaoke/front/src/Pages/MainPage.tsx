import MainBackground from '../assets/MainBackground.png';
import GuideQrcode from '../organisms/GuideQrcode';

const MainPage = () => {
  return (
    <div
      className="relative w-full h-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${MainBackground})`,
      }}
    >
      <GuideQrcode />
    </div>
  );
};

export default MainPage;
