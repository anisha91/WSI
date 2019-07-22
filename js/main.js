function onLoad (done) {
    getCategoriesData('data.json', function(response) {
        var data = response;
        var productDiv = "<div class='product'>";
        data.groups.forEach((val, key) => {
            productDiv += "<div class='product-inside col-md-4 col-sm-12 col-xs-12'>" +
                "<div class='product-description'>" +
                "<img id="+'image'+key+" src="+val.hero.href+" />" +
                "<h5 class='header'>"+val.name+"</h5>" +
                "<div class='price'>"+val.priceRange.selling.high+"</div>" +
                "</div> </div>";
        });
        productDiv += "</div>";
        document.getElementById("main").innerHTML = productDiv;
        data.groups.forEach((val, key) => {
            document.getElementById('image'+key).addEventListener('click', callBack(val));
        });
        if (done) done();
    });
}

function getCategoriesData(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function setAttributes (el, attrs){
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
};
function closeModal() {
    document.getElementsByClassName("container-inner")[0].style.display = 'none';
    document.getElementsByClassName("backdrop")[0].style.display = 'none';
};
function setIcons(cls, navigation, navigator) {
    if(cls === 'left') {
        return "<a class= 'left carousel-control' href='#myCarousel' data-slide="+navigator+">" +
            "<span class='glyphicon glyphicon-chevron-left'></span>" +
            "<span class='sr-only'>"+navigation+"</span>"+
            "</a>";
    } else {
        return "<a class= 'right carousel-control' href='#myCarousel' data-slide="+navigator+">" +
        "<span class='glyphicon glyphicon-chevron-right'></span>" +
        "<span class='sr-only'>"+navigation+"</span>"+
        "</a>";
    }
}

function callBack(data){
    return function(){
        document.getElementsByClassName("container-inner")[0].style.display = 'block';
        document.getElementsByClassName("backdrop")[0].style.display = 'block';
         document.getElementsByClassName("container-inner")[0].innerHTML = '';
         var carouselElement = document.createElement('div');
         setAttributes(carouselElement, {'id': 'myCarousel', 'class': 'carousel slide', 'data-ride': "carousel"});
        var imagesList = "<div class='carousel-inner'>";
        var slideIndicators = "<ol class='carousel-indicators'>";
        data.images.forEach((val, key) => {
            imagesList += "<div class='item'><img src="+val.href+" style='width:100%';/></div>";
            slideIndicators += "<li class='indicator' data-target='#myCarousel' data-slide-to="+key+"></li>";
        });
        imagesList += "</div>";
        slideIndicators += "</ol>";
        carouselElement.innerHTML += "<button class='close close-btn' data-dismiss='carousel' type='button'" +
            "onclick='closeModal()'>x</button>";
            carouselElement.innerHTML += imagesList;
        carouselElement.innerHTML += slideIndicators;
        var leftIcon = setIcons('left', 'Previous', 'prev');
        var rightIcon = setIcons('right', 'Next', 'next');
        carouselElement.innerHTML += leftIcon;
        carouselElement.innerHTML += rightIcon;
        document.getElementsByClassName("container-inner")[0].appendChild(carouselElement);
        document.getElementsByClassName("item")[0].classList = 'item active';
        document.getElementsByClassName("indicator")[0].classList = 'indicator active';
    }
}
