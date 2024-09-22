package com.fastarm.back.group.service;

import com.fastarm.back.group.controller.dto.GroupAddRequest;
import com.fastarm.back.group.dto.GroupAddDto;
import com.fastarm.back.group.dto.GroupDetailDto;
import com.fastarm.back.group.dto.GroupDto;
import com.fastarm.back.group.entity.Group;
import com.fastarm.back.group.entity.MemberGroup;
import com.fastarm.back.group.repository.GroupRepository;
import com.fastarm.back.group.repository.MemberGroupRepository;
import com.fastarm.back.member.entity.Member;
import com.fastarm.back.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.fastarm.back.member.exception.MemberNotFoundException;
import com.fastarm.back.group.exception.GroupNotFoundException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GroupService {

    private final MemberGroupRepository memberGroupRepository;
    private final GroupRepository groupRepository;
    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public List<GroupDto> getMyGroups(String loginId){
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);

        return memberGroupRepository.findByMemberId(member.getId()).stream()
                .map(memberGroup -> {
                    Group group = memberGroup.getGroup();
                    String groupImage = group.getGroupImage();
                    String groupName = group.getName();
                    int groupMemberCount = memberGroupRepository.countByGroupId(group.getId());

                    return GroupDto.from(groupImage, groupName, groupMemberCount);
                })
                .collect(Collectors.toList());
    }


    @Transactional(readOnly = true)
    public GroupDetailDto getGroupDetail(Long groupId){
        Group group = groupRepository.findById(groupId).orElseThrow(GroupNotFoundException::new);
        List<GroupDetailDto.Member> members = memberGroupRepository.findByGroupId(groupId).stream()
                .map(memberGroup ->{
                    Member member = memberGroup.getMember();
                    return GroupDetailDto.Member.builder()
                            .profileImage(member.getProfileImage())
                            .nickname(member.getNickname())
                            .build();

                }).collect(Collectors.toList());

        return GroupDetailDto.from(
                group.getGroupImage(),
                group.getName(),
                members
        );
    }

    @Transactional
    public void createGroup(GroupAddDto dto){
        String imagePath="";
//        String imagePath = saveImage(dto.getGroupImage()); S3 업로드 로직 추가
        Group group = dto.toEntity(imagePath);
        Group savedGroup = groupRepository.save(group);

        Member member = memberRepository.findByLoginId(dto.getLoginId())
                .orElseThrow(MemberNotFoundException::new);

        // 방장 그룹에 자동 추가
        MemberGroup memberGroup = MemberGroup.builder()
                .member(member)
                .group(savedGroup)
                .build();
        memberGroupRepository.save(memberGroup);

    }
}
