import axiosInstance from './axiosInstance';

// 서비스연동 (개별)
export const connectService = async (serialNumber: string) => {
  const response = await axiosInstance({
    method: 'POST',
    url: '/api/connections',
    data: { serialNumber },
  });
  return response.data;
};

// 서비스연동 (그룹)
export interface ConnectGroupServiceRequest {
  serialNumber: string;
  groupId: number;
}

export const connectGroupService = async (data: ConnectGroupServiceRequest) => {
  const response = await axiosInstance({
    method: 'POST',
    url: '/api/connections/group',
    data,
  });
  return response.data;
};

// 노래 예약하기
export const reserveSong = async (serialNumber: string, songNumber: number) => {
  const response = await axiosInstance({
    method: 'POST',
    url: '/api/connections/reservations',
    data: { serialNumber, songNumber },
  });
  return response.data;
};
