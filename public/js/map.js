var app = angular.module('myapp', []);
var linkData = '/public/data/data.json';

window.onload = function () {
    $('#content').show();
}

app.controller('mycontroller', function ($scope, $http) {
    $scope.data = [];
    var userDefault = {
        first_name: '',
        last_name: '',
        email: ''
    };
    var temp = null;

    $scope.userEdit = userDefault;
    $scope.userAdd = userDefault;
    $http.get(linkData).then(function (response) {
        $scope.data = response.data;
    })
    $scope.editUser = function (user) {
        temp = angular.copy(user);
        $scope.userEdit = user;
        $('#modal').modal('show');
    }
    $scope.cancelSave = function () {
        angular.copy(temp, $scope.userEdit);
    }

    $scope.openModalAddUser = function () {
        $scope.userAdd.first_name = '';
        $scope.userAdd.last_name = '';
        $scope.userAdd.email='';
        tempSave = angular.copy($scope.userAdd);
        $('#modalAdd').modal('show');
    }

    $scope.deleteUser = function (user) {
        var index = $scope.data.indexOf(user);
        $scope.data.splice(index, 1);
    }

    $scope.saveUser = function () {
       var tempSave = angular.copy($scope.userAdd);
        $scope.data.push(tempSave);
    }

});
