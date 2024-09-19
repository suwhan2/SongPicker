package com.fastarm.back.common.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {
    String uploadFile(MultipartFile file, String dir, Long memberId) throws IOException;
}

