package ossp_bajoobang.bajoobang.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ossp_bajoobang.bajoobang.domain.File;
import ossp_bajoobang.bajoobang.repository.BalpoomFileRepository;

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

    public void saveFile(List<MultipartFile> files) throws IOException {
        for(MultipartFile file : files){
            String filename = file.getOriginalFilename();
            Path targetLocation = getFileStorageLocation(filename);

            file.transferTo(targetLocation);

            File fileEntity = new File();
            fileEntity.setFilename(filename);
            fileEntity.setFilepath(targetLocation.toString());
            fileEntity.setSize(file.getSize());
            fileEntity.setContentType(file.getContentType());
            fileEntity.setUploadedDate(LocalDateTime.now());

            balpoomFileRepository.save(fileEntity);
        }
    }

    private Path getFileStorageLocation(String filename){
        return Paths.get("uploda-dir").resolve(filename).normalize();
    }
}
