package com.fastarm.back.group.controller;

import com.fastarm.back.auth.security.dto.LoginMemberInfo;
import com.fastarm.back.common.controller.dto.ApiResponse;
import com.fastarm.back.group.dto.GroupDetailDto;
import com.fastarm.back.group.dto.GroupDto;
import com.fastarm.back.group.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/groups")
public class GroupController {
    private final GroupService groupService;


    @GetMapping
    public ResponseEntity<?> myGroupsGet(@AuthenticationPrincipal LoginMemberInfo loginMemberInfo){
        List<GroupDto> myGroupList = groupService.getMyGroups(loginMemberInfo.getLoginId());
        return ResponseEntity.ok(new ApiResponse<>("GR103", "내 그룹 목록 조회 성공", myGroupList));
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<?> groupDetailGet(@PathVariable Long groupId){
        GroupDetailDto groupDetailDto = groupService.getGroupDetail(groupId);
        return ResponseEntity.ok(new ApiResponse<>("GR104", "그룹 상세 조회 성공", groupDetailDto));
    }



}
