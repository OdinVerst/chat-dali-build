'use strict';
(function () {
    var urlMsg = 'http://localhost:3000/json/users.json';

    // function timer(block, time) {
    //
    //     var seconds = 0;
    //
    //     var seconds_timer_id = setInterval(function() {
    //         if (seconds < 600) {
    //             seconds ++;
    //             if(seconds> 60){
    //                 block.textContent = Math.floor(seconds/60) + " minutes ago";
    //             }else{
    //                 block.textContent = seconds + " seconds ago";
    //             }
    //         } else {
    //             block.textContent = time;
    //             clearInterval(seconds_timer_id);
    //         }
    //     }, 1000);
    //
    // }

    var msgText = [];
    var templateMsgAnswer = document.querySelector('template').content.querySelector('.msg-block__answer');
    var bodyMsg = document.querySelector('.msg-block__wrap');
    var successHandler = function (data) {
        msgText = data;
        window.checkMsg = function (msg) {
            if(msgText.answer[msg]) {
                var newMsgAnsw = templateMsgAnswer.cloneNode(true);
                newMsgAnsw.querySelector('.msg-block__text').textContent = msgText.answer[msg];
                var date = new Date();
                var time = date.getHours() + ':' + date.getMinutes();
                window.timer(newMsgAnsw.querySelector('.msg-block__time'), time);
                var tempAmswer = JSON.parse(localStorage.getItem('msg'));
                console.log(tempAmswer);
                tempAmswer.text.push(msgText.answer[msg]);
                tempAmswer.date.push(time);
                tempAmswer.answer.push(true);
                localStorage.setItem('msg', JSON.stringify(tempAmswer));

                setTimeout(
                    function () {
                        bodyMsg.appendChild(newMsgAnsw)
                    }, 1000);
            }
        };
    };

    var errorHandler = function (errorMessage) {
        var node = document.createElement('div');
        node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
        node.style.position = 'absolute';
        node.style.left = 0;
        node.style.right = 0;
        node.style.fontSize = '30px';

        node.textContent = errorMessage;
        document.body.insertAdjacentElement('afterbegin', node);
    };

    window.backend.load(urlMsg, successHandler, errorHandler);
})();
'use strict';

(function () {
    var heightWindows = window.innerHeight;
    window.checkHeight = function (data) {
        console.log(heightWindows < data);
        console.log(heightWindows +'|||'+ data);
        if(heightWindows < data){
            window.scrollTo(0,data);
        }
    }
})();
'use strict';

(function () {
    var historyMsg = JSON.parse(localStorage.getItem('msg'));
    var templateMsgHistory = document.querySelector('template').content.querySelector('.msg-block_you');
    var bodyMsg = document.querySelector('.msg-block__wrap');
    var templateMsgHistoryAnswer = document.querySelector('template').content.querySelector('.msg-block__answer');
    var timeLine = document.querySelector('.time__line');
    window.renderOldMsg = function () {
        console.log(historyMsg);
        if(historyMsg){
            if(!historyMsg.text.length){
                var nohistory = document.createElement('div');
                nohistory.style = 'margin: 0 auto; text-align: center;';
                nohistory.style.left = 0;
                nohistory.style.right = 0;
                nohistory.style.color = 'white';
                nohistory.style.fontSize = '30px';
                nohistory.classList.add('his-clear');

                nohistory.textContent = 'History clear';
                bodyMsg.appendChild(nohistory);
            }else{
                timeLine.textContent = timeLine.textContent + historyMsg.date[0];
                timeLine.style.visibility = 'visible';
            }
            historyMsg.answer.forEach(function (item, i) {
                if(item){
                    var currentMsgAnswer = templateMsgHistoryAnswer.cloneNode(true);
                    currentMsgAnswer.querySelector('.msg-block__text').textContent = historyMsg.text[i];
                    currentMsgAnswer.querySelector('.msg-block__time').textContent =  historyMsg.date[i];
                    bodyMsg.appendChild(currentMsgAnswer);
                }else {
                    var currentMsg = templateMsgHistory.cloneNode(true);
                    currentMsg.querySelector('.msg-block__text').textContent = historyMsg.text[i];
                    currentMsg.querySelector('.msg-block__time').textContent = historyMsg.date[i];
                    bodyMsg.appendChild(currentMsg);
                }
            })
        }else {
            var nohistory = document.createElement('div');
            nohistory.style = 'margin: 0 auto; text-align: center;';
            nohistory.style.left = 0;
            nohistory.style.right = 0;
            nohistory.style.fontSize = '30px';
            nohistory.style.color = 'white';
            nohistory.classList.add('his-clear');

            nohistory.textContent = 'History clear';
            bodyMsg.appendChild(nohistory);
        }
    }
})();
'use strict';
(function () {
    if (!localStorage.getItem('auth')) {
        window.location.href = 'http://localhost:3000/';
    } else {
        window.renderOldMsg();
        var height = window.innerHeight + 'px';
        document.querySelector('.mobile__wrap-chat').style.minHeight = height;
        console.log(localStorage.getItem('msg'));
        if (!localStorage.getItem('msg')) {
            var msgVar = {
                "text": [],
                "date": [],
                "answer": []
            };
            localStorage.setItem('msg', JSON.stringify(msgVar));
        }

        // noinspection JSAnnotator

        var templateMsg = document.querySelector('template').content.querySelector('.msg-block_you');
        var msgForm = document.querySelector('.send-msg__form');
        var btnMsg = msgForm.querySelector('.send-msg__btn');
        var bodyMsg = document.querySelector('.msg-block__wrap');
        var msgText = msgForm.querySelector('input[type=text]');
        var indexMsg = 0;
        var histClear = document.querySelector('.his-clear');
        var timeLine = document.querySelector('.time__line');
        var sendMsg = function () {
            if (msgText.value) {
                var newMsg = templateMsg.cloneNode(true);
                newMsg.querySelector('.msg-block__text').textContent = msgText.value;
                var date = new Date();
                var min = date.getMinutes();
                if(min< 10){
                    min = "0"+ min;
                }
                var time = date.getHours() + ':' + min;
                window.timer(newMsg.querySelector('.msg-block__time'), time);
                if(histClear){
                    histClear.style.visibility = 'hidden';
                    timeLine.textContent = timeLine.textContent + time;
                    timeLine.style.visibility = 'visible';
                }
                bodyMsg.appendChild(newMsg);
                var heightChat = document.querySelector('.msg-block__wrap').clientHeight;
                window.checkHeight(heightChat);
                var temp = JSON.parse(localStorage.getItem('msg'));
                temp.text.push(msgText.value);
                temp.date.push(time);
                temp.answer.push(false);
                localStorage.setItem('msg', JSON.stringify(temp));
                window.checkMsg(indexMsg++);
                //localStorage.clear();
                msgText.value = "";
            }
        };
        btnMsg.addEventListener('click', sendMsg);
        msgText.addEventListener('keydown', function (evt) {
            if (evt.keyCode === 13) {
                sendMsg();
            }
        })
    }

})();
'use strict';

(function () {
    var dotterMenuBtn = document.querySelector('.chat__dot-menu');
    dotterMenuBtn.addEventListener('click', function () {
        var dotterMenu= document.querySelector('.dot-menu');
        dotterMenu.classList.toggle('active');
        var clear = document.querySelectorAll('.dot-menu__item')[0];
            clear.addEventListener('click', function () {
            localStorage.removeItem('msg');
            location.reload();

            });
        var logOut = document.querySelectorAll('.dot-menu__item')[1];
        logOut.addEventListener('click', function () {
            localStorage.removeItem('auth');
            location.reload();
        })
    })
})();
'use strict';

(function () {
    window.timer = function(block, time) {

        var seconds = 0;

        var seconds_timer_id = setInterval(function () {
            if (seconds < 600) {
                seconds++;
                if (seconds > 60) {
                    block.textContent = Math.floor(seconds / 60) + " minutes ago";
                } else {
                    block.textContent = seconds + " seconds ago";
                }
            } else {
                block.textContent = time;
                clearInterval(seconds_timer_id);
            }
        }, 1000);

    }
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFuc3dlci5qcyIsImhlaWdodENoYXQuanMiLCJyZW5kZXJNc2cuanMiLCJzZW5kTXNnLmpzIiwic2hvd01lbnUuanMiLCJ0aW1lci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjaGF0X2FsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbihmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHVybE1zZyA9ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvanNvbi91c2Vycy5qc29uJztcblxuICAgIC8vIGZ1bmN0aW9uIHRpbWVyKGJsb2NrLCB0aW1lKSB7XG4gICAgLy9cbiAgICAvLyAgICAgdmFyIHNlY29uZHMgPSAwO1xuICAgIC8vXG4gICAgLy8gICAgIHZhciBzZWNvbmRzX3RpbWVyX2lkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgICAgICBpZiAoc2Vjb25kcyA8IDYwMCkge1xuICAgIC8vICAgICAgICAgICAgIHNlY29uZHMgKys7XG4gICAgLy8gICAgICAgICAgICAgaWYoc2Vjb25kcz4gNjApe1xuICAgIC8vICAgICAgICAgICAgICAgICBibG9jay50ZXh0Q29udGVudCA9IE1hdGguZmxvb3Ioc2Vjb25kcy82MCkgKyBcIiBtaW51dGVzIGFnb1wiO1xuICAgIC8vICAgICAgICAgICAgIH1lbHNle1xuICAgIC8vICAgICAgICAgICAgICAgICBibG9jay50ZXh0Q29udGVudCA9IHNlY29uZHMgKyBcIiBzZWNvbmRzIGFnb1wiO1xuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgICAgICAgYmxvY2sudGV4dENvbnRlbnQgPSB0aW1lO1xuICAgIC8vICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoc2Vjb25kc190aW1lcl9pZCk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0sIDEwMDApO1xuICAgIC8vXG4gICAgLy8gfVxuXG4gICAgdmFyIG1zZ1RleHQgPSBbXTtcbiAgICB2YXIgdGVtcGxhdGVNc2dBbnN3ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0ZW1wbGF0ZScpLmNvbnRlbnQucXVlcnlTZWxlY3RvcignLm1zZy1ibG9ja19fYW5zd2VyJyk7XG4gICAgdmFyIGJvZHlNc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXNnLWJsb2NrX193cmFwJyk7XG4gICAgdmFyIHN1Y2Nlc3NIYW5kbGVyID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgbXNnVGV4dCA9IGRhdGE7XG4gICAgICAgIHdpbmRvdy5jaGVja01zZyA9IGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgICAgIGlmKG1zZ1RleHQuYW5zd2VyW21zZ10pIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3TXNnQW5zdyA9IHRlbXBsYXRlTXNnQW5zd2VyLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgICAgICAgICBuZXdNc2dBbnN3LnF1ZXJ5U2VsZWN0b3IoJy5tc2ctYmxvY2tfX3RleHQnKS50ZXh0Q29udGVudCA9IG1zZ1RleHQuYW5zd2VyW21zZ107XG4gICAgICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgIHZhciB0aW1lID0gZGF0ZS5nZXRIb3VycygpICsgJzonICsgZGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgICAgICAgICAgICAgd2luZG93LnRpbWVyKG5ld01zZ0Fuc3cucXVlcnlTZWxlY3RvcignLm1zZy1ibG9ja19fdGltZScpLCB0aW1lKTtcbiAgICAgICAgICAgICAgICB2YXIgdGVtcEFtc3dlciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ21zZycpKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0ZW1wQW1zd2VyKTtcbiAgICAgICAgICAgICAgICB0ZW1wQW1zd2VyLnRleHQucHVzaChtc2dUZXh0LmFuc3dlclttc2ddKTtcbiAgICAgICAgICAgICAgICB0ZW1wQW1zd2VyLmRhdGUucHVzaCh0aW1lKTtcbiAgICAgICAgICAgICAgICB0ZW1wQW1zd2VyLmFuc3dlci5wdXNoKHRydWUpO1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdtc2cnLCBKU09OLnN0cmluZ2lmeSh0ZW1wQW1zd2VyKSk7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5TXNnLmFwcGVuZENoaWxkKG5ld01zZ0Fuc3cpXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgZXJyb3JIYW5kbGVyID0gZnVuY3Rpb24gKGVycm9yTWVzc2FnZSkge1xuICAgICAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBub2RlLnN0eWxlID0gJ3otaW5kZXg6IDEwMDsgbWFyZ2luOiAwIGF1dG87IHRleHQtYWxpZ246IGNlbnRlcjsgYmFja2dyb3VuZC1jb2xvcjogcmVkOyc7XG4gICAgICAgIG5vZGUuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICBub2RlLnN0eWxlLmxlZnQgPSAwO1xuICAgICAgICBub2RlLnN0eWxlLnJpZ2h0ID0gMDtcbiAgICAgICAgbm9kZS5zdHlsZS5mb250U2l6ZSA9ICczMHB4JztcblxuICAgICAgICBub2RlLnRleHRDb250ZW50ID0gZXJyb3JNZXNzYWdlO1xuICAgICAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJiZWdpbicsIG5vZGUpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYmFja2VuZC5sb2FkKHVybE1zZywgc3VjY2Vzc0hhbmRsZXIsIGVycm9ySGFuZGxlcik7XG59KSgpOyIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaGVpZ2h0V2luZG93cyA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICB3aW5kb3cuY2hlY2tIZWlnaHQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhoZWlnaHRXaW5kb3dzIDwgZGF0YSk7XG4gICAgICAgIGNvbnNvbGUubG9nKGhlaWdodFdpbmRvd3MgKyd8fHwnKyBkYXRhKTtcbiAgICAgICAgaWYoaGVpZ2h0V2luZG93cyA8IGRhdGEpe1xuICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG59KSgpOyIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaGlzdG9yeU1zZyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ21zZycpKTtcbiAgICB2YXIgdGVtcGxhdGVNc2dIaXN0b3J5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndGVtcGxhdGUnKS5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoJy5tc2ctYmxvY2tfeW91Jyk7XG4gICAgdmFyIGJvZHlNc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubXNnLWJsb2NrX193cmFwJyk7XG4gICAgdmFyIHRlbXBsYXRlTXNnSGlzdG9yeUFuc3dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3RlbXBsYXRlJykuY29udGVudC5xdWVyeVNlbGVjdG9yKCcubXNnLWJsb2NrX19hbnN3ZXInKTtcbiAgICB2YXIgdGltZUxpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGltZV9fbGluZScpO1xuICAgIHdpbmRvdy5yZW5kZXJPbGRNc2cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGhpc3RvcnlNc2cpO1xuICAgICAgICBpZihoaXN0b3J5TXNnKXtcbiAgICAgICAgICAgIGlmKCFoaXN0b3J5TXNnLnRleHQubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICB2YXIgbm9oaXN0b3J5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgbm9oaXN0b3J5LnN0eWxlID0gJ21hcmdpbjogMCBhdXRvOyB0ZXh0LWFsaWduOiBjZW50ZXI7JztcbiAgICAgICAgICAgICAgICBub2hpc3Rvcnkuc3R5bGUubGVmdCA9IDA7XG4gICAgICAgICAgICAgICAgbm9oaXN0b3J5LnN0eWxlLnJpZ2h0ID0gMDtcbiAgICAgICAgICAgICAgICBub2hpc3Rvcnkuc3R5bGUuY29sb3IgPSAnd2hpdGUnO1xuICAgICAgICAgICAgICAgIG5vaGlzdG9yeS5zdHlsZS5mb250U2l6ZSA9ICczMHB4JztcbiAgICAgICAgICAgICAgICBub2hpc3RvcnkuY2xhc3NMaXN0LmFkZCgnaGlzLWNsZWFyJyk7XG5cbiAgICAgICAgICAgICAgICBub2hpc3RvcnkudGV4dENvbnRlbnQgPSAnSGlzdG9yeSBjbGVhcic7XG4gICAgICAgICAgICAgICAgYm9keU1zZy5hcHBlbmRDaGlsZChub2hpc3RvcnkpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGltZUxpbmUudGV4dENvbnRlbnQgPSB0aW1lTGluZS50ZXh0Q29udGVudCArIGhpc3RvcnlNc2cuZGF0ZVswXTtcbiAgICAgICAgICAgICAgICB0aW1lTGluZS5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaGlzdG9yeU1zZy5hbnN3ZXIuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaSkge1xuICAgICAgICAgICAgICAgIGlmKGl0ZW0pe1xuICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudE1zZ0Fuc3dlciA9IHRlbXBsYXRlTXNnSGlzdG9yeUFuc3dlci5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRNc2dBbnN3ZXIucXVlcnlTZWxlY3RvcignLm1zZy1ibG9ja19fdGV4dCcpLnRleHRDb250ZW50ID0gaGlzdG9yeU1zZy50ZXh0W2ldO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50TXNnQW5zd2VyLnF1ZXJ5U2VsZWN0b3IoJy5tc2ctYmxvY2tfX3RpbWUnKS50ZXh0Q29udGVudCA9ICBoaXN0b3J5TXNnLmRhdGVbaV07XG4gICAgICAgICAgICAgICAgICAgIGJvZHlNc2cuYXBwZW5kQ2hpbGQoY3VycmVudE1zZ0Fuc3dlcik7XG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmVudE1zZyA9IHRlbXBsYXRlTXNnSGlzdG9yeS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRNc2cucXVlcnlTZWxlY3RvcignLm1zZy1ibG9ja19fdGV4dCcpLnRleHRDb250ZW50ID0gaGlzdG9yeU1zZy50ZXh0W2ldO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50TXNnLnF1ZXJ5U2VsZWN0b3IoJy5tc2ctYmxvY2tfX3RpbWUnKS50ZXh0Q29udGVudCA9IGhpc3RvcnlNc2cuZGF0ZVtpXTtcbiAgICAgICAgICAgICAgICAgICAgYm9keU1zZy5hcHBlbmRDaGlsZChjdXJyZW50TXNnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICB2YXIgbm9oaXN0b3J5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBub2hpc3Rvcnkuc3R5bGUgPSAnbWFyZ2luOiAwIGF1dG87IHRleHQtYWxpZ246IGNlbnRlcjsnO1xuICAgICAgICAgICAgbm9oaXN0b3J5LnN0eWxlLmxlZnQgPSAwO1xuICAgICAgICAgICAgbm9oaXN0b3J5LnN0eWxlLnJpZ2h0ID0gMDtcbiAgICAgICAgICAgIG5vaGlzdG9yeS5zdHlsZS5mb250U2l6ZSA9ICczMHB4JztcbiAgICAgICAgICAgIG5vaGlzdG9yeS5zdHlsZS5jb2xvciA9ICd3aGl0ZSc7XG4gICAgICAgICAgICBub2hpc3RvcnkuY2xhc3NMaXN0LmFkZCgnaGlzLWNsZWFyJyk7XG5cbiAgICAgICAgICAgIG5vaGlzdG9yeS50ZXh0Q29udGVudCA9ICdIaXN0b3J5IGNsZWFyJztcbiAgICAgICAgICAgIGJvZHlNc2cuYXBwZW5kQ2hpbGQobm9oaXN0b3J5KTtcbiAgICAgICAgfVxuICAgIH1cbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xuKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhdXRoJykpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnaHR0cDovL2xvY2FsaG9zdDozMDAwLyc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LnJlbmRlck9sZE1zZygpO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vYmlsZV9fd3JhcC1jaGF0Jykuc3R5bGUubWluSGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICBjb25zb2xlLmxvZyhsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbXNnJykpO1xuICAgICAgICBpZiAoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKCdtc2cnKSkge1xuICAgICAgICAgICAgdmFyIG1zZ1ZhciA9IHtcbiAgICAgICAgICAgICAgICBcInRleHRcIjogW10sXG4gICAgICAgICAgICAgICAgXCJkYXRlXCI6IFtdLFxuICAgICAgICAgICAgICAgIFwiYW5zd2VyXCI6IFtdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ21zZycsIEpTT04uc3RyaW5naWZ5KG1zZ1ZhcikpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm9pbnNwZWN0aW9uIEpTQW5ub3RhdG9yXG5cbiAgICAgICAgdmFyIHRlbXBsYXRlTXNnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndGVtcGxhdGUnKS5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoJy5tc2ctYmxvY2tfeW91Jyk7XG4gICAgICAgIHZhciBtc2dGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbmQtbXNnX19mb3JtJyk7XG4gICAgICAgIHZhciBidG5Nc2cgPSBtc2dGb3JtLnF1ZXJ5U2VsZWN0b3IoJy5zZW5kLW1zZ19fYnRuJyk7XG4gICAgICAgIHZhciBib2R5TXNnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1zZy1ibG9ja19fd3JhcCcpO1xuICAgICAgICB2YXIgbXNnVGV4dCA9IG1zZ0Zvcm0ucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT10ZXh0XScpO1xuICAgICAgICB2YXIgaW5kZXhNc2cgPSAwO1xuICAgICAgICB2YXIgaGlzdENsZWFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhpcy1jbGVhcicpO1xuICAgICAgICB2YXIgdGltZUxpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGltZV9fbGluZScpO1xuICAgICAgICB2YXIgc2VuZE1zZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChtc2dUZXh0LnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld01zZyA9IHRlbXBsYXRlTXNnLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgICAgICAgICBuZXdNc2cucXVlcnlTZWxlY3RvcignLm1zZy1ibG9ja19fdGV4dCcpLnRleHRDb250ZW50ID0gbXNnVGV4dC52YWx1ZTtcbiAgICAgICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgdmFyIG1pbiA9IGRhdGUuZ2V0TWludXRlcygpO1xuICAgICAgICAgICAgICAgIGlmKG1pbjwgMTApe1xuICAgICAgICAgICAgICAgICAgICBtaW4gPSBcIjBcIisgbWluO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdGltZSA9IGRhdGUuZ2V0SG91cnMoKSArICc6JyArIG1pbjtcbiAgICAgICAgICAgICAgICB3aW5kb3cudGltZXIobmV3TXNnLnF1ZXJ5U2VsZWN0b3IoJy5tc2ctYmxvY2tfX3RpbWUnKSwgdGltZSk7XG4gICAgICAgICAgICAgICAgaWYoaGlzdENsZWFyKXtcbiAgICAgICAgICAgICAgICAgICAgaGlzdENsZWFyLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgICAgICAgICAgICAgdGltZUxpbmUudGV4dENvbnRlbnQgPSB0aW1lTGluZS50ZXh0Q29udGVudCArIHRpbWU7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVMaW5lLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJvZHlNc2cuYXBwZW5kQ2hpbGQobmV3TXNnKTtcbiAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0Q2hhdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tc2ctYmxvY2tfX3dyYXAnKS5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgd2luZG93LmNoZWNrSGVpZ2h0KGhlaWdodENoYXQpO1xuICAgICAgICAgICAgICAgIHZhciB0ZW1wID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbXNnJykpO1xuICAgICAgICAgICAgICAgIHRlbXAudGV4dC5wdXNoKG1zZ1RleHQudmFsdWUpO1xuICAgICAgICAgICAgICAgIHRlbXAuZGF0ZS5wdXNoKHRpbWUpO1xuICAgICAgICAgICAgICAgIHRlbXAuYW5zd2VyLnB1c2goZmFsc2UpO1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdtc2cnLCBKU09OLnN0cmluZ2lmeSh0ZW1wKSk7XG4gICAgICAgICAgICAgICAgd2luZG93LmNoZWNrTXNnKGluZGV4TXNnKyspO1xuICAgICAgICAgICAgICAgIC8vbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgbXNnVGV4dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGJ0bk1zZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbmRNc2cpO1xuICAgICAgICBtc2dUZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgICAgICBpZiAoZXZ0LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgICAgICAgc2VuZE1zZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxufSkoKTsiLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGRvdHRlck1lbnVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2hhdF9fZG90LW1lbnUnKTtcbiAgICBkb3R0ZXJNZW51QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZG90dGVyTWVudT0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRvdC1tZW51Jyk7XG4gICAgICAgIGRvdHRlck1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgIHZhciBjbGVhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kb3QtbWVudV9faXRlbScpWzBdO1xuICAgICAgICAgICAgY2xlYXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnbXNnJyk7XG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIHZhciBsb2dPdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZG90LW1lbnVfX2l0ZW0nKVsxXTtcbiAgICAgICAgbG9nT3V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2F1dGgnKTtcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICB9KVxuICAgIH0pXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcbiAgICB3aW5kb3cudGltZXIgPSBmdW5jdGlvbihibG9jaywgdGltZSkge1xuXG4gICAgICAgIHZhciBzZWNvbmRzID0gMDtcblxuICAgICAgICB2YXIgc2Vjb25kc190aW1lcl9pZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzZWNvbmRzIDwgNjAwKSB7XG4gICAgICAgICAgICAgICAgc2Vjb25kcysrO1xuICAgICAgICAgICAgICAgIGlmIChzZWNvbmRzID4gNjApIHtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2sudGV4dENvbnRlbnQgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA2MCkgKyBcIiBtaW51dGVzIGFnb1wiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrLnRleHRDb250ZW50ID0gc2Vjb25kcyArIFwiIHNlY29uZHMgYWdvXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBibG9jay50ZXh0Q29udGVudCA9IHRpbWU7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChzZWNvbmRzX3RpbWVyX2lkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMCk7XG5cbiAgICB9XG59KSgpOyJdfQ==
