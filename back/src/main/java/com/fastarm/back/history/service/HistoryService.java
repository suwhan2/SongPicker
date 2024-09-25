package com.fastarm.back.history.service;

import com.fastarm.back.history.controller.dto.MostSingersResponse;
import com.fastarm.back.history.controller.dto.MostSongsResponse;
import com.fastarm.back.history.repository.PersonalSingHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HistoryService {

    private final PersonalSingHistoryRepository personalSingHistoryRepository;

    @Transactional(readOnly = true)
    public List<MostSongsResponse> findMostSongsList(String loginId) {
        return personalSingHistoryRepository.personalMostSongsInfo(loginId);
    }

    @Transactional(readOnly = true)
    public List<MostSingersResponse> findMostSingersList(String loginId) {
        return personalSingHistoryRepository.personalMostSingersInfo(loginId);
    }

    @Transactional(readOnly = true)
    public List<String> findMostGenreList(String loginId) {
        return personalSingHistoryRepository.personalMostGenreInfo(loginId);
    }

}
