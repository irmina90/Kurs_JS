angular.module('myapp', []).controller('TodoCtrl', function ($scope) {
    $scope.elements = [];
    $scope.inputValue = '';
    $scope.active = 0;

    $scope.addNew = function () {
        if (!$scope.inputValue) {
            return;
        }

        $scope.elements.push({
            value: $scope.inputValue,
            status: true
        });
        $scope.inputValue = '';
    };

    $scope.check = function (item) {
        if ($scope.elements[item].status === true) {
            $scope.elements[item].status = false;
            $scope.active = $scope.active + 1;
        } else {
            $scope.elements[item].status = true;
            $scope.active = $scope.active - 1;
        }
    }
});
