'use strict';
(function () {
    var userList = [];
    var url = '/chat-dali-build/json/users.json';
    var successHandler = function (data) {
        userList = data;
        console.log(userList);
        var sendFormSub = document.querySelector('.auth__form');
        sendFormSub.addEventListener('submit', function (evt) {
            evt.preventDefault();
            var getData = document.querySelectorAll('.auth__input-text');
            console.log(getData);
            var emailserv = userList.usermail;
            var passserv = userList.passwordjson;
            console.log(getData[0].value);
            emailserv.forEach(function (item, i) {
                if(item === getData[0].value){
                    if(getData[1].value === passserv[i]){
                        window.location.href = '/chat-dali-build/chat';
                        localStorage.setItem('auth', true);
                    }
                }else {
                    var node2 = document.createElement('div');
                    node2.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
                    node2.style.position = 'absolute';
                    node2.style.left = 0;
                    node2.style.right = 0;
                    node2.style.fontSize = '30px';

                    node2.textContent = 'Auth Fail!';
                    document.body.insertAdjacentElement('afterbegin', node2);
                }
            })
        })
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

    window.backend.load(url, successHandler, errorHandler);
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoZWtVc2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXV0aF9hbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG4oZnVuY3Rpb24gKCkge1xuICAgIHZhciB1c2VyTGlzdCA9IFtdO1xuICAgIHZhciB1cmwgPSAnaHR0cDovL2xvY2FsaG9zdDozMDAwL2pzb24vdXNlcnMuanNvbic7XG4gICAgdmFyIHN1Y2Nlc3NIYW5kbGVyID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdXNlckxpc3QgPSBkYXRhO1xuICAgICAgICBjb25zb2xlLmxvZyh1c2VyTGlzdCk7XG4gICAgICAgIHZhciBzZW5kRm9ybVN1YiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdXRoX19mb3JtJyk7XG4gICAgICAgIHNlbmRGb3JtU3ViLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIGdldERhdGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYXV0aF9faW5wdXQtdGV4dCcpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZ2V0RGF0YSk7XG4gICAgICAgICAgICB2YXIgZW1haWxzZXJ2ID0gdXNlckxpc3QudXNlcm1haWw7XG4gICAgICAgICAgICB2YXIgcGFzc3NlcnYgPSB1c2VyTGlzdC5wYXNzd29yZGpzb247XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhnZXREYXRhWzBdLnZhbHVlKTtcbiAgICAgICAgICAgIGVtYWlsc2Vydi5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpKSB7XG4gICAgICAgICAgICAgICAgaWYoaXRlbSA9PT0gZ2V0RGF0YVswXS52YWx1ZSl7XG4gICAgICAgICAgICAgICAgICAgIGlmKGdldERhdGFbMV0udmFsdWUgPT09IHBhc3NzZXJ2W2ldKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9jaGF0JztcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhdXRoJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBub2RlMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICBub2RlMi5zdHlsZSA9ICd6LWluZGV4OiAxMDA7IG1hcmdpbjogMCBhdXRvOyB0ZXh0LWFsaWduOiBjZW50ZXI7IGJhY2tncm91bmQtY29sb3I6IHJlZDsnO1xuICAgICAgICAgICAgICAgICAgICBub2RlMi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUyLnN0eWxlLmxlZnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICBub2RlMi5zdHlsZS5yaWdodCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUyLnN0eWxlLmZvbnRTaXplID0gJzMwcHgnO1xuXG4gICAgICAgICAgICAgICAgICAgIG5vZGUyLnRleHRDb250ZW50ID0gJ0F1dGggRmFpbCEnO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJiZWdpbicsIG5vZGUyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH07XG5cbiAgICB2YXIgZXJyb3JIYW5kbGVyID0gZnVuY3Rpb24gKGVycm9yTWVzc2FnZSkge1xuICAgICAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBub2RlLnN0eWxlID0gJ3otaW5kZXg6IDEwMDsgbWFyZ2luOiAwIGF1dG87IHRleHQtYWxpZ246IGNlbnRlcjsgYmFja2dyb3VuZC1jb2xvcjogcmVkOyc7XG4gICAgICAgIG5vZGUuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICBub2RlLnN0eWxlLmxlZnQgPSAwO1xuICAgICAgICBub2RlLnN0eWxlLnJpZ2h0ID0gMDtcbiAgICAgICAgbm9kZS5zdHlsZS5mb250U2l6ZSA9ICczMHB4JztcblxuICAgICAgICBub2RlLnRleHRDb250ZW50ID0gZXJyb3JNZXNzYWdlO1xuICAgICAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJiZWdpbicsIG5vZGUpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYmFja2VuZC5sb2FkKHVybCwgc3VjY2Vzc0hhbmRsZXIsIGVycm9ySGFuZGxlcik7XG59KSgpOyJdfQ==
