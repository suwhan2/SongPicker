package com.fastarm.back.team.controller;

import com.fastarm.back.auth.security.dto.LoginMemberInfo;
import com.fastarm.back.common.controller.dto.ApiResponse;
import com.fastarm.back.team.controller.dto.TeamAddRequest;
import com.fastarm.back.team.dto.TeamDetailDto;
import com.fastarm.back.team.dto.TeamDto;
import com.fastarm.back.team.service.TeamService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/teams")
public class TeamController {
    private final TeamService teamService;


    @GetMapping
    public ResponseEntity<?> myTeamGet(@AuthenticationPrincipal LoginMemberInfo loginMemberInfo){
        List<TeamDto> teamDtoList = teamService.getMyTeams(loginMemberInfo.getLoginId());
        return ResponseEntity.ok(new ApiResponse<>("TE103", "내 그룹 목록 조회 성공", teamDtoList));
    }

    @GetMapping("/{teamId}")
    public ResponseEntity<?> teamDetailGet(@PathVariable Long teamId){
        TeamDetailDto teamDetailDto = teamService.getTeamDetail(teamId);
        return ResponseEntity.ok(new ApiResponse<>("TE104", "그룹 상세 조회 성공", teamDetailDto));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> teamCreate(@Valid @ModelAttribute("teamImage") TeamAddRequest teamAddRequest,
                                         @AuthenticationPrincipal LoginMemberInfo loginMemberInfo){

        teamService.createTeam(teamAddRequest.toDto(loginMemberInfo.getLoginId()));
        return new ResponseEntity<>(new ApiResponse<>("TE100", "그룹 생성 성공", null), HttpStatus.CREATED);
    }


}
