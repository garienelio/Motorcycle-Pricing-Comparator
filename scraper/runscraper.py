from scraper.spiders.apexcycle import ApexCycleSpider
from scraper.spiders.peakpower import PeakpowerSpider
from scraper.spiders.peakpowerbarrie import PeakpowerbarrieSpider
from scraper.spiders.powersports import PowersportsSpider
from scraper.spiders.powersportsto import PowersportstoSpider
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
import sqlite3
import os

# Clearing the database
if not os.path.exists('database'):
    os.makedirs('database')

conn = sqlite3.connect("database/database.db")
cur = conn.cursor()
cur.execute("""DROP TABLE IF EXISTS NewData""")
cur.execute("""CREATE TABLE NewData
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

conn.commit()
conn.close()

settings = get_project_settings()
process = CrawlerProcess(settings)
process.crawl(ApexCycleSpider)
process.crawl(PeakpowerSpider)
process.crawl(PeakpowerbarrieSpider)
process.crawl(PowersportsSpider)
process.crawl(PowersportstoSpider)
process.start()