# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy
from scrapy.loader import ItemLoader
from itemloaders.processors import MapCompose, TakeFirst
from price_parser import Price


def get_price(value):
    thePrice = Price.fromstring(value)
    return thePrice.amount_float


def get_odometer(value):
    return float(value.split()[0])


def convert_year(value):
    return int(value)


class MotorcycleData(scrapy.Item):
    url = scrapy.Field(output_processor = TakeFirst())
    unitTitle = scrapy.Field(output_processor = TakeFirst())
    year = scrapy.Field(input_processor = MapCompose(convert_year), output_processor = TakeFirst())
    make = scrapy.Field(output_processor = TakeFirst())
    model = scrapy.Field(output_processor = TakeFirst())
    color = scrapy.Field(output_processor = TakeFirst())
    price = scrapy.Field(input_processor = MapCompose(str.strip, get_price), output_processor = TakeFirst())
    condition = scrapy.Field(output_processor = TakeFirst())
    odometer = scrapy.Field(input_processor = MapCompose(get_odometer), output_processor = TakeFirst())
    vin = scrapy.Field(output_processor = TakeFirst())
    dealer = scrapy.Field(output_processor = TakeFirst())
    stockNum = scrapy.Field(output_processor = TakeFirst())
    location = scrapy.Field(output_processor = TakeFirst())
