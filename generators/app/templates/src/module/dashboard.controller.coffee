
class <%=AppName%> extends Controller
    constructor: ($scope, dataService) ->
        data = dataService.open().closeOnDestroy($scope)
        $scope.builders = data.getBuilders()
        $scope.builds = data.getBuilds(limit: 200, order: '-started_at')
