build-dev:
	docker compose -f compose.dev.yaml build

start-dev:
	docker compose -f compose.dev.yaml up

restart-dev:
	docker compose -f compose.dev.yaml down
	docker compose -f compose.dev.yaml up

# add eureka service if needed
restart-backend-dev:
	docker compose -f compose.dev.yaml restart user-service chat-service gateway

stop-dev:
	docker compose -f compose.dev.yaml down

# add eureka service if needed
rebuild-backend-dev:
	docker compose -f compose.dev.yaml stop user-service chat-service gateway
	docker compose -f compose.dev.yaml build user-service chat-service gateway

rebuild-user-dev:
	docker compose -f compose.dev.yaml stop user-service
	docker compose -f compose.dev.yaml build user-service 

rebuild-api-dev:
	docker compose -f compose.dev.yaml stop api
	docker compose -f compose.dev.yaml build api

rebuild-frontend-dev:
	docker compose -f compose.dev.yaml stop frontend
	docker compose -f compose.dev.yaml build frontend

rebuild-dev:
	docker compose -f compose.dev.yaml down
	docker compose -f compose.dev.yaml build
	docker compose -f compose.dev.yaml up

rebuild-dev-full:
	docker compose -f compose.dev.yaml down
	docker compose -f compose.dev.yaml build --no-cache
	docker compose -f compose.dev.yaml up

build-prod:
	docker compose -f compose.dev.yaml build

start-prod:
	docker compose -f compose.prod.yaml up

stop-prod:
	docker compose -f compose.prod.yaml down


rebuild-prod:
	docker compose -f compose.prod.yaml down
	docker compose -f compose.prod.yaml build --no-cache
	docker compose -f compose.prod.yaml up

clean-all:
	docker compose -f compose.dev.yaml down
	docker compose -f compose.prod.yaml down
	docker system prune -f
	docker builder prune -a -f

# Logs commands
logs-api-dev:
	docker compose -f compose.dev.yaml logs -f api

logs-frontend-dev:
	docker compose -f compose.dev.yaml logs -f frontend


logs-backend-dev:
	docker compose -f compose.dev.yaml logs -f eureka user-service chat-service gateway

logs-dev-all:
	docker compose -f compose.dev.yaml logs -f
