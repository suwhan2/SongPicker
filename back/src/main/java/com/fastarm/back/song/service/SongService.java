package com.fastarm.back.song.service;

import com.fastarm.back.member.entity.Member;
import com.fastarm.back.member.repository.MemberRepository;
import com.fastarm.back.song.controller.dto.SongDetailRequest;
import com.fastarm.back.song.dto.SongDetailDto;
import com.fastarm.back.song.dto.SongRecommendDto;
import com.fastarm.back.song.entity.Song;
import com.fastarm.back.song.exception.NotFoundSongDetailException;
import com.fastarm.back.song.repository.SongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SongService {
    private final SongRepository songRepository;
    private final MemberRepository memberRepository;
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

    @Transactional(readOnly = true)
    public SongDetailDto getSongDetails(SongDetailRequest dto) {
        // 노래 조회
        Song song = songRepository.findById(dto.getSongId())
                .orElseThrow(NotFoundSongDetailException::new);
        //id 찾기
//        Optional<Member> memberId = memberRepository.findByLoginId(dto.getLoginId());
//        Optional<Long> likeId = likesRepository.findByMemberIdAndSongId(memberId,songId);

        return SongDetailDto.builder()
                .number(song.getNumber())
                .title(song.getTitle())
                .singer(song.getSinger())
                .coverImage(song.getCoverImage())
//                .genre(song.getGenre())
                .lyricist(song.getLyricist())
                .composer(song.getComposer())
                .lyrics(song.getLyrics())
                .releasedAt(song.getReleasedAt())
//                .isLike(likeId.isPresent())
//                .likeId(likeId.orElse(null))
                .build();
   }

}
