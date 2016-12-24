function gebc(className) {
    var arr = [];
    var elements = document.getElementsByClassName(className);
    for (var i = elements.length; i--; arr.unshift(elements[i]))
        ;
    return arr;
}

function classOp(elements, className, add) {
    for (var i = 0; i < elements.length; i++) {
        var str = elements[i].getAttribute("class");
        if (add) {
            str += " " + className;
        } else {
            str = str.slice(0, str.search(" " + className));
        }
        elements[i].setAttribute("class", str);
    }
}

function otherAlt(page) {
    var title = gebc("section active")[0].children[0].textContent;
    gebc("header")[0].children[1].textContent = title;
    document.title = title + " -- Robotique SHS 2013";
    classOp(gebc("link active"), "active", false);
    classOp(gebc("link " + page), "active", true);
}

function display(hide) {
    if (hide) {
        var active = gebc("section active");
        active[0].style.opacity = 0;
        setTimeout(function() {
            classOp(active, "active", false);
        }, 500);
    } else {
        var page = location.hash.slice(1);
        if (page == "")
            page = "home";
        var active = gebc("section " + page);
        classOp(active, "active", true);
        otherAlt(page);
        setTimeout(function() {
            active[0].style.opacity = 1;
        }, 10);
    }
}

var seq = [];
function animate() {
    var tiles = gebc("tiles")[0];
    tiles.style.backgroundColor = "gray";
    tiles.style.zIndex = 4;
    var i = 0;
    var t = setInterval(function() {
        classOp(seq[i], "flip", true);
        i++;
        if (i >= seq.length)
            clearInterval(t);
    }, 100);
    setTimeout(function() {
        var tiles = gebc("tiles")[0];
        tiles.style.backgroundColor = "";
        tiles.style.zIndex = 0;
        classOp(gebc("flip"), "flip", false);
        display(false);
    }, 1100);
}

var toggle = false;
function transition() {
    display(true);
    if (toggle)
        setTimeout(animate, 400);
    else
        setTimeout(function() {
            display(false);
        }, 500);
}

function cache() {
    var i = 0;
    while (i >= 0) {
        seq[i] = gebc("a" + i);
        i++;
        if (gebc("a" + i).length == 0)
            i = -1;
    }
}

function animToggle() {
    if (!toggle) {
        toggle = true;
        this.textContent = "désactiver l'animation";
    } else {
        toggle = false;
        this.textContent = "activer l'animation";
    }
}

function members() {
    var temp = gebc("member");
    for (var i = 0; i < temp.length; i++) {
        temp[i].addEventListener("click", function() {
            var quote = this.nextSibling;
            while (quote && quote.nodeType != 1)
                quote = quote.nextSibling;
            if (quote.style.display == "none" || quote.style.display == "") {
                quote.style.display = "block";
            } else
                quote.style.display = "none";
        });
    }
}

if (document.addEventListener) {

    document.addEventListener("DOMContentLoaded", function() {
        if ((document.body.style.webkitTransition === "" || document.body.style.transition === "") && window.innerWidth > 768) {
            var temp = gebc("toggle")[0];
            cache();
            toggle = true;
            temp.style.display = "block";
            temp.addEventListener("click", animToggle);
            gebc("tiles")[0].style.display = "block";
        }
        window.addEventListener("hashchange", transition);
        display(false);
        members();
    });

} else {
    window.onload = function() {
        classOp(document.querySelectorAll(".section"), "compat", true);
        document.body.children[0].style.filter = "alpha(opacity=0)";
    };
}