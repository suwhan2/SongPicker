package com.fastarm.back.auth.service;

import com.fastarm.back.auth.dto.PhoneSendDto;
import com.fastarm.back.auth.enums.PhoneAuthPurpose;
import com.fastarm.back.common.constants.RedisSessionConstants;
import com.fastarm.back.common.constants.RedisExpiredTimeConstants;
import com.fastarm.back.common.service.RedisService;
import com.fastarm.back.member.entity.Member;
import com.fastarm.back.member.exception.LoginIdPhoneMismatchException;
import com.fastarm.back.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final DefaultMessageService messageService;
    private final RedisService redisService;
    private final MemberRepository memberRepository;

    private static final String senderPhone = "01085914442";

    private String createCode() {
        int leftLimit = 48;
        int rightLimit = 122;
        int targetStringLength = 6;
        Random random = new Random();

        return random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 | i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }

    @Transactional
    public void sendAuthCode(PhoneSendDto phoneSendDto) {

        if (phoneSendDto.getPurpose().equals(PhoneAuthPurpose.FIND_PASSWORD.getPurpose())) {
            Member member = memberRepository.findByLoginId(phoneSendDto.getLoginId())
                    .orElseThrow();
            if (!member.getPhone().equals(phoneSendDto.getPhone())) {
                throw new LoginIdPhoneMismatchException();
            }
        }

        String receiverPhone = phoneSendDto.getPhone();
        String authCode = createCode();
        Message message = new Message();
        message.setFrom(senderPhone);
        message.setTo(receiverPhone);
        message.setText(authCode);
        redisService.setData(generatePrefixedKey(receiverPhone), authCode, RedisExpiredTimeConstants.PHONE_AUTH_EXPIRED);

        messageService.sendOne(new SingleMessageSendingRequest(message));
    }

    private String generatePrefixedKey(String phone) {
        return RedisSessionConstants.AUTH_CODE + ":" + phone;
    }
}
