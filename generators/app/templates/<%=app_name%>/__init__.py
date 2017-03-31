from buildbot.www.plugin import Application


class <%=AppName%>Application(Application):
    pass

# create the interface for the setuptools entry point
ep = <%=AppName%>Application(__name__, "<%=description%>")
