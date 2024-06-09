package ossp_bajoobang.bajoobang.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ossp_bajoobang.bajoobang.domain.File;
import ossp_bajoobang.bajoobang.domain.Request;
import ossp_bajoobang.bajoobang.repository.BalpoomFileRepository;
import ossp_bajoobang.bajoobang.repository.RequestRepository;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BalpoomFileService {
    private final BalpoomFileRepository balpoomFileRepository;
    private final RequestRepository requestRepository;

    public void saveFile(List<MultipartFile> files, Long request_id) throws IOException {
        Request request = requestRepository.findById(request_id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid requestId: " + request_id));
        for(MultipartFile file : files){
            String filename = file.getOriginalFilename();
            Path targetLocation = getFileStorageLocation(filename);
            // 서버에 저장은 절대경로로
            file.transferTo(targetLocation);
            log.info("File saved: " + targetLocation.toString());
            // 상대경로 뽑기
            Path locationRelative = getLocation_relative(filename);
            File fileEntity = new File();
            fileEntity.setFilename(filename);
            // 상대경로 저장
            fileEntity.setFilepath(locationRelative.toString());
            fileEntity.setSize(file.getSize());
            fileEntity.setContentType(file.getContentType());
            fileEntity.setUploadedDate(LocalDateTime.now());
            fileEntity.setRequest(request);

            balpoomFileRepository.save(fileEntity);
        }
    }

    private Path getFileStorageLocation(String filename){
        // "/home/chldntjd49/chldntjd49/images/"
        // "C:\\Users\\i1t28\\OneDrive\\Desktop\\2-2\\2024-1-OSSP2-team-6-BaJooBang\\BaJooBang\\src\\main\\resources\\templates"
        // "/Users/woosungchoi/study/file"
        // "/Users/woosungchoi/study/file"
        // /Users/woosungchoi/Desktop/mypage/2024-1-OSSP2-team-6-BaJooBang/BaJooBang/src/main/frontend/public

        return Paths.get("/Users/woosungchoi/Desktop/mypage/2024-1-OSSP2-team-6-BaJooBang/BaJooBang/src/main/frontend/public/public_assets").resolve(filename).normalize();

    }
    private Path getLocation_relative(String filename){
        // "/home/chldntjd49/chldntjd49/images/"
        // "C:\\Users\\i1t28\\OneDrive\\Desktop\\2-2\\2024-1-OSSP2-team-6-BaJooBang\\BaJooBang\\src\\main\\resources\\templates"
        // "/Users/woosungchoi/study/file"
        // "/Users/woosungchoi/study/file"
        // /Users/woosungchoi/Desktop/mypage/2024-1-OSSP2-team-6-BaJooBang/BaJooBang/src/main/frontend/public

        return Paths.get("/public_assets").resolve(filename).normalize();

    }

    public List<File> returnFileList(){
        return balpoomFileRepository.findAll();
    }

//    public void saveTestFile(List<MultipartFile> files){
//        for(MultipartFile file : files){
//            String filename = file.getOriginalFilename();
//            Path targetLocation = getFileStorageLocation(filename);
//
//            file.transferTo(targetLocation);
//
//            File fileEntity = new File();
//            fileEntity.setFilename(filename);
//            fileEntity.setFilepath(targetLocation.toString());
//            fileEntity.setSize(file.getSize());
//            fileEntity.setContentType(file.getContentType());
//            fileEntity.setUploadedDate(LocalDateTime.now());
//
//            balpoomFileRepository.save(fileEntity);
//        }
//    }


}
