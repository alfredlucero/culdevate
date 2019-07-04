# Install all npm dependencies for frontend and backend folders
install-all:
	cd frontend && \
	echo "Installing frontend dependencies..." && \
	npm ci && \
	cd ../backend && \
	echo "Installing backend dependencies..." && \
	npm ci

# Lint both frontend and backend projects before commiting
lint-all:
	cd frontend && \
	echo "Linting frontend project..." && \
	npm run lint && \
	cd ../backend && \
	echo "Linting backend project..." && \
	npm run lint

# Run unit tests for both frontend and backend projects before pushing code
run-all-unit-tests:
	cd frontend && \
	echo "Running unit tests for frontend..." && \
	npm run test -- --ci && \
	cd ../backend && \
	echo "Running unit tests for backend..." && \
	npm run test
