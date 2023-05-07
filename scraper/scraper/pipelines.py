# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import sqlite3


# class ScraperPipeline:
#     def process_item(self, item, spider):

#         return item


class SQLitePipeline:
    def __init__(self):
        self.conn = sqlite3.connect("../../database/newdata.db")
        self.cur = self.conn.cursor()
        self.cur.execute("""CREATE TABLE IF NOT EXISTS Motorcycle
                            (ID         INTEGER  PRIMARY KEY  AUTOINCREMENT  NOT NULL,
                             URL        TEXT,
                             TITLE      TEXT,
                             YEAR       INTEGER,
                             MAKE       TEXT,
                             MODEL      TEXT,
                             COLOR      TEXT,
                             PRICE      REAL,
                             CONDITION  TEXT,
                             ODOMETER   REAL,
                             VIN        TEXT,
                             DEALER     TEXT,
                             STOCK_NUM  TEXT,
                             LOCATION   TEXT)""")


    def process_item(self, item, spider):

        return item