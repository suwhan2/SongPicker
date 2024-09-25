package com.fastarm.back.common.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.UUID;

@Service
@Slf4j
@Data
public class S3Service implements FileService {

    private AmazonS3 amazonS3;
    private String bucket;
    private String aiS3Url;

    public S3Service(AmazonS3 amazonS3, String bucket) {
        this.amazonS3 = amazonS3;
        this.bucket = bucket;
    }

    public String uploadFile(MultipartFile multipartFile) throws IOException {
        String originalFileName = multipartFile.getOriginalFilename();
        String fileName = UUID.randomUUID() + "_" + originalFileName;

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());
        amazonS3.putObject(bucket, fileName, multipartFile.getInputStream(), metadata);

        return amazonS3.getUrl(bucket, fileName).toString();
    }

    public void deleteFile(String fileUrl) throws URISyntaxException {

            URI uri = new URI(fileUrl);
            String key = uri.getPath().substring(1);

            if (amazonS3.doesObjectExist(bucket, key)) {
                amazonS3.deleteObject(bucket, key);
                log.info("File deleted successfully: {}", key);
            } else {
                log.warn("File not found: {}", key);
            }
    }
}

