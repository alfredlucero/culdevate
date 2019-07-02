# Lint both frontend and backend projects before commiting
lint-all:
	cd frontend && \
	npm run lint && \
	cd ../backend && \
	npm run lint

# Run unit tests for both frontend and backend projects before pushing code
run-all-unit-tests:
	cd frontend && \
	npm run test -- --ci && \
	cd ../backend && \
	npm run test
