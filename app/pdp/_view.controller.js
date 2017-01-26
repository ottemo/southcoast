angular.module("pdpModule")

    .controller("pdpViewController", [
        '$controller',
        "$scope",
        "$routeParams",
        "$location",
        "$timeout",
        "pdpApiService",
        "pdpProductService",
        "cartService",
        "visitorLoginService",
        "commonUtilService",
        function ($controller, $scope, $routeParams, $location, $timeout, pdpApiService, pdpProductService,
                  cartService, visitorLoginService, commonUtilService) {

            // Inherit from default pdpViewController
            $controller('_pdpViewController', { $scope: $scope });

            $scope.imageWidget = {
                active: {}
            };

            $scope._getProduct = function () {
                pdpApiService.getProduct({"productID": $scope.productId}).$promise.then(function (response) {
                    if (response.error === null) {
                        var result = response.result || $scope.defaultProduct;

                        pdpProductService.setProduct(result);
                        $scope.product = pdpProductService.getProduct();

                        // BREADCRUMBS
                        $scope.$emit("add-breadcrumbs", {
                            "label": $scope.product.name,
                            "url": pdpProductService.getUrl($scope.product._id)
                        });
                    } else {
                        $location.path("/");
                    }
                })
                    .then(function(){
                        // Activate the first image
                        $scope.imageWidget.active = $scope.product.images[0];
                    });
            }
        }
    ]
);
