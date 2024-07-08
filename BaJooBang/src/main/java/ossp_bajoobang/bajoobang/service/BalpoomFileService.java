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
            // 서버에 저장할 경로
            Path targetLocation = getFileStorageLocation(filename);
            file.transferTo(targetLocation);
            log.info("File saved: " + targetLocation.toString());
            // 가짜경로 뽑기
            Path locationRelative = getLocationFake(filename);
            File fileEntity = new File();
            fileEntity.setFilename(filename);
            // 가짜경로 저장
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

        // 서버에 저장할 진짜 경로
        return Paths.get("/Users/woosungchoi/study/file").resolve(filename).normalize();

    }
    private Path getLocationFake(String filename){
        // "/home/chldntjd49/chldntjd49/images/"
        // "C:\\Users\\i1t28\\OneDrive\\Desktop\\2-2\\2024-1-OSSP2-team-6-BaJooBang\\BaJooBang\\src\\main\\resources\\templates"
        // "/Users/woosungchoi/study/file"

        // 통신에서 사용할 가짜 경로
        return Paths.get("/attach/images/").resolve(filename).normalize();

    }

    public List<File> returnFileList() {
        return balpoomFileRepository.findAll();
    }
    public List<File> returnFileList(Long request_id){
        Request request = requestRepository.findById(request_id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid requestId: " + request_id));
        return balpoomFileRepository.findByRequest(request);
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
