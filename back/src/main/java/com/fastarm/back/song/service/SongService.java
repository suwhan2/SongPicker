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
import com.fastarm.back.song.repository.SongRepository;
import com.fastarm.back.member.exception.MemberNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class SongService {
    private final SongRepository songRepository;
    private final MemberRepository memberRepository;


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
            SongDto songDto = SongDto.from(song, isLike, likeId);
            songDtoList.add(songDto);
        }
        return songDtoList;
    }


}
