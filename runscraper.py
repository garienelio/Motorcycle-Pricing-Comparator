from scraper.scraper.spiders.apexcycle import ApexCycleSpider
from scraper.scraper.spiders.peakpower import PeakpowerSpider
from scraper.scraper.spiders.peakpowerbarrie import PeakpowerbarrieSpider
from scraper.scraper.spiders.powersports import PowersportsSpider
from twisted.internet import reactor, defer
from scrapy.crawler import CrawlerRunner
from scrapy.utils.log import configure_logging
from scrapy.utils.project import get_project_settings
import sqlite3



settings = get_project_settings()
configure_logging(settings)
runner = CrawlerRunner(settings)

@defer.inlineCallbacks
def crawl():
    yield runner.crawl(ApexCycleSpider)
    yield runner.crawl(PeakpowerSpider)
    yield runner.crawl(PeakpowerbarrieSpider)
    yield runner.crawl(PowersportsSpider)
    reactor.stop()

crawl()
reactor.run()

print("************************************** SCRAPER RUNNER **************************************")
print("Successfully scraped the data!\n")

# Check if the temporary database is correct before overwriting the main database
print("Please check the content of the following database inside the database folder:")
print("- newdata.db\n")
print("WARNING: If you enter 'override', the main database will be overriden. Make sure the data")
print("inside the newdata.db mentioned above contains the correct data.")
userResponse = input("Enter 'override' if you wish to override main database: ")

if userResponse == 'override':
    print("Overriding the main database...")
    
    # Override the main database with the data from newdata.db
else:
    print("Process Canceled!")
print("************************************** SCRAPER RUNNER **************************************")