package com.fastarm.back.karaoke.service;

import com.fastarm.back.common.constants.RedisConstants;
import com.fastarm.back.common.service.RedisService;
import com.fastarm.back.karaoke.dto.ChargeDto;
import com.fastarm.back.karaoke.enums.ChargeType;
import com.fastarm.back.karaoke.exception.NotFoundMachineException;
import com.fastarm.back.karaoke.repository.MachineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KaraokeService {

    private final MachineRepository machineRepository;
    private final RedisService redisService;

    public void charge(ChargeDto chargeDto) {

        if (machineRepository.findBySerialNumber(chargeDto.getSerialNumber()).isEmpty()) {
            throw new NotFoundMachineException();
        }

        String key = RedisConstants.CHARGE_INFO + chargeDto.getSerialNumber();

        ChargeDto remainDto = (ChargeDto) redisService.getData(key);

        if (remainDto != null && remainDto.getRemaining() > 0) {
            remainDto.setRemaining(remainDto.getRemaining() + chargeDto.getRemaining());
            redisService.setData(key, remainDto);
        } else {
            redisService.setData(key, chargeDto);
        }
    }

    public List<Object> findReservations(String serialNumber) {
        return redisService.getList(RedisConstants.RESERVATION_INFO + serialNumber);
    }

    public void findRecommendations(String serialNumber) {

    }

}
