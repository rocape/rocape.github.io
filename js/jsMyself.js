window.onload = function(ev){
    var together = new Date();
    together.setFullYear(2016, 8, 20);
    together.setHours(20);
    together.setMinutes(0);
    together.setSeconds(0);
    together.setMilliseconds(0);

    timeElapse(together);

    var total_img = 611;
    var now_img = 61;
    imgLocation("main", "pin");

    window.onscroll = function () {
      if (checkScrollside(now_img)){
          var oParent = document.getElementById('main');
          for (; now_img < total_img; now_img++){
              var oPin = document.createElement('div');
              oPin.className = 'pin';
              oParent.appendChild(oPin);
              var oBox = document.createElement('div');
              oBox.className = 'box';
              oPin.appendChild(oBox);
              var oImg = document.createElement('img');
              oImg.src = './images/' + now_img + '.jpg';
              oImg.className = 'box_img';
              oBox.appendChild(oImg);
          }
          imgLocation("main", "pin");
      }
    };
};

// function Changetime(date) {
//     var h3= document.getElementsByTagName("h3")[0];
//     h3.innerHTML = timeElapse(date);
// }

function timeElapse(date){
    var current = Date();
    var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
    var days = Math.floor(seconds / (3600 * 24));
    seconds = seconds % (3600 * 24);
    var hours = Math.floor(seconds / 3600);
    if (hours < 10) {
        hours = "0" + hours;
    }
    seconds = seconds % 3600;
    var minutes = Math.floor(seconds / 60);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    seconds = seconds % 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    result ='我们在一起的第'+ days + '天';
    var h3= document.getElementsByTagName("h3")[0];
    h3.innerHTML = result;
}
function checkScrollside(now_img) {
    var oParent = document.getElementById('main');
    var aPin = getChildElement(oParent, "pin");
    var lastPin = aPin[aPin.length - 1].offsetTop + Math.floor(aPin[aPin.length - 1].offsetHeight / 2);
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var documentH = document.documentElement.clientHeight;
    if ((lastPin < scrollTop + documentH)&(now_img > 611)){
        return false
    }else {
        return true;
    }
}

function imgLocation(parent, content) {
    //将Parent中的内容全部取出
    var ParentContent = document.getElementById(parent);
    var ChildContent = getChildElement(ParentContent, content);
    var imgWeight = ChildContent[0].offsetWidth;
    var NumEachRow = Math.floor(document.documentElement.clientWidth / imgWeight);
    ParentContent.style.cssText = "width:" + imgWeight*NumEachRow + "px;margin:0 auto";

    var BoxHeightArr = [];
    for (var i=0; i<ChildContent.length; i++){
        if(i < NumEachRow){
            BoxHeightArr[i] = ChildContent[i].offsetHeight;
        } else {
            var minHeight = Math.min.apply(null, BoxHeightArr);
            var minIndex = getMinHeightImg(BoxHeightArr, minHeight);
            ChildContent[i].style.position = "absolute";
            ChildContent[i].style.top = minHeight + "px";

            ChildContent[i].style.left = ChildContent[minIndex].offsetLeft + "px";
            BoxHeightArr[minIndex] = BoxHeightArr[minIndex] + ChildContent[i].offsetHeight;
        }
    }

}

function getMinHeightImg(BoxHeightArr, minHeight) {
    for (var i=0; i<BoxHeightArr.length; i++){
        if (BoxHeightArr[i] == minHeight){
            return i;
        }
    }
}

function getChildElement(parent, content) {
    var contentArr = [];
    var allContent = parent.getElementsByTagName("*");
    for (var i=0; i< allContent.length; i++){
        if (allContent[i].className == content){
            contentArr.push(allContent[i]);
        }
    }
    return contentArr;
}