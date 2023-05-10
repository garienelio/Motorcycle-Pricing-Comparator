# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import sqlite3
import os

class SQLitePipeline:
    def __init__(self):
        self.conn = sqlite3.connect("database/database.db")
        self.cur = self.conn.cursor()


    def process_item(self, item, spider):
        self.cur.execute("""INSERT INTO NewData VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                         (item.get('url'), item.get('unitTitle'), item.get('year'), item.get('make'), item.get('model'), 
                          item.get('color'), item.get('price'), item.get('condition'), item.get('odometer'), item.get('vin'), 
                          item.get('dealer'), item.get('stockNum'), item.get('location')))
        self.conn.commit()

        return item