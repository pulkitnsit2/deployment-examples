from sanic import Sanic
import os
from sanic import response
from sanic.exceptions import ServerError

app = Sanic(__name__)


@app.route("/")
async def test_async(request):
    print("test1")
    print("test2")
    print("test3")
    return response.json({"test": True})


@app.route("/exception")
def exception(request):
    raise ServerError("It's dead jim")


@app.route("/await")
async def test_await(request):
    import asyncio
    await asyncio.sleep(5)
    return response.text("I'm feeling sleepy")


async def load_rookout():
    from rook import auto_start


def start_server():
    app.add_task(load_rookout())
    app.run(host='localhost',
            port=os.environ.get('PORT', 3000),
            access_log=False,
            debug=False,
            workers=3)


start_server()
