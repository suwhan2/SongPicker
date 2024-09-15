import LandingCharacter from '../assets/LandingCharacter.svg';
import Button from '../atoms/Button';

const LandingPage = () => {
  return (
    <div className="w-full h-full">
      <div className="flex-c h-full content-center space-y-9">
        {/* 캐릭터 이미지 */}
        <div className="flex justify-center">
          <img src={LandingCharacter} className='w-36'/>
        </div>
        {/* SSAFY 노래방 */}
        <div className="flex justify-center space-x-2">
          <span className="text-5xl font-pyeongchang font-bold text-pink" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>SSAFY</span>
          <span className="text-5xl font-pyeongchang font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>노래방</span>
        </div>
        {/* 시작하기 버튼 */}
        <div className="flex justify-center">
          <Button text="시작하기" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
