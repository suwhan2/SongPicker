package com.fastarm.back.song.service;

import com.fastarm.back.member.entity.Member;
import com.fastarm.back.member.repository.MemberRepository;
import com.fastarm.back.song.controller.dto.SongDetailRequest;
import com.fastarm.back.song.controller.dto.SongSearchRequest;
import com.fastarm.back.song.controller.dto.SongSearchResponse;
import com.fastarm.back.song.controller.dto.TeamSongsRecommendRequest;
import com.fastarm.back.song.dto.SongDetailDto;
import com.fastarm.back.song.dto.SongDto;
import com.fastarm.back.song.entity.Song;
import com.fastarm.back.song.exception.NotFoundSongDetailException;
import com.fastarm.back.song.repository.SongRepository;
import com.fastarm.back.member.exception.MemberNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class SongService {
    private final SongRepository songRepository;
    private final MemberRepository memberRepository;
    private final RestTemplate restTemplate;
    private static final String DJANGO_API_URL = "http://localhost:8000/api/recommend_songs/";

    @Transactional
//    public List<SongDto> recommendMySong(String loginId){
    public void recommendMySong(String loginId){

        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);

        List<Integer> songNumbers = new ArrayList<>(Arrays.asList(1, 2, 4, 3, 5, 6, 7, 8, 9, 10));

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("song_numbers", songNumbers);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<List> responseEntity = restTemplate.postForEntity(DJANGO_API_URL, entity, List.class);
        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            List songs = responseEntity.getBody();
            System.out.println("응답 받은 노래 리스트: " + songs);
        } else {
            System.out.println("API 호출 실패: " + responseEntity.getStatusCode());
        }


//        List<Object> songs = responseEntity.getBody();
//        List<Long> songIds = songs.stream().map(Song::getId).collect(Collectors.toList());
//        List<SongDto> songDtoList = songRepository.findSongsWithLikeStatus(songIds, member.getId());
//        return songDtoList;

    }

    @Transactional
    public List<SongDto> recommendTeamSong(TeamSongsRecommendRequest dto){

        Member member = memberRepository.findByLoginId(dto.getLoginId())
                .orElseThrow(MemberNotFoundException::new);

        List<Song> randomSongs = songRepository.findRandomSongs();
        List<Long> songIds = randomSongs.stream().map(Song::getId).collect(Collectors.toList());

        List<SongDto> songDtoList = songRepository.findSongsWithLikeStatus(songIds, member.getId());

        return songDtoList;

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

        Song song = songRepository.findById(dto.getSongId())
                .orElseThrow(NotFoundSongDetailException::new);

        Member member = memberRepository.findByLoginId(dto.getLoginId())
                .orElseThrow(MemberNotFoundException::new);

        List<SongDto> songDtoList = songRepository.findSongsWithLikeStatus(List.of(song.getId()), member.getId());
        SongDto songDto = songDtoList.get(0);

        return SongDetailDto.of(songDto, song);
    }


    @Transactional(readOnly = true)
    public SongSearchResponse searchSongs(SongSearchRequest dto){
        Member member = memberRepository.findByLoginId(dto.getLoginId())
                .orElseThrow(MemberNotFoundException::new);


        List<Long> songsByTitle = songRepository.findTitleByKeyword(dto.getKeyword());
        List<SongDto> songResults = songRepository.findSongsWithLikeStatus(songsByTitle, member.getId());

        List<Long> songsBySinger = songRepository.findSingerByKeyword(dto.getKeyword());
        List<SongDto> singerResults = songRepository.findSongsWithLikeStatus(songsBySinger, member.getId());

        return SongSearchResponse.from(songResults, singerResults);
    }
}
