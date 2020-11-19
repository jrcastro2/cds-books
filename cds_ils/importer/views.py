from flask import jsonify, abort, Blueprint, request, session, render_template, redirect, flash, Response, stream_with_context
import os
from werkzeug.utils import secure_filename
from cds_ils.importer.api import import_from_xml
from invenio_app_ils.permissions import need_permissions
import uuid


def create_importer_blueprint(app):
    """Add importer views to the blueprint."""
    blueprint = Blueprint("invenio_app_ils_importer", __name__)

    def allowed_files(filename):
        """Checks the extension of the files"""
        if not "." in filename:
            return False

        ext = filename.rsplit(".", 1)[1]
        if ext.upper() in app.config["IMPORTER_ALLOWED_EXTENSIONS"]:
            return True
        else:
            return False

    def rename_file(filename):
        """Renames filename with an unique name"""
        unique_filename = uuid.uuid4().hex
        ext = filename.rsplit(".", 1)[1]
        return unique_filename + "." + ext

    class RequestError(Exception):
        """Custom exception class to be thrown when error occurs."""

        def __init__(self, message, status, payload=None):
            self.message = message
            self.status = status
            self.payload = payload

    @blueprint.errorhandler(RequestError)
    def handle_request_error(error):
        """Catch RequestError exception, serialize into JSON, and respond."""
        payload = dict(error.payload or ())
        payload['status'] = error.status
        payload['message'] = error.message
        return jsonify(payload), error.status

    @blueprint.route('/importer', methods=['POST'])
    @need_permissions("stats-most-loaned")
    def test_api():
        if request.files:
            file = request.files["file"]
            provider = request.form.get("provider", None)
            mode = request.form.get("mode", None)

            if not provider:
                flash('Missing provider')
                raise RequestError('Missing provider', 400)

            if not mode:
                flash('Missing mode')
                raise RequestError('Missing mode', 400)

            if allowed_files(file.filename):
                file.filename = rename_file(file.filename)
                if mode == 'Delete':
                    session['name'] = "Test"
                    return redirect(request.url)
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config["IMPORTER_UPLOADS_PATH"], filename))
                with open(app.config["IMPORTER_UPLOADS_PATH"] + "/" + file.filename) as f:
                    try:
                        records = import_from_xml([f], "marcxml", provider)
                    except Exception:
                        print(Exception)
                        raise RequestError('Error while processing data', 400)
                    return jsonify(records=records)
            else:
                flash('That file extension is not allowed')
                raise RequestError('That file extension is not allowed', 400)
        else:
            raise RequestError('Missing file', 400)

    return blueprint



