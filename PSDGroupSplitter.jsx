#target photoshop

/**
 * PSDGroupSplitter - Photoshop 그룹 레이어 분리 도구
 * 
 * Photoshop 그룹 레이어들을 자동으로 개별 PNG 파일로 분리합니다
 * 그룹명을 기반으로 체계적인 폴더 구조를 생성합니다
 * 파일명과 레이어명에 포함된 한글 문자를 완벽 지원합니다
 * 
 * Repository: https://github.com/[your-username]/PSDGroupSplitter
 * Version: 1.0.3 - 한글 주석 완료 및 사용자 편의성 개선
 * Author: Rio
 * License: MIT
 */

// [PSDGroupSplitter] PSD 그룹을 PNG 파일로 분리하는 메인 함수
function splitPSDGroupsToPNG() {
    // 저장 폴더 선택
    var destFolder = Folder.selectDialog("PNG 파일이 저장될 폴더를 선택하세요");
    if (!destFolder) {
        alert("작업이 취소되었습니다.");
        return;
    }

    // [PSDGroupSplitter] 이미지 크기 선택 다이얼로그
    var sizeChoice = confirm("이미지 크기를 캔버스에 맞춰서 설정하시겠습니까?\n\n확인: 캔버스 크기에 맞춤\n취소: 각 레이어 실제 크기에 맞춤");
    var useCanvasSize = sizeChoice;

    var originalDoc = app.activeDocument;
    var canvasW = originalDoc.width;
    var canvasH = originalDoc.height;
    var res = originalDoc.resolution;

    var processedLayers = 0;
    var processedGroups = 0;
    var hasGroups = originalDoc.layerSets.length > 0;
    var hasIndividualLayers = originalDoc.artLayers.length > 0;

    // 문서에 처리할 레이어가 있는지 확인
    if (!hasGroups && !hasIndividualLayers) {
        alert("이 문서에서 처리할 레이어를 찾을 수 없습니다.");
        return;
    }

    // 그룹이 존재하는 경우 그룹 레이어들을 처리
    if (hasGroups) {
        for (var i = 0; i < originalDoc.layerSets.length; i++) {
        var group = originalDoc.layerSets[i];
        var groupName = group.name;

        // 빈 그룹은 건너뛰기
        if (group.artLayers.length === 0) continue;

        // 그룹 폴더 생성
        var groupFolder = new Folder(destFolder + "/" + sanitizeFileName(groupName));
        if (!groupFolder.exists) groupFolder.create();
        
        processedGroups++;

        // 그룹 내 각 레이어 처리
        for (var j = 0; j < group.artLayers.length; j++) {
            // [PSDGroupSplitter] 안전한 레이어 복제 방식
            var layer = group.artLayers[j];
            var layerName = layer.name;

            // [PSDGroupSplitter] 레이어 복제를 위해 원본 문서 활성화
            app.activeDocument = originalDoc;
            
            // [PSDGroupSplitter] 사용자 선택에 따른 문서 크기 결정
            var docWidth, docHeight, offsetX = 0, offsetY = 0;
            
            if (useCanvasSize) {
                // 캔버스 크기에 맞춤
                docWidth = canvasW;
                docHeight = canvasH;
            } else {
                // 레이어 실제 크기에 맞춤
                var bounds = layer.bounds;
                var layerLeft = bounds[0].value;
                var layerTop = bounds[1].value;
                var layerRight = bounds[2].value;
                var layerBottom = bounds[3].value;
                
                docWidth = UnitValue(layerRight - layerLeft, bounds[0].type);
                docHeight = UnitValue(layerBottom - layerTop, bounds[1].type);
                offsetX = -layerLeft;
                offsetY = -layerTop;
            }
            
            // 계산된 크기로 새 문서 생성 (투명 배경)
            var newDoc = app.documents.add(docWidth, docHeight, res, layerName, NewDocumentMode.RGB, DocumentFill.TRANSPARENT);
            
            // 원본 문서 활성화 후 레이어 복제
            app.activeDocument = originalDoc;
            var duplicatedLayer = layer.duplicate(newDoc, ElementPlacement.PLACEATBEGINNING);
            
            // 새 문서 활성화 후 레이어 위치 조정
            app.activeDocument = newDoc;
            
            // 레이어 크기 모드의 경우 위치 조정
            if (!useCanvasSize) {
                duplicatedLayer.translate(UnitValue(offsetX, bounds[0].type), UnitValue(offsetY, bounds[1].type));
            }
            
            // PNG로 저장
            var saveFile = new File(groupFolder + "/" + sanitizeFileName(layerName) + ".png");
            exportPNG(newDoc, saveFile);
            newDoc.close(SaveOptions.DONOTSAVECHANGES);
            
            processedLayers++;
        }
    }
    }

    // 그룹이 없는 경우 개별 레이어들을 처리
    if (!hasGroups && hasIndividualLayers) {
        // 그룹되지 않은 레이어들을 위한 PSD 파일명 폴더 생성
        var psdFileName = originalDoc.name;
        var lastDotIndex = psdFileName.lastIndexOf(".");
        if (lastDotIndex > 0) {
            psdFileName = psdFileName.substring(0, lastDotIndex);
        }
        var cleanFileName = sanitizeFileName(psdFileName); // 폴더용 파일명 정리
        var individualFolder = new Folder(destFolder + "/" + cleanFileName);
        if (!individualFolder.exists) individualFolder.create();
        
        for (var k = 0; k < originalDoc.artLayers.length; k++) {
            var layer = originalDoc.artLayers[k];
            var layerName = layer.name;

            // [PSDGroupSplitter] 레이어 복제를 위해 원본 문서 활성화
            app.activeDocument = originalDoc;
            
            // [PSDGroupSplitter] 사용자 선택에 따른 문서 크기 결정
            var docWidth, docHeight, offsetX = 0, offsetY = 0;
            
            if (useCanvasSize) {
                // 캔버스 크기에 맞춤
                docWidth = canvasW;
                docHeight = canvasH;
            } else {
                // 레이어 실제 크기에 맞춤
                var bounds = layer.bounds;
                var layerLeft = bounds[0].value;
                var layerTop = bounds[1].value;
                var layerRight = bounds[2].value;
                var layerBottom = bounds[3].value;
                
                docWidth = UnitValue(layerRight - layerLeft, bounds[0].type);
                docHeight = UnitValue(layerBottom - layerTop, bounds[1].type);
                offsetX = -layerLeft;
                offsetY = -layerTop;
            }
            
            // 계산된 크기로 새 문서 생성 (투명 배경)
            var newDoc = app.documents.add(docWidth, docHeight, res, layerName, NewDocumentMode.RGB, DocumentFill.TRANSPARENT);
            
            // 원본 문서 활성화 후 레이어 복제
            app.activeDocument = originalDoc;
            var duplicatedLayer = layer.duplicate(newDoc, ElementPlacement.PLACEATBEGINNING);
            
            // 새 문서 활성화 후 레이어 위치 조정
            app.activeDocument = newDoc;
            
            // 레이어 크기 모드의 경우 위치 조정
            if (!useCanvasSize) {
                duplicatedLayer.translate(UnitValue(offsetX, bounds[0].type), UnitValue(offsetY, bounds[1].type));
            }
            
            // PNG로 저장
            var saveFile = new File(individualFolder + "/" + sanitizeFileName(layerName) + ".png");
            exportPNG(newDoc, saveFile);
            newDoc.close(SaveOptions.DONOTSAVECHANGES);
            
            processedLayers++;
        }
    }

    // [PSDGroupSplitter] 작업 완료 후 원본 문서로 복귀
    app.activeDocument = originalDoc;
    
    var resultMessage = "PSDGroupSplitter 완료!\n\n";
    if (hasGroups) {
        resultMessage += "처리된 그룹: " + processedGroups + "개\n";
    }
    if (!hasGroups && hasIndividualLayers) {
        var psdFileName = originalDoc.name;
        var lastDotIndex = psdFileName.lastIndexOf(".");
        if (lastDotIndex > 0) {
            psdFileName = psdFileName.substring(0, lastDotIndex);
        }
        resultMessage += "'" + psdFileName + "' 폴더에 개별 레이어 처리됨\n";
    }
    resultMessage += "내보낸 PNG 파일: " + processedLayers + "개";
    
    alert(resultMessage);
}

/**
 * 크로스 플랫폼 파일 시스템 호환성을 위한 파일명 정리
 * 유효하지 않은 문자를 밑줄로 대체하고 한글 문자를 처리합니다
 * @param {string} name - 원본 파일명
 * @return {string} - 정리된 파일명
 */
function sanitizeFileName(name) {
    if (!name || name.length === 0) {
        return "Untitled";
    }
    
    // 파일 시스템에 유효하지 않은 문자 제거 또는 대체
    var cleanName = "";
    for (var i = 0; i < name.length; i++) {
        var currentChar = name.charAt(i);
        if (currentChar === "\\" || currentChar === "/" || currentChar === ":" || 
            currentChar === "*" || currentChar === "?" || currentChar === '"' || 
            currentChar === "<" || currentChar === ">" || currentChar === "|") {
            cleanName += "_";
        } else {
            cleanName += currentChar;
        }
    }
    
    // 시작과 끝의 공백 및 점 제거
    while (cleanName.length > 0 && (cleanName.charAt(0) === " " || cleanName.charAt(0) === ".")) {
        cleanName = cleanName.substring(1);
    }
    while (cleanName.length > 0 && (cleanName.charAt(cleanName.length - 1) === " " || cleanName.charAt(cleanName.length - 1) === ".")) {
        cleanName = cleanName.substring(0, cleanName.length - 1);
    }
    
    // 정리 후 이름이 비어있으면 기본값 사용
    if (cleanName.length === 0) {
        return "Untitled";
    }
    
    // 경로 문제 방지를 위한 길이 제한 (Windows는 구성요소당 255자 제한)
    if (cleanName.length > 100) {
        cleanName = cleanName.substring(0, 100);
    }
    
    return cleanName;
}

/**
 * 최적의 설정으로 문서를 PNG로 내보내기
 * 투명도를 지원하는 PNG-24 형식을 사용합니다
 * @param {Document} doc - 내보낼 Photoshop 문서
 * @param {File} file - 출력 파일 경로
 */
function exportPNG(doc, file) {
    var opts = new ExportOptionsSaveForWeb();
    opts.format = SaveDocumentType.PNG;
    opts.PNG8 = false; // 더 나은 품질을 위해 PNG-24 사용
    opts.transparency = true;
    opts.interlaced = false;
    opts.quality = 100;
    doc.exportDocument(file, ExportType.SAVEFORWEB, opts);
}

// [PSDGroupSplitter] 메인 스크립트 실행
try {
    splitPSDGroupsToPNG();
} catch (error) {
    alert("PSDGroupSplitter 오류: " + error.message);
}
