'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'CornerCouch'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/listStudies.html', controller: 'ListStudiesCtrl'});
  $routeProvider.when('/study/new', {templateUrl: 'partials/editStudy.html', controller: 'EditStudyCtrl'});
  $routeProvider.when('/study/:studyId', {templateUrl: 'partials/viewStudy.html', controller: 'ViewStudyCtrl'});
  $routeProvider.when('/study/:studyId/edit', {templateUrl: 'partials/editStudy.html', controller: 'EditStudyCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}])
.run(function($rootScope, cornercouch) {
    $rootScope.server = cornercouch();
    $rootScope.server.session();
    $rootScope.imagedb = $rootScope.server.getDB('imreq');
    console.log($rootScope.imagedb);
});;
