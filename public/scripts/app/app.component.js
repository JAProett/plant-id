(function() {
  'use strict'

  angular.module('app')
    .component('app', {
      templateUrl: '/scripts/app/app.template.html',
      controller: controller
    })

  controller.$inject = ['$http']
  function controller($http) {

    this.$onInit = () => {
      this.sortBy = '-vote_count';
    };

  }

}());
