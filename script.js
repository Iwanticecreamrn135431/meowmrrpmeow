
window.onload = function() {
    getMeal();
};

function getMeal() {
    const date = getCurrentDate(); // íì¬ ë ì§ ê°ì ¸ì¤ê¸°
    const apiUrl = `https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7530051&MLSV_YMD=${date}&Type=json`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const mealInfo = data['mealServiceDietInfo'][1]['row'][0]['DDISH_NM'];
            const mealList = mealInfo.split('<br/>');
            let mealHTML = '<h2>ê¸ì ì ë³´</h2>';
            mealHTML += '<ul>';
            mealList.forEach(meal => {
                mealHTML += `<li>${meal}</li>`;
            });
            mealHTML += '</ul>';
            document.getElementById('mealInfo').innerHTML = mealHTML;
        })
        .catch(error => {
            console.error('Error fetching meal data:', error);
            document.getElementById('mealInfo').innerHTML = '<p>ê¸ì ì ë³´ë¥¼ ê°ì ¸ì¤ë ì¤ ì¤ë¥ê° ë°ìíìµëë¤.</p>';
        });
}

function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // ìê³¼ ì¼ì´ í ìë¦¬ ìì¸ ê²½ì° ìì 0ì ì¶ê°
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return `${year}${month}${day}`;
}
