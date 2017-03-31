# Register new module
class <%=AppName%> extends App
    constructor: -> return [
        'ui.router', 'buildbot_config', 'guanlecoja.ui', 'bbData'

    ]

# Register new state
class State extends Config
    constructor: ($stateProvider, glMenuServiceProvider) ->
        # Name of the state
        name = "<%=app_name%>"
        caption = "<%=appName%>"
        # Configuration
        glMenuServiceProvider.addGroup
            name: name
            caption: caption
            icon: 'user-circle'
            order:  1
        cfg =
            group: name
            caption: caption

        # Register new state
        state =
            controller: "<%=appName%>Controller"
            templateUrl: "<%=app_name%>/views/dashboard.html"
            name: name
            url: "/#{name}"
            data: cfg
        $stateProvider.state(state)
