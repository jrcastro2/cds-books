# -*- coding: utf-8 -*-
#
# Copyright (C) 2019 CERN.
#
# invenio-app-ils is free software; you can redistribute it and/or modify it
# under the terms of the MIT License; see LICENSE file for more details.

"""CDS Books retrieve patron loans permissions."""

from __future__ import absolute_import, print_function

from invenio_access import action_factory
from invenio_access.permissions import Permission
from invenio_app_ils.permissions import backoffice_access_action
from invenio_app_ils.permissions import \
    views_permissions_factory as ils_views_permissions_factory

retrieve_patron_loans_access_action = action_factory(
    "retrieve-patron-loans-access")


def retrieve_patron_loans_permission(*args, **kwargs):
    """Return permission to retrieve patron loans."""
    return Permission(
        retrieve_patron_loans_access_action,
        backoffice_access_action)


def views_permissions_factory(action):
    """Override ILS views permissions factory."""
    if action == "retrieve-patron-loans":
        return retrieve_patron_loans_permission()
    return ils_views_permissions_factory(action)
