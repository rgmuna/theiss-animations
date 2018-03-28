var theissApp = angular.module('theissApp', [
    'duScroll',
    'ngAnimate'
]);

theissApp.controller('TheissCtrl', ['$scope', '$document', '$timeout', function($scope, $document, $timeout) {
  $scope.user = {
    name: '',
    email: '',
    message: ''
  }

  $scope.notSubmitted = true;

  $scope.filledOut = false;

  $scope.$watch('user', function () {
    if($scope.user.name!=='' && $scope.user.email!==''){
      $scope.filledOut = true;
    }
    else{
      $scope.filledOut = false;
    }
  }, true);

  $scope.betaTesters = firebase.database().ref().child('beta');

  $scope.submitForm = function(){
    console.log('form clicked!');

    $scope.betaTesters.push( $scope.user )
    .then(function(){
      $scope.notSubmitted = false;
      console.log('successful!', $scope.notSubmitted);
      $scope.$apply();
      $timeout( function(){
            $scope.notSubmitted = true;
            $scope.user = {
              name: '',
              email: '',
              message: ''
            };
            $scope.$apply();
        }, 5000 );
    })
    .catch(function(error){
      alert('Oops something went wrong! Try again.')
    })
  }

  var contact = angular.element(document.getElementById('contact'));
  $scope.toContact = function() {
    $document.scrollToElementAnimated(contact);
  }

}]);
