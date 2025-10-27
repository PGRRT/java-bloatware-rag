from fastapi import FastAPI


def create_api() -> FastAPI:
    """
    creates API entry point.
    """

    api = FastAPI()

    from api.routes import rag_router

    api.include_router(rag_router)

    return api


if __name__ == "__main__":
    import logging

    logging.basicConfig(level=logging.DEBUG)

    # Uvicorn isn't in requirements.txt so make sure you install it before running this file

    # import uvicorn

    # uvicorn.run('api.entry:create_api',host="0.0.0.0",factory=True,port=8081,workers=4,log_level="debug",access_log=True)
