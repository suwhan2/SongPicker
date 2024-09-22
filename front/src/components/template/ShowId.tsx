import React from 'react';

type Props = {
  foundId: string;
};

const ShowId = ({ foundId }: Props) => {
  return (
    <div className="mt-4">
      <div className="text-xl mb-14 font-semibold">
        입력하신 정보와 일치하는 아이디는
        <br />
        아래와 같습니다.
      </div>

      <p className="text-center font-bold text-xl w-full">{foundId}</p>
    </div>
  );
};

export default ShowId;
