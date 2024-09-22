package com.fastarm.back.song.controller;

import com.fastarm.back.auth.security.dto.LoginMemberInfo;
import com.fastarm.back.common.controller.dto.ApiResponse;
import com.fastarm.back.song.controller.dto.SongDetailRequest;
import com.fastarm.back.song.controller.dto.SongSearchRequest;
import com.fastarm.back.song.controller.dto.SongSearchResponse;
import com.fastarm.back.song.dto.SongDetailDto;
import com.fastarm.back.song.service.SongService;
import lombok.RequiredArgsConstructor;
import okhttp3.Response;
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

    @GetMapping("/{songId}")
    public ResponseEntity<?> getSongDetails(@PathVariable Long songId, @AuthenticationPrincipal LoginMemberInfo loginMemberInfo) {

        SongDetailDto songDetail = songService.getSongDetails(SongDetailRequest.from(songId, loginMemberInfo.getLoginId()));
        return new ResponseEntity<>(new ApiResponse<>("SO100", "노래 상세 조회 성공", songDetail), HttpStatus.OK);

    }

    @GetMapping("/search")
    public ResponseEntity<?> songsSearch(@RequestParam String keyword, @AuthenticationPrincipal LoginMemberInfo loginMemberInfo){
        SongSearchResponse songSearchResponse = songService.searchSongs(SongSearchRequest.from(keyword, loginMemberInfo.getLoginId()));
        return new ResponseEntity<>(new ApiResponse<>("SO101","노래 검색 성공",songSearchResponse), HttpStatus.OK);
    }

}
