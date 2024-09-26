package com.fastarm.back.connection.service;

import com.fastarm.back.common.constants.RedisConstants;
import com.fastarm.back.common.constants.RedisExpiredTimeConstants;
import com.fastarm.back.common.service.RedisService;
import com.fastarm.back.connection.exception.AlreadyExistConnectionException;
import com.fastarm.back.connection.exception.CannotReserveException;
import com.fastarm.back.karaoke.enums.Type;
import com.fastarm.back.connection.dto.*;
import com.fastarm.back.connection.exception.CannotConnectException;
import com.fastarm.back.karaoke.dto.ChargeDto;
import com.fastarm.back.karaoke.dto.SaveReservationDto;
import com.fastarm.back.song.entity.Song;
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

        String ExistConnection= (String) redisService.getData(RedisConstants.CONNECT_MACHINE + connectionDto.getNickname());

        if (ExistConnection != null) {
            if (checkCharge(ExistConnection)) {
                redisService.deleteData(RedisConstants.CONNECT_MACHINE + connectionDto.getNickname());
            } else {
                throw new AlreadyExistConnectionException();
            }
        }

        redisService.setData(RedisConstants.CONNECT_MACHINE + connectionDto.getNickname(), connectionDto.getSerialNumber(), RedisExpiredTimeConstants.CONNECTION_EXPIRED);

        ConnectInfoDto connectInfoDto = ConnectInfoDto.builder()
                .type(Type.INDIVIDUAL)
                .nickname(connectionDto.getNickname())
                .build();

        redisService.addToList(RedisConstants.CONNECT_INFO + connectionDto.getSerialNumber(), connectInfoDto, RedisExpiredTimeConstants.CONNECTION_EXPIRED);
    }

    public void setGroupConnection(TeamConnectionDto groupConnection) {
        if (checkCharge(groupConnection.getSerialNumber())) {
            throw new CannotConnectException();
        }

        // 그룹 존재 여부 확인

        // 그룹에 모든 인원 추가

//        ConnectInfoDto connectInfoDto = ConnectInfoDto.builder()
//                .serialNumber(groupConnection.getSerialNumber())
//                .type(Type.TEAM)
//                .groupId(groupConnection.getTeamId())
//                .build();

        //redisService.setData(RedisConstants.CONNECT_INFO + groupConnection.getNickname(), connectInfoDto);
    }

    public void reserveSong(ReservationDto reservationDto) {

        String serialNumber = (String) redisService.getData(RedisConstants.CONNECT_MACHINE + reservationDto.getNickname());

        if (checkCharge(serialNumber)) {
            throw new CannotReserveException();
        }

        Song song = songRepository.findByNumber(reservationDto.getNumber())
                .orElseThrow(NotFoundSongException::new);

        ConnectInfoDto connectInfoDto = (ConnectInfoDto) redisService.getFistData(RedisConstants.CONNECT_INFO + serialNumber);

        SaveReservationDto saveReservationDto;
        if (connectInfoDto.getType() == Type.TEAM) {
            saveReservationDto = SaveReservationDto.builder()
                    .number(song.getNumber())
                    .title(song.getTitle())
                    .singer(song.getSinger())
                    .groupId(connectInfoDto.getGroupId())
                    .type(Type.TEAM)
                    .build();
        } else {
            saveReservationDto = SaveReservationDto.builder()
                    .number(song.getNumber())
                    .title(song.getTitle())
                    .singer(song.getSinger())
                    .nickname(reservationDto.getNickname())
                    .type(Type.INDIVIDUAL)
                    .build();
        }
        redisService.addToList(RedisConstants.RESERVATION_INFO + serialNumber, saveReservationDto, RedisExpiredTimeConstants.CONNECTION_EXPIRED);
    }

    private boolean checkCharge(String serialNumber) {
        String key = RedisConstants.CHARGE_INFO + serialNumber;

        ChargeDto chargeDto = (ChargeDto) redisService.getData(key);

        return chargeDto == null || chargeDto.getRemaining() == 0;
    }
}
