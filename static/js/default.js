Array.prototype.isEqualTo = function(array) {
    if (!array) return false;

    if (this.length != array.length) return false;

    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i] != array[i]) {
            return false;
        }
    }
    return true;
};


var pattern = (function() {
    var cache = [];
    var lockpattern = [];
    var state = false;
    var saved = false;
    var loginbtn = document.getElementById('login');
    var savebtn = document.getElementById('save');
    var resetColor = function() {
        var cells = document.getElementsByTagName('td');
        for (var i = 0; i < cells.length; i++) {
            cells[i].removeAttribute("style");
        }
    };
    savebtn.onclick = function() {
        if (!saved) {
            save();
            saved = true;
            savebtn.setAttribute('disabled');
            resetColor();
        }
    };
    loginbtn.onclick = function() {
        if (state) {
            if (cache.isEqualTo(lockpattern)) {
                cache = [];
                state = false;
                alert("Unlocked");
                console.log("Unlocked");
                loginbtn.setAttribute('disabled');
                resetColor();
            } else {
                cache = [];
                alert("Wrong Pattern Try Again!");
                console.log("Wrong Pattern Try Again!");
                resetColor();
            }
        }
    };
    var save = function() {
        if (cache.length < 4) {
            cache = [];
            alert("Connect atleast 4 dots. Try again!");
            console.log("Connect atleast 4 dots. Try again!");
            return;
        }
        lockpattern = cache;
        cache = [];
        resetColor();
        state = true;
        loginbtn.removeAttribute('disabled');
        console.log("Locked");
        alert("Locked");

    };
    var searchElement = function(n) {
        for (var i = 0, len = cache.length; i < len; i++) {
            if (n === cache[i]) return false;
        }
        return true;
    };
    return {
        insert: function(element) {
            if (searchElement(element.id)) {
                element.setAttribute("style", "color:green");
                cache.push(element.id);
                console.log(cache);

                if (saved && !state) {
                    if (cache.isEqualTo(lockpattern)) {
                        cache = [];
                        console.log("Locked");
                        alert("Locked");
                        state = true;
                        resetColor();
                        loginbtn.removeAttribute('disabled');
                    } else if (cache.length === lockpattern.length) {
                        cache = [];
                        resetColor();
                        console.log("Wrong Pattern Try Again to Lock!");
                        alert("Wrong Pattern Try Again to Lock!");
                    }
                }
            }
        },
        reset: function() {
            cache = [];
            resetColor();
            console.log(cache);
        }
    };
})();


var cells = document.getElementsByTagName('td');
var resetbtn = document.getElementById('reset');

var fn = function() {
    pattern.insert(this);
};
for (var i = 0; i < cells.length; i++) {
    cells[i].onclick = fn;
}

resetbtn.onclick = function() {
    pattern.reset();
};