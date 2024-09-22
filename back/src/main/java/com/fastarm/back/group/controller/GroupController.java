package com.fastarm.back.group.controller;

import com.fastarm.back.auth.security.dto.LoginMemberInfo;
import com.fastarm.back.common.controller.dto.ApiResponse;
import com.fastarm.back.group.controller.dto.GroupAddRequest;
import com.fastarm.back.group.dto.GroupAddDto;
import com.fastarm.back.group.dto.GroupDetailDto;
import com.fastarm.back.group.dto.GroupDto;
import com.fastarm.back.group.service.GroupService;
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

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> groupCreate(@ModelAttribute("groupImage") MultipartFile groupImage,
                                         @ModelAttribute("groupName") String groupName,
                                         @AuthenticationPrincipal LoginMemberInfo loginMemberInfo){
        GroupAddRequest groupAddRequest = new GroupAddRequest(groupImage,groupName);
        groupService.createGroup(groupAddRequest.toDto(loginMemberInfo.getLoginId()));
        return new ResponseEntity<>(new ApiResponse<>("GR100", "그룹 생성 성공", null), HttpStatus.CREATED);
    }


}
