#!/usr/bin/env python

from __future__ import absolute_import, division, print_function

try:
    from buildbot_pkg import setup_www_plugin
except ImportError:
    import sys
    print("Please install buildbot_pkg module in order to install that package, or use the pre-build .whl modules available on pypi", file=sys.stderr)
    sys.exit(1)


setup_www_plugin(
    name='<%= app_name_kebab %>',
    description='<%= description %>',
    author=u'<%= authorName %>',
    author_email=u'<%= authorEmail %>',
    url='<%= homepage %>/',
    license='<%= license %>',
    packages=['<%= app_name %>'],
    package_data={
        '': [
            'VERSION',
            'static/*'
        ]
    },
    entry_points="""
        [buildbot.www]
        <%= app_name %> = <%= app_name %>:ep
    """,
)
