package com.fastarm.back.song.controller;

import com.fastarm.back.common.controller.dto.ApiResponse;
import com.fastarm.back.song.dto.SongDetailResponseDto;
import com.fastarm.back.song.dto.SongRecommendDto;
import com.fastarm.back.song.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/songs")
@RequiredArgsConstructor
public class SongController {
    private final SongService songService;

    @GetMapping("/my/recommendations")
    public ResponseEntity<?> mySongsRecommend(){//@AuthenticationPrincipal
        List<SongRecommendDto> songRecommendDtos = songService.recommendMySong();
        return new ResponseEntity<>(new ApiResponse<>("SO102","선곡 추천 성공",songRecommendDtos), HttpStatus.OK);
    }

    @GetMapping("/group/recommendations")
    public ResponseEntity<?> groupSongsRecommend(@RequestParam Long groupId){
        List<SongRecommendDto> songRecommendDtos = songService.recommendGroupSong(groupId);
        return new ResponseEntity<>(new ApiResponse<>("SO102","선곡 추천 성공",songRecommendDtos), HttpStatus.OK);
    }

    @GetMapping("/{songId}")
    public ResponseEntity<?> getSongDetails(@PathVariable Long songId) {
        SongDetailResponseDto songDetail = songService.getSongDetails(songId);
        return new ResponseEntity<>(new ApiResponse<>("SO100", "노래 상세 조회 성공", songDetail), HttpStatus.OK);

    }
}
