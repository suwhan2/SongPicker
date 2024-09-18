package com.fastarm.back.song.service;

import com.fastarm.back.song.dto.SongDetailResponseDto;
import com.fastarm.back.song.dto.SongRecommendDto;
import com.fastarm.back.song.entity.Song;
import com.fastarm.back.song.exception.NotFoundSongDetailException;
import com.fastarm.back.song.repository.SongRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SongService {
    private final SongRepository songRepository;
    //private final PersonalSingHistoryRepository personalSingHistoryRepository;
    //private final GroupSingHistoryRepository groupSingHistoryRepository;

//    @Transactional
//    public List<SongRecommendDto> recommendMySong(Long memberId){
//        List<PersonalSingHistory> myHistory  = personalSingHistoryRepository.findAllByMemberId(memberId);
//
//        List<Song> sangList = new ArrayList<>();
//        for(PersonalSingHistory history : myHistory){
//            Song song = songRepository.findById(history.getSongId).orElseThrow(NotFoundSongDetailException::new);
//            sangList.add(song);
//        }
//        return runRecommendationAlgorithm(sangList);
//    }
//
//    @Transactional
//    public List<SongRecommendDto> recommendGroupSong(Long groupId){
//        List<GroupSingHistory> myHistory  = groupSingHistoryRepository.findAllByMemberId(groupId);
//
//        List<Song> sangList = new ArrayList<>();
//        for(GroupSingHistory history : myHistory){
//            Song song = songRepository.findById(history.getSongId).orElseThrow(NotFoundSongDetailException::new);
//            sangList.add(song);
//        }
//        return runRecommendationAlgorithm(sangList);
//    }

    private List<SongRecommendDto> runRecommendationAlgorithm(List<Song> sangList){
        List<SongRecommendDto> recommendedSongs = new ArrayList<>();
        try {
            ProcessBuilder processBuilder = new ProcessBuilder("python3", "경로쓰기/이름.py");

            //파이썬 스크립트에 인자 전달
            for (Song song : sangList) {
                //인자 어떻게 전달할지 정해야함 ex)
                processBuilder.command().add(song.getTitle());
            }
            //파이썬 스크립트 실행
            Process process = processBuilder.start();

            //결과 처리(SongRecommendDto만들기)
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                // Python에서 나온 추천 결과를 처리
//                recommendedSongs.add(SongRecommendDto);
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            // 예외 처리
            // Python 파일처리시 발생할 수 있는 예외 추후 추가
        }
        return recommendedSongs;
    }

    public SongDetailResponseDto getSongDetails(Long songId) {
        // 노래 조회
        Song song = songRepository.findById(songId)
                .orElseThrow(NotFoundSongDetailException::new);

        //임시방편 ERD 수정 필요
        Boolean isLike = false;
        Long likeId = null;

        // DTO 생성 시 builder 패턴 사용
        return SongDetailResponseDto.builder()
                .number(String.valueOf(song.getNumber()))
                .title(song.getTitle())
                .singer(song.getSinger())
                .coverImage(song.getCoverImage())
                .lyricist(song.getLyricist())
                .composer(song.getComposer())
                .lyrics(song.getLyrics())
                .releasedAt(song.getReleasedAt())
                .isLike(isLike)
                .likeId(likeId)
                .build();
    }

}
