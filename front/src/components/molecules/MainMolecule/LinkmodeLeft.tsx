import React from 'react';
import LinkmodeMaintext from '../../atoms/MainAtom/LinkmodeMaintext';
import LinkModeSubtext from '../../atoms/MainAtom/LinkModeSubtext';
import DisconnectButton from '../../atoms/MainAtom/DisconnectButton';

const LinkmodeLeft = () => {
  return (
    <div className="flex flex-col justify-between">
      <div>
        <LinkmodeMaintext />
        <LinkModeSubtext />
      </div>
      <DisconnectButton />
    </div>
  );
};

export default LinkmodeLeft;
