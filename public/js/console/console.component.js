(function() {
    'use strict'

    angular.module('app').component('console', {
        require: {
            layout: '^app'
        },
        templateUrl: '/js/console/console.template.html',
        controller: controller
    })

    controller.$inject = ['$http', '$stateParams', '$state', 'service']
    function controller($http, $stateParams, $state, service) {
        this.$onInit = () => {
            this.response = undefined;
            this.hayden = 'hayden';
            console.log('initttt');
        }
        this.displayed = true;

        this.togglePost = () => {
            this.displayed = !this.displayed;
        };
        this.uploadFile = () => {

            this.togglePost()
            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            const file = document.getElementById('file').files[0];
            formData.append('file', file);
            xhr.open('POST', '/api/store');
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        handleResponse(xhr.response);
                    }
                }
            };

            xhr.send(formData);
            return false;
        };

        this.submitFile = () => {
            this.togglePost()
            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            const file = document.getElementById('file').files[0];
            formData.append('file', file);
            xhr.open('POST', '/api/classify');
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        handleResponse(xhr.response);
                    }
                }
            };
            xhr.send(formData);
            return false;
        };

        function handleResponse(response) {
            console.log(response);
        }
    }
}());
