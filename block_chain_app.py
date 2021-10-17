import logging
from aiohttp import web
import requests
import time
import os
import traceback
from configparser import ConfigParser
from tinydb import TinyDB, Query, table




# ---------------Constants & Defaults---------------

LOG_PATH = 'logs'
DEBUG_LOG_FILE_NAME = 'debug.log'
URL_SEPARATOR = '/'
DATA_URL = 'https://blockchain.info/blocks'
BLOCK_DATA_URL = 'https://blockchain.info/rawblock'
DATA_URL_SUFFIX = '?format=json'
PORT = 5000
TIME_DELAY_HOURS = 24

cache = TinyDB('./mockdb.json')
CACHE_QUERY = Query()

# ------------------------------------------------




# ----------Load Default Config -----------------------
config = ConfigParser()
config.read('config.properties')

if 'port' in config:
    PORT = config.get('GENERIC', 'port')
if 'time_delay_hours' in config:
    TIME_DELAY_HOURS = config.get('GENERIC', 'time_delay_hours')
# ------------------------------------------------



# ---------Initialize Logger----------------------
log_dir_exists=os.path.isdir(LOG_PATH)
if not log_dir_exists:
    os.mkdir(LOG_PATH)
logging.basicConfig(filename=LOG_PATH+URL_SEPARATOR+DEBUG_LOG_FILE_NAME,level=logging.DEBUG)
logger=logging.getLogger(__name__)

# ------------------------------------------------




# ---------Time Utils----------------------------
def delay_time_milliseconds(time_in_hours):
    return time_in_hours * 60 * 60 * 1000



def get_lag_time_in_milliseconds():
    lag=delay_time_milliseconds(TIME_DELAY_HOURS)
    cur_ms=round(time.time() * 1000)
    lag_ms=cur_ms-lag
    return lag_ms
# ------------------------------------------------



# ---------Routes----------------------------
async def hello(request):
    return web.Response(text='Blockchain server is up and running')


async def get_block_data(request):
    response={}
    try:
        time_stamp=str(get_lag_time_in_milliseconds())
        url=DATA_URL+URL_SEPARATOR+time_stamp+DATA_URL_SUFFIX
        print('using url->',url)
        print('request', request)
        resp=requests.get(url=url)
        if resp.status_code!=200:
            raise ValueError('Getting Blocks data from API failed')
        data=resp.json()
        response={'status':1,'message':'Data request successful','data':data}
    except:
        print(traceback.format_exc())
        response={'status':-1,'message':'There was an error processing your request','data':data}
    return web.json_response(response)


async def get_block_details(request):
    response={}
    try:
        blockId = request.match_info.get('blockId', "")
        print('type of blockId->',type(blockId))
        if not blockId:
            raise ValueError('Invalid block ID')
        url=BLOCK_DATA_URL+URL_SEPARATOR+blockId
        print('using url->',url)
        print('using blockID->',blockId)
        data = None
        data = cache.search(CACHE_QUERY.hash == blockId)
        if not data:
            resp=requests.get(url=url)
            print('response of get block details',resp)
            if resp.status_code!=200:
                raise ValueError('Getting Blocks data from API failed')
            data=resp.json()
#             cache[blockId]=data
            cache.insert(data)
            print('Inserted data for {blockId} into DB')
        else: print('Got value for {blockId} from DB')
        response={'status':1,'message':'Data request successful','data':data}
    except:
        print(traceback.format_exc())
        response={'status':-1,'message':'There was an error processing your request','data':data}
    return web.json_response(response)
# ------------------------------------------------




application = web.Application()
application.add_routes([web.get('/block',get_block_data),web.get('/block/{blockId}',get_block_details),web.get('/',hello)])
web.run_app(application,port=PORT)