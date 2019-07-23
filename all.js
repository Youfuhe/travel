let data = [];
const xhr = new XMLHttpRequest();
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true)
xhr.send(null);
xhr.onload = function () {
    data = JSON.parse(xhr.responseText);
    data = data.result.records;
};

//選擇事件監聽
const selectPart = $(".selectForm")
for (let i = 0; i < selectPart.length; i++) {
    selectPart[i].addEventListener('change', selectClick)
};
//熱門行政區事件監聽
const hot = $('.wrap a li');
for (let i = 0; i < hot.length; i++) {
    hot[i].addEventListener('click', hotClick);
};

//點擊熱門事件
function hotClick(event) {
    event.preventDefault();
    let name = this.innerHTML; //點選的行政名稱
    let filterData = []; //將有關此行政區塊的JSON存入
    // console.log(name);
    for (let j = 0; j < data.length; j++) {
        if (name == data[j].Zone) {
            filterData.push(data[j]);
        }
    }
    // console.log(filterData);

    showData(filterData.slice(0, 8)); //只顯示前8筆資料
    page(filterData);

    //頁碼點擊事件
    for (let i = 0; i < $('.page-link').length; i++) {
        $('.page-link')[i].addEventListener('click', pageClick);
    }
    function pageClick() {
        let pageData = [];
        if (this.innerHTML == 1) {
            // console.log(filterData);
            pageData = filterData.slice(0, 8);
            showData(pageData);
        } else if (this.innerHTML == 2) {
            pageData = filterData.slice(8, 16);
            showData(pageData);
        }
    }
}    


//點擊選擇事件
function selectClick(e) {
    // console.log(e.target.value);
    let name = e.target.value; //選擇的行政名稱
    let filterData = []; //將有關此行政區塊的JSON存入
    for (let j = 0; j < data.length; j++) {
        if (name == data[j].Zone) {
            filterData.push(data[j]);
        }
    }
    if (filterData == false) { //若行政區沒有旅遊資訊
        str = '';
        $('#about .title h1').html(name);
        $('#about .wrap').html(str);
    } else {
        showData(filterData.slice(0, 8));
    }
    page(filterData);

    //頁碼點擊事件
    for (let i = 0; i < $('.page-link').length; i++) {
        $('.page-link')[i].addEventListener('click', pageClick);
    }
    function pageClick() {
        let pageData = [];
        if (this.innerHTML == 1) {
            // console.log(filterData);
            pageData = filterData.slice(0, 8);
            showData(pageData);
        } else if (this.innerHTML == 2) {
            pageData = filterData.slice(8, 16);
            showData(pageData);
        }
    }

};



//回頂部
function gotop() {
    $(".goTop").click(function () {
        $("html,body").animate({
            scrollTop: 0
        }, 1000);
    });
}

//在html上增加要讀取的資料和html程式碼
function showData(datas) {
    let str = '';
    for (let i = 0; i < datas.length; i++) {
        str += 
        `<div class="item">
            <div class="backroungImg">
                <img src=${datas[i].Picture1}>
                <h1 class="name">${datas[i].Name}</h1>
                <p class="zone">${datas[i].Zone}</p>
            </div>
            <div class="content">
                <p class="opentime ">
                    <img src="assets/icons_clock.png" alt="">${datas[i].Opentime}
                </p>
                <p class="add ">
                    <img src="assets/icons_pin.png" alt="">${datas[i].Add} 
                </p>
                <p class="tel ">
                    <img src="assets/icons_phone.png" alt="">&nbsp${datas[i].Tel} 
                </p>
                <p class="ticketinfo ">
                    <img src="assets/icons_tag.png" alt="">${datas[i].Ticketinfo} </p>
            </div>
        </div>`
    };
    str += `<a class="goTop"></a>`;
    $('#about .title h1').html(datas[0].Zone);
    $('#about .wrap').html(str);
    gotop();
};

//頁碼
function page(datas) {
    let str = '';
    if (datas.length <= 8) {
        str = 
        `<ul class="pagination">
            <li class="page-item">
                <a class="page-link" href="#">Previous</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#">Next</a>
            </li>
        </ul>`;
    } else if (8 < datas.length || datas.length < 16) {
        str = 
        `<ul class="pagination">
            <li class="page-item">
                <a class="page-link" href="#">Previous</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#">Next</a>
            </li>
        </ul>`;
    }
    $('#page').html(str);
    // console.log($('.page-link').length);

}




