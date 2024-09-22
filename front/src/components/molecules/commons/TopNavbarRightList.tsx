import React from 'react';
import BellAlertIcon from '../../atoms/commons/BellAlertIcon';
import PlayListIcon from '../../atoms/commons/PlayListIcon';

type Props = {}

const TopNavbarRightList = (props: Props) => {
  return (
    <div className="flex items-center">
      <BellAlertIcon />
      <PlayListIcon />
    </div>
  );
};

export default TopNavbarRightList;
