#!/usr/bin/python
# -*- coding: UTF-8 -*-
import os
from flask import current_app
from flask import Flask, render_template, session, redirect, url_for, flash, request
from flask_bootstrap import Bootstrap
from flask_moment import Moment
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
# from flask_uploads import UploadSet, IMAGES
from wtforms import StringField, SubmitField, BooleanField
from wtforms.validators import DataRequired
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from werkzeug.utils import secure_filename
basedir = os.path.abspath(os.path.dirname(__file__))
from app import create_app, db
from app.models import *
from app.model_api_log import HSApiLog
from tests.test_api import *
from flask_script import Manager, Shell
import logging
from logging.handlers import TimedRotatingFileHandler
from tools.os_tools import *
from base import CustomJSONEncoder


app = create_app('default')
app.json_encoder = CustomJSONEncoder
migrate = Migrate(app, db)
from unittest import TestCase


@app.cli.command()
def init_tables():
    Role.insert_roles()
    Amdin_Role = Role.query.filter_by(name='Administrator').first()
    user_admin = User(email='admin@163.com', username='admin', password='123', confirmed=True, role=Amdin_Role)
    db.session.add_all([user_admin])
    db.session.commit()


def log_config(debug=False):
    """
    :param debug: 如果不是debug模式, 则日志输出到文件
    :return:
    """
    # 日志配置
    home_path = os.path.expanduser('~')
    log_path = os_mkdir(home_path, "log")
    log_file_path = '%s/my-flask-server.log' % log_path
    _format = '%(asctime)s - %(levelname)s - %(filename)s - %(funcName)s - %(lineno)s - %(message)s'
    _format2 = '%(asctime)s - %(levelname)s - %(message)s'
    _handler = TimedRotatingFileHandler(log_file_path,
                                        when="D",
                                        interval=1,
                                        backupCount=15,
                                        encoding="UTF-8",
                                        delay=False,
                                        utc=True)

    _handler.setLevel(logging.DEBUG)
    logging_format = logging.Formatter(_format)
    _handler.setFormatter(logging_format)

    if not debug:
        logging.basicConfig(filename=log_file_path, level=logging.DEBUG, format=_format2)

    return _handler


if __name__ == "__main__":

    # 启动日志
    handler = log_config()
    app.logger.addHandler(handler)
    app.run(host='0.0.0.0', port=5000, debug=True)
