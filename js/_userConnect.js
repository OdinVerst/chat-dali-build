'use strict';
(function () {
    //var URL_SEND = 'http://localhost:3000/json/users.json';
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    window.backend = {
        load: function (url, onSuccess, onError) {
            xhr.addEventListener('load', function () {
                if (xhr.status === 200) {
                    onSuccess(xhr.response);
                } else {
                    onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
                }

            });
            xhr.open('GET', url, true);
            xhr.send();
        }
        //TODO: не доделано коректно отправка на сервер
        // save: function (data) {
        //     xhr.open('POST', URL_SEND, true);
        //     xhr.send(data);
        // }
    };


})();