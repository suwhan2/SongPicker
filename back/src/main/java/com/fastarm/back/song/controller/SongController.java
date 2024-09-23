package com.fastarm.back.song.controller;



import com.fastarm.back.common.controller.dto.ApiResponse;
import com.fastarm.back.song.dto.SongDto;

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
    public ResponseEntity<?> mySongsRecommend(){
        List<SongDto> songRecommendDtos = songService.recommendMySong();
        return new ResponseEntity<>(new ApiResponse<>("SO102","선곡 추천 성공",songRecommendDtos), HttpStatus.OK);
    }



//    @GetMapping("/my/recommendations")
//    public ResponseEntity<?> mySongsRecommend(@AuthenticationPrincipal LoginMemberInfo loginMemberInfo){
//        List<SongRecommendDto> songRecommendDtoList = songService.recommendMySong(loginMemberInfo.getLoginId());
//        return new ResponseEntity<>(new ApiResponse<>("SO102","선곡 추천 성공",songRecommendDtoList), HttpStatus.OK);
//    }
//
//    @GetMapping("/team/recommendations")
//    public ResponseEntity<?> teamSongsRecommend(@RequestParam Long teamId){
//        List<SongRecommendDto> songRecommendDtoList = songService.recommendTeamSong(teamId);
//        return new ResponseEntity<>(new ApiResponse<>("SO102","선곡 추천 성공",songRecommendDtoList), HttpStatus.OK);
//    }

}
