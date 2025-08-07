#target photoshop

// [비주얼테크 - rio-완전수정] 손상된 파일을 완전히 새로 작성
function saveGroupLayersAsPNG() {
    // 저장 폴더 선택
    var destFolder = Folder.selectDialog("파일이 저장될 폴더를 선택하세요");
    if (!destFolder) {
        alert("작업이 취소되었습니다.");
        return;
    }

    // [비주얼테크 - rio-크기선택기능] 이미지 크기 선택 다이얼로그 추가
    var sizeChoice = confirm("이미지 크기를 캔버스에 맞춰서 설정하시겠습니까?\n\nYES: 캔버스 크기에 맞춤\nNO: 각 레이어 실제 크기에 맞춤");
    var useCanvasSize = sizeChoice;

    var originalDoc = app.activeDocument;
    var canvasW = originalDoc.width;
    var canvasH = originalDoc.height;
    var res = originalDoc.resolution;

    for (var i = 0; i < originalDoc.layerSets.length; i++) {
        var group = originalDoc.layerSets[i];
        var groupName = group.name;

        if (group.artLayers.length === 0) continue;

        var groupFolder = new Folder(destFolder + "/" + groupName);
        if (!groupFolder.exists) groupFolder.create();

        for (var j = 0; j < group.artLayers.length; j++) {
            // [비주얼테크 - rio-레이어복제] 안전한 레이어 복제 방식 사용
            var layer = group.artLayers[j];
            var layerName = layer.name;

            // [비주얼테크 - rio-문서활성화수정] 원본 문서 활성화 후 레이어 복제
            // 원본 문서 활성화 (레이어 복제를 위해 필수)
            app.activeDocument = originalDoc;
            
            // [비주얼테크 - rio-크기선택로직] 선택에 따른 문서 크기 결정
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
            
            // 계산된 크기로 새 문서 생성 (배경 없음)
            var newDoc = app.documents.add(docWidth, docHeight, res, layerName, NewDocumentMode.RGB, DocumentFill.TRANSPARENT);
            
            // 다시 원본 문서 활성화 후 레이어 복제
            app.activeDocument = originalDoc;
            var duplicatedLayer = layer.duplicate(newDoc, ElementPlacement.PLACEATBEGINNING);
            
            // 새 문서 활성화 후 레이어 위치 조정
            app.activeDocument = newDoc;
            
            // 레이어 크기에 맞춘 경우 위치 조정
            if (!useCanvasSize) {
                duplicatedLayer.translate(UnitValue(offsetX, bounds[0].type), UnitValue(offsetY, bounds[1].type));
            }
            
            var saveFile = new File(groupFolder + "/" + sanitizeFileName(layerName) + ".png");
            exportPNG(newDoc, saveFile);
            newDoc.close(SaveOptions.DONOTSAVECHANGES);
        }
    }

    // [비주얼테크 - rio-원본문서복귀] 작업 완료 후 원본 문서로 돌아가기
    app.activeDocument = originalDoc;
    alert("PNG 저장 완료!");
}

// [비주얼테크 - rio-함수실행] 스크립트 실행
saveGroupLayersAsPNG();


// 유효한 파일명으로 정리 (Windows 시스템 기준)
function sanitizeFileName(name) {
    return name.replace(/[\\\/:*?"<>|]/g, "_");
}

// PNG 저장 함수
function exportPNG(doc, file) {
    var opts = new ExportOptionsSaveForWeb();
    opts.format = SaveDocumentType.PNG;
    opts.PNG8 = false; // PNG-24
    opts.transparency = true;
    opts.interlaced = false;
    opts.quality = 100;
    doc.exportDocument(file, ExportType.SAVEFORWEB, opts);
}