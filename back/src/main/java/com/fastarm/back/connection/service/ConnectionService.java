package com.fastarm.back.connection.service;

import com.fastarm.back.common.constants.RedisConstants;
import com.fastarm.back.common.service.RedisService;
import com.fastarm.back.connection.enums.Type;
import com.fastarm.back.connection.dto.*;
import com.fastarm.back.connection.exception.CannotConnectException;
import com.fastarm.back.connection.exception.CannotReserveException;
import com.fastarm.back.karaoke.dto.ChargeDto;
import com.fastarm.back.karaoke.dto.SaveReservationDto;
import com.fastarm.back.song.exception.NotFoundSongException;
import com.fastarm.back.song.repository.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ConnectionService {

    private final RedisService redisService;
    private final SongRepository songRepository;

    public void setConnection(ConnectionDto connectionDto) {

        if (checkCharge(connectionDto.getSerialNumber())) {
            throw new CannotConnectException();
        }

        ConnectInfoDto connectInfoDto = ConnectInfoDto.builder()
                .serialNumber(connectionDto.getSerialNumber())
                .type(Type.INDIVIDUAL)
                .build();

        redisService.setData(RedisConstants.CONNECT_INFO + connectionDto.getNickname(), connectInfoDto);
    }

    public void setGroupConnection(TeamConnectionDto groupConnection) {
        if (checkCharge(groupConnection.getSerialNumber())) {
            throw new CannotConnectException();
        }

        ConnectInfoDto connectInfoDto = ConnectInfoDto.builder()
                .serialNumber(groupConnection.getSerialNumber())
                .type(Type.TEAM)
                .groupId(groupConnection.getTeamId())
                .build();

        redisService.setData(RedisConstants.CONNECT_INFO + groupConnection.getNickname(), connectInfoDto);
    }

    public void reserveSong(ReservationDto reservationDto) {

        ConnectInfoDto connectInfoDto = (ConnectInfoDto) redisService.getData(RedisConstants.CONNECT_INFO + reservationDto.getNickname());

        if (checkCharge(connectInfoDto.getSerialNumber())) {
            throw new CannotReserveException();
        }

        if (songRepository.findByNumber(reservationDto.getNumber()).isEmpty()) {
            throw new NotFoundSongException();
        }

        SaveReservationDto saveReservationDto;
        if (connectInfoDto.getType() == Type.TEAM) {
            saveReservationDto = SaveReservationDto.builder()
                    .number(reservationDto.getNumber())
                    .groupId(connectInfoDto.getGroupId())
                    .type(Type.TEAM)
                    .build();
        } else {
            saveReservationDto = SaveReservationDto.builder()
                    .number(reservationDto.getNumber())
                    .nickname(reservationDto.getNickname())
                    .type(Type.INDIVIDUAL)
                    .build();
        }
        redisService.addToList(RedisConstants.RESERVATION_INFO + connectInfoDto.getSerialNumber(), saveReservationDto);
    }

    private boolean checkCharge(String serialNumber) {
        String key = RedisConstants.INFO + serialNumber;

        ChargeDto chargeDto = (ChargeDto) redisService.getHashData(key, RedisConstants.CHARGE_INFO);

        return chargeDto == null || chargeDto.getCharge() == 0;
    }
}
