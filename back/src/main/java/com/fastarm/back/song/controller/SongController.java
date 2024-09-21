package com.fastarm.back.song.controller;

import com.fastarm.back.auth.security.dto.LoginMemberInfo;
import com.fastarm.back.common.controller.dto.ApiResponse;
import com.fastarm.back.song.controller.dto.SongDetailRequest;
import com.fastarm.back.song.dto.SongDetailDto;
import com.fastarm.back.song.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/songs")
@RequiredArgsConstructor
public class SongController {
    private final SongService songService;

//    @GetMapping("/my/recommendations")
//    public ResponseEntity<?> mySongsRecommend(@AuthenticationPrincipal LoginMemberInfo loginMemberInfo){
//        List<SongRecommendDto> songRecommendDtos = songService.recommendMySong();
//        return new ResponseEntity<>(new ApiResponse<>("SO102","선곡 추천 성공",songRecommendDtos), HttpStatus.OK);
//    }
//
//    @GetMapping("/group/recommendations")
//    public ResponseEntity<?> groupSongsRecommend(@RequestParam Long groupId){
//        List<SongRecommendDto> songRecommendDtos = songService.recommendGroupSong(groupId);
//        return new ResponseEntity<>(new ApiResponse<>("SO102","선곡 추천 성공",songRecommendDtos), HttpStatus.OK);
//    }

    @GetMapping("/{songId}")
    public ResponseEntity<?> getSongDetails(@PathVariable Long songId, @AuthenticationPrincipal LoginMemberInfo loginMemberInfo) {
        SongDetailRequest songDetailRequest = SongDetailRequest.from(songId, loginMemberInfo.getLoginId());
        SongDetailDto songDetail = songService.getSongDetails(songDetailRequest); //dto로 바꾸기
        return new ResponseEntity<>(new ApiResponse<>("SO100", "노래 상세 조회 성공", songDetail), HttpStatus.OK);

    }

}
