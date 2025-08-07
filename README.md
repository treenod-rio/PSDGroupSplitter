# PSDGroupSplitter - Photoshop Layer Group Splitter

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Photoshop](https://img.shields.io/badge/Adobe-Photoshop-31A8FF.svg)

**Automatically splits Photoshop group layers into individual PNG files**

</div>

## 📋 개요

Adobe Photoshop에서 **그룹 레이어들과 개별 레이어들을 자동으로 PNG 파일로 저장**하는 강력한 스크립트입니다. 그룹이 있으면 그룹별로, 그룹이 없으면 PSD 파일명으로 폴더를 생성하여 체계적으로 관리합니다.

## ✨ 주요 기능

### 🎯 **유연한 레이어 처리**
- **그룹 레이어 처리**: 각 레이어 그룹마다 별도 폴더 자동 생성
- **개별 레이어 처리**: 그룹이 없어도 PSD 파일명으로 폴더 생성하여 저장
- **스마트 감지**: 문서 구조를 자동 분석하여 최적의 처리 방식 선택

### 📐 **크기 선택 옵션**
사용자가 두 가지 저장 방식 중 선택 가능:

1. **캔버스 크기에 맞춤** (확인 선택)
   - 원본 문서의 캔버스 크기로 모든 레이어 저장
   - 레이어 위치와 전체 레이아웃 그대로 유지

2. **레이어 실제 크기에 맞춤** (취소 선택)
   - 각 레이어의 실제 크기만큼만 저장
   - 여백 없이 레이어 컨텐츠만 정확히 저장

### 🛡️ **안전하고 스마트한 처리**
- **원본 보호**: 원본 문서는 절대 수정하지 않음
- **크로스 플랫폼**: Windows/Mac 호환 가능한 파일명 자동 생성
- **에러 처리**: 예외 상황 대응 및 상세한 진행 상황 리포트

## 🚀 사용 방법

### **1. 사전 준비**
- Adobe Photoshop 실행 (CC 버전 권장)
- 처리하고 싶은 PSD 파일 열기
- 레이어가 그룹으로 정리되어 있거나 개별 레이어 존재

### **2. 스크립트 실행**
```
1️⃣ File → Scripts → Browse...
2️⃣ PSDGroupSplitter.jsx 파일 선택
3️⃣ "PNG 파일이 저장될 폴더를 선택하세요" → 저장 위치 선택
4️⃣ "이미지 크기를 캔버스에 맞춰서 설정하시겠습니까?" → 크기 옵션 선택
5️⃣ 자동 처리 완료!
```

### **3. 크기 옵션 선택**
**팝업 창에서 선택**:
- **확인**: 캔버스 크기에 맞춤 (레이아웃 유지)
- **취소**: 각 레이어 실제 크기에 맞춤 (여백 제거)

## 📁 파일 구조 예시

### **시나리오 1: 그룹이 있는 경우**

**실행 전 (Photoshop 레이어)**:
```
📄 UI_Design.psd
├── 📁 Header Components (그룹)
│   ├── 🖼️ logo (레이어)
│   ├── 🖼️ navigation (레이어)
│   └── 🖼️ search-box (레이어)
├── 📁 Main Content (그룹)
│   ├── 🖼️ hero-banner (레이어)
│   └── 🖼️ content-card (레이어)
└── 📁 Footer (그룹)
    └── 🖼️ footer-info (레이어)
```

**실행 후 (저장된 파일)**:
```
📁 선택한 저장 폴더/
├── 📁 Header Components/
│   ├── 🖼️ logo.png
│   ├── 🖼️ navigation.png
│   └── 🖼️ search-box.png
├── 📁 Main Content/
│   ├── 🖼️ hero-banner.png
│   └── 🖼️ content-card.png
└── 📁 Footer/
    └── 🖼️ footer-info.png
```

### **시나리오 2: 그룹이 없는 경우 (NEW! 🆕)**

**실행 전 (Photoshop 레이어)**:
```
📄 Icon_Set.psd
├── 🖼️ home-icon (레이어)
├── 🖼️ user-icon (레이어)
├── 🖼️ settings-icon (레이어)
└── 🖼️ logout-icon (레이어)
```

**실행 후 (저장된 파일)**:
```
📁 선택한 저장 폴더/
└── 📁 Icon_Set/  ← PSD 파일명으로 폴더 생성
    ├── 🖼️ home-icon.png
    ├── 🖼️ user-icon.png
    ├── 🖼️ settings-icon.png
    └── 🖼️ logout-icon.png
```

**완료 메시지**:
```
PSDGroupSplitter 완료!

'Icon_Set' 폴더에 개별 레이어 처리됨
내보낸 PNG 파일: 4개
```

## ⚙️ 기술적 특징

### **PNG 저장 설정**
- **포맷**: PNG-24 (고품질, 1600만 색상)
- **투명도**: 완벽 지원
- **압축**: 무손실 압축
- **품질**: 100% 최고 품질

### **스마트 파일명 처리**
- **크로스 플랫폼 호환**: Windows/Mac/Linux 모두 지원
- **특수문자 자동 변환**: `\ / : * ? " < > |` → `_`
- **PSD 파일명 활용**: 확장자 자동 제거 및 정리

### **안전한 작업 방식**
- **원본 문서 보호**: 절대 수정하지 않음
- **메모리 최적화**: 각 레이어를 개별 문서로 복제 후 즉시 정리
- **작업 복귀**: 완료 후 원본 문서로 자동 복귀

## 🎨 사용 사례

### **UI/UX 디자인**
- **웹 컴포넌트**: 버튼, 카드, 헤더 등을 개별 PNG로 분리
- **아이콘 세트**: 아이콘들을 일괄 저장하여 개발팀에 전달
- **모바일 UI**: 화면별 요소들을 체계적으로 분리

### **게임 개발**
- **캐릭터 파츠**: 머리, 몸통, 팔다리 등 파츠별 분리
- **배경 요소**: 나무, 건물, 장식 등 개별 오브젝트 저장
- **UI 요소**: 버튼, 아이콘, 패널 등 게임 UI 분리

### **마케팅 & 브랜딩**
- **소셜미디어**: 인스타그램, 페이스북용 이미지 세트
- **브랜드 에셋**: 로고 변형, 브랜드 요소들 일괄 저장
- **광고 소재**: 배너 요소들을 개별적으로 분리

### **일러스트 & 아트워크**
- **레이어별 분리**: 배경, 캐릭터, 이펙트 등 레이어별 저장
- **변형 버전**: 다양한 표현 버전들을 개별 파일로 관리
- **포트폴리오**: 작품의 제작 과정을 단계별로 저장

## 🔍 스마트 감지 시스템

PSDGroupSplitter는 문서 구조를 자동으로 분석합니다:

### **감지 로직**
```
✅ 그룹 + 개별 레이어 둘 다 있음 → 그룹만 처리
✅ 그룹만 있음 → 그룹별 폴더 생성
✅ 개별 레이어만 있음 → PSD 파일명 폴더 생성
❌ 아무것도 없음 → "처리할 레이어를 찾을 수 없습니다"
```

### **처리 결과 메시지**
- **그룹 처리**: "처리된 그룹: X개"
- **개별 레이어 처리**: "'파일명' 폴더에 개별 레이어 처리됨"
- **공통**: "내보낸 PNG 파일: Y개"

## ⚠️ 주의사항

### **시스템 요구사항**
- **Adobe Photoshop**: CC 버전 이상 권장
- **운영체제**: Windows, macOS 지원
- **메모리**: 대용량 파일 처리 시 충분한 RAM 필요

### **파일 제한사항**
- **빈 그룹**: 레이어가 없는 그룹은 건너뜀
- **레이어명**: 파일명이 되므로 의미있는 이름 권장
- **특수문자**: 자동으로 안전한 문자로 변환

### **성능 고려사항**
- **대용량 처리**: 많은 레이어 처리 시 시간 소요
- **메모리 사용**: 레이어 개수에 비례하여 메모리 사용량 증가
- **저장 공간**: PNG 파일 크기를 고려하여 충분한 공간 확보

## 🔧 문제 해결

### **스크립트 실행 오류**
```
1️⃣ Photoshop 재시작 후 재시도
2️⃣ 문서가 제대로 열려있는지 확인
3️⃣ 문서에 레이어나 그룹이 있는지 확인
4️⃣ Photoshop 버전이 CC 이상인지 확인
```

### **저장 실패 문제**
```
1️⃣ 저장 폴더 권한 확인 (읽기/쓰기 가능)
2️⃣ 디스크 여유 공간 확인
3️⃣ 레이어명에 특수문자 과다 사용 확인
4️⃣ 바이러스 백신 실시간 검사 일시 중지
```

### **처리 속도 개선**
```
1️⃣ 불필요한 레이어 삭제 후 실행
2️⃣ 문서 해상도 조정 (필요시)
3️⃣ 다른 프로그램 종료로 메모리 확보
4️⃣ SSD 드라이브에 저장
```

## 📈 업데이트 내역

### **Version 1.0.0** (2024년)
- ✨ 그룹 레이어 자동 분리 기능
- 🆕 개별 레이어 처리 지원 (그룹 없어도 동작)
- 🎯 PSD 파일명으로 폴더 자동 생성
- 📐 캔버스/레이어 크기 선택 옵션
- 🛡️ 크로스 플랫폼 파일명 호환성
- 🔧 강화된 에러 처리 및 사용자 피드백

## 🤝 기여하기

### **개선 제안**
- GitHub Issues를 통한 버그 리포트
- 새로운 기능 제안 및 토론
- 코드 개선 Pull Request

### **연락처**
- **작성자**: Rio
- **라이센스**: MIT License
- **GitHub**: [PSDGroupSplitter Repository]

## 📝 라이센스

```
MIT License

Copyright (c) 2024 Rio

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">

**Made with ❤️ by Rio** | **Version 1.0.0** | **2024**

⭐ **이 프로젝트가 도움이 되셨다면 Star를 눌러주세요!** ⭐

</div>
