document.addEventListener('DOMContentLoaded', () => {
    // 메인 콘텐츠를 표시할 영역 선택
    const mainContentDiv = document.getElementById('main-content');
    // 좌측 메뉴의 모든 링크 선택
    const menuLinks = document.querySelectorAll('#left-menu ul li a');

    // 비동기적으로 HTML 콘텐츠를 로드하는 함수
    async function loadContent(url) {
        try {
            const response = await fetch(url); // 지정된 URL에서 데이터 가져오기
            if (!response.ok) { // HTTP 상태 코드가 200번대가 아니면 에러 발생
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const htmlContent = await response.text(); // 응답을 텍스트(HTML)로 변환
            mainContentDiv.innerHTML = htmlContent; // 메인 콘텐츠 영역에 HTML 삽입
        } catch (error) {
            console.error('콘텐츠 로딩 중 오류 발생:', error);
            mainContentDiv.innerHTML = '<p style="color: red;">콘텐츠를 불러오는 데 실패했습니다. 파일 경로를 확인해주세요.</p>';
        }
    }

    // 각 메뉴 링크에 클릭 이벤트 리스너 추가
    menuLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // 링크의 기본 동작(페이지 이동) 방지

            // 클릭된 링크의 data-page 속성 값 (불러올 파일 경로) 가져오기
            const pageToLoad = event.currentTarget.dataset.page;

            if (pageToLoad) {
                loadContent(pageToLoad); // 해당 경로의 콘텐츠 로드 함수 호출
            }
        });
    });

    // 페이지 로드 시 기본적으로 첫 번째 페이지를 로드 (선택 사항)
    // if (menuLinks.length > 0) {
    //     const initialPage = menuLinks[0].dataset.page;
    //     if (initialPage) {
    //         loadContent(initialPage);
    //     }
    // }
});