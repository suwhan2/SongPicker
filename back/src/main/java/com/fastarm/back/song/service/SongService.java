package com.fastarm.back.song.service;

import com.fastarm.back.member.entity.Member;
import com.fastarm.back.member.repository.MemberRepository;
import com.fastarm.back.song.controller.dto.SongDetailRequest;
import com.fastarm.back.song.controller.dto.SongSearchRequest;
import com.fastarm.back.song.controller.dto.SongSearchResponse;
import com.fastarm.back.song.dto.SongDetailDto;
import com.fastarm.back.song.dto.SongDto;
import com.fastarm.back.song.entity.Song;
import com.fastarm.back.song.exception.NotFoundSongDetailException;

import com.fastarm.back.song.dto.SongDto;

import com.fastarm.back.song.repository.SongRepository;
import com.fastarm.back.member.exception.MemberNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class SongService {
    private final SongRepository songRepository;
    private final MemberRepository memberRepository;
    // 좋아요 레포 추가
    private final RestTemplate restTemplate;
    private static final String DJANGO_API_URL = "http://django-server/recommendations";


    @Transactional
    public List<SongDto> recommendMySong(){
        return songRepository.findRandomSongs()
                .stream()
                .map(song -> SongDto.builder()
                        .number(song.getNumber())
                        .title(song.getTitle())
                        .singer(song.getSinger())
                        .coverImage(song.getCoverImage())
                        .build())
                .collect(Collectors.toList());

    }

//    @Transactional
//    public List<SongRecommendDto> recommendMySong(String loginId){
//        Member member = memberRepository.findByLoginId(loginId)
//                .orElseThrow(MemberNotFoundException::new);
//
//        //장고 통신 로직
//        SongRecommendRequest request = new SongRecommendRequest(member.getId());
//        SongRecommendDto[] songRecommendResponseList =restTemplate.postForObject(DJANGO_API_URL, request, SongRecommendDto[].class);
//        // to-do : 좋아요 추가
//        return Arrays.asList(songRecommendResponseList);
//
//    }
//
//    @Transactional
//    public List<SongRecommendDto> recommendTeamSong(Long teamId){
//
//        //장고 통신 로직
//        SongRecommendRequest request = new SongRecommendRequest(teamId);
//        SongRecommendDto[] songRecommendResponseList =restTemplate.postForObject(DJANGO_API_URL, request, SongRecommendDto[].class);
//        // to-do : 좋아요 추가
//        return Arrays.asList(songRecommendResponseList);
//
//    }



    @Transactional(readOnly = true)
    public SongDetailDto getSongDetails(SongDetailRequest dto) {
        // 노래 조회
        Song song = songRepository.findById(dto.getSongId())
                .orElseThrow(NotFoundSongDetailException::new);
        //id 찾기
        Member member = memberRepository.findByLoginId(dto.getLoginId())
                .orElseThrow(MemberNotFoundException::new);

//        Optional<Long> likeId = likesRepository.findByMemberIdAndSongId(member.getId(),songId);

        return SongDetailDto.builder()
                .number(song.getNumber())
                .title(song.getTitle())
                .singer(song.getSinger())
                .coverImage(song.getCoverImage())
                .genre(song.getGenre())
                .lyricist(song.getLyricist())
                .composer(song.getComposer())
                .lyrics(song.getLyrics())
                .releasedAt(song.getReleasedAt())
//                .isLike(likeId.isPresent())
//                .likeId(likeId.orElse(null))
                .build();
   }


   @Transactional(readOnly = true)
   public SongSearchResponse searchSongs(SongSearchRequest dto){
       Member member = memberRepository.findByLoginId(dto.getLoginId())
               .orElseThrow(MemberNotFoundException::new);


        List<Song> songsByTitle = songRepository.findSongsByKeyword(dto.getKeyword());
        List<SongDto> songResults = createSongDtoList(songsByTitle, member.getId());

        List<Song> songsBySinger = songRepository.findSongsBySinger(dto.getKeyword());
        List<SongDto> singerResults = createSongDtoList(songsBySinger, member.getId());

       return SongSearchResponse.from(songResults, singerResults);
   }


    private List<SongDto> createSongDtoList(List<Song> songs, Long memberId) {
        List<SongDto> songDtoList = new ArrayList<>();

        for (Song song : songs) {
            boolean isLike = false;
            Long likeId = null;
//            Optional<Long> likeResult = likesRepository.findByMemberIdAndSongId(memberId, song.getId());
//            if (likeResult.isPresent()) {
//                isLike = true;
//                likeId = likeResult.get();
//            }
            //, isLike, likeId
            SongDto songDto = SongDto.from(song);
            songDtoList.add(songDto);
        }
        return songDtoList;
    }


}
