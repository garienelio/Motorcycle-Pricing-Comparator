import scrapy
import re
from scraper.items import MotorcycleData
from scrapy.loader import ItemLoader


class ApexCycleSpider(scrapy.Spider):
    name = "apexcycle"
    allowed_domains = ["apexcycle.ca"]


    def start_requests(self):
        url = 'https://www.apexcycle.ca/default.asp?category=motorcycle%20%2F%20scooter&page=xAllInventory&pg=1&sz=50'
        yield scrapy.Request(url, callback=self.parse)


    def parse(self, response):
        # Getting the first result list only (to exclude irrelevant recommendation)
        resultList = response.css('ul.v7list-results__list')[0]
        motors = resultList.css('li.v7list-results__item')

        # Getting all motorcycle data
        for motor in motors:
            url = motor.css('a.vehicle-heading__link::attr(href)').get()
            unitYear = motor.css('li').attrib['data-unit-year']
            unitMake = motor.css('li').attrib['data-unit-make']
            unitModel = motor.css('li').attrib['data-unit-model']

            load = ItemLoader(item = MotorcycleData(), selector = motor)

            load.add_value('url', 'https://www.apexcycle.ca' + url)
            load.add_value('unitTitle', f'{unitYear} {unitMake} {unitModel}')
            load.add_value('year', unitYear)
            load.add_value('make', unitMake)
            load.add_value('model', unitModel)
            load.add_css('color', 'li.vehicle-specs__item--color span.vehicle-specs__value::text')
            load.add_css('price', 'span.vehicle-price--current span.vehicle-price__price::text')
            load.add_css('condition', 'li.vehicle-specs__item--condition span.vehicle-specs__value::text')
            load.add_css('odometer', 'li.vehicle-specs__item--miles span.vehicle-specs__value::text')
            load.add_css('vin', 'li.vehicle-specs__item--vin span.vehicle-specs__value::text')
            load.add_value('dealer', 'Apex Cycle')
            load.add_css('stockNum', 'li.vehicle-specs__item--stock-number span.vehicle-specs__value::text')
            load.add_value('location', 'Cambridge')

            yield load.load_item()

        # Go into the next page
        pages = response.css('div.v7list-pagination__item--page span.v7list-pagination__page::text').get()
        pagesPattern = r'\d+'
        pagesMatch = re.findall(pagesPattern, pages)
        currentPage = int(pagesMatch[0])
        pageTotal = int(pagesMatch[1])
        currentURL = response.url

        if(currentPage < pageTotal):
            nextPage = currentPage + 1
            nextURL = currentURL.replace(f"pg={currentPage}", f"pg={nextPage}")
            yield response.follow(nextURL, callback=self.parse)
