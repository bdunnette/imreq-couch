'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('ListStudiesCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    $rootScope.imagedb.query("imreq", "studies", { include_docs: true });
  }])
  .controller('ViewStudyCtrl', ['$scope', '$rootScope', '$routeParams', function($scope, $rootScope, $routeParams) {
    var doc_object = $rootScope.imagedb.newDoc();
    doc_object.load($routeParams.studyId)
      .success(function () {$scope.study = doc_object});
  }])
  .controller('EditStudyCtrl', ['$scope', '$rootScope', '$routeParams', '$location', function($scope, $rootScope, $routeParams, $location) {
    if ('studyId' in $routeParams) {
      var doc_object = $rootScope.imagedb.newDoc();
      doc_object.load($routeParams.studyId)
        .success(function () {$scope.study = doc_object});
    } else {
      $scope.study = $scope.imagedb.newDoc();
    }
    
    $scope.submitStudy = function() {
      $scope.study.save()
      .success( function() {
        $location.path('/study/' + $scope.study._id);
      });
    };
    
    $scope.attachClick = function() {
      var fileInput = document.getElementById("upload");
      console.log(fileInput);
      $scope.study.attachMulti(fileInput.files, function () {
          fileInput.value = "";
      });
    };
    
    $scope.removeClick = function() {
      $scope.study.remove()
      .success(function() {
        $location.path('/studies');
      });
    }
  }]);
