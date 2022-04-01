# Integrating cloud logging with the Django Application with LogDNA
import logging
import os
from os import environ
import environ
from logdna import LogDNAHandler


class LogDNACloudHandler():

    def initiate_cloud_logging(self):
        env = environ.Env()
        environ.Env.read_env()

        print(env('LOG_DNA_INGESTION_KEY'))
        key = os.environ['LOG_DNA_INGESTION_KEY']
        log = logging.getLogger('logdna')
        log.setLevel(logging.INFO)

        options = {'hostname': 'password_vault', 'ip': '10.0.1.1', 'mac': 'C0:FF:EE:C0:FF:EE', 'index_meta': True}
        test = LogDNAHandler(key, options)
        log.addHandler(test)
        return log