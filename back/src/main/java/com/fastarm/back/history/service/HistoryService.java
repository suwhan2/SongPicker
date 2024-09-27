package com.fastarm.back.history.service;

import com.fastarm.back.history.controller.dto.TeamRecentSongsResponse;
import com.fastarm.back.history.controller.dto.MostSingersResponse;
import com.fastarm.back.history.controller.dto.MostSongsResponse;
import com.fastarm.back.history.controller.dto.MyRecentSongsResponse;
import com.fastarm.back.history.dto.TeamRecentSongsDto;
import com.fastarm.back.history.repository.PersonalSingHistoryRepository;
import com.fastarm.back.history.repository.TeamSingHistoryRepository;
import com.fastarm.back.likes.entity.Likes;
import com.fastarm.back.likes.repository.LikesRepository;
import com.fastarm.back.member.entity.Member;
import com.fastarm.back.member.exception.MemberNotFoundException;
import com.fastarm.back.member.repository.MemberRepository;
import com.fastarm.back.song.entity.Song;
import com.fastarm.back.team.entity.Team;
import com.fastarm.back.team.exception.TeamNotFoundException;
import com.fastarm.back.team.repository.TeamMemberRepository;
import com.fastarm.back.team.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class HistoryService {

    private final PersonalSingHistoryRepository personalSingHistoryRepository;
    private final TeamSingHistoryRepository teamSingHistoryRepository;
    private final MemberRepository memberRepository;
    private final LikesRepository likesRepository;
    private final TeamRepository teamRepository;
    private final TeamMemberRepository teamMemberRepository;

    @Transactional(readOnly = true)
    public List<MostSongsResponse> findMostSongsList(String loginId) {
        return personalSingHistoryRepository.personalMostSongsInfo(loginId);
    }

    @Transactional(readOnly = true)
    public List<MostSingersResponse> findMostSingersList(String loginId) {
        return personalSingHistoryRepository.personalMostSingersInfo(loginId);
    }

    @Transactional(readOnly = true)
    public List<String> findMostGenreList(String loginId) {
        return personalSingHistoryRepository.personalMostGenreInfo(loginId);
    }

    @Transactional(readOnly = true)
    public List<MyRecentSongsResponse> findMyRecentSongsList(String loginId) {

        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);

        List<Song> songs = personalSingHistoryRepository.findByMember(member);

        List<Likes> likes = likesRepository.findByMemberAndSongIn(member, songs);

        Map<Long, MyRecentSongsResponse> map = new LinkedHashMap<>();

        for (Song data : songs) {
            map.put(data.getId(), MyRecentSongsResponse.from(data));

            boolean isLike = false;
            Long likeId = null;

            for (Likes like : likes) {
                if (like.getSong().getId().equals(data.getId())) {
                    isLike = true;
                    likeId = like.getId();
                    break;
                }
            }

            map.get(data.getId()).setIsLike(isLike);
            map.get(data.getId()).setLikeId(likeId);

        }

        return map.values().stream().toList();
    }

    @Transactional(readOnly = true)
    public List<TeamRecentSongsResponse> findTeamRecentSongsList(TeamRecentSongsDto teamRecentSongsDto) {

        Member member = memberRepository.findByLoginId(teamRecentSongsDto.getLoginId())
                .orElseThrow(MemberNotFoundException::new);

        Team team = teamRepository.findById(teamRecentSongsDto.getGroupId())
                .orElseThrow(TeamNotFoundException::new);

        List<Song> songs = teamSingHistoryRepository.findByTeam(team);

        List<Likes> likes = likesRepository.findByMemberAndSongIn(member, songs);

        Map<Long, TeamRecentSongsResponse> map = new LinkedHashMap<>();

        for (Song data : songs) {
            map.put(data.getId(), TeamRecentSongsResponse.from(data));

            boolean isLike = false;
            Long likeId = null;

            for (Likes like : likes) {
                if (like.getSong().getId().equals(data.getId())) {
                    isLike = true;
                    likeId = like.getId();
                    break;
                }
            }

            map.get(data.getId()).setIsLike(isLike);
            map.get(data.getId()).setLikeId(likeId);

        }

        return map.values().stream().toList();
    }

}
