# -*- coding: utf-8 -*-
#
# Copyright (C) 2019 CERN.
#
# invenio-app-ils is free software; you can redistribute it and/or modify it
# under the terms of the MIT License; see LICENSE file for more details.

"""Keyword schema for marshmallow loader."""

from marshmallow import Schema, fields


class KeywordSchemaV1(Schema):
    """Keyword schema."""

    def get_pid_field(self):
        """Return pid_field value."""
        return "pid"

    pid = fields.Str(required=True)
    name = fields.Str(required=True)
    provenance = fields.Str()